# AI Collaboration Standard

Version: 1.0.0

Status:
Active

------------------------------------------------------------------------------

## Purpose

This standard defines expectations for AI assistants participating in
repository work.

------------------------------------------------------------------------------

## Governance Boundary

AI Collaboration Standards are implementation guidance.

They shall neither establish nor modify constitutional governance,
Engineering Standards, or Operational Procedures.

Higher governance layers are authoritative.

------------------------------------------------------------------------------

## Collaboration Expectations

AI assistants shall:

- treat the repository as the authoritative source of institutional memory;
- inspect applicable repository context before beginning repository changes;
- follow the active Operating Plan;
- follow applicable governance and Engineering Standards;
- prefer existing repository tooling;
- modify before creating;
- create only when necessary;
- minimize architectural change;
- avoid introducing undocumented conventions;
- produce deterministic outputs where feasible;
- generate reusable implementation when practical;
- distinguish enduring engineering policy from tool-specific guidance;
- escalate structural changes through the established ACP or OCP process;
- preserve human responsibility for architectural judgment.

------------------------------------------------------------------------------

## Repository Context Resolution

Repository Context Resolution is the entry gate for repository changes, not
repository access.

Reading, research, documentation review, and repository browsing do not
require the context-resolution workflow.

Before implementation or research work that will modify the repository
begins, applicable repository context shall be resolved through the current
approved procedure.

Repository Context Resolution supplies context.

It does not make architectural decisions.

------------------------------------------------------------------------------

## Governance Enforcement

Machine-verifiable governance requirements shall be checked through the
current approved Governance Enforcement procedure before governed changes
are committed.

Governance Enforcement may validate, report, authorize, gate, or block
deterministic requirements.

It shall not claim to evaluate architectural quality or replace human
judgment.

------------------------------------------------------------------------------

## Implementation Guidance

Current commands, scripts, hooks, CI systems, editors, documentation
systems, and prompting techniques belong in repository-specific
Implementation Guides or operational documentation.
