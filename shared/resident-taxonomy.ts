export const RESIDENT_PATHWAY_SECTIONS = [
  [1, "Orientation and Residency Roadmap"],
  [2, "Emergency Medicine Foundations"],
  [3, "Resuscitation and Critical Care"],
  [4, "Cardiovascular Emergencies"],
  [5, "Respiratory Emergencies"],
  [6, "Neurological Emergencies"],
  [7, "Trauma and Acute Surgical Emergencies"],
  [8, "Toxicology and Environmental Emergencies"],
  [9, "Infectious Diseases and Sepsis"],
  [10, "Renal, Electrolyte, Acid–Base and Endocrine Emergencies"],
  [11, "Gastrointestinal and Hepatobiliary Emergencies"],
  [12, "Pediatric Emergency Medicine"],
  [13, "Obstetric and Gynecological Emergencies"],
  [14, "ENT, Ophthalmology and Dental Emergencies"],
  [15, "Musculoskeletal, Orthopedic and Plastic Emergencies"],
  [16, "Dermatology and Allergy Emergencies"],
  [17, "Diagnostic Reasoning and Investigations"],
  [18, "Emergency Procedures and Practical Skills"],
  [19, "Communication, Ethics, Safety and Systems"],
  [20, "Question Bank and Exam Preparation"],
  [21, "Clinical Cases and Simulation"],
  [22, "Personal Learning Record"],
] as const;

export type ResidentSectionId = (typeof RESIDENT_PATHWAY_SECTIONS)[number][0];

export function getResidentSection(sectionId: number) {
  return RESIDENT_PATHWAY_SECTIONS.find(([id]) => id === sectionId);
}

/** Structural mapping only: it classifies existing source chapter titles without changing medical content. */
export function classifyResidentChapter(title: string): ResidentSectionId {
  const value = title.toUpperCase();
  if (/PAEDIATR|PEDIATR/.test(value)) return 12;
  if (/OBSTET|GYNAE|GYNE|SEXUAL/.test(value)) return 13;
  if (/OPHTHAL|EAR|NOSE|THROAT|DENTAL|MAXILLOFACIAL|HEAD, EAR, EYE/.test(value))
    return 14;
  if (/MUSCULOSKELET|ORTHOP|PLASTIC/.test(value)) return 15;
  if (/DERMAT|CUTANEOUS|ALLERGY|IMMUNE/.test(value)) return 16;
  if (/CARDIO|VASCULAR/.test(value)) return 4;
  if (/RESPIRATORY|THORACIC/.test(value)) return 5;
  if (/NEURO|NERVOUS/.test(value)) return 6;
  if (/TRAUMA|SURGICAL/.test(value)) return 7;
  if (/TOXICO|POISON|PHARMACOLOGY|ENVIRONMENTAL/.test(value)) return 8;
  if (/INFECTIOUS|SEPSIS/.test(value)) return 9;
  if (
    /RENAL|NEPHRO|UROLOGY|UROGENITAL|ENDOCRINE|METABOLIC|ELECTROLYTE|ACID/.test(
      value
    )
  )
    return 10;
  if (/GASTRO|ABDOMINAL|HEPATO/.test(value)) return 11;
  if (/ULTRASOUND|INVESTIGATION|DIAGNOSTIC/.test(value)) return 17;
  if (/PROCEDURE|SKILLS/.test(value)) return 18;
  if (
    /SLO7|QUALITY|STATISTICS|PALLIATIVE|MENTAL|PSYCHO|ELDERLY|ETHIC|SAFETY|SYSTEM|EMTALA|TRANSFER|HANDOVER|DISPOSITION|RISK|LEGAL|LIABILITY|COMMUNICATION/.test(
      value
    )
  )
    return 19;
  if (/RESUSCITATION|PAIN|SEDATION/.test(value)) return 3;
  return 2;
}
