# ACP-013 Addendum — Production Job and Work Order Operationalization

Version: 1.1.0

Status: Approved

Type: Production operating-transition contract

Authority: Systems Architect Discipline

Approved: 2026-09-25

## Decision

Midwest24 Core Enterprise/OFBiz is authorized to become the production authority for the bounded downstream path from an accepted MIDWESTGuard contract to one Job and its Roof/Siding Work Orders. This follows OFBiz CRM authority and does not authorize billing, receivables, collections, accounting, procurement, inventory, documents, communications, or automated website intake.

Enterprise Operations Slices 1 and 2 remain the accepted technical foundation. Their synthetic fixtures, principals, evidence, and statuses are not production records or production lifecycle authority.

## Preconditions

Before a live handoff, record in non-secret evidence:

1. accountable sales handoff owner and accountable production receiver;
2. actual accepted-contract source, business reference, customer, contact, property, accepted scope, trade(s), acceptance time, and document reference/hash where available;
3. approved production Job and Roof/Siding Work Order statuses, transition owners, and required evidence; and
4. real-user identity, least-privilege role, backup/recovery point, and rollback owner.

Any missing precondition blocks the affected live handoff. It does not authorize using a synthetic default, a private fixture identity, or an inferred status.

## Production lifecycle configuration

The first production handoff uses only these new deterministic status IDs. They are not the retained synthetic Slice 1/2 status IDs.

| Object | Status IDs in order | Transition owner | Required evidence |
| --- | --- | --- | --- |
| Job | `M24_PRD_JOB_ACCEPT` → `M24_PRD_JOB_ACTIVE` → `M24_PRD_JOB_DONE` | Production coordinator | Accepted-contract reference at intake; attributable reason/event for each later transition |
| Roof Work Order | `M24_PRD_ROOF_READY` → `M24_PRD_ROOF_SCHED` → `M24_PRD_ROOF_INSTALL` → `M24_PRD_ROOF_CHECK` → `M24_PRD_ROOF_DONE` | Coordinator: Ready→Scheduled, Installed→Checked, Checked→Done. Assigned Roof crew: Scheduled→Installed only. | Assignment and scoped grant before crew installation; attributable event/reason for every transition |
| Siding Work Order | `M24_PRD_SIDE_READY` → `M24_PRD_SIDE_SCHED` → `M24_PRD_SIDE_INSTALL` → `M24_PRD_SIDE_DONE` | Coordinator: Ready→Scheduled and Installed→Done. Assigned Siding crew: Scheduled→Installed only. | Assignment and scoped grant before crew installation; attributable event/reason for every transition |

No actor may skip, reverse, or perform another trade’s transition. A Job cannot complete until each selected trade Work Order is `DONE`. The first private acceptance and the first live controlled handoff must provision these status records deterministically, prove the allowed/denied transition matrix, and preserve immutable lifecycle evidence.

## Authority and data flow

```text
accepted contract → authorized Enterprise handoff → native WorkEffort Job
→ native Roof/Siding Work Orders → scoped production execution
```

- OFBiz is authoritative for the resulting Job and Work Orders after an accepted handoff.
- Customer, Contact, Property, Lead, Opportunity, Task, and Meeting remain authoritative in OFBiz under the completed CRM transfer.
- The accepted-contract source remains authoritative for contract execution evidence until Document Services is separately operationalized.
- No record is dual-written to EspoCRM, and EspoCRM remains stopped and preserved.

## Production safeguards

The implementation must reuse native `WorkEffort`, assignment, authentication, transaction, and history behavior plus the existing Midwest24-owned receipt, object-scope, audit, and replay controls. It must:

- create exactly one Job graph for an accepted idempotency key;
- reject altered replays, incomplete contract data, unknown Property/context, unauthorized users, and invalid lifecycle transitions with no effect;
- preserve immutable handoff and lifecycle attribution;
- restrict each coordinator and crew member to explicit scoped records/actions;
- retain a recoverable pre-handoff backup and a timestamped receipt; and
- stop new handoffs and return to governance on a lifecycle, authorization, accounting, document, or rollback ambiguity.

## Acceptance gate

A production handoff may begin only after a real-user controlled acceptance proves: login; contract intake; Customer/Contact/Property/Opportunity context; one Job and selected trade Work Orders; scoped coordinator and crew views; allowed and denied transitions; exact replay; altered replay conflict; restart persistence; backup/restore viability; and a production evidence record. Start with one accepted contract and expand only after that record passes.

## Explicit exclusions

This contract does not authorize invoice creation, AR, collections, payment posting, accounting authority, job-costing, procurement, inventory, payroll, scheduling/dispatch, documents bytes, live communications, public routing, or a new external integration. Each requires a later bounded authority decision tied to the next demonstrated cash-engine handoff.

## Implementation handoff

Deploy Apache OFBiz may implement the production handoff path only after recording the preconditions above. Reuse the Enterprise Operations Slice 1/2 owned component; do not promote synthetic fixtures or identities. Implement the narrow live-authorized configuration, real-user role mapping, controlled first-contract handoff, scoped Job/Work Order views, idempotency, backup evidence, and acceptance record. Preserve unrelated work. Show diff and validation before commit or broader rollout.
