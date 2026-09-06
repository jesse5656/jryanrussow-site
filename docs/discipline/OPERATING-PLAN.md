# Systems Architect Discipline Operating Plan

<div class="ri-document-meta" markdown>

**Document Type**
Operating Plan

**Status**
Active

**Version**
1.1.0

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

**Type**
Commercial Pilot Development

**Objective**
Institutional Memory Diagnostic Pilot Prospect Qualification

**Status**
In Progress

</div>

Identify and qualify a bounded set of organizations for the first approximately
$10,000 Institutional Memory Diagnostic pilot using the approved Version 1.1
prospect-identification method and the existing diagnostic authorization
package.

This objective does not authorize organizational diagnosis, named-person
contact enrichment, outreach automation, broad production prospecting,
numerical scoring, or additional methodology development without a demonstrated
deficiency.

Success Criteria:

- define the bounded universe, sector or geography, lookback, timebox, and
  exclusions before research;
- identify candidates using public evidence;
- evaluate the noncompensatory Problem → Awareness → Corrective Action →
  Recurrence or Persistence pattern;
- apply the Current Meaningful Operating Boundary Gate;
- perform independent contradiction searches;
- preserve provenance and distinguish fact, inference, hypothesis, and unknown;
- produce governed candidate dossiers and a comparative ranked list;
- obtain human review before selecting or contacting a pilot prospect.

### Definition of Done

- [ ] Bounded prospect universe approved
- [ ] Candidate discovery completed
- [ ] Advanced-candidate dossiers completed
- [ ] Contradiction searches completed
- [ ] Comparative ranked list completed
- [ ] Human qualification review completed
- [ ] One pilot prospect selected or the evidence-based no-selection result recorded
- [ ] Next commercial action established
- [ ] Repository governance validation passed
- [ ] Scoped diff reviewed
- [ ] Commit completed after separate approval

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

### Pre-Implementation Audit Finding

The Diagnostic specification, D1–D12 instrument, pilot-engagement architecture,
and pilot-authorization package already exist. The authorization package states
that the next commercial gate is real-prospect identification and
qualification. Additional methodology creation is therefore not the current
objective unless a specific operational deficiency is demonstrated.

---

## Priority Queue

1. Identify and qualify candidates for the first bounded IMD pilot
2. Select one qualified pilot prospect and complete its authorization package
3. Define commercial terms and begin the controlled pilot
4. Resume methodology development or historical research only for a defined
   diagnostic, falsification, operational, or commercial requirement

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

### Highest-Priority Objective

**Develop the Institutional Memory Diagnostic specification and pilot
architecture.**

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
