# OCP-001 — Engineering Execution Rules

Version: 1.1.0

Status:
Approved

Type:
Operational Change Proposal

------------------------------------------------------------------------------

## Purpose

Approve the addition of Engineering Execution Rules to the active Operating Plan.

These rules standardize repository-first implementation, pre-implementation auditing, copy/paste-safe command generation, validation before commit commands, and architecture stability.

------------------------------------------------------------------------------

## Current State

Engineering sessions repeatedly generated implementation before fully auditing repository state, occasionally duplicated existing capabilities, and sometimes produced commit commands before validation completed.

------------------------------------------------------------------------------

## Approved Operational Change

The Operating Plan shall include recurring Engineering Execution Rules requiring:

- repository-first execution;
- a pre-implementation audit;
- extension of existing implementation instead of duplication;
- one copy/paste-safe implementation block;
- targeted validation followed by the full test suite;
- commit commands only after validation passes;
- ACP or OCP approval for architectural or operational changes.

------------------------------------------------------------------------------

## Scope

- `docs/discipline/OPERATING-PLAN.md`
- `docs/architecture/ocp/OCP-001-ENGINEERING-EXECUTION-RULES.md`
- `docs/operations/REPOSITORY-CHANGE-WORKFLOW.md`
- `docs/operations/workspace/AI-COLLABORATION-STANDARD.md`

------------------------------------------------------------------------------

## Governance Boundary

This OCP changes recurring engineering execution procedure.

It does not modify constitutional principles or authorize architectural redesign.

------------------------------------------------------------------------------

## Approval

Approved by the governing Systems Architect Discipline session.

## 2026-09-11 Amendment — Model Selection and Credit Conservation

Approved by the repository owner's explicit instruction to establish this
cross-repository execution rule on 2026-09-11. This authorizes the bounded
policy amendment, not a commit or push.

Amend the existing Repository Change Workflow with the single authoritative
[model-selection rule](../../operations/REPOSITORY-CHANGE-WORKFLOW.md#cross-repository-model-selection-and-credit-conservation),
and reference it from the AI Collaboration Standard. Prefer Spark for suitable
bounded execution, preserve stronger reasoning and justified fallback, reuse
validated context, and conserve credits subject to governance and correctness.
The detailed requirements live in that workflow rather than being copied here.

Classification: operational execution standard combining a conservation
principle and a review checklist. Existing deterministic governance enforcement
remains applicable; no model-only CI gate or constitutional revision is needed.

The existing Operating Plan and its unrelated current objective are unchanged.
Reference-based propagation to consumer entry instructions is proposed in the
canonical rule; no bulk consumer edits or global client defaults are authorized
by this amendment. Review the scoped diff and validation before any separately
approved commit or push.


### Amendment validation

Validated 2026-09-11: governance policy schema; direct application of the
existing governance engine's approval, scope and metadata checks to the three
unstaged amendment files; all 14 governance tests and 3 operating-plan parser
tests; strict MkDocs build; relative links and rendered policy anchors; and
Git whitespace checks. The ordinary commit-range check alone does not validate
unstaged edits. Hash comparison confirmed the pre-existing Operating Plan and
two unrelated research artifacts were untouched. No files were staged,
committed or pushed. Model suitability was reviewed as policy judgment; this
amendment does not assert automated model routing or measured credit savings.
