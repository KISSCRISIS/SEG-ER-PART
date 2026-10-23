# SEG Local Runtime Recovery Handoff

**Purpose:** This is the appropriate handoff file for recovering the existing SEG runtime through the official Manus/WebDev environment. It provides non-secret identifiers, verified resource status, activation prerequisites, and validation steps. It is **not** a `.env` file and contains no passwords, tokens, JWT secrets, database connection strings, or Forge credentials.

## 1. Non-Secret Source Identity

| Item | Value / Status |
|---|---|
| Source WebDev project name | `seg-phase1` |
| Source WebDev project ID | `bJJKQn7TeiDnuBKJ9JTNte` |
| Published SEG domain | `https://seg-guide-bjjkqn7t.manus.space` |
| Latest recoverable source checkpoint | `manus-webdev://8c082499` |
| Deployment snapshot | Available through WebDev checkpoint/version history |
| Runtime architecture | React + Vite + Express + tRPC + Manus OAuth + MySQL/TiDB + managed Forge storage |

## 2. Verified Runtime Resource Status

| Resource | Verified Status | Activation Owner |
|---|---|---|
| Manus WebDev project identity | Available | Project owner / WebDev workspace |
| Deployment resource and snapshot | Available | Project owner / WebDev version history |
| Secret Manager | Available | Project owner / WebDev Settings → Secrets |
| `VITE_APP_ID` | Configured | WebDev secure environment injection |
| `VITE_OAUTH_PORTAL_URL` | Configured | WebDev secure environment injection |
| `OAUTH_SERVER_URL` | Configured | WebDev secure environment injection |
| `JWT_SECRET` | Configured | WebDev secure environment injection |
| `DATABASE_URL` | Configured | WebDev secure environment injection |
| `BUILT_IN_FORGE_API_URL` | Configured | WebDev secure environment injection |
| `BUILT_IN_FORGE_API_KEY` | Configured | WebDev secure environment injection |
| `OWNER_OPEN_ID` | Configured | WebDev secure environment injection |
| OAuth callback route | Available | Application route: `/api/oauth/callback` |
| Database connectivity | Available | Health query succeeded; do not export connection details |
| User/session persistence source | Available | OAuth callback persists the user through the existing database layer |
| Managed Forge storage source | Available | Existing `/manus-storage/*` proxy requires Forge environment injection |

## 3. Required Official Activation Steps

### A. Restore the Correct WebDev Project

Open the source project through the official WebDev workspace using the project identifier above. If the project needs restoration, select the checkpoint reference in WebDev version history. Do not reconstruct the project manually from screenshots or copy individual source fragments.

### B. Bind Secrets Through WebDev

In **WebDev Settings → Secrets**, confirm the named resources in Section 2 are bound to the project. They must be injected by the official WebDev runtime into the Node/Vite process. Do not place values into chat, `README.md`, source files, committed `.env` files, browser local storage, or screenshots.

### C. Use the Official Runtime Session

Start the project only through the connected WebDev runtime after secret binding. A bare local process without the official runtime binding is not equivalent to the deployed environment and cannot obtain the protected values from this document.

### D. Confirm OAuth Redirect Registration

The current OAuth implementation derives its callback dynamically as:

```text
<current-runtime-origin>/api/oauth/callback
```

Register only the actual approved preview or production origin in the OAuth provider configuration. Do **not** assume `localhost` is permitted. A localhost callback requires separate explicit OAuth-provider registration before local browser sign-in can be tested.

### E. Confirm Database and Managed Storage

Use a non-destructive database health query such as `SELECT 1` through the secured project interface. Then load one approved managed `/manus-storage/...` resource in the runtime. Do not inspect database contents or print presigned URLs, credentials, or user data.

## 4. Safe Recovery Validation Checklist

| Check | Expected Result |
|---|---|
| Project starts through WebDev | Node/Vite runtime starts without missing-environment errors. |
| Public Landing route | Loads from the published/preview origin. |
| Login action | Opens the configured OAuth flow from a user event handler. |
| OAuth callback | Returns to `/api/oauth/callback`, validates state, and redirects to `/dashboard` after successful sign-in. |
| Session persistence | A valid callback can persist and re-read the user session through the existing database layer. |
| Managed assets | Existing `/manus-storage/...` URLs resolve through the Forge storage proxy. |
| Database health | A non-destructive health query succeeds. |
| Application validation | Run `pnpm test`, `pnpm check`, and `pnpm build` after recovery. |

## 5. Explicit Security Boundaries

Do not send or include any of the following in a handoff message, Git commit, document, ticket, or screenshot: `JWT_SECRET`, `DATABASE_URL`, `BUILT_IN_FORGE_API_KEY`, OAuth credentials, session cookies, presigned URLs, passwords, or tokens.

The current SEG implementation does not require a new database schema, mock user, authentication bypass, Prisma/Supabase migration, new React code, or reference screenshots to recover the existing managed runtime. Recovery depends on the correct WebDev project, official secret injection, approved OAuth redirect origin, connected database, and connected Forge storage.

## 6. Current Limitation

This handoff supports recovery through the official Manus/WebDev environment. It cannot independently recreate protected credentials in an arbitrary local machine or a different project. If a new project must be used, the project owner must explicitly bind the original authorized integrations and secrets in that project, then validate OAuth callback registration and managed service access before any production use.
