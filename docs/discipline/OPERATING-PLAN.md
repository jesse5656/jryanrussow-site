# Systems Architect Discipline Operating Plan

Version: 1.1.0

Status:
Active

---

## Purpose

This document defines current execution for the Systems Architect Discipline.

---

# Engineering Execution Rules

These rules apply to every engineering objective unless explicitly overridden.

1. Repository First
   - The repository is the source of truth.
   - Do not rely on chat history to determine implementation state.

2. Pre-Implementation Audit (Required)
   - Before generating implementation code, audit the repository to determine whether the requested capability:
     - already exists,
     - is partially implemented, or
     - is missing.
   - Do not implement a capability that already exists.
   - If partially implemented, extend the existing implementation instead of creating a duplicate.

3. Single Implementation Block
   - Generate implementation as one copy/paste-safe bash block.
   - Use Python file writers when creating or modifying files.
   - Avoid nested heredocs.
   - Validate the implementation before generating any commit commands.

4. Validation
   - Execute targeted validation first.
   - Execute the full test suite after targeted validation succeeds.
   - Do not generate commit commands until all validation passes.

5. Architecture Stability
   - Existing architecture is assumed correct.
   - Do not redesign architecture unless the Current Objective explicitly requires it.
   - Architectural changes require an approved Architecture Change Proposal (ACP) or Operational Change Proposal (OCP).

6. Shell Safety
   - Never enable `set -e`, `set -u`, or equivalent strict shell options directly in an interactive terminal session.
   - If strict shell behavior is required, isolate it inside a subshell or standalone script.
   - Engineering command blocks shall leave the user's interactive shell in its normal operating state.
   - Diagnostic commands that may legitimately return a nonzero result shall report their exit code without terminating the interactive shell.

------------------------------------------------------------------------------

# Current Objective

Type:
Research Program

Name:
Institutional Memory Evidence Development

Status:
In Progress

Objective:
Advance Research Program 001 by extracting evidence, strengthening the NASA Challenger case study, and revising the Institutional Memory paper.

Scope:

- Rogers Commission evidence extraction
- NASA Challenger case study development
- Institutional Memory paper revision
- Knowledge lineage validation
- Primary source workflow validation

Success Criteria:

- Evidence extracted from at least one primary source
- Case study updated with evidence
- Institutional Memory paper improved
- Related documents linked where appropriate

Definition of Done:
□ Objective completed
□ Validation completed
□ Verification completed
□ Documentation updated
□ OPERATING-PLAN.md updated
□ Git commit completed if repository changes occurred

---

# Priority Queue

1. Complete Rogers Commission evidence extraction
2. Complete NASA Challenger case study
3. Revise Institutional Memory paper
4. Validate Primary Source workflow with Vocalinux narratives
5. Review North Star candidates after evidence development

---

# Session Management

When Current Objective is complete:

1. Verify against Definition of Done.
2. Update OPERATING-PLAN.md.
3. Promote Priority Queue item #1 if appropriate.
4. Commit changes.
5. Stop.
