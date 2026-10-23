# SEG Phase 3 Deployment Guide

## نطاق هذه الحزمة

هذه الحزمة هي تسليم **Vite + Express** الحالي مع إعدادات Phase 3. يجب تشغيلها كخدمة Node/Express حتى تصل رؤوس CSP وSecurity Headers و`/healthz` إلى المستخدم النهائي. رفع مجلد الواجهة الثابتة وحده لن يشغّل خادم Express ولن يفعّل middleware الأمني.

## قبل التشغيل

انسخ `.env.example` إلى `.env` في بيئة التشغيل، ثم املأ القيم الحقيقية من منصة الاستضافة أو مدير الأسرار. لا ترفع `.env` إلى المستودع ولا تضفها إلى ملف ZIP. يجب استخدام HTTPS في البيئة العامة، وضبط `TRUST_PROXY` بما يطابق عدد proxies الموثوقة أمام الخدمة.

المتغيرات الحساسة، مثل `DATABASE_URL` و`JWT_SECRET` و`BUILT_IN_FORGE_API_KEY` وOAuth server secrets، يجب أن تُحقن من مدير أسرار المنصة وقت التشغيل. أما المتغيرات التي تبدأ بـ`VITE_` فهي قد تصبح عامة داخل bundle المتصفح؛ لا تضع فيها أي secret.

## التشغيل بواسطة pnpm

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm build
NODE_ENV=production HOST=0.0.0.0 PORT=3000 pnpm start
```

بعد بدء الخدمة، افحص:

```bash
curl -i http://127.0.0.1:3000/healthz
curl -I http://127.0.0.1:3000/
```

يجب أن يعيد `/healthz` حالة `200` مع JSON، وأن تظهر على استجابة HTML رؤوس `Content-Security-Policy` و`Permissions-Policy` و`X-Content-Type-Options` و`X-Request-Id` وفق إعدادات البيئة.

## التشغيل بواسطة Docker

```bash
docker build -t seg-phase3:latest .
docker run --rm \
  --env-file .env \
  -e NODE_ENV=production \
  -e HOST=0.0.0.0 \
  -e PORT=3000 \
  -p 3000:3000 \
  seg-phase3:latest
```

في منصة تدعم health checks، استخدم `GET /healthz` مع مهلة بدء مناسبة. يجب وضع reverse proxy أو load balancer أمام الخدمة في النشر العام، وإنهاء TLS هناك أو داخل طبقة موثوقة، وتمرير `X-Forwarded-Proto` و`X-Forwarded-For` بصورة صحيحة.

## إعدادات منصة الرفع

استخدم أمر البناء `pnpm build` وأمر البدء `pnpm start`. لا تستخدم أمر نشر static-only مثل رفع `dist/public` إلى CDN إذا كان المطلوب تفعيل Express؛ ذلك سيعرض الواجهة فقط ويُسقط `/healthz` وCSP وRate Limiting والسجلات.

إذا كانت المنصة تفرض منفذاً ديناميكياً، اترك `PORT` ليُحقن من المنصة. يجب أن يستمع التطبيق على `0.0.0.0` وليس `127.0.0.1`. لا تضع الأسرار داخل `package.json` أو Dockerfile أو ملفات `.md`.

## فحوصات ما بعد النشر

1. تحقق من `GET /healthz` وحالة `200` وJSON الصحيح.
2. تحقق من `Content-Security-Policy` و`Permissions-Policy` و`X-Request-Id` و`X-Content-Type-Options`.
3. تحقق من أن أصل JavaScript يحمل سياسة cache المناسبة وأن Brotli/Gzip يعملان عندما يطلبهما العميل.
4. تحقق من أن مسار OAuth وcallback والكوكيز يعملان عبر HTTPS.
5. تحقق من أن الطلبات الزائدة على المسارات المحمية تصل إلى `429` وفق الحدود المضبوطة.
6. راجع السجلات للتأكد من عدم تسجيل cookies أو tokens أو Authorization headers.
7. قارن الصفحة المنشورة مع `SEG_PRODUCTION_READINESS.md`، وسجّل أي اختلاف في منصة الاستضافة.

## ملاحظة حول Next.js

حزمة Phase 3 لا تُنشئ تطبيق Next.js ولا تستبدل Express. خطة الهجرة المستقبلية محفوظة في `SEG_NEXTJS_MIGRATION_PLAN.md`، وتوصي بتشغيل Next.js كواجهة موازية مع إبقاء Express/tRPC وManus OAuth وقاعدة البيانات كعقود مستقرة في أول مرحلة.
