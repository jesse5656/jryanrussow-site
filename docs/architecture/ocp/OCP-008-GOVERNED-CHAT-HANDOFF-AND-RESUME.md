# OCP-008 — Governed Chat Handoff and Resume

Version: 1.0.0

Status:
Approved

Type:
Operational Change Proposal

Authority:
Systems Architect Discipline

Proposed:
2026-09-04

Approved:
2026-09-04

Scope Summary:
Governed ChatGPT workstream handoff, session continuation, repository-state reconciliation, deterministic context support, and reusable handoff-skill development

---

## Scope

- `docs/architecture/ocp/OCP-008-GOVERNED-CHAT-HANDOFF-AND-RESUME.md`
- `docs/operations/researcher/CHATGPT-WORKFLOW.md`
- `docs/operations/researcher/DAILY-OPERATIONS.md`
- `docs/operations/researcher/SESSION-COMMANDS.md`
- `START-HERE.md`
- `docs/architecture/GOVERNED-CHAT-HANDOFF-SKILL-SPECIFICATION.md`
- `docs/architecture/validation/handoff-governed-work/`
- `scripts/platform/repository_context.py`

---

## Purpose

Establish a governed and repeatable procedure for transferring active work from one ChatGPT conversation to another without losing authoritative repository state, implementation state, unresolved decisions, exact next actions, or governance status.

The procedure shall support both:

1. **HANDOFF** — creating the minimum sufficient continuation package for a replacement conversation; and
2. **RESUME** — resolving current repository state, reconciling the handoff against that state, and continuing the work without unnecessary rediscovery.

The capability shall preserve the existing principle that the repository, not a ChatGPT conversation, is the authoritative source of institutional memory.

---

## Current State

Existing repository guidance establishes that:

- ChatGPT conversations are temporary working sessions;
- the repository is authoritative institutional memory;
- long or completed sessions should transition to a new conversation;
- session close should identify completed work, current objective, next concrete step, and deferred work;
- repository changes must pass Repository Context Resolution before implementation and Governance Enforcement before governed commit;
- deterministic repository-owned tooling is preferred for reusable and material process.

However, the repository does not currently define a complete governed protocol for transferring workstream state between conversations.

Existing session-transition guidance does not deterministically preserve or reconcile:

- repository branch and HEAD;
- local-versus-remote divergence;
- staged, unstaged, and untracked changes;
- applicable governance and exact proposal status;
- multiple repositories involved in one workstream;
- completed, active, blocked, pending, unresolved, rejected, and watch states;
- implementation state that has not yet become repository memory;
- required artifacts and hashes;
- interrupted commands;
- exact next action;
- source provenance;
- stale handoff claims after repository state advances;
- secret-exclusion requirements.

The repository already reserves:

`docs/operations/researcher/CHATGPT-WORKFLOW.md`

as the permanent location for the ChatGPT workflow. That existing location shall be completed rather than duplicated by a parallel workflow document.

---

## Approved Operational Change

Establish a Governed Chat Handoff and Resume workflow with two operating modes.

### Mode A — HANDOFF

When a user directs the current work to move to a new conversation, the session shall produce a concise continuation package containing only information materially necessary for continuation.

Repository-derived information shall be used wherever available.

Chat-derived information may be included only where necessary to preserve current work that has not yet become authoritative repository state.

The handoff shall distinguish the source and authority of material claims.

### Mode B — RESUME

A replacement conversation receiving a governed handoff shall:

1. identify the governing workstream;
2. resolve current repository context before modifying governed repository state;
3. verify repository-derived facts rather than blindly trusting the handoff;
4. compare the current repository state against the state captured in the handoff;
5. reconcile stale or contradictory claims;
6. preserve chat-only state as chat-derived rather than silently promoting it to repository authority;
7. determine the exact current next action;
8. continue from the resolved state rather than restarting broad discovery.

---

## Source Authority

The governing principle is:

**repository-derived where possible; chat-derived only where necessary.**

A governed handoff shall not allow conversational state to silently override authoritative repository state.

Where sources conflict, the handoff or resume process shall identify the conflict explicitly and apply the applicable repository governance and authority hierarchy.

Remote repository state shall not silently override newer authoritative local repository state.

A clean working tree shall not be represented as equivalent to synchronization with the configured upstream.

---

## Required Handoff State

Where applicable to the workstream, the governed handoff shall preserve the minimum sufficient state from the following categories.

### Workstream Identity

- governing workstream;
- repository or repositories involved;
- purpose and scope boundary.

### Repository State

For each relevant repository:

- repository purpose;
- local path;
- current branch;
- current HEAD;
- upstream branch when available;
- ahead/behind state when available;
- clean or dirty working-tree state;
- staged changes;
- unstaged changes;
- untracked files;
- repository authority classification.

### Governance State

- applicable constitutions;
- engineering standards;
- operational procedures;
- implementation guidance;
- AI collaboration guidance;
- relevant ACP/OCP documents;
- exact governance status such as Proposed, Approved, Accepted, or unresolved.

A handoff shall not silently convert a proposal into an approved decision.

### Current Work State

As applicable:

- completed;
- active;
- blocked;
- pending;
- unresolved;
- rejected;
- watch/monitoring;
- interrupted.

Rejected architecture or superseded decisions shall not be revived as active merely because they appear in historical conversation context.

### Exact Next Action

The handoff shall identify the narrowest known next action.

If the next action is genuinely unresolved, the handoff shall say so rather than fabricate one.

### Invariants and Boundaries

Preserve material rules that must remain true during continuation, including:

- governance boundaries;
- architecture boundaries;
- implementation stop lines;
- terminology that must remain exact;
- approved versus target-state distinctions;
- host/environment distinctions;
- relevant scope exclusions.

### Artifacts

Where applicable:

- filenames;
- repository paths;
- external output files required for continuation;
- hashes when material;
- validation status;
- whether an artifact actually exists.

A handoff shall not claim that an artifact exists when creation did not complete.

### Security

A handoff shall never intentionally include:

- passwords;
- API keys;
- bearer tokens;
- session tokens;
- private keys;
- database credentials;
- secret configuration values.

Where a secret is operationally relevant, only its existence or required retrieval step may be referenced.

---

## Deterministic Support

Repository state suitable for deterministic resolution shall be obtained from repository-owned deterministic tooling where practical.

Existing:

`scripts/platform/repository_context.py`

shall remain the primary repository-context implementation unless a later governed design demonstrates that another component is necessary.

The handoff capability shall not duplicate repository-status, governance-resolution, or Operating Plan parsing logic merely to support ChatGPT handoff.

The existing resolver may be repaired or extended to provide required deterministic state, including:

- reliable Operating Plan resolution;
- reliable ACP/OCP status extraction;
- upstream information;
- ahead/behind information;
- staged changes;
- unstaged changes;
- untracked files.

A separate handoff-context utility shall not be introduced unless implementation evidence demonstrates a requirement that cannot be cleanly satisfied by extending or consuming the existing Repository Context Resolution capability.

For multiple repositories, any future orchestration layer shall consume repository-specific context rather than recreate repository-context logic.

---

## Known Preimplementation Findings

Preimplementation audit has already identified deterministic-support defects relevant to this procedure.

### Operating Plan Resolution

Repository Context Resolution currently identifies the Operating Plan file but does not reliably resolve its Current Objective, Objective Type, Status, Active Sprint, or Next Concrete Step.

The governed handoff capability shall not convert unresolved deterministic fields into inferred facts.

### Governance Status Resolution

Repository Context Resolution has demonstrated at least one case where an existing approved governance document is represented with an unresolved or unknown status.

The governed handoff capability shall not silently downgrade, upgrade, or infer governance status when deterministic sources conflict.

These findings shall be treated as validation requirements for the supporting deterministic capability.

---

## Skill Development

A reusable executable skill may implement this workflow only after a governed Skill Specification is established.

The specification shall define at minimum:

- HANDOFF behavior;
- RESUME behavior;
- source precedence;
- required handoff schema;
- source labeling;
- stale-state reconciliation;
- exact-next-action semantics;
- incomplete and interrupted operation handling;
- artifact-existence requirements;
- security exclusions;
- multiple-repository behavior;
- deterministic-support boundaries;
- validation methodology;
- production-package boundaries.

The final runtime skill name shall be frozen by the governed specification rather than by this OCP.

`handoff-governed-work` is the current working name only.

---

## Validation Requirement

The skill shall not be represented as production-ready until it passes controlled regression validation.

The validation corpus shall include, at minimum:

1. clean single repository;
2. Proposed ACP;
3. Approved ACP;
4. dirty working tree;
5. staged changes;
6. staged and unstaged changes;
7. multiple repositories;
8. newer chat-only state;
9. chat contradicting repository;
10. interrupted command;
11. completed command;
12. exact governed vocabulary;
13. rejected architecture;
14. secret-containing conversation material;
15. cross-workstream contamination;
16. required file missing;
17. known exact next action;
18. genuinely unresolved next action;
19. stale handoff after repository advances;
20. local state differing from remote main;
21. Operating Plan parser partial failure;
22. approved governance document reported with unresolved status;
23. local repository ahead of remote;
24. clean working tree with unpushed commit;
25. conflicting repository, remote, implementation, and chat states.

Validation shall verify both omission and inclusion behavior: the handoff must preserve material continuation state without dumping irrelevant conversation history.

Independent operator/evaluator separation shall be used where required by the applicable validated skill-development methodology.

Proposed governance concerning validation evidence shall not be silently treated as approved merely by using compatible validation practices.

---

## Operational Documentation

`docs/operations/researcher/CHATGPT-WORKFLOW.md`

shall become the primary human-readable operating procedure for governed ChatGPT session handoff and resume.

Existing documents such as:

- `START-HERE.md`;
- `docs/operations/researcher/DAILY-OPERATIONS.md`;
- `docs/operations/researcher/SESSION-COMMANDS.md`;
- `docs/operations/workspace/AI-COLLABORATION-STANDARD.md`;

may be updated only as necessary to reference or correctly integrate the workflow.

Existing guidance shall be modified rather than duplicated where practical.

---

## Scope Boundary

This OCP authorizes development and validation of the governed handoff/resume procedure and its supporting deterministic capability.

It does not authorize:

- changes to constitutional authority;
- changes to the five-layer governance hierarchy;
- replacement of Repository Context Resolution;
- bypassing Governance Enforcement;
- automatic promotion of chat state into repository authority;
- silent adoption of proposed ACP/OCP documents;
- unrelated EspoCRM implementation;
- unrelated ERP implementation;
- broad reorganization of repository architecture;
- storage of secrets in handoff artifacts;
- runtime skill installation before validation.

---

## Implementation Sequence

### Phase 0 — Establish Governed Baseline

- record this OCP as approved;
- verify repository context;
- verify clean synchronized starting state.

### Phase 1 — Define Procedure

- complete `CHATGPT-WORKFLOW.md`;
- integrate references from existing session documentation only where necessary.

### Phase 2 — Specify Skill

- create the governed handoff skill specification;
- freeze terminology, authority rules, schema, and failure behavior.

### Phase 3 — Repair Deterministic Support

- correct demonstrated Repository Context Resolution defects;
- add only the deterministic fields required by the approved specification;
- avoid duplicate context-resolution logic.

### Phase 4 — Freeze Validation Controls

- create/freeze fixtures;
- candidate schema;
- evaluator rubric;
- manifests and hashes where required;
- operator/evaluator separation.

### Phase 5 — Independent Regression

- evaluate every frozen fixture;
- preserve actual candidate failures;
- distinguish evaluator/control defects from candidate-behavior defects.

### Phase 6 — Remediation

- remediate only demonstrated defects;
- repeat controlled validation as required.

### Phase 7 — Runtime Construction

Only after validation PASS:

- construct the concise executable skill;
- exclude evaluator truth and secrets from the runtime package;
- establish production-package baseline.

### Phase 8 — Installation

Treat installation or registration as a separate operational transaction.

---

## Success Conditions

This operational change succeeds when:

1. a long-running governed workstream can move to a replacement conversation without depending on conversational memory;
2. the replacement conversation resolves current repository state before continuing governed work;
3. stale handoff claims are detected rather than blindly trusted;
4. repository authority remains intact;
5. chat-only state remains correctly labeled until institutionalized;
6. exact governance status is preserved;
7. material dirty/staged/local-ahead state is not lost;
8. interrupted work is not represented as complete;
9. secret material is excluded;
10. the resulting handoff is concise enough to avoid broad rediscovery;
11. the reusable skill passes controlled independent regression before production use.

---

## Failure Conditions

Reassess the procedure if:

- handoffs routinely require copying entire conversations;
- repository facts are repeatedly reconstructed from chat instead of deterministic sources;
- remote state is incorrectly treated as newer than local authoritative state;
- proposed governance is represented as approved;
- current implementation is confused with target architecture;
- rejected architecture is revived;
- exact terminology is rewritten in a way that changes meaning;
- the process duplicates Repository Context Resolution logic;
- secret material enters handoff artifacts;
- the process becomes more expensive than resolving the workstream directly from institutional memory.

---

## Governance Boundary

This operational change establishes an operational session-continuity procedure within the existing Systems Architect Discipline governance architecture.

It does not change constitutional principles, governance authority, repository ownership, or the repository-governance hierarchy.

Any later change that materially alters those architectural boundaries shall require the appropriate separate governance transaction.

---

## Relationship to Existing Governance

Repository constitutions and Repository Governance remain authoritative.

The Deterministic Automation Standard governs reusable deterministic support.

The Repository Change Workflow continues to require Repository Context Resolution before governed implementation and Governance Enforcement before governed commit.

The AI Collaboration Standard continues to govern assistant behavior.

ACP-002 remains the architectural authority for Repository Context Resolution and Governance Enforcement.

ACP-003 and OCP-007 remain at their exact repository status and shall not be treated as approved by this OCP unless separately approved.

OCP-002 remains authoritative for the `docs/operations/researcher/` operational-documentation structure.

---

## Approval

Approved by the governing Systems Architect Discipline session on 2026-09-04.
