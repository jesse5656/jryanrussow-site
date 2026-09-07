#!/usr/bin/env python3

from __future__ import annotations

import argparse
from copy import deepcopy
from datetime import datetime
import json
from pathlib import Path
import re
import sys

import jsonschema


ROOT = Path(__file__).resolve().parents[2]

CONTRACT_DIR = ROOT / "docs" / "architecture" / "ai-skills"

VOCAB_PATH = (
    CONTRACT_DIR /
    "governed-ai-skill-vocabulary-v1.json"
)

REGISTRY_SCHEMA_PATH = (
    CONTRACT_DIR /
    "governed-ai-skill-registry-schema-v1.json"
)

RELEASE_SCHEMA_PATH = (
    CONTRACT_DIR /
    "governed-ai-skill-release-schema-v1.json"
)

DEPLOY_SCHEMA_PATH = (
    CONTRACT_DIR /
    "governed-ai-skill-deployment-record-schema-v1.json"
)


class ContractError(Exception):
    pass


def load_json(path: Path) -> dict:
    return json.loads(
        path.read_text(encoding="utf-8")
    )


def schema_validate(instance: dict, schema: dict) -> None:
    validator = jsonschema.Draft202012Validator(
        schema,
        format_checker=jsonschema.FormatChecker(),
    )

    errors = sorted(
        validator.iter_errors(instance),
        key=lambda error: list(error.path),
    )

    if errors:
        rendered = []

        for error in errors:
            where = ".".join(
                str(part)
                for part in error.path
            )

            rendered.append(
                f"{where or '<root>'}: {error.message}"
            )

        raise ContractError(
            "schema validation failed:\n"
            + "\n".join(rendered)
        )


RFC3339_PATTERN = re.compile(
    r"^\d{4}-\d{2}-\d{2}"
    r"T"
    r"\d{2}:\d{2}:\d{2}"
    r"(?:\.\d+)?"
    r"(?:Z|[+-]\d{2}:\d{2})$"
)


def validate_rfc3339(
    value,
    label,
    *,
    allow_none=False,
):
    if value is None:
        if allow_none:
            return

        raise ContractError(
            f"{label} must not be null"
        )

    if not isinstance(value, str):
        raise ContractError(
            f"{label} must be an RFC 3339 string"
        )

    if not RFC3339_PATTERN.fullmatch(value):
        raise ContractError(
            f"{label} is not canonical RFC 3339: {value}"
        )

    normalized = (
        value[:-1] + "+00:00"
        if value.endswith("Z")
        else value
    )

    try:
        parsed = datetime.fromisoformat(
            normalized
        )
    except ValueError as exc:
        raise ContractError(
            f"{label} is not a valid date-time: {value}"
        ) from exc

    if parsed.tzinfo is None:
        raise ContractError(
            f"{label} requires an explicit timezone"
        )


def unique_by(items, field, label):
    seen = set()

    for item in items:
        value = item.get(field)

        if value in seen:
            raise ContractError(
                f"duplicate {label}: {value}"
            )

        seen.add(value)


def validate_runtime_support(items):
    unique_by(
        items,
        "runtime_class",
        "runtime_class",
    )

    for item in items:
        if (
            item["support_status"] == "SUPPORTED"
            and not item.get("adapter_id")
        ):
            raise ContractError(
                "SUPPORTED runtime requires adapter_id"
            )


def validate_dependencies(items):
    unique_by(
        items,
        "dependency_id",
        "dependency_id",
    )


def validate_registry(instance, schema):
    schema_validate(instance, schema)

    entries = instance["entries"]

    unique_by(
        entries,
        "entry_id",
        "registry entry_id",
    )

    identities = set()

    for entry in entries:
        identity = (
            entry["skill_name"],
            entry["version"],
        )

        if identity in identities:
            raise ContractError(
                "duplicate registry skill/version: "
                f"{identity[0]}@{identity[1]}"
            )

        identities.add(identity)

        if (
            entry["validation"]["status"]
            != "VALIDATED_PRODUCTION"
        ):
            raise ContractError(
                "registry entry is not validated production"
            )

        validate_runtime_support(
            entry["supported_runtimes"]
        )

        validate_dependencies(
            entry["dependencies"]
        )

        unique_by(
            entry["deployment_targets"],
            "target_id",
            "deployment target_id",
        )


def validate_release(instance, schema):
    schema_validate(instance, schema)

    validate_rfc3339(
        instance["created_at"],
        "created_at",
    )

    if (
        instance["production_status"]
        != "VALIDATED_PRODUCTION"
    ):
        raise ContractError(
            "release is not validated production"
        )

    if (
        instance["validation"]["status"]
        != "VALIDATED_PRODUCTION"
    ):
        raise ContractError(
            "release validation status invalid"
        )

    if instance["validation"]["result"] != "PASS":
        raise ContractError(
            "release validation result is not PASS"
        )

    validate_runtime_support(
        instance["supported_runtimes"]
    )

    validate_dependencies(
        instance["dependencies"]
    )


def validate_deployment(instance, schema):
    schema_validate(instance, schema)

    validate_rfc3339(
        instance["started_at"],
        "started_at",
    )

    validate_rfc3339(
        instance["completed_at"],
        "completed_at",
        allow_none=True,
    )

    validate_rfc3339(
        instance["drift"]["detected_at"],
        "drift.detected_at",
        allow_none=True,
    )

    result = instance["transaction_result"]
    state = instance["resulting_deployment_status"]
    action = instance["action"]

    if result.startswith("BLOCKED_"):
        if state != "BLOCKED":
            raise ContractError(
                "blocked transaction must result in BLOCKED"
            )

    if result == "DRIFT_DETECTED":
        if state != "DRIFT_DETECTED":
            raise ContractError(
                "DRIFT_DETECTED must result in DRIFT_DETECTED"
            )

    if action == "ROLLBACK" and result == "PASS":
        if state != "ROLLED_BACK":
            raise ContractError(
                "successful ROLLBACK must result in ROLLED_BACK"
            )

    if action == "UNINSTALL" and result == "PASS":
        if state != "NOT_DEPLOYED":
            raise ContractError(
                "successful UNINSTALL must result in NOT_DEPLOYED"
            )

    if action == "DEPLOY" and result == "PASS":
        if state not in {
            "DEPLOYED_VERIFIED",
            "DEPLOYED_UNVERIFIED",
        }:
            raise ContractError(
                "successful DEPLOY has invalid resulting state"
            )

    if state == "DEPLOYED_VERIFIED":
        unacceptable = {
            "FAIL",
            "NOT_RUN",
            "UNKNOWN",
        }

        for key, value in instance[
            "verification"
        ].items():
            if value in unacceptable:
                raise ContractError(
                    "DEPLOYED_VERIFIED contains "
                    f"{key}={value}"
                )

    predecessor = instance["predecessor"]

    if (
        (predecessor["version"] is None)
        !=
        (predecessor["release_id"] is None)
    ):
        raise ContractError(
            "predecessor fields must both be null "
            "or both be non-null"
        )

    rollback = instance["rollback"]

    if rollback["availability"] == "AVAILABLE":
        if (
            rollback["target_version"] is None
            or rollback["target_release_id"] is None
        ):
            raise ContractError(
                "AVAILABLE rollback requires explicit target"
            )

    if rollback["availability"] in {
        "UNAVAILABLE",
        "NOT_APPLICABLE",
    }:
        if (
            rollback["target_version"] is not None
            or rollback["target_release_id"] is not None
        ):
            raise ContractError(
                "unavailable/not-applicable rollback "
                "cannot specify a target"
            )

    drift = instance["drift"]

    if (
        drift["status"] == "DRIFT_DETECTED"
        and drift["detected_at"] is None
    ):
        raise ContractError(
            "detected drift requires detected_at"
        )


def validate_registry_release_pair(
    entry: dict,
    release: dict,
) -> None:
    comparisons = {
        "skill_name": (
            entry["skill_name"],
            release["skill_name"],
        ),
        "version": (
            entry["version"],
            release["version"],
        ),
        "repository_id": (
            entry["owning_repository"]["repository_id"],
            release["owning_repository"]["repository_id"],
        ),
        "repository_commit": (
            entry["owning_repository"]["commit"],
            release["owning_repository"]["commit"],
        ),
        "artifact_sha256": (
            entry["artifact"]["sha256"],
            release["runtime_artifact"]["sha256"],
        ),
        "validation_status": (
            entry["validation"]["status"],
            release["validation"]["status"],
        ),
    }

    for field, values in comparisons.items():
        if values[0] != values[1]:
            raise ContractError(
                f"registry/release mismatch: {field}"
            )


def examples():
    commit = "a" * 40
    sha = "b" * 64

    repo = {
        "repository_id":
            "example/example-repo",
        "repository_name":
            "Example Repository",
        "commit":
            commit,
    }

    artifact = {
        "storage_mode":
            "REPOSITORY_FILE",
        "location":
            "releases/example-skill-v1.0.0.zip",
        "sha256":
            sha,
        "byte_size":
            1234,
        "format":
            "zip",
    }

    runtime = {
        "runtime_class":
            "CODEX_LOCAL_AGENT_SKILLS",
        "support_status":
            "SUPPORTED",
        "adapter_id":
            "codex-local-agent-skills-v1",
    }

    release = {
        "schema_name":
            "governed-ai-skill-release",
        "schema_version":
            "1.0.0",
        "release_id":
            "example-skill@1.0.0",
        "skill_name":
            "example-skill",
        "version":
            "1.0.0",
        "owning_repository":
            deepcopy(repo),
        "production_status":
            "VALIDATED_PRODUCTION",
        "runtime_artifact":
            deepcopy(artifact),
        "runtime_source_path":
            "skills/example-skill",
        "runtime_file_count":
            6,
        "validation": {
            "status":
                "VALIDATED_PRODUCTION",
            "decision_reference":
                "docs/example-validation.md",
            "result":
                "PASS",
            "validation_run_id":
                "RUN-03",
        },
        "production_baseline_reference":
            "docs/example-baseline.md",
        "supported_runtimes": [
            deepcopy(runtime)
        ],
        "dependencies": [],
        "rollback_predecessor":
            None,
        "created_at":
            "2026-09-07T12:00:00Z",
    }

    entry = {
        "entry_id":
            "example-skill@1.0.0",
        "skill_name":
            "example-skill",
        "version":
            "1.0.0",
        "owning_repository":
            deepcopy(repo),
        "release_reference":
            "docs/example-release.json",
        "artifact":
            deepcopy(artifact),
        "validation": {
            "status":
                "VALIDATED_PRODUCTION",
            "reference":
                "docs/example-validation.md",
        },
        "production_baseline_reference":
            "docs/example-baseline.md",
        "supported_runtimes": [
            deepcopy(runtime)
        ],
        "dependencies": [],
        "deployment_targets": [],
        "rollback_predecessor":
            None,
    }

    registry = {
        "schema_name":
            "governed-ai-skill-registry",
        "schema_version":
            "1.0.0",
        "registry_version":
            1,
        "entries": [
            entry
        ],
    }

    deployment = {
        "schema_name":
            "governed-ai-skill-deployment-record",
        "schema_version":
            "1.0.0",
        "deployment_id":
            "example-skill@1.0.0:test:20260907T120000Z",
        "skill_name":
            "example-skill",
        "version":
            "1.0.0",
        "release_id":
            "example-skill@1.0.0",
        "action":
            "DEPLOY",
        "transaction_result":
            "PASS",
        "resulting_deployment_status":
            "DEPLOYED_VERIFIED",
        "source": {
            "repository_id":
                "example/example-repo",
            "repository_commit":
                commit,
            "artifact_sha256":
                sha,
        },
        "target": {
            "target_id":
                "test",
            "runtime_class":
                "CODEX_LOCAL_AGENT_SKILLS",
            "host":
                "test",
            "installation_location":
                "/tmp/example-skill",
        },
        "adapter": {
            "adapter_id":
                "codex-local-agent-skills-v1",
            "adapter_version":
                "1.0.0",
        },
        "started_at":
            "2026-09-07T12:00:00Z",
        "completed_at":
            "2026-09-07T12:00:10Z",
        "verification": {
            "inventory":
                "PASS",
            "hash":
                "PASS",
            "registration":
                "NOT_APPLICABLE",
            "dependencies":
                "PASS",
            "smoke_test":
                "PASS",
        },
        "predecessor": {
            "version":
                None,
            "release_id":
                None,
        },
        "rollback": {
            "availability":
                "UNAVAILABLE",
            "target_version":
                None,
            "target_release_id":
                None,
        },
        "drift": {
            "status":
                "NO_DRIFT",
            "detected_at":
                None,
        },
        "authorization_reference":
            "test authorization",
    }

    return registry, release, deployment


def self_test():
    vocab = load_json(VOCAB_PATH)
    registry_schema = load_json(REGISTRY_SCHEMA_PATH)
    release_schema = load_json(RELEASE_SCHEMA_PATH)
    deploy_schema = load_json(DEPLOY_SCHEMA_PATH)

    if vocab["status"] != "FROZEN":
        raise ContractError(
            "vocabulary is not FROZEN"
        )

    for schema in [
        registry_schema,
        release_schema,
        deploy_schema,
    ]:
        jsonschema.Draft202012Validator.check_schema(
            schema
        )

    registry, release, deployment = examples()

    validate_registry(
        registry,
        registry_schema,
    )

    validate_release(
        release,
        release_schema,
    )

    validate_deployment(
        deployment,
        deploy_schema,
    )

    validate_registry_release_pair(
        registry["entries"][0],
        release,
    )

    tests = []

    bad = deepcopy(registry)
    bad["entries"].append(
        deepcopy(bad["entries"][0])
    )
    tests.append(
        ("duplicate registry entry", "registry", bad)
    )

    bad = deepcopy(release)
    bad["supported_runtimes"].append(
        deepcopy(bad["supported_runtimes"][0])
    )
    tests.append(
        ("duplicate runtime", "release", bad)
    )

    bad = deepcopy(release)
    bad["created_at"] = "not-a-date"
    tests.append(
        ("invalid release date-time", "release", bad)
    )

    bad = deepcopy(deployment)
    bad["transaction_result"] = (
        "BLOCKED_DEPENDENCY"
    )
    bad["resulting_deployment_status"] = (
        "DEPLOYED_VERIFIED"
    )
    tests.append(
        ("blocked false success", "deployment", bad)
    )

    bad = deepcopy(deployment)
    bad["resulting_deployment_status"] = (
        "DEPLOYED_VERIFIED"
    )
    bad["verification"]["hash"] = "FAIL"
    tests.append(
        ("verified with failed hash", "deployment", bad)
    )

    bad = deepcopy(deployment)
    bad["rollback"]["availability"] = "AVAILABLE"
    bad["rollback"]["target_version"] = None
    bad["rollback"]["target_release_id"] = None
    tests.append(
        ("rollback without target", "deployment", bad)
    )

    bad = deepcopy(deployment)
    bad["started_at"] = "not-a-date"
    tests.append(
        ("invalid date-time", "deployment", bad)
    )

    validators = {
        "registry": lambda item: validate_registry(
            item,
            registry_schema,
        ),
        "release": lambda item: validate_release(
            item,
            release_schema,
        ),
        "deployment": lambda item: validate_deployment(
            item,
            deploy_schema,
        ),
    }

    for name, kind, item in tests:
        try:
            validators[kind](item)
        except (
            ContractError,
            jsonschema.ValidationError,
        ):
            print(f"{name}: PASS")
        else:
            raise ContractError(
                f"negative self-test accepted: {name}"
            )

    mismatch = deepcopy(release)
    mismatch["runtime_artifact"]["sha256"] = "c" * 64

    try:
        validate_registry_release_pair(
            registry["entries"][0],
            mismatch,
        )
    except ContractError:
        print(
            "registry/release mismatch rejection: PASS"
        )
    else:
        raise ContractError(
            "registry/release mismatch was accepted"
        )

    print("schema meta-validation: PASS")
    print("positive semantic validation: PASS")
    print("negative semantic rejection: PASS")
    print("format checking: PASS")
    print("cross-record identity validation: PASS")
    print("SELF-TEST: PASS")


def main():
    parser = argparse.ArgumentParser()

    parser.add_argument(
        "--self-test",
        action="store_true",
    )

    parser.add_argument(
        "--kind",
        choices=[
            "registry",
            "release",
            "deployment",
        ],
    )

    parser.add_argument(
        "--file",
        type=Path,
    )

    args = parser.parse_args()

    if args.self_test:
        self_test()
        return 0

    if not args.kind or not args.file:
        parser.error(
            "use --self-test or --kind KIND --file PATH"
        )

    schemas = {
        "registry":
            load_json(REGISTRY_SCHEMA_PATH),
        "release":
            load_json(RELEASE_SCHEMA_PATH),
        "deployment":
            load_json(DEPLOY_SCHEMA_PATH),
    }

    validators = {
        "registry":
            validate_registry,
        "release":
            validate_release,
        "deployment":
            validate_deployment,
    }

    instance = load_json(args.file)

    validators[args.kind](
        instance,
        schemas[args.kind],
    )

    print(
        f"{args.kind} contract validation: PASS"
    )

    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except ContractError as exc:
        print(
            f"CONTRACT VALIDATION: FAIL\n{exc}",
            file=sys.stderr,
        )
        raise SystemExit(1)
