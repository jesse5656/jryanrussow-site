# ChatGPT Workflow

Version: 1.1.0

Status:
Active

Authority:
Systems Architect Discipline

Governing OCP:
OCP-008 — Governed Chat Handoff and Resume

------------------------------------------------------------------------------

## Purpose

Define the human procedure for starting, handing off, resuming, and closing
governed ChatGPT workstreams.

ChatGPT conversations are temporary working sessions.

Repositories are institutional memory.

The continuity principle is:

**repository-derived where possible; chat-derived only where necessary.**

------------------------------------------------------------------------------

## Governing Sources

This workflow operates under repository constitutions, Repository Governance,
the Deterministic Automation Standard, the Repository Change Workflow, the AI
Collaboration Standard, the ChatGPT Project Workspace Standard, and OCP-008.

Higher governance remains authoritative.

------------------------------------------------------------------------------

## Workstream Boundary

Use the correct ChatGPT workstream and governing repository.

Do not import unrelated conversation history merely because it is available.

A handoff preserves only information materially necessary to continue the
specific workstream.

------------------------------------------------------------------------------

## Session Start

For governed repository work:

1. identify the workstream;
2. identify the governing repository or repositories;
3. resolve repository context before governed modification;
4. read the applicable operating state and governance;
5. determine the exact current task;
6. continue from institutional memory rather than reconstructing the project
   from chat history.

For this repository:

```bash
cd ~/Documents/Projects/jryanrussow-site
python3 scripts/platform/repository_context.py
```

Repository Context Resolution provides context. It does not make architectural
decisions.

------------------------------------------------------------------------------

## Normal Governed Repository Work

Repository changes continue to follow:

Intent to Change Repository
→ Repository Context Resolution
→ Work
→ Governance Enforcement
→ Commit

Before a governed commit:

```bash
python3 scripts/governance/governance_engine.py --staged
```

A chat transition does not bypass this workflow.

------------------------------------------------------------------------------

## Automatic HANDOFF / RESUME Trigger

For the three primary long-running ChatGPT workstreams defined by the ChatGPT
Project Workspace Standard, activation is semantic and automatic.

The user does **not** need to name `handoff-governed-work`, type `HANDOFF`, or
remember a special command.

Treat any clear user intent to move active governed work to another
conversation as a HANDOFF trigger. Examples include, but are not limited to:

- start a new chat;
- move this to a new chat;
- move this to a fresh chat;
- hand this off;
- continue this in another chat;
- create a continuation prompt;
- this chat is getting too long/slow and should be replaced.

When triggered:

1. automatically execute the governed HANDOFF procedure in this document;
2. if the active runtime exposes the validated `handoff-governed-work` skill,
   invoke its HANDOFF mode;
3. otherwise perform the same governed HANDOFF behavior directly from this
   procedure;
4. do not require the user to repeat the request using a skill name or command.

Treat receipt of a governed handoff, or a clear request to continue from one,
as an automatic RESUME trigger.

When RESUME is triggered:

1. treat the handoff as continuation evidence, not authority;
2. re-resolve current repository state;
3. reconcile drift and conflicting evidence;
4. determine the exact current next action;
5. continue rather than restarting broad discovery.

This trigger changes activation behavior only. It does not change the validated
HANDOFF/RESUME methodology or production skill bytes.

------------------------------------------------------------------------------

## When to Use HANDOFF

Use HANDOFF when the user directs work to a new chat, the current chat becomes
long or slow, a natural milestone is reached, or unresolved work must continue
in another conversation.

Do not create a repository commit solely to make a chat transition appear
clean.

If work is genuinely ready to commit, complete the normal governed commit.

If work is not ready, preserve its actual staged, unstaged, untracked, blocked,
interrupted, or unresolved state.

------------------------------------------------------------------------------

## Mode A — HANDOFF

HANDOFF produces a concise continuation package. It is transfer evidence, not
repository authority.

Material claims shall be distinguishable where necessary as:

- **Repository-derived** — current repository files, Git state, approved
  governance, or deterministic repository tooling.
- **Chat-derived** — established only in the current conversation.
- **Implementation-derived** — command output, runtime state, generated
  artifacts, or observed implementation evidence not yet institutionalized.
- **Unresolved** — material state that cannot currently be established.

Do not silently promote Chat-derived or Implementation-derived state to
Repository-derived.

The handoff shall preserve only applicable state from these categories:

1. workstream identity and scope;
2. each relevant repository's purpose, path, branch, HEAD, upstream,
   ahead/behind state, clean/dirty state, staged changes, unstaged changes,
   untracked files, and authority role;
3. materially relevant governance and exact proposal status;
4. current work state: completed, active, blocked, pending, unresolved,
   rejected, watch/monitoring, or interrupted;
5. the narrowest known exact next action, or explicitly unresolved;
6. material invariants, architecture stop lines, terminology, host/environment
   distinctions, and scope exclusions;
7. required artifacts, paths, hashes, validation state, existence, and whether
   the next conversation needs the artifact;
8. security exclusions;
9. a continuation directive telling the next conversation to resolve current
   repository state, reconcile differences, determine the exact next action,
   and continue without broad rediscovery.

A clean working tree is not equivalent to synchronization with upstream.

A command without verified completion shall not be represented as complete.

Rejected or superseded architecture shall not be revived merely because it
appears in historical conversation context.

Never intentionally include passwords, API keys, bearer tokens, session tokens,
private keys, database credentials, or secret configuration values.

------------------------------------------------------------------------------

## Handoff Relevance Rule

The handoff is the minimum sufficient continuation state.

Do not dump the entire conversation, duplicate repository documents that can be
resolved directly, or include abandoned history unless its rejected status is
material.

The objective is continuity with reduced rediscovery, not conversation
archiving.

------------------------------------------------------------------------------

## Mode B — RESUME

A replacement conversation shall not blindly trust a handoff.

Resume in this order:

1. identify the governing workstream;
2. identify every materially relevant repository;
3. resolve current local repository context before governed modification;
4. verify branch, HEAD, working-tree state, and synchronization state;
5. read specifically relevant repository files;
6. reconcile handoff claims against current evidence;
7. preserve newer Chat-derived or Implementation-derived state under its proper
   source label;
8. identify missing or contradictory evidence explicitly;
9. determine the exact current next action;
10. continue without repeating broad discovery made unnecessary by
    institutional memory.

If the repository advanced after the handoff, current repository state controls
repository-derived facts.

If local and remote differ, do not assume remote main is authoritative merely
because it is remote.

If chat conflicts with repository authority, identify the conflict and apply
the governance hierarchy.

Distinguish current implementation, approved architecture, and intended target
state.

Verify current proposal documents and preserve their exact status.

If a required artifact is missing, mark it missing or unresolved rather than
inventing it.

------------------------------------------------------------------------------

## Multiple Repositories

Resolve each materially relevant repository separately.

Do not collapse several repositories into one synthetic branch, HEAD,
working-tree, synchronization, or authority state.

------------------------------------------------------------------------------

## Session Close

A completed session that does not require continuation may use:

- Completed;
- Current Objective;
- Next Concrete Step;
- Deferred.

If another conversation will continue active work, use HANDOFF instead.

------------------------------------------------------------------------------

## Chat Archival

Archive replaced chats using:

`YYYY-MM-DD — Repository — Sprint Name`

Archiving a chat does not make it authoritative institutional memory.

------------------------------------------------------------------------------

## Failure Conditions

Stop and resolve the discrepancy rather than pretending state is known when the
governing repository is unclear, context has not been resolved for intended
governed modification, proposal status is uncertain, local/remote divergence is
material, a required artifact is missing, a supposedly completed command lacks
completion evidence, secret material appears, or implementation is being
confused with approved or target architecture.

------------------------------------------------------------------------------

## Deterministic Support Boundary

`scripts/platform/repository_context.py` remains the primary Repository Context
Resolution implementation.

This workflow does not authorize duplicate context-resolution logic.

Repairs or extensions are governed by OCP-008 and the applicable Skill
Specification.

------------------------------------------------------------------------------

## Skill Boundary

This document defines the human procedure, not the executable skill contract.

The reusable skill shall be governed by a separate Skill Specification and
shall not be represented as production-ready until controlled validation passes.

------------------------------------------------------------------------------

## Exact Governing Principle

**repository-derived where possible; chat-derived only where necessary.**
