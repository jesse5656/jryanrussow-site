---
name: identify-imd-prospects
description: Identify and prioritize evidence-grounded candidate organizations for human qualification for an Institutional Memory Diagnostic engagement. Apply the validated V1.1 P-A-C-R methodology, current meaningful operating boundary gate, provenance rules, contradiction search, qualitative tier gates, completion gate, and human-review controls. Never diagnose Institutional Memory failure, assign blame, infer unsupported root cause, use numerical prospect scoring, or enrich named individuals.
---

# Identify IMD Prospects

## Version

`1.1`

## Purpose

Produce evidence-grounded candidate dossiers and ranked prospect lists for
possible Institutional Memory Diagnostic engagements.

This Skill identifies signals for human qualification. It does not diagnose
an organization, establish root cause, assign blame, or make legal,
regulatory, safety, investment, or reputational judgments.

## Governing References

Apply:

1. `references/methodology-v1-architecture.md`
2. `references/v1.1-method-addendum.md`
3. `references/source-protocol.md`
4. `references/candidate-dossier-template.yaml`
5. `references/ranked-prospect-list-schema.yaml`
6. `references/contradiction-search-log-template.csv`
7. `references/validation-design.md`

V1.1 controls wherever it refines V1.

## Required Pattern

Reconstruct independently:

**Problem → Awareness → Corrective Action → Recurrence/Persistence after Action**

Do not count derivative publications as separate underlying events.

## Evidence Classes

Every material statement must be exactly one of:

- `PUBLIC FACT`
- `REASONABLE INFERENCE`
- `HYPOTHESIS`
- `UNKNOWN / REQUIRES HUMAN QUALIFICATION`

Use the least assertive classification supported by evidence.

## Current Meaningful Operating Boundary Gate

Strong requires a separate `PASS` finding that a plausible currently
operating organizational system, site, business unit, process, or equivalent
boundary exists and could support one bounded IMD engagement.

Allowed statuses:

- `PASS`
- `FAIL`
- `UNKNOWN`

`FAIL` or `UNKNOWN` prohibits Strong.

## Strong Candidate

Strong requires every validated noncompensatory gate, including:

- supported material problem;
- supported prior awareness;
- supported corrective action;
- publicly supported recurrence/persistence after documented action;
- current meaningful operating boundary = PASS;
- plausible bounded pilot;
- sufficient evidence/provenance;
- required contradiction search;
- completion-gate PASS;
- human approval.

Reasonable inference cannot satisfy recurrence-after-action for Strong.

## Tiers

Use only:

- `Strong Candidate`
- `Moderate Candidate`
- `Weak Candidate`
- `Insufficient Evidence`

Do not use numerical or pseudo-precise prospect scores.

## Economics

Treat economic fit as a `HYPOTHESIS`.

Use the approved approximately-$10,000 pilot boundary.

Do not use hard company-size, revenue, or employee thresholds.

## Sponsor / Buyer

Identify roles only.

Do not identify, research, enrich, or recommend named individuals.

## Contradiction Search

Unless the validated narrow NOT APPLICABLE exception genuinely applies,
perform at least:

1. one current-boundary/status disconfirmation search;
2. one search against the weakest or most tier-determinative P-A-C-R claim.

Record exact queries and their effects.

## Completion Gate

Do not publish a final tier until required dossier fields, provenance,
P-A-C-R statuses, current-boundary status, contradiction-search records,
limitations, and internal references are complete.

If incomplete:

- set `completion_status: incomplete`;
- set `tier: null`;
- report `INCOMPLETE — NO FINAL TIER`;
- list each failed completion rule.

## Human Review

Human approval is required before Strong or outreach-ready status and for
material sensitive allegations, disputed continuity/comparability, material
tier changes, and acceptance of a proposed pilot boundary.

## Prohibited Conclusions

Never conclude or imply:

- the organization has an Institutional Memory failure;
- Institutional Memory caused an event or loss;
- a person or group is incompetent, negligent, dishonest, or blameworthy;
- recurrence proves a prior corrective action was inadequate;
- missing public evidence proves internal knowledge or action is absent;
- a named person will sponsor or buy;
- an IMD guarantees a solution or return;
- separate events share a root cause without evidence.

## Required Outputs

For each candidate:

- candidate dossier;
- claim/source register;
- P-A-C-R reconstruction;
- current-boundary determination;
- contradiction-search record;
- limitations and alternative explanations;
- human-qualification questions;
- completion-gate result.

For multiple candidates also produce the approved ranked-list structure.

Ranks apply only within the stated universe and as-of date.

## Standard Disclaimer

> This profile identifies signals for human qualification; it does not diagnose an Institutional Memory failure or establish root cause.

## Stop Rule

Stop when the completion gate passes or the dossier is explicitly incomplete,
the tier is stable under evidence found, contradiction requirements are
satisfied, every material claim has provenance, and remaining gaps require
human qualification or unavailable private evidence.
