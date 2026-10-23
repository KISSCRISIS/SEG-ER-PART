# Beta Environment Setup

**For local pilot testing only. No production secrets, no architecture changes.**

## 1. Required Environment Variables

Copy `docs/architecture/SOURCE_REGISTRY_DOCUMENTATION.md` authoritative list:

```powershell
Copy-Item .env.example .env
```

**Minimal for `PILOT_MODE=true` (local SQLite, no MySQL/OAuth):**

| Variable | Value for Beta | Notes |
|---|---|---|
| `NODE_ENV` | `development` |  |
| `PILOT_MODE` | `true` | Enables local email login without OAuth |
| `SEG_LOCAL_EMAIL_LOGIN` | `true` | Required with `PILOT_MODE=true` for localStore |
| `JWT_SECRET` | `replace-with-a-long-random-secret` → **generate** 32+ chars | `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `DATABASE_URL` | *(empty or `mysql://...`)* | When `localStorageEnabled()` true, SQLite `local-data/` is used; MySQL ignored |
| `PORT` | `3000` |  |
| `VITE_APP_ID` | `replace-with-app-id` | Placeholder OK for PILOT_MODE |
| `VITE_OAUTH_PORTAL_URL` | `replace-with-official-oauth-portal-origin` | Placeholder OK for PILOT_MODE |

**For hosted MySQL beta (optional):**

| Variable | Value |
|---|---|
| `DATABASE_URL` | `mysql://user:password@host:3306/database` |
| `JWT_SECRET` | strong random |
| `PILOT_MODE` | `false` |
| `OAUTH_SERVER_URL` | `https://oauth.manus.im` (real) |
| `VITE_APP_ID` / `VITE_OAUTH_PORTAL_URL` | real Manus values |

**Never commit `.env`** (in `.gitignore`). Production also requires `TRUST_PROXY`, `ENABLE_HSTS=true`, `APP_VERSION`, `BUILT_IN_FORGE_API_KEY` per `DEPLOYMENT.md`.

## 2. Local Startup Steps (PowerShell)

**PILOT_MODE (recommended for beta, no Docker):**

```powershell
# 1. Env
Copy-Item .env.example .env
# Edit .env: PILOT_MODE=true, SEG_LOCAL_EMAIL_LOGIN=true, JWT_SECRET=<generated>

# 2. Install
pnpm install --frozen-lockfile

# 3. No DB needed (localStore) — for MySQL instead:
# docker run --name jem-nexus-mysql -e MYSQL_ROOT_PASSWORD=change-me -e MYSQL_DATABASE=seg -p 3306:3306 -d mysql:8.4
# pnpm db:push

# 4. Verify
pnpm check
pnpm test

# 5. Run
pnpm dev
# Open http://localhost:3000
# Health: curl http://localhost:3000/healthz
```

**Hosted MySQL:**

```powershell
Copy-Item .env.example .env
# Edit .env: DATABASE_URL=mysql://..., JWT_SECRET=..., PILOT_MODE=false
docker run --name jem-nexus-mysql -e MYSQL_ROOT_PASSWORD=change-me -e MYSQL_DATABASE=seg -p 3306:3306 -d mysql:8.4
pnpm install --frozen-lockfile
pnpm db:push
pnpm dev
```

## 3. Switching Modes

| Mode | `.env` | Storage | Auth |
|---|---|---|---|
| Pilot (beta default) | `PILOT_MODE=true`, `SEG_LOCAL_EMAIL_LOGIN=true` | `local-data/` SQLite (via `server/localStore.ts`) | Local email, no OAuth |
| Hosted | `PILOT_MODE=false` | MySQL (`DATABASE_URL`) | Manus OAuth (`OAUTH_SERVER_URL`) |

**Data isolation:** `local-data/` is per-machine; `MySQL` is shared. Do not mix without backup.

## 4. Verification Checklist (run before first beta session)

```powershell
pnpm check   # tsc --noEmit — must PASS (type-safe)
pnpm test    # vitest — must show 48 passed / 132 passed
pnpm build   # vite — must show "built in" and DashboardPage ~82 kB
Copy-Item .env.example .env
# Edit .env: PILOT_MODE=true, SEG_LOCAL_EMAIL_LOGIN=true, JWT_SECRET=<32+ hex chars>
pnpm dev     # http://localhost:3000 must load; /healthz must 200
```

- If `pnpm check` fails → fix types before inviting testers.
- If `pnpm test` fails → check `shared/*` helpers (study-plan-intelligence) first.
- `PILOT_MODE=false` with placeholder `JWT_SECRET` → auth fails; generate strong secret via `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.
- Local pilot needs no DB — `local-data/` SQLite is used when `localStorageEnabled()` true; `DATABASE_URL` ignored.

## 5. Troubleshooting

- `ReferenceError: q is not defined` on `pnpm index:qbank-mapping` — fixed in `scripts/build-qbank-mapping.ts:178` (`question`); re-run `pnpm check`.
- `PILOT_MODE=false` with placeholder `JWT_SECRET` → auth fails; generate strong secret.
- `DATABASE_URL` with `PILOT_MODE=true` → ignored when `localStorageEnabled()` true.
- `pnpm lint` 2 errors in `build-qbank-mapping.ts`/`mastery-engine.ts` — fixed (removed unused `q/e/c` and `now`).
- Placeholder UI shows `Pilot preview` badge — expected; see `docs/BETA_TESTING_GUIDE.md:2.1` L1-L7.

---

*No application logic modified; env only. See `docs/BETA_TESTING_GUIDE.md` for test flows.*
