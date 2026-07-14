# Deterministic Automation Standard

Version: 1.0.0

Status:
Active

------------------------------------------------------------------------------

## Purpose

This standard defines engineering expectations for deterministic,
reproducible, reviewable, and repository-owned automation.

------------------------------------------------------------------------------

## Governing Principle

Automate deterministic process.

Preserve human judgment.

------------------------------------------------------------------------------

## Requirements

Prefer deterministic and reproducible automation.

Prefer repository-owned tooling over disposable automation when logic is
reusable, material, or operationally significant.

Automation should be readable, reviewable, version controlled, and testable
whenever practical.

Generated artifacts should be reproducible from documented inputs and
repository-owned tooling whenever practical.

Automation should minimize undocumented behavior and unnecessary
architectural change.

Machine-verifiable policy may enforce deterministic requirements.

Automation shall not claim to replace:

- architectural judgment;
- constitutional interpretation;
- engineering tradeoffs;
- research conclusions;
- strategic decisions.

------------------------------------------------------------------------------

## Applicability

This standard applies equally to:

- human engineers;
- AI assistants;
- contractors;
- repository utilities;
- future engineering automation.

------------------------------------------------------------------------------

## Implementation Boundary

This standard does not prescribe a programming language, shell, framework,
documentation system, vendor, repository path, or AI product.

Repository-specific technical choices belong in Implementation Guides and
operational documentation.
