# SEG Phase 1 — Auth and Runtime Audit Verification

## 1. Scope and mode

This was a controlled read-only audit of the current SEG source tree. No application code, authentication logic, database schema, medical content, assets, or deployment configuration was modified. The audit examined the requested files and the minimum adjacent files required to understand their runtime wiring.

Primary files reviewed:

- `client/src/_core/hooks/useAuth.ts`
- `server/db.ts`
- `server/_core/cookies.ts`
- `server/_core/env.ts`
- `client/src/App.tsx`
- `client/src/lib/trpc.ts`
- `server/_core/trpc.ts`
- `server/_core/oauth.ts`

Supporting files reviewed for cross-file interpretation:

- `server/routers.ts`
- `server/_core/context.ts`
- `server/_core/sdk.ts`
- `server/_core/index.ts`
- `shared/const.ts`
- `client/src/const.ts`
- `client/src/lib/seg-navigation.ts`
- `client/src/components/DashboardLayout.tsx`
- `client/src/pages/DashboardPage.tsx`
- `client/src/main.tsx`

## 2. Source identity and validation evidence

| Item | Result |
|---|---|
| Canonical audit root | `/home/ubuntu/seg-official-source.1Ei3GF/repository` |
| Branch | `main` |
| HEAD before report creation | `4f369733e8e4daeff46285f80fcf4dfc51d566db` |
| Tracked files before report creation | 1,592 |
| Worktree before report creation | Clean |
| Type-check | PASS (`pnpm check`) |
| Tests | PASS — 22 passed, 2 skipped |
| Local public route probes | `/healthz`, `/login`, `/dashboard`, `/laboratory` returned HTTP 200 on the already-running local runtime; `/api/oauth/callback` returned HTTP 400 for the intentionally incomplete request |
| Runtime authentication | NOT VERIFIED; the local runtime did not have the required OAuth/DB secrets available |

The report itself is the only new file created by this audit. It is an evidence artifact, not an application change.

## 3. Executive result

The inspected source contains the expected Manus OAuth, JWT session, Drizzle database adapter, Express route mounting, and tRPC type boundary. The state/nonce check is present, session cookies are configured with `httpOnly`, and protected/admin tRPC middleware exists.

The audit does not support a full authenticated-production PASS. The principal release blocker remains runtime configuration and end-to-end OAuth evidence. In addition, the static review identified several hardening and configuration-readiness gaps that should be resolved or explicitly accepted before production acceptance.

**Overall Phase 1 result: `PASS WITH BLOCKERS — CODE WIRING PRESENT, AUTHENTICATED RUNTIME NOT PROVEN`.**

## 4. Findings by severity

### 4.1 High-priority findings

| ID | Area | Finding | Evidence | Impact | Status |
|---|---|---|---|---|---|
| H-01 | Production environment | `assertProductionEnvironment()` validates only `JWT_SECRET`, `VITE_APP_ID`, and `OAUTH_SERVER_URL`. It does not require `DATABASE_URL`, Forge variables, or `OWNER_OPEN_ID`. | `server/_core/env.ts:46-56` | Production can pass the startup gate while DB-backed user persistence and authenticated session resolution remain unavailable. Forge-backed features can also fail after startup. | Confirmed static gap |
| H-02 | Local OAuth launch | `startLogin()` uses `VITE_OAUTH_PORTAL_URL` and `VITE_APP_ID` without a client-side presence/format guard. | `client/src/const.ts:15-30` | A missing or malformed local portal URL can cause an `Invalid URL` runtime failure when the user clicks Login instead of a clear configuration message. | Confirmed static gap; runtime failure not re-executed with a missing variable |
| H-03 | Local HTTP cookie compatibility | The session cookie uses `SameSite=None` while `secure` is false for local HTTP requests. Browsers commonly reject `SameSite=None` cookies without `Secure`; this local behavior is not proven by the current evidence. | `server/_core/cookies.ts:42-55` | OAuth may complete but the session cookie may not persist on `http://localhost` or `http://127.0.0.1`, preventing Dashboard authentication. | High-risk unverified compatibility gap |
| H-04 | Session audience binding | `verifySession()` validates the JWT signature and required non-empty fields but does not compare the token `appId` with `ENV.appId`. | `server/_core/sdk.ts:199-231` | If the same `JWT_SECRET` is ever reused across applications, a valid token with a different non-empty app identifier could be accepted. The risk is conditional on secret reuse. | Confirmed hardening gap |

### 4.2 Medium-priority findings

| ID | Area | Finding | Evidence | Impact | Status |
|---|---|---|---|---|---|
| M-01 | Database availability | `getDb()` returns `null` when `DATABASE_URL` is absent, and `upsertUser()` logs and returns without persisting. | `server/db.ts:6-19`, `21-30` | The application can appear started while authentication cannot resolve a DB-backed user. This is consistent with the production-env validation gap. | Confirmed behavior |
| M-02 | Auth error observability | `createContext()` catches every authentication error and converts it to `user = null` without logging the reason. | `server/_core/context.ts:11-27` | OAuth, JWT, and DB failures are presented to tRPC as anonymous access, reducing diagnostic precision and potentially masking an operational outage. | Confirmed behavior |
| M-03 | Browser storage side effect | `useAuth()` writes serialized user data to `localStorage` inside `useMemo()` and does not guard that write. | `client/src/_core/hooks/useAuth.ts:53-71` | Render-time storage failure can affect auth UI rendering. The browser stores user profile data locally, including fields returned by `auth.me`; privacy and retention expectations should be explicit. | Confirmed code-quality/privacy concern |
| M-04 | Route enforcement model | `/dashboard` is a client route that renders before `auth.me` resolves; the effective auth boundary is `DashboardLayout`, not the Wouter route table. `routeRequiresAuth()` is not the enforcement mechanism in the inspected route flow. | `client/src/App.tsx:14-24`, `client/src/components/DashboardLayout.tsx:14-42`, `client/src/lib/seg-navigation.ts:9-11` | Direct navigation to `/dashboard` exposes a loading or sign-in shell before protected content is rendered. This is acceptable only if intentional and covered by runtime tests. | Confirmed design/architecture behavior |
| M-05 | API procedure coverage | `auth.me` and `auth.logout` are intentionally `publicProcedure`; no feature router is currently registered in `server/routers.ts` beyond `system` and `auth`. | `server/routers.ts:6-26` | The tRPC middleware supports protected/admin procedures, but the currently registered application feature surface does not demonstrate their use. | Confirmed current scope |

### 4.3 Low-priority findings

| ID | Area | Finding | Evidence | Impact | Status |
|---|---|---|---|---|---|
| L-01 | Cookie proxy configuration | `cookies.ts` treats any `x-forwarded-proto` value of `https` as secure. Correctness depends on the deployment proxy and `TRUST_PROXY` configuration being controlled. | `server/_core/cookies.ts:11-22`, `server/_core/index.ts:42-45` | Misconfigured proxy headers can produce inconsistent cookie flags. This does not by itself bypass authentication. | Configuration-dependent |
| L-02 | Secret strength validation | Production checks only whether `JWT_SECRET` is non-empty; length and entropy are not validated. | `server/_core/env.ts:46-55` | Weak operator-supplied secrets would be accepted. Secret policy remains external to this source check. | Confirmed hardening gap |
| L-03 | Logout error semantics | `useAuth().logout()` treats an `UNAUTHORIZED` response as successful, then invalidates the client query. Other errors are rethrown. | `client/src/_core/hooks/useAuth.ts:30-51` | This is generally reasonable for idempotent logout, but error UX should be verified in the browser. | Confirmed behavior; UX unverified |

## 5. Positive controls verified

The following controls are present in the inspected source:

1. The OAuth callback requires both `code` and `state`, returning HTTP 400 when either is absent (`server/_core/oauth.ts:13-21`).
2. The callback decodes the state and compares its nonce with the one-time `__Host-oauth_state` cookie before code exchange (`server/_core/oauth.ts:23-31`).
3. The state cookie is cleared before completing the exchange, limiting reuse (`server/_core/oauth.ts:32`).
4. The server creates a session JWT only after user information is returned and an `openId` is present (`server/_core/oauth.ts:34-57`).
5. Session cookies are `httpOnly` and path-scoped to `/` (`server/_core/cookies.ts:46-55`).
6. JWT verification restricts the algorithm to HS256 and rejects missing required payload fields (`server/_core/sdk.ts:207-231`).
7. tRPC provides explicit `protectedProcedure` and `adminProcedure` middleware with `UNAUTHORIZED` and `FORBIDDEN` outcomes (`server/_core/trpc.ts:13-45`).
8. Express mounts the OAuth callback, tRPC middleware, API fallthrough, and the unauthenticated `/healthz` endpoint explicitly (`server/_core/index.ts:78-113`).
9. The SPA route table is limited to the currently defined public, dashboard, and laboratory routes. The additional dashboard areas are anchors within `/dashboard`, not separate top-level routes (`client/src/App.tsx:14-24`, `client/src/components/DashboardLayout.tsx:12-42`).
10. The client tRPC binding imports the server `AppRouter` type, preserving compile-time contract alignment (`client/src/lib/trpc.ts:1-4`).

## 6. Environment contract status

The template contains the expected names, including `VITE_OAUTH_PORTAL_URL`. No `.env` file was read or created during this audit, and no secret value was displayed.

| Variable group | Source consumer | Static status | Runtime proof |
|---|---|---|---|
| `VITE_APP_ID` | Client OAuth URL and server session payload | Referenced | Not proven in local runtime |
| `VITE_OAUTH_PORTAL_URL` | Client OAuth portal URL | Referenced and documented in `.env.example` | Not proven in local runtime |
| `OAUTH_SERVER_URL` | Server OAuth HTTP client | Referenced and startup-checked | Missing from the previously observed local process |
| `JWT_SECRET` | JWT signing and verification | Referenced and startup-checked | Missing from the previously observed local process |
| `DATABASE_URL` | Drizzle initialization and user persistence | Referenced but not startup-checked | Not proven in local runtime |
| `BUILT_IN_FORGE_API_URL` / `BUILT_IN_FORGE_API_KEY` | Storage and other Forge-backed integrations | Referenced by feature modules but not startup-checked | Not proven in local runtime |
| `OWNER_OPEN_ID` | Owner-to-admin role assignment | Referenced but not startup-checked | Not proven in local runtime |

## 7. Required next gate

The next allowed phase is not a code or schema change. It is a controlled runtime verification after the official WebDev environment is accessible and the existing secrets are injected through the approved runtime source.

Required evidence for closure:

1. Production/preview startup with all required environment names bound, without exposing values.
2. `/healthz` returning JSON HTTP 200 from the official runtime.
3. A real Login action opening the configured OAuth portal.
4. A real callback returning to the exact registered origin and `/api/oauth/callback`.
5. A persisted authenticated session reaching `/dashboard`.
6. A protected `auth.me` response backed by the existing database.
7. A clean logout clearing the session and returning to an unauthenticated state.
8. Confirmation that `/laboratory` remains available without altering medical content or schema.

## 8. Protected-boundary confirmation

No database migration, schema change, content import, medical-content activation, OAuth bypass, mock authentication, UI redesign, asset replacement, deployment, commit, or push was performed by this audit. The only file created is this report.

## 9. Final decision

> **PHASE 1 AUDIT STATUS: PASS WITH BLOCKERS**
>
> Source wiring is present and type/tests are passing, but authenticated runtime acceptance remains blocked until official environment injection, callback registration, DB connectivity, and real OAuth session persistence are demonstrated. The high-priority static gaps above remain open for a separately authorized hardening phase.

## References

[1]: ../client/src/_core/hooks/useAuth.ts "Client auth hook"
[2]: ../server/db.ts "Drizzle database adapter"
[3]: ../server/_core/cookies.ts "Session cookie policy"
[4]: ../server/_core/env.ts "Runtime environment contract"
[5]: ../client/src/App.tsx "Client route table"
[6]: ../client/src/lib/trpc.ts "Client tRPC binding"
[7]: ../server/_core/trpc.ts "tRPC procedure middleware"
[8]: ../server/_core/oauth.ts "OAuth callback route"
[9]: ../server/_core/sdk.ts "OAuth and session SDK"
[10]: ../server/_core/context.ts "tRPC request context"
[11]: ../server/_core/index.ts "Express bootstrap and route mounting"
[12]: ../server/routers.ts "Registered application router"
[13]: ../shared/const.ts "Shared auth and OAuth state constants"
[14]: ../client/src/const.ts "Client OAuth launcher"
[15]: ../client/src/lib/seg-navigation.ts "SEG route constants"
[16]: ../client/src/components/DashboardLayout.tsx "Dashboard auth boundary and anchors"
[17]: ../client/src/main.tsx "Client tRPC transport and sessionStorage fallback"
