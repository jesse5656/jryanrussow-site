# ACP-013 Addendum — EspoCRM Replacement and CRM Authority Migration Program

Version: 1.0.0

Status: Approved

Type: Architecture Change Proposal migration addendum

Authority: Systems Architect Discipline

Approved: 2026-09-15

Scope:

- `docs/architecture/acp/ACP-013-ESPOCRM-REPLACEMENT-MIGRATION-PROGRAM.md`
- `docs/architecture/ocp/OCP-012-MIDWESTGUARD-COMMUNICATIONS-ARCHITECTURE.md`
- `docs/architecture/CRM-ERP-PLATFORM-EVALUATION.md`

## Decision

Midwest24 Core Enterprise, implemented by Apache OFBiz and the governed Midwest24-owned extension, is the approved strategic target for the durable combined CRM and ERP operating model. EspoCRM is the current operational CRM bridge during migration. It is not the intended permanent CRM or permanent system of record.

This is a target-architecture and migration-governance decision. It does not declare OFBiz the current production CRM, transfer any live authority, migrate production data, disable EspoCRM, approve a production cutover, or waive the ACP-004 durability, upgrade, restore, exit and maintenance gates.

Authority moves capability by capability and record family by record family. Until an explicit cutover gate passes, EspoCRM may remain authoritative for that live capability. After the gate passes, Enterprise is authoritative and EspoCRM becomes read-only historical evidence or is retired under the approved migration plan. Permanent dual authority is prohibited.

## Current and target states

**Current operational authority:** EspoCRM, operating as Midwest24 Core Command's current implementation, remains live for existing CRM operations that have not completed a separately approved cutover. Existing accounting, document, communication-transport and other systems retain their current authority until their own governed transitions.

**Target authority:** Midwest24 Core Enterprise becomes the durable authority for the required CRM and downstream ERP operating model. Apache OFBiz supplies native primitives where they fit; the Midwest24-owned component supplies governed semantics, authorization, lineage, user experience and integrations where native OFBiz is insufficient. Source EspoCRM IDs remain migration provenance and idempotency inputs, never permanent Enterprise canonical identities.

## Target Enterprise CRM model

The approved target foundation is:

- Lead: owned `M24Lead` identity with immutable owned status, history, conversion and relationship events;
- Customer: native OFBiz `PartyGroup` / `Party`;
- Contact: native OFBiz `Person` / `Party`;
- Property: native `Facility(facilityTypeId=M24_PROPERTY)` with effective-dated Party and address relationships;
- Opportunity: native `SalesOpportunity` plus governed owned relationship and history extensions where native history is insufficient;
- Job and Work Order: native `WorkEffort(PROJECT)` and child `WorkEffort(TASK)` with governed Midwest24 execution semantics;
- external identity: source-system, source-instance, record-type and record-ID mappings with immutable payload hashes and attributable corrections;
- authorization and audit: deny-by-default object/action scope, initiating-human and effective-executor attribution, replay-safe commands and reconstructable immutable history.

The target capability includes Leads, Customers, Contacts, Properties, Opportunities, CRM lineage, activities and follow-up, communication context, Job conversion, Jobs, Work Orders, operational scheduling, document/evidence relationships, governed accepted scope, materials/procurement, separately governed accounting integration or authority, warranty/callback operations, reporting, authorization, audit/history, and complete migration/export/reconstruction.

This capability set does not require one monolithic interface. Midwest24 Core Command may remain the CRM-facing workspace while using Enterprise authority through bounded interfaces. Native OFBiz is preferred where it faithfully fits; governed owned extensions remain appropriate where native semantics or user experience do not.

## System-of-record transition rule

Every migration contract must identify the source instance, exact record family/capability, current authority, target representation, mapping/version, acceptance evidence, cutover owner, rollback owner and read-only retention period. No technical replication, successful synthetic test or copied record changes authority by itself.

| Object or capability | Current authority | Target authority | Migration prerequisite | Cutover gate | Post-cutover authority | Rollback requirement |
| --- | --- | --- | --- | --- | --- | --- |
| Customer | EspoCRM/Command for live CRM | Enterprise native Party/PartyGroup | Audited fields, IDs, duplicates, roles and relationship map; CRM Slice 1/A16 reuse | Count, field, relationship, permission, usability, replay and reconstruction reconciliation; approved cutover | Enterprise; Espo read-only history | Restore prior source availability; reverse routing without deleting imported provenance |
| Contact | EspoCRM/Command | Enterprise native Person/Party | Stable source IDs, customer links, communication points, merge/conflict rules | Cardinality, primary-contact, access, history and export reconciliation | Enterprise | Preserve Espo source and reversible interface routing |
| Property | EspoCRM/Command | Enterprise native `Facility(M24_PROPERTY)` | Address revisions, owner/occupant/contact history and reviewed crosswalk | Stable Facility identity, dated relationships, address history, object-scope denial and reconstruction pass | Enterprise | Retain crosswalk and source history; restore prior routing without reusing IDs |
| Lead | EspoCRM/Command | Enterprise owned `M24Lead` | Governed status/reason map, source history, assignment, conversion and deduplication rules | Representative migration, lifecycle/history fidelity, role denial, replay, rollback, usability and reporting pass | Enterprise | Preserve Espo Lead history and return intake routing to Espo if cutover is reversed |
| Opportunity | EspoCRM/Command | Enterprise native `SalesOpportunity` plus owned dated relationships/history | Stage semantics, roles, Property links, estimate/contract references and conversion history reconciled | Stage/history, Customer/Contact/Property links, permissions, Job conversion and reconstruction pass | Enterprise | Preserve source opportunity and mapping; reverse new-write routing without deleting Enterprise evidence |
| CRM history and lineage | EspoCRM/Command | Enterprise immutable native/owned history and source mappings | Event taxonomy, timestamps, actors, corrections and source-instance identity frozen | Sampled and aggregate chronology reconstructs without flattening or silent loss | Enterprise for migrated/current events; Espo retained historical during retention | Reopen source history read access; never rewrite imported events |
| Activities and follow-up | EspoCRM/Command | Enterprise CRM activity/follow-up services and Command-facing workspace | Activity types, ownership, due/completion semantics, recurrence, reminders and open-item inventory | Open/closed history, assignments, reminders, denial, restart and overdue reporting pass | Enterprise | Freeze new Enterprise activity writes and restore Espo routing from a reconciled checkpoint |
| Communications context | EspoCRM/Command; net2phone and channel providers remain transports | Enterprise authoritative CRM context exposed through Command | Channel inventory, identity matching, consent/privacy, retention, event contract and actual account capability validation | Inbound/outbound context, missed/voicemail/follow-up, replay, authorization, outage and history tests pass per channel | Enterprise CRM context; transport remains channel provider | Per-channel routing reversal and durable event replay without duplicate customer history |
| Lead/Opportunity to Job conversion | EspoCRM/Command trigger; no production Enterprise cutover yet | Enterprise conversion event and native Job graph | BR-038 contract trigger, exact document/version/hash, source identities and accepted-scope map | Idempotent atomic conversion, relationship fidelity, denial, rollback and reconciliation pass | Enterprise owns conversion receipt and downstream Job; upstream sales history remains migrated CRM context | Disable new handoff intake, restore prior routing and retain receipts for reconciliation |
| Job and Work Order | Current governed operating source until explicit cutover; Enterprise proofs are synthetic/candidate evidence | Enterprise native WorkEffort graph | Production lifecycle, roles, numbering, existing-job inventory and source crosswalk governed | Operational usability, lifecycle, assignment, document links, reports, restore and rollback rehearsal pass | Enterprise | Restore prior operating path from checkpoint; never delete accepted Enterprise audit |
| Operational scheduling | Current scheduling/CRM tools | Enterprise WorkEffort dates/assignments plus owned scheduling semantics | Appointment versus production schedule distinction, crew/capacity rules and notification boundary | Calendar/assignment correctness, collision, authorization, mobile, restart and rollback pass | Enterprise for production scheduling | Export open commitments and restore prior scheduler routing |
| Documents and evidence relationships | EspoCRM Document is interim managed-file authority; channel stores may hold source evidence | Enterprise owns business relationships/filing state; governed Document Services owns canonical document/version identity and bytes when adopted | ACP-012 implementation gates, source inventory, hashes, retention, access and crosswalk | Version/hash, relationship, byte-access denial, history, restore and no-duplicate-byte checks pass | Enterprise relationships; Document Services bytes; Espo read-only history | Preserve source files and manifests; reverse relationship routing without copying/deleting canonical bytes |
| Estimating and accepted scope | Current governed sales/estimating source | Enterprise retains governed accepted-scope identity and downstream relationship; estimating authoring authority remains separately governed | Exact source, revision, acceptance, line/scope semantics and contract relation defined | Accepted revision reconstructs and converts without inventing estimating ownership | Enterprise owns accepted operational scope reference; authoring system as separately decided | Preserve original estimate/revision and restore reference routing |
| Materials and procurement | Current accounting/procurement processes | Enterprise native/owned procurement and inventory model after its gate | Supplier/product identity, units, costing, facilities, approvals and accounting boundary | PO/receipt/return/cost lineage, authorization, reconciliation, restore and reporting pass | Enterprise for approved procurement scope | Freeze transactions, reconcile open documents and restore prior process from checkpoint |
| Accounting integration or authority | Current accounting system | Enterprise integration first; eventual authority only by separate accounting decision | Chart, periods, tax, balances, posting, controls, audit and legal/accounting review | Separately approved financial migration and opening-balance reconciliation | As separately approved; no implicit transfer | Tested financial rollback/parallel books and retained source evidence |
| Warranty and callbacks | Current CRM/manual operating records | Enterprise governed warranty/callback identities and workflows | Product/work scope, dates, obligations, contacts, status and document rules | History, due work, authorization, Job/Property links, notifications and reconstruction pass | Enterprise | Preserve source obligations and reopen prior queue if necessary |
| Reporting | Source systems individually | Enterprise reports for migrated authority plus governed cross-period history | Metric definitions, lineage, filters and historical-period mapping | Totals and sampled drill-through reconcile; role filters and export pass | Enterprise for cut-over domains | Retain source reports and reproducible reconciliation package |
| Authorization | EspoCRM roles/teams for current CRM | Enterprise least-privilege roles, object/action grants and workload identities | Role matrix, user/team map, separation of duties and emergency access defined | Positive/negative/direct-route/export/session tests pass for every role | Enterprise | Disable new grants and restore prior role routing; retain audit |
| Audit and history | Current source audit/history | Enterprise immutable native/owned audit for cut-over domains | Required event inventory, actor/executor and correction semantics defined | Completeness, ordering, tamper detection, export and restore pass | Enterprise; source retained for historical period | Never delete either history during rollback; reconcile both chronologies |
| Migration/export/reconstruction | EspoCRM and other current sources | Enterprise governed import mappings and independent reconstruction package | Versioned extract, manifest, hashes, transformation rules and exception queue | Full counts, relationships, history, attachments/references, permissions and exceptions reconciled | Enterprise plus retained migration evidence | Re-runnable import, source preservation, checkpoint restore and no destructive source mutation |

## Common cutover gate

Every object/capability cutover requires all of the following:

1. exact source and target scope with named accountable owner;
2. versioned mapping and de-identified representative rehearsal;
3. deterministic idempotent import or adapter behavior;
4. relationship, history, permission and exception reconciliation;
5. user acceptance for the affected operating role;
6. backup, restore, independent export/reconstruction and rollback rehearsal;
7. monitoring and reconciliation for the cutover window;
8. explicit human approval of the capability cutover;
9. documented EspoCRM write freeze/read-only behavior for that capability;
10. a bounded retention and retirement decision.

Unresolved exceptions remain visible and block the affected record/capability. They must not be silently dropped, merged or defaulted. A cutover of one family does not transfer another.

## Phased EspoCRM retirement sequence

1. **Evidence and source freeze:** inventory the exact EspoCRM version, custom metadata, fields, relationships, roles, teams, activities, documents, APIs, automations and current backup/restore state. Preserve a verified recovery point.
2. **Identity foundation — completed technical proof:** reuse A16 and CRM Slice 1 for Lead, Party, Person, Facility, SalesOpportunity, external mappings, authorization and reconstruction. Do not rerun broad discovery.
3. **Customer / Contact / Property rehearsal:** build the versioned mapping and perform a de-identified representative migration rehearsal into the proven Enterprise identities. Reconcile duplicates, relationship cardinality, address history, permissions and export.
4. **Lead migration slice:** reconcile live Lead statuses, reasons, assignment, history, source, consent and BR-038 conversion semantics with `M24Lead`.
5. **Opportunity migration slice:** reconcile stages, roles, Properties, activities, estimates/contracts, conversion history and native `SalesOpportunity` relationships.
6. **Activities and follow-up:** migrate open and historical activities, ownership, due/completed state, reminders and queues before shifting staff work.
7. **Communications integration:** attach validated net2phone, email, website/chat and other channel events to Enterprise CRM context through bounded replay-safe adapters. Cut over channel by channel.
8. **Job conversion and downstream continuity:** use Enterprise Operations Slice 1 evidence for signed-contract conversion and Slice 2 for downstream execution; reconcile production lifecycle separately before live authority transfer.
9. **Documents and evidence references:** migrate metadata, relationships, versions/hashes and access without duplicate canonical bytes; preserve Espo file recovery until the governed document target passes.
10. **Historical CRM import:** import remaining in-scope history with source-instance provenance, exception queues and deterministic reruns. Preserve excluded data with documented reason and access.
11. **Authorization and reporting:** map users, teams, roles, object/action scope, dashboards, operational reports and historical comparisons; prove direct-route and export denial.
12. **Final reconciliation and rollback rehearsal:** reconcile counts, relationships, open work, activities, documents, audit, reports and exception queues; restore both sides and rehearse reversing routes.
13. **Capability cutovers:** approve and execute each record-family/channel cutover independently. Stop new Espo writes only for the transferred capability.
14. **EspoCRM read-only period:** keep authenticated, backed-up historical access for the governed retention window; monitor Enterprise, resolve exceptions and prohibit new authoritative writes in transferred families.
15. **Retirement:** after every required family is cut over, retention/export/legal needs are satisfied, independent reconstruction passes and rollback window closes, approve a separate final retirement action. Preserve final database/files/configuration exports and manifests before shutdown.

## Communications target

net2phone remains the communications transport. Email, website/chat and other providers remain their channel transports or intake surfaces. Midwest24 Core Command remains the CRM-facing workspace. After the applicable cutover, Enterprise owns the authoritative Lead, Contact, Customer, activity and communication context consumed by that workspace.

EspoCRM may continue serving current communication workflows until their channel/capability gates pass. No new integration may make EspoCRM a permanent dependency. Bounded adapters must be capable of routing the same governed business events to Enterprise without redesigning net2phone or exposing channel credentials to browsers.

## Product identity consequence

The approved consequence is **B: Midwest24 Core Command remains the CRM-facing product surface backed by Enterprise/OFBiz authority rather than permanently by EspoCRM**.

Command is a durable functional product identity, not the name of the EspoCRM package. It may provide intake, conversation, qualification, follow-up, queues and role-focused CRM interaction while Enterprise owns the canonical CRM/ERP data and services after cutover. Enterprise remains the unified authoritative operating platform and may also expose its own administrative and operational interfaces.

No product rename is required now. A separate naming decision is required only if a later proposal retires or materially redefines Command, changes the approved hostnames, or merges the user-facing products. This addendum supersedes ACP-011 only where ACP-011 allocated future durable CRM record authority exclusively to Command as a separate system; ACP-011's product names and implementation-independent naming principle remain approved.

## Relationship to Enterprise Operations Slice 2

Enterprise Operations Slice 2 may proceed unchanged. It is a bounded synthetic downstream Work Order execution slice, explicitly transfers no production CRM authority, and treats Command/EspoCRM as current rather than permanent authority. Its identity, lifecycle, isolation, authorization, empty-LAN and stop conditions remain intact.

## Next CRM replacement slice

The next CRM replacement objective is **CRM Replacement Slice 1 — Customer, Contact and Property Migration Rehearsal**.

This is next because CRM Slice 1 and A16 already prove the target identities and relationships, making these the lowest-ambiguity record families for a representative migration rehearsal. The slice must inventory the actual EspoCRM source model read-only, define a versioned mapping, use de-identified representative data, reconcile duplicates and exceptions, prove deterministic replay/rollback/export/reconstruction, and return a cutover-readiness finding. It must not import production data, change live routing, declare authority transfer, or make EspoCRM read-only.

### Exact next-chat handoff

> Continue the Midwest24 CRM replacement governance in `/home/jesse/Documents/Projects/jryanrussow-site`, with implementation evidence in `/home/jesse/Documents/Projects/mwg-ofbiz` and the current EspoCRM implementation repository resolved read-only as needed. Repository authority controls over this prompt. Read ACP-013 and `ACP-013-ESPOCRM-REPLACEMENT-MIGRATION-PROGRAM.md`. Define the bounded implementation contract for **CRM Replacement Slice 1 — Customer, Contact and Property Migration Rehearsal**. Reuse the completed A16 and CRM Slice 1 identities, tests and evidence; do not restart architecture discovery. Inspect the actual EspoCRM Customer/Account, Contact, Property/address, relationship, team/role, history and source-ID model read-only. Specify a versioned source-to-Enterprise mapping, de-identified representative fixture, duplicate/conflict/exception handling, deterministic import/replay, relationship and address-history reconciliation, authorization, export/reconstruction, rollback, evidence and stop conditions. Do not migrate production data, change live EspoCRM, transfer authority, modify Apache upstream, start Lead/Opportunity migration, or implement before the contract is approved and committed. Show the exact governing diff and validation before commit or push.

## Stop conditions

Stop and return to governance if a slice requires permanent dual authority, destructive source mutation, silent data loss or merge, an ungoverned business status/lifecycle, a new canonical identity that conflicts with ACP-013, Apache upstream modification, production data before its approved gate, accounting authority without a separate decision, document-byte duplication, communications transport redesign, or product renaming.
