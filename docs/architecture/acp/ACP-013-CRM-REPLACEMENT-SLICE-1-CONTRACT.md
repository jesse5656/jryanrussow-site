# ACP-013 Implementation Contract — CRM Replacement Slice 1

Version: 1.0.0

Status: Approved

Type: Implementation contract addendum

Authority: Systems Architect Discipline

Approved: 2026-09-15

Scope: A private, de-identified Customer, Contact and Property migration rehearsal from the current EspoCRM model into Midwest24 Core Enterprise. This is not a production migration, record-family cutover, or authority transfer.

## Decision

The next CRM replacement implementation objective is **CRM Replacement Slice 1 — Customer, Contact and Property Migration Rehearsal**.

The slice proves that a versioned, source-instance-qualified, deterministic import can reproduce a representative Customer, Contact and Property graph in the approved Enterprise identities while preserving relationship cardinality, Property identity, address history, source provenance, authorization and independent reconstruction.

It is a rehearsal only. EspoCRM remains the live authority for these CRM capabilities until a later, separately approved cutover gate passes. Successful rehearsal must not freeze EspoCRM writes, redirect users, change Core Command behavior, make EspoCRM read-only, or transfer any authority.

## Governing authority

- [ACP-013 — Midwest24 CRM/ERP Authority Transition](ACP-013-MIDWEST24-CRM-ERP-AUTHORITY-TRANSITION.md) establishes Enterprise as the strategic durable CRM/ERP target while preserving capability-by-capability transition.
- [ACP-013 — EspoCRM Replacement and CRM Authority Migration Program](ACP-013-ESPOCRM-REPLACEMENT-MIGRATION-PROGRAM.md) selects Customer, Contact and Property rehearsal as phase three and requires a versioned mapping, de-identified data, deterministic replay, reconciliation, rollback and explicit later cutover approval.
- [ACP-013 CRM Identity Model Addendum](ACP-013-CRM-IDENTITY-MODEL-ADDENDUM.md) governs PartyGroup, Person, source-instance-qualified mappings and relationship history.
- [ACP-013 Property Identity Decision](ACP-013-FACILITY-PROPERTY-MODEL-DECISION.md) governs `Facility(facilityTypeId=M24_PROPERTY)` and dated Party/address relationships. `M24_PROP_OCCUPANT` is the approved Property occupant role ID.
- [OCP-012 — MidwestGuard Communications Architecture](../ocp/OCP-012-MIDWESTGUARD-COMMUNICATIONS-ARCHITECTURE.md) keeps channel transports and the Core Command workspace outside this rehearsal.
- Completed A16 and CRM V1 Slice 1 evidence in `mwg-ofbiz` establish the admitted target identities, relationship patterns, authorization and reconstruction controls that this slice reuses. They do not authorize an authority transfer.

No new ACP or OCP is required. This contract implements the approved migration program without changing its system-of-record boundaries.

## Read-only source-model inventory

The contract is grounded in the current EspoCRM customization repository's metadata, inspected read-only before implementation:

| Source family | Observed source representation | Rehearsal treatment |
| --- | --- | --- |
| Customer | EspoCRM `Account`, with the platform-native opaque `id`; the Midwest24 operations extension adds a `mwgJobs` relationship. | Map one approved source Account to one Enterprise `PartyGroup` and retain the source ID only through `M24CrmRecordLink`. Account name is descriptive, never a target key. |
| Contact | EspoCRM `Contact`, with its native opaque `id`, Account relationship and audited Midwest24 custom fields. | Map to Enterprise `Person` with the `CONTACT` role; reproduce approved Customer relationship(s) explicitly. Contact communication values are attributes, not canonical IDs. |
| Property | EspoCRM RealEstate `RealEstateProperty`, with native opaque ID, `account`, `contacts`, `teams`, `address`, `createdAt`, `modifiedAt`, `createdBy` and `modifiedBy` fields/links. | Map to Enterprise `Facility(facilityTypeId=M24_PROPERTY)`. The source Property ID is provenance only. The source address maps to dated address association(s), never to `facilityId`. |
| Source access | EspoCRM uses teams, roles and entity permissions; the checked-in access-control policy contains team-scoped and management-stream patterns. | Capture source team/role scope in the source manifest for reconciliation. Do not mechanically copy EspoCRM teams or roles into Enterprise grants. Enterprise object/action authorization remains governed by its own least-privilege model. |
| Source history | The Property model exposes created/modified actor/time fields and selected current custom Contact fields are audited. Availability and completeness of event/stream history is source-instance dependent. | Inventory the extract's available history fields and distinguish them from source timestamps. Do not invent absent history or represent current fields as immutable chronology. |

The implementation must freeze a non-secret **source-schema manifest** before fixture construction: EspoCRM version/build identifier, relevant entity names, field/link definitions, permission-model summary, source-instance alias, and SHA-256 hashes of the inspected metadata. The manifest is evidence, not a live source export.

## System-of-record boundary

| Object | Current live authority | Target representation in rehearsal | Authority after this slice |
| --- | --- | --- | --- |
| Customer | EspoCRM / Core Command | Native OFBiz `PartyGroup` / `Party` | Unchanged: EspoCRM remains live authority. |
| Contact | EspoCRM / Core Command | Native OFBiz `Person` / `Party` | Unchanged. |
| Property | EspoCRM / Core Command | Native OFBiz `Facility(M24_PROPERTY)` | Unchanged. |
| Source mapping and rehearsal receipt | N/A | Owned `M24CrmRecordLink` and attributable, immutable rehearsal records | Enterprise evidence only; no production authority. |
| Lead, Opportunity, activities, communications, documents, Job and Work Order | Their current governed systems | Out of scope | Unchanged; do not migrate or create them. |

The slice must not create a second EspoCRM authority, nor claim that an Enterprise rehearsal row is a live Customer, Contact or Property cutover. Source identifiers never become Party, Person or Facility primary keys.

## Mapping specification, version 1

The implementation must retain a versioned mapping artifact with identifier `CRM-REPLACEMENT-S1-MAP-1.0.0` and a SHA-256 recorded in every execution record. A mapping revision requires a new version, new manifest and new rehearsal; edits must not silently reinterpret an earlier import.

Each provenance record uses the approved four-part external identity:

`(sourceSystemId, sourceInstanceId, sourceRecordTypeId, sourceRecordId)`

For this rehearsal, `sourceSystemId=ESPOCRM`; `sourceInstanceId` is a stable, non-secret alias bound to the source-schema manifest and cannot be inferred from a hostname; source record types are `ACCOUNT`, `CONTACT` and `REAL_ESTATE_PROPERTY`. `sourceRecordId` is an opaque fixture value shaped like the source system's ID, not a production identifier.

| Source | Required target | Required provenance and relationships | Prohibited substitution |
| --- | --- | --- | --- |
| Account | One native `PartyGroup` with `CUSTOMER` role | `M24CrmRecordLink`; explicit native/owned Customer–Contact and Customer–Property relations as governed by the target model | Account ID or name as `partyId`; name-only matching; automatic merge. |
| Contact | One native `Person` with `CONTACT` role | `M24CrmRecordLink`; explicit relation to Customer and applicable Property context | Contact email, phone or source Account ID as `partyId`; inferred relationship from matching address. |
| RealEstateProperty | One native `Facility(M24_PROPERTY)` | `M24CrmRecordLink`; dated `FacilityParty` owner/occupant/contact links and dated `FacilityContactMech` address link | Street/address text, source Property ID, Account ID or Contact ID as `facilityId`. |
| Source address revision | A new effective-dated address association for the same Facility | Source revision/order evidence, from/thru dates or documented synthetic effective dates, actor/reason and link IDs | Mutating `facilityId`, silently overwriting the prior address, or creating a new Property solely because address text changed. |

A mapping may create target records only after source identity, expected type, canonical payload hash, mapping version and explicit relationship references validate together. The importer must return the original target identities for an identical replay. The same source identity with a different canonical payload is a conflict, not an update.

## De-identified representative fixture

All source-like payloads are purpose-built synthetic records. They use fictional person and organization names, `example.invalid` communication values, non-routable addresses, synthetic timestamps, fixture-only source IDs, and no copied production field values. The fixture is retained in source control with no secret or real customer data.

The private isolated fixture must contain the following cases:

1. **Canonical graph:** one Account, one primary Contact and one RealEstateProperty, with one owner/customer relation, one contact relation and two ordered address revisions. The second address revision must retain the Facility identity and close or supersede the first association according to the approved Property model.
2. **Cardinality graph:** a second Contact related to the same Customer and Property through an explicit scoped role, proving that relationship cardinality is represented rather than inferred.
3. **Duplicate candidate exception:** a source-like Account or Contact that deliberately matches a prospective target descriptive value but has no accepted source mapping. It must enter `REVIEW_REQUIRED` and create no target identity or relationship.
4. **Ambiguous Property exception:** a source-like Property with conflicting candidate associations or insufficient Property identity evidence. It must enter `UNMATCHED` or `REVIEW_REQUIRED`, create no Facility and retain an attributable exception record.
5. **Source-instance separation:** the same fixture `sourceRecordId` in a second `sourceInstanceId`; it must create or resolve only to that instance's separately scoped mapping and never collide with the first instance.

No fixture may contain Leads, Opportunities, activities, communications, documents, Jobs, Work Orders, accounting, inventory or production-facing credentials.

## Duplicate, conflict and exception policy

- Exact source identity plus identical payload hash is an inert replay that returns the existing receipt and target IDs.
- Exact source identity with a changed payload hash is rejected before target mutation and recorded as an attributable conflict.
- Descriptive candidate matching by name, email, phone, address or source-adjacent relationship is never sufficient to merge or file automatically. It must create a visible `REVIEW_REQUIRED` exception.
- Missing, type-inconsistent, conflicting or ambiguous Property source evidence is `UNMATCHED` or `REVIEW_REQUIRED`; it cannot create or re-identify a Facility.
- A resolved exception needs an explicit authorized decision, reason, source-evidence reference, timestamp and actor. The original exception remains immutable.
- The importer must not delete, merge, overwrite, default, silently skip or hide a record to make counts reconcile.

## Implementation, authorization and allowed data flow

All business writes run first in a private isolated OFBiz 24.09.07 copy. The only permitted flow is:

`de-identified fixture + versioned map -> authenticated owned rehearsal command -> native Party/Person/Facility and dated relationships -> owned provenance/receipt/exception records -> independent export/reconstruction`

The current EspoCRM repository and runtime are read-only sources of schema/behavior evidence. The slice must not read production CRM records, invoke the EspoCRM API, change EspoCRM data or routing, or contact Command, net2phone, website/chat, Document Services or external transports.

| Principal | Permitted | Denied |
| --- | --- | --- |
| Migration Rehearsal Coordinator | Submit the approved fixture; view only its scoped receipts, exceptions and reconstructed graph | Native administration, arbitrary source selection, raw entity tools, cross-scope records, live import, merge approval without an explicit governed action. |
| Migration Reviewer | Read scoped reconciliation/export evidence and decide documented fixture exceptions when separately authorized | Import execution, source modification, target mutation, arbitrary object access. |
| Limited execution principal | Noninteractive native/owned writes required by the owned command, preserving the initiating human | Browser login, client-selected source/target identity, generic privileged-service invocation. |
| CRM coordinator / crew / finance / unauthenticated caller | Existing permissions only | Rehearsal command, fixture source records, migration receipts/exceptions outside scope and native privileged routes. |
| Administrator/bootstrap | Configuration and recovery only | Substitute for non-admin rehearsal acceptance. |

The owned service must perform object/action authorization before invoking native operations and preserve initiating human, effective executor, mapping version, source identity, canonical payload hash, decision/reason and outcome. Hiding a link is not access control.

## Positive acceptance contract

1. **Source and isolation preflight:** record repository revisions, source-schema manifest/hash, mapping version/hash, container image/version, isolated database identity, mounts, health and rollback location. Prove the database is a private copy and fixture values are de-identified.
2. **Canonical import:** one approved canonical graph creates exactly one `PartyGroup`, two `Person` records where defined by the fixture, one `Facility(M24_PROPERTY)`, required roles, explicit Customer/Contact/Property relationships, two dated address associations, source mappings and one attributable receipt per accepted source record.
3. **Identity correctness:** native target IDs differ from all source IDs. The Property retains one `facilityId` through its address revision. Relationship links have the expected source-scoped records and effective dates.
4. **Sequential replay:** at least three identical submissions return the same receipt and target IDs without additional Party, Person, Facility, address, link, event or exception rows.
5. **Concurrent replay:** at least two concurrent identical submissions serialize to one accepted graph and one accepted receipt set; no duplicate native identities or relations survive.
6. **Exception handling:** duplicate-candidate and ambiguous-Property fixtures leave no target identities or relations, create visible attributable exception records, and do not affect accepted fixture counts.
7. **Reconstruction:** a normalized non-secret export independently reconstructs accepted source identities, target identities, relationship cardinality, address chronology, map/version/hash, receipts and unresolved exceptions. Recorded counts and sampled relations must reconcile.
8. **Restart and replay:** restart the isolated application/database; prove all accepted records, source mappings, dated address links, receipts, exceptions and authorization remain. An identical replay remains inert after restart.
9. **Authorization usability:** a non-admin authorized coordinator completes the approved fixture path and views its scoped result at normal desktop and approximately 390-pixel mobile width without horizontal overflow or unrelated CRM/ERP exposure.

## Negative, rollback and integrity acceptance

The following must fail without target business effect:

1. unauthenticated, disabled, wrong-role or noninteractive-executor browser access;
2. direct/native privileged route, guessed target ID, guessed receipt ID and cross-scope read/export access;
3. source record type mismatch, invalid mapping version, missing manifest/hash, raw source ID supplied as a target ID, or source instance spoofing;
4. altered payload under an accepted idempotency key;
5. address-only attempt to create, re-identify or merge a Property;
6. relationship referencing an unknown, unauthorized or wrong-type Customer, Contact or Property;
7. malformed effective-date sequence or address history that overlaps without an explicit governed correction;
8. injected failure after one native target object is created but before full graph/receipt completion.

For item 8, the transaction must roll back atomically: no Party, Person, Facility, relationship, address association, source mapping, receipt, exception or success event may remain. A clean retry after rollback may create the accepted graph once. Method or transport rejection alone does not count as authorization denial.

## Reconciliation, export and rollback

The reconciliation package must compare source-like fixture manifest to target export by source identity, record type, target identity, mapping version, payload hash, relationship cardinality, effective address chronology, exception status and actor/time. It must explicitly report accepted, replayed, `REVIEW_REQUIRED`, `UNMATCHED`, conflict and rolled-back counts.

Before private execution, create a recoverable isolated database/configuration checkpoint. The rollback procedure restores the private copy only and deletes no source evidence. Before any later LAN capability deployment, a separate rollback point is mandatory; this contract does not authorize fixture business writes to LAN.

No live record-family cutover follows a passing rehearsal. A later cutover proposal must satisfy the migration program's common cutover gate, including live-source inventory, count/field/permission usability reconciliation, explicit human approval, monitored write freeze, EspoCRM read-only retention and reversibility.

## Targeted regressions

Run only the dependencies affected by this slice:

- A07 object/action authorization, dual attribution and direct-route denial;
- A12 restart/recreation persistence for the affected owned component;
- A14 independent export/reconstruction and tamper detection principles;
- A16 source-instance-qualified mapping, Party/Person/Facility identity, dated address relationship and Property authorization behavior;
- CRM V1 Slice 1 Customer, Contact and Property scoped CRUD, address history, coordinator session/logout, configuration replay and privileged-route denial.

Reuse existing evidence for all other A01–A16 behavior. A15 remains independently BLOCKED. This slice neither starts nor changes A17.

## Evidence and Git boundary

Retain timestamped, non-secret evidence under `mwg-ofbiz/docs/evidence/crm-replacement-slice-1/`:

- source-schema manifest and source hashes;
- mapping artifact/version/hash;
- de-identification attestation and fixture IDs;
- preflight/isolation and rollback records;
- normalized target graph/counts and relationship/address reconciliation;
- sequential/concurrent replay, exception, conflict, denial, rollback and restart results;
- authorized desktop/mobile usability evidence;
- independent reconstruction/export package and tamper result;
- command log without credentials, cookies, tokens, hashes of secrets or real data;
- final execution record with PASS, FAIL, BLOCKED or NOT RUN for every acceptance item and a cutover-readiness finding explicitly marked **not a cutover approval**.

Implementation is confined to the Midwest24-owned OFBiz component and its controlled test/harness/evidence paths in `mwg-ofbiz`. Apache upstream source, EspoCRM, the governing repository during execution, production data, secrets and runtime backup artifacts remain outside the implementation commit. Show exact implementation diff and validations before any implementation commit or push.

## Stop conditions

Stop and return to governance before additional mutation if any of the following is true:

- a source family cannot be represented by the approved PartyGroup, Person or `Facility(M24_PROPERTY)` model without a new canonical identity;
- a live EspoCRM record, API, production export or production data is required for the rehearsal;
- a source identifier, address, name, email or phone would need to become a canonical Enterprise identity;
- duplicate resolution would require an ungoverned automatic merge or silent loss;
- source history cannot be characterized well enough to distinguish available evidence from absent history;
- native OFBiz upstream modification, non-additive schema change, broad administrator grant or generic privileged gateway is required;
- replay, concurrency, atomic rollback, source-instance separation, export/reconstruction or object-level authorization fails;
- a LAN deployment would need synthetic Customer, Contact or Property business records;
- Lead, Opportunity, activities, communications, documents, Job or Work Order scope is required to complete the slice;
- any condition would transfer authority, change Core Command routing, or make EspoCRM read-only.

## Resume gate and implementation handoff

After this Proposed contract is approved and committed, Deploy Apache OFBiz may implement only this private rehearsal. It must re-resolve the governing and implementation repositories, verify the mapping version and source-schema manifest, reuse A16 and CRM V1 Slice 1 controls, and stop on every condition above. It must not start Lead or Opportunity migration, perform a production import, or advance A15, A16 or A17.

> Continue Midwest24 Core Enterprise in `/home/jesse/Documents/Projects/mwg-ofbiz` under governing repository `/home/jesse/Documents/Projects/jryanrussow-site`. Read the committed `ACP-013-CRM-REPLACEMENT-SLICE-1-CONTRACT.md` and its cited ACP-013 records. Implement only **CRM Replacement Slice 1 — Customer, Contact and Property Migration Rehearsal**. Inspect the EspoCRM customization repository read-only to build the frozen source-schema manifest; use only the contract's de-identified fixture in a private isolated OFBiz 24.09.07 copy. Reuse completed A16 and CRM V1 Slice 1 identities, authorization, replay, address-history and reconstruction behavior. Prove the exact positive, denial, replay, concurrency, rollback, restart and reconstruction contract. Do not access live EspoCRM data or APIs, production records, Command routing, channel transports, Document Services, Apache upstream, Lead/Opportunity scope, A15, A16 or A17. Show exact implementation diff and validation before any commit or push.
