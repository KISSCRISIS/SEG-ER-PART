# خطة الهجرة المستقبلية إلى Next.js

**المشروع:** SEG — Smart Emergency Guide

**نقطة الانطلاق:** Vite + React 19 + Express 4 + tRPC 11 + Manus OAuth + Drizzle

**الخيار المعتمد:** هجرة تدريجية اختيارية لا تعطل إطلاق Vite/Express الحالي

**الحالة:** خطة مستقبلية ضمن متطلبات Phase 3؛ لا تُنفّذ ضمن هذا التسليم

**إعداد:** Manus AI

## 1. القرار المعماري

لا يُنصح باستبدال Vite/Express دفعة واحدة. المسار الآمن هو إبقاء Express وtRPC كطبقة API وعقود بيانات مستقرة، ثم إدخال Next.js كواجهة أمامية موازية خلف reverse proxy. بعد تثبيت تكافؤ الواجهة والاختبارات، تُنقل الصفحات تدريجياً، ثم يُتخذ قرار منفصل بشأن نقل بعض Route Handlers إلى Next.js.

هذا القرار يقلل نطاق التغيير في المصادقة والجلسات وOAuth وقاعدة البيانات، ويحافظ على مسار rollback واضح إلى النسخة المنشورة الحالية. كما يتوافق مع إرشاد Next.js الرسمي الذي يقترح البدء بتطبيق عميل يعمل داخل App Router ثم اعتماد قدرات Next.js بصورة تدريجية، بدلاً من إعادة كتابة كل المسارات أثناء خطوة واحدة [1].

| طبقة النظام | الوضع الحالي | الهدف المرحلي | قرار الهجرة |
|---|---|---|---|
| واجهة المستخدم | React داخل Vite و`client/src` | Next.js App Router في تطبيق موازٍ | تُنقل الصفحات تدريجياً |
| API | Express + tRPC تحت `/api/trpc` | Express + tRPC في البداية | لا يُنقل في الدفعة الأولى |
| OAuth والجلسة | Manus OAuth وملفات session/cookie الحالية | نفس العقود والكوكيز | الحفاظ عليها دون تغيير |
| قاعدة البيانات | Drizzle وMySQL/TiDB | نفس schema وhelpers | لا توجد إعادة نمذجة أثناء نقل الواجهة |
| الأصول | Manus Storage ومسارات `/manus-storage/` | نفس المسارات أولاً، ثم `next/image` اختيارياً | لا تُنسخ الأصول الكبيرة إلى `public` |
| الأمن | Helmet/CSP في Express | CSP في طبقة Next.js أو proxy بعد اختبارها | انتقال تدريجي مع مقارنة الرؤوس |
| التشغيل | خادم Node/Express | Next.js `next start` خلف reverse proxy | لا يوجد custom server في البداية |

## 2. المبدأ الأساسي: تثبيت العقود قبل نقل الصفحات

قبل إضافة Next.js يجب تجميد قائمة المسارات العامة والمحمية، ونقاط `/api/trpc`، ومسارات OAuth، وأسماء الكوكيز، وسياسات CORS، ورؤوس الأمان، وعقود البيانات التي تعتمد عليها الصفحات. يجب أن يبقى `server/routers.ts` و`server/db.ts` و`drizzle/schema.ts` مصدر الحقيقة أثناء نقل الواجهة.

لا تُنشأ طبقة REST موازية لمجرد الهجرة. تستمر الواجهة الجديدة في استخدام عميل tRPC الحالي أو عميل مشترك يستدعي Express عبر `/api/trpc`. أي تغيير في الإجراء أو schema يجب أن يمر عبر الاختبارات الحالية قبل أن يُستهلك في Next.js.

## 3. المراحل التنفيذية المقترحة

### المرحلة 0 — خط أساس وإغلاق المخاطر الحالية

تُسجّل نسخة Vite/Express الحالية كمرجع قابل للرجوع، مع حفظ نتائج `pnpm check` و`pnpm build` واختبارات Vitest وقياسات `/healthz` وCSP وRate Limiting. تُستكمل أصول المراجعة البصرية المفقودة قبل اعتبار النتائج البصرية معياراً للنسخة الجديدة. لا تبدأ الهجرة قبل أن يكون rollback إلى هذا الخط الأساسي قابلاً للتنفيذ.

**مخرجات المرحلة:** manifest للمسارات، سجل للرؤوس، لقطة للبيئة، قائمة الأصول المعتمدة، وقرار واضح بشأن `TRUST_PROXY` وHSTS.

### المرحلة 1 — إنشاء Next.js كواجهة موازية

يُضاف تطبيق Next.js منفصل، ويفضل أن يكون في مجلد `next-app/` أو مستودع مستقل، بدلاً من خلط ملفات App Router داخل `client/` أثناء أول تجربة. يُستخدم App Router مع `app/layout.tsx` و`app/page.tsx`، ويُنقل محتوى `client/index.html` إلى root layout والـMetadata API. يوضح الدليل الرسمي أن `layout.tsx` هو النظير الأقرب لقالب HTML الجذري في تطبيق Vite [1].

في هذه المرحلة تبقى الواجهة Client-heavy بما يكفي لتقليل الاختلاف السلوكي: تُنقل Providers وTheme وtRPC وواجهات shadcn إلى Client Components عند الحاجة، بينما يُترك layout والصفحات العامة قابلة للتحول لاحقاً إلى Server Components.

**مخرجات المرحلة:** صفحة Home مطابقة بصرياً، إعدادات TypeScript وlint، تشغيل محلي، وproxy إلى Express API دون تغيير backend.

### المرحلة 2 — نقل الصفحات العامة أولاً

تُنقل الصفحة الرئيسية والتسجيل وتسجيل الدخول والصفحات العامة التي لا تعتمد على user-specific data. تُستخدم Next Metadata للعنوان والوصف والأيقونات، مع إبقاء الصور في Manus Storage أو CDN وعدم إدخال الأصول الكبيرة إلى `public`. تُقارن كل صفحة مع لقطة مرجعية ثابتة، ويُفحص responsive behavior عند نقاط الهاتف والسطح المكتبي.

**مخرجات المرحلة:** تكافؤ بصري ووظيفي للصفحات العامة، اختبارات keyboard/focus، وأدلة أن روابط Terms وPrivacy وGET STARTED تعمل.

### المرحلة 3 — نقل shell والصفحات المحمية

بعد تثبيت OAuth، تُنقل Dashboard shell ثم My Home وMy Pathway وLearn وPractice وAtlas وMedical Journal وMy Account على دفعات منفصلة. كل دفعة تستخدم feature flag أو rewrite محدداً، بحيث يمكن إعادة المسار إلى Vite دون إعادة نشر backend.

لا يُفترض أن `My Pathway` أو أي عنصر تنقل هو route مستقل قبل تأكيد العقد البصري والوظيفي؛ يجب تحويل anchor sections الحالية إلى routes فقط عندما تكون الصفحة المستهدفة مكتملة ومختبرة.

### المرحلة 4 — تحسينات Next.js بعد التكافؤ

بعد استقرار النسخة الموازية، يمكن نقل عمليات القراءة العامة إلى Server Components أو Route Handlers حيث تعطي فائدة واضحة. Route Handlers تُعرّف في `app/**/route.ts` وتستخدم Web Request/Response APIs، لكنها لا ينبغي أن تكرر tRPC الحالي أو تتنافس معه في نفس العقد [4].

تُستخدم `next/image` فقط بعد التأكد من أن مصادر Manus Storage وCDN مسجلة في إعدادات الصور، وبعد مقارنة الحجم والزمن وجودة الصور. لا تُنقل الصور كملفات محلية كبيرة إلى `public` لأن ذلك يخالف سياسة إدارة الأصول الحالية للمشروع.

### المرحلة 5 — cutover تدريجي وقرار الإيقاف

يُجرى canary release لمجموعة صغيرة من الزيارات أو لمسارات محددة. تُراقب أخطاء 4xx/5xx، زمن TTFB، زمن تحميل JavaScript، فشل OAuth، أخطاء tRPC، وبلاغات CSP. لا يُوقف Vite/Express إلا بعد مرور فترة مراقبة متفق عليها مع توفر rollback سريع إلى آخر build مستقر.

## 4. استراتيجية الأمن وCSP

### 4.1 أثناء بقاء Express هو API

تبقى رؤوس API وhealth وRate Limiting في Express كما هي في Phase 3. يجب ألا تعتمد حماية API على وجود Next.js؛ إذ يمكن أن يصل العميل مباشرة إلى `/api/trpc` أو OAuth عبر proxy. تظل `helmet` و`X-Request-Id` وlogging ومعالجة الأخطاء في طبقة Express حتى بعد نقل الواجهة.

### 4.2 أثناء تشغيل واجهتين

تُطبّق CSP على الواجهة التي تخدم HTML فعلياً، ويُمنع إرسال سياستين متعارضتين من Express وNext.js إلا بعد توحيدهما. في مرحلة canary يمكن إرسال `Content-Security-Policy-Report-Only` على Next.js لمقارنة الانتهاكات دون كسر المستخدمين، ثم الانتقال إلى CSP enforcement بعد تنظيف التقارير.

### 4.3 اختيار nonce أو سياسة ثابتة

توصية الهجرة الأولى هي الاحتفاظ بسياسة ثابتة قريبة من سياسة Phase 3 ما دامت الواجهة لا تحتاج إلى inline scripts غير قابلة للتحكم. توثيق Next.js يوضح أن nonce-based CSP يتطلب توليد nonce لكل request واستخدام dynamic rendering؛ وهذا يؤثر في caching وCDN وISR ويزيد كلفة الخادم [2]. لذلك لا يُعتمد nonce كقرار تلقائي.

إذا فرضت متطلبات أمنية أو امتثال استخدام nonce، يُستخدم `proxy.ts` أو الطبقة المقابلة في إصدار Next.js لتوليد nonce، ويُجعل المسار ديناميكياً، وتُختبر كل Scripts وStyles وThird-party integrations. أما إذا كانت سياسة ثابتة كافية، فيمكن ضبط CSP عبر `next.config.mjs` أو طبقة reverse proxy، مع مراجعة `script-src` و`style-src` و`connect-src` مقابل Manus OAuth وStorage وUmami [2].

### 4.4 رؤوس الأمان التي يجب الحفاظ عليها

| الرأس | سياسة الهجرة |
|---|---|
| `Content-Security-Policy` | مصدر واحد واضح في كل مرحلة؛ report-only قبل enforcement عند تغيير الواجهة |
| `Permissions-Policy` | منع camera/microphone/geolocation/payment افتراضياً |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | الحفاظ على السياسة الحالية ومراجعتها مع OAuth |
| `Strict-Transport-Security` | تفعيله بعد التأكد من HTTPS الكامل والنطاق الصحيح |
| `X-Request-Id` | توليده في edge/proxy أو Express، وعدم توليده مرتين بلا تنسيق |
| `Cache-Control` | immutable للأصول ذات hash، وno-store أو no-cache للبيانات الشخصية وHTML الديناميكي |

## 5. استراتيجية API وRoute Handlers

يُبقى Express/tRPC هو backend المرجعي في أول إصدار Next.js. بذلك لا تنتقل المصادقة وقاعدة البيانات والتكاملات في الوقت نفسه مع الواجهة. تُستخدم Route Handlers فقط لأحد الأسباب التالية: endpoint خاص بواجهة Next.js ولا يملك عقداً سابقاً، أو proxy آمن لا يكشف secret، أو health/readiness endpoint خاص بالتطبيق الجديد.

لا يُنقل endpoint من tRPC إلى Route Handler إلا بعد وجود contract test يثبت تطابق status codes، شكل البيانات، صلاحيات الوصول، cookies، ومعالجة الأخطاء. Route Handlers في Next.js تدعم GET وPOST وPUT وPATCH وDELETE وHEAD وOPTIONS، ولا تُخزّن تلقائياً إلا عندما يُطلب caching صراحةً [4].

## 6. المصادقة والجلسات ومتغيرات البيئة

تستمر جلسة Manus OAuth نفسها في البداية. يُضبط reverse proxy بحيث يحافظ على مسارات `/api/oauth/callback` و`/api/trpc` والكوكيز و`SameSite` و`Secure` وdomain دون إعادة كتابة غير ضرورية. لا تُنشأ جلسة ثانية خاصة بـNext.js قبل وجود سبب معماري واضح.

تُنقل المتغيرات العامة من `VITE_*` إلى `NEXT_PUBLIC_*` فقط إذا كانت آمنة فعلاً للمتصفح. تبقى `DATABASE_URL` و`JWT_SECRET` و`BUILT_IN_FORGE_API_KEY` وOAuth server secrets server-only. توثيق self-hosting الرسمي يفرق بين متغيرات الخادم ومتغيرات `NEXT_PUBLIC_` التي تُضمّن في حزمة المتصفح أثناء build، كما يوضح إمكانية تقييم متغيرات الخادم وقت التشغيل في dynamic rendering [3].

| المتغير الحالي | المتغير المستهدف | القرار |
|---|---|---|
| `VITE_APP_ID` | `NEXT_PUBLIC_APP_ID` إذا كان معرفاً عاماً | تحقق من عدم كونه سراً |
| `VITE_OAUTH_PORTAL_URL` | `NEXT_PUBLIC_OAUTH_PORTAL_URL` | عام للمتصفح |
| `OAUTH_SERVER_URL` | `OAUTH_SERVER_URL` | server-only |
| `JWT_SECRET` | `JWT_SECRET` | server-only، لا يُضمّن في build |
| `DATABASE_URL` | `DATABASE_URL` | server-only |
| `BUILT_IN_FORGE_API_KEY` | يبقى server-only | ممنوع في Client Component |
| `VITE_FRONTEND_FORGE_API_URL` | `NEXT_PUBLIC_FRONTEND_FORGE_API_URL` | عام إذا كان endpoint غير سري |
| `VITE_ANALYTICS_ENDPOINT` | `NEXT_PUBLIC_ANALYTICS_ENDPOINT` | عام، مع CSP allowlist |
| `VITE_ANALYTICS_WEBSITE_ID` | `NEXT_PUBLIC_ANALYTICS_WEBSITE_ID` | عام، مع تحميل اختياري |

## 7. النشر والاستضافة

الخيار المستهدف هو Node.js أو Docker مع reverse proxy أمام Next.js، وليس static export، لأن SEG يحتاج إلى OAuth وcookies وAPI وhealth checks وسلوك وقت التشغيل. توصي وثائق self-hosting الرسمية بوضع reverse proxy أمام خادم Next.js للتعامل مع الطلبات المشوهة، والاتصالات البطيئة، وحدود payload، وRate Limiting، وبقية الضوابط التشغيلية [3].

إذا شُغّل Next.js على أكثر من instance، يجب توحيد build identifier ومفاتيح Server Functions عند استخدام ميزاتها، وتخطيط cache مشترك أو durable storage عند الحاجة. لا تُنقل هذه التعقيدات إلى الإصدار الأول؛ يبقى Express API ومخزن الجلسات الحاليان المرجع حتى تتضح متطلبات التوسع [3].

## 8. الاختبارات المطلوبة قبل كل cutover

| نوع الاختبار | معيار القبول |
|---|---|
| TypeScript/build | `pnpm check` و`next build` بلا أخطاء |
| Route parity | كل route معتمد يعيد الصفحة الصحيحة أو redirect الصحيح |
| API contract | tRPC/Route Handler يطابق status والبيانات والصلاحيات |
| OAuth | login، callback، session، logout، وحالة انتهاء الجلسة |
| CSP | لا توجد انتهاكات غير مبررة؛ enforcement بعد report-only |
| Security headers | كل الرؤوس المعتمدة موجودة في HTML وAPI |
| Accessibility | keyboard navigation، focus، landmarks، contrast، وARIA |
| Responsive | نقاط الهاتف والسطح المكتبي دون overflow أو crop |
| Performance | مقارنة TTFB وLCP وحجم JS مع خط أساس Vite |
| Rollback | الرجوع إلى Vite يتم عبر تغيير route/proxy أو deployment slot |

## 9. استراتيجية التراجع

يجب أن يظل Vite/Express build الحالي قابلاً للتشغيل طوال مراحل الهجرة. تُستخدم أسماء نشر مستقلة أو deployment slots، مع حفظ build ID وmanifest لكل نسخة. إذا فشل OAuth أو ظهرت انتهاكات CSP أو زادت أخطاء tRPC، يعاد traffic إلى Vite فوراً دون تعديل قاعدة البيانات أو إبطال cookies.

لا تُجرى migration لقاعدة البيانات ضمن cutover الواجهة إلا إذا كانت ضرورية. وإذا تطلبت ميزة Next.js schema جديداً، يجب أن يكون التغيير backward-compatible، وأن يعمل مع الإصدارين خلال فترة الترحيل.

## 10. تعريف الجاهزية للهجرة

لا تُعتبر الهجرة جاهزة للإطلاق إلا عند تحقق الشروط التالية: وجود نسخة Next.js قابلة للبناء والنشر، تكافؤ المسارات العامة والمحمية، نجاح OAuth وtRPC، وجود CSP ورؤوس الأمان على كل طبقة، عدم تسريب متغيرات server-only، نجاح اختبارات الوصول، توفر rollback موثق، وإغلاق فجوات الأصول البصرية المعتمدة.

أما Phase 3 الحالي فيُعد مستوفياً لمتطلب **الخطة المستقبلية** لأن الخطة تفصل بين تثبيت API ونقل الواجهة ونقل الأمان والنشر، وتحدد trade-off واضحاً بين CSP ثابتة وnonce-based CSP. لا يعني ذلك أن تطبيق Next.js بدأ أو أن Vite/Express أصبح قابلاً للإيقاف.

## References

[1]: https://nextjs.org/docs/app/guides/migrating/from-vite "Next.js — How to migrate from Vite"

[2]: https://nextjs.org/docs/app/guides/content-security-policy "Next.js — How to set a Content Security Policy"

[3]: https://nextjs.org/docs/app/guides/self-hosting "Next.js — How to self-host your application"

[4]: https://nextjs.org/docs/app/getting-started/route-handlers "Next.js — Route Handlers"
