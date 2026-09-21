# ACP-013 Implementation Contract — CRM Replacement Slice 4

Version: 1.3.0

Status: Approved

Implementation status: Closed / Pass

Type: Implementation contract addendum

Authority: Systems Architect Discipline

Approved: 2026-09-19

Amended: 2026-09-19 — Activated as the bounded private CRM-completion workstream under the MIDWESTGuard Business Recovery / Cash Engine objective; scope and non-cutover boundaries are unchanged.

Amended: 2026-09-19 — Governed the source Appointment Confirmed and Appt Resulted progression as immutable Opportunity checkpoints under `M24_OPP_OPEN`, preserving the source Appointment prerequisite without inventing a Won/Lost transition.

Closed: 2026-09-20 — Private, de-identified rehearsal passed at implementation
commit `0392835069891e034692fe0e8c9c6d749794b7dd`. This closure does not
authorize production communications, migration, authority transfer or cutover.

Amended: 2026-09-20 — Added one private canonical-chain Activity fixture for
the governed Voice prerequisite. The closed Slice 4 fixture set and its
acceptance evidence remain unchanged.

Scope: A private, de-identified Activity and Follow-up foundation rehearsal from
current EspoCRM configuration into Midwest24 Core Enterprise. This is not a
production migration, record-family cutover, channel integration, calendar or
reminder deployment, conversion, Job/Work Order creation, document service, or
live-routing change.

## Decision

The next bounded CRM replacement capability is **CRM Replacement Slice 4 —
Activity and Follow-up Foundation Rehearsal**. The approved private rehearsal is
closed/pass. The prior Operating Plan activation is satisfied and does not
authorize new application work, production migration, authority transfer or
cutover.

The rehearsal must freeze current Espo Activity, Task and Meeting configuration
before target implementation. It must demonstrate a representative,
source-instance-qualified Activity and Follow-up graph against the completed
Lead, Opportunity, Customer, Contact and Property foundations without changing
current authority. EspoCRM/Core Command remains the operational authority for
activities and follow-up until a separately approved capability cutover.

## Why this capability is bounded and next

The approved migration program places activities and follow-up after the stable
Opportunity graph and before communications integration. The Espo customization
evidence includes Task and Meeting configuration, an Appointment meeting type,
reminder presentation and Opportunity appointment guards. These are
current-state requirements evidence, not authorization to copy Espo mechanics or
to activate a channel, calendar or reminder engine.

Apache OFBiz native `WorkEffort` and its native party/assignment and status
primitives are candidate activity foundations because they can represent bounded
work, due/completion state and assignment. They are not pre-approved as a
semantic substitute without the required model-admission and parity result. The
implementation must stop and return to governance if they cannot preserve the
frozen business meaning without an ungoverned duplicate identity or lifecycle.

## Governing authority

- [ACP-013 EspoCRM Replacement Migration Program](ACP-013-ESPOCRM-REPLACEMENT-MIGRATION-PROGRAM.md)
  selects activities and follow-up after Opportunity and before communications.
- [ACP-013 CRM/ERP Authority Transition](ACP-013-MIDWEST24-CRM-ERP-AUTHORITY-TRANSITION.md)
  requires capability-by-capability transition and a separate cutover.
- [OCP-012 Communications Architecture](../ocp/OCP-012-MIDWESTGUARD-COMMUNICATIONS-ARCHITECTURE.md)
  keeps transports, sessions and each Espo transition under separate bounded
  contracts.
- [ACP-012 Document Services](ACP-012-MIDWEST24-DOCUMENT-SERVICES.md) remains
  Proposed and does not authorize document-byte or document-service work here.
- CRM Replacement Slices 1–3 and A16 provide reusable private identity,
  relationship, provenance, authorization, replay, reconstruction and
  non-authoritative AI controls. They do not transfer live authority.

## Current-state baseline and parity gate

Before implementation, inspect the preserved Espo customization repository
read-only and create a frozen Activity/Task/Meeting source-schema and
configuration manifest. It must inventory every business-relevant native or
custom field, enum/default, required state, relation, layout/search panel,
status, reason, owner/assignment rule, task/meeting/appointment behavior,
due/completion semantic, recurrence/reminder/queue behavior, ACL/team rule,
hook/formula/workflow, integration and available-history statement.

Create an Espo-to-Enterprise parity register that classifies every item exactly
once as exact parity, OFBiz-native equivalent, owned Enterprise extension,
governed intentional change, deferred, or obsolete by authority. The register
must have zero unclassified items before final acceptance. A deferred item must
name its later capability and may not be presented as implemented parity.

## Target and identity boundary

Use a native OFBiz activity identity only after the model-admission gate proves
that it preserves the frozen activity business meaning. If `WorkEffort` is
admitted, preserve its native identity; owned extensions may supply only proven
missing semantics such as immutable attributable migration history,
source-instance provenance, effective-dated CRM links, receipts and exceptions.
Do not create an owned duplicate Activity identity for convenience.

Activity relationships must use canonical Enterprise identities. A source ID is
provenance only and must never be a Lead, Opportunity, Party, Person or Facility
identity. The target must distinguish an Activity's relation to Lead,
Opportunity, Customer, Contact and Property where the frozen source permits it;
ambiguous or unmatched relationships remain explicit exceptions rather than
forced matches. Do not infer a relationship from descriptive text, shared address
or source ID alone.

## Included private rehearsal

When activated, the rehearsal may use only de-identified fixtures and fresh
isolated OFBiz 24.09.07 state to prove the admitted bounded Activity and
Follow-up graph, including:

- source identity, mapping/version, provenance and available-history finding;
- controlled activity/task/appointment type and lifecycle mapping;
- due, completion and owner/assignment semantics actually configured in source;
- immutable history or an explicit honest incomplete-history representation;
- canonical Lead, Opportunity, Customer, Contact and Property relationships
  where source evidence supports them;
- least-privilege human read/review and state-valid action boundaries;
- deterministic replay, concurrent first-time import when applicable,
  altered-payload conflict, duplicate/ambiguity/malformed input handling,
  atomic rollback/retry, restart/recreation and independent reconstruction;
- desktop and approximately 390px rendered human acceptance for every
  human-facing parity item; and
- Worker/model/vector unavailability and no authoritative client/model state.

A machine-readable Activity surface is not presumed. If the frozen parity and
integration evidence establish an applicable noninteractive consumer need, a
separately versioned least-privilege read contract must be defined in the
implementation evidence; it is read-only, bounded, deterministic and optional
to core Enterprise operation. AI receives no mutation, administration, raw
Entity Engine, database, browser-scraping or broad-export authority.

### Canonical-chain Activity fixture interoperability

`MEETING_PLANNED_CANONICAL_CHAIN` is an additive private fixture. Its Activity
source tuple is `(ESPOCRM, ESPOCRM_ACTIVITY_REHEARSAL_A, MEETING,
77aa00000000000000000026)`. It must resolve, without provisioning targets,
the exact canonical graph established by the prior fixtures:

| Link | Required source tuple |
| --- | --- |
| Customer | `(ESPOCRM, ESPOCRM_REHEARSAL_A, ACCOUNT, 5f0000000000000000000001)` |
| Contact | `(ESPOCRM, ESPOCRM_REHEARSAL_A, CONTACT, 5f0000000000000000000002)` |
| Property | `(ESPOCRM, ESPOCRM_REHEARSAL_A, REAL_ESTATE_PROPERTY, 5f0000000000000000000004)` |
| Lead | `(ESPOCRM, ESPOCRM_LEAD_REHEARSAL_A, LEAD, 65aa00000000000000000001)` |
| Opportunity | `(ESPOCRM, ESPOCRM_OPPORTUNITY_REHEARSAL_A, OPPORTUNITY, 66bb00000000000000000118)` |

The importer must require exactly one `M24CrmRecordLink` in
`M24_LINK_MATCHED` state for every tuple and require the canonical target it
names. It must create one native `WorkEffort` only after resolving all five
targets, then create its typed `M24ActivityCrmLink` records and immutable
`M24ActivityRelationshipBinding` rows with those exact source tuples and target
IDs. A missing, ambiguous, contradictory, inactive or malformed mapping fails
without Activity, target, link, binding, receipt or fallback-target creation.

The existing fixture-target provisioning behavior remains available only to the
already governed non-canonical fixtures. It is prohibited for this fixture.
Exact replay, concurrent replay, restart/recreation and independent
reconstruction must retain the same `WorkEffort`, five typed links and five
immutable bindings. This amendment does not rewrite, replace or revalidate the
closed Slice 4 fixture evidence.

## Appointment progression checkpoint

The preserved source hook is a lifecycle-transition prerequisite: `Appointment Confirmed` requires a canonical Opportunity-parented Appointment Meeting in `Planned`; `Appt Resulted` requires one in `Held`. It is neither a prerequisite for `M24_OPP_OPEN -> M24_OPP_WON` nor for `M24_OPP_OPEN -> M24_OPP_LOST`.

Slice 4 shall represent these meanings through one owned, immutable, source-instance-qualified Opportunity checkpoint history under the existing native `SalesOpportunity` identity:

| Source meaning | Canonical checkpoint | Required qualifying Activity |
| --- | --- | --- |
| Appointment Confirmed | `M24_OPP_APPOINTMENT_CONFIRMED` | same canonical Opportunity; `WorkEffort` Meeting; governed subtype `Appointment`; history-consistent current Meeting state `Planned` |
| Appt Resulted | `M24_OPP_APPOINTMENT_RESULTED` | same canonical Opportunity; `WorkEffort` Meeting; governed subtype `Appointment`; history-consistent current Meeting state `Held` |

The existing bounded `m24CommandOpportunityLifecycle` command is the sole server-side command boundary. It may add only a finite `RECORD_APPOINTMENT_CHECKPOINT` action with the two canonical checkpoint identifiers. It must first retain existing Opportunity command authorization and effective `TRANSITION` scope, then evaluate the qualifying Activity predicate against canonical `WorkEffort`, `M24ActivityMetadata`, `M24ActivityHistory`, and active typed `M24ActivityCrmLink`. Zero qualifying records deny with `OPPORTUNITY_APPOINTMENT_PREREQUISITE_DENIED`; one or more qualify deterministically by existence. Ordinary Meetings, Tasks, another Opportunity's Appointment, a non-Opportunity link, `Not Held`, malformed links, and history/projection inconsistency do not qualify.

A successful checkpoint appends one immutable, attributable owned Opportunity-checkpoint event linked to the canonical Opportunity and qualifying Activity, preserves the Activity unchanged, and uses the existing operation receipt/payload idempotency model. A denial writes no Opportunity projection, history, Activity, relationship, or successful receipt. Checkpoint history, source status, qualifying Activity identity, mapping version and payload linkage are required reconstruction evidence. A replay returns the original checkpoint effect without a duplicate.

The Activity and Opportunity human views must present the checkpoint and its qualifying Appointment context where authorized. UI presentation is advisory; command enforcement is authoritative. Slice 3 native stages and existing Won/Lost command semantics remain unchanged.

## Explicit exclusions and deferred scope

This slice must not implement or activate communications channels, net2phone,
email, SMS, chat, voicemail, call history, live human handoff, channel session
state, calendar dispatch, recurrence engine, reminder delivery, production
queues, or provider credentials. It may classify the corresponding current Espo
configuration as deferred and preserve source provenance only.

It also excludes BR-038, accepted scope, signed contracts, Lead/Opportunity
conversion, `M24LeadConversion`, `SalesOpportunityWorkEffort`, Jobs, Work
Orders, documents/document bytes/Document Services, estimates, production
integration, production EspoCRM API access, production migration, reporting
beyond rehearsal reconciliation, accounting, procurement, inventory, warranty,
A15, A17, LAN deployment, authority transfer and cutover.

## Communications, documents and conversion dependencies

Activities may be governed independently of communications only as durable CRM
activity/follow-up context. OCP-012 requires the exact Enterprise
activity/session model and each Espo transition to be separately bounded; a
future communications contract must validate actual provider capability before
channel work. This slice creates no channel event or transport adapter.

Document Services is not a prerequisite for the bounded Activity rehearsal.
ACP-012 is Proposed and its Phase 1 execution remains separately gated.
Document references, bytes, versions, hashes and access controls remain outside
this slice.

Lead/Opportunity-to-Job conversion remains a separate boundary. This slice may
retain source conversion evidence only when needed as provenance; it may not
write conversion, accepted-scope, Job or Work Order records.

## Security and acceptance requirements

The frozen parity register must define the private non-admin human roles and
required positive and negative authorization cases. Server command authorization
remains authoritative; presentation may show only state-valid, role-valid
controls. No role receives native administration, generic service execution,
broad export, accounting, procurement, inventory or machine credential
management through this slice.

Final acceptance requires a concise contract matrix with evidence for every
row, a non-cutover finding, and a parity finding of **COMPLETE** with zero
unclassified, stale or falsely-complete items. Reconstruct the accepted graph
without direct database or Entity Engine input. Preserve integrity validation
and separately demonstrate integrity-consistent semantic tamper rejection for
identity, lifecycle/history, due/completion, assignment, relationships,
provenance and mapping-version invariants applicable to the admitted model.

## Stop conditions

Stop and return to governance if source configuration requires an ungoverned
activity taxonomy, recurrence/reminder/queue behavior cannot be classified,
communications or document semantics become necessary, a new canonical identity
is required without a demonstrated native deficiency, a relationship requires a
descriptive match, production access/LAN is needed, Apache upstream modification
is required, any replay/rollback/authorization/reconstruction/tamper control
fails, or implementation would alter current authority.

## Operating Plan closure state

The Business Recovery / Cash Engine Operating Plan activated this contract for
its bounded private rehearsal. That rehearsal is now closed/pass. Further work
must follow the CRM Replacement Program's next dependency: the read-only
Net2phone Capability & Integration Assessment, then a separately governed
Communications Context Rehearsal contract before any communications
implementation.

## Non-cutover finding

A passing private rehearsal does not authorize production Activity or Follow-up
migration, authority transfer, EspoCRM write freeze, Core Command change,
communications deployment, LAN deployment or production cutover. EspoCRM/Core
Command remains authoritative until its own capability cutover gate passes.
