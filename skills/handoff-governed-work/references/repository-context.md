# Repository Context Guidance

Use the repository's existing deterministic context resolver when available:

```bash
python3 scripts/platform/repository_context.py
```

For structured output when supported:

```bash
python3 scripts/platform/repository_context.py --format json
```

Resolve each materially relevant repository independently.

Preserve, when available:

- repository name and root;
- branch;
- HEAD;
- upstream;
- ahead;
- behind;
- synchronization state;
- staged changes;
- unstaged changes;
- untracked files;
- clean/dirty state;
- current Operating Plan fields;
- materially relevant governance proposal status;
- resolver warnings.

Null/unresolved values remain unresolved.

If deterministic output disagrees with a governing proposal document, surface
the conflict and inspect the proposal document before asserting status.

Do not create a second Git/governance parser merely for handoff orchestration.
Any future multi-repository orchestration should consume repository-specific
resolver output.
