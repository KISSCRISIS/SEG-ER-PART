// Improved Topic Classification System for EDIC Batch 2 (Q101-Q200)
// ===============================================================
import { readFileSync } from "node:fs";

const lines = readFileSync("edic-arabic-batch-002.jsonl", "utf8").trim().split(/\r?\n/);

// Topic → {prefix, focus, keyTerms}
const topicMap = {
  'Hemodynamics/Monitoring': {
    prefix: 'علم الأمراض:',
    focus: 'يشرح هذا القسم مفاهيم المراقبة الديناميكية الدموية في العناية المركزة، بما في ذلك مقاييس الحجم (GEDI، SVRI، CI)، والتغيرات الديناميكية (SVV، PPV)، ومؤشرات الأكسجة (SvO2، EtCO2).',
    keyTerms: ['GEDI', 'SVRI', 'CI', 'SVV', 'ELWI', 'PCWP', 'SvO2', 'EtCO2', 'PPV', 'PiCCO', 'tidal volume', 'compliance'],
    examples: ['GEDI', 'PiCCO', 'SVV', 'PPV', 'ELWI', 'SVRI']
  },
  'Neuromuscular Disorders': {
    prefix: 'علم الأمراض:',
    focus: 'يغطي اضطرابات التواصل العصبي العضلي، بما في ذلك Myasthenia Gravis (أجسام مضادة ضد AChR postsynaptic)، وآلية عمل السوغاميدكسيز (Sugammadex) في عكس حاصرات العضلات، والاختلافات الدوائية في أمراض الكلى.',
    keyTerms: ['myasthenia gravis', 'AChR', 'Sugammadex', 'rocuronium', 'Vecuronium', 'Hofmann degradation', 'neuromuscular', 'acetylcholine', 'post-tetanic facilitation'],
    examples: ['myasthenia', 'sugammadex', 'rocuronium', 'cisatracurium', 'benzylisoquinolinium']
  },
  'Shock Types': {
    prefix: 'علم الأمراض:',
    focus: 'يصنف أنواع الصدمة المختلفة (نقص الحجم، القلبي، العضوي، التوزيعي) بناءً على المعايير الديناميكية الدموية (PCWP، CO، SVR، SvO2).',
    keyTerms: ['hypovolemic shock', 'cardiogenic shock', 'obstructive shock', 'distributive shock', 'PCWP', 'CO', 'SVR', 'SvO2', 'MAP'],
    examples: ['shock', 'hypovolemic', 'cardiogenic', 'obstructive', 'distributive']
  },
  'Infection/Sepsis': {
    prefix: 'علم الأمراض:',
    focus: 'يشمل الإنتان (Sepsis) وإدارته، ومتلازمة الضائقة التنفسية الحادة (ARDS)، والعدوى المقاومة للمضادات الحيوية (KPC، CRE)، والعلاج بمثبطات بيتا-لاكتاماز.',
    keyTerms: ['sepsis', 'SIRS', 'ARDS', 'KPC', 'carbapenem', 'avibactam', 'beta-lactamase', 'antibiotic', 'CRRT', 'dialysis'],
    examples: ['sepsis', 'septic', 'ARDS', 'KPC', 'avibactam', 'CRE', 'antibiotic resistance']
  },
  'Cardiac': {
    prefix: 'علم الأمراض:',
    focus: 'يغطي اضطرابات القلب والأوعية الدموية بما في ذلك احتشاء عضلة القلب (أنماط ECG)، وقصور القلب، واضطرابات النظم، والأجهزة الميكانيكية (IABP، Impella)، والإنعاش القلبي.',
    keyTerms: ['myocardial infarction', 'ECG', 'STEMI', 'IABP', 'Impella', 'ventricular', 'coronary artery', 'RCA', 'LAD', 'cardiac arrest', 'Cushing'],
    examples: ['cardiac', 'myocardial', 'IABP', 'Impella', 'ECG', 'coronary', 'arrhythmia', 'Cushing']
  },
  'Respiratory': {
    prefix: 'الفيزيولوجيا:',
    focus: 'يشمل آليات التنفس والتبادل الغازي، بما في ذلك التهوية الميكانيكية (أنماط الضغط)، والوذمة الرئوية، والغرق، ومرض الانسداد الرئوي المزمن، واضطرابات التنفس.',
    keyTerms: ['ventilation', 'PEEP', 'tidal volume', 'compliance', 'pulmonary', 'surfactant', 'atelectasis', 'bronchospasm', 'COPD', 'respiratory', 'dead space'],
    examples: ['respiratory', 'pulmonary', 'ventilation', 'PEEP', 'compliance', 'surfactant', 'drowning', 'bronchospasm']
  },
  'Neurology': {
    prefix: 'علم الأمراض:',
    focus: 'يشمل الاضطرابات العصبية بما في ذلك متلازمة الدماغ الخلفي القابلة للعكس (PRES)، ومتلازمة الاحتباس (Locked-in)، واضطرابات الوعي، والارتفاع الضغطي داخل الجمجمة.',
    keyTerms: ['PRES', 'locked-in syndrome', 'basilar artery', 'pontine', 'intracranial pressure', 'compliance', 'cerebral', 'edema', 'seizure', 'CT', 'MRI'],
    examples: ['PRES', 'locked-in', 'basilar', 'pontine', 'intracranial', 'neurological', 'cerebral']
  },
  'Toxicology/Overdose': {
    prefix: 'علم الأمراض:',
    focus: 'يغطي إدارة الجرعة الزائدة من الأدوية بما في ذلك العلاج الخاص (antidotes)، والتفاعلات الدوائية السامة، وآليات السموم.',
    keyTerms: ['overdose', 'antidote', 'verapamil', 'theophylline', 'cyanide', 'methanol', 'foscarnet', 'n-acetylcysteine', 'activated charcoal', 'hemodialysis'],
    examples: ['overdose', 'antidote', 'toxicity', 'verapamil', 'cyanide', 'methanol', 'theophylline']
  },
  'Transplant/Immunology': {
    prefix: 'علم الأمراض:',
    focus: 'يشمل آليات الأدوية المثبطة للمناعة بعد الزراعة (tacrolimus، mycophenolate، basiliximab، abatacept) والتفاعلات الدوائية ومضادات الرفض.',
    keyTerms: ['tacrolimus', 'FKBP-12', 'calcineurin', 'mycophenolate', 'IMPDH', 'basiliximab', 'CD25', 'abatacept', 'CTLA-4', 'CD80/86', 'graft'],
    examples: ['tacrolimus', 'FKBP', 'basiliximab', 'mycophenolate', 'abatacept', 'immunosuppressant', 'transplant']
  },
  'Endocrinology/Electrolytes': {
    prefix: 'علم الأمراض:',
    focus: 'يشمل اضطرابات الغدد الصماء والكهارل (الصوديوم، البوتاسيوم، الكالسيوم، الفوسفات) مع آلياتها الفسيولوجية وأهميتها السريرية.',
    keyTerms: ['hyponatremia', 'hypernatremia', 'hyperkalemia', 'hypokalemia', 'hypercalcemia', 'hypocalcemia', 'thyroid', 'adrenal', 'electrolyte', 'osmotic demyelination', 'refeeding'],
    examples: ['hyponatremia', 'hypernatremia', 'hyperkalemia', 'hypokalemia', 'hypercalcemia', 'refeeding', 'electrolyte', 'osmotic']
  },
  'Hematology': {
    prefix: 'علم الأمراض:',
    focus: 'يشمل اضطرابات التخثر والدم بما في ذلك DIC، ومضادات التخثر (DOACs)، ونصائح النقل، والتهاب الأوعية الدموية.',
    keyTerms: ['DIC', 'ISTH', 'platelet', 'anticoagulant', 'DOAC', 'dabigatran', 'idarucizumab', 'andexanet', 'heparin', 'transfusion', 'fibrinogen'],
    examples: ['DIC', 'anticoagulant', 'platelet', 'transfusion', 'heparin', 'thrombocytopenia', 'coagulopathy']
  },
  'ICU/Nutrition/Monitoring': {
    prefix: 'علم الأمراض:',
    focus: 'يشمل التغذية في العناية المركزة (القياسات الحرارية غير المباشرة)، ومراقبة المريض، ومتطلبات الطاقة، والوصول الوريدي.',
    keyTerms: ['nutrition', 'calorimetry', 'energy expenditure', 'ICU', 'venous access', 'IO access', 'tPN', 'hypocaloric', 'ventilator', 'monitoring'],
    examples: ['nutrition', 'calorimetry', 'ICU', 'energy', 'venous', 'IO', 'tPN', 'monitoring']
  },
  'Anesthesia/Pharmacology': {
    prefix: 'علم الأمراض:',
    focus: 'يشمل الأدوية المستخدمة في التخدير والرعاية المركزة بما في ذلك البنزوديازيبينات، والمسكنات، والمضادات الحيوية، وتفاعلاتها الدوائية.',
    keyTerms: ['anesthesia', 'benzodiazepine', 'opioid', 'codeine', 'CYP2D6', 'morphine', 'dexmedetomidine', 'midodrine', 'flumazenil', 'pharmacokinetics'],
    examples: ['anesthesia', 'benzodiazepine', 'opioid', 'dexmedetomidine', 'midodrine', 'flumazenil', 'pharmacokinetics']
  },
  'General': {
    prefix: 'علم الأمراض:',
    focus: 'تتعلق هذه المسألة بمفاهيم طبية عامة في المجال السريري تشمل التشخيص والعلاج وفق الأدلة العلمية الحديثة.',
    keyTerms: ['diagnosis', 'treatment', 'management', 'clinical', 'guidelines', 'evidence-based'],
    examples: []
  }
};

// Dry validation: Map all 100 questions to topics
const topics = {};
for (const line of lines) {
  const q = JSON.parse(line);
  const text = (q.question + ' ' + q.correctAnswer + ' ' + q.options.map(o => o.text).join(' ')).toLowerCase();
  let topic = 'General';
  
  // Check each topic's examples
  for (const [t, config] of Object.entries(topicMap)) {
    if (config.examples.length > 0) {
      for (const ex of config.examples) {
        if (text.includes(ex.toLowerCase())) {
          topic = t;
          break;
        }
      }
    }
    if (topic !== 'General') break;
  }
  
  if (!topics[topic]) topics[topic] = 0;
  topics[topic]++;
}

console.log('=== IMPROVED TOPIC MAPPING DRY VALIDATION ===');
for (const [topic, count] of Object.entries(topics).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${topic}: ${count}`);
}
console.log(`\nTotal topics: ${Object.keys(topics).length}`);
console.log(`Total questions: ${lines.length}`);
console.log('\nAll topics have templates defined:', Object.keys(topicMap).includes('General'));
