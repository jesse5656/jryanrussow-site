# ACP-015 Production Activation — Exterior Roof/Siding Delivery Binding

Version: 1.0.0
Status: Approved for bounded production-gate preparation
Type: Production activation addendum
Authority: Systems Architect Discipline
Prerequisite: ACP-015 private Slice 1 implementation commit `a9c87f2c88426c25318e4294eb125e3553c1b674`

## Decision

The accepted private ACP-015 Exterior Roof/Siding slice may be promoted for one
controlled production activation against an already-authorized ACP-013 Job. This
addendum authorizes the production catalog/binding path only. It does not
authorize a new-construction or remodel production Job, broader phase catalogues,
new status models, or general delivery-plan rollout.

OFBiz remains authoritative for the Job and selected Roof/Siding Work Orders
under ACP-013. The accepted contract and document reference remain the source of
contract evidence. No record is dual-written to EspoCRM.

## Exact production scope

The first activation may use only:

1. one real accepted contract already handed off under ACP-013;
2. its existing native `WorkEffort(PROJECT)` Job;
3. its existing selected Roof and/or Siding `WorkEffort(TASK)` Work Orders;
4. immutable catalog version `M24_NC_RM_EXT_V1`;
5. the existing `M24_GATE_EXTERIOR_READY` evidence rule; and
6. the existing production status and transition ownership defined by ACP-013.

The activation creates the Exterior `PHASE` and `M24DeliveryJobNode` bindings
only after the production gate passes. It must not re-parent, duplicate, or
rewrite a Job or Work Order.

## Preconditions

Before any production write, record non-secret evidence for:

- accepted-contract reference and document reference/hash where available;
- canonical Job, Customer, Contact, Property, Opportunity and selected trade IDs;
- accountable coordinator and production receiver;
- exact `M24_NC_RM_EXT_V1` catalog hash;
- approved `M24_GATE_EXTERIOR_READY` evidence and attributable reason;
- real-user least-privilege authorization;
- current backup/recovery point and rollback owner; and
- confirmation that the target Job has no existing ACP-015 delivery binding.

Any missing or contradictory precondition blocks the write. Synthetic IDs,
private fixture evidence, inferred statuses, direct SQL, and manual row edits are
not valid substitutes.

## Production operation

The implementation must use the committed ACP-015 service and native OFBiz
transaction/entity semantics. The operation must:

- verify the catalog hash and gate evidence;
- resolve the existing production Job and selected Roof/Siding Work Orders;
- create exactly one Exterior Phase and one immutable binding per selected trade;
- preserve explicit `NOT_APPLICABLE` only where the production scope establishes
  that a catalog node is not selected;
- reject missing, ambiguous, altered, duplicate, or out-of-scope relationships;
- write an attributable production receipt; and
- leave the direct ACP-013 `PROJECT → TASK` parentage unchanged.

No production materialization may create a customer, contact, property, lead,
opportunity, Job, Work Order, assignment, status, document byte, payment,
invoice, accounting entry, or communications event.

## Acceptance gate

The first production activation passes only when a real-user controlled run
proves:

- authorized coordinator login and production Job visibility;
- correct accepted-contract and CRM context;
- exact catalog/hash and gate evidence;
- one Exterior Phase with the expected selected-trade bindings;
- coordinator/crew authorization remains least privilege;
- exact replay is inert;
- altered replay conflicts with no business effect;
- restart preserves the graph and receipt;
- independent reconstruction and semantic integrity checks pass; and
- backup and rollback evidence is recorded.

Failure stops new delivery-model writes and returns to governance. There is no
dual-write fallback and no silent cleanup of a partial production graph.

## Rollback

Before the first production write, capture a timestamped recoverable backup and
pre-state evidence. A failed activation restores the bounded ACP-015 additions
through the approved rollback owner and preserves the evidence. It must not
rewrite ACP-013 Job/Work Order history or alter CRM authority.

## Explicit exclusions

This addendum does not authorize:

- a new-construction or remodel Job;
- Foundation, Framing, Interior, Systems, Closeout or other future phases;
- new production statuses or transition owners;
- permits, inspections, safety, subcontractor compliance, payroll, lien,
  insurance or legal determinations;
- documents or signing bytes;
- estimate, contract, change-order, procurement, inventory, billing,
  accounting, AR, collections, scheduling/dispatch or warranty automation;
- live communications or provider integration; or
- broad LAN rollout beyond the one controlled activation.

## Implementation handoff

Deploy Apache OFBiz may prepare the production candidate from implementation
commit `a9c87f2c88426c25318e4294eb125e3553c1b674`, but must not execute a
production write until every precondition and acceptance row above is recorded.
Start with one accepted ACP-013 Job, stop on the first ambiguity, and return the
exact non-secret receipt and validation evidence for the next governance review.
