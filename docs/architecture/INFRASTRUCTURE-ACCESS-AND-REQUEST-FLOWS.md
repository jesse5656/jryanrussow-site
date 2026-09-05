# Infrastructure, Access, and Request Flows

Version: 1.0.0

Status:
Active Architecture

Authority:
Systems Architect Discipline

Governing Proposal:
ACP-006

---

## Purpose

This is the canonical repository reference for verified infrastructure roles,
authentication boundaries, service access, and material request flows.

The governing repository defines architecture. Application repositories and
runtime systems provide implementation evidence but do not silently supersede
this document.

## Status Vocabulary

| Status | Meaning |
| --- | --- |
| Current | Supported by current repository or verified implementation evidence |
| Approved | Authorized architecture not necessarily fully implemented |
| Planned | Intended but not verified as implemented |
| Optional | Possible future capability without implementation approval |
| Historical | Formerly used or retained as evidence |
| Obsolete | Superseded and not authoritative |
| Unknown | Available evidence is insufficient |

## Verified Current State

- GitHub stores the governing repository and website source.
- Cloudflare Workers serves the root website described by `wrangler.toml` and
  `worker.js`.
- Current website forms submit to `https://automation.midwestguard.net/webhook`.
- MkDocs Material builds the Russow Institute wiki from `docs/`.
- Generated Institute output is published to
  `/mnt/FastPool/RussowInstituteWiki/` on TrueNAS.
- Cloudflare serves `https://institute.midwest24.com/`.
- ACP-005 authorizes EspoCRM as a bounded interim operational CRM bridge.
- Odoo is not authorized as CRM, ERP, accounting, invoicing, sales, project
  management, or the general operational system of record.

Authentik, Cloudflare Access, Cloudflare Tunnel, Tailscale, Nextcloud, n8n,
and reverse-proxy responsibilities remain Unknown until separately verified.

## Service-Role Register

| Component | Verified role | Status | Evidence |
| --- | --- | --- | --- |
| Governing Git repository | Canonical architecture and institutional memory | Current | Repository Constitution |
| GitHub | Remote source repository | Current | Repository Git state |
| Cloudflare Workers | Root website delivery | Current | `wrangler.toml`, `worker.js` |
| MkDocs Material | Institute wiki build | Current | `mkdocs.yml`, OCP-005 |
| TrueNAS | Institute generated-file publication target | Current | OCP-005 |
| Cloudflare | Public website and Institute delivery | Current | Worker configuration, OCP-005 |
| EspoCRM | Bounded interim CRM bridge | Approved/current bridge | ACP-005 |
| JobNimbus | Historical operational evidence | Historical | ACP-005 |
| Odoo business platform | Not a current system of record | Obsolete claim | ACP-004, ACP-005 |
| Odoo website builder | Owner-stated role not verified here | Unknown | Implementation evidence required |
| n8n | Endpoint hostname suggests automation; topology unverified | Unknown | Website source only |
| Authentik | No verified repository evidence | Unknown | None identified |
| Cloudflare Access | No verified repository evidence | Unknown | None identified |
| Cloudflare Tunnel | Described only in obsolete material | Unknown | Runtime evidence required |
| Tailscale | Described only in obsolete material | Unknown | Runtime evidence required |
| Nextcloud | Described only in obsolete material | Unknown | Runtime evidence required |
| Reverse proxy | Conflicting obsolete descriptions | Unknown | Runtime evidence required |

## Authentication and Access Boundaries

The public website and Institute publication are intentionally readable without
user authentication.

Administrative Institute publication uses a TrueNAS account through the
documented deployment process. Credential values and private keys are not
documented here.

ACP-005 establishes EspoCRM's bounded operational role, but its authentication,
MFA, API, administrative access, and identity-provider integration remain
unverified in this repository.

Authentik, Cloudflare Access, Tailscale, service-local authentication, MFA, and
FIDO2 responsibilities remain Unknown until verified. No centralized identity
provider shall be represented as implemented merely because it is planned or
available.

## Request Flows

### Public website

```mermaid
flowchart LR
    A[Visitor browser] --> B[Cloudflare]
    B --> C[Website Worker]
    C --> D[Static assets]
```

### Public form submission

```mermaid
flowchart LR
    A[Visitor browser] --> B[automation.midwestguard.net]
    B --> C[Webhook consumer]
    C --> D[Unverified downstream processing]
```

Only the browser-to-endpoint portion is Current. Hosting, tunnel, proxy,
authentication, validation, workflow, and downstream actions are Unknown.

### Russow Institute publication

```mermaid
flowchart LR
    A[Repository docs] --> B[MkDocs build]
    B --> C[Generated site]
    C --> D[TrueNAS publication]
    D --> E[Cloudflare]
```

No single remote-administration or service-to-service API flow is fully
verified by this repository.

## Credential-Class Register

This register documents classes, not values.

| Class | Issuer | Holder/consumer | Storage | Revocation | Status |
| --- | --- | --- | --- | --- | --- |
| GitHub authentication | GitHub | Authorized contributor/Git | Approved protected mechanism | GitHub | Current class |
| Cloudflare deployment | Cloudflare | Authorized operator/tooling | Protected environment or credential manager | Cloudflare | Exact mechanism unknown |
| TrueNAS publication | TrueNAS | Authorized operator/SSH | Protected SSH mechanism | TrueNAS | Exact mechanism unknown |
| Website webhook authorization | Unknown | Unknown | Unknown | Unknown | Unknown |
| EspoCRM user/API authentication | EspoCRM | Authorized users/integrations | Protected service or credential manager | EspoCRM | Details unknown |
| Authentik credentials | Authentik | Unknown | Unknown | Unknown | Not verified |
| Tailscale credentials | Tailscale | Unknown | Unknown | Unknown | Not verified |
| Cloudflare Tunnel credential | Cloudflare | `cloudflared` | Never Git | Cloudflare | Not verified |
| n8n credentials | Service issuer | n8n workflows | Protected n8n store if implemented | Issuer/n8n | Not verified |

## Demonstrated Discrepancies

- `get/apply.html` uses `Content-Type: apply/json`; the expected JSON media type
  is `application/json`. This is an uncorrected website implementation defect.
- A secret embedded in browser JavaScript is visible to visitors and cannot be
  confidential.
- Current source uses `automation.midwestguard.net`; obsolete material used
  different `hooks.*` endpoints.
- Directory names, deployment exclusions, and redirects do not make committed
  GitHub content private.
- Generated `.wrangler` account metadata was tracked and is removed by ACP-006.

## Historical Disposition

`Private-Docs/` mixed proposed, obsolete, and purported current state without
reliable provenance. It is removed as current authority; Git history preserves
its bytes. Removal does not prove that every named service is absent.

Empty `Backend-Odoo-Seperate-system/` placeholders, stale `file-tree.txt`, and
superseded `Cloudflare-Config/` copies are also removed.

## Unresolved Verification Register

Verify before promoting any Unknown item to Current:

1. ownership and runtime of `automation.midwestguard.net`;
2. active n8n workflows and topology;
3. Cloudflare Tunnel routes;
4. Tailscale administrative access;
5. Authentik deployment and integrations;
6. reverse-proxy topology;
7. Nextcloud role and access boundary;
8. EspoCRM authentication, MFA, API, backup, and administration;
9. the exact Odoo website-builder boundary;
10. server-side webhook validation, rate limiting, abuse prevention, and data retention;
11. credential owners, storage mechanisms, and revocation procedures.

Verification shall avoid retrieving secret values.

## Architecture Boundaries

This document does not authorize runtime changes. Planned integrations are not
current implementation. Implementation defects require separate authorization.

## Related Standards

- [Credential and Token Handling Standard](../standards/CREDENTIAL-AND-TOKEN-HANDLING-STANDARD.md)
- [Wiki Presentation Standard](../standards/WIKI-PRESENTATION-STANDARD.md)
- [Knowledge Linking Standard](../standards/KNOWLEDGE-LINKING-STANDARD.md)

## Continue Reading

- [ACP-006](acp/ACP-006-INFRASTRUCTURE-ACCESS-AND-CREDENTIAL-DOCUMENTATION.md)
- [ACP-005](acp/ACP-005-INTERIM-ESPOCRM-BRIDGE-AND-ERP-BETA.md)
- [Website Operations Manual](../operations/WEBSITE-OPERATIONS-MANUAL.md)
