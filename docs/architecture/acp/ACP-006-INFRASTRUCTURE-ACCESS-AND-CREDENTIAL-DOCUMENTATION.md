# ACP-006 — Infrastructure, Access, and Credential Documentation

Version: 1.0.0

Status:
Approved

Type:
Architecture Change Proposal

Authority:
Systems Architect Discipline

Proposed:
2026-09-05

Approved:
2026-09-05

Scope Summary:
Canonical infrastructure, authentication, request-flow, service-role, and
credential-handling documentation; disposition of obsolete technical material;
repository hygiene; and bounded Operating Plan authorization

---

## Current State

The governing repository contains no complete canonical description of the
current infrastructure, authentication boundaries, service-access paths,
request flows, or credential-handling architecture.

The current canonical documentation includes:

- `docs/architecture/SITE-ARCHITECTURE.md`, which describes website navigation
  and content relationships rather than infrastructure;
- `docs/operations/WEBSITE-OPERATIONS-MANUAL.md`, which documents portions of
  the Russow Institute MkDocs build and TrueNAS publication process;
- ACP-004 and ACP-005, which govern the durable business-platform evaluation
  and bounded interim EspoCRM bridge;
- current website implementation files that provide limited evidence about
  Cloudflare Workers and public browser-to-webhook requests.

Detailed infrastructure descriptions are concentrated in root-level
`Private-Docs/` material that is obsolete, unverified, internally
contradictory, and publicly accessible through GitHub.

Other noncanonical material includes:

- `Backend-Odoo-Seperate-system/`;
- `Cloudflare-Config/`;
- `file-tree.txt`;
- `.wrangler/cache/wrangler-account.json`;
- root-level website implementation and deployment files.

The repository's active Operating Plan still identifies Institutional Memory
Evidence Development as in progress even though its later research-sprint
closeout identifies development of the Institutional Memory Diagnostic
specification and pilot architecture as the next priority.

This ACP does not resolve that strategic inconsistency permanently. It
authorizes only the bounded Operating Plan transaction necessary to execute and
close this documentation correction while preserving the Institutional Memory
Diagnostic as the next strategic priority.

## Problem

The repository currently permits obsolete, proposed, historical, and current
technical descriptions to appear without a reliable authority or status
boundary.

Specific demonstrated problems include:

1. `Private-Docs/` represents Odoo as CRM, ERP, accounting, invoicing, sales,
   and project management even though ACP-004 and ACP-005 supersede those
   assumptions.

2. ACP-005 establishes EspoCRM as a bounded interim operational bridge, but the
   repository has no consolidated service-role register that communicates that
   status.

3. Current browser code sends form submissions to
   `https://automation.midwestguard.net/webhook`, while obsolete documentation
   describes different `hooks.*` hostnames and webhook paths.

4. `get/apply.html` sends `Content-Type: apply/json`, which is a demonstrated
   implementation defect. This ACP records the defect but does not authorize
   its correction.

5. Obsolete documentation recommends a browser-delivered
   `X-Webhook-Secret`. A value embedded in public browser JavaScript cannot
   function as a confidential shared secret.

6. Authentik has no current repository evidence.

7. Tailscale, n8n, Nextcloud, reverse-proxy, Cloudflare Tunnel, and most
   TrueNAS service-role claims are documented only in obsolete or unverified
   material.

8. The only currently verified TrueNAS responsibility in canonical
   documentation is hosting the generated Russow Institute MkDocs publication
   target.

9. `.wrangler/cache/wrangler-account.json` is tracked even though it is
   generated account metadata.

10. `.gitignore` does not adequately guard common secret-bearing files,
    credential material, keys, tokens, or `.wrangler/`.

11. A deployment exclusion, ignore file, or website redirect does not make
    committed `Private-Docs/` material private on GitHub.

12. The repository lacks canonical documentation separating:

    - verified current implementation;
    - approved architecture;
    - planned or optional capability;
    - historical evidence;
    - obsolete material;
    - unresolved claims.

Without correction, the governing repository cannot reliably perform its role
as authoritative institutional memory for this architecture.

## Proposed Change

Approve a bounded documentation and repository-hygiene correction using the
smallest coherent canonical document set.

### 1. Canonical infrastructure and access architecture

Create:

`docs/architecture/INFRASTRUCTURE-ACCESS-AND-REQUEST-FLOWS.md`

This document shall consolidate:

- verified current infrastructure;
- service roles and system-of-record responsibilities;
- authentication and access-control boundaries;
- public, private, administrative, client-facing, and service-to-service
  request flows;
- implementation status;
- evidence provenance;
- contradictions;
- unresolved verification items;
- historical and superseded state where necessary for interpretation.

The document shall distinguish visibly among:

- Current — directly supported by current repository or verified
  implementation evidence;
- Approved — authorized architecture not necessarily fully implemented;
- Planned — intended but not implemented;
- Optional — possible future capability without approved implementation;
- Historical — formerly used or historically relevant;
- Obsolete — superseded and not authoritative;
- Unknown — insufficient evidence to determine current state.

Distinct request flows shall not be collapsed into one generic diagram.

Mermaid may be used only where a diagram materially improves understanding and
the authoritative assertions remain available in text.

### 2. Credential and token handling standard

Create:

`docs/standards/CREDENTIAL-AND-TOKEN-HANDLING-STANDARD.md`

The standard shall govern credential and token documentation without recording
secret values.

For every verified credential class, the documentation model shall support:

- issuer;
- holder or custodian;
- consumer;
- transmission method;
- approved storage category;
- renewal or rotation expectation;
- revocation method;
- source-control eligibility;
- implementation status;
- unresolved risks.

The standard shall prohibit committing or publishing:

- passwords;
- private keys;
- API keys;
- access tokens;
- refresh tokens;
- session cookies;
- tunnel credentials;
- recovery codes;
- database credentials;
- secret configuration values.

The standard shall not require documentation to retrieve or display credential
values.

This ACP establishes the institutional standard. It does not create a recurring
credential-rotation operating procedure. A future recurring operational
workflow shall require the applicable OCP.

### 3. Existing canonical documents

Modify existing documents only where necessary:

- clarify that `docs/architecture/SITE-ARCHITECTURE.md` describes website
  information and navigation architecture rather than enterprise
  infrastructure;
- link applicable architecture and operational documentation;
- correct canonical descriptions that conflict with approved ACP-004 or
  ACP-005;
- preserve legitimate historical evidence with explicit status;
- avoid duplicating responsibilities already assigned to another canonical
  document.

### 4. MkDocs navigation

Update `mkdocs.yml` so the approved canonical infrastructure, access, request
flow, and credential-handling documents are discoverable.

Navigation changes shall follow the Wiki Presentation Standard and shall not
restructure unrelated knowledge areas.

### 5. Obsolete-material disposition

Apply the following disposition principles:

#### `Private-Docs/`

Delete the obsolete root-level collection after verifying that no unique
current fact requires promotion into canonical documentation.

Do not update these files in place.

Git history shall preserve the historical bytes. The canonical documentation
may summarize historically relevant claims without reproducing obsolete
instructions.

#### `Backend-Odoo-Seperate-system/`

Delete the empty placeholder entries unless inspection demonstrates actual
current implementation value.

The directory shall not be treated as evidence that Odoo currently performs
the named business functions.

#### `Cloudflare-Config/`

Classify each file individually.

Retain, relocate, replace, or delete content according to verified current
purpose. Do not treat deployment artifacts as canonical architecture.

#### `file-tree.txt`

Delete if it is stale generated output and no repository-owned process
establishes it as authoritative.

#### `.wrangler/cache/wrangler-account.json`

Remove the tracked cache file and prevent `.wrangler/` from returning to source
control.

No credential or secret value shall be printed during this work.

### 6. Repository hygiene

Update `.gitignore` with the smallest practical rules protecting:

- `.wrangler/`;
- `.env` and environment-file variants;
- private-key and certificate-key material;
- locally generated credential, secret, and token files where a sufficiently
  precise rule can be established.

Ignore rules shall avoid hiding legitimate source files merely because ordinary
prose contains words such as `token`, `secret`, or `credential`.

### 7. Operating Plan authorization

Temporarily update `docs/discipline/OPERATING-PLAN.md` to authorize this bounded
documentation correction.

The Operating Plan update shall:

- identify this work as the active bounded objective;
- state its definition of done;
- preserve development of the Institutional Memory Diagnostic specification
  and pilot architecture as the next strategic priority;
- avoid restoring completed historical-research tasks as the next objective;
- be closed and updated again when this work is complete.

### 8. Implementation-defect register

Documentation work may identify implementation defects, including:

- incorrect request headers;
- insecure public-webhook assumptions;
- mismatched endpoints;
- missing server-side validation;
- missing rate limiting;
- incorrect deployment claims;
- authentication gaps;
- unsafe credential placement.

Such defects shall be recorded as verified, suspected, or unresolved.

This ACP does not authorize correcting deployed infrastructure or website
implementation. Each implementation correction requires separate scope review
and authorization.

## Documentation Authority

The governing repository defines the canonical architecture.

Application and website repositories may provide implementation evidence.

Implementation evidence does not silently supersede governing architecture.

Chat history and user memory may direct investigation but shall not be promoted
to canonical fact without repository or direct implementation evidence.

Where current evidence contradicts approved architecture, the contradiction
shall be documented and escalated rather than silently reconciled.

## Known Architecture Boundaries

The canonical correction shall preserve these repository-approved distinctions:

- ACP-004 governs durable open-source business-platform selection.
- ACP-005 governs EspoCRM as a bounded interim operational bridge.
- EspoCRM shall not be represented as the final strategic platform.
- JobNimbus is historical operational evidence.
- Odoo shall not be represented as the current CRM, ERP, accounting,
  invoicing, sales, project-management, or general system of record.
- A separately verified Odoo website-builder role may be documented only within
  its actual system and evidence boundary.
- Planned n8n integrations shall not be represented as implemented.
- Authentik shall remain undocumented as current infrastructure until verified.
- Service-local authentication shall remain visible where centralized identity
  integration is absent or unverified.

## Scope

- `docs/architecture/acp/ACP-006-INFRASTRUCTURE-ACCESS-AND-CREDENTIAL-DOCUMENTATION.md`
- `docs/architecture/INFRASTRUCTURE-ACCESS-AND-REQUEST-FLOWS.md`
- `docs/architecture/SITE-ARCHITECTURE.md`
- `docs/standards/CREDENTIAL-AND-TOKEN-HANDLING-STANDARD.md`
- `docs/discipline/OPERATING-PLAN.md`
- `docs/operations/WEBSITE-OPERATIONS-MANUAL.md`
- `mkdocs.yml`
- `.gitignore`
- `.wrangler/cache/wrangler-account.json`
- `Private-Docs/`
- `Backend-Odoo-Seperate-system/`
- `Cloudflare-Config/`
- `file-tree.txt`

## Explicit Exclusions

This ACP does not authorize:

- deployed infrastructure changes;
- website implementation changes;
- correction of `get/apply.html`;
- webhook endpoint changes;
- n8n workflow changes;
- Cloudflare configuration changes outside documentation and repository
  hygiene;
- Cloudflare Tunnel changes;
- Cloudflare Access configuration;
- Tailscale configuration;
- Authentik installation or configuration;
- TrueNAS configuration;
- Nextcloud configuration;
- reverse-proxy configuration;
- EspoCRM configuration or development;
- Odoo configuration or removal;
- credential creation, retrieval, rotation, or revocation;
- migration between platforms;
- publication or exposure of secret values;
- creation of a recurring operational workflow;
- unrelated repository cleanup;
- commit or push without the required validation and review gates.

## Implementation Sequence

### Phase 0 — Verify governed baseline

- rerun Repository Context Resolution;
- confirm branch and upstream synchronization;
- confirm the working tree contains only approved work;
- preserve unrelated changes;
- stop if unexplained changes overlap scope.

### Phase 1 — Build the disposition and contradiction register

- inventory every in-scope document;
- classify its authority and status;
- identify the source for each current-state claim;
- record contradictions and unresolved claims;
- freeze the proposed disposition before deletion.

### Phase 2 — Verify implementation evidence

- inspect current repository implementation evidence;
- inspect other application repositories only when available and relevant;
- distinguish direct evidence from inference;
- avoid retrieving secret values;
- keep unverified claims unresolved.

### Phase 3 — Create the canonical architecture document

- create the infrastructure, access, service-role, and request-flow document;
- use concise responsibility and status tables;
- use small, specific diagrams only where useful;
- identify unresolved evidence requirements.

### Phase 4 — Create the credential-handling standard

- establish credential documentation and source-control rules;
- exclude secret values;
- distinguish policy from operational procedure;
- avoid creating an unapproved recurring rotation workflow.

### Phase 5 — Correct and connect existing documentation

- modify existing canonical documents before creating additional files;
- update MkDocs navigation;
- apply the Wiki Presentation and Knowledge Linking Standards;
- avoid duplicate canonical authorities.

### Phase 6 — Apply obsolete-material disposition

- verify the disposition register;
- promote only verified current knowledge;
- preserve necessary history through Git;
- remove obsolete, empty, misleading, or generated material approved by this
  ACP;
- update repository hygiene rules.

### Phase 7 — Validate

Run:

1. focused documentation and path checks;
2. relevant repository tests;
3. `mkdocs build`;
4. `python3 scripts/governance/validate_governance_policy.py`;
5. governance validation against explicitly staged intended paths;
6. `git diff --check`;
7. `git status --short`;
8. scoped staged and unstaged diff review.

Do not commit until the implementation and validation output have been
reviewed.

Do not push unless explicitly authorized.

### Phase 8 — Close the bounded objective

- update the Operating Plan with actual completion status;
- record remaining implementation defects separately;
- restore or promote the Institutional Memory Diagnostic specification and
  pilot architecture as the next strategic priority;
- validate the final governed diff.

## Trade-offs

### Advantages

- establishes one authoritative documentation model;
- removes misleading public technical material;
- preserves current, approved, planned, historical, obsolete, and unknown
  distinctions;
- reduces accidental credential exposure;
- aligns Odoo and EspoCRM descriptions with approved architecture;
- improves discoverability through MkDocs;
- uses existing repository namespaces;
- avoids unnecessary proliferation of documents;
- preserves implementation work as a separately governed transaction.

### Costs

- requires evidence verification before documentation can be finalized;
- some infrastructure claims will remain unknown initially;
- deletion of obsolete files requires careful disposition review;
- the Operating Plan requires a bounded interruption before returning to the
  Institutional Memory Diagnostic priority;
- future operational procedures may still require a separate OCP.

### Risks

- documentation may become stale if future system changes are not recorded;
- implementation evidence may conflict across repositories;
- obsolete details may be promoted accidentally if source status is ignored;
- broad ignore patterns could hide legitimate source files;
- documentation could expose unnecessary topology if written without security
  restraint.

### Mitigations

- require provenance and implementation-status labels;
- use the smallest coherent document set;
- preserve historical bytes in Git;
- review every deletion through the disposition register;
- prohibit secret values;
- use precise ignore rules;
- record unresolved conflicts instead of guessing;
- require separate authorization for runtime corrections.

## Recommendation

Approve this ACP.

The demonstrated repository state justifies one bounded architecture and
institutional-standard correction.

A separate OCP is not currently recommended because this change does not
establish a recurring operating procedure. If implementation later proposes a
periodic access review, credential-rotation workflow, recurring infrastructure
verification procedure, or continuing team practice, that operational change
shall be governed separately.

## Success Conditions

This ACP is successfully implemented when:

1. the repository has one discoverable canonical infrastructure and access
   architecture document;
2. the repository has one active credential and token handling standard;
3. every material service claim is labeled current, approved, planned,
   optional, historical, obsolete, or unknown;
4. request flows remain distinct and evidence-based;
5. Odoo is not represented as a current business system of record;
6. EspoCRM is represented consistently with ACP-005;
7. obsolete `Private-Docs/` material no longer appears authoritative;
8. generated `.wrangler` cache material is not tracked;
9. `.gitignore` protects the approved secret-bearing file classes;
10. the MkDocs navigation exposes the canonical documents;
11. no deployed infrastructure or website implementation was changed;
12. all focused, build, governance, and diff validations pass;
13. the Operating Plan closes the bounded work and preserves the Institutional
    Memory Diagnostic as the next strategic priority.

## Failure Conditions

Reassess if:

- current-state claims cannot be traced to evidence;
- historical material is silently presented as current;
- the work expands into deployed-system modification;
- secret values enter documentation or output;
- the repository develops competing canonical documents;
- the disposition process removes material without review;
- the credential standard silently creates an operational procedure;
- the Operating Plan loses the approved strategic priority;
- validation exposes unrelated or unexplained changes.

## Governance Relationship

The repository constitutions and Constitutional Hierarchy remain authoritative.

The Repository Governance documents govern this proposal.

ACP-002 remains authoritative for Repository Context Resolution and Governance
Enforcement.

ACP-004 remains authoritative for durable business-platform selection.

ACP-005 remains authoritative for the bounded interim EspoCRM bridge.

OCP-001 remains authoritative for engineering execution rules.

OCP-005 remains authoritative for Russow Institute deployment operations.

OCP-006 and the Wiki Presentation Standard remain authoritative for
presentation and navigation.

No Proposed ACP or OCP is treated as approved by this proposal.

## Approval

Approved by the governing Systems Architect Discipline session on 2026-09-05.

Implementation remains subject to Repository Context Resolution, Governance
Enforcement, validation, staged-diff review, and the separate commit gate.
