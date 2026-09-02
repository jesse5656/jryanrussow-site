# CRM / ERP Platform Evaluation — MIDWESTGuard

<div class="ri-document-meta" markdown>

**Document Type**
Architecture Evaluation

**Status**
Active Evaluation — No Platform Selected

**Version**
1.0.0

**Authority**
Systems Architect Discipline

**Effective Date**
2026-09-02

**Governing Proposal**
ACP-004

</div>

---

## Executive Orientation

MIDWESTGuard is rebuilding the business capability historically carried through JobNimbus and extending beyond CRM toward an integrated ERP architecture.

The objective is not a screen-for-screen JobNimbus clone. The objective is to preserve and improve the business capability while preventing another generation of data lock-in, format loss, licensing surprise, or repeated migration.

> Preserve EspoCRM, stop substantial new Espo-specific implementation, and require a replacement candidate to prove long-term operational independence before migration.

No replacement platform is selected.

---

## Current Evaluation State

| Component | State |
| --- | --- |
| JobNimbus | Historical operational evidence only |
| EspoCRM | Installed, healthy, preserved, substantial new development frozen |
| Final CRM platform | Unresolved |
| Final ERP platform | Unresolved |
| Frappe CRM + ERPNext | First-round POC |
| Tryton | First-round POC |
| Apache OFBiz | First-round POC |
| ADempiere | Reserve / second-wave candidate |
| Dolibarr | Secondary research |
| SuiteCRM | CRM reference candidate, not first-round ERP |
| Corteza | Application-platform reference, not first-round ERP |
| Odoo | Eliminated under current proprietary-tier rule |
| Axelor | Eliminated under current proprietary-tier rule |
| xTuple/PostBooks | Eliminated as current foundation |
| Platform monitoring | Active interim weekly condition watch |

---

## Required Operating Model

Historical evidence supports at least:

```text
Customer / Contact
        ↓
       Job
        ↓
   Work Order
```

The selected platform must not collapse these merely because its native terminology differs.

A Job represents the broader engagement.

A Work Order represents bounded execution work within that Job.

Trade Work Orders may require different statuses, materials, inspections, completion conditions, crews, payment logic, and warranty behavior.

---

## Core Platform Acceptance Test

Every first-round candidate receives the same bounded proof.

### 1. Customer and sales

Create a customer/contact, service property/location, and lead/opportunity. Prove sales history survives transition into operations.

### 2. Job

Create one Residential Job and one Commercial Job. Prove each can carry a governed lifecycle.

### 3. Trade Work Orders

Create Roof and Siding Work Orders under a Job and prove they can use different workflow behavior.

### 4. Immediate automation

Trigger a Signed Contract-type event and automatically create required immediate follow-up work.

### 5. Delayed automation

Persist a future action comparable to historical two-day and two-week follow-up behavior. User logout must not cancel it.

### 6. Procurement

Create supplier, material, purchase order, and receiving event tied to the Job.

### 7. Actual job cost

Prove material cost reaches the Job. Test labor and subcontractor cost where supported.

### 8. Revenue

Create quotation/estimate, invoice, and payment. Prove revenue and costs can be reconciled at Job level.

### 9. Construction-specific records

Create first-class Inspection and Warranty records without proprietary software.

### 10. Integration

Prove programmatic create/read/update behavior suitable for Immich, HOVER, accounting integration, orchestration, documents, and future AI-assisted processes.

### 11. Field use

Use representative workflows on desktop and phone.

### 12. Backup and restore

Back up a disposable instance, restore it, and verify database, files, configuration, custom logic, relationships, and permissions.

### 13. Exit test

Export or independently recover the representative dataset and reconstruct identifiers, relationships, custom fields, state, history, documents, attachments, financial links, and custom objects.

### 14. Upgrade test

Apply a representative upstream patch or upgrade and verify custom objects, custom logic, API behavior, data, reports, and automations.

### 15. Maintenance burden

Estimate initial engineering separately from recurring patching, backups, restore testing, security monitoring, upgrades, dependency maintenance, and custom-code work.

Routine weekly development is a major negative even when functional capability passes.

---

## Candidate — Frappe CRM + ERPNext

### Hypothesis

Metadata-driven customization plus broad ERP functionality may provide the lowest implementation burden while retaining strong data ownership and ERP depth.

### Questions to prove

- CRM/ERP integration stability;
- whether ERPNext Project should represent MIDWESTGuard Job;
- whether a separate Job should reference Project;
- separation from ERPNext manufacturing Work Order;
- ability to keep the custom layer in a source-controlled MIDWESTGuard app;
- phone usability;
- major-upgrade burden.

---

## Candidate — Tryton

### Hypothesis

Foundation stewardship, conservative modular architecture, and a clean OSS model may provide strong long-term independence at the cost of more Python development.

### Questions to prove

- amount of custom Python required;
- whether Job/Work Order logic can stay isolated in a maintained module;
- field/mobile usability;
- major-series migration burden;
- recurring maintenance after stabilization.

---

## Candidate — Apache OFBiz

### Hypothesis

OFBiz may be the strongest long-horizon ownership architecture if greater up-front engineering can produce a stable MIDWESTGuard-owned component without significant recurring development.

### Hard questions

1. Can custom behavior stay out of Apache upstream core?
2. Can security/patch releases be applied without rewriting the MIDWESTGuard plugin?
3. Can a future competent developer understand the plugin without reconstructing years of undocumented decisions?
4. Can routine operation occur without weekly development?
5. Can field users operate it without requiring a second major frontend project?
6. Can native Party, Order, Accounting, Procurement, Inventory, Work Effort, Project, Entity Engine, and Service Engine concepts be reused?
7. Is the integration layer adequate?
8. Can scheduled business logic survive normal upgrades?
9. Is backup/restore practical?
10. Can a complete data exit be independently reconstructed?

### OFBiz failure conditions

Major negative or fail if:

- customization repeatedly edits upstream core;
- routine patching breaks the MIDWESTGuard layer;
- normal business changes require continual specialist framework work;
- field usability requires a second major application-development project;
- steady-state maintenance becomes a recurring weekly obligation;
- data exit is materially weaker than competing candidates.

### OFBiz success condition

OFBiz becomes highly competitive if most custom behavior is isolated, upstream remains upgradeable, the custom layer is understandable and version controlled, job/work-order behavior is natural, integration and recovery are sound, and steady-state maintenance is low after the initial build.

---

## Software-Freedom Classification

| Class | Meaning |
| --- | --- |
| NATIVE_OPEN_SOURCE | Ships in the OSS product |
| CONFIGURABLE_OPEN_SOURCE | Included OSS tooling can configure it |
| OPEN_SOURCE_EXTENSION | Separate OSS extension provides it |
| CUSTOM_OPEN_SOURCE_BUILD | MIDWESTGuard must build and maintain it |
| EXTERNAL_INTEGRATION | Another system owns the capability |
| PROPRIETARY_PAID_DEPENDENCY | Required proprietary licensed software |
| MISSING | Candidate cannot currently provide it |
| UNKNOWN | Evidence is insufficient |

`UNKNOWN` is not a pass.

---

## Portability Classification

| Class | Meaning |
| --- | --- |
| PORTABLE_NATIVE | Complete meaningful export/recovery proven |
| PORTABLE_WITH_TRANSFORM | Meaning preserved with documented transformation |
| DATABASE_RECOVERABLE | Recoverable from documented database/schema |
| PARTIAL_EXPORT | Material information is lost |
| PROPRIETARY_FORMAT | Meaning depends on proprietary tooling |
| UNKNOWN | Exit behavior unproven |

---

## Maintenance Cost Model

For every candidate record:

- initial engineering hours;
- administrator hours/month;
- developer hours/month;
- security-patch burden;
- annual upgrade burden;
- major-upgrade burden;
- number of custom modules/repos;
- upstream-core modifications;
- specialist technologies required;
- restore-test effort;
- external dependency count.

Initial effort and recurring effort shall be reported separately.

A large initial build is not automatically worse than a smaller initial build.

---

## Decision Gate

No platform may be selected solely from marketing, screenshots, feature lists, license labels, reputation, or a successful installation.

Production selection requires the software-freedom gate, operational POC, backup/restore proof, exit proof, upgrade proof, and maintenance-burden assessment.

No production migration is currently authorized.
