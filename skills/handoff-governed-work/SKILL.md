---
name: handoff-governed-work
description: Preserve and resume active governed work across ChatGPT conversations without treating chat history as authoritative. Use for governed new-chat handoffs, continuation packages, resume/reconciliation, repository state transfer, or exact next-action continuity.
---

# Governed Work Handoff

Use this skill for two modes:

- `HANDOFF` - produce the minimum sufficient continuation package for a replacement conversation.
- `RESUME` - re-resolve current state, reconcile the handoff against current evidence, and continue from the resolved state.

Governing principle:

**repository-derived where possible; chat-derived only where necessary.**

For authority and reconciliation details, read `references/methodology.md`.

## Choose the mode

Use `HANDOFF` when active governed work is moving to another conversation.

Use `RESUME` when a replacement conversation receives a governed handoff or continuation package.

Do not treat a handoff as repository authority.

## HANDOFF

1. Identify the exact workstream and scope boundary.
2. Identify every materially relevant repository.
3. Resolve current local repository state when deterministic support is available.
4. Preserve branch, HEAD, upstream, ahead/behind, synchronization state, staged, unstaged, and untracked state separately.
5. Preserve materially relevant governance with exact repository status.
6. Preserve only work items needed for safe continuation using the canonical work-state vocabulary.
7. Determine the narrowest exact next action. If evidence does not establish one, mark it `UNRESOLVED`.
8. Preserve required artifacts with exact path/name, existence state, and hash when material.
9. Preserve material conflicts and unknowns.
10. Exclude secrets and unrelated history.
11. Produce a concise handoff using `references/handoff-template.md`.
12. End with a directive telling the replacement conversation to use `RESUME`.

## RESUME

1. Treat the handoff as continuation evidence, not authority.
2. Re-identify the exact workstream and materially relevant repositories.
3. Re-resolve current local repository state before governed modification.
4. Compare current evidence with the handoff snapshot.
5. Identify drift, stale claims, conflicts, missing artifacts, and unresolved facts.
6. Apply repository authority to governance and institutional-memory questions.
7. Preserve still-relevant implementation/chat state under the correct source class.
8. Distinguish current implementation, approved architecture, and intended target state.
9. Determine the exact current next action only after reconciliation.
10. Continue from that action without unnecessary broad rediscovery.
11. Use `references/resume-protocol.md` for rendering.

## Source and state fidelity

Use the exact source classes and work states in
`references/source-state-vocabulary.md`.

Never silently:

- convert `Proposed` into another status;
- upgrade `Unknown` without repository verification;
- call interrupted work complete;
- treat a clean tree as synchronized;
- replace local state with remote state;
- revive rejected/superseded architecture;
- claim a missing artifact exists;
- fabricate an exact next action;
- let chat override current repository authority.

## Repository context

When the repository provides `scripts/platform/repository_context.py`, use it as
the primary deterministic context resolver. Do not build a second parser.

See `references/repository-context.md`.

## Security

Never reproduce secret values. See `references/security-artifacts.md`.

## Relevance

Transfer the minimum sufficient continuation state. Exclude unrelated
workstreams, resolved historical discussion, copied repository content that can
be re-resolved, and speculative background that does not affect the next
action.
