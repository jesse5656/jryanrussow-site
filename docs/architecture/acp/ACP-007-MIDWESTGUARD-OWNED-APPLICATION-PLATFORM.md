# ACP-007 — MIDWESTGuard-Owned Application Platform Prototype

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
MIDWESTGuard CRM application architecture, owned application-platform core,
bounded prototype authorization, infrastructure boundaries, AI boundaries,
software freedom, portability, and migration-readiness.

---

## Context

ACP-004 reopened MIDWESTGuard's durable business-platform selection and
established software-freedom, portability, backup/restore, upgrade, and
maintenance requirements.

ACP-005 authorized EspoCRM as a bounded interim operational bridge while a
durable replacement architecture is evaluated.

Subsequent operational work has clarified the MIDWESTGuard CRM domain and
demonstrated substantial business-specific behavior including:

- Accounts and Contacts;
- Leads;
- Opportunities;
- service properties / locations;
- appointments;
- `MWG Job`;
- `MWG Work Order`;
- trade-specific execution;
- documents and job files;
- tasks, calls, meetings, and activities;
- roles and access controls;
- lead attribution;
- service classification;
- deterministic operational controls.

The operating model shall continue to preserve the distinction:

```text
Account / Contact
        |
        v
Property / Service Location
        |
        v
Lead
        |
        v
Opportunity
        |
        v
MWG Job
        |
        +-- MWG Work Order — Roof
        +-- MWG Work Order — Siding
        +-- MWG Work Order — Gutters
        +-- other governed trade work
```

Sales, customer-job management, and trade execution are different business
concepts and shall not be collapsed into one generic pipeline.

The current EspoCRM implementation has also demonstrated the cost and
architectural friction created when MIDWESTGuard-specific operating behavior
must remain inside another finished business application's entity,
customization, UI, licensing, and upgrade assumptions.

At the same time, MIDWESTGuard already possesses infrastructure that materially
changes the build-versus-platform calculation:

the TrueNAS Goldeye Data Hypervisor provides durable storage and application
hosting infrastructure;
the dedicated AI Worker Node architecture separates computational workloads
from persistent storage;
MIDWESTGuard maintains repository-governed business capability definitions,
deterministic automation standards, backup practices, and software-freedom
requirements.

The durable architecture question is therefore no longer limited to choosing
among finished CRM or ERP products.

MIDWESTGuard should also test whether it can own the application/domain layer
directly while relying on mature general-purpose open-source infrastructure
beneath it.

## Proposed Decision

Authorize a bounded proof-of-concept for a MIDWESTGuard-owned application
platform and CRM built on conventional general-purpose open-source software.

The prototype shall test the hypothesis:

MIDWESTGuard can own its business domain model, application behavior,
workflow rules, authorization policy, API contracts, user experience,
audit model, automation, and AI governance without building commodity
infrastructure from scratch and without adopting another finished CRM,
ERP, low-code product, or specialized business-application framework as
the permanent business-domain foundation.

This ACP does not select the prototype for production.

It authorizes testing the architecture against the same durability standards
that apply to every other candidate.

## Architecture Principle

MIDWESTGuard shall own the software layer that expresses what is unique about
MIDWESTGuard.

MIDWESTGuard shall normally reuse mature commodity infrastructure for
capabilities that are not unique business intellectual property.

The intended boundary is:

```text
MIDWESTGuard CRM / Future MIDWESTGuard Applications
                        |
                        v
                MWG Platform Core
                -----------------
                domain model
                business rules
                state machines
                authorization policy
                audit/event model
                activity model
                document semantics
                automation rules
                API contracts
                integration contracts
                AI governance
                user experience
                -----------------
                        |
                        v
             General-Purpose OSS
             -------------------
             Python
             Django
             PostgreSQL
             REST tooling
             task/queue infrastructure
             cache/message infrastructure
             object/file storage
             OIDC/authentication integration
             standard web infrastructure
             -------------------
                        |
              +---------+---------+
              |                   |
              v                   v
      TrueNAS Goldeye        AI Worker Node
      Data Hypervisor        Compute Services
```

The exact commodity components remain subject to prototype evidence.

## Why Django Is Not the MIDWESTGuard Platform

The proposed prototype may initially use Django as its general-purpose
application framework.

Django shall be treated as replaceable commodity application infrastructure,
not as the owner of MIDWESTGuard's business architecture.

Django may provide:

HTTP/application infrastructure;
ORM/database access;
schema migrations;
authentication primitives;
sessions;
security primitives;
basic permission primitives;
administrative tooling.

Django shall not define:

what an Opportunity means;
what an MWG Job means;
what an MWG Work Order means;
MIDWESTGuard workflow states;
MIDWESTGuard authorization policy;
MIDWESTGuard business rules;
MIDWESTGuard API meaning;
MIDWESTGuard user experience;
MIDWESTGuard AI authority.

Those remain MIDWESTGuard-owned application concerns.

## MWG Platform Core Boundary

The platform core shall remain intentionally thin.

Initial shared capabilities may include only:

identity integration;
authorization policy conventions;
audit/event recording;
deterministic state-transition conventions;
activities and tasks;
document metadata and relationships;
background automation conventions;
notifications;
API conventions;
external integration contracts;
AI gateway and governance controls.

A capability shall not enter the shared platform core merely because it might
be useful someday.

Prefer application-local implementation until demonstrated reuse or durable
cross-application value justifies promotion into the core.

## Explicit Non-Goal — Do Not Build a Generic Framework

This program shall not attempt to recreate Frappe, Salesforce, Odoo, EspoCRM,
or another generalized application builder.

The prototype shall not build:

arbitrary administrator-created entity types;
a generic low-code database designer;
a general-purpose form designer;
a generic workflow designer;
an application marketplace;
a generic ERP;
a generic CRM product for third parties;
a generic report-builder platform unless later justified by actual operating
requirements.

Business-model changes shall normally remain repository-governed software
changes with source control, review, tests, migrations, and deployment.

## Commodity Infrastructure Boundary

MIDWESTGuard shall not custom-build mature commodity infrastructure without a
separately demonstrated reason.

Normally reuse proven implementations for:

operating systems;
database engines;
web servers;
TLS;
cryptographic primitives;
password hashing;
OAuth/OIDC protocols;
queue/message infrastructure;
object storage;
email transport;
PDF rendering;
backup engines;
container runtimes;
search engines where required.

Owning the application does not require reimplementing these technologies.

## Prototype Repository

If this ACP is approved, create a separate repository:

mwg-platform

The new repository shall contain the prototype application and its own
repository-governed engineering context.

Repository responsibilities shall remain separated:

jryanrussow-site

Owns global architecture decisions, software-freedom principles, durability
requirements, and this ACP.

mwg-ops-manual

Owns MIDWESTGuard business capabilities, operating requirements, policies,
business rules, data definitions, and operational authority.

It is the business specification.

mwg-espocrm-customizations

Remains implementation evidence, migration evidence, operational bridge
customization source, and a record of lessons learned from EspoCRM.

It shall not become the new platform repository.

mwg-platform

Shall own the new prototype software if this ACP is approved.

## Prototype Vertical Slice

The first prototype shall remain intentionally narrow.

Required domain sequence:

```text
Account / Contact
        |
        v
Property / Service Location
        |
        v
Lead
        |
        v
Opportunity
        |
        v
MWG Job
        |
        v
MWG Work Order
```

At minimum the prototype shall include:

authentication;
governed role/permission behavior;
Account / Contact;
Property / Service Location;
Lead;
Opportunity;
MWG Job;
MWG Work Order;
basic tasks/activities;
document attachment and relationship metadata;
auditable business events;
REST/API behavior;
one persisted delayed deterministic automation;
one AI-assisted capability;
backup and restore;
independent data reconstruction;
representative framework/dependency upgrade.

No unrelated ERP functionality shall be prototyped.

## Deterministic Automation Prototype

The prototype shall include one representative deterministic business
transaction.

Candidate:

```text
Governed Executed Contract Event
        |
        v
Create exactly one MWG Job
        |
        +-- preserve Opportunity relationship
        |
        +-- create required handoff tasks
        |
        +-- create governed Work Order(s) where rules require
```

The transaction shall be idempotent.

Retrying an already-successful operation shall not create duplicate Jobs,
Work Orders, or required tasks.

The automation shall be reviewable, version controlled, testable, and
traceable to documented business rules.

## AI Prototype

The AI capability shall remain non-authoritative.

A representative test may classify or extract information from an intake or
document and propose:

document classification;
service/trade classification;
customer/property association;
metadata;
work-order draft information.

AI output shall be treated as a proposal unless separately governed authority
exists.

Authoritative state changes shall require deterministic validation and/or
accountable human approval as appropriate.

## AI Worker Boundary

The dedicated AI Worker Node is a compute service, not the system of record.

The CRM/platform shall continue to perform core transactional operations if
the AI Worker Node is unavailable.

The AI Worker Node may provide:

LLM inference;
embeddings;
semantic retrieval;
document classification;
information extraction;
transcription;
vision processing;
governed agent execution.

Persistent authoritative CRM records shall remain in the transactional data
architecture, not inside model state, vector indexes, prompts, or AI-worker
local storage.

## Data Hypervisor Boundary

This ACP does not redesign the TrueNAS Goldeye Data Hypervisor.

The prototype may use the existing Data Hypervisor architecture for
representative:

application hosting;
persistent database storage;
file/object storage;
snapshots;
backups;
restore testing.

Persistent application data shall follow the established storage and
disaster-recovery architecture.

No production infrastructure deployment is authorized merely by approval of
this prototype.

## EspoCRM Boundary

EspoCRM remains the approved bounded operational bridge under ACP-005.

This ACP does not authorize:

destructive EspoCRM removal;
production data migration;
disabling operational EspoCRM functionality;
rewriting current Espo workflows solely for the prototype;
mixing prototype code into the Espo customization repository.

The existing Espo implementation shall be used as evidence for:

business requirements;
field semantics;
domain relationships;
permission requirements;
workflow lessons;
migration fixtures;
upgrade/customization lessons.

Current production operations must not depend on prototype availability.

## Relationship to ACP-004

ACP-004 remains authoritative for:

software freedom;
data portability;
backup and restore;
exit reconstruction;
source-controlled custom logic;
upgrade survivability;
maintenance burden;
long-horizon operational independence.

If this ACP is approved, ACP-004's first-round candidate set is expanded to
include:

MIDWESTGuard-owned application platform on conventional open-source
infrastructure.

For the bounded CRM architecture question, this owned-platform prototype may
be evaluated before additional finished-platform implementation because it
directly tests whether the business-domain layer itself should be owned.

No ERP production selection is made by this ACP.

## Relationship to ACP-005

ACP-005 remains authoritative for the live EspoCRM bridge.

If this ACP is approved, it supersedes ACP-005 only to the limited extent that
ACP-005 gave priority to an ERP-class replacement before a second standalone
CRM architecture.

This ACP authorizes a separate owned-CRM/application-platform prototype while
keeping accounting and ERP domains external.

It does not authorize production replacement.

## Software-Freedom Requirement

Required prototype behavior shall be classified under the ACP-004
software-freedom model.

A required capability that depends on an unapproved proprietary software
component fails the prototype gate.

Optional commercial support, hosting, consulting, or development assistance
does not itself fail the gate when MIDWESTGuard retains independent operation,
source, data, and reconstruction capability.

## Portability Requirement

The prototype shall demonstrate independent recovery of:

stable identifiers;
Account / Contact relationships;
Property relationships;
Lead relationships;
Opportunity relationships;
Job relationships;
Work Order relationships;
custom/business fields;
workflow states;
audit history;
activities;
document metadata;
document/file associations;
authorization-relevant data.

A flattened export that loses material relationships is not sufficient.

## Backup and Restore Requirement

A disposable prototype environment shall be:

populated with representative data;
backed up;
destroyed or independently recreated;
restored;
validated for database state, files, relationships, permissions,
application code, and automation state.

A backup that has not survived an actual restore test is not sufficient.

## Upgrade Requirement

The prototype shall undergo at least one representative supported-framework or
dependency upgrade.

The test shall verify:

domain models;
database migrations;
APIs;
permissions;
UI behavior;
deterministic automation;
audit events;
documents;
representative data.

Routine modification of upstream framework code is a major negative and may be
a failure condition.

## Field-Usability Requirement

The prototype shall be exercised through representative office and field
workflows.

A design that requires a second large frontend project merely to become usable
shall count strongly against the architecture.

The prototype may use framework administrative interfaces for developer or
emergency administration, but normal MIDWESTGuard users shall ultimately
interact with a coherent MIDWESTGuard-owned operational interface.

## Maintenance Requirement

Initial development effort and stabilized recurring effort shall be measured
separately.

The prototype shall estimate:

administrator hours/month;
developer hours/month;
dependency update burden;
security patch burden;
restore-test burden;
annual upgrade burden;
number of custom modules;
external dependency count;
specialist skill requirements.

The long-term target established by ACP-004 remains the controlling durability
objective.

## Prototype Success Criteria

The owned-platform architecture passes the first architectural gate only if:

the canonical CRM domain can be represented naturally;
all MIDWESTGuard business logic remains in MIDWESTGuard-owned source;
no upstream framework modification is routinely required;
required functionality passes the software-freedom gate;
authorization tests pass;
deterministic automation is idempotent and auditable;
the API is usable without bypassing domain rules;
backup and actual restore succeed;
independent data reconstruction succeeds;
a representative upgrade succeeds;
core CRM operation survives complete AI-worker unavailability;
field usability is credible;
recurring-maintenance evidence remains compatible with the long-horizon
durability objective.
## Prototype Failure Conditions

Stop or reassess the owned-platform approach if:

implementing ordinary CRM capability repeatedly requires recreating large
quantities of mature application-platform infrastructure;
the prototype begins evolving into a generic low-code framework;
authorization cannot be made understandable and testable;
schema migrations become unsafe or opaque;
routine changes require modifications to upstream framework source;
field usability requires a second major application before ordinary use;
backup/restore or exit reconstruction fails;
framework upgrades routinely break MIDWESTGuard behavior;
AI becomes required for basic transactional operation;
recurring software-development dependency is materially greater than the
alternatives after stabilization.

Failure of this prototype does not justify forcing it into production.

If it fails, return to the governed platform evaluation and compare the
observed failure against Frappe, EspoCRM, OFBiz, Tryton, full custom, or another
qualified architecture.

## Non-Goals

This ACP does not authorize:

production CRM replacement;
production data migration;
destructive EspoCRM changes;
accounting migration;
payroll;
general ledger;
accounts payable;
warehouse management;
inventory accounting;
manufacturing;
tax systems;
an ERP implementation;
a generic low-code platform;
redesign of TrueNAS Goldeye;
redesign of the AI Worker Node;
unrestricted autonomous AI actions;
customer or vendor portals beyond what is necessary for the bounded
prototype.
## Decision Boundary

Approval of this ACP would authorize:

creation of the mwg-platform repository;
establishment of its repository governance and engineering baseline;
a bounded conventional-stack prototype;
use of non-production or explicitly controlled representative data;
read-only study of EspoCRM behavior and schema as migration/requirement
evidence;
backup/restore, exit, upgrade, security, API, usability, and maintenance
testing;
one governed deterministic automation prototype;
one bounded non-authoritative AI capability.

Approval would not authorize production adoption.

A later evidence-based architecture decision is required before any production
migration.

## Immediate Next Action After Approval

Create the mwg-platform repository and establish the smallest governed
prototype capable of testing:

Account / Contact → Property → Lead → Opportunity → MWG Job → MWG Work Order

Do not expand beyond that vertical slice until the architecture has passed its
first formal gate.
