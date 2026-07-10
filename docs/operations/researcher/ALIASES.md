# Researcher Aliases

Version: 1.0.0

Status:
Active

## Purpose

This file is the single source of truth for recurring commands, aliases, shortcuts, and daily project phrases used in Russow Institute work.

## Espanso Triggers

:startjr

Starts a Systems Architect Discipline session for:

~/Documents/Projects/jryanrussow-site

:startarchive

Starts a Midwest24 Archive session for:

~/Documents/Projects/midwest24-site

:startops

Starts a MIDWESTGuard Executive Operations session for:

~/Documents/Projects/mwg-ops-manual

:acp

Architecture Change Proposal.

:ocp

Operational Change Proposal.

:close

Standard session close.

## ChatGPT Shorthand

EOP

Execute the Operating Plan.

ACP

Architecture Change Proposal.

OCP

Operational Change Proposal.

CLOSE

Completed

Current Objective

Next Concrete Step

Deferred

## Configuration Locations

Repository source of truth:

config/espanso/base.yml

Live Espanso config:

~/.config/espanso/match/base.yml

Deployment command:

cp config/espanso/base.yml ~/.config/espanso/match/base.yml

espanso restart

## Governance

When an alias changes:

1. Update config/espanso/base.yml.
2. Copy it to ~/.config/espanso/match/base.yml.
3. Restart Espanso.
4. Update this ALIASES.md file.
5. Commit the change.
