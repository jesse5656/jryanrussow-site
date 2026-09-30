# OCP-014 — Job Readiness and Evidence Register

Version: 1.0.0
Status: Approved — private implementation authority
Type: Operational Change Proposal
Authority: Midwest24 Enterprise Architecture
Scope: One private accepted Roof/Siding Job

## Decision

Approve a bounded, private Job Readiness and Evidence Register for one accepted
MIDWESTGuard contract. The register links the signed-contract Opportunity to
one native OFBiz Job and selected Roof/Siding Work Orders. It records readiness
requirements as references to controlled evidence; it never stores document
bytes or replaces the accepted contract/document authority.

## Preconditions

- canonical Customer, Contact, Property and Opportunity exist in OFBiz;
- Opportunity is at the governed signed-contract boundary;
- one native PROJECT Job exists through the accepted ACP-013 handoff;
- selected Roof and/or Siding TASK Work Orders are linked to that Job;
- one real coordinator is assigned with the existing scoped production grant;
- this slice runs only in the private validation environment.

## Required evidence requirements

The register must support these requirement keys:

- INSPECTION_PERMIT_DECISION
- SAFETY_PLAN
- MATERIAL_TAKEOFF
- DAILY_REPORT
- PHOTO_EVIDENCE
- TRADE_QA
- PUNCH_LIST
- WARRANTY_CLOSEOUT

Each requirement records: register ID, Job ID, optional Work Order ID,
requirement key, applicability, status, evidence reference, actor, created
at, completed at, last updated at, and immutable history reference.

Allowed statuses are REQUIRED, IN_PROGRESS, COMPLETE, NOT_APPLICABLE, and
REJECTED. NOT_APPLICABLE requires an attributable reason. COMPLETE requires a
non-empty document or evidence reference, never document bytes.

## Transition boundary

The register may block only the specific governed transition named in the
acceptance matrix. It must not block CRM creation, signed-contract state,
Opportunity lifecycle, unrelated Work Orders, billing, accounting, AR,
collections, payments, procurement, inventory, customer-facing signing, or
subcontractor payment holds.

The private slice uses these gates:

- Job ACCEPT → ACTIVE requires INSPECTION_PERMIT_DECISION and SAFETY_PLAN;
- Roof READY → SCHED requires MATERIAL_TAKEOFF and SAFETY_PLAN when Roof is
  applicable;
- Siding READY → SCHED requires MATERIAL_TAKEOFF and SAFETY_PLAN when Siding
  is applicable;
- Job ACTIVE → DONE requires DAILY_REPORT, PHOTO_EVIDENCE, TRADE_QA,
  PUNCH_LIST, and WARRANTY_CLOSEOUT for every applicable selected trade;
- an explicitly NOT_APPLICABLE requirement never blocks its governed gate.

No other transition is changed.

## Integrity and authorization

Every state change records the authenticated human actor, timestamp, prior
status, new status, and reason. History is append-only. The coordinator may
initialize and complete Job-level requirements. A trade crew may complete only
its own Work Order requirements. Read access remains scoped to the existing Job
and Work Order grants. Synthetic M24P_* principals are rejected.

## Replay, rollback, and restart

Identical initialization is idempotent and returns the same register graph.
An altered replay with the same request key fails with zero effect. Any
injected failure during initialization or gate enforcement rolls back all
register rows, history rows, and gate effects. Restart preserves the register,
references, statuses, actors, timestamps, history, and gate decisions.

## Exclusions

No billing, invoicing, AR, collections, payment posting, accounting authority,
procurement, inventory, scheduling/dispatch expansion, document bytes, customer-
facing signing, public routing, website automation, external integration, or
subcontractor payment hold is authorized.

## Required approval

This draft becomes implementation authority only after it is placed in the
governing repository, reviewed under the applicable OCP/ACP process, approved,
and committed. Until then the existing JobFormRegister candidate remains
reference evidence only.
