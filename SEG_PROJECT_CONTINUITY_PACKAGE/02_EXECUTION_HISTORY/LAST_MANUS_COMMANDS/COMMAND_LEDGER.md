# LAST_MANUS_COMMANDS — Command Ledger

هذا السجل يثبت الأوامر التشغيلية الرئيسية التي أُنجزت قبل نقطة الاستمرارية. الأوامر أدناه مرجع قابل لإعادة التشغيل، وليست تصريحاً بتغيير النطاق.

## Repository and package inspection

```bash
file /home/ubuntu/upload/seg-phase1.zip
unzip -t /home/ubuntu/upload/seg-phase1.zip
unzip -t /home/ubuntu/upload/SEGFinalSourceValidationandFileReview.zip
```

## Phase 3 type and build validation

```bash
cd /home/ubuntu/seg-phase1
pnpm check
pnpm exec vitest run --pool=forks --maxWorkers=1 --minWorkers=1
pnpm build
```

## Production start and health verification

```bash
NODE_ENV=production HOST=0.0.0.0 PORT=4317 pnpm start
curl -i http://127.0.0.1:4317/healthz
curl -I http://127.0.0.1:4317/
curl -I -H 'Accept-Encoding: br' http://127.0.0.1:4317/assets/<hashed-file>.js
```

## Security and compression verification

```bash
curl -sS -D - -o /dev/null http://127.0.0.1:4317/healthz
curl -sS -D - -o /dev/null -H 'Accept-Encoding: br' http://127.0.0.1:4317/assets/<hashed-file>.js
```

Expected signals are a JSON `200` health response, CSP and Permissions-Policy headers, a request identifier, and Brotli or Gzip for supported assets. The exact header policy remains defined by `server/_core/production.ts`.

## Delivery archive verification

```bash
unzip -t SEG_PHASE3_DELIVERY.zip
unzip -Z1 SEG_PHASE3_DELIVERY.zip | grep -E 'package.json|pnpm-lock.yaml|Dockerfile|SEG_PRODUCTION_READINESS.md|SEG_NEXTJS_MIGRATION_PLAN.md'
```

## Continuity bundle verification

```bash
unzip -t SEG_PROJECT_CONTINUITY_PACKAGE_FINAL.zip
unzip -Z1 SEG_PROJECT_CONTINUITY_PACKAGE_FINAL.zip | grep -E 'SEG_PROJECT_CONTINUITY_PACKAGE_FINAL.md|LAST_MANUS_STATE|NEXT_PENDING_COMMANDS|SEG_MASTER_PROJECT_STATE|SOURCE_OF_TRUTH_MAP|CURRENT_STATUS_CHECKLIST'
```

## Guardrail

Never run `pnpm start`, Docker, or any deployment command with production secrets in a public or shared environment. Use `.env.example` as a template and inject secrets only through the platform secret manager.
