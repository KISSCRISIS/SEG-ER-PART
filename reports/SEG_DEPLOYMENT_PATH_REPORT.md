# SEG Deployment Path Report

## Final status

> **`DEPLOYMENT_TARGET_UNKNOWN`**

The public target URL is known, and its runtime characteristics are observable, but the authoritative deployment owner, trigger mechanism, exact deployed commit, and deployment control plane are not provable from the repository or the available integrations. The target must not be redeployed by guessing a provider or by enabling an unrelated connector.

This report is read-only. No source, database, schema, environment value, deployment configuration, commit, push, or published runtime was changed.

## 1. Current published target

| Item | Evidence | Status |
|---|---|---|
| Public application URL | `https://seg-guide-bjjkqn7t.manus.space` | Confirmed |
| Domain/platform indication | `manus.space` target, existing project code references WebDev runtime services, and the response carries Cloudflare edge headers | **Manus-hosted WebDev target is the leading identification; deployment ownership is not independently proven** |
| Edge observed | `server: cloudflare` | Confirmed for the public edge, not proof of the deployment control plane |
| Application runtime observed | Root response includes `x-powered-by: Express`; `/api/trpc/auth.me` returns JSON | Express/tRPC runtime surface observed |
| Current published build age signal | `last-modified: Sat, 15 Aug 2026 17:00:30 GMT` | Confirmed header; not a commit identity |
| Published commit | Not exposed in HTML, headers, API response, or GitHub deployment records | **Unknown** |
| Deployment ID | Not exposed | **Unknown** |

The public hostname identifies a reachable Manus-style target, but it does not establish which SEG project, release record, source snapshot, or deployment owner produced the current artifact.

## 2. Repository and branch evidence

| Item | Value | Status |
|---|---|---|
| Repository | `https://github.com/KISSCRISIS/manus.git` | Confirmed from local `origin` |
| Branch | `main` | Confirmed locally and as GitHub default branch |
| Current local/base HEAD | `47f1fff5a1c82820cc772a10b162a5920f3a3333` | Confirmed |
| HEAD commit date | `2026-08-21T16:36:18Z` | Confirmed |
| GitHub `main` HEAD | `47f1fff5a1c82820cc772a10b162a5920f3a3333` | Matches local base HEAD |
| GitHub deployment records | None returned | No GitHub deployment trigger/evidence |
| GitHub Actions workflow runs | None returned | No GitHub Actions trigger/evidence |
| CI/hosting files | Only `Dockerfile` found; no `.github/workflows`, Vercel, Netlify, Render, Railway, Fly, or Compose deployment file found | No repository-defined deployment path |
| Package deploy script | No `deploy` or `publish` script; scripts are `dev`, `build`, `start`, `check`, `format`, `test`, `audit:final-package`, and `db:push` | No package-defined deployment trigger |

The base HEAD does not contain the working-tree Laboratory route. The validated local candidate was built from the working tree, not from an immutable commit containing all intended route/Foundation changes. Therefore, `main` HEAD cannot be assumed to be the intended release source for Laboratory.

## 3. Deployment configuration currently available

The repository has a valid container/runtime contract but no provider-specific deployment contract.

| Setting | Repository contract |
|---|---|
| Base image | Node 22 Bookworm slim |
| Package manager | Corepack with pnpm 10.4.1 |
| Install | `pnpm install --frozen-lockfile` |
| Validation/build | `pnpm check && pnpm build` |
| Client output | `dist/public` |
| Server output | `dist/index.js` |
| Runtime host | `0.0.0.0` |
| Runtime port | `3000` in the Dockerfile, with platform `PORT` expected where applicable |
| Start command | `pnpm start` → `NODE_ENV=production node dist/index.js` |
| Required production variable names | `JWT_SECRET`, `VITE_APP_ID`, `OAUTH_SERVER_URL`; `DATABASE_URL` for database-backed operation |
| Additional operational variables | `SERVICE_NAME`, `OWNER_OPEN_ID`, Forge URL/key where used, proxy/body/rate/timeout/CSP/HSTS controls |

The Dockerfile is a deployable runtime descriptor, not evidence that any provider is connected to it. No secret values are reproduced here.

## 4. Integration availability

The session configuration contains disabled Vercel and Netlify connectors, while no enabled connector identifies the `manus.space` application deployment target. My Browser is enabled, but it is an authenticated browser session, not a deployment control plane. Enabling an unrelated provider connector would create a new integration path and would not safely recover the current published application.

Accordingly, no redeploy was executed. The correct next step is to identify the SEG WebDev project’s managed deployment control plane or have the deployment owner provide the provider/project identifier and authorized trigger.

## 5. Published runtime mismatch evidence

| Check | Published result | Consequence |
|---|---|---|
| `/` | HTTP 200 HTML | Public shell is reachable |
| `/healthz` | HTTP 404 HTML | Current server health contract is not deployed |
| `/api/trpc` | HTTP 404 JSON for empty procedure path | A tRPC boundary exists |
| `/api/trpc/auth.me` | HTTP 200 JSON with `null` in an unauthenticated probe | Some tRPC/auth surface exists; not a release identity proof |
| `/laboratory` HTTP | HTTP 200 HTML shell | SPA fallback/edge shell exists |
| `/laboratory` browser | Application 404 Page Not Found | Published client bundle lacks the intended route |
| Published JS | `index-QumL5cbf.js`, 575,851 bytes | Differs from local candidate |
| Published CSS | `index-DYmvRKgr.css`, 221,202 bytes | Differs from local candidate |
| Laboratory markers | `Laboratory Guide`, `DEMO_DATA_ONLY`, and `/laboratory` absent from downloaded published JS | Published bundle is not the validated local candidate |

The leading root-cause classification remains **stale or alternate artifact deployed to the managed target**. The exact source commit cannot be derived from the bundle hash alone.

## 6. Validated local artifact available for deployment owner

The validated local candidate has been rebuilt and packaged outside the repository:

| Artifact | Value |
|---|---|
| Archive | `/home/ubuntu/seg-internship-output/SEG_RELEASE_CANDIDATE_ARTIFACT.zip` |
| Archive SHA-256 | `674911a59d3ff1aa671bd7cda8ff6d7f518f770e19b59bf187a3ffbc3d2f3e47` |
| Artifact source | Validated local working tree at capture time |
| Client marker | `/laboratory` and `DEMO_DATA_ONLY` present |
| Server markers | `healthz` and `api/trpc` present in the generated server bundle |
| Local checks | `pnpm check` and `pnpm build` pass; prior QA recorded `pnpm test` pass |
| Exclusions | No `.env`, secrets, `.manus-logs`, migrations, seeds, Prisma, or SQL in the archive |

The archive is not an immutable release until the owner selects an approved release-source mechanism. It must not be uploaded to an unknown provider.

## 7. Exact steps required for the first valid deployment

1. **Identify the deployment owner and project.** Open the SEG project’s managed WebDev/deployment control plane associated with `seg-guide-bjjkqn7t.manus.space`, or obtain from the owner the provider name, project ID, deployment ID, and authorized deployment trigger. The public URL alone is insufficient.
2. **Select an immutable source.** Choose either an approved commit that contains the validated Laboratory/QA changes or an owner-approved artifact snapshot. Do not publish base `main` HEAD if the intended route/Foundation is only present in the working tree.
3. **Confirm the build contract.** Configure Node 22, pnpm 10.4.1, frozen-lockfile installation, `pnpm check`, `pnpm build`, and the Express start command described above. Deploy the server runtime together with `dist/public`; do not publish only a stale static directory.
4. **Configure environment variables through the platform secret manager.** Verify the names required by `server/_core/env.ts`, especially `JWT_SECRET`, `VITE_APP_ID`, `OAUTH_SERVER_URL`, and `DATABASE_URL`, without placing values in source, the archive, or logs. Do not run migrations.
5. **Create a deployment identity record.** Record provider/project, deployment ID, repository, branch, exact commit or artifact digest, trigger, build/start timestamps, Node/pnpm versions, and environment profile.
6. **Run post-deployment checks.** Verify `/` and exact JS/CSS hashes, `/healthz` JSON 200, `/api/trpc/auth.me` under the intended auth state, Login → Dashboard → References, and `/laboratory` rendering the Laboratory Foundation rather than 404.
7. **Close deployment parity only after evidence matches.** The status may change to `DEPLOYMENT_TARGET_IDENTIFIED` only when the provider/control plane, trigger, and deployed source identity are all recorded. The release remains blocked until the published artifact matches the validated candidate.

## 8. Final classification

| Required information | Classification |
|---|---|
| Current public target | Known: `seg-guide-bjjkqn7t.manus.space` |
| Likely hosting family | Manus-hosted WebDev target, inferred but not control-plane verified |
| Authoritative provider/project owner | Unknown |
| Deployment trigger | Unknown |
| Connected repository/branch | Repository `KISSCRISIS/manus`, branch `main` is known; connection to published target is unproven |
| Last deployed commit | Unknown; only an older `last-modified` timestamp is observed |
| Required action | Obtain the managed deployment control plane or owner-authorized provider/project details, select immutable validated source, deploy, and perform parity checks |

## Final status

**`DEPLOYMENT_TARGET_UNKNOWN`**

The target URL is identified, but the actual authoritative deployment path is not. No deploy should occur until the deployment owner or control plane supplies the missing provider/project, trigger, and immutable source identity.

## References

[1]: `SEG_RELEASE_DEPLOYMENT_ALIGNMENT_REPORT.md` "Prior deployment alignment investigation and artifact mismatch evidence"
[2]: `SEG_RELEASE_CLOSURE_DEPLOYMENT_EVIDENCE/README.md` "Published response statuses, headers, and local/published resource hashes"
[3]: `SEG_RELEASE_DEPLOYMENT_ALIGNMENT_ARTIFACT_EVIDENCE.md` "Validated local production artifact markers and hashes"
[4]: `Dockerfile` "Current Node 22/pnpm/Express runtime contract"
[5]: `package.json` "Current build, start, check, test, and database scripts"
[6]: `server/_core/index.ts` "Current Express health, tRPC, API boundary, and static serving order"
[7]: `server/_core/env.ts` "Current production environment variable requirements"
[8]: `server/_core/vite.ts` "Current production static serving and SPA fallback"
[9]: `SEG_RELEASE_CANDIDATE_ARTIFACT_MANIFEST.md` "Validated local release artifact manifest and exclusions"
