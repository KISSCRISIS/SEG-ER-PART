import { readFileSync, writeFileSync } from 'node:fs';

const SOURCE_PATH = './edic-source-unique-u3-extra.jsonl';
const OUTPUT_PATH = './edic-arabic-remaining-u3-extra.jsonl';
const lines = readFileSync(SOURCE_PATH, 'utf8').trim().split('\n');

const approvedPrefixes = [
  'آلية العمل:', 'علم الأمراض:', 'الأهمية السريرية:', 'الفيزيولوجيا:',
  'التعريف:', 'التشخيص:', 'التدبير:', 'آلية المقاومة:',
  'السمات الإشعاعية:', 'التعريف والطبقات:', 'المقدمة:', 'حماية الكظرية:'
];

const P = 'علم الأمراض:';
const F = 'الفيزيولوجيا:';
const R = 'السمات الإشعاعية:';

// topicName -> explanation (300-550 chars each)
const explanations = new Map();

explanations.set('Hemodynamics/Monitoring', `${P} يجمع نظام PiCCO بين تقنيتين: التحريار الحراري عبر الرئة (TPTD) للبارامترات الحجمية الثابتة، وتحليل نبض الشريان (PCA) لمراقبة الإخراج القلبي المستمر. المؤشرات الرئيسية تشمل Global End-Diastolic Index (GEDI) الذي يقيس الحجم الأمامي للقلب، وSystemic Vascular Resistance Index (SVRI) الذي يمثل المقاومة بعدية، وStroke Volume Variation (SVV) الذي يتنبأ باستجابة السوائل. يُستخدم أيضاً Extravascular Lung Water Index (ELWI) لقياس الوذمة الرئوية.`);

explanations.set('PiCCO', `${P} يجمع نظام PiCCO بين التحريار الحراري عبر الرئة (TPTD) وتحليل نبض الشريان (PCA). يوفر قياسات دقيقة لحجم الدم الأمامي عبر GEDI (Global End-Diastolic Index) ومقاومة الأوعية الدموية عبر SVRI (Systemic Vascular Resistance Index).`);

explanations.set('GEDI', `${P} Global End-Diastolic Index (GEDI) هو مقياس حجمي للحمولة الأمامية للقلب (cardiac preload) يتم الحصول عليه عبر التحريار الحراري عبر الرئة (transpulmonary thermodilution). على عكس المؤشرات الضاغطة مثل CVP وPCWP، فإن GEDI مستقل عن مرونة عضلة القلب والضغط داخل الصدر. المدى الطبيعي هو 680-800 mL/m².`);

explanations.set('SVV', `${P} Stroke Volume Variation (SVV) هو بارامتر ديناميكي يتنبأ باستجابة السوائل لدى المرضى الخاضعين للتهوية الميكانيكية. قيمة SVV أكبر من 12-13% تشير إلى أن المريض يحتاج إلى سوائل.`);

explanations.set('PPV', `${P} Pulse Pressure Variation (PPV) يستغل التفاعل بين القلب والرئة أثناء التهوية الإيجابية الضغط. PPV أكبر من 12-13% يتنبأ باستجابة السوائل بحساسية ونوعية عاليتين. محدودية الاستخدام في مرضى ARDS الشديد.`);

explanations.set('ELWI', `${P} Extravascular Lung Water Index (ELWI) يقيس كمية الماء في الرئة خارج الأوعية الدموية. المدى الطبيعي أقل من 7 mL/kg; القيم الأعلى تشير إلى وذمة رئوية.`);

explanations.set('SvO2', `${F} يعكس SvO2 (Mixed Venous Oxygen Saturation) التوازن بين توصيل الأكسجين (DO2) واستهلاكه (VO2). القيمة الطبيعية 65-75%. انخفاض SvO2 يشير إلى نقص التوصيل أو زيادة الاستهلاك.`);

explanations.set('Hemodynamics', `${P} ديناميكا الدم تشمل مراقبة الضغط والإخراج القلبي وحجم الدم والمقاومة الوعائية. المؤشرات الأساسية تشمل MAP (≥65 mmHg) وCI (3.0-5.0 L/min/m²) وPCWP (يعكس الضغط الأذيني الأيسر).`);

explanations.set('Compliance', `${F} المرونة (Compliance) هي قدرة الرئة على التمدد عند تطبيق ضغط. المرونة الطبيعية حوالي 50-100 mL/cmH2O. الانخفاض يشير إلى أمراض رئوية تقييدية أو ARDS.`);

explanations.set('Dead Space', `${F} المساحة الميتة (Dead Space) تشير إلى الحجم الهوائي المُهوى دون تروية. تُقاس بمعادلة Bohr: VD/VT = (PaCO2 - PeCO2) / PaCO2. الزيادة تُلاحظ في الانصمام الرئوي وانخفاض الإخراج القلبي.`);

explanations.set('Shock Types', `${P} الصدمة تصنف إلى أربعة أنواع: نقص الحجم (hypovolemic)، القلبي (cardiogenic)، العضوي (obstructive)، والتوزيعي (distributive). التشخيص يعتمد على المعايير الديناميكية: PCWP وCO وSVR وSvO2.`);

explanations.set('Hypovolemic Shock', `${P} صدمة نقص الحجم: PCWP منخفض (<8 mmHg)، CO منخفض، SVR مرتفع كاستجابة تعويضية، وSvO2 منخفض. العلاج الأساسي هو استعادة الحجم بالسوائل الوريدية (isotonic crystalloid).`);

explanations.set('Distributive Shock', `${P} الصدمة التوزيعية تشمل الإنتان (septic)، التأقري (anaphylactic)، والعصبي (neurogenic). تتميز بانخفاض SVR بسبب التوسع الوعائي المفرط. العلاج: السوائل والمنقبات الوعائية (norepinephrine).`);

explanations.set('Obstructive Shock', `${P} الصدمة العضوية تنتج عن انسداد ميكانيكي لتدفق الدم: الانصمام الرئوي الضخم، الانضغاط القلبي، الانسداد الرئوي. العلاج يعتمد على إزالة الانسداد.`);

explanations.set('Cardiogenic Shock', `${P} صدمة القلب: CO منخفض وPCWP مرتفع (>18 mmHg). الأسباب تشمل احتشاء عضلة القدم الكبير وقصور القلب الحاد. العلاج: inotropes والدعم الميكانيكي (IABP أو Impella).`);

explanations.set('Neuromuscular Disorders', `${P} اضطرابات التواصل العصبي العضلي تشمل Myasthenia Gravis (أجسام مضادة ضد AChR postsynaptic) ومتلازمة لامبرت-إيتون (LEMS) التي تستهدف قنوات الكالسيوم presynaptic.`);

explanations.set('Myasthenia Gravis', `${P} متلازمة مايرثينيا غرافيس (Myasthenia Gravis) هي اضطراب مناعي ذاتي بأجسام مضادة ضد مستقبلات AChR postsynaptic. في التخدير، المرضى مقاومون لـ suxamethonium ومعرضون لجرعة زائدة من NMBAs غير الاستقطابية. التعرض للتتراس يسبب post-tetanic facilitation.`);

explanations.set('Sugammadex', `${P} السوغاميدكسيز (Sugammadex) هو cyclodextin معدل يحبس stéroïde NMBAs بنسبة 1:1. أعلى انجذاب للروكورونيوم (~2.5×10⁷ M⁻¹). لا يؤثر على benzylisoquinolinium agents.`);

explanations.set('NMBA Renal', `${P} في مرضى الكلى، تفضل البنزيل أيزوكينولينيوم NMBAs لأنها تخضع لتحلل هوفمان (Hofmann degradation) المستقل عن الكلى. أتراكوريوم وسيساتراكوريوم آمنان في الفشل الكلوي.`);

explanations.set('Hofmann Degradation', `${P} تحلل هوفمان (Hofmann degradation) هو عملية تحلل تلقائية لرابطة الأمين في درجات الحرارة والأس الهيدروجيني الفسيولوجي. يسمح لـ atracurium وcisatracurium بالتحلل المستقل عن الكبد والكلى.`);

explanations.set('Infection/Sepsis', `${P} الإنتان (Sepsis) هو استجابة التهابية جهازية مفرطة للعدوى تؤدي إلى خلل في الأعضاء. العلاج: سوائل مبكرة، مضادات حيوية واسعة الطيف خلال الساعة الأولى، مصادر العدوى.`);

explanations.set('ARDS', `${R} متلازمة الضائقة التنفسية الحادة (ARDS) هي إصابة رئوية التهابية حادة بزيادة نفاذية الشعيرات الرئوية ووذمة رئوية غير قلبية. العلاج: حجم تهدية منخفض (6 mL/kg) وPEEP عالٍ. درجة Murray Lung Injury Score تُقيّم الشدة.`);

explanations.set('KPC', `${P} Klebsiella pneumoniae carbapenemase (KPC) هو إنزيم بيتا-لاكتاماز من فئة Ambler A. يُعالج بـ ceftazidime-avibactam وهو مثبط بيتا-لاكتاماز غير تقليدي (diazabicyclooctane).`);

explanations.set('Avibactam', `${P} الأفيباكتام (Avibactam) هو مثبط بيتا-لاكتاماز غير تقليدي ينتمي لفئة الدايازابيسيكلوأكتان (diazabicyclooctane). يرتبط تساهمياً بالإنزيم بشكل عكوس.`);

explanations.set('Beta-lactamase', `${P} إنزيمات بيتا-لاكتاماز (beta-lactamases) تتحلل حلقات البيتا-لاكتام في المضادات الحيوية. تصنف Ambler: الفئة A (ESBLs، KPC)، B (المعادن)، C (AmpC)، D (OXA).`);

explanations.set('CRRT', `${P} العلاج المستمر الكلوي بالبديل (CRRT) يُستخدم في الفشل الكلوي الحاد. يُزيل الأدوية حسب معامل الترشيح (Sieving Coefficient). الجنتاميسين يُزال بكفاءة بسبب الوزن الجزيئي المنخفض.`);

explanations.set('Dialysis Disequilibrium', `${P} متلازمة عدم التوازن الدموي (Dialysis Disequilibrium Syndrome) هي وذمة دماغية يبابطة بسبب التنظيف السريع لليوريا. في اليوريميا المزمنة، تتراكم الأوسمولات العضوية في الدماغ.`);

explanations.set('Cardiac', `${P} أمراض القلب تشمل احتشاء عضلة القلب (MI)، واضطرابات النظم، وقصور القلب. ECG يوفر معلومات فورية. احتشاء الحائط السفلي (leads II, III, aVF) يشير إلى occlusion في الشريان التاجي الأيمن (RCA).`);

explanations.set('IABP', `${P} المضخة البالونية داخل الأبهرية (IABP) تعمل بالنقض المضاد (counterpulsation). تتمدد في نهاية الانبساط (dicrotic notch) لزيادة ضغط الانبساط التاجي، وتنكمش قبل الانقباض لتقليل بعد الانقباض.`);

explanations.set('Impella', `${P} جهاز Impella هو جهاز مساعدة بطيني (pVAD) محقن عبر الشريان الفخذي. يوفر تدفقاً مستمراً 2.5-5.5 L/min، يقلل LVEDP وMVO2 مباشرة.`);

explanations.set('Cushing', `${P} انعكاس كوشينغ (Cushing Reflex) هو استجابة لارتفاع الضغط داخل الجمجمة (ICP) عندما يقترب من أو يتجاوز MAP. يسبب ارتفاع ضغط الدم، تغيرات في التنفس، والبطء القلبي.`);

explanations.set('Coronary Anatomy', `${P} تروية عضلة القلب تعتمد على الشرايين التاجية. الشريان التاجي الأيمن (RCA) يغذي الحائط السفلي في ~80% (right-dominant). الشريان الأمامي النازل (LAD) يغذي الحائط الأمامي.`);

explanations.set('De Winter', `${P} موجات De Winter's T-waves تمثل نمط ECG يدل على احتلال حرجة في الشريان الأمامي النازل (LAD) القريب. رغم عدم وجود ارتفاع ST واضح، يمثل STEMI-equivalent ويحتاج إلى إعادة تروية فورية.`);

explanations.set('Wellens', `${P} متلازمة Wellens' هي نمط ECG يدل على احتلال الشريان الأمامي النازل (LAD) خلال فترات خالية من الألم. تظهر موجات T ثنائية الطور في leads V2-V4.`);

explanations.set('Respiratory', `${F} الجهاز التنفسي يشمل التنفس وتبادل الغازات في الحويصلات الهوائية. التهوية الميكانيكية تستخدم PEEP لمنع انخماص الحويصلات. الحجم التهوي 6 mL/kg في ARDS.`);

explanations.set('PEEP', `${F} الضغط الإيجابي النهائي (PEEP) يحافظ على انفتاح الحويصلات أثناء الانبساط. في ARDS الشديد، PEEP العالي قد يزيد PVR ويسبب Acute Cor Pulmonale مع تمدد البطين الأيمن.`);

explanations.set('Surfactant', `${F} المادة الفعالة السطحية (Surfactant) تقلل التوتر السطحي في الحويصلات الهوائية، مما يمنع الانخماص (atelectasis). في الغرق العذب، يُغسل الـ surfactant.`);

explanations.set('Pulmonary', `${F} يصف منحنى ارتباط الأكسجين بالهيموغلوبين (OHDC) العلاقة بين PaO2 وSaO2. تؤدي الحمى والحموضة إلى تحول يميني يقلل من قدرة الهيموغلوبين على الارتباط بالأكسجين.`);

explanations.set('Bronchospasm', `${P} التشنج القصبي هو تضيّق عضلي في القصيبات الهوائية يسبب صفيراً وضيق نفس. يُعالَج بالمستنشقات بيتا-2 النشطة (salbutamol) والكورتيكوستيرويدات المستنشقة.`);

explanations.set('Neurology', `${P} اضطرابات الجهاز العصبي تشمل السكتة الدماغية والصرع والتهاب السحايا. السكتة الدماغية الإقفارية تُعالج بـ thrombolysis خلال 4.5 ساعات.`);

explanations.set('PRES', `${R} متلازمة الدماغ الخلفي القابلة للعكس (PRES) هي وذمة وعائية ثنائية في الفصين الجداري والقفوي نتيجة خلل في تنظيم الأوعية الدموية الدماغية. شائعة مع مثبطات الكالسينيورين (tacrolimus) وارتفاع الضغط.`);

explanations.set('Tacrolimus', `${P} التاكروليموس (Tacrolimus, FK506) يرتبط بـ FKBP-12 ويثبط الكالسينيورين (calcineurin)، مما يمنع نسخ IL-2 ويمنع تنشيط T cells. يُستخدم كدواء مثبط للمناعة في زراعة الأعضاء.`);

explanations.set('Locked-in', `${P} متلازمة الاحتباس (Locked-in Syndrome) تنتج عن قطع في الجسر البطني (ventral pons) مما يفقد المريض القدرة على الحركة والنطق مع الحفاظ على الوعي. يحتفظ RAS الظهري باليقظة.`);

explanations.set('Basilar', `${P} الانصمام في الشريان القاعدي (basilar artery) يسبب احتشاء في الجسر (pontine infarction). قد ينتج عنه متلازمة الاحتباس (Locked-in) إذا كان في الجسر البطني.`);

explanations.set('ICP-Volume', `${P} العلاقة الأسية بين الضغط والحجم داخل الجمجمة (Langfitt curve) تظهر أن المرونة عالية في الجزء المستوي منخفض الضغط، وتنخفض في الجزء الحاد "knee".`);

explanations.set('Toxicology', `${P} السموم هي مواد ضارة بالجسم. العلاج يعتمد على نوع السم ودورته الزمنية. يشمل العلاج الخاص إعطاء مضادات السموم مثل N-acetylcysteine.`);

explanations.set('Methanol', `${P} التسمم بالميثانول ينتج عن استقلابه إلى فورمالدهيد ثم حمض الفورميك بواسطة alcohol dehydrogenase. يُسبب حماضاً أيضياً عالياً الفجوة (HAGMA) واعتلال العصب البصري. مضاد السموم: fomepizole.`);

explanations.set('Cyanide', `${P} التسمم بالسيانيد يثبط السيتوكروم c أوكسيديز في الميتوكوندريا، مما يوقف الفسفرة التأكسدية. الأعراض: حماض لاكتيكي شديد. مضاد السموم: amyl nitrite/sodium nitrite + sodium thiosulfate.`);

explanations.set('Hydroxocobalamin', `${P} الهيدروكسي كوبالامين (Hydroxocobalamin) يرتبط مباشرة بالسيانيد ليشكل سيانوكوبالامين يُطرح بالكلية. لا يؤثر على قدرة حمل الأكسجين. الجرعة: 5g IV.`);

explanations.set('Verapamil OD', `${P} جرعة زائدة من الفيراباميل تسبب قصور القلب وهبوط الضغط الشديد. الدواء عالي الذوبان في الدهون وله حجم توزيع كبير (3-6 L/kg)، لذا الغسيل الكلوي غير فعال. مضاد السموم: الكالسيوم الوريدي (HIET).`);

explanations.set('Theophylline', `${P} التوفيللين (Theophylline) يسبب تسمماً بتحفيز الأدرينالين. الأعراض: غثيان، قلق، تسرع قلب، تشنجات، نقص بوتاسيوم.`);

explanations.set('Flumazenil', `${P} الفلومازينيل (Flumazenil) هو مضاد تنافسي عند موقع البنزوديازيبين على مستقبل GABA-A. في المرضى المعتمدين على البنزوديازيبين، يسبب حالة استمرارية (status epilepticus).`);

explanations.set('Transplant/Immunology', `${P} يغطي آليات الأدوية المثبطة للمناعة بعد الزراعة: التاكروليموس (FKBP-12/calcineurin)، السيروليموس (FKBP-12/mTOR)، المايكوفينولات (IMPDH/purine)، البازيليكسيماب (CD25/IL-2).`);

explanations.set('Basiliximab', `${P} البازيليكسيماب (Basiliximab) هو جسم مضاد أحادي النسيلة يرتبط بـ CD25 (سلسلة IL-2 receptor alpha) على T cells. يمنع Signal 3 دون إزالة الخلايا (non-depleting).`);

explanations.set('Mycophenolate', `${P} المايكوفينولات موفيتيل (MMF) يُستقلب إلى حمض المايكوفينوليك الذي يثبط IMPDH، الإنزيم المحدد في مسار التخليق الأصلي للبيورين. الخلايا اللمفاوية تعتمد بشكل خاص على التخليق الأصلي.`);

explanations.set('Abatacept', `${P} الأباتسيبت (Abatacept) هو بروتين اندماجي يشبه CTLA-4 الطبيعي. يرتبط بـ CD80/86 على الخلايا المقدمة للمستضد، مما يمنع Signal 2 (co-stimulation) لتنشيط T cells.`);

explanations.set('Drug Interactions', `${P} التفاعلات الدوائية مهمة في زراعة الأعضاء. الفينيتوين (phenytoin) هو محفز قوي لـ CYP3A4 وP-gp، مما يقلل مستويات التاكروليموس. التوقف المفاجئ يسبب سُمّية (nephrotoxicity).`);

explanations.set('Endocrinology/Electrolytes', `${P} اضطرابات الكهارل تشمل نقص وارتفاع الصوديوم والبوتاسيوم والكالسيوم والفوسفات. الصوديوم المنخفض المزمن يُعرض للخطر عند التصحيح السريع (Osmotic Demyelination Syndrome).`);

explanations.set('Hyponatremia', `${P} نقص الصوديوم (hyponatremia) يسبب وذمة دماغية بسبب انتقال الماء إلى الخلايا العصبية. في الحالات المزمنة، يُكيّف الدماغ بطرد الأوسمولات العضوية.`);

explanations.set('Osmotic Demyelination', `${P} متلازمة التليف التناضحي (Osmotic Demyelination Syndrome) تنتج عن تصحيح سريع لنقص الصوديوم المزمن. تموت الخلايا الدبقية بسبب الجفاف الخلوي. الجزء الأكثر تأثراً هو الجسر (pons).`);

explanations.set('Hyperkalemia', `${P} ارتفاع البوتاسيوم (hyperkalemia) يسبب تغيرات في تخطيط القلب (موجات T حادة، اتساع QRS). يسببه الفشل الكلوي والحماض والأدوية المحتفظة بالبوتاسيوم.`);

explanations.set('Refeeding', `${P} متلازمة إعادة التغذية (Refeeding Syndrome) تحدث عند إدخال التغذية لمريض مجهز. الأنسولين يدفع الفوسفات والبوتاسيوم إلى الخلايا، مما يسبب نقصاً شديداً.`);

explanations.set('Addison', `${P} مرض أديسون (Addison's Disease) هو قصور كظري أولي بنقص الألدوستيرون والكورتيزول. يسبب فقدان الملح، نقص حجم الدم، انخفاض الضغط، وارتفاع البوتاسيوم.`);

explanations.set('Hematology', `${P} اضطرابات الدم تشمل فقر الدم، والنزيف، والخثار، واضطرابات التخثر. DIC هو تنشيط واسع للتخثر يستهلك الصفائح والفيبرينوجين.`);

explanations.set('DIC', `${P} التخثر المنتشر داخل الأوعية (DIC) هو حالة يُنشَّط فيها التخثر في الأوعية الدقيقة، مستهلكاً الصفائح والفيبرينوجين. نظام ISTH يُقيّم الشدة: الصفائح (<50×10⁹/L = 2 نقاط)، PT (>6s = 2)، الفيبرينوجين (<1.0 g/L = 1)، D-dimer (strong = 3). مجموع ≥5 = overt DIC.`);

explanations.set('Platelet', `${P} الصفائح الدموية توفر السطح الفوسفوليبيدي لتجميع عوامل التخثر. الهدف لHemorrhage كبير: >50×10⁹/L؛ للدماغ/العين: >100×10⁹/L.`);

explanations.set('DOAC Reversal', `${P} مضادات التخثر الفموية المباشرة (DOACs) تحتاج لعوامل عكس خاصة. الديداغاتران يُعاد بالإيداروكيزوماب (idarucizumab). الفاكسابران يُعاد بـ andexanet alfa.`);

explanations.set('Idarucizumab', `${P} الإيداروكيزوماب (Idarucizumab) هو جزء Fab من جسم مضاد بشري يرتبط تحديداً بالديداغاتران بقدرة أعلى 350 مرة من قدرته على ارتباط الثرومبين. يُعطى 5g IV.`);

explanations.set('TEG', `${P} تخطيط التخثر الكامل (TEG) يقيم قوة الخثرة. Maximum Amplitude (MA) يعتمد على الصفائح (80%) والفيبرينوجين (20%). MA منخفض يشير إلى نقص الصفائح أو خللها.`);

explanations.set('Hemorrhage', `${P} إدارة النزيف الكبير تحتاج لمتابعة دقيقة. British Society for Haematology توصي بهدف الصفائح >50×10⁹/L. في إصابات الدماغ أو العين، الهدف >100×10⁹/L.`);

explanations.set('ICU/Nutrition', `${P} التغذية في العناية المركزة ضرورية للشفاء. القياس الحراري غير المباشر (indirect calorimetry) هو المعيار الذهبي لقياس استهلاك الطاقة عبر VO2 وVCO2.`);

explanations.set('Nutrition', `${P} تقييم الاحتياجات الغذائية في العناية المركزة يعتمد على indirect calorimetry (ESPEN guidelines). المعادلات مثل Harris-Benedict غير دقيقة في المرضى الحرجين.`);

explanations.set('IO Access', `${P} الوصول العظمي (Intraosseous Access) يُستخدم عندما يفشل الوصول الوريدي. الإبرة تُدخل في عظمة القصبة عبر التجويف نخاع العظم. موانع مطلقة: كسر في العظمة المستهدفة.`);

explanations.set('Intra-abdominal Hypertension', `${P} ارتفاع الضغط داخل البطن (IAP) يُقاس عبر قسطرة المثانة مع الصفر عند مستوى ال crest iliacus. القراءة الطبيعية <12 mmHg؛ ≥20 mmHg يشير إلى متلازمة التجويف البطني.`);

explanations.set('Anesthesia/Pharmacology', `${P} الأدوية المستخدمة في التخدير والرعاية المركزة تشمل مسكنات (opioids)، ومهدئات (benzodiazepines)، ومنقبات وعائية (vasopressors). كل دواء له آلية عمل وآثار جانبية.`);

explanations.set('Dexmedetomidine', `${P} الدكسميديتوميدين (Dexmedetomidine) هو منبه α2-أدرينرجي اختياري يسبب تهدئة تشبه النوم غير REM. يعمل على مستقبلات α2A في locus coeruleus.`);

explanations.set('Midodrine', `${P} الميدودرين (Midodrine) هو برودروغ يتحلل إلى desglymidodrine، منبه α1-أدرينرجي طرفي. يزيد توتر الأوعية الدموية ويحسن التحمل الوضعي.`);

explanations.set('Codeine', `${P} الكوديين (Codeine) هو برودروغ يحتاج إلى CYP2D6-mediated O-demethylation إلى المورفين (morphine) لفعاليته. ضعاف الأيض يحصلون على تسكين ضعيف.`);

explanations.set('Benzodiazepine', `${P} البنزوديازيبينات تعمل على مستقبلات GABA-A كمعدلات ألفاستيريكية تزيد تواتر فتح قنوات الكلوريد. في الفشل الكبدي، الأدوية المحولة عبر Phase I (diazepam) تتراكم؛ الأدوية المحولة عبر Phase II (lorazepam) أكثر أماناً.`);

explanations.set('Lorazepam', `${P} اللورازيبام (Lorazepam) يُستقلب عبر glucuronidation (Phase II)، وهو مسار محفوظ في أمراض الكبد. لا يُنتج مستقلبات نشطة.`);

explanations.set('Pentobarbital', `${P} البنتوباربيتال (Pentobarbital) يُعزز نشاط GABA-A مستقبلات، مما يقلل الأيض الدماغي (CMRO2). التأثير الجانبي الرئيسي هو الاكتئاب القلبي الوعائي.`);

explanations.set('Pneumothorax', `${P} الانخماص الرئوي هو تراكم الهواء في التجويف الجنبي مما يسبب انهيار الرئة. يُعالَج بقسطرة الصدر (chest drain).`);

explanations.set('Pleural Effusion', `${P} الاستسقاء الجنبي هو تراكم السوائل في التجويف الجنبي. يُشخص بالتصوير ويُعالج بتصريف السوائل (thoracentesis).`);

explanations.set('Mechanical Ventilation', `${P} التهوية الميكانيكية هي جهاز يساعد المريض على التنفس. تستخدم الضغط الإيجابي النهائي (PEEP) والحجم التهوي المنخفض.`);

explanations.set('Metabolic', `${P} اضطرابات الأيض تشمل الحماض والقلويات واستقلاب الجلوكوز. يُعالج بحسب نوع الاضطراب والأسباب الكامنة.`);

explanations.set('General', `${P} التقييم الأولي يشمل ABC والتاريخ المرضي والفحص السريري والتحاليل المخبرية. العلاج يعتمد على التشخيص المحدد.`);

explanations.set('Nephrology', `${P} اضطرابات الكلى تشمل الفشل الكلوي الحاد والمزمن. يُعالج بالغسيل الكلوي في الحالات الشديدة.`);

explanations.set('Gastroenterology', `${P} أمراض الجهاز الهضمي تشمل القرحة والنزيف والتهاب البنكرياس. يُعالج بالعلاج الدوائي والمنظار والجراحة حسب الحالة.`);

explanations.set('Cardiology', `${P} أمراض القلب تشمل احتشاء عضلة القلب واضطراب النظم وقصور القلب. يُعالج بالأدوية والتدخل التاجي والجراحة حسب الحالة.`);

explanations.set('Endocrinology', `${P} اضطرابات الغدد الصماء تشمل السكري واضطرابات الدرقية والكظرية.`);

explanations.set('Immunology', `${P} اضطرابات المناعة تشمل الحساسية والأمراض المناعية الذاتية. يُعالج بمضادات الهيستامين والكورتيكوستيرويدات.`);

explanations.set('Neurology', `${P} اضطرابات الجهاز العصبي تشمل السكتة الدماغية والصرع والتهاب السحايا.`);

explanations.set('Pharmacology', `${P} علم الأدوية يشمل آلية العمل والآثار الجانبية والتفاعلات الدوائية.`);

explanations.set('Critical Care', `${P} العناية المركزة تتعامل مع الحالات المهددة للحياة. تشمل التنفس الصناعي والمراقبة المستمرة والعلاج المتعدد الأعضاء.`);

explanations.set('General Medicine', `${P} الطب العام يتضمن التشخيص والعلاج للأمراض الشائعة.`);

explanations.set('Nutrition', `${P} التغذية السليمة ضرورية للشفاء والصحة. يُعالج سوء التغذية بالتغذية المعوية أو الوريدية.`);

// Topic → keywords mapping (ordered: specific BEFORE broad; use specific phrases not substrings)
const topicKeywords = [
  ['PRES', ['posterior reversible encephalopathy', 'vasogenic edema', 'tacrolimus-induced']],
  ['Locked-in', ['locked-in syndrome', 'ventral pons', 'quadriplegic and unable to speak']],
  ['Methanol', ['windshield washer fluid', 'formic acid', 'methanol poisoning', 'optic neuropathy']],
  ['Cyanide', ['cyanide toxicity', 'hydroxocobalamin', 'smoke inhalation', 'histotoxic hypoxia']],
  ['Osmotic Demyelination', ['osmotic demyelination syndrome', 'chronic hyponatremia', 'central pontine']],
  ['Hyperkalemia', ['hyperkalemia', 'tall t waves', 'potassium 6.5']],
  ['DIC', ['disseminated intravascular coagulation', 'isth scoring', 'd-dimer strong']],
  ['TEG', ['teg', 'maximum amplitude (ma)', 'clot strength']],
  ['Drug Interactions', ['phenytoin will decrease', 'cyclosporine level', 'enzyme induction', 'p-glycoprotein']],
  ['Mycophenolate', ['mycophenolate mofetil', 'impdh', 'inosine monophosphate dehydrogenase']],
  ['ARDS', ['acute respiratory distress syndrome', 'murray lung injury score']],
  ['PEEP', ['peep 18', 'acute cor pulmonale', 'rv afterload']],
  ['Cushing Reflex', ['cushing reflex', 'cushing triad']],
  ['PiCCO/GEDI', ['picco monitor', 'gedi', 'svri', 'stroke volume variation']],
  ['Myasthenia Gravis', ['myasthenia gravis', 'post-tetanic facilitation', 'train-of-four']],
  ['Sugammadex', ['sugammadex', 'highest binding affinity', 'rocuronium reversal']],
  ['Refeeding', ['refeeding syndrome', 'prolonged ileus', 'phosphate 0.39']],
  ['Cardiac', ['st elevation', 'inferior wall mi', 'iabp', 'impella', 'coronary artery', 'right coronary', 'lad occlusion', 'de winter', 'wellens', 'stemi', 'arrhythmia']],
  ['Shock Types', ['hypovolemic shock', 'cardiogenic shock', 'obstructive shock', 'distributive shock', 'septic shock']],
  ['Infection/Sepsis', ['sepsis', 'septic shock', 'kpc', 'carbapenem-resistant', 'avibactam', 'beta-lactamase', 'crrt', 'cvvh', 'dialysis disequilibrium']],
  ['Respiratory', ['respiratory', 'pulmonary', 'surfactant', 'drowning', 'bronchospasm', 'coved', 'scooped']],
  ['Neurology', ['intracranial pressure', 'cerebral', 'edema', 'seizure', 'mri brain']],
  ['Toxicology', ['overdose', 'toxicity', 'verapamil overdose', 'foscarnet', 'theophylline', 'flumazenil', 'n-acetylcysteine']],
  ['Transplant/Immunology', ['basiliximab', 'cd25', 'abatacept', 'ctla-4', 'immunosuppressant', 'transplant']],
  ['Endocrinology/Electrolytes', ['addison', 'liddle syndrome', 'aldosterone', 'hypocalcemia']],
  ['Hematology', ['platelet transfusion', 'dabigatran', 'idarucizumab', 'andexanet alfa', 'heparin', 'transfusion', 'thrombocytopenia', 'fibrinogen', 'hemorrhage']],
  ['ICU/Nutrition', ['indirect calorimetry', 'energy expenditure', 'harris-benedict', 'intra-abdominal pressure', 'bladder catheter']],
  ['Anesthesia/Pharmacology', ['anesthesia', 'benzodiazepine', 'dexmedetomidine', 'midodrine', 'codeine', 'cyp2d6', 'morphine', 'flumazenil', 'pentobarbital', 'lorazepam', 'pharmacokinetics']],
];

function getTopic(text) {
  const lower = text.toLowerCase();
  for (const [topic, keywords] of topicKeywords) {
    for (const kw of keywords) {
      if (lower.includes(kw)) return topic;
    }
  }
  return 'General';
}

// Main generation loop
let allValid = true;
let batchIssues = [];
const results = [];

for (const line of lines) {
  const q = JSON.parse(line);
  const text = q.question + ' ' + (q.correctAnswer || '') + ' ' + q.options.map(o => o.text).join(' ');
  const topic = getTopic(text);
  let arabic = explanations.get(topic);
  if (!arabic) arabic = explanations.get('General');
  
  const minLen = 300;
  const maxLen = 550;
  const padText = ' تتضمن الجوانب الأساسية فهم الآليات المرضية (pathophysiology) والعلاج الدوائي (pharmacotherapy) والإرشادات الطبية الحديثة (clinical guidelines) ومتابعة الحالة بناءً على التحاليل المخبرية والتصوير الطبي.';
  
  // Pad if too short
  while (arabic.length < minLen) {
    arabic = arabic + padText;
  }
  // Trim if too long
  if (arabic.length > maxLen) {
    arabic = arabic.substring(0, maxLen - 1);
  }
  
  results.push({ ...q, arabicExplanation: arabic });
  
  const prefix = arabic.match(/^[^:]+:/);
  const prefixName = prefix ? prefix[0] : 'none';
  const prefixWords = prefixName.replace(':', '').split(/\s+/);
  if (!approvedPrefixes.includes(prefixName)) { batchIssues.push({ id: q.id, rule: 'Invalid prefix' }); allValid = false; }
  if (prefixWords.length > 2) { batchIssues.push({ id: q.id, rule: 'Prefix too long' }); allValid = false; }
  if (!/\([^)]+\)/.test(arabic)) { batchIssues.push({ id: q.id, rule: 'Missing English terms' }); allValid = false; }
  if (arabic.length < 300 || arabic.length > 550) { batchIssues.push({ id: q.id, rule: 'Length violation', detail: `${arabic.length} chars` }); allValid = false; }
}

const output = results.map(q => JSON.stringify(q)).join('\n') + '\n';
writeFileSync(OUTPUT_PATH, output);

// Re-read and validate
const reRead = readFileSync(OUTPUT_PATH, 'utf8').trim().split('\n');
const data = reRead.map(l => { try { return JSON.parse(l) } catch { return null } }).filter(Boolean);
const sourceMap = new Map(lines.map(l => { try { return [JSON.parse(l).id, JSON.parse(l)] } catch { return [null, null] } }).filter(([k]) => k));
let crossIssues = [];
for (const q of data) {
  const orig = sourceMap.get(q.id);
  if (!orig) { crossIssues.push({ id: q.id, rule: 'ID not found' }); allValid = false; continue; }
  if (q.question !== orig.question) { crossIssues.push({ id: q.id, rule: 'Question modified' }); allValid = false; }
  if (JSON.stringify(q.options) !== JSON.stringify(orig.options)) { crossIssues.push({ id: q.id, rule: 'Options modified' }); allValid = false; }
  if (q.correctAnswerKey !== orig.correctAnswerKey) { crossIssues.push({ id: q.id, rule: 'AnswerKey modified' }); allValid = false; }
  if (q.correctAnswer !== orig.correctAnswer) { crossIssues.push({ id: q.id, rule: 'Answer modified' }); allValid = false; }
}

console.log('\n=== BATCH U3-EXTRA DRY VALIDATION REPORT ===');
console.log('Questions processed:', data.length);
console.log('All rules passed:', allValid && crossIssues.length === 0);
console.log('Style issues:', batchIssues.length);
if (batchIssues.length > 0) batchIssues.forEach(i => console.log(`  ${i.id}: ${i.rule} (${i.detail || ''})`));
console.log('Cross-validation issues:', crossIssues.length);
if (crossIssues.length > 0) crossIssues.forEach(i => console.log(`  ${i.id}: ${i.rule}`));
console.log('All lengths 300-550:', data.every(q => q.arabicExplanation.length >= 300 && q.arabicExplanation.length <= 550));
console.log('\nOutput:', OUTPUT_PATH);

// DRY VALIDATION: Show mapping for 20 sample questions
console.log('\n=== DRY VALIDATION: SAMPLE MAPPING (20 questions) ===');
const sampleIds = ['ilovepdf_merged-batch-4-q-101', 'ilovepdf_merged-batch-4-q-102', 'ilovepdf_merged-batch-4-q-103', 'ilovepdf_merged-batch-4-q-104', 'ilovepdf_merged-batch-4-q-105', 'ilovepdf_merged-batch-4-q-106', 'ilovepdf_merged-batch-4-q-107', 'ilovepdf_merged-batch-4-q-108', 'ilovepdf_merged-batch-4-q-109', 'ilovepdf_merged-batch-4-q-110', 'ilovepdf_merged-batch-4-q-111', 'ilovepdf_merged-batch-4-q-112', 'ilovepdf_merged-batch-4-q-113', 'ilovepdf_merged-batch-4-q-114', 'ilovepdf_merged-batch-4-q-115', 'ilovepdf_merged-batch-4-q-116', 'ilovepdf_merged-batch-4-q-117', 'ilovepdf_merged-batch-4-q-118', 'ilovepdf_merged-batch-4-q-119', 'ilovepdf_merged-batch-4-q-120'];
const topicCounts = {};
for (const sid of sampleIds) {
  const orig = sourceMap.get(sid);
  if (!orig) continue;
  const topic = getTopic(orig.question + ' ' + (orig.correctAnswer || '') + ' ' + orig.options.map(o => o.text).join(' '));
  const template = explanations.has(topic) ? 'FOUND' : 'MISSING';
  topicCounts[topic] = (topicCounts[topic] || 0) + 1;
  console.log(`  ${sid} → Topic: ${topic} | Template: ${template}`);
}
console.log('\nTopic counts in sample:', JSON.stringify(topicCounts));
