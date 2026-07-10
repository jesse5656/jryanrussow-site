# Espanso Workflow

Version: 1.0.0

Status:
Active

## Purpose

Espanso provides text expansion for recurring project prompts and commands.

The repository source of truth is:

config/espanso/base.yml

The live Espanso file is:

~/.config/espanso/match/base.yml

## Current Triggers

:startjr

Starts a Systems Architect Discipline session.

:startarchive

Starts a Midwest24 Archive session.

:startops

Starts a MIDWESTGuard Executive Operations session.

:acp

Creates an Architecture Change Proposal prompt.

:ocp

Creates an Operational Change Proposal prompt.

:close

Creates the standard session close prompt.

## Deployment

After editing config/espanso/base.yml, run:

cp config/espanso/base.yml ~/.config/espanso/match/base.yml

espanso restart

espanso status

## Rule

Espanso stores text expansions.

The repository documents what they mean.

The repository remains the source of truth.
