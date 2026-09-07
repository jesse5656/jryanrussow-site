# ACP-008 — Governed AI Skill Packaging, Registry, and Deployment

Version: 1.0.0

Status:
Approved

Type:
Architecture Change Proposal

Authority:
Systems Architect Discipline

Proposed:
2026-09-06

Approved:
2026-09-07

---

## Purpose

Establish the enterprise architecture for preserving, packaging, registering,
deploying, verifying, updating, and rolling back validated AI Skills across
Russow Institute governed repositories and future execution infrastructure.

The architecture is repository-first.

A runtime installation is a deployment target.

It is not the authoritative source of the Skill.

---

## Problem

Validated executable Skills are being created across multiple governed
repositories.

Those Skills must remain portable beyond any current ChatGPT, Codex, hosted
model, local workstation, or future AI Worker Node runtime.

Current evidence demonstrates successful validation and local installation of
individual Skills, but the enterprise does not yet define a single architecture
governing:

- repository ownership of Skill source;
- production runtime preservation;
- installable package preservation;
- cross-repository discovery;
- deployment registry metadata;
- target-runtime adapters;
- installation verification;
- deployment provenance;
- version upgrades;
- rollback;
- onsite AI Worker Node transfer;
- or backfill of existing validated Skills.

A validated Skill must not become dependent on one vendor UI, one workstation,
one installation directory, or one conversational memory system.

---

## Existing Authority and Boundaries

The repository remains authoritative institutional memory.

Existing repository governance, Repository Context Resolution, Governance
Enforcement, deterministic automation standards, and AI collaboration rules
remain authoritative.

OCP-008 establishes a validated precedent that:

- an executable Skill requires a governed specification;
- production readiness requires validation;
- runtime packages exclude evaluator-only truth;
- installation is a separate operational transaction;
- runtime installation state must not be confused with source authority.

ACP-003 and OCP-007 remain Proposed at the time of this proposal.

This ACP does not silently approve either proposal.

OCP-005 governs Institute website deployment only and is not generalized into
AI Skill deployment by this proposal.

---

## Proposed Architecture

### 1. Owning Repository

Every governed Skill shall have exactly one authoritative owning repository.

The owning repository shall contain or govern the complete information needed
to reconstruct and verify the production Skill.

The repository containing the Skill's authoritative business or engineering
logic normally owns the Skill.

Examples:

- enterprise governance Skills -> Systems Architect Discipline;
- MIDWESTGuard operating Skills -> MIDWESTGuard operations repository;
- product-specific Skills -> applicable product repository;
- property-management Skills -> governing property/rental repository.

A central registry may reference Skills.

It shall not become a second editable source of Skill behavior.

---

## 2. Repository-First Production Preservation

A validated production Skill shall not exist only in:

- ChatGPT;
- Codex;
- a local Agent Skills directory;
- an AI Worker Node filesystem;
- a container image;
- temporary output;
- a Downloads directory;
- or conversational history.

The owning repository shall preserve, directly or through a governed immutable
artifact reference, the validated production runtime and enough provenance to
verify it.

For small, non-sensitive runtime artifacts, repository preservation is
preferred.

If bytes must live outside ordinary Git, the repository shall preserve an
immutable retrieval record containing at minimum:

- exact artifact name;
- version;
- SHA-256;
- byte size;
- governed storage location;
- owning repository;
- source revision;
- validation identity;
- access classification.

---

## 3. Production Artifact Set

Each validated Skill version shall have, as applicable:

- canonical Skill name;
- semantic version;
- `SKILL.md`;
- runtime metadata;
- required runtime references;
- production baseline;
- validation decision or validation provenance pointer;
- deterministic checksum manifest;
- installable package;
- owning repository commit;
- deployment compatibility metadata.

Evaluator truth, hidden expected outcomes, secrets, and development-only
fixtures shall not enter the normal production runtime package.

---

## 4. Enterprise Skill Registry

Establish a machine-readable enterprise registry containing references to
validated production Skills.

The registry is an index and deployment-control surface.

It is not a source-of-truth replacement for owning repositories.

Each registry entry shall include at minimum:

- canonical Skill name;
- version;
- owning repository;
- owning repository commit;
- production artifact location;
- production artifact SHA-256;
- production baseline location;
- validation decision location;
- validation status;
- supported runtime classes;
- dependency declarations;
- deployment status by target;
- rollback predecessor when applicable.

Registry entries shall be append-safe and version-specific.

A new version shall not silently rewrite the identity of an older version.

---

## 5. Runtime Adapter Model

Deployment shall use runtime-specific adapters.

A Skill package shall not assume that every runtime installs Skills the same
way.

Potential runtime classes include:

- Codex/local Agent Skills;
- future AI Worker Node agent runtime;
- API-driven orchestration runtime;
- other governed local inference runtimes;
- future supported ChatGPT Skill registration mechanisms.

A runtime adapter may define:

- installation target;
- package transformation if required;
- dependency installation;
- registration command;
- verification command;
- health or smoke test;
- uninstall behavior;
- rollback behavior.

Runtime adapters shall not modify authoritative Skill behavior during
deployment.

---

## 6. AI Worker Node Boundary

The future AI Worker Node is a deployment target and compute service.

It is not the source of truth for Skills.

The Worker Node may:

- retrieve approved Skill releases;
- verify hashes;
- install runtime dependencies;
- expose Skills to approved inference/orchestration services;
- record installed versions;
- execute smoke tests;
- roll back to an approved prior version.

The Worker Node shall not be the normal editing location for Skill source.

Changes originate in the owning repository and pass the governed release
process before deployment.

---

## 7. Deployment Transaction

Deployment is a distinct governed transaction after production validation.

A successful deployment shall record:

- target host or runtime;
- Skill name;
- version;
- source repository;
- source commit;
- production artifact SHA-256;
- installation timestamp;
- installed location or runtime registration;
- verification result;
- runtime dependencies;
- prior version;
- rollback target.

A filesystem copy alone shall not be represented as registration in another
runtime unless that runtime defines filesystem installation as its supported
mechanism.

---

## 8. No Direct Production Editing

Production runtime installations shall be treated as derived deployments.

Behavior-changing edits made directly on:

- AI Worker Node;
- local Agent Skills directories;
- containers;
- runtime registration stores;
- or other deployment targets

shall not become authoritative.

Required changes must return to the owning repository and undergo applicable
change control and validation.

Emergency operational changes must be reconciled back into repository
authority or explicitly reverted.

---

## 9. Deterministic Deployment

The following functions should be deterministic software where practical:

- package inventory;
- checksum creation and verification;
- registry schema validation;
- repository/commit binding;
- artifact retrieval;
- deployment copying;
- installed-file comparison;
- dependency checks;
- deployment-state recording;
- rollback selection;
- smoke-test execution where the test itself is deterministic.

AI reasoning shall not replace deterministic identity or integrity checks.

---

## 10. Human Authority

Human approval remains required where deployment materially affects:

- production availability;
- security boundaries;
- credentials;
- destructive replacement;
- rollback of active capability;
- cross-business governance;
- or unresolved architectural judgment.

The reusable Skill may recommend and orchestrate.

It shall not silently grant itself architectural authority.

---

## 11. Security Boundary

Skill packages, registries, baselines, and deployment records shall not contain:

- passwords;
- API keys;
- bearer tokens;
- private keys;
- session secrets;
- database credentials;
- or secret configuration values.

Deployment tooling shall reference approved credential mechanisms without
embedding credential values in repository artifacts.

---

## 12. Existing Skill Backfill

After this architecture is approved, existing validated Skills shall be
audited.

The audit shall determine for each Skill:

- authoritative owning repository;
- whether canonical runtime source is repository-preserved;
- whether production package bytes are durably preserved;
- whether production baseline exists;
- whether validation provenance exists;
- current installed runtime locations;
- current version/hash;
- whether a registry entry can be created without inventing missing evidence.

Missing production preservation shall be repaired through governed backfill.

Prior validation shall not be rewritten merely to conform to the new registry.

---

## 13. Validation-Evidence Boundary

This architecture governs production Skill portability and deployment.

It does not silently approve the separate proposed architecture for long-term
validation-evidence archival.

Production runtime evidence and validation evidence shall remain
distinguishable.

Where validation bytes are retained outside ordinary Git, the production
release shall retain sufficient approved provenance to identify what
validation authorized that release.

---

## 14. Non-Duplication

The architecture shall not create:

- duplicate editable Skill sources;
- multiple authoritative registries;
- runtime-specific forks without versioned governance;
- a second business system of record;
- or an AI Worker Node configuration that silently supersedes repository
  authority.

---

## 15. Portability Requirement

A production Skill shall be considered portable only when a future operator can
determine, without relying on chat memory:

1. what the Skill is;
2. which repository owns it;
3. which version is production-approved;
4. which repository revision produced it;
5. what bytes constitute the release;
6. how their integrity is verified;
7. what runtime dependencies exist;
8. what target runtimes are supported;
9. how to deploy and verify it;
10. how to roll it back.

---

## Proposed Reusable Skill

Develop a reusable governed Skill for this architecture.

Working name:

`govern-ai-skill-packaging-and-deployment`

The final name and behavior shall be frozen by its governed Skill
Specification.

The Skill shall manage the governed release/deployment lifecycle.

It shall not become the source of business policy contained in the Skills it
deploys.

---

## Proposed Implementation Sequence

### Phase 0 — Approve Architecture

- review this ACP;
- resolve overlap with existing governance;
- approve or reject explicitly.

### Phase 1 — Freeze Skill Specification

- finalize the governed Skill Specification;
- freeze vocabulary;
- freeze authority boundaries;
- freeze required release/deployment records.

### Phase 2 — Define Registry Contract

- define registry schema;
- define version identity;
- define repository/artifact bindings;
- define deployment-state vocabulary.

### Phase 3 — Build Deterministic Support

- inventory utilities;
- checksum verification;
- registry validation;
- deployment verification;
- rollback support.

### Phase 4 — Validate Reusable Skill

Use controlled fixtures covering at least:

- repository-preserved Skill;
- artifact-referenced Skill;
- missing production artifact;
- mismatched SHA-256;
- stale registry entry;
- newer repository version;
- unsupported runtime;
- Codex/local Agent Skills deployment;
- future Worker Node deployment with unavailable target;
- dependency mismatch;
- attempted direct production edit;
- rollback;
- multiple repositories;
- duplicate Skill-name conflict;
- proposed-but-unapproved validation evidence;
- secret-bearing deployment input.

### Phase 5 — Production Package

Construct an operator-safe production package only after validation PASS.

### Phase 6 — Existing Skill Backfill

Audit existing validated Skills and create governed production/registry records
without rewriting historical validation.

### Phase 7 — AI Worker Node Adapter

When Worker Node architecture and runtime are sufficiently resolved, implement
the target-specific deployment adapter.

---

## Non-Goals

This ACP does not:

- redesign the AI Worker Node;
- select a permanent inference model;
- select a permanent orchestration framework;
- move business systems of record onto the Worker Node;
- approve ACP-003 or OCP-007;
- make ChatGPT Plus a supported Skill runtime;
- authorize deployment before validation;
- change existing Skill behavior;
- authorize direct production editing.

---

## Decision Requested

Approve repository-first AI Skill packaging, enterprise registry, runtime
adapter deployment, installation verification, rollback, and future AI Worker
Node portability as the governing enterprise architecture.

Authorize development and validation of the corresponding reusable governed
Skill after the Skill Specification is approved.
