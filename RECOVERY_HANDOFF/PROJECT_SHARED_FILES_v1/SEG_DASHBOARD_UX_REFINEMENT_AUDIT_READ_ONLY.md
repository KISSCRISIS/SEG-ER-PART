# SEG Dashboard UX Refinement Audit — READ_ONLY

**تاريخ التدقيق:** 17 أغسطس 2026

**النطاق:** Dashboard authenticated surface على mobile وdesktop، مع فحص Light/Dark وresponsive layout وanchor navigation وaccessibility indicators.

**القرار:** READ_ONLY — لم يتم تعديل أي ملف مصدر، ولم يتم إنشاء Patch أو Commit أو Push.

> هذا التقرير يحدد الفجوات المرصودة أو المرشحة فقط. لا يوافق على أي إصلاح ولا يفعّل أي تغيير بصري.

## 1. حالة المصدر والحوكمة

تم فحص النسخة المحلية `/home/ubuntu/seg-manus-status` على الفرع `main` عند commit `e2e7ee5`. كانت حالة worktree قبل التدقيق وبعده متطابقة: يوجد تعديل سابق على `client/src/index.css` وإضافات غير متتبعة خاصة بـ UI Patch 1، وكلها سبقت هذا التدقيق. لم يضف Dashboard audit أي تعديل إلى هذه الحالة.

الملفات التي تمت قراءتها فقط ضمن نطاق Dashboard هي `client/src/pages/DashboardPage.tsx` و`client/src/components/DashboardLayout.tsx` و`client/src/index.css`، إضافة إلى تقرير `SEG_DASHBOARD_UX_FINAL_REPORT.md` وتقارير الاستمرارية ذات الصلة. لم يُلمس OAuth أو قاعدة البيانات أو المحتوى الطبي أو مسارات الأصول.

## 2. مصادر القياس

| المصدر | الاستخدام | النتيجة |
|---|---|---|
| `SEG_DASHBOARD_UX_FINAL_REPORT.md` | baseline UX سابق | كان القرار السابق PASS ضمن السطح المجمد |
| `DashboardPage.tsx` | تركيب الأقسام، grids، الأصول، الأحجام | يثبت التحولات الحالية بين mobile وdesktop |
| `DashboardLayout.tsx` | drawer/rail، header، anchors، active state | يثبت سلوك التنقل الحالي ومناطق الفجوة المنطقية |
| `index.css` | breakpoints، overflow، focus، Light/Dark overrides | يثبت القياسات الساكنة ونقاط التباين المحتملة |
| runtime المنشور | تحقق بصري حي على جلسة authenticated | desktop مستقر؛ Light/Dark تم تبديلهما وإرجاع Dark |
| runtime المحلي | تحقق من بوابة الوصول | بقي عند auth gate؛ لم يتم تجاوز المصادقة |

الرابط المستخدم للـ runtime المنشور هو [`seg-guide-bjjkqn7t.manus.space/dashboard`](https://seg-guide-bjjkqn7t.manus.space/dashboard). لم تُرسل بيانات دخول ولم تُجرَ عملية تسجيل دخول أو تغيير بيانات.

## 3. القياسات الساكنة

الحسابات التالية مشتقة من CSS وTailwind classes الحالية، وليست بديلًا عن screenshot authenticated على جهاز mobile حقيقي.

| Viewport | Shell | Sidebar | Main content بعد padding | Home grid | Pathway/Learn/Practice | Journal | Quick Actions | Modules | Atlas | Growth Core min-height |
|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 320px | mobile drawer | 184px drawer، خارج التدفق | 288px | 1 عمود | 1 عمود | 1 عمود | 2 أعمدة | 1 عمود | 2 أعمدة | 390px |
| 360px | mobile drawer | 184px drawer، خارج التدفق | 328px | 1 عمود | 1 عمود | 1 عمود | 2 أعمدة | 1 عمود | 2 أعمدة | 390px |
| 390px | mobile drawer | 184px drawer، خارج التدفق | 358px | 1 عمود | 1 عمود | 1 عمود | 2 أعمدة | 1 عمود | 2 أعمدة | 390px |
| 430px | mobile drawer | 184px drawer، خارج التدفق | 398px | 1 عمود | 1 عمود | 1 عمود | 2 أعمدة | 1 عمود | 2 أعمدة | 390px |
| 1280px | desktop rail | 184px rail | 1056px | 12 عمودًا | عمودان | 3 أعمدة | 6 أعمدة | 3 أعمدة | 3 أعمدة | 390px |
| 1440px | desktop rail | 184px rail | 1216px | 12 عمودًا | عمودان | 3 أعمدة | 6 أعمدة | 3 أعمدة | 3 أعمدة | 418px |

القواعد الداعمة لهذه النتائج هي: `lg:flex` للسطح المكتبي، `w-[184px]` للـ rail/drawer، `main p-4 sm:p-5`، `xl:grid-cols-12` لـ My Home، و`@media (max-width: 640px)` لتصغير Growth Core والأصول الداخلية. كما أن `.seg-app` يملك `overflow-x: clip` و`min-w-0` على الحاوية الرئيسية، وهو دفاع ضد horizontal overflow لكنه قد يخفي overflow بدل إظهاره بصريًا؛ لذلك لا يُعتبر وحده إثباتًا نهائيًا لسلامة mobile.

## 4. نتيجة runtime على desktop

تم فتح Dashboard المنشور في جلسة authenticated مستقرة للمستخدم العرضي `Dr. Ahmed`. في أول viewport بعرض المتصفح الحالي، ظهر الـ fixed/sticky header، الـ desktop rail، greeting، Emergency Action، role card، My Progress Overview، Professional Growth Core، Upcoming Learning، وRecent Activity. لم يُلاحظ خروج أفقي واضح في هذا viewport.

تم اختبار مرساة `Learn`. بعد تصحيح target العنصر المرئي، تحركت الصفحة إلى موضع القسم وسجل المتصفح `pixels above viewport: 2674` مع بقاء المحتوى في DOM وظهور `Return to learning`. هذا يثبت أن handler التنقل يعمل. في المقابل، التقطت أداة المتصفح viewport شبه فارغ بصريًا عند موضع المرساة رغم وجود المحتوى النصي؛ صُنفت النتيجة كفجوة evidence/paint غير محسومة، وليست عيب layout مؤكدًا.

## 5. نتيجة Light/Dark

| الحالة | النتيجة |
|---|---|
| Dark desktop | PASS مبدئي؛ البنية والأقسام الأساسية واضحة، والهوية الحالية محفوظة |
| Light desktop | Candidate gap؛ ظهرت نصوص ثانوية وبعض النسب وملصقات role/sidebar باهتة على الأسطح الفاتحة، ما قد يضعف القراءة والتباين |
| Mobile Dark | لا توجد screenshot authenticated مباشرة من viewport mobile في هذه الجولة |
| Mobile Light | لا توجد screenshot authenticated مباشرة من viewport mobile في هذه الجولة |

تمت إعادة الثيم إلى Dark بعد الفحص، حتى لا يُترك تفضيل المستخدم في حالة مختلفة.

## 6. الفجوات المرصودة قبل أي Patch

| ID | الفجوة | درجة الثقة | التصنيف قبل Patch | الدليل |
|---|---|---|---|---|
| D-01 | **Light-mode contrast/readability**: النصوص الثانوية والنسب وبعض عناصر sidebar/role تبدو باهتة في أول viewport | متوسطة إلى عالية على desktop | Candidate gap يحتاج contrast check بأداة/لقطة مستقرة قبل الإصلاح | live Light screenshot observation + Light CSS overrides في `index.css` |
| D-02 | **Active navigation state للـ internal anchors**: `location === path` يبرز route `/dashboard` فقط، بينما `navigateTo('#learn')` يضبط `activeSection` مؤقتًا ثم يمسحه ولا يحدّث `location` | عالية، source-confirmed | Gap منطقي/UX؛ لا يُصلح ضمن هذا التدقيق | `DashboardLayout.tsx:12,21-31,37` |
| D-03 | **My Account target mismatch**: عنصر `#account` موجود داخل sidebar/account card، بينما زر My Account يستخدم `navigateTo('#account')`؛ على mobile الهدف داخل drawer وليس قسمًا رئيسيًا في content | عالية، source-confirmed | Gap بنيوي صغير يحتاج قرار UX مستقل | `DashboardLayout.tsx:12,37` |
| D-04 | **Mobile evidence gap**: لا توجد قياسات بصرية authenticated فعلية عند 320/360/390/430 في هذه الجولة؛ المحلي auth-gated، والـ browser الحالي بقي desktop viewport | عالية كقيد قياس | Blocker لإصدار PASS بصري نهائي على mobile، وليس عيبًا في التطبيق بذاته | runtime observations + Gate 3 history |
| D-05 | **Mobile touch-target review**: عناصر drawer والـ header تستخدم `min-h-9` أو padding يساوي تقريبًا 36px، بينما أزرار CTA العامة تستخدم `min-height:46px` | متوسطة، static candidate | Candidate accessibility gap؛ يحتاج device-level verification قبل أي تعديل | `DashboardLayout.tsx:37` و`index.css:128-141` |
| D-06 | **Mobile typography density**: عدد من labels داخل Dashboard يستخدم `text-[9px]` و`text-[10px]` و`text-[11px]`، خصوصًا metadata والنسب والـ sidebar | متوسطة، static candidate | Candidate readability gap؛ لا يُثبت بدون mobile screenshot/contrast measurement | `DashboardPage.tsx` و`DashboardLayout.tsx` |
| D-07 | **Anchor viewport capture discrepancy**: scroll يتحرك إلى القسم، لكن screenshot عند Learn كان شبه فارغ مع بقاء النص في DOM | متوسطة | Evidence/runtime rendering investigation قبل Patch | live browser observation |

## 7. ما اجتاز التدقيق مبدئيًا

الـ responsive information architecture الحالية منطقية: عند 320–430px تتحول Home إلى عمود واحد، وتتحول Pathway/Learn/Practice/Journal إلى عمود واحد، وتبقى Quick Actions في عمودين وAtlas في عمودين. `min-w-0` على الحاويات الداخلية، `overflow-x: clip` على `.seg-app`، و`scroll-margin-top: 4.75rem` توفر حواجز layout مفيدة.

سطح desktop حافظ على التسلسل البصري السابق ولم يظهر في أول viewport فقدانًا واضحًا للهيكل أو خروجًا أفقيًا. كما أن TypeScript نجح، واختبارات Dashboard المستهدفة نجحت: `DashboardLayout.test.tsx` و`DashboardPage.test.tsx`، بإجمالي 3/3 اختبارات.

## 8. التحقق من الحدود المحمية

| الحد | النتيجة |
|---|---|
| UI source files | لم تُعدل بواسطة هذا التدقيق |
| Medical content | لم يُقرأ أو يُعدل أو يُفعّل |
| OAuth/authentication | لم يُعدل ولم يتم تجاوز auth gate المحلي |
| Database/schema | لم يُلمس |
| Asset paths/assets | لم تُعدل ولم تُنشأ placeholders |
| Visual Freeze | محفوظ؛ لا يوجد patch أو commit أو push من هذا audit |
| Runtime state | أُعيد Dark mode إلى الحالة الأصلية بعد الفحص |

ملاحظة: فشل التشغيل الكامل لـ `pnpm test --run` في suite واحدة فقط بسبب غياب fixture خارجي هو `/home/ubuntu/webdev-static-assets/SEG_FINAL_PACKAGE/assets_manifest.json`. بقية الاختبارات نجحت: 20 اختبارًا، مع نجاح فحوصات TypeScript. هذا blocker خاص بحزمة الأصول النهائية وليس Dashboard runtime.

## 9. القرار والمرحلة التالية المسموح بها

**لا يُوصى ببدء Patch بعد هذا التدقيق مباشرةً** قبل إغلاق D-04 بدليل mobile authenticated فعلي عند 320/360/390/430، ثم إعادة فحص D-01 بأداة contrast مستقرة. إذا تم اعتماد Patch لاحقًا، فالنطاق الأولوي المنضبط هو: Light-mode secondary contrast، ثم قرار مستقل بشأن active anchor state وMy Account target، مع عدم خلطها بإعادة تصميم أو تعديل المحتوى أو المصادقة.

المرحلة التالية المسموح بها هي **Mobile authenticated visual verification READ_ONLY** أو، إذا تعذر توفيرها، اعتماد قائمة D-01/D-05/D-06 كمرشحات تحتاج موافقة صريحة قبل أي UI Patch. لا توجد موافقة تنفيذية ضمن هذا التقرير.
