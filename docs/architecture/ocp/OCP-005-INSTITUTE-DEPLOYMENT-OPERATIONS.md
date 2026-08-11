# OCP-005 — Institute Deployment Operations

Version: 1.0.0

Status: Approved

Type: Operational Change Proposal

------------------------------------------------------------------------------

## Purpose

Establish the documented build, publication, production-verification, and diagnostic-output procedures for the Russow Institute website.

------------------------------------------------------------------------------

## Current State

The Systems Architect Discipline documentation is built with MkDocs Material.

Generated static output is written to the repository-local site/ directory.

Production files are published to:

    /mnt/FastPool/RussowInstituteWiki/

The public Institute is available at:

    https://institute.midwest24.com/

------------------------------------------------------------------------------

## Approved Operational Change

The standard Institute deployment sequence is:

1. Resolve repository context.
2. Build the MkDocs site.
3. Verify generated output.
4. Publish site/ to TrueNAS.
5. Verify remote production files.
6. Verify the public HTTPS deployment.
7. Verify representative assets and internal links.
8. Verify 404 behavior.
9. Verify HTTP-to-HTTPS redirection.
10. Preserve substantial diagnostic output when useful.

------------------------------------------------------------------------------

## Publication Target

Generated output is synchronized to:

    truenas_admin@truenas:/mnt/FastPool/RussowInstituteWiki/

Standard publication command:

    rsync -av --delete site/ truenas_admin@truenas:/mnt/FastPool/RussowInstituteWiki/

The --delete option intentionally makes the production directory mirror the generated MkDocs output.

The repository root must never be used as the rsync source.

------------------------------------------------------------------------------

## Repository-Local Output Directory

Temporary command output, diagnostic reports, audits, inspection results, and verification reports shall use:

    output/

The directory shall exist at the repository root.

The directory shall be excluded from Git with:

    output/

The output directory contains operational artifacts.

It is not institutional memory.

Files in output/ shall not normally be committed.

Information that deserves permanent preservation shall be distilled into the appropriate governed repository documentation.

------------------------------------------------------------------------------

## Long-Output Standard

Commands expected to produce substantial diagnostic, inspection, validation, audit, deployment, or verification output shall automatically create the repository-local output/ directory when necessary, create a timestamped output file, capture stdout and stderr to that file, and print the resulting file path when complete.

Preferred naming pattern:

    output/<purpose>-YYYYMMDD-HHMMSS.txt

Required shell pattern for substantial output:

    mkdir -p output
    OUTPUT="output/<purpose>-$(date +%Y%m%d-%H%M%S).txt"
    {
        commands
    } > "$OUTPUT" 2>&1
    echo "OUTPUT FILE: $OUTPUT"
    ls -lh "$OUTPUT"

Use output files when:

- terminal output would be inconveniently large;
- complete output may be needed for troubleshooting;
- output will be supplied to an AI engineering session;
- an audit or verification record is useful;
- copying terminal output manually would be inefficient.

Do not create output files for trivial commands whose output is short and immediately understandable.

------------------------------------------------------------------------------

## Shell Safety

Strict shell mode shall not be enabled globally in an interactive shell.

When strict execution is useful, it shall run inside a subshell or standalone script in accordance with OCP-003.

------------------------------------------------------------------------------

## Scope

- .gitignore
- docs/architecture/ocp/OCP-005-INSTITUTE-DEPLOYMENT-OPERATIONS.md
- docs/operations/WEBSITE-OPERATIONS-MANUAL.md
- docs/operations/QA-CHECKLIST.md
- docs/operations/RELEASE-CHECKLIST.md
- docs/operations/researcher/SESSION-COMMANDS.md

------------------------------------------------------------------------------

## Governance Boundary

This OCP standardizes an operational deployment process already proven in production.

It does not redesign the hosting architecture.

It does not authorize modification of unrelated website content.

------------------------------------------------------------------------------

## Approval

Approved by the governing Systems Architect Discipline session.
