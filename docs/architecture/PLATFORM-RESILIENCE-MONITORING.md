# Platform Resilience Monitoring

<div class="ri-document-meta" markdown>

**Document Type**
Architecture Control

**Status**
Active

**Version**
1.0.0

**Authority**
Systems Architect Discipline

**Effective Date**
2026-09-02

</div>

---

## Purpose

Open-source platform selection must remain valid after installation.

This document defines signals that should trigger review before deterioration becomes an emergency migration.

---

## Current Interim Control

A weekly external condition watch named:

`Open Source Platform Watch`

is active as an interim control.

It monitors relevant CRM / ERP projects and credible replacements for material changes and should notify only when meaningful evidence appears.

This external task is useful operationally but is not the authoritative methodology.

The authoritative monitoring model is this repository and the validated `evaluate-open-source-platforms` V1.1 methodology. Runtime installation remains a separate operational transaction.

---

## Watch Categories

### Software freedom

Alert on:

- license changes;
- proprietary relicensing;
- new Enterprise/Professional feature boundaries;
- previously open required capability becoming paid;
- self-hosting restrictions;
- mandatory license-key changes.

### Security

Alert on:

- critical vulnerabilities affecting deployed versions;
- known exploitation;
- unsupported dependencies;
- supported branch ending;
- materially delayed patches.

CVE count alone is not evidence of project failure. Discovery and prompt patching may indicate healthier maintenance than silence.

### Release health

Watch:

- stable release cadence;
- security maintenance;
- branch support;
- maintenance releases;
- dependency currency.

Mature stable software does not require arbitrary feature churn.

### Maintainer / governance health

Watch:

- acquisition;
- foundation or governing-body changes;
- repository archival;
- primary maintainer departure;
- unusual concentration of control;
- prolonged unanswered critical issues;
- material contributor collapse.

### Data independence

Alert on changes to:

- export;
- API access;
- database access;
- backup procedures;
- restore procedures;
- file storage;
- attachment access;
- schema/documentation availability.

### Upgrade health

Alert on:

- broken migration paths;
- skipped-version restrictions that materially increase risk;
- required proprietary upgrade tooling;
- unsupported extension APIs;
- removal of extension interfaces.

### Replacement discovery

Also search for credible new platforms that materially improve:

- software freedom;
- data portability;
- recovery;
- maintenance burden;
- security;
- operational fit.

A newer product is not itself a migration reason.

---

## Monitoring State Model

### HEALTHY

No material signal requiring action.

### WATCH

Early-warning indicators exist. Continue monitoring.

### REVIEW_REQUIRED

Evidence is material enough to reopen architecture review.

### MIGRATION_READINESS

The current platform remains operational, but evidence justifies preparing and testing replacement paths.

### CRITICAL_EXIT_RISK

Immediate risk exists to data access, security, license independence, recoverability, or continued operation.

Initiate governed contingency action.

---

## Required Platform Baseline

For every adopted platform preserve:

- version;
- supported branch;
- license;
- steward;
- source repository;
- release date;
- backup method;
- restore method;
- export method;
- API status;
- custom extension architecture;
- critical dependencies;
- known replacement candidates;
- last successful restore test;
- last successful exit test;
- last architecture review.

Without a baseline, change detection is unreliable.

---

## Review Cadence

Current interim control:

- weekly condition watch;
- notify only on meaningful signals.

Also perform deliberate architecture health review:

- before major upgrades;
- after material license/governance changes;
- after significant security events;
- before major new custom development;
- when data portability changes;
- when a materially stronger replacement appears.

---

## Relationship to the Skill

The validated `evaluate-open-source-platforms` V1.1 methodology supports:

### Candidate Evaluation

Evaluate possible new software before adoption.

### Installed Platform Reassessment

Compare an installed platform with its prior baseline and determine whether new evidence changes the architecture decision.

---

## Continuity Principle

> A migration should normally be prepared while the current platform still works, not after access, security, licensing, or data portability has already failed.

Continuous monitoring exists to preserve that option.
