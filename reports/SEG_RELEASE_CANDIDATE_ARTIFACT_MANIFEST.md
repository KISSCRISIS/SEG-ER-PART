# SEG Validated Local Release Candidate Artifact Manifest

## Identity

| Field | Value |
|---|---|
| Repository | `https://github.com/KISSCRISIS/manus.git` |
| Branch | `main` |
| Base HEAD | `47f1fff5a1c82820cc772a10b162a5920f3a3333` |
| Artifact source | Current validated local working tree at capture time |
| Artifact status | `LOCAL_CANDIDATE_NOT_PUBLISHED` |
| Captured at UTC | `2026-08-22T21:12:45Z` |

## Validation

The local candidate passed `pnpm check` and `pnpm build`. The prior validated QA run also recorded `pnpm test` and `git diff --check` as passing. The build generated `dist/public` and `dist/index.js`.

## Included paths

The release artifact contains only the generated production bundle and the minimum build/runtime descriptors required for an operator-controlled deployment:

- `dist/public/**`
- `dist/index.js`
- `Dockerfile`
- `package.json`
- `pnpm-lock.yaml`

No `.env` files, secret values, `.manus-logs`, source registries, raw medical sources, migrations, seeds, or database exports are included.

## Required route markers

The local client bundle contains `/laboratory` and `DEMO_DATA_ONLY`. The local server bundle contains `healthz` and `api/trpc` route markers. These are artifact markers, not a substitute for post-deployment HTTP/browser verification.

## Release warning

This artifact was produced from the validated local working tree. The working tree contains changes not present in the base HEAD commit, including the Laboratory route/Foundation. Therefore, the artifact is not an immutable Git release until the owner establishes an approved release commit or deployment source. Do not publish it through an unapproved or unknown deployment target.

## Post-deployment acceptance gate

A deployment may only be marked aligned after recording the deployment ID, source commit or immutable digest, trigger, timestamp, environment profile, and successful checks for `/`, Login, Dashboard, References, Laboratory Guide, `/healthz`, and core tRPC routes. The published site currently fails these parity checks.
