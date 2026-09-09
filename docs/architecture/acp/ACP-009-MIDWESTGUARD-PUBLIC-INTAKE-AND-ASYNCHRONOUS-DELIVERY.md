# ACP-009 — MIDWESTGuard Public Intake and Asynchronous Delivery Architecture

Version: 1.0.0

Status:
Approved

Type:
Architecture Change Proposal

Authority:
Systems Architect Discipline

Proposed:
2026-09-09

Approved:
2026-09-09

Scope Summary:
MIDWESTGuard public website submission intake, durable acceptance, asynchronous delivery, current CRM delivery boundary, and retirement of n8n from the target architecture.

---

## Purpose

Establish a durable, repository-governed architecture for MIDWESTGuard public website submissions that does not depend on n8n or expose downstream system credentials to the browser.

This proposal governs the architecture for:

- public lead and inspection requests;
- public job applications;
- durable acceptance of submissions;
- asynchronous downstream delivery;
- uploaded application files;
- retry, recovery, idempotency, and observability;
- current delivery to the bounded EspoCRM operational bridge.

This proposal does not make EspoCRM the permanent strategic CRM architecture.

---

## Current State

The current standalone website preserves same-origin public endpoints:

- `POST /api/lead`
- `POST /api/job-application`

The current Worker forwards those requests to separately configured webhook targets under `automation.midwestguard.net`.

The canonical infrastructure architecture records the browser-to-webhook path as Current while the webhook consumer, n8n topology, downstream processing, authentication, and related runtime responsibilities remain Unknown or unverified.

ACP-005 establishes EspoCRM as a bounded interim operational CRM bridge.

The MIDWESTGuard-owned application platform remains the preferred strategic CRM/application production candidate under the approved production-candidate architecture. Production CRM migration and cutover are not authorized.

---

## Problem

The existing website submission architecture depends on an intermediary webhook layer whose durable-acceptance semantics, topology, processing behavior, authentication boundary, retry behavior, recovery behavior, and downstream delivery are not fully governed.

The target architecture should not depend on n8n merely because historical or current implementation uses it.

Public website intake requires a durable boundary that:

- acknowledges success only after the submission has been durably accepted;
- isolates public request handling from CRM credentials;
- tolerates temporary downstream CRM failure;
- provides deterministic retry and recovery;
- prevents duplicate downstream creation;
- supports uploaded résumé/application files without placing file content in queue messages;
- remains compatible with replacement of EspoCRM by a later authorized production system.

---

## Decision

Approve a Cloudflare-native public intake and asynchronous delivery architecture.

Target architecture:

```text
Visitor Browser
      |
      | POST /api/lead
      | POST /api/job-application
      v
Public Intake Worker
      |
      +--> validation / normalization / abuse controls
      |
      +--> D1 durable submission record
      |
      +--> R2 uploaded object when required
      |
      +--> Cloudflare Queue
               |
               v
         Delivery Consumer
               |
               +--> idempotency / delivery-state check
               |
               +--> current delivery adapter
                         |
                         v
                       EspoCRM
                   operational bridge
```

The browser-facing endpoints remain stable unless a separately governed requirement establishes otherwise.

---

## Public Intake Boundary

The public intake component shall:

- accept only explicitly supported methods and routes;
- enforce same-origin or otherwise approved origin policy;
- validate required fields;
- normalize accepted input;
- enforce honeypot and appropriate abuse controls;
- enforce bounded request and file sizes;
- validate permitted uploaded-file characteristics;
- generate or assign one immutable submission identifier;
- durably record accepted submissions before reporting success;
- place only bounded delivery metadata or identifiers onto the queue;
- never contain EspoCRM credentials in browser-delivered code;
- never require the CRM to be available before durable public acceptance.

A successful public response means the submission has been durably accepted into MIDWESTGuard-controlled infrastructure.

It does not mean downstream CRM delivery has already completed.

---

## D1 Submission Ledger

D1 shall be the durable operational ledger for submission state.

The stored model shall support at least:

- immutable submission identifier;
- submission type;
- received timestamp;
- normalized accepted submission data or approved reference to it;
- uploaded-object reference where applicable;
- processing state;
- delivery-attempt count;
- last delivery attempt timestamp;
- downstream destination class;
- downstream record identifier when successfully created;
- last material error or bounded error classification;
- final delivered or recovery-required state.

The exact schema remains an implementation concern provided these architectural requirements are preserved.

---

## Uploaded Files

Uploaded résumé or application files shall use object storage rather than queue-message payloads.

R2 is the approved target storage class for these objects in this architecture.

Queue messages shall carry identifiers or object references rather than uploaded binary content.

Access shall be limited to the components requiring the object for validated processing or delivery.

Retention and deletion policy require separate operational governance when not already defined.

---

## Queue and Delivery Boundary

Cloudflare Queue shall decouple durable public acceptance from downstream CRM availability.

The delivery consumer shall:

- consume bounded submission identifiers or metadata;
- retrieve required durable state from the approved stores;
- check submission and delivery state before downstream mutation;
- perform deterministic delivery;
- record successful downstream delivery;
- record downstream identifiers when available;
- classify failed attempts sufficiently for recovery;
- permit bounded automatic retry;
- avoid duplicate downstream creation when a message is replayed or retried.

Queue delivery is an internal service boundary and shall not expose downstream credentials to the public Worker unless a later approved design demonstrates a reason to combine the roles.

---

## Idempotency

Idempotency is required in the initial implementation.

Each public submission shall have one immutable submission identifier.

Before creating or mutating a downstream record, the delivery consumer shall determine whether that submission has already been successfully delivered.

After successful downstream delivery, durable state shall record sufficient evidence to prevent ordinary queue replay or retry from creating a duplicate downstream object.

The exact implementation mechanism may vary by destination adapter but shall preserve this invariant.

---

## Retry and Recovery

Temporary downstream failure shall not invalidate a submission that has already been durably accepted.

The architecture shall support:

- bounded automatic retry;
- persistent delivery-attempt evidence;
- distinction between retryable and terminal or operator-required failure where practical;
- operator recovery from submissions that cannot be delivered automatically;
- prevention of false public success before durable intake;
- prevention of duplicate downstream creation during retry.

Exact retry intervals and escalation procedures belong in implementation or operational documentation unless they become material enterprise policy.

---

## Credential Boundary

Public browser code shall contain no protected CRM credential, API token, webhook capability secret, database secret, queue administrative credential, or object-storage credential.

Service credentials shall use appropriate service-native protected secret storage and least privilege.

The public intake role should not receive downstream CRM credentials when a separate delivery role can satisfy the architecture.

Documentation shall identify credential classes and responsibilities without recording secret values.

---

## Current CRM Delivery Adapter

EspoCRM is the current bounded operational CRM bridge.

A production implementation may deliver accepted website submissions to EspoCRM only through a server-side adapter using verified authentication and verified field mappings.

This ACP does not invent or authorize unverified EspoCRM endpoints, credentials, entity names, field names, or mapping semantics.

The delivery interface shall remain sufficiently bounded that a later authorized production destination can replace the EspoCRM adapter without requiring redesign of public browser forms, durable intake, or queue semantics.

EspoCRM shall not be represented as the permanent strategic CRM architecture.

---

## Relationship to the MIDWESTGuard-Owned Platform

The MIDWESTGuard-owned application platform remains the preferred strategic CRM/application production candidate under its governing architecture.

This proposal does not:

- authorize production migration to that platform;
- place the website delivery implementation inside the prototype merely for convenience;
- authorize the prototype to define missing business semantics;
- authorize production cutover from EspoCRM.

A future production-adoption decision may establish a new delivery adapter while preserving this intake architecture.

---

## n8n Disposition

n8n is not part of the approved target public-intake architecture.

Disposition shall distinguish implementation status:

### Target or planned architecture

Remove or supersede n8n assumptions where they describe the intended MIDWESTGuard architecture.

### Current legacy implementation

Do not disable a functioning n8n-backed flow merely because the target architecture has changed.

Each current caller shall remain operational until:

1. its replacement path is implemented;
2. equivalent or improved behavior is validated;
3. rollback is available where required;
4. the caller is intentionally cut over.

### Historical evidence

Historical files and records may retain n8n references when required for provenance.

Historical evidence shall not be rewritten merely to resemble the new architecture.

---

## Canonical Infrastructure Documentation

After approval, the canonical infrastructure architecture shall distinguish:

- Current legacy website submission implementation;
- Approved Cloudflare-native target architecture;
- implemented components after verification;
- legacy n8n dependencies pending migration;
- historical n8n evidence;
- unresolved downstream authentication or mapping details.

Approved architecture shall not be described as Current until implementation evidence supports that status.

---

## Implementation Sequence

### Phase 0 — Resolve repository context

- verify branch and working tree;
- preserve unrelated changes;
- reconcile local state with remote state;
- inspect application-repository evidence;
- stop if unexplained overlapping changes prevent safe implementation.

### Phase 1 — Govern architecture

- approve this ACP;
- update the canonical infrastructure architecture;
- preserve current-versus-approved status distinctions;
- close the bounded Operating Plan transaction.

### Phase 2 — Website implementation

In `midwestguard-site`:

- preserve the same-origin public form routes;
- replace webhook forwarding with durable Cloudflare-native intake;
- add required Cloudflare bindings;
- implement D1 submission persistence;
- implement R2 upload handling where required;
- enqueue accepted submissions;
- preserve existing public redirects and form-success behavior subject to durable-acceptance semantics.

### Phase 3 — Delivery consumer

- implement the asynchronous consumer;
- implement deterministic state transitions;
- implement idempotency;
- implement bounded retry and recovery;
- integrate only with verified current EspoCRM interfaces and mappings.

### Phase 4 — Validation

Validate at minimum:

- successful lead acceptance;
- successful job-application acceptance;
- representative résumé upload;
- unavailable downstream CRM during public submission;
- queue retry;
- duplicate queue delivery;
- terminal delivery failure;
- operator-visible recovery evidence;
- wrong-method rejection;
- cross-origin rejection;
- abuse-control behavior;
- no credentials in browser output or Git;
- no false-success response before durable intake;
- preservation of public URL and SEO behavior.

### Phase 5 — Production review

Return for explicit production-cutover authorization.

Repository completion alone shall not modify production DNS, production Worker routing, active Odoo service, or production EspoCRM configuration.

---

## Scope

This governed architecture transaction covers:

- `docs/architecture/acp/ACP-009-MIDWESTGUARD-PUBLIC-INTAKE-AND-ASYNCHRONOUS-DELIVERY.md`
- `docs/architecture/INFRASTRUCTURE-ACCESS-AND-REQUEST-FLOWS.md`
- `docs/discipline/OPERATING-PLAN.md`

The Operating Plan modification is limited to the additive ACP-009 bounded
architecture closeout. Pre-existing Institutional Memory Diagnostic changes
remain outside this transaction.

---

## Explicit Exclusions

This ACP does not authorize:

- production DNS changes;
- production custom-domain or Worker-route cutover;
- Odoo cancellation or destructive removal;
- destructive EspoCRM removal;
- production migration to the MIDWESTGuard-owned platform;
- invention of EspoCRM authentication details;
- invention of CRM field mappings;
- unrelated CRM customization;
- deletion of legacy n8n flows before their callers are migrated;
- rewriting historical evidence;
- credential values in source control or documentation;
- unrelated infrastructure cleanup;
- unrestricted automation or AI behavior.

---

## Relationship to Existing Governance

ACP-005 continues to govern EspoCRM as the bounded interim operational bridge.

ACP-006 continues to govern canonical infrastructure documentation and credential handling but did not authorize the runtime changes proposed here.

The approved MIDWESTGuard-owned CRM production-candidate architecture continues to govern the strategic candidate and does not authorize production migration.

The Credential and Token Handling Standard remains controlling for service secrets.

The Deterministic Automation Standard remains controlling for material deterministic automation.

A pre-existing duplicate use of the identifier `ACP-008` exists in repository history. This proposal does not attempt to repair or reinterpret that historical numbering defect. References to those proposals should use their full titles and paths when ambiguity matters.

---

## Success Conditions

This architecture is successfully implemented when:

1. public website submissions no longer require n8n in the target runtime;
2. public success occurs only after durable acceptance;
3. downstream CRM outage does not discard an accepted submission;
4. uploaded files use approved object storage rather than queue payloads;
5. asynchronous delivery is observable and recoverable;
6. ordinary retries and replay do not create duplicate downstream records;
7. CRM credentials remain server-side and least-privileged;
8. EspoCRM remains visibly a bounded current adapter rather than permanent architecture;
9. historical and current legacy n8n evidence is preserved until appropriately migrated or classified;
10. production cutover remains separately authorized.

---

## Repository Implementation Scope

This approval authorizes only the bounded governing-repository transaction required to establish the architecture decision:

- `docs/architecture/acp/ACP-009-MIDWESTGUARD-PUBLIC-INTAKE-AND-ASYNCHRONOUS-DELIVERY.md`
- `docs/architecture/INFRASTRUCTURE-ACCESS-AND-REQUEST-FLOWS.md`
- `docs/discipline/OPERATING-PLAN.md`

The Operating Plan change is additive and shall preserve the already-active Institutional Memory Diagnostic work and its uncommitted evidence.

No website repository, runtime configuration, DNS, Worker route, n8n flow, EspoCRM configuration, or production system is modified by this transaction.

---

## Approval

Approved by the governing Systems Architect Discipline session on 2026-09-09.

Implementation remains subject to Repository Context Resolution, Governance Enforcement, validation, staged-diff review, and the separate commit gate.

---

## Recommendation

Approve this ACP.

The current webhook architecture is insufficiently durable and governed for the standalone MIDWESTGuard website target.

A Cloudflare-native durable intake and asynchronous delivery boundary removes unnecessary middleware dependency while preserving current CRM operations and future platform portability.
