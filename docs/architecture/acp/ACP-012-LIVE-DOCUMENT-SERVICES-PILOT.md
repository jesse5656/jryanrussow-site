# ACP-012 Addendum — Live Document Services Pilot

Version: 1.0.0

Status: Proposed

Type: Bounded live-operational pilot contract

## Decision

Authorize one live Midwest24 Document Services pilot after the completed P01–P12 private POC. The pilot creates and signs one real internal test document through the deployed service and Documenso, retaining one canonical completed artifact, immutable audit history, and recovery evidence. It does not connect OFBiz, create a business contract, or transfer document authority for production operations.

## Scope

The pilot may provision an isolated live runtime, dedicated PostgreSQL database, S3-compatible artifact bucket, protected secrets, TLS hostname, and authenticated Documenso callback. It may use one Midwest24-controlled signer and a synthetic/non-business template. Every record must carry `LIVE_PILOT` provenance.

## Preconditions

1. A final pre-pilot encrypted backup and rollback owner are recorded.
2. A unique public hostname with valid TLS is selected and recorded.
3. Provider credentials, callback secret, and storage credentials are generated directly into protected storage and never committed or logged.
4. The signer is a Midwest24-controlled test identity.
5. The document contains no customer, employee, claim, payment, or contract data.

## Acceptance

The pilot passes only when it proves: authenticated service access; one rendered document; one signing request; one real signer completion; authenticated callback; one completed artifact and matching SHA-256; immutable audit chain; exact replay inertness; altered replay conflict; unauthorized access denial; restart persistence; backup and restore; and a timestamped live-pilot evidence record.

## Boundaries

- No OFBiz, EspoCRM, website, email workflow, Net2phone, or public-intake adapter is authorized.
- No customer-facing document, estimate, contract, payment, acceptance, or production Job workflow is authorized.
- No broad public registration, shared administrator credential, provider administration exposure, or raw database access is authorized.
- No Phase 2 consumer adapter or Phase 4 operational document workflow is authorized by a successful pilot.

## Rollback

On any callback, access, artifact, audit, provider, or recovery failure: disable signing intake, preserve evidence and artifacts, stop the pilot runtime, and return to governance. Do not create a fallback dual-write or manual production-document workflow.

## Implementation handoff

Document Services implementation may deploy only this isolated live pilot after this contract is approved and committed. It must show exact deployment diff, hostname/TLS evidence, access model, secret locations, backup point, live-pilot acceptance results, and rollback result before any expansion.
