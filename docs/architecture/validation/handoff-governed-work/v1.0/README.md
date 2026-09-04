# handoff-governed-work V1.0 Validation Controls

Status: Frozen development controls

Canonical skill: `handoff-governed-work`

Governing specification:
`docs/architecture/GOVERNED-CHAT-HANDOFF-SKILL-SPECIFICATION.md`

Specification SHA-256:
`27ff50a31a6cfaaf9d02d331e2b1e8b918e536109e0f3abe269f38b97345a1ae`

Source baseline commit:
`224cba38ddfa06f35907b08b010b6753050616e3`

## Purpose

This directory freezes the V1 validation inputs and evaluator controls required
by the approved Governed Chat Handoff Skill Specification.

The controls do not establish production readiness. They provide the fixed
basis for independent operator/evaluator regression.

## Separation

Operator-safe material:

- `candidate-response.schema.json`
- `candidate-template.json`
- `operator/OPERATOR-INSTRUCTIONS.md`
- `fixtures/F01.json` through `fixtures/F25.json`
- `manifests/operator.sha256`

Evaluator-only material:

- `evaluator/RUBRIC.md`
- `evaluator/expected-outcomes.json`
- `manifests/evaluator.sha256`

The evaluator-only expected outcomes shall not be supplied to the operator
during blind candidate generation.

## Freeze Rule

After this control set is committed, fixture/evaluator changes require an
explicitly recorded control remediation. Candidate failures shall not be hidden
by silently editing expected outcomes or fixtures.

## Validation Order

1. Verify manifests.
2. Supply only operator-safe controls to the candidate operator.
3. Freeze candidate output.
4. Supply the frozen candidate plus evaluator controls to an independent
   evaluator.
5. Distinguish candidate defects from control/evaluator defects.
6. Remediate only demonstrated defects.
7. Repeat controlled regression when required.

ACP-003 and OCP-007 remain at their actual repository status and are not treated
as approved merely because this validation structure is compatible with their
concepts.
