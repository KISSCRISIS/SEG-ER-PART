# Monitoring and backup runbook

## Monitoring

- Probe `GET /healthz` every 60 seconds; alert after three consecutive failures.
- Alert on elevated HTTP 5xx rate, p95 latency, process restarts, memory saturation, database connection failures, and email-delivery failures.
- Centralize structured logs with request IDs. Never record passwords, OTP values, cookies, authorization headers, or medical learner data.
- Configure an external uptime check for the landing page and `/healthz` after deployment.
- Set `APP_VERSION` to the immutable release commit so health responses identify the running build.

## MySQL backup policy

- Create an encrypted full dump daily; retain 7 daily, 4 weekly, and 12 monthly copies.
- Store backups in a different account or region and strictly limit restore permission.
- Run a monthly restore drill in an isolated database and record recovery time and integrity results.
- Back up before every production migration. Dumps must never be committed to Git.

Windows/Docker example:

```powershell
./scripts/backup-mysql.ps1 -Container jem-nexus-mysql -Database seg
```

Restore into an explicitly named non-production database first, validate row counts and migrations, then schedule a controlled production restore.
