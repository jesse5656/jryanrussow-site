# AI Collaboration Standard

Version: 1.1.0

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
## Repository-First Output Placement

When work is associated with a repository, durable output files shall be written
to an appropriate location within the repository that owns the artifact
whenever practical and appropriate.

This requirement applies across chat sessions and repository workstreams.

AI assistants shall:

- determine the owning repository from artifact responsibility, repository
  context, and applicable governance rather than merely from the current
  working directory;
- inspect existing repository structure before inventing a new destination;
- prefer an existing appropriate directory over creating a new output
  location;
- place durable reports, validation evidence, manifests, specifications,
  procedures, implementation artifacts, generated documentation, and other
  persistent project records with the repository that owns them;
- preserve unrelated working-tree changes while placing outputs;
- treat `/tmp`, `~/Downloads`, desktop locations, and similar ad hoc locations
  as appropriate primarily for transient execution files, disposable
  diagnostics, transfer staging, temporary working files, or other
  non-durable intermediates;
- keep secrets, credentials, authentication captures, sensitive material, and
  content prohibited from source control outside repositories even when the
  work is repository-associated;
- move or copy a durable final artifact that had to be created temporarily
  outside its owning repository into the correct repository before considering
  the work complete, when safe and appropriate; and
- resolve repository ownership or destination before creating a durable
  artifact when the correct location is unclear.

Repository-first placement governs artifact location. It does not require every
generated file to be committed, and it does not override higher governance,
security, privacy, retention, or evidence-handling requirements.

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
