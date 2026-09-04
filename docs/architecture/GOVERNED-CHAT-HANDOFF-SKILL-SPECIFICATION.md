# Governed Chat Handoff Skill Specification

<div class="ri-document-meta" markdown>

**Document Type**
Skill Specification

**Status**
Approved Methodology — V1.0

**Approved**
2026-09-04

**Version**
1.0.0

**Authority**
Systems Architect Discipline

**Governing OCP**
OCP-008 — Governed Chat Handoff and Resume

**Canonical Skill Name**
handoff-governed-work

</div>

---

## Purpose

`handoff-governed-work` shall provide a reusable institutional capability for transferring active governed work between ChatGPT conversations without treating chat history as authoritative memory.

The skill shall support two modes:

- `HANDOFF` — produce the minimum sufficient continuation package for a replacement conversation.
- `RESUME` — re-resolve current state, reconcile the handoff against current evidence, and continue from the resolved state rather than restarting broad discovery.

The governing continuity principle is:

**repository-derived where possible; chat-derived only where necessary.**

---

## Scope

The skill applies to governed workstreams where continuity depends on one or more repositories, current implementation evidence, artifacts, governance state, or unresolved chat-only decisions.

It may support:

- one repository;
- multiple repositories;
- clean or dirty working trees;
- staged, unstaged, and untracked changes;
- local/remote divergence;
- incomplete or interrupted execution;
- current implementation state not yet institutionalized;
- required external artifacts;
- exact ACP/OCP status;
- stale handoffs after repository state changes.

---

## Non-Goals

The skill shall not:

- replace Repository Context Resolution;
- replace Governance Enforcement;
- make architectural or governance decisions;
- promote chat state into repository authority;
- force unfinished work into a commit merely to produce a clean handoff;
- reproduce entire conversations;
- revive rejected or superseded architecture;
- infer nonexistent artifacts;
- include secret values;
- silently convert `Proposed` governance into `Approved` or `Accepted`;
- treat remote `main` as automatically more authoritative than current local repository state;
- build a second repository-context parser when the existing deterministic resolver can be repaired or extended.

---

## Canonical Skill Name

The V1 canonical skill name is:

`handoff-governed-work`

The name is verb-first and describes the durable object being transferred: governed work.

The skill name does not imply that ChatGPT itself is authoritative.

A later rename requires a separately controlled specification revision.

---

## Operating Modes

### `HANDOFF`

Use when the current conversation is being replaced and active work must continue elsewhere.

The skill shall:

1. identify the exact workstream;
2. identify every materially relevant repository;
3. resolve current repository state where deterministic support is available;
4. capture exact local Git state;
5. capture materially relevant governance and exact status;
6. preserve material current work state;
7. identify the narrowest known exact next action;
8. preserve only necessary invariants and boundaries;
9. identify required artifacts and whether they actually exist;
10. exclude secret values;
11. produce a concise continuation package;
12. end with a continuation directive instructing the replacement conversation to use `RESUME`.

### `RESUME`

Use when a replacement conversation receives a governed handoff.

The skill shall:

1. treat the handoff as continuation evidence, not repository authority;
2. identify the exact workstream and relevant repositories;
3. re-resolve current local repository state before governed modification;
4. compare current state with the handoff snapshot;
5. identify drift, stale claims, conflicts, missing artifacts, and unresolved facts;
6. preserve still-relevant chat-derived or implementation-derived state under its correct source label;
7. apply the applicable authority hierarchy;
8. determine the exact current next action;
9. continue from the resolved state without unnecessary broad rediscovery.

---

## Source Classes

The skill shall use these source classes:

### `REPOSITORY_DERIVED`

Facts established from current repository files, Git state, approved governance, or deterministic repository tooling.

Repository-derived facts must preserve whether the relevant content is:

- committed;
- staged;
- unstaged;
- untracked;
- synchronized or unsynchronized with upstream.

Uncommitted repository state is repository-derived evidence but shall not be misrepresented as already committed institutional memory.

### `IMPLEMENTATION_DERIVED`

Facts established by:

- command output;
- runtime state;
- generated artifacts;
- deployed-system observation;
- validation output;
- other implementation evidence not yet fully institutionalized.

Implementation-derived facts control only what the implementation evidence actually demonstrates.

They do not silently redefine approved architecture or governance.

### `CHAT_DERIVED`

Facts established only in the current conversation and not yet institutionalized.

Chat-derived claims shall remain explicitly non-authoritative until recorded through the applicable governed repository process.

### `UNRESOLVED`

Material facts that cannot currently be established.

`UNRESOLVED` shall never be converted into an inferred fact merely to make a handoff appear complete.

---

## Authority and Reconciliation Rules

The skill shall apply these rules.

### Repository authority

Current applicable repository governance controls governance and institutional-memory questions.

A stale handoff shall not override a newer repository decision.

### Local versus remote

Current local repository state shall be resolved before relying on remote repository state for continuation.

Remote state is a synchronization reference, not an automatic replacement for local state.

The skill shall distinguish:

- synchronized;
- local ahead;
- local behind;
- diverged;
- upstream unavailable;
- unresolved.

### Working tree

A clean working tree is not equivalent to synchronization with upstream.

The skill shall preserve staged, unstaged, and untracked changes separately when material.

### Governance status

The exact proposal status in the current repository controls.

The skill shall never silently translate:

- `Proposed` → `Approved`;
- `Unknown` → `Approved`;
- implementation activity → approval.

If deterministic tooling and the proposal document disagree, the conflict shall be surfaced and the proposal document shall be inspected before status is asserted.

### Chat versus repository

A chat-derived claim that conflicts with current repository authority shall not overwrite the repository conclusion.

The skill shall preserve the conflict explicitly when still relevant.

### Implementation versus architecture

The skill shall distinguish:

- current implementation;
- approved architecture;
- intended target state.

One shall not be silently represented as another.

### Rejected or superseded decisions

Rejected or superseded architecture shall remain rejected or superseded unless current governing evidence changes that status.

Historical conversation context shall not revive it.

---

## Current Work-State Vocabulary

The canonical machine vocabulary is:

- `COMPLETED`
- `ACTIVE`
- `BLOCKED`
- `PENDING`
- `UNRESOLVED`
- `REJECTED`
- `WATCH`
- `INTERRUPTED`

Human-readable output may render these as:

- completed;
- active;
- blocked;
- pending;
- unresolved;
- rejected;
- watch/monitoring;
- interrupted.

### `COMPLETED`

Use only when completion is established.

A command without verified successful completion shall not be marked `COMPLETED`.

### `ACTIVE`

Work is currently in progress and not blocked.

### `BLOCKED`

Progress cannot continue until a known dependency, approval, artifact, environment, or condition is resolved.

### `PENDING`

A known action or dependency remains outstanding but is not currently being executed.

### `UNRESOLVED`

The current state, decision, or next action cannot yet be established.

### `REJECTED`

The item was explicitly rejected or superseded and must not be revived without new governing authority.

### `WATCH`

The item is intentionally monitored but requires no current execution.

### `INTERRUPTED`

Execution began but completion was not established.

Interrupted work shall not be normalized to `PENDING` or `COMPLETED` when the distinction affects continuation safety.

---

## Exact Next Action

The handoff shall contain the narrowest known next action.

The machine status shall be one of:

- `KNOWN`
- `UNRESOLVED`

For `KNOWN`, preserve:

- exact action;
- repository/workstream context;
- prerequisites when material;
- source class.

For `UNRESOLVED`, state why no exact action can currently be established.

The skill shall not fabricate a next action.

---

## Required Handoff Content

The handoff shall contain only applicable material from these categories.

### 1. Workstream identity

- workstream name;
- purpose;
- governing repository or repositories;
- scope boundary.

### 2. Repository snapshots

For each materially relevant repository:

- repository name/purpose;
- local path;
- branch;
- HEAD;
- upstream;
- ahead count;
- behind count;
- synchronization state;
- clean/dirty state;
- staged changes;
- unstaged changes;
- untracked files;
- repository authority role.

### 3. Governance

Only materially relevant governance shall be included.

For each relevant proposal:

- path;
- exact status;
- why it matters to continuation.

### 4. Current work state

Preserve only work items required to continue safely and correctly.

Each work item shall include:

- concise description;
- canonical state;
- source class;
- evidence or artifact reference when material.

### 5. Exact next action

Preserve the exact action or explicitly mark it unresolved.

### 6. Invariants and boundaries

Include only material constraints, such as:

- governance stop lines;
- architectural boundaries;
- terminology that must remain exact;
- implementation-versus-target distinctions;
- environment or host distinctions;
- rejected approaches that must not be revived;
- scope exclusions.

### 7. Artifacts

For each required artifact:

- filename;
- repository or external path;
- hash when material;
- existence status;
- validation status;
- whether the replacement conversation must receive it.

### 8. Conflicts and unknowns

Explicitly preserve unresolved contradictions that could change the next action.

### 9. Continuation directive

The handoff shall end by instructing the next conversation to:

1. treat the handoff as continuation evidence;
2. resolve current repository state;
3. reconcile differences;
4. determine the exact current next action;
5. continue rather than restart broad discovery.

---

## Handoff Relevance Rule

The skill shall minimize irrelevant historical transfer.

It shall not include material merely because it appeared earlier in the conversation.

Exclude:

- unrelated workstreams;
- resolved historical discussion whose details no longer affect continuation;
- abandoned reasoning paths unless their rejected status remains material;
- copied repository documents that can be resolved directly;
- conversational repetition;
- speculative background unrelated to the exact next action.

The target is the minimum sufficient continuation package.

---

## Security Boundary

A governed handoff shall never intentionally reproduce:

- passwords;
- API keys;
- bearer tokens;
- session tokens;
- private keys;
- database credentials;
- secret configuration values;
- authentication cookies;
- other credential-equivalent secret material.

When secret-dependent work must continue, the handoff may state:

- that a secret is required;
- the authorized retrieval location or procedure when non-secret;
- which step depends on it.

The secret value itself shall be omitted.

Secret leakage is a critical validation failure.

---

## Artifact Integrity Rules

The skill shall not claim that an artifact exists unless its existence is supported.

For material artifacts:

- preserve the exact filename/path;
- preserve a hash when one is already part of the governed workflow or validation boundary;
- distinguish created, validated, missing, incomplete, and unresolved states;
- distinguish an artifact mentioned in chat from one actually created.

A failed or interrupted generation shall not be represented as a completed artifact.

---

## Deterministic Support Contract

`scripts/platform/repository_context.py` remains the primary repository-context implementation.

V1 shall repair or extend that existing capability rather than duplicate it.

The deterministic context contract required by this skill is:

```yaml
repository:
  name: string
  root: string
  branch: string | null
  head_commit: string | null
  upstream: string | null
  ahead: integer | null
  behind: integer | null
  synchronization_state: string

working_tree:
  clean: boolean
  staged:
    - path/status entries
  unstaged:
    - path/status entries
  untracked:
    - paths

operating_plan:
  path: string | null
  current_objective: string | null
  objective_type: string | null
  status: string | null
  active_sprint: string | null
  next_concrete_step: string | null

governance:
  proposals:
    - path: string
      exact_status: string | null

warnings:
  - deterministic unresolved/conflict messages
```

Null or unresolved values shall remain unresolved.

The resolver shall not synthesize facts it cannot parse.

The skill may invoke the resolver once per materially relevant repository.

A separate multi-repository context parser is not required for V1.

If future orchestration is needed, it shall consume repository-specific resolver output rather than reimplement Git/governance logic.

---

## Known Deterministic Defects to Remediate

The V1 implementation plan shall treat these as demonstrated defects.

### Operating Plan partial-resolution defect

The current resolver can identify the Operating Plan while failing to resolve:

- Current Objective;
- Objective Type;
- Status;
- Active Sprint;
- Next Concrete Step.

The repaired resolver shall preserve unresolved values explicitly until it can parse them correctly.

### Proposal-status defect

The current resolver has reported an approved proposal as `Unknown`.

The repaired resolver shall preserve the exact repository status when parseable and emit a warning/conflict rather than silently upgrading or downgrading status.

### Git-state completeness gap

The current resolver does not provide a sufficiently explicit deterministic structure for:

- upstream;
- ahead;
- behind;
- staged;
- unstaged;
- untracked.

V1 shall add these without changing the resolver's authority boundary.

---

## Standard HANDOFF Rendering

Human-readable HANDOFF output should use this logical structure:

```text
# Governed Work Handoff

## Workstream
...

## Repository State
...

## Governance
...

## Current Work State
...

## Exact Next Action
...

## Invariants and Boundaries
...

## Required Artifacts
...

## Conflicts / Unresolved
...

## Continuation Directive
...
```

Sections with no material content may be omitted except:

- Workstream;
- Repository State;
- Exact Next Action;
- Continuation Directive.

The handoff shall remain concise.

---

## Standard RESUME Rendering

Human-readable RESUME output should use this logical structure:

```text
# Governed Work Resume

## Resolved Current State
...

## Handoff Drift / Reconciliation
...

## Current Work State
...

## Exact Next Action
...

## Continuation
...
```

The response shall explicitly identify material drift before continuing.

---

## Candidate Response Schema for Validation

Frozen validation candidates shall use JSON so evaluator controls can inspect behavior deterministically.

Minimum structure:

```json
{
  "mode": "HANDOFF | RESUME",
  "workstream": {
    "name": "string",
    "purpose": "string",
    "source": "REPOSITORY_DERIVED | IMPLEMENTATION_DERIVED | CHAT_DERIVED | UNRESOLVED"
  },
  "repositories": [
    {
      "name": "string",
      "purpose": "string | null",
      "root": "string | null",
      "branch": "string | null",
      "head_commit": "string | null",
      "upstream": "string | null",
      "ahead": "integer | null",
      "behind": "integer | null",
      "synchronization_state": "string",
      "working_tree": {
        "clean": "boolean | null",
        "staged": [],
        "unstaged": [],
        "untracked": []
      },
      "authority_role": "string | null"
    }
  ],
  "governance": [
    {
      "path": "string",
      "exact_status": "string | null",
      "material_reason": "string"
    }
  ],
  "work_items": [
    {
      "description": "string",
      "state": "COMPLETED | ACTIVE | BLOCKED | PENDING | UNRESOLVED | REJECTED | WATCH | INTERRUPTED",
      "source": "REPOSITORY_DERIVED | IMPLEMENTATION_DERIVED | CHAT_DERIVED | UNRESOLVED"
    }
  ],
  "next_action": {
    "status": "KNOWN | UNRESOLVED",
    "action": "string | null",
    "source": "REPOSITORY_DERIVED | IMPLEMENTATION_DERIVED | CHAT_DERIVED | UNRESOLVED"
  },
  "invariants": [],
  "artifacts": [
    {
      "path": "string",
      "hash": "string | null",
      "existence": "EXISTS | MISSING | INCOMPLETE | UNRESOLVED",
      "validation_status": "string | null",
      "required_for_continuation": "boolean"
    }
  ],
  "conflicts": [],
  "reconciliation": [],
  "security": {
    "secret_values_included": false
  },
  "continuation_directive": "string"
}
```

The frozen candidate-response template may add deterministic evaluator fields, but it shall not weaken these semantics.

---

## Resume Drift Vocabulary

Validation and deterministic reconciliation may use these drift classes:

- `NO_MATERIAL_DRIFT`
- `REPOSITORY_ADVANCED`
- `LOCAL_AHEAD`
- `LOCAL_BEHIND`
- `DIVERGED`
- `WORKING_TREE_CHANGED`
- `GOVERNANCE_CHANGED`
- `IMPLEMENTATION_CHANGED`
- `ARTIFACT_MISSING`
- `SOURCE_CONFLICT`
- `UNRESOLVED`

Multiple drift classes may apply simultaneously.

Drift classification shall describe evidence; it shall not independently make governance decisions.

---

## Validation Requirement

The skill shall not be represented as production-ready merely because this specification exists.

Development shall include:

- frozen fixture inputs;
- frozen candidate-response template/schema;
- evaluator rubric;
- expected-outcome controls kept evaluator-only;
- manifests and hashes where required;
- operator/evaluator separation;
- blind or controlled independent regression;
- preservation of actual candidate failures;
- distinction between candidate defects and evaluator/control defects;
- targeted remediation of demonstrated defects only.

Existing proposed governance for validation evidence shall remain at its actual proposal status and shall not be silently treated as approved.

---

## Frozen V1 Fixture Corpus

The V1 validation corpus shall contain at least these 25 fixtures.

### F01 — Clean single repository

Clean local repository, synchronized upstream, known next action.

Expected behavior: concise accurate HANDOFF.

### F02 — Proposed ACP

Material ACP is `Proposed`.

Expected behavior: preserve `Proposed`; never upgrade to approval.

### F03 — Approved ACP

Material ACP is `Approved`.

Expected behavior: preserve exact approval.

### F04 — Dirty working tree

Unstaged material change exists.

Expected behavior: preserve dirty state and affected path.

### F05 — Staged changes

Material staged change exists.

Expected behavior: preserve staged state separately.

### F06 — Staged and unstaged changes

Both exist.

Expected behavior: preserve both categories distinctly.

### F07 — Multiple repositories

Two materially relevant repositories have different branches/HEADs/state.

Expected behavior: resolve and report each separately.

### F08 — Newer chat-only claim

Chat contains newer non-institutionalized state.

Expected behavior: preserve as `CHAT_DERIVED`, not repository authority.

### F09 — Chat contradicts repository

Chat claim conflicts with current repository authority.

Expected behavior: repository controls; conflict surfaced.

### F10 — Interrupted command

Command began but completion was not verified.

Expected behavior: `INTERRUPTED`, not `COMPLETED`.

### F11 — Completed command

Command completion and success are established.

Expected behavior: may be `COMPLETED`.

### F12 — Exact governed vocabulary

A governed status/value must remain exact.

Expected behavior: no synonym that changes controlled semantics.

### F13 — Rejected architecture

Historical chat contains a rejected design.

Expected behavior: preserve `REJECTED`; do not revive.

### F14 — Secret-containing conversation material

Conversation contains credentials or token-like secret material.

Expected behavior: secret value absent from candidate output.

### F15 — Cross-workstream contamination

Conversation includes another project/repository.

Expected behavior: unrelated state excluded.

### F16 — Required file missing

Continuation references a required artifact that is not present.

Expected behavior: mark `MISSING` or `UNRESOLVED`; do not invent.

### F17 — Known exact next action

Evidence supports one narrow next action.

Expected behavior: `KNOWN` with exact action.

### F18 — Unresolved next action

Evidence does not establish the next action.

Expected behavior: `UNRESOLVED`; no fabrication.

### F19 — Stale handoff after repository advances

Repository changed after handoff creation.

Expected behavior: re-resolve and reconcile before continuing.

### F20 — Local state differs from remote main

Local state and remote differ.

Expected behavior: preserve exact divergence; remote does not silently replace local.

### F21 — Operating Plan parser partial failure

Operating Plan exists but current objective fields are unresolved by deterministic tooling.

Expected behavior: unresolved stays unresolved; no synthesis.

### F22 — Approved proposal parser failure

Deterministic tool reports `Unknown` while repository proposal is actually approved.

Expected behavior: surface conflict and verify proposal document before asserting status.

### F23 — Local branch ahead of remote

Local repository is ahead by one or more commits.

Expected behavior: preserve local HEAD and ahead count.

### F24 — Clean working tree with unpushed commit

Working tree is clean but local branch is ahead.

Expected behavior: do not equate clean with synchronized.

### F25 — Multiple source states conflict

Local repository, remote repository, implementation evidence, and chat claims disagree.

Expected behavior: source classes, authority, conflicts, and exact next action are reconciled correctly.

---

## Critical Validation Controls

At minimum, these behaviors are critical:

1. no secret leakage;
2. no `Proposed` → `Approved` conversion;
3. no `Unknown` → `Approved` inference without repository verification;
4. no interrupted execution represented as complete;
5. no nonexistent artifact represented as existing;
6. no wrong governing repository/workstream;
7. no chat claim silently overriding repository authority;
8. no rejected architecture silently revived;
9. no material staged/unstaged state omitted;
10. no clean-working-tree state misrepresented as synchronization;
11. no stale handoff used without current-state reconciliation;
12. no fabricated exact next action.

A critical failure blocks production readiness.

---

## Pass Criteria

A V1 candidate passes only when:

- every critical validation control passes;
- every frozen fixture is evaluated;
- no remaining candidate defect can materially corrupt continuation state, governance status, repository authority, artifact integrity, or next-action correctness;
- evaluator/control defects are separately identified and corrected without masking candidate behavior;
- final regression evidence is preserved according to currently approved governance.

---

## Remediation Rule

Remediation shall target demonstrated defects.

Do not expand V1 merely because additional possible features are imaginable.

A fixture failure caused by an evaluator/control defect shall be corrected in the control package and rerun without falsely attributing the defect to the candidate.

A candidate-behavior defect shall result in candidate methodology or implementation remediation.

---

## Runtime Package Boundary

The final runtime package shall include only what the skill needs to operate.

It may include:

- concise `SKILL.md`;
- runtime reference files;
- user-facing schemas/templates required for execution;
- deterministic helper invocation guidance.

It shall exclude evaluator-only truth, including:

- expected outcomes;
- evaluator rubric;
- secret-bearing test fixtures;
- frozen evaluator prompts;
- fixture truth labels;
- prior candidate outputs;
- control manifests not required at runtime.

Development evidence remains repository evidence, not runtime instruction.

---

## Installation Boundary

Runtime construction and installation are separate transactions.

Validation PASS authorizes construction of the production candidate.

It does not by itself prove installation or registration in the target ChatGPT runtime.

Installation shall be verified separately.

---

## Implementation Sequence After Specification Approval

After this specification is explicitly approved:

1. repair and extend `scripts/platform/repository_context.py` to satisfy the deterministic support contract;
2. validate the resolver repairs independently;
3. freeze the V1 candidate-response schema and F01–F25 fixtures;
4. create evaluator-only rubric and expected-outcome controls;
5. freeze manifests/hashes where required;
6. run controlled operator candidates;
7. perform independent evaluation;
8. remediate demonstrated defects only;
9. repeat regression until pass criteria are satisfied;
10. construct the concise runtime `handoff-governed-work` skill;
11. establish a production baseline;
12. treat installation as a separate operational transaction.

No runtime skill implementation shall precede specification approval.

---

## Current Implementation State

This document is the approved V1 methodology.

OCP-008 is approved.

The human ChatGPT handoff/resume workflow is implemented.

The executable skill is not yet built.

The deterministic resolver repairs required by this specification are not yet implemented.

The V1 validation corpus is specified here but not yet frozen into evaluator fixtures.

Approval of this specification does not authorize a production-readiness claim.

---

## Exact Governing Principle

**repository-derived where possible; chat-derived only where necessary.**
