# ACP-005 — Interim EspoCRM Operational Bridge and ERP Beta Program

Version: 1.0.0

Status:
Approved

Type:
Architecture Change Proposal

Authority:
Systems Architect Discipline

Proposed:
2026-09-03

Approved:
2026-09-03

Scope:
Interim CRM operations, bounded EspoCRM implementation, ERP beta development, migration readiness, and replacement transition

---

## Context

ACP-004 reopened MIDWESTGuard CRM / ERP platform selection and froze substantial
new EspoCRM-specific implementation while the durable platform-evaluation
methodology was developed.

That methodology is now validated as `evaluate-open-source-platforms` V1.1.

MIDWESTGuard still needs an operational CRM while an ERP-class replacement is
evaluated and brought to beta. The existing EspoCRM installation is healthy,
already partially configured, and contains useful business-specific work.

## Proposed Decision

Use EspoCRM as a **bounded interim operational bridge**, not as the strategic
long-term business platform.

In parallel, accelerate evaluation and beta construction of an **ERP-class**
replacement.

No final replacement is selected by this ACP.

## Interim EspoCRM Scope

Prioritize only:

1. Accounts and Contacts;
2. Leads and Opportunities;
3. `MWG Job`;
4. `MWG Work Order`;
5. Tasks, Calls, Meetings;
6. Documents and attachments;
7. Inspection and Warranty only when operationally required;
8. critical status controls;
9. critical immediate and delayed task automation;
10. API access;
11. complete backup, export, and reconstruction capability.

EspoCRM's internal background `Job` entity shall not be used as the
MIDWESTGuard business Job.

## JobNimbus Reconstruction Boundary

Historical JobNimbus configuration remains evidence.

Historical workflow/status mechanics shall not be silently rewritten into a
cleaner synthetic pipeline.

Current governed lead-qualification rules control where they supersede
historical behavior.

The operating model remains:

```text
Party / Contact
    |
    +-- Lead / qualification
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
    +-- other trade work
```

## EspoCRM Stop Line

Do not deeply build the following into EspoCRM unless separately approved:

- general ledger;
- accounts payable;
- production accounting;
- payroll;
- warehouse management;
- durable procurement architecture;
- full inventory accounting;
- comprehensive job costing;
- large custom quote/invoice suites;
- a second major custom frontend;
- proprietary paid EspoCRM extensions.

Minimal references to external accounting, estimating, suppliers, or documents
are allowed.

## Software-Freedom Boundary

No EspoCRM commercial extension is approved by this ACP.

Required interim behavior shall use only:

- EspoCRM open-source core;
- configuration available in open-source core;
- MIDWESTGuard-owned open-source custom code;
- separately governed external integrations.

## Customization and Exit Boundary

All MIDWESTGuard-specific behavior shall be isolated from upstream core where
technically possible, version controlled, documented, recoverable, and
independently reconstructable.

Every custom entity, field, relationship, workflow state, document link, and
automation added during the bridge period must be recoverable for migration.

## Interim Automation Priorities

Implement only automations with demonstrated operating value, beginning with:

1. signed-contract paperwork/check tasks;
2. appointment-result follow-up;
3. production-completion follow-up;
4. billing follow-up;
5. roof inspection;
6. siding inspection;
7. warranty tasks.

Do not reproduce every historical JobNimbus automation merely because it
existed.

## ERP Beta Program

The ACP-004 first-round set remains:

1. Frappe CRM + ERPNext;
2. Tryton;
3. Apache OFBiz.

Because the owner prefers an ERP-class destination, the beta program shall
prioritize candidates able to carry the architecture beyond CRM.

A second standalone CRM should not displace ERP evaluation unless no ERP
candidate satisfies the validated architecture.

## ERP Beta Gate

A useful beta must prove with representative non-production data:

1. customer/contact + property/location + lead/deal;
2. Residential and Commercial Job;
3. Roof and Siding Work Orders with distinct workflows;
4. immediate signed-contract automation;
5. delayed +2 day / +2 week style automation;
6. supplier/material/PO/receipt linked to Job;
7. actual material cost linked to Job;
8. quote/invoice/payment relationship sufficient for Job profitability;
9. Inspection and Warranty without required proprietary purchase;
10. API CRUD;
11. field/phone usability;
12. full backup and actual restore;
13. exit/reconstruction preserving relationships/history/documents/custom objects;
14. representative patch/upgrade;
15. stabilized recurring maintenance estimate.

## ERP Beta Priority Questions

### Apache OFBiz

Can MIDWESTGuard restoration behavior be isolated in one or a small number of
version-controlled plugins/components while Apache upstream remains
independently patchable and upgradeable?

### Frappe / ERPNext

Can MIDWESTGuard reach a credible ERP beta faster while preserving software
freedom, migration fidelity, update survivability, and acceptable recurring
maintenance?

Tryton remains in the same first-round comparison.

## Accounting Boundary

Current accounting systems remain authoritative unless changed by separate
governance.

ERP candidates may exercise accounting capabilities with representative
non-production data only.

## Proposed Implementation Sequence

### Phase 0 — Preserve current EspoCRM

- confirm version and health;
- complete database/files/config backup;
- representative restore test;
- export current custom metadata;
- capture current custom code in version control;
- document the current baseline.

### Phase 1 — Minimum operational CRM

- Accounts;
- Contacts;
- Leads;
- Opportunities;
- governed qualification/ownership rules;
- exact required customer statuses;
- usable layouts.

### Phase 2 — Job execution bridge

- `MWG Job`;
- `MWG Work Order`;
- exact required Job and trade Work Order statuses;
- Job -> Work Order relationships;
- documents/attachments;
- Inspection/Warranty where currently needed.

### Phase 3 — Critical automation

Implement the highest-value historical JobNimbus automations without requiring
paid EspoCRM extensions.

### Phase 4 — Exit validation

Prove representative export/recovery, relationship reconstruction,
document/attachment association, custom-code recovery, and complete restore.

### Phase 5 — ERP beta

Run the validated POC in parallel.

## Success Condition

This architecture succeeds when MIDWESTGuard has a usable interim CRM, EspoCRM
work remains bounded and migration-ready, no unapproved proprietary dependency
is introduced, and ERP beta work advances concurrently.

## Failure Conditions

Reassess if:

- EspoCRM begins requiring significant weekly development;
- required interim capability requires a proprietary paid extension;
- custom logic cannot be isolated or version controlled;
- backup/restore or exit reconstruction fails;
- the bridge begins absorbing ERP functionality;
- ERP beta repeatedly stalls because the bridge consumes engineering effort.

## Decision Boundary

If approved, this ACP authorizes bounded EspoCRM configuration and custom
open-source development, `MWG Job`, `MWG Work Order`, critical current
workflows, exit-readiness work, and parallel ERP beta development.

It does not authorize paid EspoCRM extensions, production accounting migration,
production migration to an ERP candidate, destructive EspoCRM removal, a final
orchestration platform, or treating historical JobNimbus mechanics as
automatically current policy.

## Relationship to ACP-004

ACP-004 remains authoritative for durable platform-selection requirements.

If approved, ACP-005 changes only the operational freeze imposed by ACP-004.
The freeze becomes a bounded interim-bridge authorization with explicit stop
lines and migration controls.

All ACP-004 software-freedom, portability, exit, maintenance, monitoring, and
candidate-evaluation requirements remain in force.
