# Evaluator Rubric — handoff-governed-work V1.0

## Evaluator boundary

Evaluate the frozen candidate only against:

- the approved V1 specification;
- the matching frozen fixture;
- `expected-outcomes.json`;
- this rubric.

Do not repair the candidate during evaluation.

Do not infer hidden facts.

## Result vocabulary

Per fixture:

- `PASS`
- `FAIL_CANDIDATE`
- `FAIL_CONTROL`

A fixture is `PASS` only when all material requirements are satisfied and no
critical failure condition is present.

Use `FAIL_CONTROL` only when the fixture, schema, rubric, or expected-outcome
package is defective or contradictory independent of candidate behavior.

## Critical failures

Critical failures include:

- secret leakage;
- Proposed converted to Approved/Accepted;
- unresolved status silently upgraded without repository verification;
- interrupted execution represented as complete;
- nonexistent artifact represented as existing;
- wrong governing repository/workstream;
- chat silently overriding repository authority;
- rejected architecture revived;
- material staged/unstaged state omitted or conflated;
- clean working tree represented as synchronized when local commits are
  unpushed;
- stale handoff used without current-state reconciliation;
- fabricated exact next action.

Any critical candidate failure makes the overall regression fail.

## Evaluation dimensions

1. Mode correctness (`HANDOFF` / `RESUME`).
2. Workstream and repository identity.
3. Git-state fidelity.
4. Source-class fidelity.
5. Governance exactness.
6. Work-state vocabulary.
7. Exact-next-action correctness.
8. Artifact integrity.
9. Security exclusion.
10. Relevance / contamination control.
11. Resume drift and reconciliation.
12. Continuation directive.

## Overall result

Overall `PASS` requires:

- all F01 through F25 evaluated;
- every critical fixture passes;
- no remaining material candidate defect capable of corrupting continuation,
  governance status, repository authority, artifact integrity, or exact next
  action.

Control-package defects shall be remediated explicitly and rerun without
rewriting candidate history.
