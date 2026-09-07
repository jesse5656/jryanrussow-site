# RESUME Protocol

Render a resume with this logical structure:

# Governed Work Resume

## Resolved Current State
State the current repository/workstream facts established after re-resolution.

## Handoff Drift / Reconciliation
Identify material changes between the handoff and current evidence.

Useful drift labels include:
- `NO_MATERIAL_DRIFT`
- `REPOSITORY_ADVANCED`
- `LOCAL_AHEAD`
- `LOCAL_BEHIND`
- `DIVERGED`
- `WORKING_TREE_CHANGED`
- `GOVERNANCE_CHANGED`
- `IMPLEMENTATION_CHANGED`
- `ARTIFACT_MISSING`
- `SOURCE_CONFLICT`
- `UNRESOLVED`

## Current Work State
Preserve only items needed to continue.

## Exact Next Action
Return `KNOWN` only when the evidence supports one narrow action.
Otherwise return `UNRESOLVED` and explain the blocking ambiguity.

## Continuation
Continue from the resolved next action. Do not restart broad discovery unless
the reconciliation itself shows that the governing context is unresolved.

### Reconciliation requirements

- Current repository governance controls over stale chat claims.
- Current local state is not replaced silently by remote state.
- Clean working tree does not imply synchronized upstream.
- Parser/tool conflicts are surfaced and authoritative source documents are
  inspected before status is asserted.
- Missing artifacts remain missing/unresolved.
- Interrupted commands remain interrupted until completion is established.
