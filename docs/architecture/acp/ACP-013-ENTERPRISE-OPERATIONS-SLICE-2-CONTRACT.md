# ACP-013 Implementation Contract — Enterprise Operations Slice 2

Version: 1.0.0

Status: Approved

Type: Implementation contract addendum

Authority: Systems Architect Discipline

Approved: 2026-09-15

Scope: The next bounded Midwest24 Core Enterprise productization slice after Enterprise Operations Slice 1. No production migration, record-authority transfer, CRM integration, procurement, billing, accounting, calendar dispatch, or Apache upstream change.

## Decision

The next objective is **Enterprise Operations Slice 2 — Trade Work Order Lifecycle and Field Completion**.

The slice extends the proven signed-contract Job intake path into a usable downstream execution loop: an authorized Job Coordinator schedules and assigns the existing synthetic Roof and Siding Work Orders; the assigned trade user records installation from the owned field experience; and the coordinator performs the bounded remaining completion actions. It is not A17, CRM Slice 2, a production lifecycle rollout, or a replacement for Command/EspoCRM.

## Why this is next

Enterprise Operations Slice 1 proved a findable, scoped native Job with Roof and Siding child Work Orders but intentionally prohibited lifecycle transitions, field execution, scheduling, procurement and financial work. The representative POC already proved the smallest safe native WorkEffort transition graph, crew scope, append-only attribution, mobile field action, replay, rollback, restart, restore and rebuild behavior. Reusing that proven graph provides the highest-value next operational loop with the smallest new architecture.

Procurement, inventory, billing, documents, warranty and broader dispatch depend on a reliable assigned and completed Work Order. Enterprise must prove this execution loop before those later slices. Command remains the current authority for lead, qualification, sales and communications.

## Business outcome

In a private isolated OFBiz 24.09.07 copy, a non-admin coordinator can move one native Job through the bounded execution state, assign its Roof and Siding Work Orders to their respective synthetic crews, and complete the trade-specific lifecycle. Each assigned crew can use a mobile owned field screen to view only its assigned Work Order and record only its permitted installation action. The system retains native WorkEffort status, native assignment, owned authorization grant, immutable dual-attribution event history and exact replay receipt.

## Governing authority

- ACP-004: source-controlled owned extension, upgradeability, restore and independent reconstruction.
- ACP-005 and OCP-012: Command/EspoCRM and net2phone remain the front-office/communications boundary.
- ACP-011: Enterprise is the candidate ERP product; no final platform selection follows.
- ACP-013 and its identity/Property addenda: Command remains current operational CRM authority; Enterprise owns only the downstream execution candidate graph under gated evaluation.
- ACP-013 Enterprise Operations Slice 1: native Job/Work Order, source provenance, contract reference, least-privilege coordinator workspace and empty-LAN deployment boundary.
- Representative POC A04/A07/A08/A11/A12/A14: the bounded Job, Roof and Siding transition graph; object scope; append-only history; field usability; persistence; reconstruction.

No new ACP is required: this contract uses that already-governed graph without changing any system-of-record boundary.

## System-of-record and responsibility boundary

| Object or concern | Authority in this slice | Limit |
| --- | --- | --- |
| Lead, qualification, sales stage, customer communications | Command/EspoCRM | Enterprise may read only the already-created synthetic downstream graph; no writeback, sales state or communication capability. |
| Customer, Contact, Property, Opportunity provenance | Existing synthetic candidate identities in Enterprise | No production synchronization or authority transfer. |
| Job and Work Order execution | Enterprise native `WorkEffort(PROJECT/TASK)` | One synthetic Job with its existing Roof and Siding children only. |
| Assignment | Native `WorkEffortPartyAssignment` plus owned scoped action grants | Assignment is execution scope only; it is not payroll, subcontractor contracting, capacity planning, calendar dispatch or customer scheduling. |
| Lifecycle and audit | Native WorkEffort status plus owned immutable `M24BusinessEvent` | No status taxonomy beyond this contract and no destructive history rewrite. |
| Documents | Existing contract metadata reference only | No document filing, bytes, Document Services integration or evidence upload. |

Native OFBiz remains responsible for WorkEffort identity, parent/child relationship, status persistence, party assignment, authentication/session and transaction behavior. Midwest24-owned code remains responsible for transition policy, request validation, object/action scope, idempotent command receipts, dual attribution, owned UI and audit presentation. Apache upstream must remain unchanged.

## Exact lifecycle and roles

The only approved state graph is:

```text
Job:    Accepted → Active → Complete
Roof:   Ready → Scheduled → Installed → Checked → Done
Siding: Ready → Scheduled → Installed → Done
```

- The coordinator may perform Job activation/completion, both Ready → Scheduled transitions, Roof Installed → Checked → Done, and Siding Installed → Done.
- Job completion requires both children to be Done. It implies no financial, warranty, inspection, document, inventory or customer-notification closure.
- An assigned Roof crew may perform only its own Roof Scheduled → Installed transition.
- An assigned Siding crew may perform only its own Siding Scheduled → Installed transition.
- `Scheduled` is a bounded operational readiness state in this slice, not a calendar appointment, customer promise, route optimization, or automated dispatch.
- The disabled execution principal remains noninteractive and performs only the minimum native posting required by the owned transaction. The human initiator and effective executor remain separately recorded.

## Data posture and flow

All business writes use the retained Enterprise Operations Slice 1 synthetic Job graph in a private, isolated same-version OFBiz copy. No production Command/EspoCRM, website, Queue/D1, net2phone, Document Services, calendar, payroll, vendor, inventory, accounting or real customer data may be contacted.

```text
synthetic signed-contract Job → coordinator assignment/scheduling → scoped crew field installation → coordinator check/completion
```

The controlled LAN deployment may install owned application/configuration capability only after private acceptance. It must retain PostgreSQL and CRM Slice 1 state and contain zero Job, Work Order, assignment, lifecycle-event, or other Slice 2 business fixture rows. External validation is limited to authenticated empty-state navigation, role denial and logout.

## Acceptance contract

### Positive paths

1. Record private isolation, image/version, sources/hashes, mounts, ports, preflight state and rollback location.
2. Use the exact existing synthetic Job with one Roof and one Siding child. Verify the native IDs, Customer, Contact, Facility Property, Opportunity and contract reference remain unchanged.
3. A non-admin coordinator activates the Job, schedules each trade and creates exactly one time-valid native WorkEffort assignment and one scoped action grant per trade.
4. Each assigned crew can log in separately, view only its own assigned trade at 390-pixel mobile and normal desktop widths, and record Installed once. No cost, customer communications, other trade data or administrative tools are exposed.
5. The coordinator completes Roof through Checked and Done, completes Siding through Done, then completes the Job. The UI presents an authorized lifecycle summary and audit history without raw payloads or financial data.
6. Each accepted command records its initiating human, execution principal, from/to state, reason, request ID, canonical payload hash, timestamps and native target IDs in immutable history.
7. Identical sequential replay returns the original receipt and does not add assignment, grant, event or status effect. Two concurrent identical commands produce one effect and stable receipt.
8. Inject a failure after the native status/assignment change boundary but before owned completion. Verify atomic rollback: no status change, assignment, grant, event, receipt or partial owned state remains; a clean retry succeeds once.
9. Restart/recreate the isolated application and database services without reseeding. Verify the final graph, assignments, grants, status/event history and replay behavior persist.
10. Export normalized native/owned records and independently reconstruct the Job/Work Order graph, assignments, lifecycle/event chronology and contract reference. Deliberate assignment/event or status tampering must be detected by the reconstruction check.

### Negative and authorization paths

1. Reject invalid skips, reverse transitions, early Job completion, wrong trade/status pairing, missing reason, missing request ID and altered payload under an existing request ID with no effect.
2. Reject an unassigned Roof/Siding crew, a crew attempting the other trade, a coordinator outside explicit Job scope, CRM-only coordinator, reviewer, finance user, disabled executor and unauthenticated caller.
3. Reject guessed Job or Work Order IDs without disclosing whether the object exists.
4. Reject direct native entity/admin, finance, inventory, document-byte, generic service and status-edit routes for the relevant non-admin roles.
5. Reject reuse of a session after logout.
6. Reject attempts to add another trade, alter Customer/Contact/Property/Opportunity/contract context, create a delayed automation, calendar event, customer notification or Command writeback.

## Replay, rollback and persistence rules

Every mutable command uses an opaque request ID and canonical payload hash. The idempotency identity includes the Job, Work Order where applicable, action, actor, and exact payload. An identical command returns its prior receipt; changed content conflicts before mutation. A transaction failure rolls back both native and owned effects. Serialization must prevent two same-logical-operation requests from assigning or transitioning twice. Restart/recreation must preserve state and leave replay inert.

## User experience

The Coordinator workspace must show an authorized Job list/search/detail lifecycle summary, scoped trade assignment and permitted actions on a normal desktop viewport. The Roof and Siding field screens must remain usable around 390px wide without page-level horizontal overflow. Hidden navigation is not authorization; every direct route and service requires server-side object/action checks.

## Targeted regressions

Run only the touched proofs:

- Enterprise Operations Slice 1 Job/Work Order identity, source provenance, empty-LAN posture and coordinator workspace;
- A04 transition graph and early-completion protection;
- A07 least-privilege, direct-route and object-scope denial;
- A08 append-only correction/history behavior where the lifecycle event stream is touched;
- A11 mobile crew scope and Installed action;
- A12 restart/recreation persistence;
- A14 normalized export/reconstruction and tamper detection;
- CRM Slice 1 authentication/logout and Customer/Contact/Property read boundaries needed by the Job view.

A15 remains independently BLOCKED. A16 is COMPLETE. A17 remains NOT STARTED.

## Evidence, Git and deployment boundary

Retain non-secret evidence in `mwg-ofbiz/docs/evidence/enterprise-operations-slice-2/`: source/image hashes, fixture IDs, normalized counts, state/assignment/event receipts, sequential/concurrent replay, rollback, denial outcomes, mobile/desktop evidence, restart/recreation, reconstruction/tamper checks, LAN pre/post zero-state proof, rollback location and exact commands. Never store secrets, cookies, session IDs, real customer data or protected configuration in Git.

Implementation remains in the owned Midwest24 Enterprise component. The governing repository records authority only; runtime backups, databases and secrets remain outside Git. Before any implementation commit or push, show the exact diff and validation results for separate approval.

## Stop conditions

Stop and return to governance if the slice requires an ungoverned Job/Work Order status, production lifecycle decision, live Command/EspoCRM or other production integration, real data, calendar/dispatch semantics, payroll/subcontractor authority, document bytes/filing, procurement/inventory/accounting/billing, an Apache upstream modification/version change, broad native permission, ambiguous scope, non-atomic rollback, non-deterministic replay, or a LAN deployment that cannot remain empty of Slice 2 business records.

## Resume gate and implementation handoff

Deploy Apache OFBiz may implement this one slice after this contract is committed. It must re-resolve the governing and implementation repositories, audit the existing A04/A07/A08/A11/Enterprise Operations Slice 1 code, and execute private isolated validation before controlled empty-LAN deployment. It must not start A17, modify Command, promote Enterprise authority, or perform a version upgrade.
