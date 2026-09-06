# START HERE

## Strategic Purpose — Why This Work Exists

The Russow Institute research repository is not the final product.

It is the evidence and intellectual-property infrastructure behind a
proprietary methodology—and eventually technology—for detecting where
organizations possess critical knowledge but fail to convert it into
effective action before that failure becomes expensive or catastrophic.

The intended progression is:

**Research IP → Framework → Diagnostic Methodology → Client Deliverable →
Commercial Validation → Repeatable Advisory → Technology**

Research must serve this progression rather than become an end in itself.

**Authoritative strategic reference:**
[Institutional Memory — Commercialization Thesis](docs/research-programs/001-institutional-memory/COMMERCIALIZATION-THESIS.md)

Version: 1.0.1
Status:
Active

------------------------------------------------------------------------------

## Purpose

This document defines how every work session begins.

The repository—not ChatGPT—is the authoritative source of institutional memory.

Every contributor should follow this workflow before beginning work.

------------------------------------------------------------------------------

## Read in Order

1. docs/discipline/OPERATING-PLAN.md

2. docs/discipline/CONSTITUTION.md

3. docs/institute/TRACEABILITY-STANDARD.md

4. docs/research/RESEARCH-STANDARD.md

5. Current Research Program README

------------------------------------------------------------------------------

## Operating Mode

Execute the Operating Plan.

Do not redesign architecture unless an Architecture Change Proposal has been requested.

Finish before expanding.

Research before architecture.

Preserve before compressing.

Maximum three active objectives.

Reality should justify architecture.

------------------------------------------------------------------------------

## Automatic Governed Chat Transition Rule

This rule is mandatory for this workstream and is read from repository
authority during normal session startup.

It does **not** depend on Espanso, a startup alias, conversational memory, or
the user remembering a skill name or special command.

When the user clearly indicates that active work should move to a new, fresh,
replacement, continuation, or otherwise different chat, the assistant shall
automatically execute governed HANDOFF behavior before the transition.

Examples of semantic HANDOFF intent include, but are not limited to:

- start a new chat;
- move this to a new chat;
- move this to a fresh chat;
- hand this off;
- continue this in another chat;
- this chat is getting too long or slow;
- create the continuation for the replacement chat.

The user is **not required** to type `HANDOFF`, `RESUME`,
`$handoff-governed-work`, `:startjr`, `:startarchive`, `:startops`, or any other
trigger token.

HANDOFF shall preserve only the minimum sufficient continuation state,
including as applicable:

- exact workstream identity and scope;
- every materially relevant repository;
- branch, HEAD, upstream, ahead/behind, synchronization, staged, unstaged, and
  untracked state;
- materially relevant governance with exact status;
- current work state;
- the narrowest exact next action, or explicitly `UNRESOLVED`;
- required artifacts and hashes when material;
- material conflicts and unresolved facts;
- security boundaries and secret exclusion.

If the active runtime exposes the validated `handoff-governed-work` skill, use
its HANDOFF mode. If it does not, execute the equivalent governed HANDOFF
procedure directly.

When a replacement chat receives a governed handoff, or the user clearly asks
to continue from one, the assistant shall automatically execute RESUME:

1. treat the handoff as continuation evidence, not repository authority;
2. re-resolve current repository state;
3. reconcile drift, stale claims, and conflicts;
4. determine the exact current next action;
5. continue from the resolved state without restarting broad discovery.

This `START-HERE.md` rule is the workstream activation authority. Text-expansion
aliases may repeat it for convenience but are not required for it to apply.

------------------------------------------------------------------------------

## Session Workflow

Review the Operating Plan.

Execute the highest-priority objective.

Commit completed work.

Update the Operating Plan if priorities changed.

End the session with:

Completed

Current Objective

Next Concrete Step

Deferred

------------------------------------------------------------------------------

## Repository Philosophy

README.md explains the repository.

START-HERE.md explains how to begin work.

OPERATING-PLAN.md explains what the Discipline is doing now.



------------------------------------------------------------------------------

## Chat Session Standard

ChatGPT conversations are temporary working sessions.

The repository is the institutional memory.

When a chat becomes long, slow, reaches a natural milestone, or is being
replaced:

1. Commit repository work only when it is actually ready and the governed
   change workflow permits the commit.
2. Do not create a commit solely to make the chat transition appear clean.
3. Generate a governed HANDOFF when another conversation will continue active
   work.
4. Start the replacement ChatGPT conversation.
5. The replacement conversation shall use RESUME: resolve current repository
   state, reconcile the handoff, and continue from the resolved state.
6. Archive the previous chat.

The authoritative procedure is:

`docs/operations/researcher/CHATGPT-WORKFLOW.md`

Archived chats shall use the following naming convention:

YYYY-MM-DD — Repository — Sprint Name

Examples:

2026-07-08 — Systems Architect — Foundation Sprint 01
2026-07-10 — Systems Architect — Institutional Memory Sprint
2026-07-15 — Systems Architect — Challenger Evidence Sprint

The active chat always retains the repository workstream name.

The archived chat remains historical working-session evidence.

The repository remains authoritative institutional memory.



------------------------------------------------------------------------------

## Chat Session Archival Standard

Chats are working sessions.

Repositories are institutional memory.

Git commits are historical milestones.

When a chat becomes slow, reaches a natural milestone, or is being replaced, archive it using:

YYYY-MM-DD — Repository — Sprint Name

Example:

2026-07-08 — Systems Architect — Foundation Sprint 01


------------------------------------------------------------------------------

## Researcher Handbook

For daily aliases, Espanso triggers, recurring prompts, Vocalinux workflow, Git commands, and researcher operating shortcuts, see:

docs/operations/researcher/DAILY-OPERATIONS.md
