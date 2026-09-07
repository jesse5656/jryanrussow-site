# Governed AI Skill Packaging and Deployment — Skill Specification

Version: 0.2.0

Status:
Draft

Authority:
Systems Architect Discipline

Governing Proposal:
ACP-008

Working Runtime Name:
`govern-ai-skill-packaging-and-deployment`

---

## Purpose

Define the reusable Skill behavior for releasing validated AI Skills from
their authoritative owning repositories into governed runtime targets without
losing provenance, integrity, version identity, or rollback capability.

This specification is Draft until ACP-008 is approved and this specification
is explicitly frozen.

No executable runtime Skill shall be represented as validated production based
on this draft.

---

## Deterministic Contract Dependencies

Before this specification can be frozen, its registry, release, deployment,
and controlled-vocabulary semantics must be frozen by deterministic contracts.

Current Draft contract candidates:

- `docs/architecture/ai-skills/governed-ai-skill-vocabulary-v1.json`;
- `docs/architecture/ai-skills/governed-ai-skill-registry-schema-v1.json`;
- `docs/architecture/ai-skills/governed-ai-skill-release-schema-v1.json`;
- `docs/architecture/ai-skills/governed-ai-skill-deployment-record-schema-v1.json`.

These contract candidates are not yet frozen merely because they exist.

The executable `SKILL.md` shall not be constructed until:

1. the contract candidates pass deterministic validation;
2. their vocabulary and identity rules are reconciled;
3. the contracts are explicitly frozen;
4. this Skill Specification is updated to the frozen contract identities and
   itself frozen.

The central registry implementation shall conform to the frozen registry
contract but shall not become a second source of Skill behavior.

---

## Core Principle

Repository authority precedes runtime installation.

The Skill orchestrates a release/deployment process.

It does not own the behavior of the Skill being deployed.

---

## Operating Modes

The runtime shall support these bounded modes.

### DISCOVER

Resolve whether a Skill already exists and identify:

- owning repository;
- current version;
- production source;
- validation status;
- production baseline;
- install package;
- known runtime deployments;
- missing evidence.

Do not create a duplicate Skill because a runtime installation cannot be
found.

### PACKAGE

Construct or verify the approved production package from validated source.

PACKAGE must fail if required production identity or validation authority is
missing.

### REGISTER

Create or update a version-specific enterprise registry entry.

REGISTER shall reference the owning repository.

It shall not copy business authority into the registry.

### DEPLOY

Install a validated registered Skill into a supported target runtime using the
applicable runtime adapter.

DEPLOY shall not modify Skill behavior.

### VERIFY

Verify:

- installed inventory;
- byte identity or approved transformed identity;
- runtime registration;
- dependencies;
- smoke-test result;
- deployment provenance.

### ROLLBACK

Restore a specifically approved prior production version.

ROLLBACK must identify the target version explicitly.

### AUDIT

Compare repositories, registry state, and runtime installations to detect:

- drift;
- unregistered installs;
- missing artifacts;
- stale versions;
- hash mismatches;
- direct runtime edits;
- incomplete installation records.

---

## Authority Order

When sources disagree, apply this order:

1. applicable constitutional/governance authority;
2. owning repository approved Skill specification and production decision;
3. owning repository production baseline and versioned release metadata;
4. enterprise registry;
5. verified deployment record;
6. observed runtime installation;
7. conversational claims.

A runtime installation shall never override a newer or conflicting
authoritative repository decision.

---

## Required Skill Identity

Every managed Skill version requires:

- canonical Skill name;
- semantic version;
- owning repository;
- owning repository revision;
- validated production state;
- production artifact identity;
- SHA-256;
- production baseline or equivalent provenance;
- supported runtime classification.

If identity cannot be established, return a blocked result.

Do not infer missing authoritative identity.

---

## Production Package Rule

The production package shall contain only files required for runtime operation.

It shall exclude:

- evaluator answer keys;
- expected fixture outcomes;
- evaluator-only controls;
- secret-bearing validation material;
- failed candidate outputs unless runtime-required;
- remediation records unless runtime-required;
- unrelated repository material.

Production packaging shall not silently rewrite validated runtime bytes.

---

## Registry Rule

The registry records version identity and deployment control metadata.

It does not own Skill behavior.

A registry entry shall include:

- skill_name;
- version;
- owning_repository;
- owning_repository_commit;
- artifact_location;
- artifact_sha256;
- validation_status;
- validation_reference;
- production_baseline_reference;
- supported_runtimes;
- dependencies;
- deployment_targets;
- rollback_predecessor.

Unknown fields that affect deployment safety shall remain UNKNOWN rather than
being invented.

---

## Deployment Rule

DEPLOY requires all of:

- validated production state;
- known artifact identity;
- matching checksum;
- supported target runtime;
- satisfied deterministic prerequisites;
- explicit human authority where required by governance.

If any required condition fails, deployment stops.

---

## Runtime Adapter Boundary

Target-specific installation behavior belongs in runtime adapters.

The core Skill shall not hard-code one vendor's installation mechanism as the
universal deployment method.

Known runtime evidence may establish a specific adapter.

Unsupported runtimes remain unsupported until governed implementation exists.

---

## AI Worker Node Rule

The AI Worker Node is treated as a deployment target.

The Skill shall not:

- edit canonical source on the Worker Node;
- treat the Worker Node as the Skill system of record;
- assume a future orchestration framework;
- require the Worker Node to exist for current repository packaging.

Worker Node support may be added when its runtime contract is established.

---

## Deterministic-Before-AI Rule

Use deterministic software for:

- hashes;
- inventories;
- schema validation;
- commit identity;
- version comparisons;
- artifact copying;
- installed-byte comparison;
- registry validation;
- dependency checks;
- deployment record creation.

Use AI reasoning for:

- interpreting ambiguous repository evidence;
- identifying likely ownership conflicts;
- explaining governance implications;
- recommending resolution where deterministic evidence is incomplete.

AI conclusions shall not silently become authoritative deployment facts.

---

## Human-Control Rule

Require explicit human authority when:

- approving architecture;
- approving a new production version;
- selecting among conflicting authoritative owners;
- deploying to materially consequential production;
- replacing an active version where downtime or business impact is material;
- rolling back production;
- overriding a failed prerequisite.

The Skill shall not fabricate approval.

---

## Direct-Edit Detection

AUDIT and VERIFY shall detect where practical whether installed runtime bytes
differ from the approved release.

Detected direct edits are deployment drift.

They shall not be promoted back into repository authority automatically.

---

## Existing Skill Backfill

For an existing validated Skill:

1. identify current repository evidence;
2. identify installed copies;
3. identify production package/baseline;
4. compare hashes;
5. identify missing repository-preserved runtime;
6. create no new facts merely to complete the registry;
7. produce the narrowest remediation required for portability.

Historical validation remains immutable.

---

## Failure Vocabulary

At minimum:

- PASS
- BLOCKED_MISSING_AUTHORITY
- BLOCKED_MISSING_ARTIFACT
- BLOCKED_HASH_MISMATCH
- BLOCKED_UNSUPPORTED_RUNTIME
- BLOCKED_DEPENDENCY
- BLOCKED_GOVERNANCE
- DRIFT_DETECTED
- ROLLBACK_REQUIRED
- HUMAN_REVIEW
- UNKNOWN

Failure states shall not be rewritten as success.

---

## Validation Requirements

Before production, validate at minimum:

1. valid repository-owned production Skill;
2. missing owning repository;
3. duplicate ownership claim;
4. valid package checksum;
5. checksum mismatch;
6. missing validation decision;
7. stale registry entry;
8. runtime already current;
9. runtime behind production;
10. unregistered runtime installation;
11. direct runtime edit;
12. unsupported runtime;
13. deterministic dependency failure;
14. successful Codex/local Agent Skills install;
15. failed install with no false success;
16. explicit rollback;
17. rollback target unavailable;
18. Worker Node unavailable;
19. multiple repositories;
20. secret-bearing deployment material.

Critical failures shall include authority, integrity, unsupported-runtime,
false-success, direct-edit, and rollback-integrity cases.

---

## Runtime Package Boundary

The final reusable runtime package may include:

- `SKILL.md`;
- `agents/openai.yaml`;
- frozen operating references;
- registry schema reference;
- deterministic helper tooling only where appropriate and validated.

It shall not include hidden evaluator truth or unrelated business Skill
packages.

---

## Installation Boundary

Validation of this Skill does not itself install it anywhere.

Every target installation is a separate deployment transaction with its own
verification record.

---

## Change Control

Material changes to:

- repository authority;
- production identity;
- registry semantics;
- deployment prerequisites;
- runtime adapters;
- integrity behavior;
- rollback behavior;
- or human-control boundaries

require governed versioned review and appropriate regression validation.
