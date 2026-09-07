# Runtime Methodology

## Authority

For governance and institutional-memory questions, current applicable
repository evidence controls.

A stale handoff may preserve useful continuation evidence but cannot override a
newer repository decision.

Current local repository state must be resolved before remote state is treated
as meaningful. Remote state is a synchronization reference, not an automatic
replacement for local state.

## Reconciliation order

1. Resolve the exact workstream.
2. Resolve each materially relevant local repository.
3. Read materially relevant current governance.
4. Compare against handoff claims.
5. Compare against implementation evidence.
6. Preserve conflicts explicitly.
7. Determine the exact next action only after reconciliation.

## Multiple repositories

Keep repository snapshots separate. Never merge branch, HEAD, working-tree, or
synchronization state across repositories.

## Current implementation vs architecture

Keep these distinct:

- current implementation;
- approved architecture/governance;
- intended target state.

Implementation evidence demonstrates only what it directly establishes.

## Rejected or superseded decisions

Preserve rejection/supersession unless current governing evidence changes it.
Historical chat must not revive rejected architecture.

## Missing information

If a material value cannot be established, preserve it as `UNRESOLVED`.
Completeness is never achieved by invention.
