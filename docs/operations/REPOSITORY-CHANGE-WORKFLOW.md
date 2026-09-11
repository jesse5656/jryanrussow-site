# Repository Change Workflow

Version: 1.1.0

Status:
Active

------------------------------------------------------------------------------

## Purpose

This procedure defines the required workflow for changes to the
Systems Architect Discipline repository.

------------------------------------------------------------------------------

## Governing Principle

The repository is the authoritative source of truth.

Implementation shall be informed by the applicable repository context.

Automate deterministic process.

Preserve human judgment.

------------------------------------------------------------------------------

## Canonical Change Workflow

Intent to Change Repository

↓

Repository Context Resolution

↓

Engineering, Research, or Operational Work

↓

Governance Enforcement

↓

Commit

------------------------------------------------------------------------------

## Entry Gate — Repository Context Resolution

Repository Context Resolution is required before work intended to modify
the repository begins.

It resolves applicable:

- repository identity and Git state;
- Operating Plan;
- current objective or active sprint;
- governance;
- Engineering Standards;
- Operational Procedures;
- Implementation Guides;
- AI Collaboration Standards;
- protected assets;
- active ACPs and OCPs;
- warnings.

Run:

```bash
python3 scripts/platform/repository_context.py
```

Machine-readable output:

```bash
python3 scripts/platform/repository_context.py --format json
```

Repository Context Resolution provides context.

It does not make architectural decisions.

------------------------------------------------------------------------------

## Cross-Repository Model Selection and Credit Conservation

This section is the single authoritative execution rule for model selection
across repositories governed by the Systems Architect Discipline. It extends
this workflow's applicability to those repositories for model selection; it
does not replace their local procedures or current objectives. Authorization:
[OCP-001, 2026-09-11 amendment](../architecture/ocp/OCP-001-ENGINEERING-EXECUTION-RULES.md#2026-09-11-amendment-model-selection-and-credit-conservation).

### Principle and precedence

Use the least expensive or specially allocated capable model that can safely
complete the current phase. Prefer **GPT-5.3-Codex-Spark**
(`gpt-5.3-codex-spark`) for bounded execution whenever available and appropriate.
When a separate Spark allowance is available and sufficient, do not spend
general Work/Codex credits on work that Spark can safely complete.

Credit conservation shall never override correctness, repository authority,
security, governance, accounting integrity, required validation, or stop
conditions. Higher governance and applicable approved decisions override the
model preference. Model capability is not authorization to act.

### Selection and handoff

Use Spark by default for well-specified, bounded engineering work: targeted
code edits and small features; narrow source inspection and focused debugging;
running established tests and adding or updating tests; diff review and Git
hygiene; straightforward refactoring and bounded configuration changes;
implementation of approved architecture or an already-defined validation plan;
repository-local documentation updates; and similarly narrow execution.

Use the stronger appropriate reasoning model when the phase materially depends
on architecture selection, governance decisions or policy interpretation,
ambiguous design, broad multi-repository research, unfamiliar system discovery,
high-risk security design, accounting or financial-model semantics, complex
root-cause analysis without an established hypothesis, large autonomous
implementation with unresolved design, or adjudication between open
architectural alternatives. A small diff alone does not establish low risk.

1. When stronger reasoning is needed, resolve architecture and requirements,
   acceptance criteria, scope and stop conditions under the applicable approvals.
2. Hand the approved bounded implementation and defined validation to Spark
   where practical; return its exact diff and results for review.
3. Return to stronger reasoning only when a stop condition is hit, a new
   architectural question emerges, evidence contradicts the approved design,
   or the task grows materially beyond its bounded scope. Pause affected work
   until the question is resolved; a model switch does not waive approval gates.

If Spark is unavailable, unsuitable, exhausted, lacks required tools/context,
or cannot safely complete the task, use the next appropriate available model.
Do not block necessary work solely to preserve Spark usage. Record the reason
briefly in the existing execution record; do not create a separate report for
every model choice.

### Context reuse and validation

A model change is a continuation of the same governed task, not a new discovery
cycle. Continue from the established repository state and reuse validated
source hashes, evidence, approved plans, architecture decisions and prior gate
results. Carry forward repository identity, revision and relevant uncommitted
changes, scope, acceptance criteria, stop conditions and the exact next action.

Check only the current dependencies needed to establish that retained evidence
still applies. Do not restart discovery, repeat broad source inspection already
preserved in repository evidence, or rerun passed gates merely because the
model changed. Rerun a gate when changed inputs, dependencies, environment,
stale evidence, a failure, or an applicable validation requirement requires it;
record the reason. Reuse does not excuse any required validation, including a
required full suite when no applicable passing result exists for the current
inputs.

### Execution checklist and enforcement boundary

Use the existing task plan, handoff or validation record to establish:

- bounded execution versus unresolved reasoning/design, and applicable authority;
- selected model, observed availability and allowance information when exposed,
  or an explicit unknown; a brief reason for fallback or escalation;
- reusable revision/hash/evidence references and remaining required gates;
- acceptance criteria, stop conditions and exact next action;
- final diff/results and any gate invalidation or scope change.

Availability and billing depend on the actual client/account and can change.
Do not infer a separate allowance, remaining credit balance or successful model
switch from this policy. Use supported model-selection controls when available;
if the current interface cannot switch, disclose that limitation, preserve the
handoff context and continue necessary work using the fallback rule. Do not
claim a switch occurred without confirmation. See [official model guidance](https://learn.chatgpt.com/docs/models)
for product capabilities; it does not supersede this institutional policy.

This is an operational execution standard with a conservation principle and a
review checklist. Existing policy-as-code continues to enforce deterministic
approval, scope and metadata requirements. No hard-coded Spark-only CI gate is
introduced: a static check cannot establish live allowance, model suitability,
security judgment or accounting correctness. Future automation may check record
completeness and authority references, but shall not replace those judgments
or block a justified fallback.

### Inheritance and proposed propagation mechanism

Governed repositories shall resolve this canonical section during context
resolution. The governing resolver already identifies this workflow and the
AI Collaboration Standard; no second model-selection policy is needed.

For repositories whose entry instructions do not yet resolve central governance,
propagate a reference through their existing onboarding/context mechanism. A
local `AGENTS.md` or equivalent should identify `jryanrussow-site` as governing
source and point to
`docs/operations/REPOSITORY-CHANGE-WORKFLOW.md#cross-repository-model-selection-and-credit-conservation`,
with the requirement to resolve the applicable revision and preserve higher
governance precedence. Do not duplicate the rule text. A managed reference or
versioned manifest may carry the governing revision/hash for offline use; an
unverified or stale copy is not current authority.

This amendment establishes central applicability and proposes reference-based
propagation; it does not claim that every consumer automatically loads this
file. Inventory and scoped updates to consumer entry points are a subsequent
propagation transaction, not blanket edits to every repository or a global
model-setting change.

------------------------------------------------------------------------------

## Exit Gate — Governance Enforcement

Governance Enforcement checks deterministic, machine-verifiable
governance requirements before governed changes are committed.

Run against staged changes:

```bash
python3 scripts/governance/governance_engine.py --staged
```

Protected changes require an approved ACP or OCP.

A proposal may be supplied with:

```bash
GOVERNANCE_PROPOSAL=path/to/approved-proposal.md         git commit -m "commit message"
```

Governance Enforcement does not evaluate architectural quality.

------------------------------------------------------------------------------

## Policy Validation

Run:

```bash
python3 scripts/governance/validate_governance_policy.py
```

The authoritative governance remains the repository's normative
documents.

`.governance/policy.yaml` is only the executable representation of the
machine-verifiable subset.

------------------------------------------------------------------------------

## Human Responsibility

Architectural judgment, constitutional interpretation, engineering
tradeoffs, research conclusions, and strategic decisions remain human
responsibilities.
