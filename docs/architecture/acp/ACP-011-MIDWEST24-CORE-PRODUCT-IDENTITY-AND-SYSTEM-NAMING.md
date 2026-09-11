# ACP-011 — Midwest24 Core Product Identity and System Naming

Version: 1.0.0

Status: Approved

Approved: 2026-09-11

## Decision

Midwest24 Core is the product family.

The approved product identities are:

- Midwest24 Core Command
  - Function: CRM / front-office command system
  - Current implementation: EspoCRM
  - Hostname: `command.midwest24.com`

- Midwest24 Core Enterprise
  - Function: ERP / enterprise operational system
  - Current implementation candidate: Apache OFBiz
  - Hostname: `enterprise.midwest24.com`

- Midwest24 Core Nexus
  - Function: future custom Midwest24-owned platform
  - Implementation: custom Midwest24 software
  - Hostname: `nexus.midwest24.com`

The following name is reserved but not yet adopted:

- Midwest24 Operations
  - Potential function: governed SOP, training, operating-manual, and operational-knowledge environment
  - Potential hostname: `operations.midwest24.com`

## Product Identity Is Independent of Implementation

Product names describe durable Midwest24 functional systems, not the software package currently implementing them.

Therefore:

- EspoCRM is the current implementation of Midwest24 Core Command.
- Replacing EspoCRM does not rename Midwest24 Core Command.
- Apache OFBiz is the current implementation candidate for Midwest24 Core Enterprise.
- Replacing Apache OFBiz does not rename Midwest24 Core Enterprise.
- Midwest24 Core Nexus is reserved for the future Midwest24-owned custom platform.
- Midwest24 Operations remains reserved until separately adopted.

Implementation names remain appropriate in technical documentation, configuration, deployment records, diagnostics, and dependency references.

## Midwest24 Core Command

Midwest24 Core Command owns the CRM and front-office system boundary, including:

- Leads
- Contacts
- customer relationship context
- qualification and follow-up
- front-office queues
- communications context
- approved website-intake destination behavior

ACP-005 continues to govern the bounded EspoCRM implementation.

## Midwest24 Core Enterprise

Midwest24 Core Enterprise is the ERP product.

Its candidate responsibilities include:

- jobs and work orders
- procurement
- production and operational execution
- inventory where adopted
- enterprise workflows
- billing and other ERP functions where separately authorized

Apache OFBiz is currently an implementation candidate for Midwest24 Core Enterprise.

This decision does not select OFBiz as the final ERP platform and does not authorize production migration.

## Midwest24 Core Nexus

Midwest24 Core Nexus is reserved for the future Midwest24-owned custom application/platform.

Existing prototypes or repositories shall not automatically be renamed Nexus.

Adoption of the Nexus identity requires reconciliation with governing architecture.

## Midwest24 Operations Reservation

The name `Midwest24 Operations` and the potential hostname `operations.midwest24.com` are reserved.

Potential scope includes:

- standard operating procedures
- operating manuals
- workforce training
- process execution guidance
- institutional operating knowledge

This ACP does not rename `mwg-ops-manual` and does not activate Midwest24 Operations as a product.

## Hostname Policy

Approved functional hostnames:

- `command.midwest24.com`
- `enterprise.midwest24.com`
- `nexus.midwest24.com`

Reserved:

- `operations.midwest24.com`

DNS, TLS, routing, authentication, and production deployment are outside the scope of this naming decision.

## Repository Propagation

This decision shall be propagated to:

- `midwest24-site`
- `mwg-espocrm-customizations`
- `mwg-ofbiz`
- applicable architecture records in `jryanrussow-site`

`mwg-platform` shall not be identified as Midwest24 Core Nexus until its existing governed purpose is reconciled.

`mwg-ops-manual` shall not be renamed Midwest24 Operations unless separately authorized.

## Relationship to Existing Governance

This ACP supplements but does not replace:

- ACP-004 — Durable Open Source Business Platform
- ACP-005 — Interim EspoCRM Bridge and ERP Beta Program
- ACP-007 — MIDWESTGuard-Owned Application Platform
- OCP-012 — MIDWESTGuard Communications Architecture

Where those records refer to EspoCRM or Apache OFBiz, those remain valid implementation references.

The durable Midwest24 product identities are:

- Command = CRM / front office
- Enterprise = ERP / enterprise execution
- Nexus = future custom Midwest24 platform
- Operations = reserved
