# SEG Release Deployment Alignment Report

## Final status

> **`RELEASE_BLOCKED`**

The validated local release candidate was successfully rebuilt and packaged, but the published runtime was not updated. No matching enabled deployment integration or observable deployment trigger is available for the `manus.space` target, and the intended release commit has not been established as an immutable Git commit. The published runtime therefore remains the previously detected stale artifact.

No architecture, database schema, migration, seed, import, medical content, authentication model, or feature was changed in this alignment run. No commit or push was performed.

## 1. Release source confirmation

| Field | Confirmed value | Status |
|---|---|---|
| Repository | `https://github.com/KISSCRISIS/manus.git` | Confirmed |
| Branch | `main` | Confirmed |
| Base HEAD | `47f1fff5a1c82820cc772a10b162a5920f3a3333` | Confirmed |
| Base HEAD date | `2026-08-21T16:36:18Z` | Confirmed |
| Intended release source | Validated local working tree at artifact-build time | Confirmed as local source |
| Intended immutable release commit | Not established; current Laboratory/QA source changes are outside base HEAD | **OPEN** |
| Published target | `https://seg-guide-bjjkqn7t.manus.space` | Confirmed |
| Published commit | Not exposed by runtime; GitHub deployment records are empty | **UNVERIFIED** |

The current working tree contains the authorized Laboratory route/Foundation and associated QA changes that are not present in base HEAD. In particular, `client/src/App.tsx` contains the Laboratory route in the working tree, while `git show HEAD:client/src/App.tsx` contains no Laboratory route marker. Publishing base HEAD alone would not align the deployed Laboratory flow.

## 2. Deployment configuration review

| Configuration | Local contract | Finding |
|---|---|---|
| Build command | `pnpm check && pnpm build` in the validation sequence; Dockerfile runs both | Validated locally |
| Client output | `dist/public` | Present in artifact |
| Server output | `dist/index.js` | Present in artifact |
| Runtime | Node 22, pnpm 10.4.1, `NODE_ENV=production`, `HOST=0.0.0.0`, `PORT=3000` | Defined by Dockerfile |
| Start command | `pnpm start` → `NODE_ENV=production node dist/index.js` | Defined |
| Deployment branch | `main` is the repository default/current branch | Confirmed locally/GitHub |
| Required production variables | `JWT_SECRET`, `VITE_APP_ID`, `OAUTH_SERVER_URL`; `DATABASE_URL` required for database-backed behavior | Names confirmed; values not exposed |
| Deployment trigger | No GitHub Actions runs, no GitHub deployment records, no project deploy script | **UNVERIFIED/UNAVAILABLE** |
| Enabled deployment connector | No enabled Vercel/Netlify/deployment connector matches the `manus.space` target | **Unavailable for this task** |

No secret value is included in this report or artifact. No environment value was copied from the current process into source or documentation.

## 3. Local release artifact

The artifact was built from the validated local working tree after `pnpm check` and `pnpm build` completed successfully. The generated client and server artifacts were checked for presence, hashes, route markers, and forbidden paths.

| Artifact item | Identity |
|---|---|
| Archive | `/home/ubuntu/seg-internship-output/SEG_RELEASE_CANDIDATE_ARTIFACT.zip` |
| Archive SHA-256 | `674911a59d3ff1aa671bd7cda8ff6d7f518f770e19b59bf187a3ffbc3d2f3e47` |
| Entry HTML | `dist/public/index.html`, 368,229 bytes, SHA-256 `51b2f1b9281b76558d518268a37c56e58770d8afc4b9b9ba645bab0caa31b318` |
| Server bundle | `dist/index.js`, 41,671 bytes, SHA-256 `9f907870b2273ce35c8c5b2065188a01d3e6e1315ad21ffadf6993a43add01c5` |
| Client JS | `/assets/index-DEDnZyT2.js`, present, 468,166 bytes, SHA-256 `f2c69f223bb527e8d023f140515762f0e6c83a33c72b9ee8cced8b2274bc1c07` |
| Client CSS | `/assets/index-_gIcw5uh.css`, present, 230,792 bytes, SHA-256 `b9cd5a7b097a118955c1d96f453de518d8e15c40a91d48a72cbcf2df155f075a` |
| Laboratory marker | `/laboratory` present in client bundle | Pass |
| Demo marker | `DEMO_DATA_ONLY` present in client bundle | Pass |
| Server health marker | `healthz` present in server bundle | Pass |
| Server tRPC marker | `api/trpc` present in server bundle | Pass |
| Forbidden archive paths | `.env`, `.manus-logs`, migrations, seeds, Prisma, SQL absent | Pass |

The artifact manifest is provided separately as `SEG_RELEASE_CANDIDATE_ARTIFACT_MANIFEST.md`. The artifact is a delivery package for an operator-controlled deployment; it is not proof of publication.

## 4. Published-versus-local verification

| Check | Local candidate | Published target | Result |
|---|---|---|---|
| Client JS | `index-DEDnZyT2.js`, 468,166 bytes | `index-QumL5cbf.js`, 575,851 bytes | **Mismatch** |
| Client CSS | `index-_gIcw5uh.css`, 230,792 bytes | `index-DYmvRKgr.css`, 221,202 bytes | **Mismatch** |
| `Laboratory Guide` marker | Present | Absent | **Mismatch** |
| `DEMO_DATA_ONLY` marker | Present | Absent | **Mismatch** |
| Published `/healthz` | Current source expects JSON 200 | HTTP 404 HTML | **Mismatch** |
| Published `/laboratory` | Current source route exists | Browser resolves to 404 | **Mismatch** |
| Published `/api/trpc/auth.me` | Current server boundary | HTTP 200 JSON on unauthenticated probe | Boundary present, release identity unproven |
| Published last-modified | Not applicable | `Sat, 15 Aug 2026 17:00:30 GMT` | Older than current source commit |

## 5. Why redeploy was not executed

The target URL is a managed `manus.space` deployment, while the repository exposes no deploy script, GitHub Actions workflow, or GitHub deployment record. The available Vercel and Netlify connectors are disabled and do not identify the `manus.space` target. Enabling or configuring a connector would require a separate integration decision and, where applicable, user credentials and review. Guessing a deployment provider or submitting the artifact to an unknown target would not be a safe release action.

The current artifact also comes from a working tree whose intended changes are not represented by an immutable release commit. A controlled release cannot be marked aligned until the owner chooses an approved release-source mechanism: an approved commit, a reviewed archive deployment, or the correct managed WebDev deployment control plane.

## 6. Exact redeploy instructions

1. Select the approved release source. If the current Laboratory/QA working tree is intended, establish an owner-approved immutable release commit or equivalent deployment snapshot. Do not include `.env*`, `.manus-logs`, temporary QA screenshots, raw medical sources, migrations, seeds, SQL, or unrelated governance artifacts.
2. Use the artifact manifest and SHA-256 archive digest as the release identity. Verify that the deployment platform consumes the Express image/runtime, not only the static `dist/public` directory.
3. Configure Node 22 and pnpm 10.4.1, run `pnpm install --frozen-lockfile`, then `pnpm check`, `pnpm build`, and `NODE_ENV=production HOST=0.0.0.0 PORT=$PORT pnpm start` under the platform’s managed runtime.
4. Inject production environment variables through the platform secret manager. Verify `JWT_SECRET`, `VITE_APP_ID`, `OAUTH_SERVER_URL`, and `DATABASE_URL` without placing their values in source or the artifact. Do not run migrations.
5. Record deployment ID, immutable source commit/digest, repository, branch, trigger, build/start timestamps, Node/pnpm versions, and environment profile.
6. Post-deploy, verify `/` and entry asset hashes, `/healthz` JSON 200, `/api/trpc/auth.me` under the intended auth state, `/dashboard` after Login, References/Atlas navigation, and `/laboratory` rendering the Laboratory Foundation rather than 404.
7. Repeat the authenticated browser flow and close parity only when the published JS/CSS hashes and route behavior match the recorded candidate.

## 7. Validation results

| Validation | Result |
|---|---|
| `pnpm check` | **PASS** |
| `pnpm build` | **PASS** |
| Generated client assets | **PASS** |
| Generated server bundle | **PASS** |
| Local Laboratory route marker | **PASS** |
| Local health/tRPC bundle markers | **PASS** |
| Archive forbidden-path scan | **PASS** |
| Published artifact hash parity | **FAIL** |
| Published `/healthz` | **FAIL — 404** |
| Published `/laboratory` | **FAIL — browser 404** |
| Deployment identity | **FAIL — not exposed** |
| Redeploy execution | **NOT EXECUTED — no matching integration/control plane** |

## Final recommendation

**`RELEASE_BLOCKED`**. The local release artifact is prepared and validated, but the published runtime is not aligned. The exact next action is controlled source selection followed by operator-authorized redeploy and post-deployment parity verification. No code workaround, database change, migration, or feature addition is needed to diagnose the mismatch.

## References

[1]: `SEG_RELEASE_CLOSURE_DEPLOYMENT_EVIDENCE/README.md` "Previous local-versus-published response and hash probe"
[2]: `SEG_RELEASE_CLOSURE_AUTHENTICATED_BROWSER_EVIDENCE.md` "Authenticated published flow and Laboratory 404 evidence"
[3]: `SEG_RELEASE_DEPLOYMENT_ALIGNMENT_ARTIFACT_EVIDENCE.md` "Validated local production artifact evidence"
[4]: `SEG_RELEASE_CANDIDATE_ARTIFACT_MANIFEST.md` "Release artifact manifest and exclusion rules"
[5]: `Dockerfile` "Node 22/pnpm build and Express runtime contract"
[6]: `server/_core/index.ts` "Current Express health, tRPC, API boundary, and server startup contract"
[7]: `server/_core/vite.ts` "Current production static-serving and SPA fallback contract"
[8]: `server/_core/env.ts` "Current production environment variable contract"
[9]: `client/src/App.tsx` "Current working-tree Wouter Laboratory route"
[10]: `git show HEAD:client/src/App.tsx` "Base HEAD route state without Laboratory route"
