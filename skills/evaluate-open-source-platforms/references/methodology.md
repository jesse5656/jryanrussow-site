# Evaluation Methodology

## A. Define the operating requirement first

Do not start from a vendor feature list.

Capture:
- authoritative records;
- business relationships;
- workflows and state transitions;
- documents/attachments/media;
- financial links;
- integrations;
- roles/permissions;
- expected scale;
- mobile/field requirements;
- continuity and recovery requirements;
- maintenance constraint.

## B. Establish exact product identity

Record:
- project name;
- edition;
- version/branch;
- source repository;
- steward;
- license;
- runtime dependencies;
- required companion applications.

A product family with materially different Community/Enterprise/Professional/Cloud editions must not be evaluated generically.

## C. Build a capability matrix

For every required capability:
- implementation classification;
- evidence;
- version applicability;
- limitations;
- required extension/integration;
- paid dependency status;
- confidence/unknowns.

## D. Evaluate durability gates

1. Software freedom.
2. Data ownership.
3. Export fidelity and exit reconstruction.
4. Backup and actual restore.
5. Customization portability.
6. Upgrade survivability.
7. Security maintenance.
8. Stewardship/governance and fork survivability.
9. Maintenance burden.
10. Operational POC.
11. Failure-monitoring plan.

## E. Separate initial from recurring effort

Record separately:
- initial engineering hours;
- administrator hours/month;
- developer hours/month;
- security-patch burden;
- annual upgrade burden;
- major-upgrade burden;
- custom repositories/modules;
- upstream-core modifications;
- specialist technologies;
- restore-test effort;
- critical external dependency count.

A high initial build is not automatically worse than a fast setup.

## F. POC requirement

A candidate should not be selected from documentation alone.

The POC must exercise representative:
- record creation;
- relationships;
- workflow;
- automation;
- procurement/financial behavior where relevant;
- permissions;
- integration;
- mobile/field use;
- backup/restore;
- exit;
- upgrade.

## G. Final decision

Use the exact decision vocabulary.

State:
- what passed;
- what failed;
- what remains UNKNOWN;
- whether any hard failure applies;
- what evidence would change the decision.
