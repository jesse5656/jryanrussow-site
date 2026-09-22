# ACP-013 Addendum — OFBiz CRM Operationalization and Cutover Gate

Version: 1.1.0

Status: Approved

Type: Implementation and capability-cutover contract addendum

Authority: Systems Architect Discipline

Approved: 2026-09-21

Scope: A bounded MIDWESTGuard operational-CRM parity implementation and a
conditional same-day authority-transfer gate for new Customer, Contact, Property,
Lead, Opportunity, Task and Meeting records. This is not an ERP, accounting,
communications, document-service, production-job, or provider-integration
cutover.

## Decision

MIDWESTGuard will implement Midwest24 Core Enterprise / Apache OFBiz as the
operational CRM candidate now. EspoCRM/Core Command remains the current authority
until every gate in this contract passes and a named cutover owner records the
effective timestamp. A passing private rehearsal alone does not satisfy this
contract.

The governing human has confirmed that the existing EspoCRM business-like records
were intentionally created configuration/test records, have not been used for
operations, and will not be used. They are not a production-history migration
population. Before cutover, preserve a read-only export and recovery point, record
the aggregate disposition, and retain EspoCRM as configuration reference only.
No record may be silently deleted or represented as migrated.

The completed CRM Replacement Slices 1–4 and the Voice Communications Context
Rehearsal remain valid technical evidence. Their private fixture/migration
machinery is not an operational user interface or production authority.

## Governing authority

- [ACP-013 CRM and ERP Authority Transition](ACP-013-MIDWEST24-CRM-ERP-AUTHORITY-TRANSITION.md)
  establishes Enterprise as the strategic CRM/ERP target and requires a separate
  capability cutover.
- [ACP-013 EspoCRM Replacement Migration Program](ACP-013-ESPOCRM-REPLACEMENT-MIGRATION-PROGRAM.md)
  supplies the object-by-object authority matrix, rollback rule and common
  cutover gate.
- [CRM Replacement Slices 1–4](ACP-013-CRM-REPLACEMENT-SLICE-1-CONTRACT.md)
  through Slice 4 supply accepted identity, lifecycle, relationship,
  authorization, replay and reconstruction evidence.
- [OCP-012](../ocp/OCP-012-MIDWESTGUARD-COMMUNICATIONS-ARCHITECTURE.md) keeps
  live provider configuration and communications cutover outside this scope.

## Current-source disposition

The current EspoCRM configuration is the parity reference. Its existing
non-production records must be handled as follows before authority transfer:

1. take a protected recovery point and a read-only, identifier-minimized
   inventory of Accounts, Contacts, Leads, Opportunities, Tasks, Meetings,
   Properties, Notes, Documents and Attachments;
2. record aggregate counts, export location, checksum, operator and timestamp in
   non-secret evidence;
3. retain the source unchanged through the Enterprise rollback window;
4. do not import, delete, transform or dual-write these records; and
5. classify any record discovered to have real operational use as an exception
   that blocks the affected family until separately governed.

This disposition retires the assumption that a production historical migration
is a prerequisite for this cutover. Proven migration tooling remains preserved
for future import/reconstruction and for any exception.

## Operational parity implementation

Implementation may create a separate operational CRM path in `mwg-ofbiz`. It
must not relabel private fixture services as live capability or weaken their
private-runtime guards.

The parity register must freeze every configuration item required by daily
MIDWESTGuard sales operation, with exactly one status: `EXACT`,
`FUNCTIONALLY_EQUIVALENT`, `MISSING`, `DIFFERENT_GOVERNED`, `NOT_NEEDED`, or
`UNKNOWN`. A `MISSING` or `UNKNOWN` item required by the active workflow blocks
cutover. A `DIFFERENT_GOVERNED` item must state its business effect and approval
basis.

At minimum the register covers:

- Lead source, required intake data, qualification status/reason, priority,
  geography, assignment and follow-up fields;
- Opportunity stages and the active appointment/estimate/contract handoff
  semantics required before production handoff; inactive legacy grouping is not
  parity by itself;
- Customer, Contact and Property identity, relationship, address and active
  operational fields;
- Task and Meeting state, assignment, due/completion, appointment, reminder and
  attendee behavior required by the current workflow;
- operating lists, queues, filters and detail views; and
- real user, role, group, object/action-scope and session/logout behavior.

The operational implementation must provide normal authenticated create, read,
update and transition paths for actual authorized MIDWESTGuard users. It must
not require `M24P_COORDINATOR`, a rehearsal-only permission, a synthetic source
fixture, or a private-isolated runtime. Existing rehearsal identities remain
isolated evidence.

## Website intake boundary

Before CRM authority transfer, new website submissions may be entered manually into Enterprise under a documented single-entry procedure. The dedicated Enterprise intake adapter is a post-cutover improvement. It must preserve
the submission UUID as an immutable idempotency/provenance key, create at most
one canonical Enterprise Lead, reconcile uncertain delivery, and expose no
provider or administrator credential.

The current EspoCRM adapter remains live until the Enterprise adapter has passed
its cutover rehearsal. Cutover changes the downstream destination once, at the
effective timestamp. Dual-write is prohibited.

## Required operational workflow

The following path must pass with real operating identities and de-identified
acceptance inputs before authority transfer:

`new Lead → qualification → follow-up → inspection Meeting → Opportunity →
estimate follow-up → accepted-contract handoff boundary`.

For each step, the evidence must identify the Enterprise object, lifecycle
state, required role, human view, persisted history and denial behavior. A
signed-contract Job handoff may use the separately governed Enterprise Operations
boundary; document-service deployment, accounting, collections and live
communications integration are not authorized by this contract.

## Cutover gate

The named cutover owner may transfer authority for new CRM records only after all
of the following are PASS:

1. source disposition and recovery evidence above;
2. complete parity register with no active-workflow `MISSING` or `UNKNOWN` item;
3. real-user identities and least-privilege roles configured, with positive and
   negative login/session/object-scope tests;
4. real-user Customer, Contact, Property, Lead, Opportunity, Task and Meeting
   acceptance, including required lists/detail/mobile views;
5. Lead-to-Opportunity and appointment/estimate/accepted-contract boundary
   acceptance, with explicit unsupported-state denial;
6. either the Enterprise website-intake adapter tests pass, or the named cutover owner records the temporary manual single-entry procedure and accountable operator;
7. deployed image equals the accepted operational candidate; durable database,
   current backup, restore, restart, hostname/TLS/access and log/monitoring
   checks pass for that deployment;
8. a cutover and rollback rehearsal proves no dual-write and preserves the
   source recovery point; and
9. an accountable human records the effective timestamp, authority matrix,
   rollback owner and Espo read-only/configuration-reference state.

A same-day authority transfer is permitted only when every item passes on the
actual proposed runtime. No inferred pass is allowed.

## Authority transfer and rollback

At the recorded effective timestamp, Enterprise becomes authoritative for all
new in-scope CRM records: Customer, Contact, Property, Lead, Opportunity, Task
and Meeting. EspoCRM stops receiving authoritative new records. After the protected final recovery snapshot and recorded authority timestamp, it may be stopped and automatic startup disabled; its preserved snapshot remains the rollback/reference point.

If a material defect occurs, stop Enterprise new writes, preserve all Enterprise
records and receipt evidence, restore the verified Espo recovery point if
needed, and reverse the website destination once under the named rollback owner.
Do not synchronize two CRMs or delete records to make rollback appear clean.
A resumed authority transfer requires a new reconciliation finding and human
approval.

## Explicit exclusions

This contract does not authorize live Net2phone configuration, SMS, voicemail,
recording/audio access, provider credentials, document-service deployment,
production Job/Work Order cutover, accounting, procurement, ERP expansion,
A15, A17, Espo data deletion, or final Espo retirement.

## Evidence and stop conditions

Evidence must be timestamped, secret-free and sufficient to independently
reconstruct the cutover decision. Stop and return to governance on any:

- real operational Espo record exception;
- active-workflow parity gap;
- inability to preserve the operational meaning without a new owned model;
- user/authorization failure;
- duplicate or unreconciled intake result;
- current-runtime backup, restore, deployment or access failure; or
- request to broaden scope beyond this contract.
