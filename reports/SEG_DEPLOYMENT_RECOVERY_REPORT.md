# SEG Deployment Recovery Report

## Executive decision

> **NO-GO — deployment parity is not recovered.**

The local candidate passes type checking, production build, automated tests, and local runtime smoke. The published runtime is a different release artifact and does not contain the intended Laboratory route. The exact deployed commit cannot be proven from the published runtime or the GitHub deployment metadata available to this task. No source, deployment configuration, environment value, database schema, medical content, migration, or deployment was changed during this recovery investigation.

## 1. Confirmed deployment source and identity

| Item | Evidence | Result |
|---|---|---|
| Repository remote | `https://github.com/KISSCRISIS/manus.git` | Confirmed local `origin`. |
| Remote default branch | `main` | Confirmed through GitHub metadata. |
| Current local HEAD | `47f1fff5a1c82820cc772a10b162a5920f3a3333` | Confirmed; commit date `2026-08-21T16:36:18Z`. |
| GitHub main HEAD | `47f1fff5a1c82820cc772a10b162a5920f3a3333` | Matches local HEAD. |
| GitHub deployments | Zero records returned | No GitHub deployment record identifies the published site. |
| GitHub Actions | No workflow runs returned | No GitHub Actions build/deploy trigger is available as evidence. |
| Published URL | `https://seg-guide-bjjkqn7t.manus.space` | Confirmed from the existing project audit script and directly probed. |
| Published build identity | Not exposed | **UNVERIFIED**. |
| Published last-modified | `Sat, 15 Aug 2026 17:00:30 GMT` | Earlier than the current `main` commit. Strong evidence of a stale/different deployment, not proof of an exact source commit. |
| Published server surface | `x-powered-by: Express` on root; Cloudflare edge | Published runtime appears Express-backed, but it is not the current Express artifact. |
| Build trigger | Not observable | **UNVERIFIED**; no GitHub Actions/deployment record and no deployment control plane was available. |

## 2. Root cause

The primary root cause is **deployment drift from the current intended source**. The local working tree contains an authorized Laboratory route and Foundation files, while the remote `HEAD` commit does not contain the Laboratory route in `client/src/App.tsx`. The local build therefore includes `Laboratory Guide`, `DEMO_DATA_ONLY`, and `/laboratory` markers, whereas the downloaded published JavaScript contains none of those markers.

The published entry points to `/assets/index-QumL5cbf.js` and `/assets/index-DYmvRKgr.css`; the current local build points to `/assets/index-DEDnZyT2.js` and `/assets/index-_gIcw5uh.css`. The published files have different byte sizes and SHA-256 values. The published entry was last modified on 15 August, while the current remote `main` commit is dated 21 August. This is an artifact/source mismatch, not a hash-only CDN variation.

The published runtime is not conclusively static-only: `/api/trpc/auth.me` returns a tRPC JSON response and the root response includes `x-powered-by: Express`. However, it is clearly not the current server/client release because `/healthz` is absent, the published browser route resolves `/laboratory` to the deployed 404 surface, and the current Laboratory markers are absent from the deployed JavaScript.

## 3. Artifact parity results

| Resource or marker | Local candidate | Published runtime | Classification |
|---|---|---|---|
| JavaScript entry | `/assets/index-DEDnZyT2.js`, 468,166 bytes, SHA-256 `f2c69f223bb527e8d023f140515762f0e6c83a33c72b9ee8cced8b2274bc1c07` | `/assets/index-QumL5cbf.js`, 575,851 bytes, SHA-256 `ec3cec537a7108c3b0a2bdff11046708046c46b04c243f50adac46bde193fe24` | **DRIFT** |
| CSS entry | `/assets/index-_gIcw5uh.css`, 230,792 bytes, SHA-256 `b9cd5a7b097a118955c1d96f453de518d8e15c40a91d48a72cbcf2df155f075a` | `/assets/index-DYmvRKgr.css`, 221,202 bytes, SHA-256 `a9388162c963f6d972e4a64288abdc870080172d22ab6f9fff145682b48e93c8` | **DRIFT** |
| `Laboratory Guide` marker | Present once | Absent | **DRIFT** |
| `DEMO_DATA_ONLY` marker | Present once | Absent | **DRIFT** |
| `/laboratory` marker | Present twice | Absent | **DRIFT** |
| `/healthz` implementation | Current Express source defines `GET /healthz` with JSON 200 | Published `GET /healthz` returns HTML 404 | **DRIFT** |

Evidence package: `SEG_RELEASE_CLOSURE_DEPLOYMENT_EVIDENCE/README.md`, downloaded entry/resources, and the local final-validation record.

## 4. Runtime routing results

| Request/state | Result | Interpretation |
|---|---:|---|
| Local `/healthz` | 200 JSON | Current Express health contract is present locally. |
| Published `/healthz` | 404 HTML | Published runtime is not serving the current server contract. |
| Local `/laboratory` | 200 through the current SPA/Express candidate | Current working-tree route resolves locally. |
| Published HTTP `/laboratory` | 200 HTML shell | Express/edge serves an SPA shell, but this alone is not route proof. |
| Published browser `/laboratory` | 404 Page Not Found | Published client bundle does not define the intended route. |
| Published `/api/trpc` | 404 JSON “No procedure found on path” | tRPC boundary exists. |
| Published `/api/trpc/auth.me` | 200 JSON with `null` result in the unauthenticated probe | Published tRPC/auth surface exists, but this probe did not use the authenticated browser cookie. |
| Current `serveStatic` | Express serves `dist/public` and falls through to `index.html` | Current source routing is compatible with Wouter SPA paths when the correct build is deployed. |
| Current API handling | `/api` paths are handled before SPA fallback | Current source prevents API paths from falling through to HTML. |

The published 404 for `/laboratory` is therefore caused by the published client artifact lacking the route, not by a missing fallback in the current source. The published 404 for `/healthz` indicates a different/older server artifact or server configuration.

## 5. Environment and database findings

The current source requires `JWT_SECRET`, `VITE_APP_ID`, and `OAUTH_SERVER_URL` for production startup. The deployment contract also identifies `DATABASE_URL`, Forge URL/key, `PORT`, `HOST`, proxy, body/rate/timeout, CSP/HSTS, and observability settings. Real production values were not exposed or copied.

The local candidate was run with non-production QA placeholders and passed local checks. The published environment cannot be inspected from the public runtime without a deployment control-plane or operator evidence. No production database connection was opened or mutated. Consequently, **published environment parity and production database connectivity remain unverified**.

## 6. Fix applied

**No deployment fix was applied.** No safe deployment control plane, authenticated publish action, or GitHub deployment trigger was available in this task. The investigation did not create a commit, push, deployment, environment change, route change, database change, migration, seed, import, or medical-content change.

The correct fix path is a controlled redeploy of the intended release candidate, not a code workaround in the published runtime. The current working tree contains uncommitted route/Foundation and QA changes; the remote `main` commit does not contain those changes. Publishing only the current remote `main` would not publish Laboratory.

## 7. Exact redeploy recovery plan

1. Establish the release source allowlist before publication. If the intended candidate is the current working tree, the owner must separately approve how its uncommitted changes become the release source. The relevant source paths include `client/src/App.tsx`, `client/src/pages/LaboratoryPage.tsx`, `client/src/components/laboratory/`, `client/src/pages/Home.tsx`, `client/src/lib/seg-navigation.ts`, and the scoped Laboratory rules in `client/src/index.css`. Do not include `.manus-logs`, secrets, temporary QA artifacts, or unrelated governance files in a deployment package.
2. Use the current repository’s Docker/Node contract: Node 22, pnpm 10.4.1, `pnpm install --frozen-lockfile`, `pnpm check`, `pnpm build`, and `NODE_ENV=production HOST=0.0.0.0 PORT=$PORT pnpm start`. Deploy the Express service, not only `dist/public`, so `/healthz`, tRPC, CSP, rate limiting, and request logging remain available.
3. Inject deployment-owned environment values through the platform secret manager. At minimum, verify `JWT_SECRET`, `VITE_APP_ID`, `OAUTH_SERVER_URL`, and the production `DATABASE_URL`; also verify Forge configuration if the release uses managed assets. Never place secrets in source, package files, Dockerfile, Markdown, or `VITE_*` variables.
4. Record the deployment platform’s deployment ID, source repository, branch, exact commit or immutable build digest, trigger, start/end timestamps, Node/pnpm versions, and environment profile. The release cannot pass parity without this identity record.
5. Re-run post-deploy checks against the same URL: `/healthz` must return JSON 200; `/api/trpc/auth.me` must respond under the intended auth state; `/laboratory` must render Laboratory Guide rather than 404; entry JS/CSS hashes must match the release manifest; and CSP, Permissions-Policy, X-Content-Type-Options, and X-Request-Id must be present according to the deployment contract.
6. Repeat authenticated browser verification after the correct bundle is live. The current user-flow evidence cannot be promoted to PASS because the Laboratory step failed in the published runtime.

## 8. Verification summary

| Check | Result |
|---|---|
| Local `pnpm check` | **PASS** |
| Local `pnpm build` | **PASS** |
| Local `pnpm test` | **PASS** — 15 files passed, 1 external fixture suite skipped; 22 tests passed, 2 skipped |
| Local `git diff --check` | **PASS** |
| Published root | **200**, but entry hash/build identity differs |
| Published `/healthz` | **404 HTML — FAIL** |
| Published `/laboratory` browser flow | **404 — FAIL** |
| Published tRPC boundary | **Present**, but not current-release proof |
| Published environment variables | **UNVERIFIED** |
| Published database connectivity | **UNVERIFIED** |
| Exact deployed commit | **UNVERIFIED** |
| Deployment trigger/timestamp | **UNVERIFIED**, except HTTP `last-modified` evidence |

## 9. Final recommendation

**NO-GO.** The release cannot be accepted until the intended candidate is published with an immutable deployment identity, the published JS/CSS matches the release manifest, `/healthz` is restored, `/laboratory` renders the intended route, and environment/database checks are evidenced through the deployment control plane. No additional feature work is required to diagnose the current mismatch; the remaining action is controlled release-source selection and redeploy verification.

## References

[1]: `SEG_RELEASE_CLOSURE_DEPLOYMENT_EVIDENCE/README.md` "Local versus published entry/resource response and hash probe"
[2]: `SEG_RELEASE_CLOSURE_AUTHENTICATED_BROWSER_EVIDENCE.md` "Authenticated Dashboard/References flow and published Laboratory 404"
[3]: `SEG_RELEASE_CLOSURE_LOCAL_FINAL_VALIDATION.md` "Local final check/build/test/diff evidence"
[4]: `server/_core/index.ts` "Current Express health, tRPC, API, and static-serving order"
[5]: `server/_core/vite.ts` "Current production static-serving and SPA fallback implementation"
[6]: `server/_core/env.ts` "Current production environment requirements"
[7]: `Dockerfile` "Current Node/pnpm production build and start contract"
[8]: `SEG_PROJECT_CONTINUITY_PACKAGE/05_RECOVERY_AND_TRANSFER/DEPLOYMENT.md` "SEG deployment contract and post-deploy checks"
[9]: `client/src/App.tsx` "Working-tree Wouter route containing the Laboratory path"
