# MidwestGuard OFBiz Continuation Handoff

Status: Active continuation record  
Prepared: October 14, 2026  
Governing repository: `jryanrussow-site`

## Authority map

This repository governs Midwest24 Core Enterprise architecture, scope, approval and authority-transfer rules. Read these records first:

1. `docs/architecture/acp/ACP-013-OFBIZ-CRM-OPERATIONAL-CUTOVER-GATE.md`
2. `docs/architecture/acp/ACP-013-ESPOCRM-REPLACEMENT-MIGRATION-PROGRAM.md`
3. `docs/architecture/acp/ACP-013-PRODUCTION-JOB-WORK-ORDER-OPERATIONALIZATION.md`

Implementation and operating records are authoritative only for their own subjects:

| Subject | Repository and path |
| --- | --- |
| Executable OFBiz implementation and evidence | `/home/jesse/Documents/Projects/mwg-ofbiz` |
| Administrator procedures and recovery runbooks | `/home/jesse/Documents/Projects/mwg-ops-manual` |
| Cross-repository operational handoff | `/home/jesse/Documents/Projects/mwg-ops-manual/99-Project-Management/mwg-ofbiz-continuation-handoff-20261014.md` |

Chat history is not authority.

## Current implementation evidence

- OFBiz branch: `codex/operational-workspace-ui`; committed HEAD `fa37f833cf3f2457f92dd512d8daab599cfa23b5`.
- Deployed image: `m24-enterprise-native-cms:20261013-r57-native-home-v4`, image ID `sha256:09e9666b3e54084e398b5dad84718c369cf57f308f751e02e36af90fe4f34957`.
- r57 native Enterprise-home evidence: `mwg-ofbiz/docs/evidence/native-enterprise-home-r57-candidate-20261013.json`.
- r56 appointment automation evidence: `mwg-ofbiz/docs/evidence/native-appointment-automation-r56-20261014.json`.
- Established OFBiz recovery archive: `/mnt/IronWolfPool/Backups/mwg-ofbiz-poc/20261013T164735Z`.

The r56 evidence establishes synthetic acceptance and cleanup for BR-011 through BR-014. The r57 evidence establishes desktop and phone acceptance for the native Enterprise home. Those bounded batches are completed and must not be repeated without a documented regression reason.

## Execution discipline: conserve credits and prevent scope drift

Every continuation must use the governing records and retained evidence first.

1. Do not redo reconciliation, capability research, acceptance tests, browser checks, or discovery that already has current retained evidence unless a specific regression, conflict, or missing fact requires it.
2. Use the least-cost evidence source that can answer the question: repository files and command-line/state queries before browser automation. Use the browser only for requested visual or normal-screen acceptance that cannot be established otherwise.
3. Batch independent read-only checks. Do not perform serial exploratory checks that do not change the next decision.
4. Keep each task to its approved scope. State the exact next controlled action, the evidence it will produce, and the condition that would expand or stop the work.
5. Do not create a new plan in place of an approved action, reopen completed work, or start adjacent work merely because it is available.
6. Ask the owner only for a genuine business decision, missing authority, or an irreversible external action. Otherwise complete the bounded work and report the result.

This is an operating rule for every future MidwestGuard OFBiz task. It supplements, rather than replaces, the governing authority, evidence, and approval boundaries in this handoff.

## Current operational protection finding

The October 14 read-only TrueNAS review found daily 14-day FastPool and IronWolfPool snapshots and a finished FastPool-to-IronWolfPool replication task. It did not find a scheduled application-consistent OFBiz PostgreSQL logical dump, defined OFBiz retention policy, current restore-test cadence or resolved replication warning. This finding is operational evidence only. It does not authorize production backup changes.

The governing cutover gate requires a durable database, current backup, restore, restart, hostname/TLS/access and monitoring checks before a production authority action. Any backup-policy or schedule change must preserve those requirements and be reconciled with the operating manual before activation.

## Required preservation

The OFBiz and operations-manual worktrees contain substantial uncommitted work. Do not reset, clean, stash, overwrite or discard them. Re-resolve their current Git state before any modification.

## Continuation rule

Before work begins, read the three governing records above, re-resolve the live system and all three repository states, then choose a bounded action consistent with the governing scope. Do not restart broad discovery or treat a healthy container, old recovery archive, private test, or prior chat claim as proof of current production readiness.
