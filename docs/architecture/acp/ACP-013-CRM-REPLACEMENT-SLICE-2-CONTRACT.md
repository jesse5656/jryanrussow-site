# ACP-013 Implementation Contract — CRM Replacement Slice 2

Version: 1.0.0

Status: Approved

Type: Implementation contract addendum

Authority: Systems Architect Discipline

Approved: 2026-09-17

Scope: A private, de-identified Lead migration and lifecycle rehearsal from the current EspoCRM model into Midwest24 Core Enterprise, including a bounded machine-readable Lead surface compatible with the governed AI Worker Node boundary. This is not a production migration, record-family cutover, AI authority grant, or live intake-routing change.

## Decision

The next Enterprise implementation objective is **CRM Replacement Slice 2 — Lead Migration and Lifecycle Rehearsal**.

The slice proves that source-instance-qualified EspoCRM Lead evidence can be mapped deterministically into the approved owned `M24Lead` identity, canonical Lead lifecycle, immutable status history, effective-dated Customer/Contact/Property and owner relationships, source attribution, authorization, reconciliation and independent reconstruction.

The slice also proves that an authorized noninteractive consumer can traverse the resulting Lead graph through a stable, versioned, machine-readable interface without HTML scraping, raw database access or administrative credentials. This makes the Enterprise CRM foundation usable by the Midwest24 AI Worker Node and other governed integrations while keeping AI non-authoritative and optional to core operation.

This is a rehearsal only. EspoCRM remains the live Lead authority until a later, separately approved cutover passes. Successful rehearsal must not freeze EspoCRM writes, redirect website intake, change Core Command behavior, enable an AI agent to mutate business state, make EspoCRM read-only, or transfer any authority.

## Why this objective is next

The approved migration program orders Customer/Contact/Property rehearsal before Lead migration, then Opportunity migration. CRM Replacement Slice 1 has closed PASS, so its stable Party, Person, Facility, provenance, replay, exception, rollback and reconstruction controls are available to reuse. The approved `M24Lead` identity and lifecycle foundation already exist from A16, and Enterprise Operations Slices 1 and 2 have closed the downstream synthetic Job/Work Order path.

Lead is therefore the next unresolved authoritative CRM record family and the shortest path toward replacing EspoCRM without skipping dependency order. Opportunity migration remains next in sequence because it depends on a reconciled Lead origin/history and the already-proven Customer/Contact/Property identities. Activities/follow-up and communications context remain later slices because they depend on stable Lead identity, ownership and lifecycle. A15 remains independently blocked, and no repository authority makes A17 a prerequisite.

## Governing authority

- [ACP-013 — Midwest24 CRM/ERP Authority Transition](ACP-013-MIDWEST24-CRM-ERP-AUTHORITY-TRANSITION.md) establishes Enterprise as the strategic durable CRM/ERP target while preserving capability-by-capability transition.
- [ACP-013 — EspoCRM Replacement and CRM Authority Migration Program](ACP-013-ESPOCRM-REPLACEMENT-MIGRATION-PROGRAM.md) places Lead migration after the completed Customer/Contact/Property rehearsal and requires governed status/reason mapping, assignment, conversion semantics, deduplication, replay, rollback, usability, reporting and reconstruction.
- [ACP-013 CRM Identity Model Addendum](ACP-013-CRM-IDENTITY-MODEL-ADDENDUM.md) governs `M24Lead`, `M24LeadStatusEvent`, dated Lead relationships, source-instance-qualified mappings and the BR-038 conversion boundary.
- [ACP-013 Property Identity Decision](ACP-013-FACILITY-PROPERTY-MODEL-DECISION.md) governs linked Property identity as native `Facility(M24_PROPERTY)`.
- [ACP-007 — MidwestGuard-Owned Application Platform](ACP-007-MIDWESTGUARD-OWNED-APPLICATION-PLATFORM.md) governs the AI Worker Node as non-authoritative compute, requires core CRM operation without it, and requires usable APIs that do not bypass domain rules.
- [CRM/ERP Platform Evaluation](../CRM-ERP-PLATFORM-EVALUATION.md) requires programmatic create/read/update behavior suitable for integrations and future AI-assisted processes.
- [OCP-012 — MidwestGuard Communications Architecture](../ocp/OCP-012-MIDWESTGUARD-COMMUNICATIONS-ARCHITECTURE.md) keeps website/chat, email and net2phone as channel surfaces/transports and outside this migration rehearsal.
- Completed A16, CRM V1 Slice 1 and CRM Replacement Slice 1 evidence in `mwg-ofbiz` establish the target identities and reusable controls. They do not authorize authority transfer.

No new ACP or OCP is required. This contract implements the approved migration sequence and clarifies the already-approved AI/API boundary for the Enterprise target.

## Read-only source-model inventory

The contract is grounded in checked-in EspoCRM customization metadata inspected read-only. Implementation must freeze a source-schema manifest before fixture construction and must not access production records or APIs merely to design or execute this rehearsal.

| Source concern | Observed representation | Rehearsal treatment |
| --- | --- | --- |
| Lead identity | EspoCRM `Lead` with a platform-native opaque `id` | Map to a generated Enterprise `M24Lead.leadId`; retain the Espo ID only in `M24CrmRecordLink`. |
| Current lifecycle | EspoCRM native Lead status plus checked-in Midwest24 `cRoofingStage` and `cDisposition` fields | Map only through the frozen mapping to the canonical Capability 001 lifecycle. Conflicting, unknown or unsupported values require review; no source field automatically defines Enterprise status. |
| Source and attribution | Required `source`; optional source detail, Google subsource, UTM source/medium/campaign and GA4 client ID | Preserve the controlled target source and available attribution as Lead attributes with source provenance. Unknown taxonomy values remain explicit exceptions or preserved raw source evidence; they are not silently defaulted. |
| Website identity | Immutable unique `cMwgSubmissionId` for website-intake records | Preserve as correlation/provenance only. It is never `leadId`, a general deduplication key, or authority to merge separate records. |
| Customer/contact/property hints | Native Lead name, Account, email, phone and address-like values plus Midwest24 property text | Resolve only through accepted source mappings and explicit reviewed links. Names, email, phone and address are descriptive candidates, never canonical target IDs. |
| Assignment and scope | EspoCRM assigned user, teams, roles and website-intake team/triage behavior | Record source ownership evidence, then map an accepted target owner to an effective-dated `M24LeadPartyLink` with role `M24_LEAD_OWNER`. Do not copy Espo teams/roles into Enterprise permissions mechanically. |
| History | Audited custom fields, source timestamps and source-instance-dependent stream/audit evidence | Inventory what the extract actually contains. Import demonstrated events in source order; where only current state is available, record one attributable imported baseline event and an explicit history-completeness limitation. Never invent intermediate transitions. |
| Source duplicate behavior | Website submission UUID uniqueness plus Espo's ordinary duplicate candidate behavior | Exact source identity controls replay. Descriptive matches and cross-record submission conflicts require review; no automatic merge follows from Espo duplicate suggestions. |

The source-schema manifest must include the EspoCRM version/build identifier available from repository/runtime evidence, relevant entity and field definitions, lifecycle/status values, audited-field declarations, ownership/team/role summary, duplicate and conversion behavior, source-instance alias, history availability statement and SHA-256 hashes of inspected metadata. It is evidence, not a live source export.

## System-of-record boundary

| Object or capability | Current live authority | Target representation in rehearsal | Authority after this slice |
| --- | --- | --- | --- |
| Lead identity and lifecycle | EspoCRM / Core Command | Owned `M24Lead` and append-only `M24LeadStatusEvent` | Unchanged: EspoCRM remains live authority. |
| Lead owner/assignment | EspoCRM assigned user/team model | Effective-dated `M24LeadPartyLink(M24_LEAD_OWNER)` plus server-side object/action checks | Unchanged. |
| Lead-linked Customer/Contact | EspoCRM / Core Command | Existing native PartyGroup/Person targets linked through effective-dated `M24LeadPartyLink` | Unchanged. |
| Lead-linked Property | EspoCRM / Core Command | Existing `Facility(M24_PROPERTY)` linked through `M24LeadPropertyLink` | Unchanged. |
| Source mapping, receipts and exceptions | N/A | Owned source-instance-qualified mappings and immutable rehearsal evidence | Enterprise rehearsal evidence only. |
| AI model state, embeddings or vector indexes | No business authority | Optional derived compute/cache outside the authoritative graph | Never authoritative; disposable and reconstructable. |
| Opportunity, activities, communications, appointments, documents, Job conversion and production routing | Their current governed systems | Deferred | Unchanged; do not migrate or create them. |

Source IDs, submission IDs, email addresses, telephone numbers, names and property text never become canonical Enterprise identities. No rehearsal row changes the current authority matrix.

## Responsibility and ownership boundary

Native OFBiz supplies Party/Person/PartyGroup, UserLogin/Party principal identity,
`Facility(M24_PROPERTY)`, transaction handling and the Entity/Service Engine
primitives used through the owned component. Midwest24-owned code supplies
`M24Lead`, status and assignment history, source mappings, relationship history,
receipts, exceptions, lifecycle validation, object/action authorization, the
human workspace and the machine-readable contract. Apache upstream remains
unchanged.

The Director of Sales or designated executive is the business acceptance owner
for Lead semantics. The Deploy Apache OFBiz operator is responsible for the
private rehearsal checkpoint and restoration. No production cutover owner or
production rollback owner is appointed by this contract; a later cutover proposal
must name both, establish the EspoCRM read-only retention period and obtain
explicit human approval before authority can move.

## Target Lead model and mapping version 1

The implementation must retain a versioned mapping artifact with identifier `CRM-REPLACEMENT-S2-LEAD-MAP-1.0.0` and record its SHA-256 in every execution record. Any semantic mapping change requires a new version, manifest and rehearsal.

Each source identity uses:

`(sourceSystemId, sourceInstanceId, sourceRecordTypeId, sourceRecordId)`

For this rehearsal, `sourceSystemId=ESPOCRM`, `sourceRecordTypeId=LEAD`, and `sourceInstanceId` is a stable non-secret alias bound to the manifest. Source record IDs are opaque synthetic values shaped like the source system and are provenance only.

| Source evidence | Required target | Rule |
| --- | --- | --- |
| Lead record | One generated `M24Lead` | An exact accepted source identity maps to exactly one Lead. A Lead is an intake/prospect event, not a Party. |
| Current status and demonstrated history | `M24Lead.currentStatusId` projection plus ordered `M24LeadStatusEvent` records | Target statuses are only `New`, `Pending Qualification`, `Qualified`, `Converted`, `Disqualified`, `Lost` and `Unresponsive`. Terminal non-conversion states require their governed reason. `Converted` requires BR-038 evidence and is excluded from accepted fixture conversion in this slice. |
| Source/attribution | Controlled Lead source and optional detail/subsource/UTM/GA4 attributes on the owned Lead representation | Preserve source evidence and absence explicitly. No invented attribution and no secret/session values. |
| Assigned owner | `M24LeadPartyLink` to the assignee Party with `roleTypeId=M24_LEAD_OWNER` | Exactly one open current owner link for an active accepted fixture Lead. Reassignment closes the prior link and appends attributable history; it never overwrites attribution. |
| Customer/contact links | `M24LeadPartyLink` with the approved relationship role | Resolve only to existing accepted Party mappings from Slice 1 or a private reconstructed equivalent. |
| Property link | `M24LeadPropertyLink` to an existing `Facility(M24_PROPERTY)` | Address text alone cannot allocate, match or authorize a Property. |
| Website submission ID | Source correlation/provenance attached to the mapping/evidence | Same source identity and payload replays. A conflicting submission correlation across source records becomes `REVIEW_REQUIRED`; it does not merge Leads. |

The importer must validate source identity, expected type, canonical payload hash, mapping version, status/reason map, history ordering and all relationship targets before mutation. Identical replay returns the original target and receipt. Changed payload under an accepted source identity or request ID conflicts before mutation.

## Lifecycle, history and assignment rules

1. `M24Lead.currentStatusId` is only a projection of the latest accepted immutable status event.
2. Imported history retains source event time, source sequence when available, provenance, mapping version, actor evidence and an explicit import actor/executor. Source actors that cannot be mapped remain source evidence; they are not fabricated as Enterprise users.
3. A current-only source record produces one imported baseline event marked as such. It does not imply that earlier states occurred.
4. The rehearsal may prove `New -> Pending Qualification -> Qualified` using governed synthetic events after import. It must not mark a Lead `Converted`, create an Opportunity, or invoke BR-038.
5. `Disqualified`, `Lost` and `Unresponsive` require the approved reason taxonomy. `Other — Manager Review` requires the governed review evidence.
6. An active Lead has exactly one current owner in the rehearsal. Transfer is explicit, effective-dated, attributable and atomic with authorization changes. Historical owners remain in closed links and immutable events.
7. Importing source ownership does not copy EspoCRM permissions. Enterprise authorization is evaluated independently from current effective assignment and approved role.

## De-identified representative fixture

All source-like payloads are synthetic, use fictional names, `example.invalid` contact values, non-routable addresses, synthetic timestamps and fixture-only IDs, and contain no copied production values.

The private fixture must include:

1. one website-origin Lead with valid submission correlation, approved source attribution, ordered demonstrated history from `New` to `Pending Qualification`, one owner, one linked Contact/Customer and one linked Property;
2. one non-website Lead proving that submission correlation is optional and source taxonomy remains controlled;
3. one current-state-only Lead proving explicit incomplete-history handling without invented transitions;
4. one reassignment case proving one current owner, closed historical ownership and immutable attribution;
5. one terminal non-conversion case with an approved governed reason;
6. one duplicate candidate based only on descriptive contact/property values, resulting in `REVIEW_REQUIRED` and no target Lead;
7. one conflicting or unsupported status/reason case, resulting in `REVIEW_REQUIRED` and no accepted lifecycle projection;
8. the same source record ID under a second source instance, proving source-instance separation.

No fixture may create an Opportunity, activity, appointment, communication event, document, Job, Work Order, accounting record or production credential.

## Duplicate, ambiguity and correction policy

- Exact source identity plus identical canonical payload and mapping version is inert replay.
- Exact source identity or request ID with changed canonical content is a conflict before mutation.
- Name, email, phone, address, submission correlation, Account text or Property text can identify candidates only. They never authorize automatic identity merge or relationship creation.
- Missing or conflicting status/reason, owner, source instance or relationship evidence remains `REVIEW_REQUIRED` or `UNMATCHED` with attributable evidence.
- An authorized fixture review may resolve an exception only with reason, actor, time and source-evidence reference. The original exception remains immutable.
- Corrections append events or effective-dated links. Accepted history is never deleted, overwritten or reordered.

## Authorization and allowed data flow

The only permitted business flow is:

`de-identified Lead fixture + frozen mapping -> authenticated owned rehearsal command -> M24Lead/history/dated links + provenance/receipt/exception -> authorized UI and machine-readable views -> independent export/reconstruction`

The EspoCRM repository is read-only source-model evidence. The implementation must not call the production EspoCRM API or database, access live Lead records, alter Command, or contact website/chat, email, net2phone or other transports.

| Principal | Permitted | Denied |
| --- | --- | --- |
| Lead Migration Coordinator | Submit the approved fixture; view its scoped Leads, receipts and exceptions; perform only contract-authorized synthetic lifecycle and owner-transfer actions | Live import, arbitrary target selection, ungoverned merge, Opportunity conversion, broad native/entity administration. |
| Lead Migration Reviewer | Read scoped reconciliation and decide explicitly authorized fixture exceptions or manager-review reasons | Import execution, unrestricted Lead mutation, source modification. |
| Limited execution principal | Noninteractive native/owned writes required by the owned command while preserving the initiating human | Browser login, client-selected canonical target, generic privileged service access. |
| AI Worker reader | Authenticated noninteractive read of the versioned machine Lead view within its explicit fixture scope | Browser login, raw JDBC/entity access, unrestricted list/export, mutation, transition, assignment, exception resolution or privileged native routes. |
| CRM coordinator, crew, finance, unrelated integration and unauthenticated caller | Existing permissions only | Rehearsal commands and out-of-scope Lead, receipt, exception, export or machine-view access. |
| Administrator/bootstrap | Configuration and recovery only | Substitute for non-admin acceptance. |

Every command and read must enforce server-side object/action scope. Record initiating human and effective executor for writes. Authentication, knowledge of an ID, an API credential or possession of a model does not grant object authority.

## AI Worker and machine-readable compatibility contract

The Lead surface must be an owned, documented, versioned JSON contract identified as `M24-ENTERPRISE-LEAD-READ-1.0.0`. It must expose only authorized fields and include:

- schema version and response generation time;
- opaque Enterprise Lead ID and source-instance-qualified provenance reference;
- current canonical status and ordered immutable status events;
- controlled reason and explicit history-completeness indicator;
- current and historical owner links with effective dates;
- authorized Customer, Contact and Property relationship IDs, roles and effective dates;
- controlled source attribution and the presence/absence of optional attribution fields;
- mapping version, stable deterministic ordering and a non-secret integrity value for reconstruction;
- bounded pagination and a deterministic continuation/incremental cursor suitable for resumable traversal.

The interface must support list/index traversal followed by detail/relationship traversal without guessing native IDs. It must return stable errors without disclosing the existence of unauthorized objects. It must not require UI rendering, HTML interpretation, direct database knowledge, Apache internal entity names or administrative access.

Free-text source fields are untrusted business data. The interface must distinguish them from control metadata so an AI consumer cannot treat stored Lead text as an instruction to invoke tools or change policy. Secrets, session identifiers, raw credentials and hidden authorization metadata are never returned.

The AI Worker Node and its 70B model are consumers, not systems of record. Their outputs are proposals or derived analysis only. This slice authorizes no AI write, autonomous action, customer communication, model fine-tuning, embedding authority or vector index as canonical storage. Enterprise must operate fully when the worker or model is unavailable.

Compatibility passes when an independent consumer can traverse and reconstruct the entire authorized fixture using only the published contract. If the governed AI Worker Node is available, the same de-identified traversal may additionally be executed there; worker availability and model deployment are not required for the transactional Lead rehearsal to remain valid.

## Positive acceptance contract

1. **Preflight:** record repository revisions, source manifest/hash, mapping version/hash, machine contract version/hash, OFBiz image/version, isolated database identity, de-identification attestation, health and rollback location.
2. **Canonical import:** accepted fixtures create exactly one `M24Lead` per accepted source identity, correct initial/baseline and demonstrated historical events, accepted attribution, effective-dated owner and approved Party/Property links, source mapping and receipt.
3. **Lifecycle fidelity:** reconstruct each accepted Lead's current state from ordered immutable events. Canonical status/reason rules reject unsupported transitions and terminal reasons.
4. **History limitation:** the current-state-only fixture records an explicit incomplete-history finding and contains no fabricated intermediate event.
5. **Owner transfer:** transfer produces one current owner, closes the prior link at the same effective boundary, preserves history and changes authorization atomically.
6. **Sequential replay:** at least three identical imports return the original Lead IDs and receipts without duplicate Leads, events, links, exceptions or grants.
7. **Concurrent replay:** at least two concurrent identical imports serialize to one accepted effect and stable receipt.
8. **Exceptions:** duplicate-candidate and unsupported lifecycle fixtures create visible attributable exceptions and no accepted Lead graph.
9. **Restart/recreation:** accepted Leads, status events, attribution, links, receipts, exceptions, authorization and replay behavior survive application/database restart or recreation without reseeding.
10. **Independent reconstruction and tamper detection:** normalized export reconstructs every accepted source/target identity, status chronology, history limitation, owner chronology, relationship and exception. Altered event order, current-status projection, owner period, mapping version or relationship must be detected.
11. **Human usability:** an authorized non-admin coordinator can list, search and view the scoped fixture and permitted lifecycle/assignment evidence at normal desktop and approximately 390-pixel mobile width without unrelated CRM/ERP exposure.
12. **Machine traversal:** the AI Worker reader can traverse the complete scoped fixture through the versioned machine surface, resume pagination without gaps or duplicates, and independently reproduce the normalized Lead graph. The same principal cannot mutate any record.
13. **Worker independence:** disabling or making the AI Worker consumer unavailable does not affect import, lifecycle, UI, replay, authorization, export or reconstruction.
14. **Cutover-readiness finding:** report PASS, FAIL or BLOCKED against the Lead migration gate and explicitly state that the result does not authorize production migration or cutover.

## Negative, rollback and integrity acceptance

The following must fail without target business effect or unauthorized disclosure:

1. unauthenticated, disabled, wrong-role or interactive use of the execution/AI principals;
2. direct native entity/service/admin routes, guessed Lead/receipt/exception IDs, cross-source-instance access and unrestricted export;
3. wrong source type, source-instance spoofing, invalid mapping or machine-contract version, missing manifest/hash, or source ID supplied as `leadId`;
4. altered payload under an accepted request/source identity;
5. descriptive-value, submission-ID, email, phone or address-only merge/link attempts;
6. unsupported lifecycle status, missing governed terminal reason, invalid transition, forged historical event or out-of-order chronology;
7. missing, duplicated or overlapping current owner; implicit transfer; wrong assignee Party; unauthorized reviewer action;
8. relationship to unknown, unauthorized or wrong-type Party/Facility;
9. AI reader mutation, broad list/export, raw entity access, instruction-like free text treated as control, or access after credential/session revocation;
10. injected failure after any native/owned object is written but before the complete Lead graph and receipt commit.

The injected failure must roll back atomically: no Lead, status event, attribution, owner/relationship link, mapping, receipt, exception or authorization effect may remain. A clean retry may create the accepted graph once.

## Reconciliation, rollback and persistence

The reconciliation package must compare fixture manifest to target export by source identity, Lead identity, mapping version, payload hash, status chronology, reason, history-completeness state, source attribution, owner periods, Party/Property links, exception state, actor/executor and time. It must explicitly report accepted, replayed, `REVIEW_REQUIRED`, `UNMATCHED`, conflict and rolled-back counts.

Before execution, create a recoverable isolated database/configuration checkpoint. Failure restores the private copy and preserves source evidence. This contract does not authorize Lead fixture writes to the controlled LAN runtime. A later LAN capability deployment, if separately authorized, must remain empty of private Lead business fixtures.

No live Lead cutover follows a passing rehearsal. A cutover proposal must separately establish live inventory, full status/reason and ownership mapping, source-history completeness, open-work/communications dependencies, user acceptance, reporting, monitored intake routing, write freeze, EspoCRM read-only retention and tested reversal.

## Noninteractive machine authentication adapter

`M24-ENTERPRISE-LEAD-READ-1.0.0` uses one private owned bearer-token adapter for its externally reachable machine boundary. The adapter is limited to the disabled `M24P_LEAD_AI` identity and does not change that UserLogin into an interactive account. `UserLogin.enabled=N` remains the identity and security anchor; normal browser login remains unavailable.

The private bootstrap generates one high-entropy token in protected runtime secret storage. Only a salted verifier and non-secret token metadata may be persisted. The token is supplied only in the `Authorization: Bearer` request header to the owned Lead machine route; it must never appear in URLs, source control, logs, evidence, browser JavaScript, cursors, or model state. The route verifies the token, resolves exactly `M24P_LEAD_AI`, and then separately enforces `M24_LEAD_AI_READ` plus each effective `MACHINE_READ` object grant. The cursor is continuation state only and never authenticates or grants scope.

The bootstrap/revocation owner may rotate or revoke the token by replacing or disabling its verifier record without changing Lead business data. Missing, invalid, expired, or revoked tokens return authentication denial; a valid token without permission or object scope returns authorization denial. The adapter grants no mutation, generic-service, native-administration, database, or export authority. Private validation must prove browser login denial, valid-token machine read, invalid/revoked-token denial, scope denial, and mutation denial through the external route.

## Targeted regressions

Run only affected proofs:

- A07 object/action authorization, dual attribution and direct-route denial;
- A12 restart/recreation persistence;
- A14 normalized export, independent reconstruction and tamper detection;
- A16 `M24Lead`, status projection/history, source-instance mappings and Party/Property link behavior;
- CRM V1 Slice 1 Customer/Contact/Property read boundaries and logout/session invalidation;
- CRM Replacement Slice 1 mapping, replay, ambiguity, rollback and reconstruction controls;
- Enterprise Operations Slice 1 signed-contract boundary only to prove this slice cannot invoke conversion or create downstream work.

Reuse all unaffected passing evidence. A15 remains independently BLOCKED. This slice does not start or change A17.

## Evidence and Git boundary

Retain timestamped non-secret evidence under `mwg-ofbiz/docs/evidence/crm-replacement-slice-2/`:

- source-schema manifest and hashes;
- mapping and machine-contract versions/hashes;
- de-identification attestation and fixture IDs;
- preflight/isolation and rollback record;
- normalized Lead/status/owner/relationship reconciliation;
- sequential/concurrent replay, exception, denial, rollback, restart and tamper results;
- authorized desktop/mobile evidence;
- machine traversal, pagination/resume and worker-unavailability evidence;
- independent reconstruction package;
- command log without credentials, cookies, tokens, secret hashes or real data;
- final execution record and explicit non-cutover readiness finding.

Implementation is confined to the Midwest24-owned OFBiz component and controlled private test/harness/evidence paths in `mwg-ofbiz`. Apache upstream, EspoCRM, live intake, the governing repository during execution, production data, secrets, model weights, prompts containing business data, vector stores and runtime backups remain outside the implementation commit. Show the exact implementation diff and validation before any implementation commit or push.

## Deferred scope

This slice defers:

- Opportunity migration or creation and Lead-to-Opportunity linkage beyond existing read-only identity references;
- BR-038 conversion, accepted-contract processing and Job/Work Order creation;
- activities, reminders, appointments, follow-up queues and delayed automation;
- communications content or channel integration for website/chat, email, telephone, voicemail or SMS;
- production EspoCRM export/import, live intake routing, cutover, write freeze, read-only transition or retirement;
- document bytes or document-reference migration;
- reporting beyond bounded reconciliation/readiness evidence;
- AI recommendations, classification, embeddings, semantic retrieval, autonomous action, tool execution, customer communication or authoritative decision-making;
- actual 70B model deployment, performance tuning or AI Worker infrastructure redesign;
- A15, A17, accounting, procurement, scheduling and unrelated Enterprise capability.

## Stop conditions

Stop and return to governance if:

- source status/reason or assignment semantics cannot map without changing the approved Capability 001 lifecycle or `M24Lead` identity;
- a new canonical Lead, Party or Property identity is required;
- live EspoCRM records/API/database, production intake, production customer data or channel credentials are required;
- history would need to be invented, flattened or silently discarded;
- deduplication requires automatic descriptive matching or ungoverned merge;
- Opportunity, activity, communication, document or conversion scope is required;
- AI access would require raw database/entity/admin access, broad credentials, unversioned HTML scraping, authoritative model state or a write path;
- Apache upstream modification, broad administrator permission, permanent dual authority or non-additive incompatible schema change is required;
- replay, concurrency, atomic rollback, source-instance separation, authorization, restart persistence, machine traversal, export/reconstruction or tamper detection fails;
- a LAN deployment would contain private Lead fixtures or any result would transfer authority.

## Resume gate and implementation handoff

Deploy Apache OFBiz may implement this slice after this contract and its migration-program clarification are committed. It must re-resolve repository state, verify the governing file hashes, inspect current `M24Lead` and CRM Replacement Slice 1 implementation before editing, and reuse passed evidence rather than restart discovery. Implementation stops at the exact conditions above and before commit/push for explicit review.

> Continue Midwest24 Core Enterprise in `/home/jesse/Documents/Projects/mwg-ofbiz` under governing repository `/home/jesse/Documents/Projects/jryanrussow-site`. Read the committed `ACP-013-CRM-REPLACEMENT-SLICE-2-CONTRACT.md`, `ACP-013-ESPOCRM-REPLACEMENT-MIGRATION-PROGRAM.md` and cited authority. Implement only **CRM Replacement Slice 2 — Lead Migration and Lifecycle Rehearsal** in a private isolated OFBiz 24.09.07 copy. Reuse the completed A16, CRM V1 Slice 1, CRM Replacement Slice 1 and Operations Slice 1 controls and evidence. Freeze the read-only EspoCRM Lead source-schema manifest, implement mapping `CRM-REPLACEMENT-S2-LEAD-MAP-1.0.0`, the approved `M24Lead` lifecycle/history/assignment/link behavior, and machine-readable contract `M24-ENTERPRISE-LEAD-READ-1.0.0`. Prove every positive, denial, replay, concurrency, rollback, restart, reconstruction, tamper, human usability, machine traversal and AI-worker-unavailability requirement. Use only de-identified fixtures. Do not access production EspoCRM data/APIs, change Command or live intake, create Opportunity/activities/communications/documents/Jobs/Work Orders, grant AI write authority, modify Apache upstream, deploy model infrastructure, start A15/A17, or commit/push before showing the exact implementation diff and validation.
