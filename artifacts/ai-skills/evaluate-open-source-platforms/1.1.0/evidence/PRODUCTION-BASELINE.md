# Open-Source Platform Evaluation — V1.1 Production Baseline

<div class="ri-document-meta" markdown>

**Document Type**
Production Baseline

**Status**
Validated Production Candidate — Installation Pending

**Skill**
`evaluate-open-source-platforms`

**Version**
1.1

**Authority**
Systems Architect Discipline

**Governing Proposal**
ACP-004

**Baseline Date**
2026-09-03

</div>

---

## Purpose

This baseline identifies the exact operator-safe V1.1 runtime package produced after successful validation.

It does not represent a production installation merely because the package exists.

---

## Runtime File Inventory

```text
evaluate-open-source-platforms/
├── SKILL.md
├── agents/
│   └── openai.yaml
├── references/
│   ├── classifications.md
│   ├── exit-test.md
│   ├── maintenance-and-health.md
│   ├── methodology.md
│   └── source-protocol.md
└── schemas/
    └── evaluation-record.schema.json
```

Runtime file count:

`8`

The runtime package excludes:

- evaluator expected outcomes;
- frozen fixture truth;
- evaluator prompts;
- completed-run candidate output;
- control manifests;
- validation answer keys.

---

## Validated Production Artifacts

### Install ZIP

Filename:

`evaluate-open-source-platforms-v1.1-install.zip`

Bytes:

`9789`

SHA-256:

`7cc392d048ae03bc6ad2433b0ab3595cf2d95f73648ab312f087d9e75c321379`

### Production-candidate archive

Filename:

`evaluate-open-source-platforms-v1.1-production-candidate.tar.gz`

Bytes:

`8730`

SHA-256:

`2aa4a7f3e377a88b2e013218cfb23ad597f64acadc6d4a261b6f8330e046c9bf`

### Production-package verification report

Filename:

`evaluate-open-source-platforms-v1.1-production-package-verification.txt`

Bytes:

`840`

SHA-256:

`85551c9a7fe0b7657ca9ed6d6f5f5c56827504010d21d30bd86545b0052de7ee`

Verification result:

- required runtime files: PASS;
- JSON schema parse: PASS;
- ZIP extraction: PASS;
- development/evaluator leakage: zero.

---

## Frozen Validation Anchor

The production baseline traces to the unchanged frozen V1.1 candidate:

SHA-256:

`1f07ea25cd14b7717adaf342ab737c2bafece1c5e661ddd180e674429407b9bf`

Final ECR1 adjudication:

**PASS — 15 / 15 fixtures; 7 / 7 critical fixtures.**

---

## Installation Boundary

The skill is validated as a production candidate.

Installation or registration into a specific runtime is a separate operational transaction and must use the supported mechanism for that runtime.

A manual filesystem copy shall not be represented as an official ChatGPT skill installation unless the applicable runtime explicitly defines that mechanism.

---

## Change Control

Any future change to the operator methodology that materially changes classification, gate behavior, decision semantics, hard-failure logic, portability standards, restore requirements, or installed-platform deterioration behavior requires versioned review and appropriate regression evidence.

Cosmetic documentation changes do not automatically require a methodology version change.
