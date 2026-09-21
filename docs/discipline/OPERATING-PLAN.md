# Systems Architect Discipline Operating Plan

<div class="ri-document-meta" markdown>

**Document Type**
Operating Plan

**Status**
Active

**Version**
1.3.0

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
Joplin metro cash-engine operation and the bounded CRM-completion workstream

Status:
In Progress

</div>

Restore MIDWESTGuard's cash engine in the Joplin metro while completing the
bounded CRM replacement capabilities required to retire EspoCRM/Core Command
safely. The cash-engine operating path is:

**lead generation → inbound qualification → outbound follow-up → inspection
scheduling → estimate follow-up → contract conversion → production handoff →
collections/cash visibility.**

This objective has two coordinated workstreams:

1. **Cash-engine operation:** use the already governed current systems to
   restore, measure and operate the Joplin metro lead-to-cash path. This does
   not authorize an ungoverned replacement application or an immediate change
   of live system authority.
2. **CRM completion prerequisite:** advance Midwest24 Core Enterprise through
   governed private slices and separately approved capability cutovers until it
   can become the durable CRM and ERP authority. EspoCRM/Core Command remains
   the current live authority for every capability that has not passed its own
   cutover gate.

CRM completion is a prerequisite parallel workstream within business recovery;
it is not a competing objective and does not create permanent dual authority.

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
- EspoCRM/Core Command is not retired, weakened or treated as permanently
  authoritative before the migration-program exit gate passes; and
- the Institutional Memory Diagnostic pilot remains preserved as a deferred,
  resumable commercial objective.

### Cash-engine execution boundary

The immediate operating scope is the Joplin metro. Existing governed tools,
human processes and current operational systems remain in use while their
replacement gates are incomplete. The priority is a reliable, measurable path
from lead generation through collections and cash visibility, with each handoff
owned and evidenced. No custom application is authorized solely to restate this
workflow.

### CRM completion and EspoCRM/Core Command exit gate

The future abandonment gate is defined in
[ACP-013 EspoCRM Replacement Migration Program](../architecture/acp/ACP-013-ESPOCRM-REPLACEMENT-MIGRATION-PROGRAM.md).
It requires governed parity, migration/reconciliation, authorization and
reporting, human usability, required integrations, communications and document
relationships, Lead/Opportunity conversion, historical-data treatment,
cutover/rollback rehearsal, authority transfer, read-only retention and a
separate decommission approval. The gate is deliberately not met by this
Operating Plan update or by any single private rehearsal.

### Definition of Done:

- [ ] Joplin metro cash-engine handoff owners, measures and current-system
  boundaries recorded
- [ ] Lead generation through collections/cash-visibility operation restored and
  evidenced
- [x] CRM Replacement Slice 4 private acceptance closed/pass
- [x] Net2phone Capability & Integration Assessment completed
- [x] Voice Call Communications Context Rehearsal private acceptance closed/pass
- [ ] EspoCRM/Core Command abandonment gate status recorded; no unapproved
  authority transfer
- [ ] Repository governance validation passed
- [ ] Scoped diff reviewed
- [ ] Commit completed after separate approval

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

**Contact decision completed:** 2026-09-06

**Current contact state:**

Protein Solutions is authorized for **bounded organization-level qualification
contact only**. The contact is limited to resolving the qualification
dimensions established in the committed pre-contact brief.

**Selection boundary:**

No pilot prospect has been finally selected. The Institutional Memory Diagnostic
is not authorized. Named-person enrichment and outreach automation remain
unauthorized.

**Exact next action:**

Prepare the Protein Solutions Qualification Contact Package: identify one
current organization-level public contact channel, draft one neutral initial
qualification message, and map the twelve qualification dimensions into a
concise conversation guide. Preserve the approximately-$10,000 / 75-record /
8-interview / 3–4-week / 70-hour boundaries. Do not perform named-person
enrichment. Present the exact channel and message for human review before
transmission.

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
2. Complete the governed CRM replacement sequence needed for safe
   capability-by-capability authority transfer; preserve the closed private
   Voice rehearsal and return to governance before any additional
   communications capability or production decision
3. Assess the EspoCRM/Core Command abandonment gate only after all required
   capability parity, reconciliation, usability, integration, rollback and
   retention criteria are evidenced
4. Resume the Institutional Memory Diagnostic pilot from the preserved Protein
   Solutions qualification package when business recovery no longer requires
   this priority
5. Resume methodology development or historical research only for a defined
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
