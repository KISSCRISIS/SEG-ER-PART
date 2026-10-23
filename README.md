# JEM Nexus

Jordan Emergency Medicine Nexus (SEG) is a responsive medical-education platform built with React, TypeScript, Vite, Express/tRPC, Drizzle ORM, and MySQL.

> Educational content is not a substitute for clinical judgment, local protocols, or emergency services. Only clinically approved, versioned content may be published.

## Requirements

- Node.js 22
- pnpm 11.10.0 (Corepack recommended)
- MySQL 8.4, locally or through Docker Desktop

## Local setup

```powershell
Copy-Item .env.example .env
docker run --name jem-nexus-mysql -e MYSQL_ROOT_PASSWORD=change-me -e MYSQL_DATABASE=seg -p 3306:3306 -d mysql:8.4
pnpm install --frozen-lockfile
pnpm db:push
pnpm dev
```

Open `http://localhost:3000`. Never commit `.env`. Resend's default sender can deliver only to the Resend account owner until a project domain is purchased and verified.

## Required environment

See `.env.example`. At minimum, configure `DATABASE_URL` and a strong `JWT_SECRET`. Production also requires HTTPS, a correctly scoped `TRUST_PROXY`, and a verified email-sending domain.

## Quality commands

```bash
pnpm lint
pnpm check
pnpm test
pnpm security:audit
pnpm repo:hygiene
pnpm build
pnpm test:ui
pnpm test:lighthouse
```

`pnpm run ci` runs lint, type checking, unit tests, and the production build. GitLab CI also runs a high-severity dependency audit and browser tests at 320, 390, 768, and 1440 pixels with axe accessibility checks and Lighthouse reports.

## Architecture and source authority

- UI: `client/src/`
- API and domain services: `server/`
- Shared contracts: `shared/`
- Canonical database model: `drizzle/schema.ts`
- Ordered database history: `drizzle/*.sql`
- CI: `.gitlab-ci.yml`

The definitive repository policy is [docs/architecture/SOURCE_OF_TRUTH.md](docs/architecture/SOURCE_OF_TRUTH.md). Historical root reports and evidence packages are not runtime sources.

## Medical-content governance

Medical content uses a stable item plus immutable revisions. Each revision has explicit provenance links and append-only clinical review decisions. Publication fails closed unless the revision is approved, has a source, and records an attributable reviewer, credential, and checklist version. Corrections create a new version; an approved version is never overwritten.

See [docs/architecture/MEDICAL_CONTENT_GOVERNANCE.md](docs/architecture/MEDICAL_CONTENT_GOVERNANCE.md).

## Deployment and operations

- Build: `pnpm build`
- Start: `pnpm start`
- Health check: `GET /healthz`
- Container deployment: see [DEPLOYMENT.md](DEPLOYMENT.md)
- Monitoring and backups: see [docs/operations/MONITORING_AND_BACKUP.md](docs/operations/MONITORING_AND_BACKUP.md)

Before production migration, create and verify a backup. Apply migrations once from a controlled release job, not concurrently from every application replica.

## Security

Report security issues privately to the project owner. Do not place patient data, credentials, tokens, OTP codes, database dumps, or production logs in issues or Git history.
