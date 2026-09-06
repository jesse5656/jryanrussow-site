# Researcher Aliases

Version: 1.1.1
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

## Automatic Handoff / Resume Behavior

Automatic HANDOFF/RESUME authority comes from each primary workstream's
`START-HERE.md` and the governed ChatGPT workflow. It does **not** depend on an
Espanso alias being used.

`:startjr`, `:startarchive`, and `:startops` may repeat the rule as convenient
session-start reminders, but they are not required to activate it.

For #1, #2, and #3:

- clear intent to move active work to another chat automatically triggers
  HANDOFF;
- a governed handoff supplied to a replacement chat automatically triggers
  RESUME;
- the user does not need to remember or type a skill name, alias, `HANDOFF`, or
  `RESUME`;
- the validated `handoff-governed-work` skill is used where the runtime exposes
  it; otherwise the equivalent governed procedure is executed directly.

`:close` remains the standard close for a session that is actually complete.
If active work will continue in another chat, HANDOFF takes precedence.

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
