# handoff-governed-work — V1.0 Production Baseline

<div class="ri-document-meta" markdown>

**Document Type**
Production Baseline

**Status**
Validated Production Candidate — Codex Local Installation Verified

**Skill**
`handoff-governed-work`

**Version**
1.0

**Authority**
Systems Architect Discipline

**Governing Proposal**
OCP-008

**Baseline Date**
2026-09-04

</div>

---

## Purpose

This baseline identifies the exact operator-safe V1.0 runtime package produced
after successful independent validation.

It does not represent a production installation merely because the package
exists.

---

## Runtime File Inventory

```text
handoff-governed-work/
├── SKILL.md
├── agents/
│   └── openai.yaml
└── references/
    ├── handoff-template.md
    ├── methodology.md
    ├── repository-context.md
    ├── resume-protocol.md
    ├── security-artifacts.md
    └── source-state-vocabulary.md
```

Runtime file count:

`8`

The runtime package excludes:

- evaluator expected outcomes;
- evaluator rubric;
- secret-bearing test fixtures;
- frozen evaluator prompts;
- fixture truth labels;
- prior candidate outputs;
- development control manifests.

---

## Validated Production Artifacts

### Install ZIP

Filename:

`handoff-governed-work-v1.0-install.zip`

Bytes:

`7023`

SHA-256:

`77495774c0b2888ef4e3aa047454aff03f358cf37a93fe4ab97e0eee07dec99d`

### Production-candidate archive

Filename:

`handoff-governed-work-v1.0-production-candidate.tar.gz`

Bytes:

`4646`

SHA-256:

`85ca066f8adc5233ae23cbbf9b7ec671f7fd1b7f1f095a984956159b983a4554`

### Production-package verification report

Filename:

`handoff-governed-work-v1.0-production-package-verification.txt`

Bytes:

`758`

SHA-256:

`2ebd2a8b5c57c395e02a31c3f0e3cdff7606b85c5155fec2d77a0af2bdb5d2e0`

Verification result:

- runtime file inventory: PASS;
- `SKILL.md` frontmatter: PASS;
- `agents/openai.yaml` structural check: PASS;
- ZIP extraction: PASS;
- TAR extraction: PASS;
- development/evaluator leakage: zero.

---

## Frozen Validation Anchor

The production baseline traces to Run 02:

Candidate SHA-256:

`6ba4c61c4fa56dee6a1b63b15deb3c9f0abd118f2659a8924d0636de240d65cd`

Independent evaluation SHA-256:

`0ac87298ecee51a4b52881954ae26cc395f918e0b45c0368dfa6f4c905fff5b2`

Final result:

**PASS — 25 / 25 fixtures; 18 / 18 critical fixtures.**

---

## Installation Boundary

The skill is validated as a production candidate.

Installation or registration into a target runtime is a separate operational
transaction and must use the supported mechanism for that runtime.

A filesystem copy shall not be represented as an official ChatGPT skill
installation unless the applicable runtime explicitly defines that mechanism.

### Verified local installation

The validated V1.0 package has been installed and byte-for-byte verified at:

`/home/jesse/.agents/skills/handoff-governed-work`

This is recorded as a **Codex/local Agent Skills installation** only.

It does not represent ChatGPT web registration or OpenAI API Skills
registration.

Installation record:

`docs/architecture/HANDOFF-GOVERNED-WORK-V1.0-INSTALLATION-RECORD.md`

---

## Change Control

Any future change that materially alters HANDOFF behavior, RESUME behavior,
source authority, exact-status handling, work-state semantics, next-action
semantics, artifact integrity, security exclusion, repository reconciliation,
or deterministic-support boundaries requires versioned review and appropriate
regression evidence.

Cosmetic documentation changes do not automatically require a methodology
version change.
