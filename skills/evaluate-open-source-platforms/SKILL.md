---
name: evaluate-open-source-platforms
description: Evaluate business-critical software for durable open-source use before adoption or during reassessment. Verify license and paid-feature boundaries, data ownership and exit fidelity, backup/restore, customization portability, upgrades, security maintenance, governance, recurring maintenance burden, operational fit, and future failure signals. Use exact evidence classifications and do not treat marketing claims, an Export button, or a successful installation as proof of durability.
---

# Evaluate Open-Source Platforms

## Version

`1.1`

Use this skill when evaluating a new business-critical platform or reassessing an installed one.

## Core principle

Adoption is not proven when data can be entered.

Adoption is proven only when the organization can preserve, recover, understand, export, reconstruct, maintain, and leave the platform.

## Required workflow

1. Establish exact product identity, edition, version/branch, steward, repository, license, and dependency model.
2. Define the user's required capabilities before scoring the platform.
3. Classify each required capability using the exact software-freedom vocabulary in `references/classifications.md`.
4. Verify paid-feature boundaries from authoritative current evidence.
5. Evaluate data ownership and perform or specify the exit reconstruction test in `references/exit-test.md`.
6. Verify complete backup and actual restore capability.
7. Determine where customization lives and whether it is independently retainable and version-controlled.
8. Evaluate supported upgrade path, rollback constraints, and custom-extension survivability.
9. Evaluate security maintenance, governance, fork survivability, and dependency health.
10. Separate initial engineering effort from recurring maintenance burden.
11. Require a representative operational POC before final adoption.
12. Establish a platform-health baseline and future failure triggers.
13. Return one exact decision value from `references/classifications.md`.

## Evidence discipline

Prefer exact current evidence from:
1. license text and source repository;
2. project/foundation/vendor documentation;
3. release/security documentation;
4. credible implementation case studies;
5. independent technical reporting;
6. community reports only as supporting evidence.

Do not infer that "open source" means all required features are open source.
Do not infer that paid support or hosting is a proprietary software dependency.
Do not treat UNKNOWN as PASS.
Do not silently flatten relational data into a "portable" classification.
Do not use raw CVE count alone as project-health evidence.
Do not reward fast initial setup if steady-state maintenance becomes a recurring developer obligation.

## Detailed references

- `references/classifications.md`
- `references/methodology.md`
- `references/source-protocol.md`
- `references/exit-test.md`
- `references/maintenance-and-health.md`
- `schemas/evaluation-record.schema.json`
