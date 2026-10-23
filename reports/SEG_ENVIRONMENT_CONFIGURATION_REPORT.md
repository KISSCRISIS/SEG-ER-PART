# SEG Environment Configuration Report

## Scope and safety

This report records environment variable **names and provenance only**. It does not contain secret values, tokens, passwords, connection strings, private keys, or copied environment files. No secret value was deleted, overwritten, or moved by the environment review. The backup package must remain a code-and-documentation snapshot and must not be used as a substitute for private secret backup.

## 1. Environment-file status

| Item | Result | Interpretation |
|---|---|---|
| `.env` in current checkout | Not present in the read-only file inventory | No local `.env` file was found at capture time |
| `.env.local` | Not present in the current checkout | Ignored by repository rules |
| `.env.production` | Not present | No production value file was found |
| `.env.example` | Present and tracked | Non-secret template; safe to include in repository/code backup |
| Repository ignore rules | `.env`, `.env.local`, `.env.development.local`, `.env.test.local`, `.env.production.local` | Actual environment values are excluded from normal repository tracking |
| Secret files | No tracked `.pem`, `.key`, certificate, or credential file found in the targeted inventory | No secret file should be placed in the public/code backup |

The final backup will include `.env.example` and exclude `.env*` value files. The backup archive will also be checked for secret-like key material and forbidden environment paths.

## 2. Application runtime variables

The following names are defined by `.env.example` and consumed directly or indirectly by `server/_core/env.ts` and the existing Express/Manus runtime. “Required in production” means the current `assertProductionEnvironment()` fail-fast guard requires the value; other variables are runtime-supported but optional or have safe defaults.

| Variable name | Source of name | Production requirement | Purpose/classification | Private backup required? |
|---|---|---:|---|---|
| `NODE_ENV` | `.env.example`, `server/_core/env.ts`, Dockerfile | Required operational setting | Selects development/production behavior | No value in code backup; private operational record recommended |
| `APP_VERSION` | `.env.example`, `server/_core/env.ts` | Optional, defaults to `dev` | Runtime/build identity | No; record actual value privately if used for release tracking |
| `SERVICE_NAME` | `.env.example`, `server/_core/env.ts` | Optional, defaults to `seg-api` | Service identity/logging | No; private record optional |
| `PORT` | `.env.example`, `server/_core/env.ts`, Dockerfile | Platform-provided or defaulted | HTTP listener port | No; platform configuration should be private/managed |
| `VITE_APP_ID` | `.env.example`, `server/_core/env.ts` | **Required** | Manus application identity | **Yes — private secret/config backup** |
| `JWT_SECRET` | `.env.example`, `server/_core/env.ts` | **Required** | Session/cookie signing secret | **Yes — private secret backup; never commit or include in ZIP** |
| `OAUTH_SERVER_URL` | `.env.example`, `server/_core/env.ts` | **Required** | Manus OAuth issuer/server endpoint | Private configuration backup recommended; value is not included in code archive |
| `DATABASE_URL` | `.env.example`, `server/_core/env.ts`, `server/db.ts` | Required for database-backed operation | Drizzle/MySQL connection string | **Yes — private secret/config backup; never include in ZIP** |
| `BUILT_IN_FORGE_API_URL` | `.env.example`, `server/_core/env.ts` | Optional unless managed storage/features require it | Managed Forge API endpoint | Private deployment configuration backup recommended |
| `BUILT_IN_FORGE_API_KEY` | `.env.example`, `server/_core/env.ts` | Required only when Forge-backed behavior is used | Server-side Forge credential | **Yes — private secret backup; never commit or include in ZIP** |
| `OWNER_OPEN_ID` | `.env.example`, `server/_core/env.ts` | Optional | Owner/admin identity mapping | Private operational record recommended |
| `OWNER_NAME` | `.env.example` | Optional | Human-readable owner metadata | No secret backup required; private record optional |

## 3. Request, proxy, and security-policy variables

These names are documented in `.env.example` and read by the existing runtime hardening/configuration code. Most have defaults in `server/_core/env.ts`; production values should be managed by the deployment platform rather than copied into the repository backup.

| Variable name | Source of name | Default/template source | Private backup required? |
|---|---|---|---|
| `TRUST_PROXY` | `.env.example`, `server/_core/env.ts` | `false` outside production; production defaults to `1` | No secret; record deployment setting privately if non-default |
| `BODY_SIZE_LIMIT` | `.env.example`, `server/_core/env.ts` | `10mb` | No |
| `API_RATE_LIMIT` | `.env.example`, `server/_core/env.ts` | `240` | No |
| `AUTH_RATE_LIMIT` | `.env.example`, `server/_core/env.ts` | `30` | No |
| `REQUEST_TIMEOUT_MS` | `.env.example`, `server/_core/env.ts` | `30000` | No |
| `KEEP_ALIVE_TIMEOUT_MS` | `.env.example`, `server/_core/env.ts` | `5000` | No |
| `HEADERS_TIMEOUT_MS` | `.env.example`, `server/_core/env.ts` | `6000` | No |
| `ENABLE_HSTS` | `.env.example`, `server/_core/env.ts` | `false` | No |
| `HSTS_PRELOAD` | `.env.example`, `server/_core/env.ts` | `false` | No |
| `DISABLE_CSP` | `.env.example`, `server/_core/env.ts` | `false` | No |
| `CSP_UPGRADE_INSECURE_REQUESTS` | `.env.example`, `server/_core/env.ts` | `false` | No |
| `DISABLE_PRECOMPRESSED_ASSETS` | `.env.example`, `server/_core/env.ts` | `false` | No |
| `LOG_REQUEST_HEADERS` | `.env.example`, `server/_core/logger.ts` | `false` | No; actual production setting should be private operational metadata |

## 4. Client analytics variables

These names are listed in `.env.example` for optional client analytics configuration. They are not required for application startup. Because variables prefixed with `VITE_` can be exposed to client bundles by Vite, they must never contain secrets.

| Variable name | Source of name | Requirement | Private backup required? |
|---|---|---:|---|
| `VITE_ANALYTICS_ENDPOINT` | `.env.example` and source references | Optional | No secret backup; record endpoint privately if configured |
| `VITE_ANALYTICS_WEBSITE_ID` | `.env.example` and source references | Optional | No secret backup; do not use for a secret |

## 5. QA-only variables

The following names are used by audit/test tooling rather than the production application configuration. They are not required to start SEG and must not be mistaken for production credentials.

| Variable name | Source of name | Scope | Private backup required? |
|---|---|---|---|
| `SEG_FINAL_PACKAGE_ROOT` | `scripts/audit-final-package.mjs` | Optional QA fixture location | No; local path only |
| `SEG_PRODUCTION_URL` | `scripts/audit-final-package.mjs` | Optional QA target override | No secret; actual target metadata may be recorded privately |

## 6. Backup decision

The code/documentation backup should include the tracked `.env.example` template because it contains variable names and placeholders only. It must exclude `.env`, `.env.local`, `.env.production`, and all other value-bearing environment files, whether tracked or ignored. The backup should also exclude private keys, certificates, token files, logs, and generated build/cache directories.

A **separate private backup is required** for the actual production values of `JWT_SECRET`, `VITE_APP_ID`, `DATABASE_URL`, `BUILT_IN_FORGE_API_KEY`, and any deployment-specific OAuth or platform secrets. The private backup must use an approved secret manager or encrypted storage controlled by the deployment owner. It must not be placed in GitHub, the public artifact ZIP, Markdown reports, screenshots, or ordinary project documentation.

No secret value was lost by this task because no value-bearing environment file was found in the current checkout and no secret was copied, deleted, or altered. This statement does not prove that a deployment platform’s secret store is backed up; the deployment owner remains responsible for private secret escrow and rotation records.

## 7. Backup acceptance checks

Before the backup is finalized, the following checks must pass:

1. `.env` and all value-bearing `.env.*` paths are absent from the archive.
2. `.env.example` is present in the repository snapshot inside the archive.
3. All names in the current `.env.example` and `server/_core/env.ts` contract are represented in this report.
4. The archive contains no private key, token, password, or connection-string value.
5. The archive manifest records the current Git status, commit, build/test status, and timestamp.

## References

[1]: `/home/ubuntu/seg-manus-status/.env.example` "SEG non-secret environment template"
[2]: `/home/ubuntu/seg-manus-status/server/_core/env.ts` "SEG runtime environment parsing and production fail-fast requirements"
[3]: `/home/ubuntu/seg-manus-status/server/db.ts` "SEG Drizzle/MySQL database configuration consumer"
[4]: `/home/ubuntu/seg-manus-status/server/_core/logger.ts` "SEG request-header logging configuration"
[5]: `/home/ubuntu/seg-manus-status/Dockerfile` "SEG Node 22/pnpm/Express runtime defaults"
[6]: `/home/ubuntu/seg-manus-status/scripts/audit-final-package.mjs` "SEG QA-only production target and fixture configuration"
[7]: `/home/ubuntu/seg-internship-output/SEG_RELEASE_CANDIDATE_ARTIFACT_MANIFEST.md` "Validated local release artifact exclusions"
