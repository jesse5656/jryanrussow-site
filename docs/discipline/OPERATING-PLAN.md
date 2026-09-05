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
Diagnostic Product Development

**Objective**
Institutional Memory Diagnostic Specification and Pilot Architecture

**Status**
In Progress

</div>

Develop the Institutional Memory Diagnostic specification and pilot
architecture as the next commercially useful application of the completed
Institutional Memory research program.

Immediate commercial test:

> **Can The Russow Institute sell and competently perform a $10,000
> Institutional Memory Diagnostic using the intellectual property that exists
> today?**

Success Criteria:

- define the bounded diagnostic purpose, buyer, inputs, method, outputs, and
  exclusions;
- distinguish diagnostic evidence from unsupported organizational diagnosis;
- define a pilot architecture that can be delivered without premature custom
  software;
- establish validation and falsification requirements;
- preserve the commercialization sequence from research IP through commercial
  validation.

### Definition of Done

- [ ] Diagnostic specification completed
- [ ] Pilot engagement architecture completed
- [ ] Evidence and provenance requirements defined
- [ ] Client deliverable boundaries defined
- [ ] Validation and falsification gates defined
- [ ] Repository governance validation passed
- [ ] Scoped diff reviewed
- [ ] Commit completed after separate approval

### Previous Objective Closeout — ACP-006

**Completed:** 2026-09-05

The Infrastructure, Access, and Credential Documentation Correction was
completed under approved ACP-006.

Closeout evidence:

- ACP-006 marked Approved;
- canonical infrastructure and credential documents created;
- obsolete material removed;
- MkDocs navigation updated;
- MkDocs build passed;
- Governance Enforcement passed;
- scoped diff reviewed;
- implementation committed as `379e08f`;
- implementation pushed to `origin/main`.

No deployed infrastructure or website implementation was changed.

---

## Priority Queue

1. Develop the Institutional Memory Diagnostic specification and pilot architecture
2. Define the first bounded pilot-engagement package
3. Resume historical research only for a defined diagnostic, framework,
   falsification, or commercial requirement

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
