# SEG Asset Remediation Investigation Report

**التاريخ:** 2026-08-16

**الوضع:** `READ_ONLY — Investigation Only`

**النطاق:** تحقيق مشكلة P0 الخاصة بـ`21/21` أصلاً عبر `/manus-storage/*` التي تعيد HTTP 500.

**قرار النطاق:** لم يُعدّل أي كود أو CSS أو مسار صورة أو إعداد بيئة أو أصل. لم تُستبدل أصول ولم تُضف placeholders. لم يُنفّذ commit أو push.

> **النتيجة التنفيذية:** السبب المباشر المؤكد لفشل HTTP 500 المحلي هو غياب **Storage/Forge binding** في runtime الحالي، وليس دليلاً على خطأ في أسماء المسارات أو فقدان objects. جميع طلبات الأصول المحلية تُرفض عند شرط التهيئة قبل أن يصل أي طلب إلى Forge؛ لذلك لا يمكن من runtime الحالي إصدار حكم object-level على permission أو missing object.

## 1. ملخص التحقيق

يعمل runtime المحلي من `/home/ubuntu/seg-phase1` عبر Node/Express على `PORT=4318`. أثبت `GET /healthz` أن الخدمة نفسها تعمل وأعاد HTTP 200. في المقابل، أعاد طلب أصل معروف في السجل `500 Internal Server Error` مع `Content-Type: text/html; charset=utf-8` وحجم استجابة 28 بايت، وكان body هو `Storage proxy not configured`.

تم فحص وجود متغيري Forge في shell والعملية النشطة دون طباعة القيم، وكانت النتيجة أن كليهما غير مضبوط. ويستخدم التطبيق الاسمان التاليان تحديداً: `BUILT_IN_FORGE_API_URL` و`BUILT_IN_FORGE_API_KEY`. وجود الاسمين في `.env.example` يثبت أن الحقول متوقعة توثيقياً فقط، ولا يثبت توفر binding فعلي في runtime.

## 2. الأدلة التشغيلية المؤكدة

| الاختبار | النتيجة | الدلالة |
|---|---|---|
| `GET http://127.0.0.1:4318/healthz` | `200 OK`, JSON health response | Node/Express runtime يعمل؛ المشكلة ليست توقف الخدمة ككل. |
| أصل معروف: `/manus-storage/SEG_Primary_Logo_Approved_1f60ebe3.png` | `500`, `text/html`, 28 bytes, `Storage proxy not configured` | فشل binding gate قبل object lookup. |
| جميع مسارات registry الفريدة | `21/21 × 500`, `text/html`, 28 bytes | الفشل شامل ومتطابق، وليس نمطاً خاصاً بأصل واحد. |
| مفتاح غير موجود عمداً | `500`, نفس body والحجم | لا يصل الطلب إلى فحص object existence؛ الرفض يحدث قبل backend. |
| `/manus-storage/` بلا key | `400`, `Missing storage key` | route يعمل، وشرط غياب key منفصل عن شرط binding. |
| البيئة المنشورة: نفس 21 مساراً | `21/21 × 200`, `image/png` بعد اتباع التحويل | المسارات المسجلة والأصول المنشورة قابلة للوصول؛ لا يوجد دليل حالي على أن registry filenames خاطئة. |

تم حفظ الأدلة الخام في `SEG_ASSET_REMEDIATION_INVESTIGATION_EVIDENCE.md`.

## 3. مسار التنفيذ الذي يفسر HTTP 500

في `server/_core/storageProxy.ts`، يعالج route الطلب بهذا الترتيب:

1. يستخرج `key` من `/manus-storage/*`.
2. إذا كان `key` مفقوداً، يعيد HTTP 400.
3. يفحص `ENV.forgeApiUrl` و`ENV.forgeApiKey`.
4. إذا غاب أحدهما، يعيد HTTP 500 مع `Storage proxy not configured` وينهي الطلب.
5. فقط بعد نجاح هذا الشرط يرسل طلباً إلى `v1/storage/presign/get?path=<key>` باستخدام Bearer token.
6. أخطاء Forge اللاحقة تُصنف HTTP 502، ثم يُعاد 307 إلى signed URL عند النجاح.

وفي `server/_core/env.ts` تُقرأ القيم من `process.env.BUILT_IN_FORGE_API_URL` و`process.env.BUILT_IN_FORGE_API_KEY`. وتؤكد `server/storage.ts` أن العقد المقصود للتحميل هو `/manus-storage/{key}` عبر 307 redirect، وأن config missing يُعد خطأً قبل الوصول إلى storage backend.

> **استنتاج:** الطلبات المحلية الـ21 لم تصل إلى Forge في هذه الجولة. لذلك لا يوجد دليل محلي على أن Forge رفض permission أو أن object غير موجود؛ توجد فقط أدلة مؤكدة على أن binding غير متوفر.

## 4. مصدر كل أصل ومسار registry

المصدر أدناه هو **سلطة المصدر البصري داخل مشروع SEG**، وليس إثباتاً مستقلاً لحقوق النشر أو الترخيص الخارجي. كما أن عدم وجود `localFile` لنسخة من بعض الأصول لا يثبت فقدان managed object؛ بل يعني أن نسخة المصدر المحلية أو metadata canonical غير متاحة في الحزمة المفحوصة.

| # | Registry key | Managed path | المصدر/النسخة المسجلة | الحالة والنسخة المحلية |
|---:|---|---|---|---|
| 1 | `primaryLogo` | `SEG_Primary_Logo_Approved_1f60ebe3.png` | Production v1.0 / `01_BRAND_IDENTITY` | APPROVED؛ نسخة محلية موجودة في `SEG_FINAL_PACKAGE/assets/images/` |
| 2 | `heroLogo` | `SEG_Hero_Logo_Heart_Brain_ECG_Approved_c28d10bb.png` | Production v1.0 / `01_BRAND_IDENTITY` | APPROVED؛ نسخة محلية موجودة |
| 3 | `officialBrainHeartMark` | `SEG_Official_Brain_Heart_Mark_Crop_a8cd393c.png` | Later approved crop؛ المصدر canonical والنسخة غير مسجلين بالكامل | APPROVED_SCREEN_SPECIFIC؛ لا توجد `localFile` في manifest الحالي |
| 4 | `officialAppIcon` | `SEG_Official_App_Icon_Crop_4d97e4fa.png` | Later approved crop؛ المصدر canonical والنسخة غير مسجلين بالكامل | APPROVED_SCREEN_SPECIFIC؛ لا توجد `localFile` في manifest الحالي |
| 5 | `brainHeartCore` | `SEG_Brain_Heart_Intelligence_Core_593bc09a.png` | Production v1.0 / `02_MEDICAL_VISUAL_ASSETS` | APPROVED؛ نسخة محلية موجودة |
| 6 | `dashboardBrainHeartCoreClean` | `SEG_Dashboard_Brain_Heart_Core_Clean_Approved_45d2f500.png` | Later approved Dashboard clean-core record؛ semantic version غير مسجل | APPROVED_PLACEMENT؛ لا توجد نسخة محلية ظاهرة في الحزمة الحالية |
| 7 | `emergencyResponse` | `SEG_Emergency_Response_Visual_21a05181.png` | Production v1.0 / `02_MEDICAL_VISUAL_ASSETS` | APPROVED؛ نسخة محلية موجودة |
| 8 | `anatomyHologram` | `SEG_Human_Anatomy_Hologram_c23d102e.png` | Production v1.0 / `02_MEDICAL_VISUAL_ASSETS` | APPROVED؛ نسخة محلية موجودة |
| 9 | `medicalAi` | `SEG_Medical_AI_Assistant_7f7b8722.png` | Production v1.0 / `02_MEDICAL_VISUAL_ASSETS` | APPROVED؛ نسخة محلية موجودة |
| 10 | `medicalJournal` | `SEG_MedicalJournal_Reference_Final_6449012a.png` | Standalone Medical Journal reference | REFERENCE_ONLY ومقيّد؛ نسخة محلية موجودة، وليس production UI asset أو medical-content source |
| 11 | `atlasVisualAssetsHero` | `SEG_ATLAS_VISUAL_ASSETS_HERO_v1.0_b0cd2819.png` | Approved Atlas attachment / `04_ATLAS_VISUAL_ASSETS`, v1.0 | APPROVED؛ checksum مسجل في manifest، ولا توجد نسخة بهذا الاسم ظاهرة في الحزمة المحلية المفحوصة |
| 12 | `registrationHeartStage` | `SEG_Registration_Approved_Heart_ECG_Stage_4079b3c9.png` | Approved Registration stage؛ canonical source metadata pending | APPROVED_SCREEN_SPECIFIC؛ لا توجد `localFile` في manifest الحالي |
| 13 | `loginOfficialLockup` | `SEG_Login_Official_Lockup_Transparent_Approved_d46ab5c8.png` | Approved Login stage؛ canonical source metadata pending | APPROVED_SCREEN_SPECIFIC؛ لا توجد `localFile` في manifest الحالي |
| 14 | `loginHeartStage` | `SEG_Login_Heart_Intelligence_Stage_Approved_48b67481.png` | Approved Login stage؛ canonical source metadata pending | APPROVED_SCREEN_SPECIFIC؛ لا توجد `localFile` في manifest الحالي |
| 15 | `loginBrainHeartStage` | `SEG_Login_Brain_Heart_Intelligence_Stage_Approved_0602fd64.png` | Approved Login stage؛ canonical source metadata pending | APPROVED_SCREEN_SPECIFIC؛ لا توجد `localFile` في manifest الحالي |
| 16 | `landingOfficialLockup` | `seg-landing-official-lockup-transparent_a6d5e55a.png` | Approved Landing stage؛ canonical source metadata pending | APPROVED_SCREEN_SPECIFIC؛ لا توجد `localFile` في manifest الحالي |
| 17 | `landingAnatomyStage` | `seg-landing-anatomy-stage-transparent_a08ed320.png` | Approved Landing stage؛ canonical source metadata pending | APPROVED_SCREEN_SPECIFIC؛ لا توجد `localFile` في manifest الحالي |
| 18 | `landingBrainHeartStage` | `seg-landing-brain-heart-stage-transparent_d3aea1f3.png` | Approved Landing stage؛ canonical source metadata pending | APPROVED_SCREEN_SPECIFIC؛ لا توجد `localFile` في manifest الحالي |
| 19 | `landingEmergencyResponseStage` | `seg-landing-emergency-response-stage-transparent_b5e38eef.png` | Approved Landing stage؛ canonical source metadata pending | APPROVED_SCREEN_SPECIFIC؛ لا توجد `localFile` في manifest الحالي |
| 20 | `landingMedicalAssistantStage` | `seg-landing-medical-assistant-stage-transparent_55dbded0.png` | Approved Landing stage؛ canonical source metadata pending | APPROVED_SCREEN_SPECIFIC؛ لا توجد `localFile` في manifest الحالي |
| 21 | `landingProfileThumbnail` | `seg-landing-profile-thumbnail_ae4a01c8.png` | Approved Landing stage؛ canonical source metadata pending | APPROVED_SCREEN_SPECIFIC؛ لا توجد `localFile` في manifest الحالي، ولا implicit reuse خارج Landing |

سجل التطبيق في `client/src/lib/seg-assets.ts` يطابق managed paths أعلاه. كما أن `assets_manifest.json` يحدد سياسة أن النسخ المحلية هي لأغراض release-audit فقط، وأن media المنشورة تستمر باستخدام managed URLs.

## 5. تصنيف سبب الفشل

| الفرضية | الحكم | الدليل |
|---|---|---|
| Storage binding/configuration | **مؤكد — السبب المباشر للـ500 المحلي** | متغيرا Forge غير مضبوطين؛ body يطابق شرط `storageProxy.ts` حرفياً؛ كل الأصول تتلقى نفس الاستجابة. |
| Path/filename mismatch | **غير مؤيد كسبب للفشل الحالي** | جميع المسارات المنشورة الـ21 نجحت بـ`200 image/png`؛ route المحلي لا يصل أصلاً إلى Forge ليفحص path. |
| Permission/auth to backend | **غير قابل للحسم حالياً** | لا يوجد اتصال Forge من runtime المحلي؛ أي 401/403 محتمل لا يمكن رصده قبل توفير binding. |
| Missing object | **غير مثبت وغير قابل للحسم محلياً** | المفتاح المعروف والمفتاح الاصطناعي يمران بنفس gate المبكر؛ البيئة المنشورة أعادت `200` لجميع المسارات وقت التحقيق. |
| Frontend registry defect | **غير مؤيد كسبب مشترك** | registry يطابق URLs التي نجحت في البيئة المنشورة. تبقى فجوات provenance/metadata لبعض الأصول، لكنها ليست سبب HTTP 500 المحلي. |
| Runtime stopped or static-only | **غير مؤيد** | `/healthz` أعاد 200، و`storageProxy` مسجل في Node/Express قبل Vite/static serving. |

## 6. خطة الإصلاح اللاحقة — غير منفذة

هذه الخطة ليست تفويضاً بالتعديل. يجب تنفيذها فقط بعد قرار منفصل يحدد بيئة التشغيل ومصدر Forge المصرح به ويحافظ على الأسرار خارج المستودع.

### أ. استعادة binding في runtime

يجب أولاً توفير `BUILT_IN_FORGE_API_URL` و`BUILT_IN_FORGE_API_KEY` عبر آلية secrets/runtime المعتمدة، لا عبر commit أو ملف عام. يجب التحقق من أن القيم تصل إلى عملية Node نفسها، مع منع طباعة المفتاح في logs أو التقارير.

**الملفات/الحدود المحتملة:**

| النطاق | الملف أو السطح | الغرض المحتمل لاحقاً |
|---|---|---|
| Runtime configuration | إعدادات بيئة التشغيل خارج المستودع | حقن Forge URL/key بأمان؛ هذا هو المرشح الأول، وليس تغيير registry. |
| `server/_core/env.ts` | قراءة الأسماء الحالية | تحقق فقط من contract؛ لا حاجة متوقعة لتغيير الأسماء. |
| `server/_core/storageProxy.ts` | route الحالي | لا يُعدّل إلا إذا أظهر اختبار binding صالح خللاً في status handling أو redirect. الأدلة الحالية لا تثبت الحاجة إلى تغيير. |
| `server/storage.ts` | storage contract | مراجعة اتساق presign path بعد نجاح binding؛ لا تغيير مطلوب من الأدلة الحالية. |
| `.env.example` | توثيق أسماء المتغيرات فقط | تعديل توثيقي محتمل، دون قيم أو أسرار، وفقط إذا صدر تفويض مستقل. |

### ب. اختبار backend بعد توفير binding

بعد توفير binding في بيئة معتمدة، يجب اختبار أصل معروف واحد أولاً. النجاح المتوقع لمسار proxy هو وصوله إلى Forge ثم إعادة `307` إلى signed URL، وبعد اتباع التحويل يجب أن يعيد object `200 image/png`. بعد ذلك يجب اختبار جميع الأصول الـ21، مع تسجيل status classes فقط وعدم تسجيل signed URLs أو Bearer tokens.

يجب اختبار مفتاح غير موجود بشكل منفصل لتحديد استجابة Forge الفعلية، واختبار حالة permission إن كانت متاحة عبر صلاحيات بيئة آمنة. لا يجوز استنتاج missing object أو permission من فشل binding الحالي.

### ج. تحقق registry/provenance بعد نجاح storage

إذا نجح backend لجميع الأصول، تبقى فجوة metadata مستقلة لبعض crop/clean وLogin/Registration/Landing stage assets. يجب توثيق source location وversion وapproval وusage scope لكل أصل قبل أي إعادة استخدام أو نقل. لا يجوز إنشاء assets بديلة أو استنتاج مصدر مفقود من اسم الملف وحده.

### د. تحقق frontend بصرياً

بعد نجاح اختبار backend فقط، يعاد فتح الصور في Landing/Login/Register والواجهات المصرح بها للتأكد من `naturalWidth > 0` ومن عدم ظهور placeholders أو تغير التصميم. يجب إبقاء Visual Freeze وOAuth وdatabase وmedical-content governance خارج نطاق هذا الإصلاح.

## 7. ما لم يُنفذ وما بقي حاجزاً

لم يتم تعديل `storageProxy.ts` أو `env.ts` أو `storage.ts` أو `seg-assets.ts`. لم يتم تغيير أي مسار، ولم يتم تنزيل أو نسخ أو استبدال أي أصل. لم تتم إضافة fallback أو placeholder، ولم تُمس المصادقة أو OAuth أو قاعدة البيانات أو المحتوى الطبي.

العائق الحالي محدد: **runtime المحلي يحتاج Forge storage binding صالحاً قبل إمكان فحص object-level**. أما permission وmissing object فهما أسئلة لاحقة لا يمكن تصنيفها بأمان قبل عبور configuration gate.

## 8. الملفات الناتجة

| الملف | الحالة |
|---|---|
| `SEG_ASSET_REMEDIATION_INVESTIGATION_REPORT.md` | هذا التقرير النهائي؛ جديد، توثيقي فقط |
| `SEG_ASSET_REMEDIATION_INVESTIGATION_EVIDENCE.md` | سجل الأدلة التشغيلية الخام؛ جديد، توثيقي فقط |
| `SEG_ASSET_AUDIT_RESULTS.json` | سجل Asset Audit السابق؛ لم يُعدّل |
| `client/src/lib/seg-assets.ts` | مرجع registry؛ لم يُعدّل |
| `server/_core/storageProxy.ts` | مرجع route؛ لم يُعدّل |
| `server/_core/env.ts` | مرجع environment contract؛ لم يُعدّل |
| `server/storage.ts` | مرجع storage contract؛ لم يُعدّل |

## References

[1]: file:///home/ubuntu/seg-phase1/SEG_ASSET_AUDIT_RESULTS.json "SEG Asset Audit Results"

[2]: file:///home/ubuntu/seg-phase1/SEG_MOBILE_BASELINE_ASSET_AUDIT_REPORT.md "SEG Mobile Baseline and Asset Audit Report"

[3]: file:///home/ubuntu/seg-phase1/client/src/lib/seg-assets.ts "SEG application asset registry"

[4]: file:///home/ubuntu/seg-phase1/server/_core/storageProxy.ts "SEG storage proxy route"

[5]: file:///home/ubuntu/seg-phase1/server/_core/env.ts "SEG runtime environment contract"

[6]: file:///home/ubuntu/seg-phase1/server/storage.ts "SEG shared storage helper contract"

[7]: file:///home/ubuntu/webdev-static-assets/SEG_FINAL_PACKAGE/assets_manifest.json "SEG production asset manifest"

[8]: file:///home/ubuntu/seg-phase1/SEG_VISUAL_ASSET_REGISTRY_FINAL_REPORT.md "SEG visual asset registry final report"

[9]: file:///home/ubuntu/seg-phase1/SEG_ASSET_INVENTORY.md "SEG asset inventory and source authority"

[10]: https://seg-guide-bjjkqn7t.manus.space "Published SEG environment used for read-only asset cross-check"

---

**Report status:** Complete — `READ_ONLY Asset Remediation Investigation`; no remediation executed.
