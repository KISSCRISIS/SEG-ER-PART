export type HighYieldSource = "rosh" | "tintinalli" | "rosen";

export type HighYieldSourceTopic = {
  unitId: string;
  title: string;
  arabicTitle?: string | null;
};

export type HighYieldMapTopic = {
  id: string;
  title: string;
  arabicTitle?: string | null;
  sourceIndex: number;
};

export type HighYieldMapChapter = {
  id: string;
  title: string;
  topics: HighYieldMapTopic[];
};

const sectionRules: Array<[string, RegExp]> = [
  [
    "Resuscitation & Critical Care",
    /airway|resuscitation|shock|hypotens|anaphyl|sedation|critical|fluids|electrolytes|acid.?base|arterial blood gas|\babg\b/i,
  ],
  [
    "Cardiovascular Emergencies",
    /cardiac|coronary|heart|rhythm|hypertension|pericard|aortic|vascular|thromboembol|dysrhythm|arrhythm|asystole|bradycardia|tachycardia|fibrillation|flutter|arteri|aneurysm|myocard|endocard|valv|tamponade|syncope|palpitat|chest pain|cardiomyopath|torsades|brugada|cor pulmonale|heart block|\bav block\b|bundle branch/i,
  ],
  [
    "Respiratory Emergencies",
    /respirat|pulmonary|asthma|wheez|pneum|pleur|hemoptysis|bronchiol|croup|stridor|bronchit|cough|cyanos|hypox|empyema|pleural/i,
  ],
  [
    "Trauma",
    /trauma|injur|fracture|dislocation|wound|burn|amputation|sprain|laceration|soft tissue|extremit|limb|crush|degloving|compartment syndrome/i,
  ],
  [
    "Musculoskeletal & Rheumatology",
    /arthritis|arthr|joint|bursitis|tendon|ligament|musculoskeletal|fibromyalgia|gout|ankylosing|spondylitis|hip|knee|shoulder(?!.*dystocia)|back pain|neck pain/i,
  ],
  [
    "Gastrointestinal & Surgical Emergencies",
    /abdom|gastro|intestinal|bowel|hepatic|liver|jaundice|pancrea|biliary|hernia|anorectal|anal|rectal|appendic|ascites|periton|constipat|diarrhea|vomit|nausea|ulcer|fissure|fistula|hemorrhoid|diverticul|cholecyst|gallstone|ileus|obstruction|esophag|stomach|hematemesis|melena|perianal|chole|boerhaave|mediastin|cirrhosis|meckel|volvulus/i,
  ],
  [
    "Neurologic Emergencies",
    /neuro|stroke|seizure|headache|vertigo|weakness|spinal|mening|encephal|mental status|confusion|delirium|dementia|myasthenia|guillain|parkinson|tremor|neuropathy|radiculopathy|sclerosis|palsy|ataxia|gait|cauda|carpal tunnel|spondyl|myelopathy|\bcoma\b|unresponsive|aphasia/i,
  ],
  [
    "Toxicology & Environmental",
    /toxic|poison|overdose|withdrawal|envenom|temperature|drowning|radiation|bite|sting|snake|spider|scorpion|alcohol|ethanol|methanol|ethylene glycol|carbon monoxide|cyanide|acetaminophen|salicylate|cholinergic|serotonin|methemoglobin|caustic|corrosive|hydrocarbon|volatile|pesticide|herbicide|toxin|mushroom|nicotine|xanthine|sedative|hypnotic|anticonvulsant|psychopharmac|\bdrug\b|vitamin|herbal|botulism|biologic|chemical weapon|nerve agent|\bheat\b|hypertherm|hypotherm|frostbite|cold injur|altitude|decompression|lightning|electrocution|electrical injur|iron poisoning|iron overdose|\blead\b/i,
  ],
  [
    "Pediatrics",
    /pediatric|child|neonat|infant|kawasaki|intussusception|pyloric|bronchiolitis/i,
  ],
  [
    "Obstetrics & Gynecology",
    /pregnan|obstetric|gynec|vaginal|uter|ovarian|abortion|delivery|amenorrhea|menstr|dysmenorrhea|pelvic|ectopic|preeclampsia|eclampsia|placenta|postpartum|\blabor\b|breast|mastitis|cervic|endometri|fibroid|cesarean|fetal|gestation|trimester|amniotic|dystocia|endometritis|chorioamnionitis/i,
  ],
  [
    "Infectious Disease",
    /infect|fever|sepsis|viral|bacterial|parasite|hiv|hepatitis|ameb|abscess|cellulitis|tetanus|rabies|malaria|tuberculos|gonorrhea|chlamydia|syphilis|herpes|zoster|erysipelas|foodborne|waterborne|\btravel\b|babes|tick|lyme|chancroid|sexually transmitted|\bstd\b/i,
  ],
  [
    "Renal & Genitourinary",
    /renal|kidney|urinary|ureter|ureth|testic|prostat|dialysis|oliguria|anuria|hematuria|dysuria|nephro|glomerulo|pyelo|cystitis|urolith|lithiasis|stone|genital|urologic|penile|scrotal|epididym/i,
  ],
  [
    "Endocrine & Metabolic",
    /diabet|endocr|thyroid|adrenal|metabolic|glucose|acidos|alkalos|ketoacidos|lactate|hypercalc|hyponatrem|hyperkal|hypokal|cushing|addison|pheo|parathyroid|pituitary|myxedema|acromegaly|siadh/i,
  ],
  [
    "Hematology & Oncology",
    /hemat|anemia|coagul|bleed|oncolog|cancer|leuk|lymphoma|hemophil|sickle|transfusion|coagulopath|hemolyt|platelet|anticoagul|fibrinolyt|polycythemia|myeloma/i,
  ],
  [
    "ENT, Ophthalmology & Dental",
    /ocular|eye|vision|ophthalm|ear|nasal|sinus|throat|dental|oral|epistaxis|pharyngitis|tonsill|otitis|mastoid|cerumen|tooth|peritonsillar|retropharyngeal|corneal|cornea|retinal|retina|conjunctiv|glaucoma|face|jaw|mandib|maxillo|facial/i,
  ],
  [
    "Dermatology & Allergy",
    /skin|rash|dermat|urticaria|allerg|angioedema|pruritus|eczema|psoriasis|blister|purpura|petechiae|erythema|stevens|toxic epidermal|necrolysis/i,
  ],
  [
    "Psychiatry & Behavioral",
    /psychi|behavior|agitation|suicid|psychosis|anxiety|panic|conversion|bipolar|depress|eating disorder|malingering/i,
  ],
];

export function highYieldSectionFor(title: string): string {
  return (
    sectionRules.find(([, pattern]) => pattern.test(title))?.[0] ??
    "General Emergency Medicine"
  );
}

/** All classifier section titles, exported so navigation layers can cover them. */
export const HIGH_YIELD_SECTION_TITLES: string[] = sectionRules.map(
  ([title]) => title
);

const slug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export function buildHighYieldChapterMap(
  source: HighYieldSource,
  records: HighYieldSourceTopic[]
): HighYieldMapChapter[] {
  if (source === "rosh") {
    return records.map((record, sourceIndex) => ({
      id: record.unitId,
      title: record.title,
      topics: [{ ...record, id: record.unitId, sourceIndex }],
    }));
  }

  const groups = new Map<string, HighYieldMapTopic[]>();
  records.forEach((record, sourceIndex) => {
    const section = highYieldSectionFor(record.title);
    groups.set(section, [
      ...(groups.get(section) ?? []),
      { ...record, id: record.unitId, sourceIndex },
    ]);
  });
  return Array.from(groups, ([title, topics]) => ({
    id: `${source}-${slug(title)}`,
    title,
    topics,
  }));
}
