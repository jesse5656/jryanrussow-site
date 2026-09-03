# evaluate-open-source-platforms V1.1 — Validation Record

<div class="ri-document-meta" markdown>

**Document Type**
Skill Validation Record

**Status**
Accepted

**Skill**
`evaluate-open-source-platforms`

**Validated Version**
1.1

**Authority**
Systems Architect Discipline

**Governing Proposal**
ACP-004

**Validation Date**
2026-09-03

</div>

---

## Result

`evaluate-open-source-platforms` V1.1 is validated as the current methodology baseline.

Final adjudicated result:

- **15 / 15 fixtures PASS**;
- **7 / 7 critical fixtures PASS**;
- no remaining candidate-behavior defect;
- no further operator-methodology revision required by the validated corpus.

This record does not rewrite prior failed runs. The failures and evaluator-control corrections remain part of the methodology lineage.

---

## Validation Lineage

### V1.0 Run 01

The first frozen V1.0 candidate was evaluated independently and failed under the original evaluator controls.

Frozen candidate:

- filename: `evaluate-open-source-platforms-v1.0-candidate-run-01.json`;
- bytes: `11022`;
- SHA-256: `a2a2425e894ae91aa4cbc1b6d58075c2fa589f7762ba491e3046465cc5ebadf2`.

Independent evaluation identified both candidate behavior and defects in the evaluator/control architecture.

### V1.0 ECR1 adjudication

The V1.0 candidate remained unchanged while evaluator-control defects were corrected.

ECR1 result:

- 14 / 15 fixtures passed;
- one genuine candidate-behavior defect remained;
- the remaining defect was F15: failure to explicitly require migration/exit preparation while the current installed release still worked.

Adjudication report:

- filename: `evaluate-open-source-platforms-v1.0-ecr1-adjudication-report-run-01.md`;
- bytes: `8390`;
- SHA-256: `598c30fb9ff6c813a1673832f9a5eb432529196db8ee9622bf8de6e3f46fb582`.

### V1.1 targeted remediation

V1.1 added the narrowly bounded installed-platform forward-deterioration rule.

Frozen candidate:

- filename: `evaluate-open-source-platforms-v1.1-candidate-run-01.json`;
- bytes: `15105`;
- SHA-256: `1f07ea25cd14b7717adaf342ab737c2bafece1c5e661ddd180e674429407b9bf`.

The first V1.1 evaluator run returned historical FAIL under the original V1.1 controls:

- 11 / 15 fixtures passed;
- all 7 / 7 critical fixtures passed;
- F15 remediation passed;
- four noncritical failures were decision-only mismatches.

Independent evaluator report:

- filename: `evaluate-open-source-platforms-v1.1-evaluator-report-run-01.md`;
- bytes: `10939`;
- SHA-256: `d76e8ba663f3ec2194dbba934ca73a9a9bd045e760b50f2c0e10ff0dcdc3cd68`.

### V1.1 ECR1 adjudication

The candidate remained byte-for-byte unchanged.

ECR1 clarified the normative distinction among:

- `ACCEPT_CANDIDATE`;
- `CONDITIONAL`;
- `DEFER`.

Final result:

- **PASS — 15 / 15 fixtures**;
- **PASS — 7 / 7 critical fixtures**;
- no remaining candidate-behavior defect;
- no further operator-methodology revision required.

Final adjudication report:

- filename: `evaluate-open-source-platforms-v1.1-ecr1-adjudication-report-run-01.md`;
- bytes: `7579`;
- SHA-256: `aec83986574817815ee6b33f6454d6a96b6fd1d6198301a1f01c40828a17a593`.

---

## Behaviors Proven by the Validation Corpus

The validated corpus establishes at minimum that the methodology can distinguish:

- optional paid hosting/support from required proprietary software;
- open-core products with required proprietary features;
- required paid third-party extensions;
- discontinued open-source editions;
- abandoned but technically open-source projects;
- healthy projects with disclosed and promptly patched vulnerabilities;
- mature low-churn projects from abandoned projects;
- unacceptable recurring developer burden;
- high initial engineering with low stabilized recurring burden;
- nominal exports that lose material relationships;
- recoverability through documented database/filesystem reconstruction;
- backup existence from actual successful restore;
- authoritative license text from contradictory marketing;
- acquisition/governance uncertainty from present hard failure;
- current-release health from announced future-path proprietary deterioration.

---

## Deterministic Decision Semantics

### `ACCEPT_CANDIDATE`

The evidence supports keeping the platform as an active candidate and no material unresolved gate prevents candidate-level acceptance.

This is not final production adoption.

### `CONDITIONAL`

The platform remains viable, but one or more material unresolved conditions must be satisfied before candidate acceptance or implementation.

### `DEFER`

The evidence is too incomplete for responsible candidate-level acceptance, but no hard failure is established.

### `REJECT`

A hard failure or disqualifying condition is established for a candidate.

### `REASSESS_CURRENT_PLATFORM`

An installed platform has material deterioration or a future-path failure requiring deliberate reassessment, migration readiness, or replacement planning.

`UNKNOWN` is not `PASS`.

---

## Installed-Platform Forward-Deterioration Rule

When the exact current supported release still passes current gates but the announced future supported path moves required capability into an unacceptable proprietary dependency:

1. preserve the exact current-state software-freedom classification;
2. classify the announced change as forward-path deterioration;
3. return `REASSESS_CURRENT_PLATFORM`;
4. use `REVIEW` while the current release still works and a bounded supported action window remains;
5. explicitly prepare migration and/or exit options while the current release still works and before the support window closes;
6. preserve and re-verify backups, exports, reconstruction procedures, custom code, identifiers, relationships, documents, attachments, and integration documentation;
7. escalate to `CRITICAL` if the current release itself crosses a hard-failure boundary, the supported exit window is lost, or recoverability becomes materially threatened.

A response that merely says "reassess" is incomplete.

---

## Evidence Preservation Boundary

The repository records the validation result, hashes, lineage, and operator-safe methodology state.

Evaluator-only expected outcomes, hidden control material, and binary validation packages are not added to ordinary wiki content by this transaction.

ACP-003 and OCP-007 remain Proposed and are not silently treated as approved archival governance.

The original validation bytes shall remain preserved outside ordinary Git until a separately approved evidence-storage architecture governs their permanent location.

---

## Completion

V1.1 validation is complete.

The next governed use of the methodology is controlled evaluation of first-round platform candidates, not another methodology regression unless a demonstrated defect or new governing requirement appears.
