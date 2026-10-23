# PROJECT_RESTART_INSTRUCTIONS

## Objective

استعادة مشروع SEG من حزمة الاستمرارية إلى بيئة جديدة دون فقد الملفات أو القرارات أو حدود التنفيذ.

## Restore sequence

1. استخرج `SEG_PROJECT_CONTINUITY_PACKAGE_FINAL.zip` إلى مجلد عمل جديد؛ لا تستخرج فوق نسخة موجودة.
2. اقرأ `SEG_PROJECT_CONTINUITY_PACKAGE_FINAL.md` ثم `02_EXECUTION_HISTORY/LAST_MANUS_STATE.md`.
3. اقرأ `04_PROJECT_GOVERNANCE/SEG_MASTER_PROJECT_STATE.md` و`SEG_CHANGE_CONTROL_RULES.md` قبل تعديل أي ملف.
4. راجع `05_RECOVERY_AND_TRANSFER/SOURCE_OF_TRUTH_MAP.md` لتحديد المرجع المناسب لكل نوع من القرارات.
5. استعد المشروع المنظم من `SEG_TRANSFER_BUNDLE.zip` أو `SEG_PHASE3_DELIVERY.zip` بحسب الغرض؛ استخدم الحزمة الشاملة للحفظ المرجعي والحزمة المركزة للنشر.
6. ثبّت الاعتماديات عبر `pnpm install --frozen-lockfile` في بيئة موثوقة، ثم شغّل `pnpm check` و`pnpm build`.
7. نفّذ فقط الأمر التالي المعلّم كـPending في `NEXT_PENDING_COMMANDS.md` بعد تسجيل تفويض واضح.
8. حدّث `LAST_MANUS_STATE.md` و`CURRENT_STATUS_CHECKLIST.md` بعد ظهور الدليل، ولا تضع علامة Completed بالاستنتاج.

## Recovery safeguards

لا ترفع `.env` أو مفاتيح OAuth أو مفاتيح قاعدة البيانات أو ملفات أسرار إلى مستودع عام. لا تشغّل أي package script من أصول غير موثوقة قبل مراجعتها. لا تغيّر المسارات أو المصادقة أو قاعدة البيانات أو المحتوى الطبي أثناء مجرد الاستعادة.

## If deployment is the goal

استخدم `DEPLOYMENT.md` داخل الحزمة، وشغّل نسخة Node/Express أو Docker. لا ترفع `dist/public` وحده إذا كان المطلوب تفعيل `/healthz` وCSP وRate Limiting وسجلات الخادم.

## If the task is interrupted

أوقف عمليات الاختبار المؤقتة، احفظ آخر أمر ونتيجته، اترك الملفات الأصلية دون overwrite، ثم استأنف من `LAST_MANUS_STATE.md`.
