# SEG Change Control Rules

## Authorization classes

| Class | Meaning | Allowed action |
|---|---|---|
| READ_ONLY | Inspection or evidence gathering | No code, asset, route, database, authentication, or content changes. |
| EXECUTE_APPROVED | Explicitly approved narrow scope | Implement only the named scope, test, report, and checkpoint. |
| BLOCKED | Missing authority, source, access, or required evidence | Do not invent a substitute; record the blocker and request the smallest safe next decision. |

## Required sequence

1. Record the requested scope and add one unchecked item to `todo.md`.
2. Read the relevant authority, project memory, and current implementation.
3. Create a backup or a new branch/package before changing files.
4. Make the smallest reversible change.
5. Run focused tests, TypeScript checking, and production build as applicable.
6. Perform visual or browser verification when UI changes are involved.
7. Record evidence, risk, current state, and next step.
8. Mark the task complete only after the evidence exists and create a checkpoint.

## No-loss transfer rules

The source archive and the organized project must never be overwritten in place during transfer. Preserve original archives, generated delivery packages, formal reports, and source registries. Exclude only verified disposable items such as `node_modules`, `.git`, `.env`, secrets, and local logs; record each exclusion in the transfer README.

## Visual freeze rules

Do not reopen accepted visual work, swap approved assets, add routes, alter the Dashboard architecture, or add content structures merely to satisfy a new checklist. A verified blocker must identify the exact source, scope, and evidence before the freeze is revisited.

## Medical-content rules

Do not write, rewrite, validate, summarize, or activate medical claims, articles, chapters, references, dosage information, or datasets without a governed source package and explicit content authorization. The empty Journal state is a valid controlled outcome.

## Deployment rules

The Phase 3 package must be deployed as Node/Express or Docker if server-side security controls are required. A static-only upload cannot activate `/healthz`, CSP middleware, request IDs, rate limiting, or structured server logs.
