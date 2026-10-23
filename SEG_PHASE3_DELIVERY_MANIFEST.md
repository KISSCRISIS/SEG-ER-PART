# SEG Phase 3 Delivery Manifest

## Package identity

- Package: `SEG_PHASE3_DELIVERY.zip`
- Application: SEG — Smart Emergency Guide
- Architecture: Vite + React + Express + tRPC
- Delivery mode: source plus prebuilt `dist/`
- Runtime requirement: Node.js 22 and pnpm 10.4.1-compatible installation

## Included delivery-critical files

| Area | Files |
|---|---|
| Runtime | `package.json`, `pnpm-lock.yaml`, `dist/index.js` |
| Server | `server/_core/index.ts`, `production.ts`, `logger.ts`, `env.ts`, `vite.ts` |
| Build | `vite.config.ts`, `tsconfig.json`, `dist/public/` |
| Security | `helmet`, CSP, Permissions-Policy, request IDs, rate limiting, body limits |
| Deployment | `Dockerfile`, `.dockerignore`, `DEPLOYMENT.md`, `.env.example` |
| Documentation | `SEG_PRODUCTION_READINESS.md`, `SEG_NEXTJS_MIGRATION_PLAN.md` |

## Exclusions

The archive intentionally excludes `node_modules`, `.git`, `.env`, local logs, coverage output, and other secret-like local files. The deployment platform must run `pnpm install --frozen-lockfile` before `pnpm start`, or use the included Dockerfile, because the bundled Express server keeps its production dependencies external.

## Verification record

- ZIP integrity: passed with `unzip -t`.
- TypeScript: `pnpm check` passed.
- Production build: `pnpm build` passed.
- Extracted archive runtime: passed after dependency installation/linking.
- `/healthz`: `200` JSON response.
- Security headers: CSP, Permissions-Policy, X-Request-Id, X-Content-Type-Options observed.
- Compression: Brotli served for a hashed JavaScript asset.
- Hashed asset caching: `public, max-age=31536000, immutable` observed.
