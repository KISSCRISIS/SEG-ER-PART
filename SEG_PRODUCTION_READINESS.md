# SEG Production Readiness

**Phase:** 3 — Option A

**Architecture:** Vite + Express + tRPC

**Status:** **Implemented and validated for staging; production release is conditional on external asset-package completion and deployment environment configuration.**

**Date:** 2026-08-15

## Executive summary

تم تنفيذ Phase 3 على النسخة المنظمة من مشروع SEG مع الإبقاء على بنية Vite/Express الحالية، ودون إدخال هجرة إلى Next.js في مسار الإطلاق الحالي. شملت التعديلات طبقة أمن مركزية باستخدام Helmet، وسياسة Content Security Policy، وتحديد معدل الطلبات، وسجلات JSON منظمة، ومعالجة موحدة للأخطاء، ومعرّف طلب قابل للتتبع، وحدوداً صريحة لأحجام الطلبات ومهل الخادم.

كما تم تحسين بناء Vite عبر تقسيم حزمة React وواجهة المستخدم وطبقة البيانات، واستخدام بصمات للأصول، وتقسيم CSS، وإيقاف source maps في الإنتاج، وإنتاج ملفات Brotli وGzip مسبقة الضغط. أضيفت أيضاً سياسة تخزين مؤقت طويلة للأصول ذات البصمة مع إبقاء `index.html` قابلاً للتحديث، وأصبح تحميل Umami اختيارياً ولا يحدث إلا عند توفير متغيري البيئة الخاصين به [1] [2].

النتيجة العملية هي أن كود Phase 3 يمر بفحص TypeScript وبناء الإنتاج، وجميع اختبارات التطبيق الداخلية البالغ عددها 20 اختباراً تمر عند تشغيلها بعامل واحد. يبقى اختبار تدقيق الأصول النهائي محجوباً بسبب حزمة خارجية غير مكتملة/غير موجودة في مسارها المتوقع؛ وهذا عائق في حزمة الأصول وليس فشلاً في طبقة Vite/Express الجديدة.

## نطاق التنفيذ

| المجال | الحالة | الملفات الأساسية |
|---|---|---|
| Security Headers وCSP | مطبق | `server/_core/production.ts` |
| Rate Limiting | مطبق | `server/_core/production.ts`, `server/_core/index.ts` |
| Request IDs وStructured Logging | مطبق | `server/_core/logger.ts` |
| Error Handling و404 | مطبق | `server/_core/production.ts`, `server/_core/index.ts` |
| Compression أثناء التشغيل | مطبق | `server/_core/index.ts` |
| Brotli/Gzip أثناء البناء | مطبق | `vite.config.ts` |
| تقسيم الحزمة والبصمات | مطبق | `vite.config.ts` |
| Environment validation | مطبق | `server/_core/env.ts`, `.env.example` |
| Cache-Control للأصول | مطبق | `server/_core/vite.ts` |
| Analytics injection | مطبق اختيارياً | `vite.config.ts`, `client/index.html` |
| تقرير التسليم | مطبق | `SEG_PRODUCTION_READINESS.md` |

## إعدادات الأمان المطبقة

تُفعّل الخدمة `helmet` مع تعطيل `x-powered-by` وتطبيق رؤوس أمنية افتراضية، منها `X-Content-Type-Options: nosniff` و`X-Frame-Options: SAMEORIGIN` و`Referrer-Policy: strict-origin-when-cross-origin` وسياسة `Permissions-Policy` التي تمنع الكاميرا والميكروفون والموقع الجغرافي والدفع ما لم يُسمح بها لاحقاً بشكل صريح.

تحدد CSP الإنتاجية مصادر السكربتات إلى `'self'`، وتمنع الكائنات (`object-src 'none'`) وتقيّد `frame-ancestors` إلى `'self'`. تسمح الصور عبر `https:` لأن المشروع يستخدم أصولاً مرئية مُدارة، وتبقي الاتصالات الخارجية عبر `https:` و`wss:`. جرى تعطيل `crossOriginEmbedderPolicy` عمداً للحفاظ على توافق الأصول والصور الحالية، بينما يبقى HSTS اختيارياً لأن تفعيله قبل التأكد من أن كل مسارات النشر HTTPS قد يسبب تعذر الوصول عبر HTTP.

| الضبط | القيمة الافتراضية | ملاحظة تشغيلية |
|---|---:|---|
| `DISABLE_CSP` | `false` | لا يُنصح بتعطيله في الإنتاج؛ يُستخدم فقط لتشخيص عطل مؤقت |
| `ENABLE_HSTS` | `false` | فعّله بعد التأكد من HTTPS الكامل |
| `HSTS_PRELOAD` | `false` | لا تفعّله إلا بعد مراجعة نطاقات الإنتاج وسياسة HSTS نهائياً |
| `TRUST_PROXY` | `1` في الإنتاج | يجب ضبطه وفق عدد/نوع الوكلاء العكسيين الفعليين |
| `BODY_SIZE_LIMIT` | `10mb` | يمنع طلبات JSON أو form غير المحدودة |
| `REQUEST_TIMEOUT_MS` | `30000` | يحد الطلبات العالقة |
| `HEADERS_TIMEOUT_MS` | `6000` | يحد بطء إرسال الرؤوس |
| `KEEP_ALIVE_TIMEOUT_MS` | `5000` | يحد اتصالات keep-alive غير النشطة |

يُطبّق Rate Limiting على سطح tRPC بمعدل افتراضي قدره 240 طلباً لكل دقيقة لكل مفتاح عميل، وعلى مسارات OAuth بمعدل 30 محاولة لكل 15 دقيقة. يعتمد Express على عنوان العميل بعد تطبيق `trust proxy`، لذلك فإن ضبط `TRUST_PROXY` بصورة خاطئة خلف CDN أو Load Balancer قد يجعل حدود المعدل أقل أو أعلى من المقصود.

## السجلات ومعالجة الأخطاء

يُنشئ كل طلب `X-Request-Id` قابلاً للتتبع، مع قبول قيمة واردة فقط إذا كانت ضمن صيغة آمنة وطول محدود، وإلا يُولّد UUID جديداً. تسجل الخدمة أحداثاً بصيغة JSON إلى stdout/stderr مع الوقت والبيئة واسم الخدمة والطريق وحالة الاستجابة ومدة الطلب. لا تُسجل الرؤوس الحساسة مثل `Authorization` و`Cookie` و`Set-Cookie` وحقول كلمات المرور والرموز.

يعيد معالج الأخطاء في الإنتاج رسالة عامة `Internal server error` مع `requestId` بدلاً من كشف تفاصيل الخطأ، بينما يسمح في التطوير برسالة الخطأ للمساعدة في التشخيص. كما تسجل الخدمة `unhandledRejection` و`uncaughtException`، وتحدد حالة الخروج عند الاستثناء غير الملتقط حتى يقوم مدير العملية أو منصة النشر بإعادة التشغيل وفق سياستها.

لتفعيل تسجيل الرؤوس غير الحساسة عند الحاجة فقط:

```bash
LOG_REQUEST_HEADERS=true
```

لا يُنصح بتفعيل هذا الخيار بصورة دائمة في بيئة إنتاج حساسة، حتى مع التصفية الحالية، إلا عند وجود حاجة تشخيصية محددة.

## تحسين البناء والأصول

يستخدم Vite الآن `esbuild` للتصغير، ويوقف source maps في الإنتاج، ويفصل CSS، ويضع بصمات hash في أسماء الأصول. كما يقسم Rollup الحزمة إلى مجموعات `vendor-react` و`vendor-ui` و`vendor-data` لتقليل إعادة تنزيل المكتبات عند تغير كود التطبيق.

تُنتج عملية البناء نسخاً مسبقة الضغط بصيغتي Brotli وGzip للأصول التي تتجاوز 1 KiB. ويظل ضغط Express أثناء التشغيل فعالاً للتفاوض مع العميل، بينما يمكن لـ CDN أو edge server استخدام الملفات المسبقة الضغط مباشرة عند دعم ذلك. الأصول ذات البصمة تحصل على `Cache-Control: public, max-age=31536000, immutable`، أما `index.html` فيحصل على `Cache-Control: no-cache` حتى يصل المستخدم إلى manifest الجديد بعد النشر.

| مؤشر البناء | القيمة المقاسة |
|---|---:|
| الحجم غير المضغوط لمخرجات `dist/public` | 1,191,212 bytes |
| الحجم الإجمالي لملفات Brotli | 266,803 bytes |
| الحجم الإجمالي لملفات Gzip | 312,817 bytes |
| ملفات Brotli الناتجة | 7 |
| ملفات Gzip الناتجة | 7 |
| وحدات Vite المحولة | 1,764 |
| زمن بناء Vite المقاس | نحو 3.8 ثانية |

أصبح حقن Umami اختيارياً؛ إذ لا يترك قالب HTML placeholders غير صالحة عند غياب `VITE_ANALYTICS_ENDPOINT` أو `VITE_ANALYTICS_WEBSITE_ID`. لا يُضاف سكربت التحليل إلا عندما تكون القيمتان متوفرتين أثناء البناء [2].

## القياس المحلي لزمن الاستجابة

أُجريت القياسات على خادم الإنتاج المبني محلياً عبر loopback، باستخدام 30 طلباً لكل endpoint. لذلك فهي مؤشرات على صحة مسار الخادم وتكاليف middleware في بيئة الاختبار، وليست التزاماً بزمن شبكة المستخدم أو CDN أو قاعدة البيانات.

| المسار | عدد الطلبات | المتوسط | P95 | الحد الأدنى | الحد الأقصى |
|---|---:|---:|---:|---:|---:|
| `GET /healthz` | 30 | 0.824 ms | 1.399 ms | 0.573 ms | 1.987 ms |
| JavaScript مع `Accept-Encoding: br` | 30 | 12.930 ms | 14.222 ms | 11.558 ms | 15.954 ms |

استجاب `GET /healthz` بحالة `200` وأعاد `X-Request-Id`. أعاد الأصل JavaScript حالة `200` مع `Content-Encoding: br` و`Cache-Control: public, max-age=31536000, immutable`. أعاد مسار API غير المعروف حالة `404` بصيغة JSON تتضمن `requestId`، مع تطبيق رؤوس الأمان نفسها.

## نتائج التحقق

| الفحص | النتيجة | التفاصيل |
|---|---|---|
| `pnpm check` | ناجح | لا توجد أخطاء TypeScript بعد التعديلات |
| `pnpm build` | ناجح | Vite وesbuild أنتجا الواجهة والخادم |
| اختبارات التطبيق الداخلية | ناجحة | 14 ملف اختبار، 20 اختباراً من 20 عند `--no-file-parallelism --maxWorkers=1 --minWorkers=1` |
| Health check | ناجح | `200 OK` مع رؤوس الأمان ومعرّف الطلب |
| Brotli runtime | ناجح | `Content-Encoding: br` للأصل JavaScript |
| Cache policy | ناجح | أصول hash طويلة التخزين و`index.html` قابل للتحديث |
| Rate Limiting | ناجح | الطلبان الأولان `404`، والثالث `429` عند حد تجريبي قدره 2 |
| Full default test suite | محجوب جزئياً | اختبار `scripts/audit-final-package.test.ts` يحتاج حزمة أصول خارجية غير متوفرة في المسار المتوقع |

## العائق الخارجي المتبقي

اختبار `scripts/audit-final-package.test.ts` لا يقرأ من داخل مشروع Vite/Express، بل يتوقع وجود `assets_manifest.json` في المسار الخارجي التالي:

```text
/home/ubuntu/webdev-static-assets/SEG_FINAL_PACKAGE/assets_manifest.json
```

عند تجهيز manifest الموجود في حزمة المراجعة، اتضح أن أصلين معلنين كـ `localFile` غير موجودين فعلياً في الأرشيفات المستخرجة:

```text
assets/images/SEG_Dashboard_Brain_Heart_Core_Clean_Approved.png
assets/images/SEG_ATLAS_VISUAL_ASSETS_HERO_v1.0.png
```

لذلك فإن حزمة Phase 3 نفسها سليمة، لكن بوابة تدقيق الأصول النهائية لا يمكن اعتبارها ناجحة إلى أن تُسلّم هاتان الصورتان أو يُحدّث manifest ليعكس المصدر المعتمد فعلياً. لا ينبغي تجاوز هذا الفحص بتعديل الاختبار أو إنشاء ملفات وهمية؛ الإجراء الصحيح هو استكمال المصدر البصري أو تصحيح manifest مع قرار اعتماد واضح.

## متطلبات النشر قبل الإنتاج

قبل النشر الفعلي يجب نسخ `.env.example` إلى ملف البيئة الخاص بالمنصة وتعبئة القيم الحقيقية خارج Git. الحد الأدنى المطلوب في الإنتاج هو `NODE_ENV=production` و`JWT_SECRET` قوي عشوائي و`VITE_APP_ID` و`OAUTH_SERVER_URL`، مع إعداد `DATABASE_URL` وبيانات Forge/Storage وفق تكامل النشر الفعلي.

يجب أيضاً ضبط `TRUST_PROXY` بناءً على البنية الحقيقية، وتفعيل `ENABLE_HSTS=true` فقط عندما تكون كل مسارات الخدمة خلف HTTPS. يفضل وضع الخادم خلف CDN أو reverse proxy يدعم TLS وhealth checks، وتوجيه stdout/stderr إلى خدمة تجميع سجلات، ومراقبة `5xx` و`429` ومدة الطلبات ونتائج `/healthz`.

## خطة هجرة اختيارية إلى Next.js

الهجرة ليست جزءاً من إطلاق Phase 3 ولا تتطلب تعطيل البنية الحالية. المسار الآمن هو إبقاء Express/tRPC كطبقة API مستقلة، ثم إدخال Next.js كواجهة أمامية تدريجية خلف reverse proxy أو rewrites. تبدأ العملية بجرد المسارات الحالية ومصادر البيئة وauth/session وطلبات tRPC، ثم نقل الصفحات العامة أولاً إلى App Router مع إبقاء المسارات الحساسة على الواجهة القديمة أثناء المقارنة.

| المرحلة المستقبلية | التنفيذ المقترح | شرط الخروج |
|---|---|---|
| 1. جرد العقود | تثبيت قائمة routes وtRPC وcookies وheaders وassets | لا توجد route غير موثقة |
| 2. واجهة موازية | إنشاء Next.js frontend مع rewrites إلى Express API | الصفحات العامة متطابقة بصرياً ووظيفياً |
| 3. البيئة والأمان | نقل `VITE_*` العامة إلى `NEXT_PUBLIC_*`، وإبقاء الأسرار server-only، وإعادة تطبيق CSP وheaders في middleware/config | فحص أمني ناجح دون كشف أسرار |
| 4. النقل التدريجي | تحويل Dashboard وLearn وPractice وPathway على دفعات مع feature flag | اختبارات الوصول وE2E تمر لكل دفعة |
| 5. التحويل النهائي | canary deployment ثم نقل traffic تدريجياً | rollback موثق وقياسات latency مستقرة |

يجب عدم استخدام Next.js كـ custom server بديل لـ Express إلا إذا ظهرت حاجة تشغيلية واضحة؛ الأفضل فصل مسؤوليات الواجهة وAPI في البداية، لأن ذلك يقلل مخاطر المصادقة والهجرة ويتيح rollback إلى Vite بسرعة.

## تحقق حزمة الرفع

أُعيد إنشاء `SEG_PHASE3_DELIVERY.zip` من المشروع المعدل، وتحقق الأرشيف عبر `unzip -t`. يحتوي التسليم على 281 ملفاً، بما في ذلك `package.json` و`pnpm-lock.yaml` و`Dockerfile` و`.dockerignore` و`.env.example` و`DEPLOYMENT.md` و`SEG_NEXTJS_MIGRATION_PLAN.md` و`dist/` وملفات خادم Express وطبقات الأمان. استُبعدت `node_modules` و`.git` و`.env` وملفات السجل.

تم تشغيل `dist/index.js` من نسخة مستخرجة نظيفة بعد توفير الاعتماديات بالطريقة التي تستخدمها منصة البناء. أعاد `/healthz` الحالة `200` مع JSON، وظهرت CSP وPermissions-Policy وX-Request-Id، وعمل Brotli للأصل JavaScript، وظهر `Cache-Control: public, max-age=31536000, immutable` للأصل ذي البصمة. إذا قامت منصة الرفع بتشغيل `pnpm start` دون تثبيت الاعتماديات، فسيفشل التشغيل لأن bundle الخادم يعتمد على حزم `package.json` الخارجية؛ لذلك يجب استخدام `pnpm install --frozen-lockfile` أو مسار Docker المرفق قبل التشغيل.

## خطة الهجرة التفصيلية إلى Next.js

الخطة التنفيذية التفصيلية محفوظة في `SEG_NEXTJS_MIGRATION_PLAN.md`. وهي خطة اختيارية لا تعطل Vite/Express، وتحدد نقل الواجهة تدريجياً مع إبقاء Express/tRPC وManus OAuth وقاعدة البيانات كعقود مستقرة في المرحلة الأولى.

## قرار التسليم

**قرار Phase 3:** تم تنفيذ خيار Option A والتحقق من وظائفه الأساسية، وهو صالح للانتقال إلى staging أو إلى مرحلة مراجعة النشر. لا يُعد الإصدار Production Release نهائياً قبل استكمال أصلَي الأصول المذكورين أو اعتماد manifest مصحح، وتعبئة متغيرات البيئة الحقيقية، وتأكيد HTTPS و`TRUST_PROXY` وHSTS مع منصة النشر.

### References

[1]: `server/_core/production.ts` — Security headers, CSP, rate limiting, 404, and error handling.

[2]: `vite.config.ts` و`client/index.html` — Vite optimization, precompressed assets, chunking, and optional analytics injection.

[3]: `server/_core/logger.ts` و`server/_core/env.ts` — Structured request logging, request IDs, environment parsing, and production validation.

[4]: `server/_core/index.ts` و`server/_core/vite.ts` — Express middleware order, runtime compression, health endpoint, server timeouts, and static cache policy.

[5]: `SEG_NEXTJS_MIGRATION_PLAN.md` — الخطة التنفيذية التفصيلية للهجرة الاختيارية إلى Next.js.
