# Security and Artifact Integrity

## Secret exclusion

Never intentionally reproduce:

- passwords;
- API keys;
- bearer/session tokens;
- private keys;
- database credentials;
- secret configuration values;
- authentication cookies;
- credential-equivalent material.

A handoff may say that a secret is required and identify a non-secret retrieval
procedure/location, but must omit the secret value itself.

## Artifact integrity

For material artifacts preserve:

- exact filename/path;
- hash when already part of the governed workflow;
- existence state;
- validation state;
- whether the next conversation must receive it.

Use these existence concepts as applicable:

- exists;
- missing;
- incomplete;
- unresolved.

Do not claim an artifact exists because chat says it was intended.
A failed or interrupted generation is not a completed artifact.
