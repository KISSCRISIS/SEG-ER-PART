# SEG Content Next Steps

## Step 1 — Create the structure

أنشئ مجلدات `SEG_CONTENT_LIBRARY` وملف schema وmanifest وقوالب السجل وسجل التدقيق. هذه الخطوة بنيوية فقط ولا تحتوي على claims أو مقالات أو مراجع حقيقية.

## Step 2 — Receive a governed source package

استقبل ملفات أو روابط المصدر مع metadata وversion وchecksum وحقوق الاستخدام. يجب أن تكون الحزمة قابلة للتتبع إلى مالك أو ناشر واضح.

## Step 3 — Run READ_ONLY intake review

افحص اكتمال الحقول، source، references، rights، taxonomy، medical reviewer، وaudit trail. سجّل النواقص دون تعديل المحتوى.

## Step 4 — Obtain separate approval

لا تنتقل المادة إلى `approved` إلا بعد قرار مراجعة مستقل وموثق. يجب أن يكون قرار التفعيل منفصلاً عن قرار التجميد البصري.

## Step 5 — Implement a reversible adapter

بعد الموافقة فقط، اربط السجلات المعتمدة بالواجهة عبر adapter قابل للاختبار والتراجع، مع إبقاء Journal empty state كمسار fallback.

## Stop conditions

توقف إذا كان المصدر غير قابل للتثبت، أو كانت الحقوق غير واضحة، أو لم توجد مراجعة مسؤولة، أو ظهر تعارض في taxonomy، أو احتاج العمل إلى تعديل المصادقة أو قاعدة البيانات دون قرار جديد.
