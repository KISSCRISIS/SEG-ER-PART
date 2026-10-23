# SEG — جرد الأصول البصرية

**STATUS:** `SEG_ASSET_INVENTORY_MODE / READ_ONLY`

| الحقل | النتيجة المدعومة بالدليل |
|---|---|
| الدليل | فُحصت ملفات المشروع المشتركة في `/home/ubuntu/projects/yarab-4d75d104/`، وفهرس الحزمة الإنتاجية `SEG_FINAL_ASSET_INDEX_v1.0.json` داخل `SEG_FINAL_VISUAL_ASSETS_PACKAGE_v1.0_PRODUCTION.zip`، ومحتويات حزم الإنتاج/المراجع/نظام التصميم، وسجل الأصول المدار `client/src/lib/seg-assets.ts`. |
| الحالة الحالية | تتوافر حزمة إنتاج بصرية v1.0، حزمة مراجع v1.3، حزمة نظام تصميم، مراجع مستقلة ووثائق حوكمة، وسجل تطبيق يعرّف 20 مسار أصل مدار. توفر هذه المصادر أصول الهوية الرئيسية وأربعة أصول طبية ومرجعاً بصرياً كاملاً للتسع شاشات، لكنه لا يوفر مكتبة أصول منفصلة مكتملة لكل شاشة داخلية. |
| التغييرات المخطط لها | **لا شيء.** لا كود، أصول، مسارات، مصادقة، قاعدة بيانات، أو بنية تغيرت. |
| المخاطر | **متوسطة.** المصدر البصري معرّف بوضوح، لكن الملكية القانونية والترخيص وملفات الأصول المنفصلة لبعض الواجهات، خصوصاً Medical Journal وLearn وMy Pathway وPractice، لا يمكن إثباتها من الفهارس/اللوحات وحدها. |
| التحقق | تم التحقق من بنية الحزم، فهرس إنتاج v1.0، وفئات سجل الأصول المدار. لم تُجرَ عملية استخراج، تحميل، أو تعديل للأصول. |
| الخطوة التالية | استخدام هذا الجرد كـ intake مرجعي فقط؛ لا يبدأ أي تنفيذ داخلي قبل تسليم الأصول المنفصلة المعتمدة والتفويض الصريح حيثما تقتضي الخطة. |

## سلطة المصدر والملكية

> **تنبيه الملكية:** تصنيف «المالك/المصدر» أدناه يصف **سلطة المصدر البصري داخل مشروع SEG**، ولا يشكّل إثباتاً لملكية حقوق النشر أو ترخيصاً للاستخدام الخارجي. يلزم إثبات منفصل للحقوق عند استخدام أصول لم تُرفق ملفات مصدرها أو بيانات ترخيصها.

| الأولوية | المصدر المتاح | الغرض المصرح به | أهلية الاستخدام |
|---:|---|---|---|
| 1 | `SEG_FINAL_VISUAL_ASSETS_PACKAGE_v1.0_PRODUCTION.zip` | **السلطة البصرية الإنتاجية الأساسية**؛ تحسم التعارضات. | أصول الهوية والطبية المضمنة قابلة لإعادة الاستخدام فقط في حدود المرجع والموافقة. مراجع الشاشات ليست بديلاً عن مكوّنات أو أصول منفصلة. |
| 2 | `SEG-Design-System.zip` | Tokens، مواصفات، CSS، امتداد Tailwind، وإرشادات handoff. | مرجع التنفيذ البصري. تحتوي شجرة مجلدات `assets/` فارغة من ملفات أصل مفردة عند الفحص؛ لا تقدم مكتبة صور بديلة. |
| 3 | `SEG_FINAL_VISUAL_REFERENCE_PACKAGE_COMPLETE_v1.3.zip` | حزمة مرجعية **مكمّلة** للتصفح والمقارنة. | لا تتجاوز v1.0 ولا تستبدل أي أصل إنتاجي. |
| 4 | مراجع مستقلة ووثائق مشتركة | `SEG_MedicalJournal_Reference_Final.png` وملفات الحوكمة/القبول. | مرجع بصري أو توثيقي فقط، وليس أصلاً إنتاجياً منفصلاً ما لم يرد اعتماد ملفه كأصل. |
| 5 | سجل التطبيق `seg-assets.ts` | مسارات أصول مرفوعة/مدارة مستخدمة أو مهيأة للاستخدام في التطبيق الحالي. | يعكس التوفر التقني في المشروع، وليس مصدراً أعلى من حزمة الإنتاج أو دليلاً مستقلاً على الحقوق. |

## الأصول الإنتاجية الموجودة

| الفئة | الأصل المتاح | المصدر البصري | الحالة | قابلية إعادة الاستخدام |
|---|---|---|---|---|
| Brand | `SEG_Primary_Logo_Approved.png` | Production v1.0، قسم `01_BRAND_IDENTITY`. | موجود؛ ومسجل مداراً كـ `primaryLogo`. | **نعم**، للشعار الرئيسي حسب مواضع المرجع. |
| Brand | `SEG_Hero_Logo_Heart_Brain_ECG_Approved.png` | Production v1.0، قسم `01_BRAND_IDENTITY`. | موجود؛ ومسجل مداراً كـ `heroLogo`. | **نعم**، لقفلية Hero/Auth حيث يطابق المرجع. |
| Brand | `SEG_Logo_Guidelines_Board.png` | Production v1.0. | موجود. | **لا**؛ لوحة إرشاد لا أصل واجهة. |
| Medical | `SEG_Brain_Heart_Intelligence_Core.png` | Production v1.0، قسم `02_MEDICAL_VISUAL_ASSETS`. | موجود؛ ومسجل كـ `brainHeartCore`. | **نعم**، فقط للمواضع المرجعية المعتمدة. |
| Medical | `SEG_Human_Anatomy_Hologram.png` | Production v1.0. | موجود؛ ومسجل كـ `anatomyHologram`. | **نعم**، في السياقات المعتمدة. |
| Medical | `SEG_Medical_AI_Assistant.png` | Production v1.0. | موجود؛ ومسجل كـ `medicalAi`. | **نعم**، في السياقات المعتمدة. |
| Medical | `SEG_Emergency_Response_Visual.png` | Production v1.0. | موجود؛ ومسجل كـ `emergencyResponse`. | **نعم**، في السياقات المعتمدة. |
| Screen reference | تسعة مراجع شاشات: Login، My Home، My Pathway، Learn، Practice، Drug Reference، Landing، Registration، Medical Journal. | Production v1.0، قسم `04_SCREEN_REFERENCES`. | موجودة. | **لا كأصول واجهة**؛ تستخدم للمقارنة فقط. |
| Handoff | `SEG_FINAL_ASSET_INDEX_v1.0.json` و`README.txt`. | Production v1.0، `06_AI_HANDOFF_DOCUMENTS`. | موجود. | **نعم كتوثيق**؛ لا كأصول مرئية. |

## أصول مسجلة ومدارة وقابلة لإعادة الاستخدام

هذه القائمة لا تمنح سلطة بصرية جديدة؛ إنها توضح ما هو متاح تقنياً عبر `segAssets` في التطبيق الحالي.

| مجموعة السجل | العناصر | مصدر/وضع معروف | قرار إعادة الاستخدام |
|---|---|---|---|
| Production-aligned brand/medical | `primaryLogo`، `heroLogo`، `brainHeartCore`، `emergencyResponse`، `anatomyHologram`، `medicalAi`. | تتطابق أسماؤها مع عناصر Production v1.0. | قابلة لإعادة الاستخدام فقط حيث تؤكد مرجعية الشاشة موضعها. |
| Approved crop/clean variants | `officialBrainHeartMark`، `officialAppIcon`، `dashboardBrainHeartCoreClean`. | نسخ مقصوصة/نظيفة مدارة نشأت من اعتماد بصري لاحق؛ لا تظهر في فهرس Production v1.0 كملفات اسمية مستقلة. | قابلة لإعادة الاستخدام في المواضع التي اعتمدت لها فقط؛ لا تُعمم على شاشات أخرى. |
| Login-specific stages | `loginOfficialLockup`، `loginHeartStage`، `loginBrainHeartStage`. | أصول إدارة مخصصة لتطبيق Login المعتمد. | قابلة لإعادة الاستخدام داخل Login فقط ما لم يرد اعتماد صريح جديد. |
| Registration-specific stage | `registrationHeartStage`. | أصل مخصص لتطبيق Registration المعتمد. | قابل لإعادة الاستخدام داخل Registration فقط. |
| Landing-specific stages | `landingOfficialLockup`، `landingAnatomyStage`، `landingBrainHeartStage`، `landingEmergencyResponseStage`، `landingMedicalAssistantStage`، `landingProfileThumbnail`. | أصول مخصصة لتطبيق Landing المعتمد. | قابلة لإعادة الاستخدام داخل Landing فقط. |
| Medical Journal reference | `medicalJournal`. | لقطة مرجع Medical Journal كاملة، لا أصل محتوى منفصل. | **غير قابل لإعادة الاستخدام كواجهة**؛ للمقارنة البصرية فقط. |

## الأصول المفقودة

| المجال | الأصول/الملفات المفقودة | الدليل | الأثر |
|---|---|---|---|
| Medical Journal | ملفات شعار Medical Journal، صور Hero المنفصلة، SVG للأيقونات، صور بطاقات المقالات، الخلفيات، الرسوم التوضيحية، وحالات Empty/Loading؛ مع manifest. | حزمة Production v1.0 تتضمن مرجع شاشة فقط، بينما لوحتا V1/V2 المعروضتان لم تُسلَّما كأرشيف ملفات فردية. | **حاجب تنفيذ.** لا يستبدل أي منها بأصل مولد أو generic. |
| Learn | صور الوحدات، الصور المصغرة، وأصول مناطق التعلم المنفصلة. | مرجع Learn موجود، لكن لا توجد مجموعة `03_LEARN_ASSETS` أو ما يعادلها في فهرس Production v1.0. | **حاجب تنفيذ** كما توثق خطة Learn. |
| My Pathway | Hero Journey، مراحل/بطاقات المسار، صورة الملف الشخصي، وأصول analytics/overview المنفصلة. | المرجع موجود فقط في Production v1.0. | **حاجب تنفيذ** كما توثق خطة My Pathway. |
| Practice | Hero البيئة السريرية، Practice Mode cards، Skills Labs، صور النشاط/الأيقونات المنفصلة. | المرجع موجود فقط في Production v1.0؛ لا يوجد مجلد أصول Practice مستقل في الفهرس. | **حاجب تنفيذ**؛ Drug Reference ممنوع من نطاق Practice. |
| System asset library | ملفات فعلية داخل `SEG-HANDOFF/assets/logos|icons|images`. | الفحص أظهر المجلدات فقط من دون ملفات أصلية. | لا يجوز افتراض وجودها أو إعادة إنشائها. |
| Legal and content data | ملفات ترخيص، attribut​ion، والمحتوى التحريري/الطبي المعتمد المرتبط بالبطاقات والمقالات. | لا تظهر في الفهرس المفحوص أو سجل التطبيق. | **حاجب لنشر محتوى أو تفاعل طبي فعلي.** |

## أصول مستبعدة أو غير مؤهلة

| العنصر | المصدر | قرار الاستخدام |
|---|---|---|
| `SEG_DrugReference_Approved_Reference.png` | Production v1.0. | **مرجع فقط، لا تنفيذ أو قبول freeze.** Drug Reference يحتاج تدقيقاً وإعادة تصميم وموافقة مستقلة. |
| `SEG_DrugReference_Redesign_Candidate.png` | Reference v1.3 المكمّل. | **غير مؤهل**؛ مرشح إعادة تصميم وليس مرجعاً نهائياً. |
| `SEG_Logo_Guidelines_Board.png`، index/collection/authority boards | Production v1.0. | توثيق ولوحات، لا تُعرض كتصميم واجهة. |
| أي لقطة شاشة كاملة | Production/reference/standalone. | لا تستخدم كخلفية أو UI مسطح؛ تصلح للمقارنة فقط. |

## قرار الجرد

`READY FOR ASSET-LEVEL REUSE WITHIN APPROVED SCOPES / INTERNAL-SCREEN IMPLEMENTATION REMAINS BLOCKED`

الأصول الموجودة تدعم صيانة الصفحات المعتمدة بالفعل فقط. أما Learn وMy Pathway وPractice وMedical Journal فتحتاج أصولاً إنتاجية منفصلة ومصدر محتوى/تفاعل معتمداً قبل أي تنفيذ.
