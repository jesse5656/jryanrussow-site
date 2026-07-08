# Researcher Aliases

Purpose:

This file is the single source of truth for recurring commands, aliases, shortcuts, and daily project phrases used in Russow Institute work.

---

## ChatGPT Aliases

EOP

Expands to:

Execute the Operating Plan.

Purpose:

Tell ChatGPT to inspect the repository, read the operating plan, and continue the highest-priority objective.

---

ACP

Expands to:

Architecture Change Proposal

Purpose:

Used when a proposed change affects repository structure, doctrine, standards, folder taxonomy, or long-term architecture.

---

OCP

Expands to:

Operational Change Proposal

Purpose:

Used when a proposed change affects recurring workflows, tools, aliases, session procedures, or operating behavior.

---

CLOSE

Expands to:

Completed

Current Objective

Next Concrete Step

Deferred

Purpose:

Standard session close format.

---

## Espanso Triggers

:eop

Execute the Operating Plan.

---

:acp

Architecture Change Proposal

---

:ocp

Operational Change Proposal

---

:close

Completed

Current Objective

Next Concrete Step

Deferred

---

:repo

Repository verification block.

Includes:

cd ~/Documents/Projects/jryanrussow-site

pwd

git branch --show-current

git status --short

git log --oneline --decorate -5

tree docs -L 3

---

:start

Full Systems Architect Discipline session start.

Includes repository verification plus:

cat START-HERE.md

cat docs/discipline/OPERATING-PLAN.md

cat docs/research-programs/001-institutional-memory/README.md

---

:rp001

Research Program 001 inspection.

---

:gitcheck

Quick Git status and recent history.

---

:gitpush

Generic add, commit, push scaffold.

The commit message must be filled in manually.

---

:archivechat

Generates the standard long-chat archive / transition instruction.

---

## Configuration Locations

Repository source of truth:

config/espanso/base.yml

Live Espanso config:

~/.config/espanso/match/base.yml

Deployment command:

cp config/espanso/base.yml ~/.config/espanso/match/base.yml
espanso restart

---

## Governance

When an alias changes:

1. Update config/espanso/base.yml
2. Copy it to ~/.config/espanso/match/base.yml
3. Restart Espanso
4. Update this ALIASES.md file
5. Commit the change
6. If ChatGPT must understand the alias, update ChatGPT Project Instructions
