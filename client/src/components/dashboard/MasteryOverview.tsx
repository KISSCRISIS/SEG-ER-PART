import React from "react";
import Bi from "@/components/Bi";
import { Link } from "wouter";
import {
  ArrowUpRight,
  NotebookPen,
  ShieldAlert,
  Target,
} from "lucide-react";
import type {
  DashboardNote,
  DashboardPracticeSummary,
  MasterySection,
  MasterySummary,
} from "./types";
import { formatActivityTime } from "./utils";

export type MasteryOverviewSection = "knowledge" | "weak" | "due";

function MasteryBar({
  label,
  value,
  tone = "cyan",
}: {
  label: string;
  value: number;
  tone?: "cyan" | "amber";
}) {
  return (
    <div>
      <div className="flex justify-between gap-3 text-[10px]">
        <span className="truncate text-slate-300">{label}</span>
        <span className="font-bold text-slate-100">{value}%</span>
      </div>
      <div className="mt-1 h-1.5 rounded-full bg-white/10">
        <div
          className={`h-full rounded-full ${tone === "amber" ? "bg-gradient-to-r from-rose-400 to-amber-300" : "bg-gradient-to-r from-cyan-300 to-emerald-300"}`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}

/**
 * Merged mastery cards: overall mastery summary, weakest areas, due review
 * items, and the next recommended review. All three blocks derive from the
 * same mastery/practice/exam/note payloads, computed once here.
 * The `sections` prop preserves the existing Dashboard grid placement.
 */
export default function MasteryOverview({
  mastery,
  practice,
  notes = [],
  sections = ["knowledge", "weak", "due"],
}: {
  mastery?: MasterySummary;
  practice?: DashboardPracticeSummary;
  notes?: DashboardNote[];
  sections?: MasteryOverviewSection[];
}) {
  const displaySections: MasterySection[] = mastery?.strongest.length
    ? mastery.strongest
    : [
        {
          sectionId: 4,
          sectionTitle: "Cardiovascular Emergencies",
          attempted: 0,
          correct: 0,
          accuracy: 0,
          questionCount: 0,
        },
        {
          sectionId: 7,
          sectionTitle: "Trauma and Acute Surgical Emergencies",
          attempted: 0,
          correct: 0,
          accuracy: 0,
          questionCount: 0,
        },
        {
          sectionId: 6,
          sectionTitle: "Neurological Emergencies",
          attempted: 0,
          correct: 0,
          accuracy: 0,
          questionCount: 0,
        },
      ];

  const weakAreas: MasterySection[] = mastery?.weakest.length
    ? mastery.weakest
    : [
        {
          sectionId: 20,
          sectionTitle: "Question Bank and Exam Preparation",
          attempted: 0,
          correct: 0,
          accuracy: 0,
          questionCount: 0,
        },
      ];

  const weakSection = mastery?.nextRecommendedSection;
  const incorrectAttempts =
    practice?.recent
      ?.filter(attempt => !Number(attempt.correct))
      .slice(0, 2)
      .map(attempt => ({
        title: `Review missed question ${attempt.questionId}`,
        detail: `${attempt.family} · Chapter ${attempt.chapterNumber}`,
        href: "/practice/performance",
        icon: ShieldAlert,
        tone: "rose" as const,
      })) ?? [];
  const noteReviews = notes
    .filter(note => !note.lastReviewedAt || note.bookmarked)
    .slice(0, 2)
    .map(note => ({
      title: note.bookmarked ? `Bookmarked: ${note.title}` : note.title,
      detail: note.lastReviewedAt
        ? `Reviewed ${formatActivityTime(note.lastReviewedAt)}`
        : "Personal note not reviewed yet",
      href: "/journal",
      icon: NotebookPen,
      tone: "cyan" as const,
    }));
  const dueItems = [
    ...(weakSection
      ? [
          {
            title: weakSection.sectionTitle,
            detail: `${weakSection.accuracy}% accuracy · ${weakSection.attempted} attempts`,
            href: `/practice/create?section=${weakSection.sectionId}`,
            icon: Target,
            tone: "amber" as const,
          },
        ]
      : []),
    ...incorrectAttempts,
    ...noteReviews,
  ].slice(0, 4);

  return (
    <>
      {sections.includes("knowledge") && (
        <section className="seg-reference-card seg-dashboard-card rounded-xl p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">
              Knowledge Mastery
            </h2>
            <Link
              href="/practice/performance"
              className="text-[10px] font-bold text-cyan-200"
            >
              View All
            </Link>
          </div>
          <div className="mt-5 grid place-items-center">
            <div className="relative grid h-28 w-28 place-items-center rounded-full border border-cyan-200/20 bg-cyan-300/[.06]">
              <Target className="h-8 w-8 text-cyan-300" />
              <span className="absolute bottom-5 text-lg font-black text-white">
                {mastery?.accuracy ?? 0}%
              </span>
            </div>
          </div>
          <p className="mt-3 text-center text-[10px] text-slate-400">
            {mastery?.attempted ?? 0} Qbank attempts analyzed
          </p>
          <div className="mt-4 space-y-3">
            {displaySections.slice(0, 3).map(section => (
              <MasteryBar
                key={section.sectionId}
                label={section.sectionTitle}
                value={section.accuracy}
              />
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-cyan-200/10 bg-cyan-300/[.04] p-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-300">
              Next Review
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-200">
              {mastery?.nextRecommendedSection?.sectionTitle ??
                "Complete your first questions to generate mastery insights"}
            </p>
          </div>
        </section>
      )}
      {sections.includes("weak") && (
        <section className="seg-reference-card seg-dashboard-card rounded-xl p-4 xl:col-span-3">
          <div className="flex justify-between">
            <h2 className="text-sm font-semibold text-white"><Bi t="dash.weakareas" /></h2>
            <Link
              href="/practice/create"
              className="text-[10px] font-bold text-cyan-200"
            >
              Practice
            </Link>
          </div>
          <p className="mt-1 text-[10px] text-slate-500">
            Based on your saved Qbank attempts.
          </p>
          <div className="mt-4 space-y-3">
            {weakAreas.slice(0, 4).map(section => (
              <MasteryBar
                key={section.sectionId}
                label={section.sectionTitle}
                value={section.accuracy}
                tone="amber"
              />
            ))}
          </div>
        </section>
      )}
      {sections.includes("due") && (
        <section className="seg-reference-card seg-dashboard-card rounded-xl p-4 xl:col-span-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-white">
                Due Review Items
              </h2>
              <p className="mt-1 text-[10px] text-slate-500">
                Missed questions, weak sections, and notes needing review.
              </p>
            </div>
            <Link
              href="/practice/performance"
              className="text-[10px] font-bold text-cyan-200"
            >
              Review
            </Link>
          </div>
          <div className="mt-4 space-y-2.5">
            {dueItems.length ? (
              dueItems.map(({ title, detail, href, icon: Icon, tone }) => (
                <Link
                  key={`${title}-${detail}`}
                  href={href}
                  className="flex items-center gap-3 rounded-xl border border-white/[.06] bg-[#07111e]/70 p-3 transition hover:border-cyan-200/25"
                >
                  <div
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border ${
                      tone === "rose"
                        ? "border-rose-300/20 bg-rose-300/[.08] text-rose-200"
                        : tone === "amber"
                          ? "border-amber-300/20 bg-amber-300/[.08] text-amber-200"
                          : "border-cyan-200/20 bg-cyan-300/[.08] text-cyan-200"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-white">
                      {title}
                    </p>
                    <p className="mt-0.5 truncate text-[10px] text-slate-400">
                      {detail}
                    </p>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-cyan-200" />
                </Link>
              ))
            ) : (
              <div className="rounded-lg border border-dashed border-cyan-200/15 bg-cyan-300/[.03] p-3 text-xs leading-5 text-slate-400">
                Nothing is due yet. Answer questions and review notes to unlock
                a personal queue.
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
