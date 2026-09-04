# handoff-governed-work V1.0 — Validation Record

<div class="ri-document-meta" markdown>

**Document Type**
Skill Validation Record

**Status**
Accepted

**Skill**
`handoff-governed-work`

**Validated Version**
1.0

**Authority**
Systems Architect Discipline

**Governing Proposal**
OCP-008

**Validation Date**
2026-09-04

</div>

---

## Result

`handoff-governed-work` V1.0 is validated as the current methodology baseline.

Final independent Run 02 result:

- **25 / 25 fixtures PASS**;
- **18 / 18 critical fixtures PASS**;
- **0 candidate failures**;
- **0 control failures**;
- no remaining candidate-behavior defect;
- no remaining control-package defect.

The validated specification SHA-256 is:

`27ff50a31a6cfaaf9d02d331e2b1e8b918e536109e0f3abe269f38b97345a1ae`

---

## Validation Lineage

### Run 01

Frozen candidate:

- filename: `handoff-governed-work-v1.0-candidate-run-01.zip`;
- SHA-256: `0a2a79e85ee35ef6dd2fa2b6acf2403e62bf7748948906f20acdfef079b13785`.

Independent evaluation:

- filename: `handoff-governed-work-v1.0-evaluation-run-01.json`;
- SHA-256: `88d72ecffaf90f39013cab25aa9947d1bb2d7bc5992ca1061338a46a9603fc23`;
- result: **FAIL — 24 / 25 fixtures PASS**;
- critical failures: 1;
- control failures: 0.

The demonstrated candidate defect was limited to F02: the candidate preserved
the exact `Proposed` status correctly but repeated forbidden alternative status
words in explanatory invariant text.

The failed Run 01 evidence remains part of the validation lineage and is not
rewritten as passing history.

### Run 02 targeted remediation

Run 02 remediated only the demonstrated F02 candidate-generation defect.

Frozen candidate:

- filename: `handoff-governed-work-v1.0-candidate-run-02.zip`;
- SHA-256: `6ba4c61c4fa56dee6a1b63b15deb3c9f0abd118f2659a8924d0636de240d65cd`.

Independent evaluation:

- filename: `handoff-governed-work-v1.0-evaluation-run-02.json`;
- bytes: `9319`;
- SHA-256: `0ac87298ecee51a4b52881954ae26cc395f918e0b45c0368dfa6f4c905fff5b2`;
- result: **PASS — 25 / 25 fixtures**;
- critical fixtures: **18 / 18 PASS**;
- candidate failures: 0;
- control failures: 0.

---

## Behaviors Proven by the Validation Corpus

The validated corpus establishes at minimum that the methodology can preserve
and reconcile:

- clean and dirty working-tree state;
- staged and unstaged changes without conflation;
- multiple repositories with distinct branch/HEAD/synchronization state;
- exact governance status without silent promotion;
- repository authority over contradictory chat claims;
- chat-derived state without promoting it to repository authority;
- interrupted work without representing it as complete;
- rejected architecture without revival;
- secret exclusion;
- cross-workstream contamination boundaries;
- missing required artifacts without fabrication;
- known and unresolved exact-next-action states;
- stale handoffs after repository advancement;
- local-ahead state without replacing it with remote state;
- unresolved deterministic parser output without synthesis;
- verified proposal status after resolver/document conflict;
- clean working tree independently from upstream synchronization;
- conflicting repository, implementation, handoff, and chat evidence.

---

## Evidence Preservation Boundary

The approved repository validation controls remain under:

`docs/architecture/validation/handoff-governed-work/v1.0/`

This record preserves validation result, lineage, and hashes.

Binary candidate/evaluation run artifacts are not added to ordinary Git by this
transaction. Their exact hashes remain the evidence anchors.

ACP-003 and OCP-007 remain at their actual repository status and are not
silently treated as approved.

---

## Completion

V1.0 methodology validation is complete.

The next governed step is the validated production-candidate baseline and then,
separately, runtime installation/registration verification.
