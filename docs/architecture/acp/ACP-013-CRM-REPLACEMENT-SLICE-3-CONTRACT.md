# ACP-013 Implementation Contract — CRM Replacement Slice 3

Version: 1.2.0

Status: Approved

Type: Implementation contract addendum

Authority: Systems Architect Discipline

Approved: 2026-09-18

Amended: 2026-09-18 — Added the explicit canonical Opportunity AI SecurityGroup mapping required by Apache OFBiz native group-ID storage.

Amended: 2026-09-20 — Added one private canonical-chain fixture that reuses
accepted Slice 1 and Slice 2 mappings for a later Voice prerequisite. The
accepted `OPEN` fixture and its closure evidence remain unchanged.

Scope: A private, de-identified Opportunity migration and lifecycle rehearsal from the current EspoCRM model into Midwest24 Core Enterprise. This is not a production migration, authority cutover, Lead conversion, Job creation, or live-routing change.

## Decision

The next Enterprise implementation objective is **CRM Replacement Slice 3 — Opportunity Migration and Lifecycle Rehearsal**.

The slice proves that source-instance-qualified EspoCRM Opportunity evidence can be mapped deterministically to native `SalesOpportunity` while preserving distinct Opportunity, Lead, Customer, Contact and Property identities; stage/history evidence; dated relationships; authorization; and independent reconstruction.

EspoCRM/Core Command remains the current live authority for Opportunities, qualification and sales. Passing this contract does not freeze EspoCRM writes, transfer Opportunity authority, create a production Lead conversion, create a Job or Work Order, change Command, or approve a cutover.

## Why this objective is next

The approved migration program orders Customer/Contact/Property rehearsal, Lead migration, then Opportunity migration before activities/follow-up and communications. CRM Replacement Slices 1 and 2 have closed PASS, making their source-instance mapping, Party/Person/Facility targets, `M24Lead`, Lead lifecycle, authorization, replay, rollback, restart and reconstruction controls available without repeating discovery.

Opportunity is the next unresolved CRM record family and joins the proven Lead graph to native sales identity. Activities, follow-up and communications remain deferred because they depend on stable Opportunity ownership and lifecycle. Enterprise Operations is already governed and proven as synthetic downstream capability; it is not a prerequisite for this private CRM rehearsal. A15 remains independently BLOCKED and A17 remains NOT STARTED.

## Governing authority

- [ACP-013 CRM/ERP Authority Transition](ACP-013-MIDWEST24-CRM-ERP-AUTHORITY-TRANSITION.md) establishes Enterprise as the target durable CRM/ERP authority and requires a separate record-family cutover.
- [ACP-013 EspoCRM Replacement Migration Program](ACP-013-ESPOCRM-REPLACEMENT-MIGRATION-PROGRAM.md) places Opportunity migration after Lead and requires stage/history, Customer/Contact/Property, permission, Job-conversion and reconstruction reconciliation before a later cutover.
- [ACP-013 CRM Identity Model Addendum](ACP-013-CRM-IDENTITY-MODEL-ADDENDUM.md) governs native `SalesOpportunity`, `SalesOpportunityHistory`, `SalesOpportunityRole`, `SalesOpportunityWorkEffort`, `M24LeadOpportunityLink`, `M24OpportunityPartyLink`, source identity and the BR-038 conversion boundary.
- [ACP-013 Property Identity Decision](ACP-013-FACILITY-PROPERTY-MODEL-DECISION.md) governs `M24SalesOpportunityFacility` and Property identity.
- [ACP-007](ACP-007-MIDWESTGUARD-OWNED-APPLICATION-PLATFORM.md) and the migration program govern AI Worker compatibility as non-authoritative, least-privilege machine-readable access.

No new ACP or OCP is required. This contract applies the approved sequence and sets the bounded Opportunity stage mapping required for a private rehearsal.

## Read-only source-model inventory

Implementation must freeze a source-schema manifest before fixture construction. It may inspect only the checked-in EspoCRM customization repository and must not call its production API/database or access live records.

| Source concern | Observed representation | Rehearsal treatment |
| --- | --- | --- |
| Opportunity identity | EspoCRM `Opportunity` opaque `id` | Map to generated native `SalesOpportunity.salesOpportunityId`; retain the source ID only in `M24CrmRecordLink`. |
| Active lifecycle | Audited `cOpportunityStatus`, designated as EspoCRM's status field | Freeze values and map only explicit fixture values. Unknown or ambiguous values become `REVIEW_REQUIRED`. |
| Legacy grouping | Audited, read-only `cOpportunityStage`, labelled “Legacy Grouping (Inactive)” | Preserve only as source evidence when present. It must not select an Enterprise stage. |
| Relationships | Source Account, Contact, RealEstateProperty and Lead references where demonstrated by metadata | Resolve only through accepted Slice 1/Slice 2 mappings or a private reconstructed equivalent. Descriptive fields never identify a target. |
| History | Audited source fields and source-instance-dependent audit/stream evidence | Import demonstrated ordered events. Where only current state is available, create one attributable imported baseline and mark history incomplete. Never invent intermediate transitions. |
| Conversion and downstream work | Source conversion layouts and workflow evidence | Preserve source conversion evidence only. BR-038, accepted-contract processing, Job creation and `SalesOpportunityWorkEffort` writes are excluded. |

The manifest must record the EspoCRM version/build evidence, relevant metadata hashes, active-status field, legacy-stage finding, relationship fields, available-history statement, source-instance alias and its own SHA-256.

## System-of-record boundary

| Object or capability | Current live authority | Target representation in rehearsal | Authority after this slice |
| --- | --- | --- | --- |
| Opportunity identity, lifecycle and assignment | EspoCRM / Core Command | Native `SalesOpportunity`, native history and governed dated links | Unchanged: EspoCRM remains live authority. |
| Lead relationship | EspoCRM / Core Command | Existing `M24Lead` through dated `M24LeadOpportunityLink` | Unchanged. |
| Customer and Contact relationships | EspoCRM / Core Command | Existing Party targets through native current-role projection and dated `M24OpportunityPartyLink` | Unchanged. |
| Property relationship | EspoCRM / Core Command | Existing `Facility(M24_PROPERTY)` through dated `M24SalesOpportunityFacility` | Unchanged. |
| Source mapping, receipts and exceptions | N/A | Owned replay-safe rehearsal evidence | Enterprise rehearsal evidence only. |
| Job conversion and Work Orders | Current governed systems | Deferred; no target object may be created | Unchanged. |
| AI Worker state | No business authority | Disposable derived compute reading a bounded Enterprise interface | Never authoritative. |

## Native and owned model

`SalesOpportunity.salesOpportunityId` is the immutable canonical Opportunity identity. Native `SalesOpportunityHistory` records imported target-stage and field-history snapshots. Native `SalesOpportunityRole` is the validated current Party-role projection. Native `SalesOpportunityWorkEffort` remains unused by this slice.

Midwest24-owned entities supply the four-part source mapping and payload hash, replay receipt/exception, effective-dated `M24LeadOpportunityLink`, effective-dated `M24OpportunityPartyLink`, and effective-dated `M24SalesOpportunityFacility`. The component retains imported source status, mapping version, history-completeness finding, initiating human and effective executor in attributable rehearsal evidence. No owned duplicate Opportunity identity is permitted.

## Target lifecycle and mapping version 1

The implementation must retain mapping `CRM-REPLACEMENT-S3-OPPORTUNITY-MAP-1.0.0` and record its SHA-256 in each execution record. A semantic mapping revision requires a new version, manifest and rehearsal.

The canonical private-rehearsal stage vocabulary is:

| Target stage | Meaning | Permitted source status treatment |
| --- | --- | --- |
| `M24_OPP_OPEN` | An active pre-conversion sales opportunity | Explicit mapped active source status only. |
| `M24_OPP_WON` | A source status explicitly mapped as a won sales outcome | Preserve raw source status and conversion evidence; do not create a Job or mark a Lead converted. |
| `M24_OPP_LOST` | A source status explicitly mapped as a lost outcome | Require the mapped controlled loss reason in rehearsal evidence. |

These are Enterprise migration categories, not a production sales-process taxonomy. The frozen mapping must name every exercised `cOpportunityStatus` value and map it to exactly one target stage or `REVIEW_REQUIRED`; it must not infer semantics from inactive `cOpportunityStage` or OFBiz demo stages. Unknown values, contradictory source fields, invalid transitions, unsupported loss reasons, missing relationship targets or unproven conversion claims create an attributable exception and no target mutation.

Each source identity is `(sourceSystemId, sourceInstanceId, sourceRecordTypeId, sourceRecordId)`. For this rehearsal `sourceSystemId=ESPOCRM`, `sourceRecordTypeId=OPPORTUNITY`, and `sourceInstanceId` is the stable non-secret manifest-bound alias. Source IDs are provenance and idempotency inputs, never Enterprise identifiers.

## Relationship and lifecycle rules

- An accepted Opportunity maps to exactly one native `SalesOpportunity`; its native ID is generated independently of every source value.
- A reconciled Lead may relate through `M24LeadOpportunityLink`; the link is optional, dated and audited. At most one originating Lead is current for an Opportunity. A Lead and Opportunity remain distinct identities.
- Current Customer/Contact roles are projected to `SalesOpportunityRole` only after dated `M24OpportunityPartyLink` records and Party roles validate. Reassignment closes, rather than rewrites, the prior dated relation.
- Property links use `M24SalesOpportunityFacility`; address text cannot match, allocate or authorize a Property.
- The importer creates native `SalesOpportunityHistory` in demonstrated source order. A current-only extract produces one attributable imported baseline and explicit incomplete-history finding.
- A native `SalesOpportunityWorkEffort` link, `M24LeadConversion` write, Job, Work Order, contract reference or accepted-scope record is prohibited.

## De-identified representative fixture

Use only private de-identified fixtures and existing accepted/reconstructed Slice 1 and Slice 2 targets. The fixture set must include: an open Opportunity; a won source outcome with conversion evidence preserved but no conversion write; a lost Opportunity with controlled reason; a current-only-history case; the same source record ID in a second source instance; an exact replay; an altered payload; a duplicate descriptive candidate; an ambiguous relationship candidate; and an unsupported/unknown source status. No fixture may contain production data, channel credentials, document bytes, activities, communications, Jobs, Work Orders, accounting or inventory records.

### Canonical-chain fixture interoperability

This is a **private-fixture interoperability limitation**, not a defect in the
closed Slice 3 `OPEN` acceptance. `OPEN` retains its accepted private target
bundle and evidence. The additive fixture `CANONICAL_CHAIN` is the only Slice 3
fixture authorized to resolve its relationships through the preceding accepted
canonical mappings. It does not alter production/candidate semantics, mapping
version, native Opportunity identity or any accepted `OPEN`, `WON` or `LOST`
behavior.

The frozen source tuples are:

| Relationship | Required source tuple |
| --- | --- |
| Customer | `(ESPOCRM, ESPOCRM_REHEARSAL_A, ACCOUNT, 5f0000000000000000000001)` |
| Contact | `(ESPOCRM, ESPOCRM_REHEARSAL_A, CONTACT, 5f0000000000000000000002)` |
| Property | `(ESPOCRM, ESPOCRM_REHEARSAL_A, REAL_ESTATE_PROPERTY, 5f0000000000000000000004)` |
| Lead | `(ESPOCRM, ESPOCRM_LEAD_REHEARSAL_A, LEAD, 65aa00000000000000000001)` |
| `CANONICAL_CHAIN` Opportunity | `(ESPOCRM, ESPOCRM_OPPORTUNITY_REHEARSAL_A, OPPORTUNITY, 66bb00000000000000000118)` |

For each supplied relationship tuple, the Slice 3 importer must read the
four-part tuple from the frozen fixture, resolve exactly one
`M24CrmRecordLink` in state `M24_LINK_MATCHED`, require the corresponding
canonical target field and target entity, then write the governed dated
relationship to that target. Customer resolves `linkedPartyId`, Contact
`linkedContactPartyId`, Property `linkedFacilityId`, and Lead `linkedLeadId`.
The Opportunity itself remains one generated native `SalesOpportunity` with
its own four-part source mapping.

Missing mappings, a missing target, a non-matched mapping, contradictory
mapping evidence or more than one eligible target are governed unmatched or
integrity failures and write no replacement Party, Facility, Lead, Opportunity,
relationship, receipt or fallback mapping. Supplied canonical references never
permit private target provisioning or descriptive matching. Exact replay returns
the same Opportunity and relationships; an altered payload conflicts. The new
fixture must be restart-safe and preserve source-instance-qualified
reconstruction.

Targeted acceptance for this amendment is limited to Customer, Contact,
Property and Lead canonical reuse; one native Opportunity; exact and concurrent
replay; altered replay conflict; unmatched and ambiguous resolution; restart;
and proof that existing `OPEN`, `WON` and `LOST` behavior is unchanged. It does
not reopen general Slice 3 acceptance or authorize any production action.

## Authorization and allowed data flow

The only permitted flow is:

`de-identified Opportunity fixture + frozen map -> authenticated owned rehearsal command -> native SalesOpportunity/history/current roles + owned dated links/provenance/receipt/exception -> authorized views -> independent export/reconstruction`

The command must enforce source-instance scope, mapping/manifest hashes, target-type existence, relationship scope, stage transition, object/action authorization and actor/executor attribution before every mutation. A human coordinator may access only object-scoped Opportunities. A noninteractive executor may perform only the governed internal command. Authentication, source credential, knowledge of an ID or a relationship row never grants broad access.

## AI Worker and machine-readable compatibility contract

This slice defines `M24-ENTERPRISE-OPPORTUNITY-READ-1.0.0`, a documented, versioned, read-only JSON contract. It exposes only authorized Opportunity identity, target stage/history ordering, dated Lead/Party/Property relationship roles, four-part provenance, mapping/history-completeness state and integrity metadata.

The interface must use a disabled/noninteractive `M24P_OPPORTUNITY_AI` identity, private bearer authentication, canonical group `M24P_OPPORTUNITY_AI_G`, canonical capability `M24_OPPORTUNITY_AI_READ`, per-Opportunity `MACHINE_READ` scope, deterministic canonical-ID ordering, bounded pagination, signed opaque continuation, resumable traversal and no generic export. It must not scrape HTML, expose raw Entity Engine/JDBC access, use administrator credentials, grant mutation, reveal unauthorized existence, or place truth in prompts, embeddings, caches or model memory. Enterprise operation must continue when the Worker or model is unavailable.

### Native permission representation

`M24_OPPORTUNITY_AI_READ` is the governing semantic capability identifier. Apache OFBiz 24.09.07 persists `SecurityPermission.permissionId` as a maximum 20-character native identifier; therefore this slice maps the canonical capability exactly once to native permission `M24_OPP_AI_READ` (15 characters).

| Canonical capability | Native entity and field | Native persisted identifier | Enforcement and evidence |
| --- | --- | --- | --- |
| `M24_OPPORTUNITY_AI_READ` | `SecurityPermission.permissionId` | `M24_OPP_AI_READ` | The AI Worker group receives only this native permission. Runtime authorization checks this native ID after bearer authentication, then separately checks effective `MACHINE_READ` scope. Machine, bootstrap and reconstruction evidence records both IDs together. |

The native identifier is an implementation representation, never a second capability or a replacement semantic name. It is deterministic, stable across replay/restart/reconstruction, collision-free within the governed permission set, and confers no write, administrative, generic-service, raw-database or broad-export authority.

### Native SecurityGroup representation

`M24P_OPPORTUNITY_AI_G` is the governing canonical SecurityGroup identity.
Apache OFBiz 24.09.07 defines `SecurityGroup.groupId` as type `id`, and the
pinned PostgreSQL field-type definition maps `id` to `VARCHAR(20)`. The
canonical group is 21 characters and cannot be persisted there. It maps exactly
once to native group `M24P_OPP_AI_G` (13 characters).

| Canonical group | Native entity and field | Native persisted identifier | Enforcement and evidence |
| --- | --- | --- | --- |
| `M24P_OPPORTUNITY_AI_G` | `SecurityGroup.groupId` | `M24P_OPP_AI_G` | Native membership and group-permission rows use this ID only. Bootstrap, machine output, parity and reconstruction evidence record the canonical/native pair with the capability/native-permission pair. |

`M24P_OPP_AI_G` is deterministic, unused in the governed Midwest24 group set
and follows the existing `M24P_LEAD_AI_G` naming pattern. It is an OFBiz
enforcement representation only; it does not replace the canonical group in
architecture, contracts, capability/security documentation, machine-interface
documentation, acceptance evidence or reconstruction evidence.

The authorization chain remains exactly:

`bearer authentication -> canonical machine identity -> canonical group M24P_OPPORTUNITY_AI_G -> native group M24P_OPP_AI_G -> canonical capability M24_OPPORTUNITY_AI_READ -> native permission M24_OPP_AI_READ -> effective per-Opportunity MACHINE_READ -> read-only Opportunity graph`

Bootstrap and reconstruction must reject missing mapping, a wrong native group,
an ambiguous mapping or any canonical/native collision. This mapping grants no
write, lifecycle, ownership, Lead, generic-service, native-administration,
raw-database or broad-export authority.

## Positive acceptance contract

The private checkpoint passes only when it proves:

1. source manifest and mapping hashes are frozen and verified;
2. each admitted fixture creates one native `SalesOpportunity` with the approved mapped stage and ordered native history;
3. accepted Lead, Customer, Contact and Property relationships use the approved dated/native models and retain source-instance-qualified provenance;
4. exact sequential replay returns the original Opportunity and receipt without duplicate effect;
5. concurrent identical replay produces one Opportunity and one accepted receipt;
6. the same source record ID in a separate source instance is independently represented and does not collide;
7. restart/recreation retains mappings, history, relationships and replay behavior;
8. normalized export independently reconstructs the graph and semantic tamper detection fails after a deliberate stage, relationship, provenance or history alteration;
9. authorized human detail/list views render the allowed scope; and
10. the machine bootstrap, output and independent reconstruction retain both canonical/native permission and canonical/native group pairs, reject incorrect or ambiguous mappings, and prove that the native group has only the mapped read permission; and
11. the machine interface performs ordered page traversal, continuation/resume, relationship traversal and a Worker-unavailability proof without mutation.

## Negative, rollback and integrity acceptance

The checkpoint must deny and leave no effect for unauthenticated, disabled, wrong-role, noninteractive-browser, cross-scope, direct-route, guessed-ID, source-instance-spoofing, wrong-record-type, invalid mapping/hash, missing/wrong/ambiguous/colliding native identifier mapping, unknown-status, invalid-transition, unsupported-loss-reason, missing-target, duplicate-descriptive, ambiguous-relation, altered-payload and unscoped-AI-read attempts. Injected failure after partial graph construction must atomically roll back native and owned rows. A retained rollback archive must restore the private pre-run state and no private business fixture may reach LAN.

## Targeted regressions

Run only the affected controls:

- CRM Replacement Slice 1 source mappings, Party/Person/Facility and address-history reconstruction;
- CRM Replacement Slice 2 `M24Lead`, source-instance provenance, lifecycle, machine-read denial and replay behavior;
- A16 native Opportunity, dated relationship and provenance rules;
- Enterprise Operations Slice 1/2 only for read-only regression of the existing native Opportunity-to-Job relationship model; do not create operational fixtures.

## Evidence and Git boundary

Retain non-secret evidence under `mwg-ofbiz/docs/evidence/crm-replacement-slice-3/`: manifest and mapping hashes; de-identification and isolation/rollback records; normalized Opportunity/history/relationship/provenance reconciliation; replay, concurrency, exception, denial, rollback, restart and tamper results; authorized rendering; machine traversal and Worker-unavailability evidence; reconstruction package; and an explicit non-cutover readiness finding. Do not record credentials, cookies, tokens, private business data or hashes of secrets.

Implementation is confined to the owned OFBiz component plus private test/harness/evidence paths. Apache upstream, EspoCRM, Command, live intake, production data, secrets, model deployment, embeddings and runtime artifacts are outside the implementation commit. Show the exact diff and validation before any commit or push.

## Deferred scope

This slice defers production Opportunity or Lead cutover; BR-038 conversion; Jobs and Work Orders; activities, follow-up, reminders and scheduling; communications; documents; estimates and accepted scope; reporting beyond reconciliation; production EspoCRM import/API use; AI recommendations, embeddings, autonomous action or model deployment; A15; A17; accounting; procurement; inventory; warranty; and all unrelated work.

## Stop conditions

Stop and return to governance if an active source status cannot map without a production taxonomy decision; a new canonical Opportunity identity is needed; history would be invented or flattened; a relationship requires descriptive matching; a Job/conversion/activity/document/communication scope is needed; machine access needs raw database, administrator, HTML-scraping or write access; Apache upstream or non-additive incompatible schema change is required; any replay, concurrency, rollback, authorization, restart, reconstruction, tamper or machine-traversal control fails; or a LAN/prod action would be needed.

## Resume gate and implementation handoff

Deploy Apache OFBiz may implement only this private rehearsal after this contract and migration-program amendment are committed. Re-resolve both repositories, verify governing hashes, inspect current `M24Lead`, native `SalesOpportunity` and existing owned relationship extensions, and reuse passed evidence rather than restart discovery.

> Continue Midwest24 Core Enterprise in `/home/jesse/Documents/Projects/mwg-ofbiz` under governing repository `/home/jesse/Documents/Projects/jryanrussow-site`. Read committed `ACP-013-CRM-REPLACEMENT-SLICE-3-CONTRACT.md`, `ACP-013-ESPOCRM-REPLACEMENT-MIGRATION-PROGRAM.md` and cited ACP-013 authority. Implement only **CRM Replacement Slice 3 — Opportunity Migration and Lifecycle Rehearsal** in a private isolated OFBiz 24.09.07 copy. Freeze the read-only EspoCRM Opportunity manifest; use mapping `CRM-REPLACEMENT-S3-OPPORTUNITY-MAP-1.0.0`; reuse Slice 1, Slice 2 and A16 controls; and implement native `SalesOpportunity` with approved native/owned links and machine contract `M24-ENTERPRISE-OPPORTUNITY-READ-1.0.0`. Prove every stated positive, denial, replay, concurrency, rollback, restart, reconstruction, tamper, human usability, machine traversal and Worker-unavailability requirement. Use only de-identified fixtures. Do not access production EspoCRM data/APIs, change Command or live intake, perform a cutover, create conversion/Jobs/Work Orders/activities/communications/documents, grant AI writes, modify Apache upstream, start A15/A17, or commit/push before presenting the exact diff and validation.
