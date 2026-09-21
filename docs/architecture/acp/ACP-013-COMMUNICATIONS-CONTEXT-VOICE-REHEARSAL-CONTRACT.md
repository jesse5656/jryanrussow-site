# ACP-013 Implementation Contract — Communications Context Rehearsal: Voice Call Metadata

Version: 1.5.0

Status: Approved

Implementation authorization: Private, de-identified rehearsal only

Type: Implementation contract addendum

Authority: Systems Architect Discipline

Approved: 2026-09-20

Amended: 2026-09-20 — Required an explicit private canonical CRM fixture chain
before Voice business acceptance. The Voice launcher orchestrates governed
interfaces only and owns no CRM relationship resolution.

Amended: 2026-09-20 — Recorded the native `UserLogin.enabled` compatibility
ruling for Slice 1/2 bootstrap preflight. The Voice executor receives no
administrative authority and the launcher may not mutate the admin row.

Amended: 2026-09-21 — Added private reconciliation fixture coverage for one
conflicting historical CDR and one bounded outage window. This does not change
the Voice model, reconciliation semantics, provider claims or r16 results.

Amended: 2026-09-21 — Added one private no-human-scope Call fixture to prove
that persisted Voice metadata is excluded without an effective object scope.
This does not change authorization resolution, scope semantics or r18, r21 or
r22 evidence.

Closed: 2026-09-21 — The private Voice Communications Context Rehearsal passed
all governed acceptance rows. This closure does not authorize a live provider
integration, Voice cutover, communications authority transfer or EspoCRM
retirement.

Scope: One private, de-identified rehearsal of Net2phone voice-call metadata
and reconciliation semantics in Midwest24 Core Enterprise. This is not a live
provider integration, provider credential, webhook subscription, API client,
test call, routing change, EspoCRM change, production migration or capability
cutover.

## Decision

The first Communications Context Rehearsal is **voice-call metadata only**.
Voice is selected because it supports the active MIDWESTGuard cash engine,
currently has account-visible voice and Main Ring Group use, provides stable
provider call/resource identity, supports authenticated webhooks, and has
historical call-detail retrieval as a recovery/reconciliation path when webhook
delivery has no retries.

SMS/MMS is deferred because historical message reconciliation and replay are not
established and only one number has active 10DLC registration. Voicemail,
recording metadata and all recording, voicemail, transcription or message
content are deferred as dependent follow-on capability; they must not be
silently bundled into voice-event ingestion.

## Governing evidence and boundaries

- [OCP-012](../ocp/OCP-012-MIDWESTGUARD-COMMUNICATIONS-ARCHITECTURE.md) owns
  the transport/CRM boundary and records the completed assessment.
- `NET2PHONE-CAPABILITY-ASSESSMENT.md` has SHA-256
  `4ffd2e8efc0f9452acddf000c78fc71eed2673f49d98bc892fe1161dd90c47a9`.
- `MIDWESTGuard-Net2phone-Capability-Assessment-2026-09-20.zip` has SHA-256
  `d7c67b84be25f8217590bb18f2653350e2c89d92aa9c1a9968f44e060d858388`.
- The completed CRM Replacement Slices 1–4 supply the canonical Lead,
  Opportunity, Customer, Contact, Property and Activity foundations. They do
  not transfer current communications authority.

EspoCRM/Core Command remains authoritative for live communications context. A
passing rehearsal does not authorize an Espo write freeze, read-only conversion,
provider configuration, production integration, authority transfer or retirement.

## Rehearsal closure evidence — 2026-09-21

The **Voice Communications Context Rehearsal is CLOSED / PASS**. It proved the
fresh canonical CRM prerequisite chain, Call/Event identity, provider-key
replay/conflict, matching states, historical CDR reconciliation, explicit
`CONFIRMED`/`RECOVERED` distinction, outage recovery, scoped human access,
fixed desktop/mobile views, independent reconstruction and integrity/semantic
tamper detection. The final private candidate image is
`sha256:ab42e12aa3205484d1d987f91e4b712cde0540a58cd584d410070019ad22b2ab`.

| Evidence | SHA-256 |
| --- | --- |
| Normalized Voice artifact (`normalized-voice.json`) | `c6e135b982366bbe2f841f1f248a15faa3a4f56434b2e6a82966c58f88594e78` |
| Semantic tamper matrix (`voice-semantic-tamper-matrix.json`) | `9239a3c78a3d490385d2867d42ca5bee68635b2499e48bc610ecaaaf9994c663` |
| Final visual acceptance (`r25-visual-acceptance-summary.json`) | `f6179ea902d46951905c61ac72d9881c74d3a36552d5be82adef3850e22d4468` |
| Final contract matrix (`final-contract-matrix.json`) | `132e317671c23e32de7469b1fb528e478c97f1cf88a3a950e26e6ee40a07314a` |
| r18 launcher receipt | `f907f693add8025e49227bec65cadea249ee8805beee821d78d973bbc854b996` |
| r18 reconciliation results | `8517409167cf66fdda3bafa4b9fca12ef5bbb2abbaabf22840fc6119444e7160` |

The normalized artifact reconstructs five Calls and six Events. Integrity-only
tamper returns `VOICE_INTEGRITY_MISMATCH`; all 22 semantic-tamper cases pass.
The out-of-scope collection denial and direct-detail HTTP `404 Not Found`
evidence pass. `M24P_CRM_EXEC` remains excluded, the Worker/model remains
non-authoritative, and secret/content scanning passes.

No Net2phone or OAuth credential, API key, webhook, live provider API, live
Voice ingestion, test call, routing/number/user/ring-group mutation, SMS/MMS
action, recording/audio access or communications-content access occurred.
Provider ordering, duplicate-delivery and replay guarantees, sandbox
availability and applicable retention periods remain UNKNOWN. EspoCRM/Core
Command remains authoritative; no production migration, cutover or EspoCRM
abandonment is authorized. A later communications capability requires a new
governed selection and implementation contract.

## Canonical CRM prerequisite chain

Voice business acceptance requires a fresh isolated prerequisite graph in this
order: Slice 1 `CANONICAL`; Slice 2 `WEBSITE`; Slice 3 `CANONICAL_CHAIN`; then
Slice 4 `MEETING_PLANNED_CANONICAL_CHAIN`. The final Activity must retain typed
CRM links and immutable relationship bindings to the same canonical Customer,
Contact, Property, Lead and Opportunity resolved by those four governed
interfaces.

The Voice launcher may invoke those interfaces, pass their governed fixture IDs
and verify their declared outputs. It must not create CRM targets, implement
Opportunity relationship resolution, inject native IDs, bind IDs manually,
reuse a database, restore a prior runtime or create a second source-mapping
model. A prerequisite failure stops Voice acceptance; it is not repaired in the
launcher. The chain has no giant cross-slice transaction: completed upstream
slices must replay safely and a resumed run proceeds deterministically from the
first incomplete governed slice.

The Slice 1 and Slice 2 administrator preflights use the narrowly governed
native-compatible active predicate: existing `admin`, `enabled != 'N'`, and
empty `disabledBy`. Null `enabled` is not a reason to mutate the private admin
row. The Voice executor remains isolated from admin identity, groups,
permissions and configuration; the Voice launcher must not reset credentials,
clear lockout state, set `admin.enabled`, or invoke administrator recovery.

## Included event and content scope

The rehearsal includes only de-identified voice call **metadata** for an
admitted finite fixture schema: call resource identity, event identity/type,
direction, provider and received timestamps, internal number, internal
user/extension where present, external participant identifier, disposition/state
and provider-account alias. It may model inbound, outbound, ringing, answered,
completed and missed-call evidence only where each is represented in the frozen
fixture schema.

Excluded: SMS/MMS, voicemail, voicemail transcription, recording metadata,
recording/audio content, call notes/transcripts, attachments, caller content,
click-to-call, routing/IVR/ring-group behavior, number management, provider
administration and generic omnichannel sessions. No content byte or body enters
Enterprise through this rehearsal.

## Canonical identity and history

Enterprise creates a generated canonical `M24CommunicationCall` identity for
each provider call/session. The unique provider key is:

`(providerId=NET2PHONE, sourceAccountId, providerCallResourceId)`.

`sourceAccountId` is a stable non-secret assessment/fixture alias; it is not a
hostname, credential or Enterprise primary key. The provider call/resource ID
is source provenance and correlation input, never the Enterprise canonical ID.
One provider call/session may have many immutable `M24CommunicationEvent`
records. Each event has a generated Enterprise ID and a unique provider key:

`(providerId, sourceAccountId, providerEventId)`.

An event records channel `VOICE`, direction, event type, provider timestamp,
received timestamp, source payload hash, normalized metadata, provider
provenance and attributable actor/executor/receipt evidence. The call identity
is separate from events because one call may produce ordered or unordered
provider observations. A source status is retained as evidence; it is not
silently normalized into a business lifecycle without the frozen mapping.

## CRM matching and relationship rule

External telephone identity is not authoritative CRM identity. The private
fixture may resolve an event only through an exact normalized E.164 number that
maps to exactly one active, effective-dated canonical Enterprise contact
mechanism and its existing governed CRM relationships. It may then create
effective-dated typed links to the applicable Contact, Customer, Lead,
Opportunity or Property only when that relationship is already explicit in the
fixture's canonical graph.

No address, name, descriptive text, shared number, inferred household or
plausible relationship may resolve a call. Zero candidates create an explicit
unmatched event. More than one candidate creates an immutable
`REVIEW_REQUIRED` ambiguity with no authoritative CRM link. A reviewer may
record a later, attributable explicit canonical-ID resolution without rewriting
the original event or ambiguity history. Historical links retain their effective
period; a later correction does not alter prior attribution.

## Webhook, reconciliation and idempotency rule

The private rehearsal uses only frozen de-identified provider-shaped fixtures
and synthetic delivery envelopes derived from the documented assessment schema.
It creates no provider credential, webhook subscription, API client, test call
or read of live call content or metadata.

For every accepted event, the same provider event identity and normalized
payload hash is an exact replay and returns the original effect without a
duplicate call, event, link, receipt or exception. The same provider event
identity with a materially different normalized payload is an explicit conflict
and writes no replacement event. Out-of-order delivery may append a newly
observed immutable event to its canonical call but never rewrite established
history; deterministic reconstruction orders by provider timestamp, then
received timestamp, then canonical event ID.

Webhook receipt is not provider truth. The canonical flow is:

`provider event → normalized receipt/evidence → immutable Enterprise event → reconciliation`.

For the rehearsal, a frozen de-identified historical call-detail fixture is the
reconciliation authority. Reconciliation creates a missing-call or missing-event
exception, or imports the missing provider record through the same idempotent
path; it never fabricates a provider event. A duplicate between webhook-shaped
and historical evidence resolves through the same provider event/call key and
does not duplicate Enterprise history. Reconciliation conflict, missing provider
identity, absent required timestamp or non-admitted fixture field stops the
affected transaction for review.

### Additive reconciliation fixture coverage

This is a **PRIVATE VOICE RECONCILIATION FIXTURE-COVERAGE GAP**. It is not
evidence of an algorithm, provider-capability, Call/Event identity or CRM
matching defect. The exercised r16 results remain valid. The following frozen
fixtures exercise existing acceptance semantics without changing the data model
or reconciliation path.

#### `CDR_CONFLICT`

First import the existing `INBOUND_ANSWERED` fixture. Then submit
`CDR_CONFLICT` through `RECONCILE_CDR` with the same provider keys:

| Field | Frozen value |
| --- | --- |
| Provider/source namespace | `NET2PHONE` / `NET2P_PRIVATE_ACCOUNT_A` |
| Provider Call resource ID | `voice-call-001` |
| Provider Event ID | `voice-event-001-answered` |
| Baseline direction | `INBOUND` |
| Conflicting CDR direction | `OUTBOUND` |
| All other normalized fields | Byte-for-byte equivalent to `INBOUND_ANSWERED` |

Direction is the sole contradictory immutable normalized field. The expected
result is the existing canonical denial `VOICE_IDEMPOTENCY_CONFLICT`. The
original Call, Event, provider mappings, normalized payload, match evidence and
typed CRM links remain unchanged. No second Call/Event, successful recovery
receipt, reconciliation-success row or arbitrary winner is created. The
non-secret denied service result together with before/after normalized export is
the required conflict evidence. Replaying the same conflicting CDR returns the
same denial and leaves the graph unchanged.

#### `OUTAGE_WINDOW_RECOVERY`

`OUTAGE_WINDOW_RECOVERY` is a fixture family using
`NET2PHONE` / `NET2P_PRIVATE_ACCOUNT_A`. It simulates no webhook-equivalent
delivery during the closed interval **2026-09-21T17:00:00Z through
2026-09-21T17:10:00Z**. It makes no claim about Net2phone replay, retention or
ordering behavior.

| Selector | Provider Call resource ID | Provider Event ID | Provider timestamp | Received timestamp | Required state |
| --- | --- | --- | --- | --- | --- |
| `OUTAGE_WINDOW_PARTIAL` | `voice-call-017-outage` | `voice-event-017-ringing` | `2026-09-21T16:59:50Z` | `2026-09-21T16:59:55Z` | Import before the outage; one existing Call and Event. |
| `OUTAGE_WINDOW_RECOVERY_CALL` | `voice-call-016-outage` | `voice-event-016-completed` | `2026-09-21T17:02:00Z` | `2026-09-21T17:11:00Z` | Historical CDR recovery of a wholly missing Call/Event. |
| `OUTAGE_WINDOW_RECOVERY_EVENT` | `voice-call-017-outage` | `voice-event-017-completed` | `2026-09-21T17:06:00Z` | `2026-09-21T17:11:05Z` | Historical CDR recovery of an Event missing from the known Call. |

Every outage selector uses admitted `VOICE`/`INBOUND`/`COMPLETED` or `RINGING`
metadata as applicable, internal number `+15550109999`, external participant
`+15550100001`, and normal E.164 matching. Therefore every recovered Event has
match state `MATCHED`; no fixture freezes an Enterprise-native ID.

After importing `OUTAGE_WINDOW_PARTIAL`, reconcile the two recovery selectors
through the existing historical CDR command. The required delta is exactly one
new canonical Call and two new canonical Events: the wholly missing Call/Event
pair for `voice-call-016-outage`, and the missing completed Event under the
already known `voice-call-017-outage`. Reconciliation must retain
`HISTORICAL_CDR` provenance, produce `RECOVERED` classifications, preserve each
provider key, and reconstruct chronology by provider timestamp. It must neither
invent unrepresented events nor bypass identity or CRM matching.

Replaying the identical outage family is inert: it returns the same canonical
Call/Event IDs and `MATCHED` states with no duplicate graph. The fixture proves
Enterprise recovery behavior only. Provider webhook retry, provider replay,
ordering and duplicate-delivery guarantees, sandbox availability and retention
periods remain UNKNOWN.

### Additive authorization fixture coverage

This is a **PRIVATE VOICE AUTHORIZATION FIXTURE-COVERAGE GAP**. It is not
evidence of a scoped-authorization, principal-resolution, fixed-view, Call
persistence or CRM-matching defect. The exercised r18 reconciliation, r21
reconstruction/tamper/scoped-view, and r22 fixed reconciliation-view results
remain valid.

#### `OUT_OF_SCOPE_CALL`

`OUT_OF_SCOPE_CALL` is one additional de-identified historical-CDR selector.
It must enter through the ordinary `RECONCILE_CDR` ingestion/reconciliation
path, never through direct entity creation. Its frozen provider evidence is:

| Field | Frozen value |
| --- | --- |
| Provider/source namespace | `NET2PHONE` / `NET2P_PRIVATE_ACCOUNT_A` |
| Provider Call resource ID | `voice-call-018-out-of-scope` |
| Provider Event ID | `voice-event-018-out-of-scope-completed` |
| Channel/direction/status | `VOICE` / `INBOUND` / `COMPLETED` |
| Provider timestamp | `2026-09-21T18:00:00Z` |
| Received timestamp | `2026-09-21T18:00:05Z` |
| Internal number | `+15550109999` |
| External participant | `+15550100001` |
| Expected match/reconciliation state | `MATCHED` / `RECOVERED` with `HISTORICAL_CDR` provenance |
| Frozen scope policy | `NO_HUMAN_VIEW_SCOPE` |

`NO_HUMAN_VIEW_SCOPE` is a fixture policy, not a new authorization model or a
native identifier. The normal ingestion path creates the Call, Event, canonical
CRM links, receipt and reconciliation evidence. It deliberately creates **no**
effective `M24CommunicationScopeGrant` for this Call: no `VIEW` or
`RECONCILE` grant for `M24P_COORDINATOR`, and no `VIEW` grant for
`M24P_REVIEWER`. It must reach this state by governed fixture scope omission at
creation time, never by deleting, disabling, expiring or directly editing a
grant. The noninteractive `M24P_VOICE_INGEST` identity receives no human view
grant.

This Call is intentionally out of scope to both human review identities while
remaining a valid persisted, matched and reconciled Call. Its match or recovery
state cannot alter the denial: scope filtering precedes presentation-state
filtering. No native OFBiz ID is part of this fixture contract.

`OUTAGE_WINDOW_RECOVERY_CALL` is the positive control in the same acceptance
run. It retains its ordinary active/effective `VIEW` scope for
`M24P_COORDINATOR` and `M24P_REVIEWER`, and proves that both otherwise valid
human principals can still access an in-scope recovered Call.

## Authorization and retention boundary

The private provider-ingestion executor is noninteractive and limited to this
fixture import/reconciliation command. It has no routing, number, user,
extension, provider-administration, CRM mutation, generic service or human-login
authority. Human Communications Review may read only authorized metadata and
review unmatched/ambiguous results; Human Communications Reconciliation may run
the bounded reconciliation command. Both require object/action scope and neither
receives provider administration or content access.

Enterprise retains only fixture-normalized metadata, provider identifiers,
timestamps, canonical links, payload hashes, receipts, exceptions and
reconciliation evidence required for the private acceptance record. Provider
retention periods remain unknown. This contract establishes no production
retention period, no content retention and no deletion policy.

## Acceptance matrix

Acceptance requires all of the following in fresh isolated state:

1. baseline import creates one canonical call and immutable admitted voice-event
   history from de-identified fixtures;
2. exact unique E.164 matching links only the supported canonical CRM graph;
   unmatched and ambiguous cases remain visible without inferred identity;
3. exact replay, altered-payload conflict, concurrent delivery and duplicate
   provider event behavior are deterministic;
4. out-of-order event delivery reconstructs deterministically without history
   rewrite;
5. historical call-detail reconciliation detects and recovers a missing event
   through the same idempotent path; conflicting evidence becomes explicit;
6. rollback/retry, restart/recreation, independent reconstruction and semantic
   tamper detection preserve call/event/link/provenance invariants;
7. positive and denial authorization, scoped metadata views, desktop and mobile
   human review, provider-outage handling and Worker/model independence pass;
8. no routing, provider configuration, credential, live ingestion, production
   data, production EspoCRM API access, LAN action or communications content is
   introduced.
9. the fresh governed prerequisite chain creates one canonical Customer,
   Contact, Property, Lead, Opportunity and Activity; the Activity's five typed
   links and immutable bindings name those exact targets; whole-chain replay
   creates no duplicate Party, Facility, Lead, Opportunity, WorkEffort, CRM
   link, binding, source mapping or receipt.
10. `CDR_CONFLICT` yields `VOICE_IDEMPOTENCY_CONFLICT` with unchanged Call,
    Event, provenance and CRM match state; the recorded conflict evidence proves
    no successful recovery or replacement graph occurred.
11. the `OUTAGE_WINDOW_RECOVERY` family recovers exactly one missing Call and
    two missing Events through the ordinary historical CDR path, preserves
    provider identity, chronology, `MATCHED` state and reconciliation
    provenance, and replays inertly.
12. an authenticated, enabled `M24P_COORDINATOR` with `M24_VOICE_VIEW` can
    list and open the in-scope `OUTAGE_WINDOW_RECOVERY_CALL`; the same
    principal cannot see `OUT_OF_SCOPE_CALL` in `all`, `inbound` or
    reconciliation views, or any state-filtered collection, and its direct
    Call-detail request returns the established HTTP `404 Not Found` result.
    No coordinator `VIEW` or `RECONCILE` scope grant exists for that Call.
13. `M24P_REVIEWER`, with its ordinary `M24_VOICE_VIEW` group permission, can
    view the in-scope positive-control Call read-only and cannot see or open
    `OUT_OF_SCOPE_CALL`; its direct Call-detail request also returns HTTP
    `404 Not Found`. Interactive use of disabled/noninteractive
    `M24P_VOICE_INGEST` remains denied or unavailable. The run proves no
    change to coordinator/reviewer global permissions, Voice-executor
    permissions, or `M24P_CRM_EXEC` membership, and no new broad Voice
    permission.

## Stop conditions and production boundary

Stop and return to governance if the frozen source schema cannot establish a
stable provider event or call identity; historical call-detail retrieval cannot
serve as the stated reconciliation source; matching would require inference;
metadata-only scope becomes insufficient; provider behavior contradicts the
assessment; an unknown entitlement is required; or any test needs a live
provider action.

A private pass is not a live channel cutover. A later production gate must
separately approve provider credentials and configuration, webhook/API
registration, routing safety, monitoring, reconciliation operations, rollback,
authority matrix, Espo transition, support ownership, retention and any content
handling.
