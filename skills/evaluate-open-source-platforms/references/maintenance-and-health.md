# Maintenance Burden and Platform Health

## Maintenance model

Estimate separately:
- implementation;
- routine monthly administration;
- routine monthly development;
- security response;
- annual upgrades;
- major-version upgrades;
- restore testing;
- dependency maintenance.

When the user provides a steady-state burden constraint, treat it as an acceptance criterion.

## Health baseline

Preserve:
- current version;
- supported branch;
- license;
- steward;
- repositories;
- release date;
- backup/restore method;
- export method;
- API status;
- extension architecture;
- critical dependencies;
- known replacements;
- last successful restore test;
- last successful exit test;
- last architecture review.

## Failure signals

### Licensing
- license change;
- open-source to open-core movement;
- required open feature moved to proprietary tier;
- mandatory license server;
- source restriction.

### Security
- critical vulnerability;
- active exploitation;
- delayed critical remediation;
- unsupported dependencies/runtime.

Raw CVE count alone is not a failure signal.

### Project health
- supported branches disappear;
- stable maintenance ceases;
- required component archived;
- severe maintainer/contributor decline;
- prolonged unresolved critical issues.

A mature stable project does not need feature churn to be healthy.

### Portability
- export/API restrictions;
- backup/restore regression;
- cloud-only dependency;
- inaccessible format/schema.

### Governance
- acquisition;
- foundation dissolution;
- material control concentration;
- contributor exodus;
- stewardship change.

### Replacement opportunity
A new platform warrants review only when it materially improves the user's acceptance criteria or the current platform materially deteriorates.

## Installed-platform forward-deterioration rule — V1.1

When an installed platform's exact current supported release still passes the present software-freedom, backup/restore, portability, and maintenance gates, but the steward has announced that a future supported path will move one or more required capabilities into an unacceptable proprietary dependency:

1. do not rewrite the exact current-release `software_freedom` result as a present failure merely because the future path is unacceptable;
2. classify the announcement as a material forward-path deterioration signal;
3. return `REASSESS_CURRENT_PLATFORM`;
4. use `REVIEW` while the current supported release still works and there remains a bounded supported window for orderly action;
5. explicitly direct preparation of migration and/or exit options **while the current release still works and before its support window closes**;
6. preserve and re-verify backups, exports, reconstruction procedures, custom code, identifiers, relationships, documents, attachments, and integration documentation during that window;
7. escalate to `CRITICAL` if the current operating release itself crosses a hard-failure boundary, the supported exit window is lost, or recoverability becomes materially threatened.

A response that merely says "reassess" without requiring migration/exit readiness during the remaining supported-current-release window is incomplete.

