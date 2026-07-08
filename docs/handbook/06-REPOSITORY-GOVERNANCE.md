# Repository Governance

Version: 1.0.0

Status:
Active

------------------------------------------------------------------------------

## Purpose

This document defines the governance mechanisms that protect the repository from
architecture drift and preserve institutional memory.

The objective is to make architecture changes intentional rather than accidental.

------------------------------------------------------------------------------

# Governance Principles

- The repository is the authoritative source of truth.
- Inspect before modifying.
- Modify before creating.
- Create only when necessary.
- No implementation before specification.
- Architecture changes require an Architecture Change Proposal (ACP).
- Operational changes require an Operational Change Proposal (OCP).
- Automation should enforce governance whenever practical.

------------------------------------------------------------------------------

# Protected Repository Assets

The following files and folders are considered governance assets.

Changes to them should normally require an ACP or OCP.

Examples include:

START-HERE.md

OPERATING-PLAN.md

docs/institute/

docs/architecture/

docs/workflows/

docs/operations/

docs/discipline/CONSTITUTION.md

------------------------------------------------------------------------------

# Git Guardrails

Repository guardrails may include:

- pre-commit hooks
- validation scripts
- repository consistency checks
- documentation verification
- operating plan validation

These mechanisms exist to reduce accidental architecture drift.

------------------------------------------------------------------------------

# Architecture Change Process (ACP)

Use an ACP whenever proposing changes to:

- repository architecture
- governance
- folder structure
- naming conventions
- institutional standards
- constitutional documents

ACP output should include:

- Current State
- Problem
- Proposed Change
- Trade-offs
- Recommendation

Implementation occurs only after approval.

------------------------------------------------------------------------------

# Operational Change Process (OCP)

Use an OCP whenever proposing changes to:

- operational procedures
- execution workflow
- recurring processes
- team practices

Implementation occurs only after approval.

------------------------------------------------------------------------------

# Automation Philosophy

Whenever practical:

Automate enforcement.

Do not rely solely on memory.

Repository governance should become progressively self-enforcing.

------------------------------------------------------------------------------

# Related Documents

START-HERE.md

docs/discipline/OPERATING-PLAN.md

docs/handbook/RESEARCHER-HANDBOOK.md

