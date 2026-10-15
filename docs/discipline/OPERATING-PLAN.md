# Systems Architect Discipline Operating Plan

<div class="ri-document-meta" markdown>

**Document Type**
Operating Plan

**Status**
Active

**Version**
1.3.1

**Authority**
Systems Architect Discipline

</div>

---

## Purpose

This document defines current execution for the Systems Architect Discipline.

---

## Engineering Execution Rules

These rules apply to every engineering objective unless explicitly overridden.

1. Repository First
   - The repository is the source of truth.
   - Do not rely on chat history to determine implementation state.

2. Pre-Implementation Audit (Required)
   - Before generating implementation code, audit the repository to determine whether the requested capability:
     - already exists,
     - is partially implemented, or
     - is missing.
   - Do not implement a capability that already exists.
   - If partially implemented, extend the existing implementation instead of creating a duplicate.

3. Single Implementation Block
   - Generate implementation as one copy/paste-safe bash block.
   - Use Python file writers when creating or modifying files.
   - Avoid nested heredocs.
   - Validate the implementation before generating any commit commands.

4. Validation
   - Execute targeted validation first.
   - Execute the full test suite after targeted validation succeeds.
   - Do not generate commit commands until all validation passes.

5. Architecture Stability
   - Existing architecture is assumed correct.
   - Do not redesign architecture unless the Current Objective explicitly requires it.
   - Architectural changes require an approved Architecture Change Proposal (ACP) or Operational Change Proposal (OCP).

6. Shell Safety
   - Never enable `set -e`, `set -u`, or equivalent strict shell options directly in an interactive terminal session.
   - If strict shell behavior is required, isolate it inside a subshell or standalone script.
   - Engineering command blocks shall leave the user's interactive shell in its normal operating state.
   - Diagnostic commands that may legitimately return a nonzero result shall report their exit code without terminating the interactive shell.

---

## Current Objective

<div class="ri-objective" markdown>

Type:
Business Recovery / Operating Platform Execution

Name:
MIDWESTGuard Business Recovery / Cash Engine

Objective:
MIDWESTGuard Business Recovery / Cash Engine

Scope:
Joplin metro cash-engine operation following the completed OFBiz CRM authority transfer

Status:
In Progress

</div>

Restore MIDWESTGuard's cash engine in the Joplin metro using the now-authoritative
OFBiz CRM operating record. The completed CRM authority transfer is recorded in
ACP-013's cutover closure; this objective now governs measurable daily operation
from lead generation through collections and cash visibility. The cash-engine
operating path is:

**lead generation → inbound qualification → outbound follow-up → inspection
scheduling → estimate follow-up → contract conversion → production handoff →
collections/cash visibility.**

This objective has two coordinated boundaries:

1. **Cash-engine operation:** use the current governed systems and accountable
   human handoffs to restore, measure and operate the Joplin metro lead-to-cash
   path. It does not authorize an ungoverned replacement application.
2. **Completed CRM authority:** Midwest24 Core Enterprise / OFBiz is authoritative
   for new CRM records. EspoCRM is retired as CRM authority. Production Job/Work
   Order, accounting, collections, cash visibility, communications and website
   automation retain their separately governed boundaries.

CRM authority closure is complete. The cash-engine operating transition now
uses OFBiz CRM without reopening the retired EspoCRM authority.

Success Criteria:

- the Joplin metro cash-engine path has accountable, measurable handoffs from
  lead generation through collections/cash visibility;
- current live authority remains explicit for each operating capability until a
  separately governed cutover passes;
- CRM Replacement Slice 4, the Net2phone Capability & Integration Assessment,
  and the private voice-call metadata rehearsal remain closed/pass; no
  communications production capability is implied by those results;
- every CRM replacement slice preserves canonical Enterprise identity,
  provenance, replay safety, reconstruction and least-privilege access;
- OFBiz CRM authority and the retired, preserved Espo recovery boundary remain
  explicit while each non-CRM cash-engine capability retains its current authority; and
- the Institutional Memory Diagnostic pilot remains preserved as a deferred,
  resumable commercial objective.

### Cash-engine execution boundary

The immediate operating scope is the Joplin metro. Existing governed tools,
human processes and current operational systems remain in use while their
replacement gates are incomplete. The priority is a reliable, measurable path
from lead generation through collections and cash visibility, with each handoff
owned and evidenced. No custom application is authorized solely to restate this
workflow.

### CRM authority closeout and downstream boundary

The CRM operational cutover is closed under
[ACP-013 OFBiz CRM Operational Cutover Gate](../architecture/acp/ACP-013-OFBIZ-CRM-OPERATIONAL-CUTOVER-GATE.md).
OFBiz is authoritative for new CRM records; EspoCRM is retired, stopped and
preserved with its recovery point. This closeout does not authorize production
Job/Work Order cutover, accounting, collections, cash visibility, communications
integration, document-service deployment or automated website intake.

The current operating transition is recorded in
[MIDWESTGuard Joplin Cash-Engine Operating Transition](../operations/MIDWESTGUARD-JOPLIN-CASH-ENGINE-OPERATING-TRANSITION.md).

### Approved bounded next objective — Location-aware Job Photo Evidence

**Operating-plan approval:** 2026-10-08

The worker shall be prompted for the right photos at the right point in the
Job, with the existing Job, Property, Customer and applicable Work Order already
selected. Enterprise may automate the prompt, assignment, filing, completeness
check, reminder and closeout-package assembly. The authenticated worker remains
responsible for taking or selecting the actual photos.

The existing approved private
[OCP-014 Job Readiness and Evidence Register](../architecture/ocp/OCP-014-JOB-READINESS-AND-EVIDENCE-REGISTER.md)
already defines `PHOTO_EVIDENCE`, `DAILY_REPORT`, `TRADE_QA`, `PUNCH_LIST` and
`WARRANTY_CLOSEOUT`, permits the governed evidence gate at Job completion and
requires attributable immutable history. Private candidate forms exist for
those requirements, and the controlled template inventory contains the
Certification of Completion and Satisfaction. Those records do not prove a
live media store, mobile capture experience, automatic prompt or Job attachment.

#### Worker experience

When an authorized worker arrives at a Property, the mobile interface should
use the device location, confirmed Property coordinates, assignment and object
scope to offer the nearby Job. It shall not silently select an ambiguous or
unauthorized Job.

> **9376 — 447 Ceola Avenue**<br>
> Roof Work Order<br>
> **Next required evidence: Before-work photos**<br>
> **Start photo checklist**

The worker confirms the Job once. Subsequent forms, photos and evidence retain
that context without re-entering the customer, property, Job or Work Order.

#### Required photo checkpoints

| Checkpoint | Prompted evidence | Trigger or control |
| --- | --- | --- |
| Inspection | All elevations, roof planes, damage, penetrations, interior damage, measurements and existing conditions | Inspection cannot be marked complete until each required category is addressed. |
| Before production | Property protection, landscaping, driveway, siding, windows and pre-existing damage | Capture before tear-off or material movement. |
| Material delivery | Delivered materials, labels, colors, quantities, lot/batch details, delivery location and visible damage | Prompt when material delivery is recorded. |
| Work in progress | Tear-off, decking, underlayment, flashing, penetrations, ventilation, siding wrap and concealed conditions | Prompt from the daily report and governed trade milestones. |
| Supplement or change | Newly discovered damage, measurements, code condition, manufacturer requirement and affected scope | Require before a supplement or change request is submitted. |
| Trade QA | Flashing, penetrations, edge details, ventilation, siding transitions, cleanup and completed trade scope | Require before the applicable Work Order is marked done. |
| Punch list | Each defect before correction and its corrected condition | Keep the punch item open until resolution evidence exists. |
| Final completion | Final elevations, completed Roof/Siding, cleanup, property condition and required inspection evidence | Require for Job closeout. |
| Completion and satisfaction | Approved final photo set plus Certification of Completion and Satisfaction | Submit together as the governed completion package. |
| Warranty | Product/installation evidence and warranty reference | Require when applicable before final archival closeout. |

Every retained image must record or resolve to:

- canonical Job, Property and applicable Work Order;
- evidence category;
- capture date and time;
- authenticated capturing worker;
- GPS when permitted and available;
- original immutable file hash;
- replay-safe upload/request identity;
- notes and markup as separate attributable history; and
- supplement, punch-list or completion-package relationship where applicable.

The Job page shall show evidence progress in business language, for example:

```text
Before work             8 of 8 complete
Material delivery       5 of 6 — missing delivery damage overview
Roof installation      12 of 12 complete
Supplement evidence     Not required
Trade QA                 7 of 7 complete
Final completion         3 of 8 — action required
Completion certificate  Not signed
```

Prompts are required when the worker arrives at the Job, opens a Work Order,
approaches a governed transition, completes the daily report, lacks a required
category, is about to cover concealed work, requests a supplement, marks a
trade complete or prepares the completion certificate.

Raw image count is not completion evidence. Repeated images of one roof slope
cannot satisfy unrelated evidence categories. Each governed category requires
matching evidence or an attributable `NOT_APPLICABLE` reason where the approved
contract permits that disposition.

The supplement path is:

**unexpected condition discovered → select Supplement / scope change → capture
evidence before covering the condition → record measurement and explanation →
associate evidence with the affected Work Order → create the supplement
evidence package → preserve the original and every revision.**

The completion path is:

**Work Orders complete → final photo checklist → trade QA → punch-list
resolution → final inspection evidence → Certification of Completion and
Satisfaction → customer signature → immutable completion package → governed Job
completion gate.**

#### Required foundations and authority boundary

Implementation requires both:

1. dedicated Midwest24 Job-media storage; the existing RustFS installation is
   RustDesk infrastructure and is not available to OFBiz or Document Services;
2. a mobile Job Photo Evidence workspace connected to the canonical OFBiz Job,
   Property, Work Orders and OCP-014 register.

Before implementation, approve a bounded OCP-014 amendment or successor that
defines the stage-specific category matrix, dedicated storage authority,
completion-package relationship, authorization, offline/retry behavior,
retention, rollback/recovery and private-to-live acceptance. Existing candidate
forms and evidence keys must not be represented as functioning automation until
that gate passes.

This objective does not authorize Immich as the Job record, reuse of RustDesk
storage, raw media bytes in the OFBiz PostgreSQL database, direct public object
URLs, a second CRM/Job database, AI analysis, billing, payments, procurement,
inventory or customer communication.

#### Proposed app delivery format — subject to the governing amendment

The default implementation direction is an installable Progressive Web App
served on the Midwest24 Core Enterprise domain. It provides a phone-first app
experience without initially maintaining separate Android and iOS codebases.

- **Mobile interface:** TypeScript and a small component-based web UI, compiled
  to standard HTML, CSS and JavaScript and installable from the browser.
- **Offline behavior:** a service worker and IndexedDB retain the selected Job,
  checklist and encrypted upload queue until connectivity returns.
- **Device capabilities:** standard browser camera, file-selection and
  geolocation APIs; location never overrides authorization or worker
  confirmation.
- **Business services:** owned authenticated OFBiz Groovy services remain
  authoritative for Job, Property, Work Order, evidence status and history.
- **Media services:** the separately governed Document Services application
  performs multipart upload, hashing, versioning and authorized retrieval.
- **Storage:** PostgreSQL retains business/document metadata; a dedicated
  S3-compatible object namespace on protected TrueNAS storage retains media
  bytes. Bucket credentials are never exposed to the worker browser.
- **Integration:** stable document/version identifiers and hashes link media to
  native OFBiz records. No record is duplicated merely to support the mobile
  interface.

A native mobile wrapper may be evaluated only if controlled acceptance proves
that the PWA cannot meet camera, offline, background-upload or device-policy
requirements. Framework choice and API contracts must be frozen in the
governing amendment before implementation begins.

### Definition of Done:

- [ ] Joplin metro cash-engine handoff owners, measures and current-system
  boundaries recorded
- [ ] Lead generation through collections/cash-visibility operation restored and
  evidenced
- [x] CRM Replacement Slice 4 private acceptance closed/pass
- [x] Net2phone Capability & Integration Assessment completed
- [x] Voice Call Communications Context Rehearsal private acceptance closed/pass
- [x] OFBiz CRM authority activated; EspoCRM retired, stopped and preserved
- [ ] Joplin cash-engine handoff owners, measures and current-system boundaries
  completed and operating
- [ ] Repository governance validation passed
- [ ] Scoped diff reviewed
- [ ] Commit completed after separate approval
- [ ] Stage-specific Job Photo Evidence amendment/successor approved
- [ ] Dedicated Job-media storage and recovery boundary accepted privately
- [ ] Location-aware mobile Job Photo Evidence workspace accepted privately
- [ ] Live rollout separately approved and verified without duplicate records

### Deferred Institutional Memory Diagnostic Pilot

**Human review completed:** 2026-09-06

**Current disposition:**

- Protein Solutions — **ADVANCE — PRE-CONTACT QUALIFICATION**
- National Manufacturing Group / Able Composites — **HOLD — CONDITIONAL BACKUP**
- Dyno Nobel — **HOLD — DO NOT PRIORITIZE ON CURRENT PUBLIC EVIDENCE**

**Governing records:**

- [005 — Joplin Manufacturer Prospect Discovery](../research-programs/001-institutional-memory/diagnostic/005-JOPLIN-MANUFACTURER-PROSPECT-DISCOVERY.md)
- [006 — Advanced Candidate Dossiers](../research-programs/001-institutional-memory/diagnostic/006-JOPLIN-MANUFACTURER-ADVANCED-CANDIDATE-DOSSIERS.md)
- [007 — Comparative Ranking](../research-programs/001-institutional-memory/diagnostic/007-JOPLIN-MANUFACTURER-COMPARATIVE-RANKING.md)
- [008 — Human Qualification Review](../research-programs/001-institutional-memory/diagnostic/008-JOPLIN-MANUFACTURER-HUMAN-QUALIFICATION-REVIEW.md)
- [009 — Protein Solutions Pre-Contact Qualification Brief](../research-programs/001-institutional-memory/diagnostic/009-PROTEIN-SOLUTIONS-PRE-CONTACT-QUALIFICATION-BRIEF.md)
- [010 — Protein Solutions Qualification Contact Authorization](../research-programs/001-institutional-memory/diagnostic/010-PROTEIN-SOLUTIONS-QUALIFICATION-CONTACT-AUTHORIZATION.md)
- [011 — Protein Solutions Qualification Contact Package](../research-programs/001-institutional-memory/diagnostic/011-PROTEIN-SOLUTIONS-QUALIFICATION-CONTACT-PACKAGE.md)
- [012 — Pilot Commercial Validation Framework](../research-programs/001-institutional-memory/diagnostic/012-INSTITUTIONAL-MEMORY-DIAGNOSTIC-PILOT-COMMERCIAL-VALIDATION-FRAMEWORK.md)

**Contact decision completed:** 2026-09-06

**Current contact state:**

Protein Solutions is authorized for **bounded organization-level qualification
contact only**. The contact is limited to resolving the qualification
dimensions established in the committed pre-contact brief.

**Selection boundary:**

No pilot prospect has been finally selected. The Institutional Memory Diagnostic
is not authorized. Named-person enrichment and outreach automation remain
unauthorized.

**Qualification contact package approved:** 2026-09-08

The human reviewer approved the current organization-level channel and initial
qualification approach.

**Approved channel:**

Protein Solutions published main business telephone number:

`(417) 624-4966`

The approved package is recorded in
`011-PROTEIN-SOLUTIONS-QUALIFICATION-CONTACT-PACKAGE.md`.

**Execution boundary:**

The human-directed qualification contact may be performed in a dedicated
execution workstream. That workstream may assist with call preparation and
capture raw contact evidence, but governing qualification disposition, pilot
selection, authorization, methodology change, and repository promotion remain
under the Systems Architect Discipline.

Named-person enrichment and outreach automation remain unauthorized.

**Commercial-validation preparation:**

The first-pilot commercial and methodology validation decision rules are
preregistered in
`012-INSTITUTIONAL-MEMORY-DIAGNOSTIC-PILOT-COMMERCIAL-VALIDATION-FRAMEWORK.md`.

This preregistration does not select a pilot prospect, authorize the Diagnostic,
or establish commercial validation.

**Deferred next action:**

The bounded human-directed organization-level qualification contact using the
approved Protein Solutions package remains authorized but is deferred while the
Business Recovery / Cash Engine objective is active. On resumption, preserve
the approved execution boundary, record every qualification dimension as
answered or unresolved, preserve contradictions or changed facts, assign one
qualification disposition using the Pilot Authorization Package vocabulary, and
return it for separate governing human review.

### Previous Objective Closeout — ACP-006

**Completed:** 2026-09-05

The Infrastructure, Access, and Credential Documentation Correction was
completed under approved ACP-006.

Closeout evidence:

- implementation committed as `379e08f`;
- Operating Plan closeout committed as `0fef74c`;
- both commits pushed to `origin/main`;
- MkDocs and Governance Enforcement passed;
- no deployed infrastructure or website implementation was changed.

### Bounded Architecture Closeout — ACP-009

**Approved and completed:** 2026-09-09

ACP-009 — MIDWESTGuard Public Intake and Asynchronous Delivery Architecture
was approved by the governing Systems Architect Discipline session.

This bounded governance transaction:

- establishes Cloudflare-native D1, R2, and Queue-based durable public intake
  and asynchronous delivery as Approved target architecture;
- preserves the current `automation.midwestguard.net` submission path as
  current legacy implementation pending separately governed replacement;
- removes n8n from the approved target architecture without disabling or
  rewriting functioning legacy callers or historical evidence;
- preserves EspoCRM as the current bounded operational delivery adapter under
  ACP-005;
- updates the canonical infrastructure architecture to distinguish Current,
  Approved target, Unknown, and Historical state;
- makes no website runtime, DNS, Worker-route, n8n, EspoCRM, Odoo, or production
  infrastructure change.

This historical architecture transaction does not change the current Business
Recovery / Cash Engine objective or the deferred Institutional Memory records.

### Pre-Implementation Audit Finding

The Diagnostic specification, D1–D12 instrument, pilot-engagement architecture,
and pilot-authorization package already exist. The authorization package states
that the next commercial gate is real-prospect identification and
qualification. Additional methodology creation is therefore not the current
objective unless a specific operational deficiency is demonstrated.

---

## Priority Queue:

1. Restore and operate the MIDWESTGuard Joplin metro cash engine from lead
   generation through collections/cash visibility using current governed tools
   and accountable handoffs
2. Resolve the first evidenced cash-engine handoff gap through the smallest
   authorized process, configuration, integration or software action
3. Govern and implement the Location-aware Job Photo Evidence objective only
   after the required OCP-014 amendment/successor and dedicated media-storage
   boundary are approved
4. Consider deferred post-cutover improvements only after the operating chain is
   accountable and measurable; return to governance before any authority change
5. Resume the Institutional Memory Diagnostic pilot from the preserved Protein
   Solutions qualification package when business recovery no longer requires
   this priority
6. Resume methodology development or historical research only for a defined
   diagnostic, falsification, operational or commercial requirement

---

## Session Management

When Current Objective is complete:

1. Verify against Definition of Done.
2. Update OPERATING-PLAN.md.
3. Promote Priority Queue item #1 if appropriate.
4. Commit changes.
5. Stop.

## Institutional Memory Commercialization Constraint

The Institutional Memory research program must remain connected to a
commercially useful outcome.

Research is not authorized merely because another case is interesting or
because additional evidence can be collected.

Following completion of the current research sprint, additional major
case-study research should require a defined:

- framework requirement;
- diagnostic requirement;
- falsification requirement; or
- commercial requirement.

The immediate commercial milestone is:

> **Can The Russow Institute sell and competently perform a $10,000
> Institutional Memory Diagnostic using the intellectual property that exists
> today?**

The intended commercialization path is:

**Research IP → Framework → Diagnostic Methodology → Client Deliverable →
Pilot Engagement → Commercial Validation → Repeatable Delivery →
Technology Requirements**

Authoritative strategic reference:

[Institutional Memory — Commercialization Thesis](../research-programs/001-institutional-memory/COMMERCIALIZATION-THESIS.md)

## Institutional Memory Research Sprint Closeout

Research Program 001 has completed its initial historical empirical sprint.

Current state:

- Challenger findings: 8;
- BP findings: 10;
- cross-case findings: 6;
- established framework propositions: 0;
- Canon propositions: 0;
- candidate Institutional Memory framework: ready for applied testing;
- Selective Conversion Failure: supported hypothesis.

The next priority is not automatic expansion into another historical case.

### Deferred Commercial Objective

**Resume the Institutional Memory Diagnostic pilot from its preserved
qualification and authorization records when Business Recovery no longer
requires priority.**

Immediate commercial test:

> **Can The Russow Institute sell and competently perform a $10,000
> Institutional Memory Diagnostic using the intellectual property that exists
> today?**

Historical research should resume when required by a defined framework,
diagnostic, falsification, or commercial need.

Research closeout:

[Institutional Memory Framework-Readiness Synthesis](../research-programs/001-institutional-memory/evidence/014-INSTITUTIONAL-MEMORY-FRAMEWORK-READINESS-SYNTHESIS.md)

Commercial strategy:

[Institutional Memory — Commercialization Thesis](../research-programs/001-institutional-memory/COMMERCIALIZATION-THESIS.md)
