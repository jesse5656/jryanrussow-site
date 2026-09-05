# OCP-009 — Repository-First Output Placement

Version: 1.0.0

Status:
Approved

Type:
Operational Change Proposal

Scope:

- `docs/operations/workspace/AI-COLLABORATION-STANDARD.md`

## Purpose

Establish a cross-chat AI collaboration rule requiring durable project output
to be placed in the repository that owns the artifact whenever practical and
appropriate.

## Approved Decision

For repository-associated work, durable output files shall be written to an
appropriate location within the repository that logically owns the artifact
whenever practical and appropriate.

Repository ownership shall be determined from artifact responsibility,
repository context, and applicable governance rather than merely from the
shell's current working directory.

Before inventing a new destination, AI assistants shall inspect the owning
repository's existing structure and applicable standards. Existing appropriate
directories shall be preferred over creation of new output locations.

Durable outputs include, when applicable:

- reports;
- validation evidence;
- manifests;
- specifications;
- procedures;
- implementation artifacts;
- generated documentation; and
- other records intended to persist as project evidence or institutional
  memory.

Transient execution files, disposable diagnostics, transfer staging, temporary
working files, and other non-durable intermediates may remain outside a
repository when appropriate.

Secrets, credentials, authentication captures, sensitive material, prohibited
source material, and other content that should not enter source control shall
not be placed in a repository merely to satisfy repository-first placement.

When a durable final artifact must temporarily be created outside its owning
repository, the final governed artifact shall be moved or copied into the
correct repository before the work is considered complete when safe and
appropriate.

Unrelated working-tree changes shall be preserved.

If repository ownership or destination cannot be resolved safely, repository
context shall be resolved before the durable artifact is created.

## Non-Goals

This proposal changes AI collaboration guidance only.

It does not:

- redefine constitutional authority;
- alter Engineering Standards;
- alter repository ownership;
- require transient files to be committed;
- require secrets or sensitive material to enter a repository; or
- require creation of a new output directory when an appropriate location
  already exists.

## Authorized Change

Update:

`docs/operations/workspace/AI-COLLABORATION-STANDARD.md`

to add the Repository-First Output Placement rule and increment its version from
1.0.0 to 1.1.0.
