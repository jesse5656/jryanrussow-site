# ACP-013 Property Identity Decision — Native OFBiz Facility

Version: 1.0.1

Status: Approved

Type: Architecture Change Proposal decision addendum

Authority: Systems Architect Discipline

Approved: 2026-09-14

Scope: A16 target Property identity only. No implementation, runtime write, production migration, cutover, commit or push is authorized by this decision.

## Scope

- `docs/architecture/acp/ACP-013-FACILITY-PROPERTY-MODEL-DECISION.md`

## Decision and authority

The governing human approved native Apache OFBiz `Facility.facilityId` as Midwest24 Core Enterprise's immutable Property identity candidate under [ACP-013](ACP-013-MIDWEST24-CRM-ERP-AUTHORITY-TRANSITION.md). Use an owned `FacilityType` with ID `M24_PROPERTY` as the service-property profile. This is a target model for isolated evaluation, not operational CRM authority transfer. Do not create a competing Midwest24-owned Property entity. A street address, owner/customer, source-system ID, Opportunity, Job or Work Order never determines `facilityId`.

This decision supersedes only the Property alternatives in the still-Proposed [ACP-013 CRM Identity Model Addendum](ACP-013-CRM-IDENTITY-MODEL-ADDENDUM.md). Its Lead and other unapproved proposals remain Proposed. It does not rewrite ACP-011, ACP-008, the approved ACP-013 transition, or A01–A14 historical evidence. EspoCRM remains the operational bridge and current CRM authority. A15 remains BLOCKED; A16 remains BLOCKED before implementation/write testing until its full revised contract and other native-model decisions are governed.

## Native relationship contract

- `Facility(facilityId, facilityTypeId=M24_PROPERTY)` is the stable physical service-location identity. `facilityName`, `openedDate` and `closedDate` are descriptive/lifecycle fields, not keys. Do not give a Property inventory, shipping or product-store behavior by default.
- Effective-dated `FacilityParty(facilityId, partyId, roleTypeId, fromDate, thruDate)` is authoritative for owner, occupant and property-contact relations. Use owned role types `M24_PROPERTY_OWNER`, `M24_PROP_OCCUPANT`, `M24_PROPERTY_CONTACT`; participating Parties require corresponding `PartyRole` rows. `Facility.ownerPartyId` is not ownership history; leave it unset unless a separately governed current-owner projection is needed.
- Effective-dated `FacilityContactMech` plus `FacilityContactMechPurpose`, `ContactMech` and `PostalAddress` holds service address history. End-date the old association and create a new address/contact-mechanism association without changing `facilityId`. Distinguish correction from physical move or municipal change in attributable history.
- Native `WorkEffort.facilityId` links the Job `WorkEffort(PROJECT)` and child Work Order `WorkEffort(TASK)` to Property. Child Work Orders inherit their Job's Property for the one-property A16 fixture. Multi-property Job behavior requires a separate decision and cannot be inferred from this model. Native `SalesOpportunityWorkEffort` links Opportunity to Job.
- Native `SalesOpportunity` remains Opportunity identity. One thin owned effective-dated `M24SalesOpportunityFacility(salesOpportunityId, facilityId, associationTypeId, fromDate, thruDate)` supplies the otherwise missing direct Opportunity–Property relation. It must preserve attributable corrections and object scope. Do not create a synthetic WorkEffort solely to connect them.
- Native effective-dated `FacilityContent` and `WorkEffortContent` may express property and work relationships to a shared `Content` reference. Under ACP-013, Midwest24 Document Services still owns canonical document/version IDs and bytes; Enterprise retains references/hashes, filing state, authorization and business audit. Native Content IDs must not become a second canonical document identity or copy of canonical bytes. OCR, filename, path and human Job number do not authorize filing.
- The smallest owned status-history adjunct is `M24FacilityStatus(facilityId, statusId, fromDate, thruDate, changedByUserLoginId, reason)`. Preserve append-only attributable correction evidence for relationship, address, identity merge and status changes; status history alone is not a substitute for those records. Do not merge facilities by equal address alone.

## Authorization and source identity

The owned service boundary must check caller permission, exact `M24_PROPERTY` type, tenant/source instance, time-valid `FacilityParty` and linked Job/Opportunity scope, and action before every read, write, replay or correction. Deny by default. A `FacilityParty` row is a business relationship, not automatic row security. The client cannot choose authorization roles or effective execution identity. Retain initiating human and executor attribution.

Generate `facilityId` independently of JobNimbus/source IDs. Preserve source instance/type/ID and immutable payload hash in a unique, idempotent, attributable external-reference mapping; `FacilityAttribute` alone does not establish that uniqueness. Address matches are review candidates only. Preserve conflicting provenance and a reviewed crosswalk for any historical PartyGroup-as-property fixture; do not reuse a Party ID as a Facility ID or alter A01–A14 evidence.

## A16 boundary and source basis

Before any isolated A16 write test, reconcile the separately approved POC contract and fixture to this model; settle the remaining Lead/Opportunity model admission and exact owned link keys; verify schema and service behavior against pinned OFBiz 24.09.07 source; prove positive/negative object authorization, idempotency, rollback and Document Services boundary read-only. No production EspoCRM access or migration is authorized.

The archived POC source hashes and native-model admission evidence are recorded in `mwg-ofbiz/docs/A16-NATIVE-MODEL-PREFLIGHT.md` and the Proposed identity addendum. Apache's [Facility model explanation](https://cwiki.apache.org/confluence/spaces/OFBENDUSER/pages/357173666/Manufacturing%2BGlossary%2Band%2BIts%2BRepresentation%2Bin%2BApache%2BOFBiz) describes a generalized site/location. The pinned 24.09.07 product model defines `Facility`, dated `FacilityParty`, `FacilityContactMech`, `FacilityContactMechPurpose` and `FacilityContent`; the pinned WorkEffort model supplies `facilityId`. The Apache release-branch model is corroborating source, not a substitute for the pinned build hash.

## 2026-09-14 role identifier correction

Under the governing owner's explicit request to resolve this bounded role ID using the preferred replacement absent a conflict, `M24_PROP_OCCUPANT` (17 characters) is approved as the native `FacilityParty.roleTypeId` and matching `PartyRole`/`RoleType` ID for an occupant of a Midwest24 Property. `M24` identifies the Midwest24-owned namespace, `PROP` means Property and `OCCUPANT` retains the original relationship meaning. The earlier spelling `M24_PROPERTY_OCCUPANT` is 21 characters and is not an executable role ID: pinned OFBiz 24.09.07 maps the native `id` type to PostgreSQL `VARCHAR(20)`, as documented in `mwg-ofbiz/docs/A16-NATIVE-MODEL-PREFLIGHT.md`. No governing abbreviation standard or existing `M24_PROP_OCCUPANT` use conflicts with this bounded correction. The owner and contact IDs remain unchanged.

This corrects only a physical identifier. It does not amend Property identity, `FacilityParty` semantics, authorization, Lead, Opportunity, Job/Work Order or CRM/ERP authority. No Apache schema change, truncated alias, implementation write, commit or push is authorized here. Once the A16 implementation contract is reconciled to this ID and its other approved preconditions are met, A16 may resume under its existing isolated synthetic approval; no further naming or architecture decision is required for this role.
