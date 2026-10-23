import {
  Activity,
  Award,
  BrainCircuit,
  FileCheck2,
  HeartPulse,
  Stethoscope,
  Target,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";

/**
 * PLACEHOLDER DATA — Dashboard pilot stand-ins.
 *
 * These constants preserve the exact approved Dashboard visuals while real
 * data wiring is pending. They are NOT connected to any API, database, or
 * scoring service. Replace each with a live data source (and delete it here)
 * once the corresponding service lands. Do not invent additional values.
 */

/** PLACEHOLDER DATA: static Learning/Practice/Mastery percentages. */
export const progress = [
  ["Learning", 72, BrainCircuit],
  ["Practice", 65, Stethoscope],
  ["Mastery", 58, Target],
] as const;

/** PLACEHOLDER DATA: static learning-pathway modules. */
export const learning = [
  ["Advanced Airway Management", "Paramedic pathway", "68%", Stethoscope],
  ["Cardiac Arrest Algorithms", "ACLS Module", "Next Up", HeartPulse],
  ["Trauma Assessment", "ATLS Module", "Upcoming", UserRoundCheck],
] as const;

/** PLACEHOLDER DATA: static professional-growth domain scores. */
export const professionalDomains = [
  {
    title: "Resuscitation",
    subtitle: "Shock, arrest, airway, sepsis",
    value: 68,
    target: "Lead first 10 minutes safely",
    icon: HeartPulse,
  },
  {
    title: "Undifferentiated Care",
    subtitle: "Triage, worst-first diagnosis",
    value: 61,
    target: "Build complaint-based differentials",
    icon: Stethoscope,
  },
  {
    title: "Procedures",
    subtitle: "Airway, lines, sedation, POCUS",
    value: 54,
    target: "Document supervised entrustment",
    icon: Activity,
  },
  {
    title: "Flow & Systems",
    subtitle: "Handover, safety, crowding, QI",
    value: 42,
    target: "Start one small QI cycle",
    icon: FileCheck2,
  },
  {
    title: "Communication",
    subtitle: "Team leadership, families, ethics",
    value: 57,
    target: "Practice closed-loop handover",
    icon: UsersRound,
  },
  {
    title: "Scholarship",
    subtitle: "Evidence, reflection, teaching",
    value: 38,
    target: "Add one reviewed journal note",
    icon: Award,
  },
] as const;

/** PLACEHOLDER DATA: static recent-activity rows. */
export const activity = [
  ["Completed: ECG Interpretation", "2 hours ago", "complete"],
  ["Quiz: ACLS Post Test", "5 hours ago", "score"],
  ["Studied: Sepsis Management", "1 day ago", "complete"],
  ["Bookmarked: Hyperkalemia", "2 days ago", "bookmark"],
] as const;

/** PLACEHOLDER DATA: static certification records. */
export const records = [
  ["BLS Provider", "American Heart Association", "Valid"],
  ["ACLS Provider", "American Heart Association", "Valid"],
  ["ATLS Provider", "American College of Surgeons", "In Progress"],
] as const;
