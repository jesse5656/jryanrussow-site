# Credential and Token Handling Standard

Version: 1.0.0

Status:
Active Standard

Authority:
Systems Architect Discipline

Governing Proposal:
ACP-006

---

## Purpose

Govern how credentials, tokens, secrets, and authentication material are
documented, stored, transmitted, rotated, and revoked without exposing values.

## Governing Principle

Document responsibility and lifecycle. Never document the secret value.

## Applicability

This standard applies to passwords, API keys, access and refresh tokens,
private keys, tunnel and database credentials, session cookies, recovery codes,
webhook signing secrets, deployment credentials, service accounts, and
encryption keys.

## Required Metadata

For every material credential class, identify its purpose, issuer, owner,
custodian, consumer, transmission method, approved storage category, rotation
expectation, revocation method, source-control eligibility, implementation
status, dependencies, and unresolved risk—without recording values.

## Source Control

Secret values shall never be committed to Git. Environment files, private
keys, credential exports, token caches, recovery codes, session exports,
tunnel credentials, database secrets, and generated authentication caches shall
not be committed when sensitive.

Deletion does not remove prior Git history. Suspected exposure requires
separate incident review and, when necessary, revocation or rotation.

## Documentation

Documentation may record categories, roles, approved storage systems,
transmission protocols, renewal expectations, revocation procedures, and
verification status.

Documentation shall not record values, recoverable encodings, private keys,
live tokens, cookies, recovery codes, secret-bearing screenshots, or commands
containing live credentials. Placeholders must be unmistakably nonfunctional.

## Storage

Use a risk-appropriate password manager, service-native secret store, protected
runtime environment, operating-system key store, or narrowly permissioned
automation-secret facility.

Markdown, source files, public browser JavaScript, issues, and chat handoffs are
not approved secret stores.

## Transmission

Transmit credentials only to the intended consumer through an appropriate
protected channel. Do not place them in URLs where safer methods exist, expose
them through browser JavaScript, log them, copy them into documentation, or
embed them in reusable command examples.

Public browser requests are untrusted client requests. A browser-delivered
value cannot be confidential. Public webhook protection requires appropriate
server-side controls; this standard does not select or deploy them.

## Rotation and Revocation

Identify whether rotation is expiration-, compromise-, personnel-, provider-,
manual-, or service-driven, or Unknown. This standard does not establish a
recurring schedule. A recurring enterprise rotation or access-review procedure
requires the applicable OCP.

Each material class should identify who may revoke it, where revocation occurs,
affected consumers, expected impact, and replacement or recovery action.

## Least Privilege

Grant only required access. Prefer individual revocable identities over shared
administrative credentials. Distinguish service accounts from human identities.

## Diagnostics

Avoid secret values. Prefer filenames, permissions, key names, redacted
structure, issuer and expiration metadata, and necessary non-secret identifiers.

## Current-State Discipline

Documentation, examples, or available product features do not prove
implementation. Use Current, Approved, Planned, Optional, Historical, Obsolete,
or Unknown consistently with the canonical infrastructure architecture.

## Exceptions

An exception must identify the credential class, reason, compensating controls,
approving authority, and expiration or review condition without exposing the
value.

## Related Architecture

- [Infrastructure, Access, and Request Flows](../architecture/INFRASTRUCTURE-ACCESS-AND-REQUEST-FLOWS.md)
- [ACP-006](../architecture/acp/ACP-006-INFRASTRUCTURE-ACCESS-AND-CREDENTIAL-DOCUMENTATION.md)

## Related Standards

- [Deterministic Automation Standard](DETERMINISTIC-AUTOMATION-STANDARD.md)
- [Knowledge Linking Standard](KNOWLEDGE-LINKING-STANDARD.md)
- [Wiki Presentation Standard](WIKI-PRESENTATION-STANDARD.md)

## Continue Reading

- [Repository Change Workflow](../operations/REPOSITORY-CHANGE-WORKFLOW.md)
- [AI Collaboration Standard](../operations/workspace/AI-COLLABORATION-STANDARD.md)
