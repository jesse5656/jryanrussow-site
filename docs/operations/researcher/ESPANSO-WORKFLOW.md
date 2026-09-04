# Espanso Workflow

Version: 1.1.0

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

## Automatic Governed Chat Transition

`:startjr`, `:startarchive`, and `:startops` each inject the same automatic
governed transition rule.

Once the session starter is present in a chat:

- clear semantic intent to move work to another chat automatically triggers
  HANDOFF;
- receipt of a governed handoff automatically triggers RESUME;
- no explicit `$handoff-governed-work`, `HANDOFF`, or `RESUME` command is
  required from the user;
- if the runtime exposes the validated skill, it is invoked;
- otherwise the assistant follows the governed procedure directly.

This is intentionally embedded in each of the three primary startup prompts so
the trigger travels with the working session.

## Deployment

After editing config/espanso/base.yml, run:

cp config/espanso/base.yml ~/.config/espanso/match/base.yml

espanso restart

espanso status

## Rule

Espanso stores text expansions.

The repository documents what they mean.

The repository remains the source of truth.
