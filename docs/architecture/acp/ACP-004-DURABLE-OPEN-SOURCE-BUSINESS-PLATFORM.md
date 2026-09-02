# ACP-004 — Durable Open-Source Business Platform Architecture

Version: 1.0.0

Status:
Approved

Type:
Architecture Change Proposal

Authority:
Systems Architect Discipline

Approved:
2026-09-02

Scope:
Business-critical software platform selection, resilience, portability, skill development, and monitoring

---

## Current State

MIDWESTGuard is reconstructing the operating capabilities historically carried through JobNimbus while evaluating a long-term CRM / ERP architecture.

EspoCRM was selected and partially configured before the full license-to-feature boundary of the required operating system was established. Later investigation showed that several capabilities material to the intended architecture are supplied through separately licensed commercial extensions.

The existing EspoCRM installation is healthy and contains useful configuration and development work. It shall be preserved. Substantial additional EspoCRM-specific implementation is frozen while the platform decision is reassessed.

No replacement platform is selected by this ACP.

---

## Recurring Failure Pattern

The owner reports that materially similar software-platform failures have occurred more than twenty times during approximately twenty-five years of business and technology operations.

Recurring failure modes include:

- business information becoming trapped in a product;
- exports omitting relationships, metadata, history, attachments, or meaning;
- data being retained in a format poorly suited to reconstruction;
- vendor licensing or pricing changes;
- important capabilities moving behind paid feature boundaries;
- product acquisition, abandonment, or material redirection;
- APIs or integrations disappearing;
- customizations preventing safe upgrades;
- substantial implementation work needing to be repeated.

This recurrence makes platform durability an architectural problem, not an isolated procurement problem.

---

## Governing Objective

Business-critical systems shall be selected and engineered for a multi-decade operating horizon.

Significant up-front engineering may be justified when it materially reduces repeated migration, lock-in, data-loss, and maintenance risk.

The desired steady state is:

- no routine requirement for significant weekly software development;
- low recurring administrator burden;
- predictable patching;
- testable upgrades;
- durable data ownership;
- recoverable backups;
- independent export and reconstruction capability;
- source-controlled custom business logic;
- ability to continue operating if the original steward disappears.

Initial maintenance target:

> After stabilization, no recurring weekly development dependency and approximately two planned administrator/developer hours per month or less, excluding exceptional security incidents and planned major upgrades.

This is an evaluation target, not a guarantee.

---

## Operational Independence Principle

A business-critical platform is not considered durable merely because MIDWESTGuard can enter information into it.

Durability requires proof that MIDWESTGuard can:

1. preserve the information;
2. understand its structure;
3. export it;
4. retain relationships and provenance;
5. reconstruct its operating meaning independently;
6. restore the complete system from backups;
7. retain and maintain custom business logic;
8. continue operating if the original steward disappears.

---

## Architecture Changes

### 1. Reopen CRM / ERP platform selection

EspoCRM is no longer treated as settled final architecture.

The current EspoCRM system remains:

- preserved implementation evidence;
- a comparison baseline;
- a fallback pending proof of a superior replacement.

No production migration or destructive removal is authorized.

### 2. Establish a software-freedom gate

Every required capability shall be classified as one of:

- `NATIVE_OPEN_SOURCE`
- `CONFIGURABLE_OPEN_SOURCE`
- `OPEN_SOURCE_EXTENSION`
- `CUSTOM_OPEN_SOURCE_BUILD`
- `EXTERNAL_INTEGRATION`
- `PROPRIETARY_PAID_DEPENDENCY`
- `MISSING`
- `UNKNOWN`

A required capability classified `PROPRIETARY_PAID_DEPENDENCY` fails the current software-freedom gate unless separately approved through governance.

Optional hosting, support, consulting, training, or implementation assistance do not themselves fail the gate when the required software remains independently self-hostable.

### 3. Require a data-portability and exit test

Before production adoption, representative records, relationships, custom fields, history, documents, attachments, workflow states, financial relationships, and custom objects shall be created and then independently exported or recovered.

A flattened export that silently loses material relationships does not pass.

An exit process that omits required history, identifiers, attachments, or provenance does not pass.

### 4. Create a governed reusable skill

The recurring platform-selection problem shall become a reusable Institute capability.

Canonical skill:

`evaluate-open-source-platforms`

Initial planned version:

`V1.0`

The skill shall implement the methodology in:

`docs/architecture/OPEN-SOURCE-PLATFORM-EVALUATION-SKILL-SPECIFICATION.md`

It shall not be represented as production-ready until methodology, fixtures, rubric, response schema, and independent regression have been completed.

Existing ACP-003 and OCP-007 may inform that work, but their current Proposed status shall be respected.

### 5. Establish continuous platform resilience monitoring

Platform selection is not a one-time decision.

Monitoring shall watch for:

- license changes;
- open-source to open-core movement;
- new proprietary tiers;
- formerly open required features becoming paid;
- project abandonment or severe maintainer decline;
- release-cadence deterioration;
- unresolved critical vulnerabilities or unacceptable patch latency;
- dependency abandonment;
- API/export restrictions;
- backup/restore regressions;
- upgrade-path failures;
- governance or acquisition changes;
- credible superior replacements.

A weekly external condition watch currently exists as an interim operational control. The durable methodology belongs in the repository and future skill.

### 6. First-round candidate set

The first serious proof-of-concept round shall include:

1. Frappe CRM + ERPNext;
2. Tryton;
3. Apache OFBiz.

This is a test set, not a final ranking.

---

## OFBiz Special Acceptance Question

OFBiz shall receive a harder long-horizon evaluation rather than being penalized for greater initial engineering effort.

Primary question:

> Can substantially all MIDWESTGuard-specific behavior be isolated in one or a small number of version-controlled OFBiz plugins/components so Apache upstream can be patched and upgraded without repeatedly rewriting MIDWESTGuard business logic?

Preferred pattern:

```text
Apache OFBiz upstream
│
├── Party
├── Orders
├── Accounting
├── Purchasing
├── Inventory
├── Work Effort / Project
├── Entity Engine
├── Service Engine
└── integration layer
        │
        ▼
MIDWESTGuard-owned plugin
├── Job
├── Work Order
├── Inspection
├── Warranty
├── Insurance Scope
├── construction workflows
├── delayed actions
├── business validation
├── reports
└── integrations
```

Routine modification of upstream OFBiz core counts strongly against the platform.

OFBiz becomes highly competitive if initial engineering produces isolated, understandable, version-controlled business logic with low steady-state maintenance.

---

## Decision Boundary

This ACP approves:

- reopening CRM / ERP platform selection;
- freezing substantial new EspoCRM-specific implementation;
- preserving EspoCRM;
- the software-freedom gate;
- the mandatory exit test;
- development and validation of `evaluate-open-source-platforms`;
- first-round evaluation of Frappe/ERPNext, Tryton, and OFBiz;
- continuous platform-health monitoring;
- wiki publication of these decisions.

This ACP does not approve:

- deletion of EspoCRM;
- migration to any candidate;
- replacement of accounting systems;
- a final orchestration platform;
- installation of an unvalidated skill;
- treating Proposed governance as Approved.

---

## Completion Condition

This architecture decision is implemented when the evaluation, skill specification, monitoring model, and POC protocol are preserved in the repository and published in the wiki without falsely representing a final platform selection.
