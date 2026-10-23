export type StudyPlanId = "residency-year-1" | "residency-year-2" | "residency-year-3" | "residency-year-4" | "jordan-board-part-1" | "jordan-board-part-2";
export type StudyPlanInput = { planId: StudyPlanId; examDate?: string; dailyHours: number; restDays: number[]; completedContent: number; totalContent: number; qbankCorrect: number; qbankAttempted: number; weakAreas: string[] };
export type DailyTask = { id: string; kind: "learn" | "practice" | "atlas" | "journal" | "review"; minutes: number; title: string; href: string; priority: "high" | "normal" };
export type StudyPlan = StudyPlanInput & { progressPercentage: number; readinessPercentage: number; dailyTasks: DailyTask[]; disclaimer: string };
const focus: Record<StudyPlanId, string> = { "residency-year-1":"Foundations and safe assessment", "residency-year-2":"Core presentations and independent management", "residency-year-3":"Complex cases and critical care", "residency-year-4":"Leadership and exam consolidation", "jordan-board-part-1":"Basic scientific and clinical principles", "jordan-board-part-2":"Advanced clinical science and competence" };
export function buildStudyPlan(input: StudyPlanInput, now = new Date()): StudyPlan {
  if (!Number.isFinite(input.dailyHours) || input.dailyHours < 0.5 || input.dailyHours > 16) throw new Error("Daily hours must be between 0.5 and 16");
  const content = input.totalContent > 0 ? Math.min(100, (input.completedContent / input.totalContent) * 100) : 0;
  const accuracy = input.qbankAttempted > 0 ? Math.max(0, Math.min(100, (input.qbankCorrect / input.qbankAttempted) * 100)) : 0;
  const progressPercentage = Math.round(content * 0.6 + accuracy * 0.4);
  const readinessPercentage = Math.round(Math.min(100, progressPercentage * 0.7 + (input.weakAreas.length ? 10 : 30)));
  const daysToExam = input.examDate ? Math.ceil((new Date(input.examDate).getTime() - now.getTime()) / 86400000) : Infinity;
  const overdue = content < 50 && daysToExam < 90;
  const minutes = Math.round(input.dailyHours * 60);
  const weakMinutes = input.weakAreas.length ? Math.round(minutes * 0.15) : 0;
  const available = minutes - weakMinutes;
  const learn = Math.round(available * (overdue ? 0.35 : 0.45)), practice = Math.round(available * (overdue ? 0.45 : 0.35)), review = available - learn - practice;
  const dailyTasks: DailyTask[] = [
    { id: `${input.planId}-learn`, kind: "learn", minutes: learn, title: `Learn: ${focus[input.planId]}`, href: "/learn", priority: "normal" },
    { id: `${input.planId}-practice`, kind: "practice", minutes: practice, title: "Practice targeted Qbank set", href: "/practice/create", priority: input.weakAreas.length ? "high" : "normal" },
    { id: `${input.planId}-atlas`, kind: "atlas", minutes: Math.max(5, Math.round(review * 0.4)), title: "Review linked visual assets", href: "/atlas", priority: "normal" },
    { id: `${input.planId}-journal`, kind: "journal", minutes: Math.max(5, review - Math.round(review * 0.4)), title: "Record one learning reflection", href: "/journal", priority: "normal" },
  ];
  dailyTasks[2].minutes = Math.round(review * 0.4);
  dailyTasks[3].minutes = review - dailyTasks[2].minutes;
  if (input.weakAreas.length) dailyTasks.splice(1, 0, { id: `${input.planId}-weak-area`, kind: "review", minutes: weakMinutes, title: `Weak-area recovery: ${input.weakAreas[0]}`, href: "/practice/performance", priority: "high" });
  if (input.restDays.includes(now.getDay())) dailyTasks.splice(0, dailyTasks.length);
  const calendarDay = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  if (input.examDate && calendarDay >= input.examDate) dailyTasks.splice(0, dailyTasks.length);
  return { ...input, progressPercentage, readinessPercentage, dailyTasks, disclaimer: "Readiness is an internal study signal, not a guarantee of examination success. Board coverage cannot be claimed without an official blueprint." };
}
