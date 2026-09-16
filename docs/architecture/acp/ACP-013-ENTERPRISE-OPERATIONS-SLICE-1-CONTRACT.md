# ACP-013 Implementation Contract — Enterprise Operations Slice 1

Version: 1.0.0

Status: Approved

Type: Implementation contract addendum

Authority: Systems Architect Discipline

Approved: 2026-09-15

Scope: The next bounded Midwest24 Core Enterprise productization slice after CRM V1 Slice 1. No production CRM integration, record-authority transfer, lifecycle redesign or production-data migration.

## Scope

- `docs/architecture/acp/ACP-013-ENTERPRISE-OPERATIONS-SLICE-1-CONTRACT.md`

## Decision

The next implementation objective is **Enterprise Operations Slice 1 — Signed-Contract Job Intake and Job Workspace**.

This is the first bounded productization slice that turns an approved upstream conversion event into a usable downstream Enterprise record. It accepts one synthetic, governed BR-038 signed-contract handoff, creates exactly one native OFBiz Job with the requested Roof and Siding Work Orders, and gives an authorized non-admin Job Coordinator a bounded Job list and detail workspace.

This slice is not A17 and is not CRM Slice 2. A01–A16 are evaluation gates; no A17 contract exists. This work is a productization slice rather than another numbered evaluation gate. It does not extend Enterprise into current Lead qualification, Opportunity sales authority or customer communications, so calling it CRM Slice 2 would misstate its boundary.

No new architecture is approved or required. This contract implements the existing downstream boundary in ACP-005, ACP-011 and ACP-013, using the signed-contract semantics already approved by Capability 001 and the native/owned model already proven by A02, A16 and CRM V1 Slice 1.

## Why this is next

CRM V1 Slice 1 proved authenticated, non-admin Customer, Contact and Property operation. A02 and A16 proved the required native Job/Work Order graph, idempotent executed-contract receipt, stable Property identity, Opportunity-to-Job relationship, authorization and rollback in isolation. The missing product step is a bounded coordinator-facing downstream intake and Job workspace that joins those proofs without creating a second CRM.

Lead or Opportunity workflow in Enterprise is not next because Command/EspoCRM remains the operational CRM bridge and current authority for intake, communications, qualification and sales. Field execution, scheduling, documents, procurement and accounting depend on a reliably created, findable and authorized Job. The signed-contract Job boundary therefore precedes those later slices.

## Business outcome

An authorized Job Coordinator can receive one complete signed-contract handoff in an isolated synthetic test, then find and inspect the resulting Job and its Roof and Siding Work Orders through the owned Enterprise interface. The result establishes the first usable front-office-to-operations seam while preserving current Command authority and withholding production integration.

## Governing authority

- ACP-004 requires software freedom, isolated owned customization, upgradeability, restore and independent reconstruction.
- ACP-005 keeps EspoCRM as the bounded operational bridge, places Job and Work Order execution downstream, and makes signed-contract follow-up the first automation priority.
- ACP-011 controls the Midwest24 Core Command and Midwest24 Core Enterprise product identities.
- ACP-013 makes Enterprise the strategic target for the authoritative combined graph after separate record-family cutover, while preserving EspoCRM as current operational authority until those gates pass.
- The approved ACP-013 identity and Property addenda govern native Party, Person, Facility, SalesOpportunity and WorkEffort identity and relationships.
- Capability 001 BR-038 and its approved Signed-Contract Handoff Standard govern the conversion trigger and minimum outbound information.
- OCP-012 preserves customer communications in Command/net2phone and excludes them from Enterprise.
- The committed A02, A16 and CRM V1 Slice 1 evidence proves reusable implementation behavior; it does not itself grant production authority.

## Objects and systems of record

| Object | Current authority during this slice | Enterprise representation and limit |
| --- | --- | --- |
| Lead and conversion decision | Command/EspoCRM | External source identity, immutable provenance and synthetic conversion evidence only. Enterprise does not qualify, reopen or maintain the Lead. |
| Opportunity and sales stage | Command/EspoCRM | Native `SalesOpportunity` identity and source mapping may be used in the isolated fixture and related to the Job. Enterprise does not become the operational sales-stage authority. |
| Customer and Contact | Command/EspoCRM for current operations; Enterprise remains the strategic candidate after cutover | Native `PartyGroup` and `Person` records in the isolated fixture and the empty live candidate configuration. No production synchronization or authority transfer. |
| Property | Command/EspoCRM for current operations; Enterprise remains the strategic candidate after cutover | Native `Facility(M24_PROPERTY)` with effective-dated Party and address relationships under the approved Property decision. |
| Executed-contract document | Current managed-document authority remains unchanged; future shared Document Services remains separately gated | Store only the approved external document/version identity and SHA-256 reference needed for handoff integrity. Do not copy canonical bytes or allocate a competing document identity. |
| Job | Enterprise candidate | Native `WorkEffort(PROJECT)` is the downstream Job identity. Human Job number is a separate business key and cannot replace the immutable native ID. |
| Work Order | Enterprise candidate | Native child `WorkEffort(TASK)` with Midwest24-owned trade semantics. This slice creates Roof and Siding children only. |
| Handoff receipt and business audit | Enterprise candidate | Midwest24-owned immutable receipt, source mapping, idempotency hash, actor/executor attribution and event history. |

Passing this slice changes none of the current production authorities in the table.

## Native OFBiz and Midwest24-owned responsibility

Reuse native `PartyGroup`, `Person`, `Facility`, `FacilityParty`, `FacilityContactMech`, `PostalAddress`, `SalesOpportunity`, `SalesOpportunityWorkEffort`, `WorkEffort` and native authentication/session facilities. Apache upstream source must remain unchanged.

Midwest24-owned code is responsible only for the bounded inbound validation, exact source mapping, idempotent receipt, transaction orchestration, least-privilege object/action authorization, trade context, immutable audit, and owned Job list/detail interface. Existing proven services and entities must be extended or generalized where safe; do not create a second Job, Work Order, Party, Property, Opportunity, task or document engine.

## Allowed data flow

The implementation test uses a local synthetic adapter payload that represents Command's side of the approved signed-contract boundary:

`synthetic Command fixture -> authenticated owned handoff service -> native Enterprise Job/Work Orders -> bounded coordinator list/detail`

The payload must include a source system and instance, originating Lead and Opportunity identifiers, Customer, primary Contact, Property/service address, the required BR-038 intake fields, salesperson, relevant appointment context, conversion actor/time, and an exact executed-contract document/version ID plus SHA-256.

The service returns a stable receipt containing the Enterprise Job and Work Order IDs and correlation data. No production Command endpoint, EspoCRM database, website, queue, net2phone service, Document Services runtime or real customer data may be contacted. No writeback to Command is authorized.

## Prohibited duplication and expansion

This slice must not:

- create a second authoritative Lead, qualification, Opportunity-stage or communications workflow;
- change Command/EspoCRM, website intake, Queue/D1 delivery or current CRM authority;
- implement production Job or Work Order lifecycle transitions;
- copy contract bytes or make OFBiz Content a second canonical document store;
- add field execution, scheduling, document filing, procurement, inventory, accounting, billing, warranty or inspection scope;
- reuse source IDs, addresses or human Job numbers as native primary keys;
- modify Apache OFBiz upstream source or widen native schema fields;
- broaden administrator or normal-user access as a shortcut;
- import or mutate production data.

## Roles and authorization

| Role | Allowed | Denied |
| --- | --- | --- |
| Job Coordinator | Submit the synthetic handoff in the isolated test; list and inspect Jobs and their Work Orders within explicit object scope | Native administration, direct entity tools, CRM qualification/stage changes, production status transitions, finance, inventory, document bytes and out-of-scope Jobs |
| CRM-only Coordinator | Existing CRM Slice 1 Customer, Contact and Property capability | Handoff acceptance and Job/Work Order workspace unless separately assigned the Job Coordinator permission bundle |
| Crew / reviewer / finance | No new permission from this slice | Handoff acceptance and Jobs outside existing explicit grants |
| Handoff executor | Disabled, noninteractive execution principal with only the minimum native posting permissions required by the owned service | Login, browser access, role choice, source-scope choice and independent business decisions |
| Administrator/bootstrap | Configuration and recovery only | Administrator use cannot substitute for the non-admin acceptance test |

One person may later hold both CRM-only Coordinator and Job Coordinator bundles, but this contract does not silently add the latter to an existing account. The client cannot select its execution identity, permissions, source instance or authorization roles.

## Synthetic and live-data posture

All business writes and acceptance fixtures are synthetic and run first on a private, isolated Apache OFBiz 24.09.07 same-version copy. Use fictional names, `example.invalid` communication values and a synthetic document identity/hash. No outbound communication may occur.

After all private acceptance tests pass, the owned application and replay-safe configuration may be deployed through the existing controlled LAN procedure. The LAN deployment must remain empty of Job/Work Order business data. External canonical-host validation is limited to authentication, authorized empty-state navigation, role denial and logout. Creating a real or synthetic Job on the LAN runtime requires a later explicit authorization.

## Positive acceptance tests

1. **Isolation and preflight:** Record repository HEAD, source manifest, image IDs, mounts, ports, container health and rollback location. The private test uses no production data, production network dependency or working LAN database.
2. **Complete handoff:** One valid Roof-plus-Siding synthetic BR-038 payload creates exactly one native Job, one Roof child and one Siding child, all linked to the expected Property. It records the native Opportunity-to-Job relationship, Customer/Contact context, exact contract metadata reference, source mapping, initiating human, execution principal, conversion time and one immutable success receipt.
3. **Atomic immediate control:** The existing approved signed-contract check/task behavior occurs exactly once in the same committed transaction or the whole handoff fails. No delayed automation or production scheduler activation is added.
4. **Coordinator workspace:** A non-admin Job Coordinator can search/list the created Job and open its detail at desktop and 390-pixel mobile width. The detail shows immutable Job ID, human business reference when supplied, Customer, primary Contact, Property/service address, originating Opportunity reference, contract document/version/hash metadata, handoff actor/time and the two child Work Orders. It exposes no credential, unrestricted raw payload, hidden cross-Job data or financial detail.
5. **Replay:** Three sequential identical submissions and two concurrent identical submissions return the same receipt and native IDs. Counts remain one Job, one Roof Work Order, one Siding Work Order, one immediate control and one accepted event.
6. **Rollback:** An injected failure after Job creation but before child/receipt completion leaves no partial Job, Work Order, link, task, event or receipt. A clean retry succeeds once.
7. **Restart and bootstrap:** Application and database restart preserve the accepted graph, receipt, relationships and authorization. Replaying configuration and the identical handoff adds no row, grant, task or event.
8. **LAN productization:** After the private pass, controlled application/configuration deployment retains PostgreSQL state, preserves CRM Slice 1 behavior, leaves Job/Work Order business counts at zero, and passes external Job Coordinator empty-state navigation, privileged-route denial and logout.

## Negative and denial tests

The following must fail with no business effect and without disclosing whether an out-of-scope object exists:

1. missing, unexecuted, unverifiable or hash-mismatched contract evidence;
2. missing required BR-038 identity, Property, service, actor or conversion fields;
3. altered content under a previously accepted idempotency key;
4. duplicate source key mapped to a different native object, wrong source instance or spoofed source scope;
5. unknown, wrong-type or unauthorized Property, Opportunity, Customer, Contact, Job or Work Order;
6. CRM-only Coordinator, crew, reviewer, finance user, disabled executor or unauthenticated caller attempting handoff acceptance;
7. Job Coordinator attempting direct native entity tools, administration, finance, inventory, document-byte access or a Job outside explicit scope;
8. guessed Job or Work Order IDs in list, detail, service or export routes;
9. any attempt to change a Job or Work Order status, create additional trade children, invoke delayed automation or write back to Command;
10. session reuse after logout.

## Replay and idempotency contract

The business identity is source-instance qualified. Preserve at least `(sourceSystemId, sourceInstanceId, sourceRecordTypeId, sourceRecordId)` together with a request/correlation ID and canonical payload hash. An identical key and payload returns the original receipt and exact target IDs. The same key with different content is an idempotency conflict and writes nothing. Different source instances cannot collide. A retry after a rolled-back failure may succeed; a failed transaction must leave no success receipt.

## Rollback requirements

Before private execution and before LAN deployment, record a recoverable database/configuration checkpoint and the current application image ID. Application rollback must be possible by restoring the prior owned image and configuration. Any schema addition must be additive, owned, source-controlled and reversible without modifying Apache definitions. Do not delete current CRM Slice 1 data or configuration to roll back this slice. If rollback cannot preserve the prior CRM Slice 1 state and empty live Job posture, stop before deployment.

## Evidence requirements

Retain timestamped, non-secret evidence in `mwg-ofbiz/docs/evidence/enterprise-operations-slice-1/`:

- repository and source manifest with hashes;
- preflight and isolation record;
- normalized object/link/count assertions;
- positive, denial, replay, concurrency, rollback and restart receipts;
- role/permission matrix and effective-principal evidence;
- desktop and 390-pixel coordinator screenshots;
- pre/post LAN health, image, mount and business-count comparison;
- rollback archive path and restore procedure;
- final execution record stating every acceptance item PASS, FAIL, BLOCKED or NOT RUN.

Never store passwords, session cookies, private keys, API credentials, full protected configuration or real customer data in Git evidence.

## Targeted prior regressions

Rerun only the dependencies touched by the implementation:

- A02 handoff identity, exact-once receipt and concurrent replay;
- A03 transaction rollback;
- A07 least-privilege and object-scope denial;
- A09 immediate signed-contract task exactness, excluding delayed scheduler activation;
- A10 contract document/version/hash reference without byte duplication;
- A12 restart persistence for the affected graph;
- A14 relationship reconstruction for the affected objects;
- A16 source-instance identity, native Opportunity/Property/Job links, address-history stability and scoped resolution;
- CRM V1 Slice 1 authentication, logout, replay-safe configuration, Customer/Contact/Property access and privileged-route denial.

Do not rerun A01–A16 wholesale. A15 remains independently BLOCKED until a newer eligible Apache 24.09 patch release and approved target exist.

## Stop conditions

Stop before further mutation if implementation requires any of the following:

- a production Job/Work Order status or downstream lifecycle decision;
- live EspoCRM, website, Queue/D1, net2phone or Document Services access;
- real customer or production business data;
- Apache upstream modification or native field-width change;
- a second authoritative CRM, Opportunity, Job, Work Order or document identity;
- administrator-only acceptance, broad native permissions or client-selected authority;
- non-atomic Job graph creation, ambiguous source identity or non-deterministic replay;
- contract-byte duplication or document filing rather than metadata reference;
- a material schema, security, authority or product-boundary question not already resolved by the cited governance;
- failure of a targeted prior regression.

Return the new question to governance only when one of these conditions is real. Do not expand the slice to work around it.

## Git and evidence boundary

Implementation belongs only in `mwg-ofbiz` and its existing owned `midwest24-enterprise` component. Governing authority remains in `jryanrussow-site`; current business semantics remain in `mwg-ops-manual`. Do not modify either governing repository during implementation.

Keep implementation source, configuration, tests, non-secret evidence and the final execution record in the implementation repository. Keep runtime archives, databases, secrets and protected configuration outside Git at the recorded rollback location. Show the exact implementation diff and validation results before any implementation commit or push. Commit and push require separate explicit approval.

## Resume gate

Deploy Apache OFBiz may resume this single slice after this contract and the already-approved ACP-013 identity and Property addenda are committed in the governing repository. It must first re-resolve both repository states and perform a narrow pre-implementation audit for reusable A02, A16 and CRM V1 Slice 1 code. A15 remains BLOCKED and no A17, CRM Slice 2 or later Enterprise slice is authorized.

## Exact implementation-chat handoff

> Continue Midwest24 Core Enterprise in `/home/jesse/Documents/Projects/mwg-ofbiz` under governing repository `/home/jesse/Documents/Projects/jryanrussow-site`. Repository authority controls over this prompt. Re-resolve both repositories first and read the committed `ACP-013-ENTERPRISE-OPERATIONS-SLICE-1-CONTRACT.md` plus its cited governing records. Implement exactly **Enterprise Operations Slice 1 — Signed-Contract Job Intake and Job Workspace**. Reuse the proven A02 handoff, A16 identity graph and CRM V1 Slice 1 authentication/configuration; do not restart broad discovery or rerun already-passed gates beyond the targeted regressions in the contract. Use a private isolated OFBiz 24.09.07 copy for all synthetic business writes. Do not contact or modify production EspoCRM/Command, website intake, Queue/D1, net2phone, Document Services, real customer data, Apache upstream, A15 or A17. Preserve current CRM and sales authority in Command. Build the least-privilege Job Coordinator list/detail path and the bounded synthetic signed-contract intake exactly to the positive, denial, replay, rollback, restart, LAN empty-state and evidence requirements in the contract. Stop on any listed stop condition. After validation, show the exact implementation diff and results. Do not commit or push without explicit approval.
