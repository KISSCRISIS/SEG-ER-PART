import { highYieldSectionFor } from "@/lib/high-yield-chapter-map";

/**
 * Static navigation catalog for "Browse by Medical System".
 *
 * This file describes navigation only. It never contains medical content:
 * topic counts, algorithms, and exam pearls are hydrated at runtime from the
 * generated navigation index
 * (`client/public/content/medical-systems-index.json`), which itself is
 * derived from the existing summary sources without modifying them.
 */

export type MedicalSystemIconKey =
  | "heart"
  | "respiratory"
  | "neurology"
  | "trauma"
  | "toxicology"
  | "infectious"
  | "gastrointestinal"
  | "renal"
  | "endocrinology"
  | "pediatrics"
  | "obgyn"
  | "ent"
  | "dermatology"
  | "musculoskeletal"
  | "critical-care"
  | "general";

export interface MedicalSystem {
  id: string;
  title: string;
  icon: MedicalSystemIconKey;
  route: string;
  blurb: string;
  accent: string;
}

export type SummarySource = "rosh" | "tintinalli" | "rosen";

export const MEDICAL_SYSTEMS: MedicalSystem[] = [
  {
    id: "cardiovascular",
    title: "Cardiovascular",
    icon: "heart",
    route: "/learn/system/cardiovascular",
    blurb: "Heart and circulation topics from your study sources.",
    accent: "border-rose-200/25 from-rose-400/15 to-cyan-500/10",
  },
  {
    id: "respiratory",
    title: "Respiratory",
    icon: "respiratory",
    route: "/learn/system/respiratory",
    blurb: "Airway, breathing, and lung topics from your study sources.",
    accent: "border-sky-200/25 from-sky-400/15 to-cyan-500/10",
  },
  {
    id: "neurology",
    title: "Neurology",
    icon: "neurology",
    route: "/learn/system/neurology",
    blurb: "Brain, spine, and nervous-system topics from your study sources.",
    accent: "border-violet-200/25 from-violet-400/15 to-cyan-500/10",
  },
  {
    id: "trauma",
    title: "Trauma",
    icon: "trauma",
    route: "/learn/system/trauma",
    blurb: "Acute injury, wound, burn, and fracture topics.",
    accent: "border-orange-200/25 from-orange-400/15 to-cyan-500/10",
  },
  {
    id: "musculoskeletal",
    title: "Musculoskeletal",
    icon: "musculoskeletal",
    route: "/learn/system/musculoskeletal",
    blurb: "Joint, bone, muscle, and rheumatology topics.",
    accent: "border-stone-200/25 from-stone-400/15 to-cyan-500/10",
  },
  {
    id: "toxicology",
    title: "Toxicology",
    icon: "toxicology",
    route: "/learn/system/toxicology",
    blurb: "Poisoning, overdose, and environmental emergency topics.",
    accent: "border-lime-200/25 from-lime-400/15 to-cyan-500/10",
  },
  {
    id: "infectious-disease",
    title: "Infectious Diseases",
    icon: "infectious",
    route: "/learn/system/infectious-disease",
    blurb: "Infection, fever, and sepsis topics from your study sources.",
    accent: "border-emerald-200/25 from-emerald-400/15 to-cyan-500/10",
  },
  {
    id: "gastrointestinal",
    title: "Gastrointestinal",
    icon: "gastrointestinal",
    route: "/learn/system/gastrointestinal",
    blurb: "Digestive-system and abdominal emergency topics.",
    accent: "border-amber-200/25 from-amber-400/15 to-cyan-500/10",
  },
  {
    id: "renal-urology",
    title: "Renal & Urology",
    icon: "renal",
    route: "/learn/system/renal-urology",
    blurb: "Kidney, urinary, and genitourinary topics.",
    accent: "border-cyan-200/25 from-cyan-400/15 to-blue-500/10",
  },
  {
    id: "endocrinology",
    title: "Endocrinology",
    icon: "endocrinology",
    route: "/learn/system/endocrinology",
    blurb: "Hormone, gland, and metabolic topics from your study sources.",
    accent: "border-fuchsia-200/25 from-fuchsia-400/15 to-cyan-500/10",
  },
  {
    id: "pediatrics",
    title: "Pediatrics",
    icon: "pediatrics",
    route: "/learn/system/pediatrics",
    blurb: "Child, neonatal, and infant emergency topics.",
    accent: "border-teal-200/25 from-teal-400/15 to-cyan-500/10",
  },
  {
    id: "obstetrics-gynecology",
    title: "Obstetrics & Gynecology",
    icon: "obgyn",
    route: "/learn/system/obstetrics-gynecology",
    blurb: "Pregnancy and female-health emergency topics.",
    accent: "border-pink-200/25 from-pink-400/15 to-cyan-500/10",
  },
  {
    id: "ent-ophthalmology",
    title: "ENT / Ophthalmology",
    icon: "ent",
    route: "/learn/system/ent-ophthalmology",
    blurb: "Eye, ear, nose, throat, and dental emergency topics.",
    accent: "border-indigo-200/25 from-indigo-400/15 to-cyan-500/10",
  },
  {
    id: "dermatology",
    title: "Dermatology",
    icon: "dermatology",
    route: "/learn/system/dermatology",
    blurb: "Skin, rash, and allergy emergency topics.",
    accent: "border-yellow-200/25 from-yellow-400/15 to-cyan-500/10",
  },
  {
    id: "hematologic",
    title: "Hematology",
    icon: "general",
    route: "/learn/system/hematologic",
    blurb: "Anemia, coagulation, and hematologic emergency topics.",
    accent: "border-rose-200/25 from-rose-400/15 to-cyan-500/10",
  },
  {
    id: "environmental",
    title: "Environmental",
    icon: "general",
    route: "/learn/system/environmental",
    blurb: "Heat, cold, and environmental emergency topics.",
    accent: "border-orange-200/25 from-orange-400/15 to-cyan-500/10",
  },
  {
    id: "critical-care",
    title: "Resuscitation & Critical Care",
    icon: "critical-care",
    route: "/learn/system/critical-care",
    blurb: "Airway, shock, and resuscitation topics across your sources.",
    accent: "border-red-200/25 from-red-400/15 to-cyan-500/10",
  },
  {
    id: "general-other",
    title: "General & Other Topics",
    icon: "general",
    route: "/learn/system/general-other",
    blurb: "Topics outside a single body system, still fully browsable.",
    accent: "border-slate-200/25 from-slate-400/15 to-cyan-500/10",
  },
];

/**
 * Maps existing chapter-map section titles (see
 * `client/src/lib/high-yield-chapter-map.ts`) to medical systems. Every
 * section must map somewhere so no source topic is hidden from system
 * browsing; topics stay reachable through their books regardless.
 */
export const SECTION_TO_SYSTEM: Record<string, string> = {
  "Cardiovascular Emergencies": "cardiovascular",
  "Respiratory Emergencies": "respiratory",
  "Neurologic Emergencies": "neurology",
  Trauma: "trauma",
  "Musculoskeletal & Rheumatology": "musculoskeletal",
  "Gastrointestinal & Surgical Emergencies": "gastrointestinal",
  "Toxicology & Environmental": "toxicology",
  "Infectious Disease": "infectious-disease",
  "Renal & Genitourinary": "renal-urology",
  "Endocrine & Metabolic": "endocrinology",
  Pediatrics: "pediatrics",
  "Obstetrics & Gynecology": "obstetrics-gynecology",
  "ENT, Ophthalmology & Dental": "ent-ophthalmology",
  "Dermatology & Allergy": "dermatology",
  "Resuscitation & Critical Care": "critical-care",
  "Hematology & Oncology": "general-other",
  "Psychiatry & Behavioral": "general-other",
  "General Emergency Medicine": "general-other",
};

/**
 * Rosh chapters are already body-system organized, so they map by exact
 * source title. Orthopedics/Rheumatology maps to trauma because emergency
 * musculoskeletal injuries are managed through the trauma pathway.
 */
export const ROSH_TITLE_TO_SYSTEM: Record<string, string> = {
  "cardiovascular system": "cardiovascular",
  "orthopedics/rheumatology": "musculoskeletal",
  "gastrointestinal/nutritional": "gastrointestinal",
  pulmonology: "respiratory",
  neurology: "neurology",
  "enot/ophthalmology": "ent-ophthalmology",
  "urology/renal": "renal-urology",
  dermatology: "dermatology",
  endocrinology: "endocrinology",
  "obstetrics/gynecology": "obstetrics-gynecology",
  "psychiatry/behavioral medicine": "general-other",
  hematology: "general-other",
};

const FALLBACK_SYSTEM = "general-other";

/**
 * Resolves the medical system for one source topic without changing the
 * source record. Tintinalli and Rosen titles reuse the shared chapter-map
 * classifier; Rosh uses its explicit system chapters.
 */
export function systemForTopic(
  source: SummarySource,
  title: string
): string {
  if (source === "rosh") {
    const direct = ROSH_TITLE_TO_SYSTEM[title.trim().toLowerCase()];
    if (direct) return direct;
  }
  const section = highYieldSectionFor(title);
  return SECTION_TO_SYSTEM[section] ?? FALLBACK_SYSTEM;
}

const systemById = new Map(MEDICAL_SYSTEMS.map(system => [system.id, system]));

export function medicalSystemById(id: string): MedicalSystem | undefined {
  return systemById.get(id);
}

export function isMedicalSystemId(id: string): boolean {
  return systemById.has(id);
}

/** Card-ready data: static catalog entry hydrated with live index counts. */
export interface MedicalSystemCardData extends MedicalSystem {
  topicCount: number;
  chapterCount: number;
  algorithmCount: number;
  examPearlsCount: number;
  tablesCount: number;
  sources: SummarySource[];
  sourceCounts: SourceCounts[];
}

/**
 * Chapter versus topic follows the sources themselves: Rosh and Tintinalli
 * records are chapter-level summaries, Rosen records are source-indexed
 * quick topics. Nothing is redefined; the label only reflects the source.
 */
export type SystemTopicKind = "chapter" | "topic";

/** One browsable topic inside the generated navigation index. */
export interface IndexedSystemTopic {
  id: string;
  title: string;
  arabicTitle: string | null;
  source: SummarySource;
  kind: SystemTopicKind;
  href: string;
  hasAlgorithm: boolean;
  hasPearls: boolean;
  hasTables: boolean;
}

export interface SourceCounts {
  source: SummarySource;
  topics: number;
  chapters: number;
}

export interface IndexedMedicalSystem {
  id: string;
  topicCount: number;
  chapterCount: number;
  algorithmCount: number;
  examPearlsCount: number;
  tablesCount: number;
  sources: SummarySource[];
  sourceCounts: SourceCounts[];
  topics: IndexedSystemTopic[];
}

export interface MedicalSystemsIndex {
  schemaVersion: 1;
  generatedAt: string;
  sources: Record<SummarySource, number>;
  systems: IndexedMedicalSystem[];
}

export const MEDICAL_SYSTEMS_INDEX_URL =
  "/content/medical-systems-index.json";

export function mergeSystemCards(
  index: MedicalSystemsIndex
): MedicalSystemCardData[] {
  const byId = new Map(index.systems.map(entry => [entry.id, entry]));
  return MEDICAL_SYSTEMS.map(system => {
    const entry = byId.get(system.id);
    return {
      ...system,
      topicCount: entry?.topicCount ?? 0,
      chapterCount: entry?.chapterCount ?? 0,
      algorithmCount: entry?.algorithmCount ?? 0,
      examPearlsCount: entry?.examPearlsCount ?? 0,
      tablesCount: entry?.tablesCount ?? 0,
      sources: entry?.sources ?? [],
      sourceCounts: entry?.sourceCounts ?? [],
    };
  });
}
