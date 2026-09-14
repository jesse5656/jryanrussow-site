# ACP-013 — Midwest24 CRM and ERP Authority Transition

Version: 1.0.0

Status: Approved

Type: Architecture Change Proposal

Authority: Systems Architect Discipline

Proposed: 2026-09-14

Approved: 2026-09-14

Scope: Strategic CRM/ERP record authority, Core Command product role, document-filing boundary and gated transition. No production cutover.

## Approval and decision boundary

The governing human explicitly approved this ACP on 2026-09-14, including the Core Command role and document-identity split below. Approval changes the **strategic target architecture** and authorizes reconciliation of dependent evaluation records. It does not approve A16 execution, an OFBiz production selection, production migration or cutover.

## Current state, problem and trade-offs

ACP-011 assigns CRM/front-office ownership to Command and ERP evaluation to Enterprise. ACP-008 conditionally advances a MidwestGuard-owned thin CRM application; ACP-005 keeps EspoCRM operational. The new combined CRM/ERP target would contradict those records if it were treated as an implicit implementation choice. A single authoritative graph can reduce reconciliation and duplicate-record work, but concentrates CRM and ERP suitability, permission, migration and upgrade risk in OFBiz. Retaining the old candidate's evidence and the EspoCRM bridge preserves comparison and rollback options. This ACP recommends gated evaluation of the combined target with no operational authority transfer before acceptance.

## Approved strategic target and effective boundary

Midwest24 Core Enterprise, with Apache OFBiz as its current implementation **candidate**, is the strategic target for authoritative CRM/customer and ERP/operational records. After a separately approved record-family cutover, Enterprise is to own authoritative Lead, Contact, Customer/Account, Property/Service Location, Opportunity and Job relationships. Native OFBiz Party/Person/PartyGroup/PartyRelationship and WorkEffort relationships are the initial candidate graph. This is a target architecture, not a finding that OFBiz CRM is suitable or a selection of OFBiz for production.

Midwest24 Core Command retains its durable product name and `command.midwest24.com` identity. Its future role is the front-office workspace for customer intake, conversations, qualification, follow-up, queues and CRM interaction. It must use a bounded interface to Enterprise for records whose authority has passed the migration gates; it must not maintain a second independently authoritative CRM/customer/job graph after cutover. EspoCRM continues implementing Command and remains the **operational CRM bridge and current record authority** until each applicable capability, migration, rollback and acceptance gate has passed and a separate production-adoption/cutover decision is approved. A future Command implementation is not selected by this ACP; Command is not silently renamed, retired or merged into Enterprise. net2phone remains the communications transport and website/chatbot remains the customer-facing intake surface.

The precise transition of each record family (Lead, Customer/Account, Contact, Property/Service Location, Opportunity, Job) must be recorded in an authority matrix with source, target, interface, cutover criteria and rollback owner. No family changes authority merely because a synthetic fixture or technical adapter passes. Operational EspoCRM remains available and intact during evaluation. No production data import, destructive removal, disablement, DNS change or production integration is authorized here.

## Explicit reconciliation of existing decisions

- [ACP-011](ACP-011-MIDWEST24-CORE-PRODUCT-IDENTITY-AND-SYSTEM-NAMING.md) remains controlling for product names and hostnames. This ACP supersedes only ACP-011's allocation of *future durable CRM record authority* exclusively to Command. Command retains the front-office product role above; Enterprise becomes the conditional target record authority for both CRM and ERP. Until a separately approved cutover, ACP-011's existing operational boundary still applies.
- [ACP-008 — owned CRM candidate](ACP-008-MIDWESTGUARD-OWNED-CRM-PRODUCTION-CANDIDATE.md) remains valid evidence of the owned-platform prototype and its unmet production gates. This ACP replaces ACP-008's **preferred strategic CRM implementation candidate** with an OFBiz-native CRM evaluation target. ACP-008 did not authorize production adoption; the owned platform is neither silently deleted nor designated Nexus. Its demonstrated capabilities and outstanding requirements remain comparison/exit evidence. The other ACP-008 on skill packaging is unaffected.
- [ACP-005](ACP-005-INTERIM-ESPOCRM-BRIDGE-AND-ERP-BETA.md) continues to protect EspoCRM's operational bridge and rollback function. [ACP-004](ACP-004-DURABLE-OPEN-SOURCE-BUSINESS-PLATFORM.md) continues to require freedom, maintenance, upgrade, restore and independent reconstruction evidence. [ACP-012](ACP-012-MIDWEST24-DOCUMENT-SERVICES.md) is Proposed, with a bounded approved shared Document Services repository assignment; this ACP does not promote its unrun implementation gates to PASS or authorize service deployment.

## Job and document-filing authority

The native OFBiz Job/WorkEffort is the target authoritative business record. The human-readable job number remains the governed business key; native immutable IDs and versioned source-system references prevent a renamed/reused business key from silently relinking documents. A document is identified by a durable Midwest24 document ID and verified SHA-256 of an exact version. The same document may relate to Job, customer, property, Work Order and accounting context; relationships have purpose, authorization, provenance, effective state and audit history. A shared document must not be copied into multiple business-authoritative binaries.

Midwest24 Document Services/object storage owns canonical document/version identity and canonical bytes under the bounded ACP-012 assignment. Enterprise owns the business relationships, authorization decisions, filing state and business audit, and stores references to Document Services document/version IDs plus integrity hashes. Document Services must validate its own byte-access authorization and record shared document lifecycle/relationship events; an OFBiz link does not itself grant byte access. The two systems reconcile by immutable IDs, version/hash and correlation ID. Filenames, folder paths, OCR results and human-readable job numbers are not canonical document identity. This split avoids two independent allocators or conflicting document histories; final shared-service implementation and integration remain separately gated.

Filing resolution has three distinct states: `M24_LINK_MATCHED` for a verified exact source mapping to valid native objects; `M24_LINK_REVIEW_REQUIRED` for one or multiple plausible business-key candidates or an incomplete mapping; `M24_LINK_UNMATCHED` for no candidate or an invalid/missing target. OCR, extracted job number and other heuristics may create candidates or a staged filing intent, never an authorized business relationship or file attachment by themselves. Staging an intent is a metadata write, distinct from filing/attaching. A separate authorized filing decision must recheck Job, customer/property/work-order scope, source provenance, document ID/hash, ambiguity resolution and idempotency before any relationship is established; retain initiating and executing identities and correction history. No generic privileged gateway or production document import is authorized.

## Required preconditions for a revised A16

Before any A16 write test, amend the representative business POC specification with exact synthetic scope, role/object authorization, fixtures, positive and negative states, transaction/rollback, idempotency, relationship and audit assertions, isolation and stop conditions. Correct the current proposed resolver so that exact source keys honor recorded link state and verify native OFBiz objects; ambiguous business keys require review; authenticated access alone never authorizes CRM/document objects. Include seeded synthetic links before service validation. Test intent staging separately from filing; production EspoCRM access and real customer data remain excluded.

A16 may then be approved as a **separate isolated synthetic gate**. A passing smoke check does not grant CRM authority, replace the bridge or authorize migration. Production migration additionally requires semantic/relationship fidelity, bounded interfaces, permissions, document/version integrity, full backup/restore/reconstruction, rollback rehearsal, usability and separately approved acceptance/cutover. A15 remains BLOCKED until an eligible Apache patch target and scope are approved. A01–A14 evidence remains PASS; overall platform evaluation remains CONDITIONAL.

## Approval boundary

This approved ACP authorizes updating the *target architecture and evaluation contract*, not deployment, A16 execution, production migration, EspoCRM removal, an OFBiz version upgrade or a new public endpoint. ACP-008 and ACP-011 retain their historical approvals and all unaffected requirements. Each subsequent gate requires its own review and authorization.
