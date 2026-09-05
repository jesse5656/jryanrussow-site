# J Ryan Russow Website Operations Manual
Version: 1.0
Status: Active
Last Updated: 2026-07-05

=====================================================================
MISSION
=====================================================================

The purpose of jryanrussow.com is to establish J Ryan Russow as the
authoritative voice on integrated human performance through
entrepreneurship, wealth creation, physical strength, leadership,
and mental resilience.

The website exists to:

• Teach
• Build trust
• Demonstrate experience
• Generate coaching opportunities
• Publish lasting resources

Search rankings are a consequence of quality—not the primary goal.

=====================================================================
CORE FRAMEWORK
=====================================================================

Everything on the website supports one framework:

The Three-Pillar Method

    Wealth
       ▲
       │
Body ◄─┼─► Mind
       │
 Leadership

Every article should reinforce one or more pillars.

=====================================================================
CORNERSTONE PAGES
=====================================================================

Priority 1

About

Three-Pillar Method

Body Code

Mind Forge

Compound Performance Circle

These pages should always receive the highest editorial attention.

=====================================================================
BLOG STRATEGY
=====================================================================

Every article should:

• Answer one important question.
• Share first-hand experience.
• Teach a practical framework.
• Link to cornerstone pages.
• End with an action.

=====================================================================
SEO PHILOSOPHY
=====================================================================

Never write for algorithms.

Write for people.

Then make it easy for search engines to understand.

=====================================================================
CONTENT HIERARCHY
=====================================================================

Cornerstone Pages

↓

Supporting Guides

↓

Blog Articles

↓

Downloads

↓

Lead Magnets

=====================================================================
REVIEW SCHEDULE
=====================================================================

Weekly

Publish

Internal links

Monthly

Search Console

Analytics

Broken links

Quarterly

Rewrite weak articles

Improve cornerstone pages

Refresh metadata


------------------------------------------------------------------------------

## Russow Institute Deployment

The Systems Architect Discipline / Russow Institute documentation site is generated from repository Markdown using MkDocs Material.

The production flow is:

    Repository docs/
        ↓
    mkdocs build
        ↓
    site/
        ↓
    rsync
        ↓
    /mnt/FastPool/RussowInstituteWiki/
        ↓
    Cloudflare
        ↓
    https://institute.midwest24.com/

### Build

Run from:

    cd ~/Documents/Projects/jryanrussow-site

Build:

    mkdocs build

Verify:

    test -f site/index.html

### Publish

Publish generated output only:

    rsync -av --delete site/ truenas_admin@truenas:/mnt/FastPool/RussowInstituteWiki/

The --delete option intentionally makes the production directory mirror the generated MkDocs site.

Never use the repository root as the rsync source.

### Remote Verification

Verify the production homepage exists on TrueNAS:

    ssh truenas_admin@truenas 'test -f /mnt/FastPool/RussowInstituteWiki/index.html'

### Public Verification

Production URL:

    https://institute.midwest24.com/

Verify:

- homepage returns HTTP 200;
- page identity is correct;
- CSS, JavaScript, and image assets load;
- representative internal links return HTTP 200;
- nonexistent pages return HTTP 404;
- HTTP redirects to HTTPS;
- Cloudflare serves the public endpoint.

### Local Operational Output

Repository-local diagnostic output belongs in:

    output/

Examples include:

- deployment verification;
- repository inspections;
- governance diagnostics;
- troubleshooting output;
- audits;
- substantial AI-session command output.

The directory is Git-ignored.

These files are temporary operational artifacts, not institutional memory.

Anything deserving permanent preservation must be distilled into the appropriate governed repository documentation.

For substantial output:

    mkdir -p output
    OUTPUT="output/<purpose>-$(date +%Y%m%d-%H%M%S).txt"
    {
        commands
    } > "$OUTPUT" 2>&1
    echo "OUTPUT FILE: $OUTPUT"
    ls -lh "$OUTPUT"


------------------------------------------------------------------------------

## Architecture and Credential Boundaries

This manual governs website and Institute publication operations. Canonical
infrastructure and access status belongs in
`docs/architecture/INFRASTRUCTURE-ACCESS-AND-REQUEST-FLOWS.md`. Credential
handling is governed by
`docs/standards/CREDENTIAL-AND-TOKEN-HANDLING-STANDARD.md`.

This manual does not authorize repository storage of credential values or
representation of planned services as current implementation.

## Continue Reading

- [Infrastructure, Access, and Request Flows](../architecture/INFRASTRUCTURE-ACCESS-AND-REQUEST-FLOWS.md)
- [Credential and Token Handling Standard](../standards/CREDENTIAL-AND-TOKEN-HANDLING-STANDARD.md)
- [Repository Change Workflow](REPOSITORY-CHANGE-WORKFLOW.md)
