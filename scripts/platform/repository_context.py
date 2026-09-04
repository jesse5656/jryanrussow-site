#!/usr/bin/env python3

from __future__ import annotations

import argparse
import json
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

REPOSITORY_ROOT = Path(__file__).resolve().parents[2]

if str(REPOSITORY_ROOT) not in sys.path:
    sys.path.insert(0, str(REPOSITORY_ROOT))

from scripts.platform.parsers.operating_plan import parse_operating_plan

SCHEMA_VERSION = "1.1.0"


def run_git(root: Path, *args: str) -> str:
    result = subprocess.run(
        ["git", *args],
        cwd=root,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        check=False,
    )

    if result.returncode != 0:
        return ""

    return result.stdout.strip()


def find_repository_root(start: Path) -> Path:
    result = subprocess.run(
        ["git", "rev-parse", "--show-toplevel"],
        cwd=start,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        check=False,
    )

    if result.returncode != 0:
        raise SystemExit(f"Not inside a Git repository: {start}")

    return Path(result.stdout.strip()).resolve()


def load_policy(root: Path) -> dict[str, Any]:
    path = root / ".governance/policy.yaml"

    if not path.exists():
        return {}

    try:
        return json.loads(path.read_text())
    except json.JSONDecodeError as exc:
        raise SystemExit(f"Invalid policy file {path}: {exc}") from exc


def find_operating_plan(
    root: Path,
    policy: dict[str, Any],
) -> Path | None:
    configured = policy.get("operating_plan", {}).get("candidates", [])

    candidates = configured or [
        "OPERATING-PLAN.md",
        "docs/discipline/OPERATING-PLAN.md",
    ]

    for candidate in candidates:
        path = root / candidate

        if path.exists():
            return path

    return None


def existing_paths(root: Path, values: list[str]) -> list[str]:
    return [
        value
        for value in values
        if (root / value).exists()
    ]


def extract_proposal_status(text: str) -> str | None:
    lines = text.splitlines()

    for index, line in enumerate(lines):
        stripped = line.strip()

        if not stripped.lower().startswith("status:"):
            continue

        inline = stripped.split(":", 1)[1].strip()
        if inline:
            return inline

        for following in lines[index + 1:]:
            value = following.strip()
            if value:
                return value

        return None

    return None


def discover_proposals(root: Path) -> list[dict[str, str]]:
    results: list[dict[str, str]] = []

    for path in root.rglob("*.md"):
        if ".git" in path.parts:
            continue

        upper = path.name.upper()

        if "ACP" not in upper and "OCP" not in upper:
            continue

        text = path.read_text(errors="replace")
        status = extract_proposal_status(text)

        results.append(
            {
                "path": str(path.relative_to(root)),
                "status": status if status is not None else "Unknown",
            }
        )

    return sorted(results, key=lambda item: item["path"])


def parse_name_status(output: str) -> list[dict[str, str]]:
    entries: list[dict[str, str]] = []

    for line in output.splitlines():
        if not line.strip():
            continue

        parts = line.split("\t")
        status = parts[0].strip()
        paths = [part for part in parts[1:] if part]

        if not paths:
            continue

        entry = {
            "status": status,
            "path": paths[-1],
        }

        if len(paths) > 1:
            entry["source_path"] = paths[0]

        entries.append(entry)

    return entries


def synchronization_state(
    upstream: str | None,
    ahead: int | None,
    behind: int | None,
) -> str:
    if not upstream:
        return "UPSTREAM_UNAVAILABLE"

    if ahead is None or behind is None:
        return "UNRESOLVED"

    if ahead == 0 and behind == 0:
        return "SYNCHRONIZED"

    if ahead > 0 and behind == 0:
        return "LOCAL_AHEAD"

    if ahead == 0 and behind > 0:
        return "LOCAL_BEHIND"

    if ahead > 0 and behind > 0:
        return "DIVERGED"

    return "UNRESOLVED"


def resolve_git_state(root: Path) -> dict[str, Any]:
    branch = run_git(root, "branch", "--show-current") or None
    head_commit = run_git(root, "rev-parse", "HEAD") or None
    upstream = (
        run_git(
            root,
            "rev-parse",
            "--abbrev-ref",
            "--symbolic-full-name",
            "@{upstream}",
        )
        or None
    )

    ahead: int | None = None
    behind: int | None = None

    if upstream:
        counts = run_git(
            root,
            "rev-list",
            "--left-right",
            "--count",
            f"HEAD...{upstream}",
        )
        parts = counts.replace("\t", " ").split()

        if len(parts) == 2:
            try:
                ahead = int(parts[0])
                behind = int(parts[1])
            except ValueError:
                ahead = None
                behind = None

    staged = parse_name_status(
        run_git(root, "diff", "--cached", "--name-status")
    )
    unstaged = parse_name_status(
        run_git(root, "diff", "--name-status")
    )
    untracked = [
        line
        for line in run_git(
            root,
            "ls-files",
            "--others",
            "--exclude-standard",
        ).splitlines()
        if line.strip()
    ]

    working_tree = {
        "clean": not staged and not unstaged and not untracked,
        "staged": staged,
        "unstaged": unstaged,
        "untracked": untracked,
    }

    return {
        "branch": branch,
        "head_commit": head_commit,
        "upstream": upstream,
        "ahead": ahead,
        "behind": behind,
        "synchronization_state": synchronization_state(
            upstream,
            ahead,
            behind,
        ),
        "working_tree": working_tree,
        # Compatibility field retained for existing consumers.
        "working_tree_status": run_git(root, "status", "--short"),
    }


def build_context(root: Path) -> dict[str, Any]:
    policy = load_policy(root)
    operating_plan_path = find_operating_plan(root, policy)

    operating_plan: dict[str, Any] = {
        "path": None,
        "current_objective": None,
        "objective_type": None,
        "status": None,
        "objective": None,
        "scope": None,
        "success_criteria": None,
        "active_sprint": None,
        "next_concrete_step": None,
    }

    if operating_plan_path:
        parsed = parse_operating_plan(operating_plan_path)

        operating_plan = {
            "path": str(operating_plan_path.relative_to(root)),
            "current_objective": parsed["name"],
            "objective_type": parsed["type"],
            "status": parsed["status"],
            "objective": parsed["objective"],
            "scope": parsed["scope"],
            "success_criteria": parsed["success_criteria"],
            "active_sprint": parsed["active_sprint"],
            "next_concrete_step": parsed["next_concrete_step"],
        }

    governance = policy.get("governance", {})
    classification = policy.get("classification", {})
    git_state = resolve_git_state(root)
    proposals = discover_proposals(root)

    context = {
        "schema_version": SCHEMA_VERSION,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "repository": {
            "root": str(root),
            "name": policy.get("repository", {}).get("name", root.name),
            "branch": git_state["branch"],
            "head_commit": git_state["head_commit"],
            "upstream": git_state["upstream"],
            "ahead": git_state["ahead"],
            "behind": git_state["behind"],
            "synchronization_state": git_state[
                "synchronization_state"
            ],
            "working_tree_status": git_state["working_tree_status"],
        },
        "working_tree": git_state["working_tree"],
        "operating_plan": operating_plan,
        "governance": {
            "normative_sources": existing_paths(
                root,
                governance.get("normative_sources", []),
            ),
            "policy_path": (
                ".governance/policy.yaml"
                if (root / ".governance/policy.yaml").exists()
                else None
            ),
            "policy_version": policy.get("policy_version"),
            "proposals": proposals,
        },
        "engineering_standards": existing_paths(
            root,
            classification.get("engineering_standards", []),
        ),
        "operational_procedures": existing_paths(
            root,
            classification.get("operational_procedures", []),
        ),
        "implementation_guides": existing_paths(
            root,
            classification.get("implementation_guides", []),
        ),
        "ai_collaboration": existing_paths(
            root,
            classification.get("ai_collaboration", []),
        ),
        "protected_assets": policy.get(
            "protected_assets",
            [],
        ),
        "approvals": {
            "proposal_patterns": policy.get(
                "approvals",
                {},
            ).get("proposal_patterns", []),
            # Compatibility key retained for existing consumers.
            "active_proposals": proposals,
        },
        "warnings": [],
    }

    if not operating_plan_path:
        context["warnings"].append(
            "No Operating Plan was found using configured candidates."
        )
    else:
        unresolved_required = [
            label
            for label, value in (
                (
                    "Current Objective",
                    operating_plan["current_objective"],
                ),
                (
                    "Objective Type",
                    operating_plan["objective_type"],
                ),
                ("Status", operating_plan["status"]),
            )
            if not value
        ]

        if unresolved_required:
            context["warnings"].append(
                "Operating Plan required fields are unresolved: "
                + ", ".join(unresolved_required)
            )

    if not context["working_tree"]["clean"]:
        context["warnings"].append(
            "The repository contains uncommitted changes."
        )

    if not git_state["upstream"]:
        context["warnings"].append(
            "No configured Git upstream could be resolved."
        )
    elif git_state["synchronization_state"] == "UNRESOLVED":
        context["warnings"].append(
            "Git ahead/behind state could not be resolved."
        )

    unknown_proposals = [
        proposal["path"]
        for proposal in proposals
        if proposal["status"] == "Unknown"
    ]

    if unknown_proposals:
        context["warnings"].append(
            "Proposal status could not be resolved: "
            + ", ".join(unknown_proposals)
        )

    missing_normative = [
        path
        for path in governance.get("normative_sources", [])
        if not (root / path).exists()
    ]

    if missing_normative:
        context["warnings"].append(
            "Configured normative sources are missing: "
            + ", ".join(missing_normative)
        )

    return context


def _render_change_entries(
    entries: list[dict[str, str]],
) -> list[str]:
    if not entries:
        return ["(none)"]

    rendered: list[str] = []
    for entry in entries:
        if "source_path" in entry:
            rendered.append(
                f"{entry['status']}\t"
                f"{entry['source_path']} -> {entry['path']}"
            )
        else:
            rendered.append(
                f"{entry['status']}\t{entry['path']}"
            )

    return rendered


def render_text(context: dict[str, Any]) -> str:
    repository = context["repository"]
    working_tree = context["working_tree"]
    operating = context["operating_plan"]

    lines = [
        "Repository Context Resolution",
        "=" * 80,
        f"Repository: {repository['name']}",
        f"Root: {repository['root']}",
        f"Branch: {repository['branch'] or '(unknown)'}",
        f"HEAD: {repository['head_commit'] or '(unknown)'}",
        f"Upstream: {repository['upstream'] or '(not resolved)'}",
        (
            "Ahead / Behind: "
            f"{repository['ahead'] if repository['ahead'] is not None else '(unknown)'}"
            " / "
            f"{repository['behind'] if repository['behind'] is not None else '(unknown)'}"
        ),
        (
            "Synchronization: "
            f"{repository['synchronization_state']}"
        ),
        "",
        "Operating Plan",
        "-" * 80,
        f"Path: {operating['path'] or '(not found)'}",
        (
            "Current Objective: "
            f"{operating['current_objective'] or '(not resolved)'}"
        ),
        (
            "Objective Type: "
            f"{operating['objective_type'] or '(not resolved)'}"
        ),
        f"Status: {operating['status'] or '(not resolved)'}",
        (
            "Active Sprint: "
            f"{operating['active_sprint'] or '(not resolved)'}"
        ),
        (
            "Next Concrete Step: "
            f"{operating['next_concrete_step'] or '(not resolved)'}"
        ),
        "",
        "Applicable Governance",
        "-" * 80,
    ]

    for path in context["governance"]["normative_sources"]:
        lines.append(f"- {path}")

    lines.extend(
        [
            "",
            "Engineering Standards",
            "-" * 80,
        ]
    )

    for path in context["engineering_standards"]:
        lines.append(f"- {path}")

    lines.extend(
        [
            "",
            "Operational Procedures",
            "-" * 80,
        ]
    )

    for path in context["operational_procedures"]:
        lines.append(f"- {path}")

    lines.extend(
        [
            "",
            "AI Collaboration Standards",
            "-" * 80,
        ]
    )

    for path in context["ai_collaboration"]:
        lines.append(f"- {path}")

    lines.extend(
        [
            "",
            "Protected Assets",
            "-" * 80,
        ]
    )

    for pattern in context["protected_assets"]:
        lines.append(f"- {pattern}")

    lines.extend(
        [
            "",
            "Working Tree",
            "-" * 80,
            f"Clean: {'yes' if working_tree['clean'] else 'no'}",
            "Staged:",
            *_render_change_entries(working_tree["staged"]),
            "Unstaged:",
            *_render_change_entries(working_tree["unstaged"]),
            "Untracked:",
            *(
                working_tree["untracked"]
                if working_tree["untracked"]
                else ["(none)"]
            ),
        ]
    )

    if context["warnings"]:
        lines.extend(
            [
                "",
                "Warnings",
                "-" * 80,
            ]
        )

        for warning in context["warnings"]:
            lines.append(f"- {warning}")

    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(
        description=(
            "Resolve applicable repository context before repository changes."
        )
    )

    parser.add_argument(
        "--root",
        type=Path,
        default=Path.cwd(),
        help="Repository path. Defaults to the current directory.",
    )

    parser.add_argument(
        "--format",
        choices=["text", "json", "yaml"],
        default="text",
    )

    parser.add_argument(
        "--output",
        type=Path,
    )

    args = parser.parse_args()

    root = find_repository_root(args.root.resolve())
    context = build_context(root)

    if args.format == "text":
        rendered = render_text(context)
    else:
        # policy.yaml and YAML output use JSON-compatible YAML.
        rendered = json.dumps(context, indent=2, sort_keys=True)

    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(rendered.rstrip() + "\n")
    else:
        print(rendered)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
