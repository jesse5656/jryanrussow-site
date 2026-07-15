# OCP-003 — Interactive Shell Safety

Version: 1.0.0

Status:
Approved

Type:
Operational Change Proposal

------------------------------------------------------------------------------

## Purpose

Add an Engineering Execution Rule preventing command blocks from permanently
enabling strict shell options in a user's interactive terminal.

------------------------------------------------------------------------------

## Problem

Commands using `set -e` or `set -u` at the top level of an interactive shell
can persist after the command block ends.

A later command returning a legitimate nonzero status can then terminate the
shell and close an integrated terminal before the failure can be inspected.

------------------------------------------------------------------------------

## Approved Operational Change

Engineering command blocks shall:

- not enable strict shell options globally in an interactive terminal;
- isolate strict mode inside a subshell or standalone script when required;
- preserve the user's normal interactive-shell state;
- report diagnostic exit codes without terminating the shell.

------------------------------------------------------------------------------

## Scope

- `docs/discipline/OPERATING-PLAN.md`
- `docs/architecture/ocp/OCP-003-SHELL-SAFETY.md`

------------------------------------------------------------------------------

## Governance Boundary

This change governs command-generation safety.

It does not amend constitutional principles or authorize architectural change.

------------------------------------------------------------------------------

## Approval

Approved by the governing Systems Architect Discipline session.
