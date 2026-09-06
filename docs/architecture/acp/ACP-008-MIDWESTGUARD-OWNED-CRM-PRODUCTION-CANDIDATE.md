# ACP-008 — MIDWESTGuard-Owned CRM Production-Candidate Architecture

Version: 1.0.0

Status:
Approved

Type:
Architecture Change Proposal

Authority:
Systems Architect Discipline

Proposed:
2026-09-06

Approved:
2026-09-06

Scope:
MIDWESTGuard-owned CRM production-candidate validation and the continuing
EspoCRM bridge boundary.

## Proposed Decision

Advance the thin MIDWESTGuard-owned application platform as the preferred
strategic CRM/application architecture into bounded production-candidate
validation.

Decision:

**CONDITIONAL ADVANCE**

Production migration and cutover are not authorized.

## Evidence Supporting Advancement

The ACP-007 prototype demonstrated:

- direct ownership of the canonical Account / Contact → Property / Service
  Location → Lead → Opportunity → MWG Job → MWG Work Order domain;
- preservation of Opportunity, Job, and Work Order as distinct concepts;
- MIDWESTGuard business behavior in source-controlled MIDWESTGuard code;
- explicit tested authorization;
- auditable application events;
- transactional and idempotent deterministic automation;
- bounded non-authoritative AI;
- core transactional operation with AI unavailable;
- PostgreSQL logical backup;
- deliberate database destruction and successful actual restore;
- preservation of relational, automation, audit, and AI provenance evidence;
- independent reconstruction from repository migrations;
- representative Django 5.2.17 to 6.1.1 compatibility testing;
- zero required application changes in that representative upgrade test;
- zero required migration changes in that representative upgrade test;
- no routine modification of upstream framework source.

These results materially reduce the lock-in, portability, reconstruction, and
upgrade risks identified by ACP-004.

## Evidence Still Required Before Production Adoption

### Remaining business semantics

The following remain intentionally unresolved and must be governed through
`mwg-ops-manual`:

- Lead qualification/disqualification/closure taxonomy;
- complete Opportunity status vocabulary;
- complete MWG Job lifecycle vocabulary;
- complete MWG Work Order workflow vocabulary;
- permanent Work Order trade taxonomy;
- Account operating semantics;
- Property / Service Location fields and relationship semantics;
- Job File Complete controlled values;
- Capability 001 Process Owner.

They shall not be inferred from EspoCRM or framework defaults.

### Employee usability

Representative office and field workflows have not yet demonstrated a coherent
normal employee-facing operational interface.

Django administrative tooling is not the intended operational interface.

### Stabilized maintenance

ACP-004's initial target remains approximately two planned
administrator/developer hours per month or less after stabilization, excluding
exceptional security incidents and planned major upgrades.

That recurring maintenance target has not yet been demonstrated.

### Recovery completion

Production-candidate validation must additionally prove:

- representative Work Order recovery after its business rules are governed;
- actual object/file binary recovery paired with database recovery;
- production identity and permission mapping;
- identity-provider recovery implications.

### Migration readiness

A representative EspoCRM-to-owned-platform migration rehearsal must preserve
relationships and operating meaning for Accounts, Contacts, Properties, Leads,
Opportunities, Jobs, Work Orders, activities, documents, required history and
provenance, and authorization-relevant mappings.

A flattened export is insufficient.

## Production-Candidate Phases

1. Govern the remaining CRM/domain semantics.
2. Build the smallest coherent office/field employee workflow required for
   representative usability validation.
3. Validate production-shaped identity, permissions, file storage, backup,
   restore, security, monitoring, deployment, and rollback.
4. Measure stabilized maintenance burden against ACP-004.
5. Perform a representative EspoCRM migration rehearsal.
6. Return for a separate production-adoption decision.

## EspoCRM Boundary

EspoCRM remains the bounded operational bridge under ACP-005.

Until a later production-adoption decision:

- do not destructively remove EspoCRM;
- do not disable required operations;
- do not migrate authoritative production data to the candidate;
- do not deepen EspoCRM into ERP scope;
- do not introduce unapproved proprietary extensions;
- preserve EspoCRM as migration evidence and operational fallback.

## ERP and Accounting Boundary

This proposal concerns the CRM/application domain.

It does not select an ERP, replace accounting, or authorize development of a
general ERP.

## Relationship to Existing Governance

ACP-004 remains controlling for software freedom, portability, actual restore,
independent reconstruction, upgrade survivability, operational independence,
and maintenance burden.

ACP-005 remains controlling for the live EspoCRM bridge.

ACP-007 remains the authority for the completed prototype evidence.

## Decision Boundary

Approval authorizes bounded production-candidate work.

Approval does not authorize production CRM migration, production cutover,
destructive EspoCRM removal, ERP migration, accounting replacement, generic
framework development, or unrestricted autonomous AI.

## Proposed Architecture Outcome

Preferred strategic CRM/application architecture:

**MIDWESTGuard-owned thin application platform on conventional general-purpose
open-source infrastructure.**

Operational bridge:

**EspoCRM under ACP-005.**

Production adoption:

**NOT AUTHORIZED.**

## Immediate Next Action After Approval

1. Resolve the remaining governed CRM/domain semantics.
2. Define the smallest representative employee office/field workflow required
   for usability validation.
