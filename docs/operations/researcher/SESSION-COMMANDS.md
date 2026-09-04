# Session Commands

Version: 1.0.0

Status: Active

## Repository Verification

cd ~/Documents/Projects/jryanrussow-site

pwd

git branch --show-current

git status --short

git log --oneline --decorate -5

tree docs -L 3

---

## Full Session Start

cd ~/Documents/Projects/jryanrussow-site

pwd

git branch --show-current

git status --short

git log --oneline --decorate -5

tree docs -L 3

cat START-HERE.md

cat docs/discipline/OPERATING-PLAN.md

cat docs/research-programs/001-institutional-memory/README.md

---

## Research Program 001 Inspection

tree docs/research-programs/001-institutional-memory -L 4

find docs/research-programs/001-institutional-memory -maxdepth 3 -type f | sort

---

## Session Close

For a completed session that does not require continuation:

Completed

Current Objective

Next Concrete Step

Deferred

For active work moving to another ChatGPT conversation, use:

`docs/operations/researcher/CHATGPT-WORKFLOW.md`

Do not create a commit solely for chat transition. Preserve material unfinished
repository state accurately in the handoff.

------------------------------------------------------------------------------

## Repository-Local Operational Output

Temporary diagnostic, inspection, validation, audit, and verification output belongs in:

    output/

The directory is Git-ignored and is not institutional memory.

Preferred pattern:

    mkdir -p output
    OUTPUT="output/<purpose>-$(date +%Y%m%d-%H%M%S).txt"
    {
        commands
    } > "$OUTPUT" 2>&1
    echo "OUTPUT FILE: $OUTPUT"
    ls -lh "$OUTPUT"

For substantial diagnostic, inspection, validation, audit, deployment, or verification output, generated commands shall create `output/` if necessary, create a timestamped output file, capture stdout and stderr, and print the file path when complete.

Do not create output files for trivial terminal output.

Information requiring permanent preservation belongs in governed repository documentation, not output/.

------------------------------------------------------------------------------

## Russow Institute Build and Publish

Run from:

    cd ~/Documents/Projects/jryanrussow-site

Build:

    mkdocs build

Verify generated homepage:

    test -f site/index.html

Publish:

    rsync -av --delete site/ truenas_admin@truenas:/mnt/FastPool/RussowInstituteWiki/

Verify remote homepage:

    ssh truenas_admin@truenas 'test -f /mnt/FastPool/RussowInstituteWiki/index.html'

Verify production endpoint:

    curl -sS -o /dev/null -w 'HTTP: %{http_code}\nFinal URL: %{url_effective}\n' https://institute.midwest24.com/
