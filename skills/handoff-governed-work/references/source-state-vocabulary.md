# Source Classes and Work-State Vocabulary

## Source classes

### `REPOSITORY_DERIVED`
Facts established from current repository files, Git state, current governance,
or deterministic repository tooling.

Uncommitted repository state can be repository-derived evidence, but it is not
the same as committed institutional memory.

### `IMPLEMENTATION_DERIVED`
Facts established by command output, runtime state, generated artifacts,
deployed-system observation, or validation output.

Implementation evidence does not silently redefine governance.

### `CHAT_DERIVED`
Facts established only in conversation and not yet institutionalized.

### `UNRESOLVED`
Material facts that cannot currently be established.

## Work states

- `COMPLETED` - completion is established.
- `ACTIVE` - work is currently in progress and not blocked.
- `BLOCKED` - a known dependency prevents progress.
- `PENDING` - a known action/dependency remains outstanding.
- `UNRESOLVED` - state/decision/next action cannot be established.
- `REJECTED` - explicitly rejected or superseded.
- `WATCH` - intentionally monitored; no current execution required.
- `INTERRUPTED` - execution began but completion was not established.

Do not normalize `INTERRUPTED` to `PENDING` or `COMPLETED` when that distinction
affects continuation safety.

## Next-action status

- `KNOWN`
- `UNRESOLVED`

Never fabricate a next action to make a handoff appear complete.
