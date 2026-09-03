# Open-Source Platform Evaluation Skill Specification

<div class="ri-document-meta" markdown>

**Document Type**
Skill Specification

**Status**
Validated Methodology — V1.1

**Version**
1.1.0

**Authority**
Systems Architect Discipline

**Canonical Skill Name**
evaluate-open-source-platforms

</div>

---

## Purpose

`evaluate-open-source-platforms` converts recurring platform-selection and lock-in failures into a reusable institutional capability.

It shall evaluate possible new platforms before adoption and reassess installed platforms later.

The skill is intentionally broader than CRM / ERP.

---

## Applicable Systems

The method may be applied to:

- CRM;
- ERP;
- accounting-adjacent software;
- project systems;
- document management;
- media management;
- automation/orchestration;
- knowledge systems;
- infrastructure applications;
- other business-critical self-hosted software.

---

## Core Principle

> Adoption is not proven when data can be entered.

Adoption is proven only when the organization can also preserve, recover, understand, export, reconstruct, maintain, and leave the platform.

---

## Required Evaluation Gates

### Gate 1 — Identity and provenance

Establish exact project, edition, release/branch, steward, repository, license, and dependency model.

Do not evaluate a product family generically when Community, Enterprise, Professional, Cloud, or hosted editions materially differ.

### Gate 2 — License boundary

Determine open-source license, proprietary companion licenses, edition boundaries, license-key requirements, source restrictions, feature-tier boundaries, and update-access restrictions.

### Gate 3 — Required feature boundary

Classify each required capability as:

- `NATIVE_OPEN_SOURCE`
- `CONFIGURABLE_OPEN_SOURCE`
- `OPEN_SOURCE_EXTENSION`
- `CUSTOM_OPEN_SOURCE_BUILD`
- `EXTERNAL_INTEGRATION`
- `PROPRIETARY_PAID_DEPENDENCY`
- `MISSING`
- `UNKNOWN`

### Gate 4 — Data ownership

Determine database, filesystem, attachment, key, identifier, relationship, history, and metadata ownership.

### Gate 5 — Export fidelity

Do not treat an Export button as proof.

Test preservation of record IDs, relationships, parent/child structure, custom fields, state, history, timestamps, users, notes, documents, attachments, media references, financial relationships, and provenance.

### Gate 6 — Exit reconstruction

Create representative data, operate it, export/recover it, reconstruct it outside the application, and compare semantic meaning.

Material loss is failure.

### Gate 7 — Backup / restore

Prove database, files, configuration, secrets/key handling, custom code, actual restoration, and integrity after restore.

A backup that has not restored successfully does not pass.

### Gate 8 — Customization portability

Determine whether custom logic lives in version-controlled source, documented metadata, database-only configuration, proprietary builders, or vendor-controlled configuration.

Prefer independently retainable, deterministic customization.

### Gate 9 — Upgrade survivability

Determine supported upgrade path, migrations, rollback constraints, compatibility policy, customization impact, major-version burden, and branch support horizon.

### Gate 10 — Security maintenance

Evaluate disclosure process, advisories, patching, supported branches, authentication, authorization, MFA/SSO where required, and security-response history.

Raw CVE count alone is insufficient; patch behavior and exposure matter.

### Gate 11 — Stewardship and governance

Evaluate foundation/company/community governance, maintainer concentration, acquisition risk, contribution continuity, release continuity, roadmap/process, and fork survivability.

### Gate 12 — Maintenance burden

Separate initial implementation effort from recurring monthly work, security effort, annual upgrades, and major-version upgrades.

High up-front effort may be justified when recurring burden and migration risk are materially lower.

### Gate 13 — Operational POC

Feature lists are insufficient. Run representative business workflows.

### Gate 14 — Failure monitoring plan

Before adoption define evidence that would trigger warning, scheduled review, immediate reassessment, or replacement investigation.

---

## Hard Failure Conditions

Normally return FAIL or REJECT when:

- a required capability needs unapproved proprietary software;
- complete business data cannot be recovered;
- material relationships are lost on exit;
- backups cannot restore;
- API/export depends on an unacceptable paid tier;
- custom business logic cannot be retained independently;
- required components are abandoned;
- routine maintenance violates the operating constraint;
- critical security exposure lacks an acceptable remediation path.

---

## Required Outputs

Each evaluation shall produce:

- platform identity;
- software-freedom matrix;
- data-portability matrix;
- cost boundary;
- POC results;
- backup/restore result;
- exit-test result;
- maintenance estimate;
- platform-health baseline;
- decision.

Decision vocabulary:

- `ACCEPT_CANDIDATE`
- `CONDITIONAL`
- `DEFER`
- `REJECT`
- `REASSESS_CURRENT_PLATFORM`

---

## Platform Health Signals

The skill shall detect at minimum:

### Licensing

- license change;
- dual-license change;
- new proprietary edition;
- open feature moved to proprietary tier;
- mandatory license server;
- source-access restrictions.

### Project activity

- stable releases cease;
- supported branches disappear;
- maintainer activity materially declines;
- unanswered critical security issues accumulate;
- required components are archived.

No single commit-count threshold automatically proves abandonment.

### Security

- critical vulnerability;
- active exploitation;
- delayed critical patches;
- end-of-life dependencies;
- unsupported runtimes.

### Portability

- export removal;
- API restriction;
- incompatible backup change;
- broken/removed restore procedure;
- cloud-only dependency introduced.

### Governance

- acquisition;
- foundation dissolution;
- concentration of control;
- contributor exodus;
- material stewardship change.

### Replacement opportunity

- new credible OSS platform;
- materially better portability;
- materially lower recurring maintenance;
- materially better architecture without proprietary dependency.

---

## Monitoring Severity

- `INFO`
- `WATCH`
- `REVIEW`
- `CRITICAL`

---

## Validation Requirement

The skill shall not be installed as trusted production capability merely because this specification exists.

Development shall include:

- concise `SKILL.md`;
- detailed references;
- frozen fixtures;
- positive cases;
- deceptive open-core cases;
- abandoned-project cases;
- data-portability failure cases;
- backup/restore failure cases;
- ambiguous-license cases;
- maintenance-burden cases;
- monitoring-signal cases;
- evaluator rubric;
- candidate response schema;
- blind or controlled independent regression.

Evaluator-only expected truth must remain separate from normal installed-skill references.

Existing proposed skill-validation governance shall not be silently treated as approved.

---

## Initial V1 Fixture Families

At minimum:

1. complete OSS project with optional paid support;
2. open-core project with proprietary workflow module;
3. OSS core with required paid third-party extension;
4. free edition discontinued;
5. abandoned but technically OSS;
6. healthy project with promptly patched CVEs;
7. quiet but mature stable project;
8. excellent software with unacceptable recurring maintenance;
9. difficult initial implementation with low long-term maintenance;
10. export that loses relationships;
11. complete database/file exit with reconstructable relationships;
12. backup that exists but cannot restore;
13. license text conflicting with marketing claims;
14. newly acquired project with uncertain governance;
15. current production platform showing deterioration signals.

---

## Validated Decision Semantics

### `ACCEPT_CANDIDATE`

Use when the available evidence supports keeping the platform as an active
candidate and no material unresolved gate prevents candidate-level acceptance.

This is not final production adoption.

### `CONDITIONAL`

Use when the platform remains viable, but one or more material unresolved
conditions must be satisfied before candidate acceptance or implementation.

### `DEFER`

Use when the available evidence is too incomplete for responsible
candidate-level acceptance, but no hard failure is established.

### `REJECT`

Use when a hard failure or disqualifying condition is established for a
candidate.

### `REASSESS_CURRENT_PLATFORM`

Use for an installed platform when material deterioration or a future-path
failure requires deliberate reassessment, migration readiness, or replacement
planning.

`UNKNOWN` is not `PASS`.

---

## Validated Health-Severity Semantics

### `INFO`

No material platform-health problem or acceptance failure is established.

### `WATCH`

An early-warning signal exists, but no present required gate has failed and no
immediate architecture action is required.

### `REVIEW`

A material future-path or architecture concern requires deliberate reassessment
or planning, but the current operating state has not yet crossed a hard-failure
boundary.

### `CRITICAL`

A present hard failure is established against a required acceptance gate, or
there is an immediate material threat to software freedom, recoverability,
security, or continued operation.

---

## Installed-Platform Forward-Deterioration Rule

When an installed platform's exact current supported release still passes
current gates but an announced future supported path moves required capability
into an unacceptable proprietary dependency:

1. preserve the exact current-release software-freedom result;
2. classify the announced change as forward-path deterioration;
3. return `REASSESS_CURRENT_PLATFORM`;
4. use `REVIEW` while the current release still works and a bounded supported
   action window remains;
5. explicitly prepare migration and/or exit options while the current release
   still works and before its support window closes;
6. preserve and re-verify backups, exports, reconstruction procedures, custom
   code, identifiers, relationships, documents, attachments, and integration
   documentation during that window;
7. escalate to `CRITICAL` if the current release itself crosses a hard-failure
   boundary, the supported exit window is lost, or recoverability becomes
   materially threatened.

A response that merely says "reassess" is incomplete.

---

## Validated Implementation State

`evaluate-open-source-platforms` V1.1 completed controlled validation.

Final ECR1 result:

- 15 / 15 fixtures PASS;
- 7 / 7 critical fixtures PASS;
- no remaining candidate-behavior defect;
- no further operator-methodology revision required by the validated corpus.

The validated runtime artifact is a production candidate.

Runtime installation or registration remains a separate operational
transaction.

See:

- `EVALUATE-OPEN-SOURCE-PLATFORMS-V1.1-VALIDATION-RECORD.md`;
- `OPEN-SOURCE-PLATFORM-EVALUATION-PRODUCTION-BASELINE.md`.

No implementation shall silently weaken this specification.
