# ACP-014 — Tenant Reference Verification Survey

Version: 1.0.0

Status: Approved

Type: Architecture Change Proposal and bounded implementation contract

Authority: Systems Architect Discipline

Proposed: 2026-09-16

Approved: 2026-09-16

Scope: Midwest24 Core Enterprise property-management applicant reference verification. This approval authorizes one private, synthetic implementation slice. It does not authorize a production public endpoint, real applicant or reference data, automated housing decisions, screening-vendor activity, or production cutover.

## Scope

- `docs/architecture/acp/ACP-014-TENANT-REFERENCE-VERIFICATION-SURVEY.md`

## Decision

Approve **Property Management Slice 1 — Private Synthetic Tenant Reference Verification** as a new Midwest24 Core Enterprise capability.

The slice proves that an authorized property manager can issue one applicant-scoped reference request, that a reference can complete a secure one-question-at-a-time survey without an OFBiz account, and that Enterprise can preserve the exact presented questions and normalized answers as immutable, replay-safe screening evidence. The response is evidence for human review only. It must not approve, deny, score or otherwise decide a rental application.

This capability requires a new ACP because existing ACP-013 records govern CRM/ERP identity, Property and Job execution but do not establish Rental Application identity, external reference access, survey evidence or housing-screening boundaries. One ACP carries both the architecture and the first bounded implementation contract; a second overlapping contract is unnecessary.

This approval does not reorder or modify Enterprise Operations Slice 2. Implementation may begin when scheduled, but it must remain a separate bounded workstream and preserve other implementation work.

## Governing authority

- ACP-004 governs software freedom, source ownership, restore, export, reconstruction, upgradeability and long-horizon durability.
- ACP-007 governs a coherent Midwest24-owned operational interface, source-controlled business logic, least privilege and independent reconstruction.
- ACP-009 supplies public-input principles: narrow routes, validated bounded input, no browser credentials, abuse controls, immutable identifiers, idempotency and durable acceptance before success.
- ACP-013 and its Facility Property decision govern native Party/Person identity, `Facility(M24_PROPERTY)`, effective-dated relationships, object authorization, immutable attribution and the current-to-target authority boundary.
- OCP-012 keeps email, SMS, telephone and other communications providers as transports rather than record authorities. No delivery provider is selected here.
- The Deterministic Automation Standard requires repository-owned, testable and reproducible branching, normalization, replay and reconstruction behavior.

No current EspoCRM object becomes authoritative through this ACP. No production authority transfers.

## Pinned native-model finding

Read-only inspection of the running pinned Apache OFBiz 24.09.07 image confirmed these native entities:

- `Party`, `Person`, `PartyGroup`, `PartyRole` and effective-dated `PartyRelationship`;
- `Facility`, `FacilityParty`, `ContactMech` and `PostalAddress`;
- `Survey`, `SurveyPage`, `SurveyQuestion`, `SurveyQuestionOption`, effective-dated `SurveyQuestionAppl`, `SurveyResponse` and `SurveyResponseAnswer`;
- native conditional-display fields `SurveyQuestionAppl.withSurveyQuestionId` and `withSurveyOptionSeqId`;
- `Agreement`, `AgreementRole` and `AgreementFacilityAppl`.

The pinned native `createSurveyResponse` service is unauthenticated at the framework boundary and supports response update when configured. Its required-field validation iterates all applied questions without applying the conditional-display rule. It therefore must not be exposed directly for this capability. The Midwest24-owned service must validate the token, request context, immutable survey version and active branch before invoking bounded native writes under a disabled, noninteractive execution principal.

Source basis:

| Pinned source | SHA-256 |
| --- | --- |
| `applications/datamodel/entitydef/content-entitymodel.xml` | `3ad7678bbbd8c7873c52d8ec2ba93f416bc517cbff7467113a1c7696efb1c769` |
| `applications/datamodel/entitydef/party-entitymodel.xml` | `faa79dfd90fb1403b0b3012002881f94101bb2d138e801e532c63e0ce3d6ccb5` |
| `applications/datamodel/entitydef/product-entitymodel.xml` | `9821c27fd5b00f6f7fc7f6be99a475d6a07a94fc8c42fb1cdb2454f0e0449341` |
| `applications/content/servicedef/services_survey.xml` | `14b9474461a202d11bcd724d0d8e42aeba9ce6e0846e787220de835e7edef4ee` |
| `applications/content/minilang/survey/SurveyServices.xml` | `480c62cd1b68ee463243a1b4d67c9eec7799dd8e51da190e7d060d55c9699c87` |

The inspected runtime reported Apache OFBiz `24.09.07`, container image `sha256:b232a274498bf2842e4929b5214b02b6830b07b0e29179889a73e8da98046f94`.

## Native and Midwest24-owned model

| Concern | Governing model | Boundary |
| --- | --- | --- |
| Applicant or tenant | Native `Party` and `Person`, with owned role ID `M24_TENANT_APPLICANT` | One person may have multiple applications. Party identity is never the application identity. |
| Landlord/reference | Native `Party` as `Person` or `PartyGroup`, with owned role ID `M24_LANDLORD_REF` | A request may identify an expected reference Party. Possession of a token proves scoped link control, not verified legal identity. |
| Managed Property | Existing native `Facility(facilityTypeId=M24_PROPERTY)` | The application may point to one target managed Property. This slice does not change Property identity. |
| Rental Application | Owned `M24RentalApplication` with an opaque Enterprise-generated application ID, applicant Party, target Facility, bounded status and timestamps | A rental application is not an executed agreement. Do not misuse native `Agreement` as application identity. |
| Application status evidence | Owned append-only `M24RentalApplicationStatusEvent` | This slice may use a synthetic `SCREENING` state but does not govern approval, denial, lease execution or a broader application lifecycle. |
| Referenced tenancy/address | Owned `M24TenantReferenceContext` linked to the request, applicant, expected reference and a native `PostalAddress`/`ContactMech` snapshot | A third-party referenced address must not create or merge a canonical `M24_PROPERTY` Facility unless separately matched and authorized. Native `Agreement` is not proof of an asserted prior tenancy. |
| Survey definition | Native `Survey`, `SurveyQuestion`, `SurveyQuestionOption` and `SurveyQuestionAppl`, pinned through owned `M24TenantRefSurveyVersion` | Each published version uses immutable native definition rows plus an owned canonical definition snapshot and SHA-256. |
| Survey request | Owned `M24TenantReferenceRequest` | Holds application, expected reference, context, version, status, issuer and issued/opened/submitted/expired/revoked timestamps. |
| External access | Owned `M24TenantReferenceAccess` | Holds request scope, keyed token digest, validity and revocation evidence. Never store the raw token. |
| Native response | Native `SurveyResponse` and `SurveyResponseAnswer` | Created only behind the owned service after full validation. Configure the native Survey with `isAnonymous=Y`, `allowMultiple=N`, `allowUpdate=N`. |
| Immutable submission | Owned `M24TenantReferenceSubmission` | Links the native response and preserves definition/version hash, exact presented-question snapshot, normalized-answer snapshot, payload hash, request/application/reference context and submitted timestamp. No update path. |
| Lifecycle/audit | Owned append-only `M24TenantReferenceEvent` | Records actor or token-scoped subject, effective executor, transition, reason, request/correlation ID, hash and time. |
| Replay | Owned `M24TenantReferenceReceipt` | One opaque submission request ID and canonical payload hash produce one stable result. |
| Staff authorization | Native permission bundle plus time-valid owned `M24PropertyMgmtGrant` for the exact application/request and action | A permission bundle or Facility relationship alone does not grant applicant screening access. |

The owned entity names describe the governing semantics; implementation may refine physical field names without changing identity, immutability, relationships or acceptance criteria.

## Identity and relationship rules

`M24RentalApplication.applicationId` is the canonical application identity. Generate it independently of applicant Party ID, Facility ID, address, email, phone, reference ID or any external source ID.

The target managed Property remains the existing Facility identity. Applicant-to-application, application-to-Facility, request-to-reference and referenced-address relationships must be explicit. Equal names, email addresses, telephone numbers or street addresses are never sufficient to merge a Party, Facility, application or reference.

The expected reference may be a Person or an organization. A responding human may optionally provide a minimized claimed name and relationship/title. When a separately verified native respondent Party already exists, the submission may link it; otherwise the claim remains evidence on the immutable submission and must not silently create or merge a canonical Person.

## Survey version and known-question boundary

The supplied reference establishes only these questions:

| Governed question ID | Exact known question | Type | Branch/requirement |
| --- | --- | --- | --- |
| `M24_TR_CURRENT` | Is the Tenant currently renting from you? | Yes/No | Required. |
| `M24_TR_LEASE_END` | Please confirm lease expiration date. | Date | Presented and required only when `M24_TR_CURRENT=Yes`. Otherwise canonical empty. |
| `M24_TR_LATE12` | Has the Tenant had a late payment within the last 12 months? | Yes/No | Required. |
| `M24_TR_NSF12` | Did the Tenant have a rent payment returned due to non-sufficient funds within the last 12 months? | Yes/No | Required. |
| `M24_TR_NSF_COUNT` | How many times was a payment returned for non-sufficient funds in the last 12 months? | Positive whole number | Presented and required only when `M24_TR_NSF12=Yes`; accepted value must be at least one. Otherwise canonical empty. |
| `M24_TR_RENT_AGAIN` | Would you rent to this Tenant again? | Yes/No | Required. |

One or more source questions are unresolved. No implementation may invent their text, type, sequence, options or branching.

Private Slice 1 may seed the six-question definition as test-only survey `M24_TREF_D1`, with version state `INCOMPLETE_TEST_ONLY`. It must visibly state in evidence that it is not source-complete and cannot be issued to a real reference. A production-capable version requires either recovery of the original complete source or a separately approved Midwest24 question set, a new immutable version ID and definition hash, and the compliance gate below.

Published definition rows are immutable. A wording, type, option, order, requirement or branch change creates a new version; it never reinterprets an existing submission.

Native `SurveyQuestionAppl.withSurveyQuestionId` and `withSurveyOptionSeqId` may express the simple Yes branch. Conditional questions must have native `requiredField=N`; the owned service enforces branch-specific requiredness because the pinned native response service does not. The immutable submission records only questions actually presented. Hidden questions are neither missing nor unanswered and must have canonical empty answers. A client-supplied answer for a hidden question is rejected rather than silently accepted.

## Request lifecycle

The only approved request states are:

```text
DRAFT → ISSUED → OPENED → SUBMITTED
            └────────────→ REVOKED
            └────────────→ EXPIRED
```

- `DRAFT` has context and version but no active external credential.
- `ISSUED` has one active bounded token and immutable issue time.
- `OPENED` records the first successful token-scoped survey open; repeated opens before submission do not create new events.
- `SUBMITTED` is terminal for that request and permits no answer update.
- `REVOKED` and `EXPIRED` are terminal and cannot submit.
- A correction, replacement reference or second request creates a new request linked through `supersedesRequestId`; it never reopens or overwrites the first submission.

State changes must be append-only, attributable and idempotent. Merely loading an invalid or expired token must not reveal whether an application, reference or request exists.

## External authorization and token boundary

External references receive no OFBiz `UserLogin`, security group, general Party access or application session.

An issued access credential must:

- contain at least 256 bits of cryptographically secure random entropy;
- be scoped server-side to exactly one request, application, expected reference, survey version and allowed open/submit actions;
- have an explicit issue and expiry time;
- be stored only as a keyed digest, never plaintext;
- use HTTPS and an owned endpoint that exposes no internal IDs;
- be excluded from Git, evidence, analytics, application logs, access logs under Midwest24 control, error text and referrer leakage;
- use `Cache-Control: no-store`, `Referrer-Policy: no-referrer`, no third-party page resources and an approved secure-cookie/token-exchange pattern when practical;
- return a uniform unavailable response for guessed, malformed, expired, revoked or unrelated credentials without existence disclosure;
- become submission-inert after one accepted submission, while an identical retry returns the stable prior confirmation.

The public route must never expose or proxy the generic native `createSurveyResponse` service. It resolves all Party, Facility, application, request, version and native response identifiers from server-side scope. The caller cannot select them.

The owned service validates the credential and active branch, normalizes the payload, enforces length/type/date/count bounds, computes the canonical payload hash, and invokes minimum native writes under a disabled, noninteractive execution principal. The submission retains the token-scoped subject separately from the executor. No credential, cookie, raw token or token digest is evidence of the respondent's verified legal identity.

Apply bounded request size, method/origin policy, rate limiting and generic abuse controls. Do not add invasive device fingerprinting. IP address, user-agent and device data are not retained in the durable submission unless a later evidentiary decision approves a specific field, purpose and retention period.

## Submission, replay and evidence model

The accepted submission transaction must atomically create:

1. one native `SurveyResponse`;
2. the exact active native `SurveyResponseAnswer` set;
3. one immutable owned submission snapshot;
4. one `SUBMITTED` event;
5. one idempotent receipt;
6. the terminal request state and submitted timestamp.

The owned snapshot preserves the version ID and hash, exact questions presented in order, exact normalized answers, canonical empty values for hidden branches, request/application/reference/context identifiers, native response ID, issue/open/submit timestamps, claimed respondent attribution when supplied, canonical payload hash, initiating token subject and effective executor.

An identical submission request ID and identical canonical payload hash returns the original submission/receipt without a second native response, answer, event or status effect. The same request ID with changed content conflicts before mutation. Concurrent identical submissions serialize to one accepted effect. A malformed, incomplete or injected-failure submission rolls back the entire native and owned graph.

Already submitted with the correct credential returns a stable generic confirmation and no answers. Revoked or expired credentials never reveal prior answers or context.

## Property-management staff experience

An authenticated, non-admin Property Manager workspace may:

- search/list only applications within explicit object scope;
- open an application screening detail;
- add or select an expected reference Party and referenced-tenancy/address context;
- create, issue and revoke a request;
- see request lifecycle, version, reference, issue/open/submit times and supersession history;
- review the immutable submitted questions and answers;
- see that respondent identity is claimed or verified, without overstating token possession;
- create a separate replacement request without changing the first response.

The workspace must not display the raw token after its one-time issue boundary, expose unrelated applicants or Properties, provide native entity administration, or convert answers into an application decision. Every list, detail, issue, revoke and review action requires both the capability permission and a time-valid object grant.

## External survey experience

The owned external experience is mobile-first and usable without OFBiz login. It must provide:

- one question at a time;
- progress based on the questions actually presented after branching;
- accessible labels, keyboard operation and validation messages;
- explicit conditional transitions;
- a review/submit boundary that states submission is final;
- a clear confirmation after success;
- no internal IDs, administrative navigation, unrelated context, scores or decision language.

The private slice may test the external experience on an isolated route only. Hostname, DNS, public routing, production TLS termination and delivery-channel integration require separate deployment approval.

## Privacy and housing-screening compliance boundary

Collect only the applicant, reference, context, questions, answers and timestamps needed for the governed workflow. Do not collect credit, criminal, eviction, biometric, device-fingerprint or unrelated behavioral data.

Federal guidance recognizes that reports from reference-checking or tenant-screening services can be consumer reports and that housing-screening practices remain subject to fair-housing obligations. Whether a particular first-party reference workflow triggers specific federal, state or local duties depends on the operating facts and jurisdiction. This ACP does not make that legal determination.

Before any real request or production issue capability, separate approved compliance records must establish:

- applicable jurisdictions and whether Midwest24 is acting only for its own property management or as a screening/reporting service;
- applicant notice, authorization and permissible-purpose evidence;
- privacy notice, access/correction/dispute path, retention and deletion periods;
- consistent human review and fair-housing controls;
- any required investigative-report disclosure;
- adverse-action notice and source-disclosure handling if response evidence contributes to an unfavorable decision;
- incident response and authorized disclosure rules.

Primary guidance for that later review includes the Federal Trade Commission's [Using Consumer Reports: What Landlords Need to Know](https://www.ftc.gov/business-guidance/resources/using-consumer-reports-what-landlords-need-know) and the U.S. Department of Housing and Urban Development's [Guidance on Application of the Fair Housing Act to Screening of Applicants for Rental Housing](https://archives.hud.gov/news/2024/FHEO_Guidance_on_Screening_of_Applicants_for_Rental_Housing.pdf). These are external compliance sources, not substitutes for jurisdiction-specific review.

## Property Management Slice 1 acceptance contract

### Positive acceptance

1. Record governing and implementation revisions, OFBiz/image version, the five pinned source hashes above, private database identity, mounts, ports, isolation controls, de-identified fixture hash and rollback location.
2. Replay-safe configuration creates the exact native/owned types, permissions and `M24_TREF_D1` incomplete test-only definition without business records. Repeating bootstrap changes nothing.
3. Create one synthetic applicant Person, one synthetic expected reference Party, one existing synthetic `Facility(M24_PROPERTY)`, one owned Rental Application and one referenced-address context. Prove all canonical IDs are distinct and no address creates or merges a Facility.
4. An object-authorized non-admin Property Manager creates and issues one request. Capture the raw token only in an ephemeral test channel; the database, logs and Git contain only the digest and non-secret evidence.
5. A valid external session opens only that request and renders the one-question-at-a-time experience at approximately 390-pixel mobile and normal desktop widths without OFBiz login or internal IDs.
6. Prove both current-renter branches: `Yes` requires and records lease expiration; `No` does not present it and records canonical empty. Prove both NSF branches: `Yes` requires a positive whole-number count; `No` does not present it and records canonical empty.
7. Submit the six known questions once. Verify one native response, the exact presented native answer rows, one immutable owned submission, one terminal event and one receipt with matching definition and payload hashes.
8. The authorized Property Manager reviews the exact version, questions, normalized answers, context and timestamps. Another scoped manager without the application/request grant is denied.
9. Three sequential identical retries and at least two concurrent identical submissions return the original stable result with no additional native response, answer, submission, event or state effect.
10. Restart/recreate the private application and database without reseeding. Verify request state, grant, token digest, native response/answers, immutable snapshot, events and replay remain correct.
11. Export normalized non-secret native/owned data and independently reconstruct the application/reference/request/version/question/answer/event graph. Deliberate definition, answer, context or timestamp tampering must fail reconstruction.
12. Confirm the slice created no production data, public route, delivery integration, application decision, score, adverse action, document bytes, accounting record, rent ledger, lease or broad OFBiz account.

### Negative and denial acceptance

Each path must fail without partial durable effect or existence disclosure:

1. guessed, malformed, expired, revoked, wrong-request or wrong-reference token;
2. unauthenticated staff route; wrong role; missing, expired or cross-application staff grant; administrator use as a substitute for non-admin acceptance;
3. direct native survey service, native entity administration, caller-selected survey/application/Party/Facility/reference/response/status/executor identifiers, or unrelated CRM/accounting/document routes;
4. missing known required question, invalid date, invalid Yes/No value, zero/negative/non-integer NSF count when NSF is Yes, or supplied answer for a hidden question;
5. ungoverned question ID, omitted-source-question invention, wrong definition version/hash or mutation of the published native definition;
6. altered payload under an accepted request ID, second nonidentical submission, or concurrent conflicting submission;
7. injected failure after any native response/answer or owned submission/event write; rollback must leave no partial graph and a clean retry may succeed once;
8. attempt to overwrite, reopen or delete a submitted response instead of creating a new superseding request;
9. attempt to create a Property from the referenced address, infer verified respondent identity from token possession, or automatically approve/deny/score the application;
10. attempt to retain raw token, token digest in user-visible evidence, unnecessary IP/device/fingerprint metadata or secrets.

## Targeted regressions and evidence

Run only the relevant established proofs:

- ACP-013/A16 Party, Person, Facility and address-identity invariants;
- CRM Slice 1 object authorization, direct-route denial, session/logout and mobile behavior;
- A07 initiating-human/effective-executor attribution and least privilege;
- A12 restart/recreation persistence;
- A14 normalized export, reconstruction and tamper detection;
- deterministic sequential/concurrent replay and atomic rollback patterns already proven by the Enterprise slices.

Retain non-secret evidence under `mwg-ofbiz/docs/evidence/property-management-tenant-reference-slice-1/`: source/image hashes, configuration receipt, fixture manifest, de-identification attestation, request lifecycle, token-leak scan, branch matrix, submission/replay/concurrency/rollback/denial results, staff/external UI evidence, normalized export, reconstruction/tamper result, exact commands and final execution record. Never retain raw credentials, tokens, cookies, session IDs, real applicant/reference data or protected configuration.

Implementation remains inside the Midwest24-owned OFBiz component and bounded validation tooling. Apache upstream, EspoCRM, production infrastructure and other active implementation work remain unchanged. Before any implementation commit or push, show the exact diff and validation results for separate approval.

## Explicit deferrals

This ACP does not approve:

- the unresolved source question or questions, or a production-complete survey version;
- real applicant, tenant, landlord or reference data;
- applicant approval, denial, scoring, ranking, recommendation or automatic decision rules;
- credit, criminal, eviction, income or identity screening;
- adverse-action generation or applicant dispute adjudication;
- a consumer-reporting or reference-checking service offered to third parties;
- production email, SMS, telephone or delivery-vendor selection;
- production hostname, DNS, public routing, CDN/WAF or deployment;
- electronic signature, lease execution, rent collection, accounting or rent ledgers;
- document upload or Document Services integration;
- retention/deletion periods before compliance approval;
- production authority transfer or cutover.

## Stop conditions

Stop and return to governance if implementation requires inventing an omitted question, real person/property data, automatic housing decisions, native `Agreement` as a false application/tenancy identity, a referenced address as a canonical Property, a broad OFBiz account for the external reference, exposure of the generic native survey service, plaintext token storage, caller-selected internal scope, mutable submitted evidence, unbounded metadata collection, non-atomic native/owned writes, failed replay/concurrency/authorization/reconstruction, Apache upstream modification, a production public endpoint, a delivery vendor, or an unresolved compliance decision for real use.

## Implementation handoff

Deploy Apache OFBiz may implement **Property Management Slice 1 — Private Synthetic Tenant Reference Verification** after verifying this committed ACP. Reuse the pinned native Survey graph behind a Midwest24-owned token-scoped service, implement only the six known questions in the incomplete test-only version, and prove the exact positive, denial, branching, replay, rollback, restart and reconstruction contract above. Do not contact or modify EspoCRM, production infrastructure or real applicants/references; do not start public deployment or any deferred screening/decision capability.
