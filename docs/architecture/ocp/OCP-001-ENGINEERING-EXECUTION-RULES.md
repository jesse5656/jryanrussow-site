# OCP-001 — Engineering Execution Rules

Version: 1.0.0

Status:
Approved

Type:
Operational Change Proposal

------------------------------------------------------------------------------

## Purpose

Approve the addition of Engineering Execution Rules to the active Operating Plan.

These rules standardize repository-first implementation, pre-implementation auditing, copy/paste-safe command generation, validation before commit commands, and architecture stability.

------------------------------------------------------------------------------

## Current State

Engineering sessions repeatedly generated implementation before fully auditing repository state, occasionally duplicated existing capabilities, and sometimes produced commit commands before validation completed.

------------------------------------------------------------------------------

## Approved Operational Change

The Operating Plan shall include recurring Engineering Execution Rules requiring:

- repository-first execution;
- a pre-implementation audit;
- extension of existing implementation instead of duplication;
- one copy/paste-safe implementation block;
- targeted validation followed by the full test suite;
- commit commands only after validation passes;
- ACP or OCP approval for architectural or operational changes.

------------------------------------------------------------------------------

## Scope

- `docs/discipline/OPERATING-PLAN.md`
- `docs/architecture/ocp/OCP-001-ENGINEERING-EXECUTION-RULES.md`

------------------------------------------------------------------------------

## Governance Boundary

This OCP changes recurring engineering execution procedure.

It does not modify constitutional principles or authorize architectural redesign.

------------------------------------------------------------------------------

## Approval

Approved by the governing Systems Architect Discipline session.
