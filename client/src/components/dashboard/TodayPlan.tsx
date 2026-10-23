import React from "react";
import Bi from "@/components/Bi";
import { Link } from "wouter";
import {
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  CircleHelp,
  ClipboardList,
  NotebookPen,
} from "lucide-react";
import type {
  DashboardExam,
  DashboardNote,
  DashboardPracticeSummary,
  DashboardTrainingPlan,
  MasterySummary,
} from "./types";
import { sectionTitle } from "./utils";
import {
  generateRecoveryActions,
  taskReasonFor,
  type IntelligenceTask,
  type IntelligenceTaskType,
} from "@shared/study-plan-intelligence";

/**
 * Merged today-plan cards: upcoming learning items plus the daily
 * Read/Qbank/Review plan. Both blocks derive the target section once from
 * the same mastery + training-plan inputs.
 */
export default function TodayPlan({
  mastery,
  practice,
  exams = [],
  notes = [],
  trainingPlan,
}: {
  mastery?: MasterySummary;
  practice?: DashboardPracticeSummary;
  exams?: DashboardExam[];
  notes?: DashboardNote[];
  trainingPlan: DashboardTrainingPlan;
}) {
  const pausedExam = exams.find(exam => exam.status === "paused");
  const lastNote = notes[0];
  const nextSection = mastery?.nextRecommendedSection;
  const targetSectionId =
    nextSection?.sectionId ?? trainingPlan.primarySectionId;
  const targetSectionTitle =
    nextSection?.sectionTitle ?? sectionTitle(trainingPlan.primarySectionId);
  const recentAttempts = practice?.recent?.length ?? 0;

  const upcomingItems = [
    pausedExam
      ? {
          title: `Resume: ${pausedExam.name}`,
          subtitle: "Continue the paused Qbank exam from its saved position.",
          status: "Resume",
          category: "PRACTICE" as IntelligenceTaskType,
          href: `/practice/create?resume=${pausedExam.id}`,
          icon: ClipboardList,
        }
      : {
          title: nextSection
            ? `Focused set: ${nextSection.sectionTitle}`
            : `${trainingPlan.label} focused Qbank: ${targetSectionTitle}`,
          subtitle: nextSection
            ? "Start with a focused set to repair the current weak area."
            : `${trainingPlan.questionTarget} questions aligned with your training level.`,
          status: "Qbank",
          category: "PRACTICE" as IntelligenceTaskType,
          href: `/practice/create?section=${targetSectionId}`,
          icon: CircleHelp,
        },
    {
      title: `Read: ${targetSectionTitle}`,
      subtitle: `${trainingPlan.readingMinutes}-minute reading block before questions.`,
      status: "Learn",
      category: "LEARN" as IntelligenceTaskType,
      href: `/learn?section=${targetSectionId}`,
      icon: BookOpen,
    },
    {
      title: lastNote
        ? `Revisit note: ${lastNote.title}`
        : "Review saved notes",
      subtitle: "Close one weak point with a journal note or exam trap.",
      status: "Recall",
      category: "REVIEW" as IntelligenceTaskType,
      href: "/journal",
      icon: NotebookPen,
    },
  ] as const;

  const readReason = taskReasonFor({ kind: "learn" });
  const qbankReason = taskReasonFor({ kind: "practice", paused: !!pausedExam });
  const reviewReason = taskReasonFor({
    kind: "review",
    hasWeakArea: !!nextSection,
  });

  const plan = [
    {
      label: "Read",
      value: `${trainingPlan.readingMinutes} min`,
      detail: targetSectionTitle,
      href: `/learn?section=${targetSectionId}`,
      done: false,
      category: readReason.category,
      reason: readReason.reason,
      priority: undefined as number | undefined,
    },
    {
      label: pausedExam ? "Resume exam" : "Qbank",
      value: pausedExam ? "Paused" : `${trainingPlan.questionTarget} Qs`,
      detail: pausedExam?.name ?? "Timed or Tutor focused set",
      href: pausedExam
        ? `/practice/create?resume=${pausedExam.id}`
        : `/practice/create?section=${targetSectionId}`,
      done: recentAttempts >= trainingPlan.questionTarget,
      category: qbankReason.category,
      reason: qbankReason.reason,
      priority: undefined as number | undefined,
    },
    {
      label: "Review",
      value: `${trainingPlan.reviewMinutes} min`,
      detail: nextSection
        ? "Weak-area review from your saved attempts"
        : "Incorrect, flagged, or exam-trap review",
      href: "/practice/performance",
      done: false,
      category: reviewReason.category,
      reason: reviewReason.reason,
      priority: undefined as number | undefined,
    },
  ];

  // Intelligence-driven recovery rows (Phase 4-B): repeated errors and weak
  // sections from real Qbank/mastery signals. Same row design, appended
  // after the standard Read/Qbank/Review rows. Existing rows are untouched.
  const recoveryActions: IntelligenceTask[] = generateRecoveryActions({
    weakSections: (mastery?.weakest ?? []).map(section => ({
      sectionId: section.sectionId,
      sectionTitle: section.sectionTitle,
      accuracy: section.accuracy,
      attempted: section.attempted,
    })),
    recentAttempts: (practice?.recent ?? []).map(attempt => ({
      questionId: attempt.questionId,
      correct: attempt.correct,
    })),
    budgetMinutes: trainingPlan.reviewMinutes,
    maxActions: 2,
  });
  const recoveryRows = recoveryActions.map(action => ({
    label: "Recovery",
    value: `${action.minutes} min`,
    detail: `${action.topic} · ${action.reason}`,
    href: action.href,
    done: false,
    category: action.type,
    reason: action.reason,
    priority: action.priority as number | undefined,
  }));

  return (
    <>
      <section className="seg-reference-card seg-dashboard-card rounded-xl p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">
            Upcoming Learning
          </h2>
          <Link href="/learn" className="text-[11px] font-bold text-cyan-200">
            View All
          </Link>
        </div>
        <div className="mt-4 space-y-3">
          {upcomingItems.map(
            ({ title, subtitle, status, category, href, icon: Icon }) => (
              <Link
                key={`${status}-${title}`}
                href={href}
                className="flex items-center gap-3 rounded-xl border border-white/[.06] bg-white/[.018] p-2.5 transition hover:border-cyan-200/25 hover:bg-cyan-300/[.04]"
              >
                <div className="grid h-8 w-8 place-items-center rounded-lg border border-cyan-200/15 bg-cyan-300/[.07]">
                  <Icon className="h-4 w-4 text-cyan-300" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-white">
                    {title}
                  </p>
                  <p className="truncate text-[10px] text-slate-400">
                    {subtitle}
                  </p>
                </div>
                <span className="flex shrink-0 flex-col items-end gap-1">
                  <span className="text-[10px] font-bold text-cyan-200">
                    {status}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-1.5 py-px text-[9px] font-black text-slate-400">
                    {category}
                  </span>
                </span>
              </Link>
            )
          )}
        </div>
      </section>
      <section className="seg-reference-card seg-dashboard-card rounded-xl p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white"><Bi t="dash.daily.plan" /></h2>
          <span className="text-[10px] text-slate-400"><Bi t="dash.pilot" /></span>
        </div>
        <div className="mt-4 space-y-2.5">
          {plan.map(item => (
            <Link
              key={`${item.label}-${item.detail}`}
              href={item.href}
              className="flex items-center justify-between gap-3 rounded-lg border border-white/[.06] bg-[#07111e]/70 px-3 py-2.5 transition hover:border-cyan-200/25"
            >
              <div className="min-w-0">
                <p className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-white">
                  {item.label}
                  <span className="rounded-full border border-white/10 bg-white/5 px-1.5 py-px text-[9px] font-black text-slate-400">
                    {item.category}
                  </span>
                </p>
                <p className="truncate text-[10px] text-slate-400">
                  {item.detail}
                </p>
                <p className="truncate text-[10px] text-cyan-100/80">
                  {item.reason}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="text-[10px] font-bold text-cyan-200">
                  {item.value}
                </span>
                {item.done ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                ) : (
                  <ArrowUpRight className="h-3.5 w-3.5 text-cyan-200" />
                )}
              </div>
            </Link>
          ))}
          {recoveryRows.map(item => (
            <Link
              key={`${item.label}-${item.detail}`}
              href={item.href}
              className="flex items-center justify-between gap-3 rounded-lg border border-rose-300/20 bg-[#07111e]/70 px-3 py-2.5 transition hover:border-rose-200/40"
            >
              <div className="min-w-0">
                <p className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-white">
                  {item.label}
                  <span className="rounded-full border border-rose-300/25 bg-rose-300/10 px-1.5 py-px text-[9px] font-black text-rose-200">
                    {item.category} · {item.priority}
                  </span>
                </p>
                <p className="truncate text-[10px] text-slate-400">
                  {item.detail}
                </p>
                <p className="truncate text-[10px] text-cyan-100/80">
                  {item.reason}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="text-[10px] font-bold text-rose-200">
                  {item.value}
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-rose-200" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
