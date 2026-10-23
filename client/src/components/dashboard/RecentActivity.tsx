import React from "react";
import { Link } from "wouter";
import { CheckCircle2, LibraryBig } from "lucide-react";
import type {
  DashboardExam,
  DashboardNote,
  DashboardPracticeSummary,
} from "./types";
import { formatActivityTime, scorePercent, toArray } from "./utils";

/**
 * Merged activity rows: real Qbank exams, recent attempts, and journal
 * notes, newest first. The static placeholder rows are gone; callers keep
 * their own card headers while this renders the shared row list and the
 * shared empty state.
 */
export default function RecentActivity({
  practice,
  exams = [],
  notes = [],
  limit = 5,
}: {
  practice?: DashboardPracticeSummary;
  exams?: DashboardExam[];
  notes?: DashboardNote[];
  limit?: number;
}) {
  const examItems = exams.slice(0, 2).map(exam => {
    const total = toArray(exam.questionIds).length;
    return {
      title:
        exam.status === "completed"
          ? `Completed exam: ${exam.name}`
          : `Saved exam: ${exam.name}`,
      detail:
        exam.status === "completed"
          ? `${scorePercent(exam.correctCount, total)}% score • ${total} questions`
          : `${exam.status} • ${total} questions`,
      href:
        exam.status === "paused"
          ? `/practice/create?resume=${exam.id}`
          : `/practice/review/${exam.id}`,
      at: exam.updatedAt ?? exam.startedAt,
      kind: "score" as const,
    };
  });

  const attemptItems =
    practice?.recent?.slice(0, 3).map(attempt => ({
      title: `${attempt.correct ? "Correct" : "Incorrect"}: ${attempt.questionId}`,
      detail: `${attempt.family} • Chapter ${attempt.chapterNumber}`,
      href: "/practice/performance",
      at: attempt.attemptedAt,
      kind: attempt.correct ? ("complete" as const) : ("score" as const),
    })) ?? [];

  const noteItems = notes.slice(0, 2).map(note => ({
    title: note.bookmarked
      ? `Bookmarked note: ${note.title}`
      : `Updated note: ${note.title}`,
    detail: note.lastReviewedAt
      ? `Last reviewed ${formatActivityTime(note.lastReviewedAt)}`
      : "Medical journal",
    href: "/journal",
    at: note.updatedAt,
    kind: "bookmark" as const,
  }));

  const items = [...examItems, ...attemptItems, ...noteItems]
    .sort((a, b) => {
      const aTime = a.at ? new Date(a.at).getTime() : 0;
      const bTime = b.at ? new Date(b.at).getTime() : 0;
      return bTime - aTime;
    })
    .slice(0, limit);

  if (!items.length) {
    return (
      <div className="rounded-lg border border-dashed border-cyan-200/15 bg-cyan-300/[.03] p-3 text-xs leading-5 text-slate-400">
        No activity yet. Create a Qbank exam or add a journal note to start
        tracking your resident workflow.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map(item => (
        <Link
          key={`${item.title}-${item.detail}`}
          href={item.href}
          className="flex gap-3 rounded-lg border border-white/[.045] bg-white/[.018] p-2.5 transition hover:border-cyan-200/25 hover:bg-cyan-300/[.04]"
        >
          <div className="mt-0.5 shrink-0 text-cyan-300">
            {item.kind === "score" ? (
              <span className="grid h-4 w-4 place-items-center rounded-full border border-cyan-300 text-[7px] font-bold">
                %
              </span>
            ) : item.kind === "bookmark" ? (
              <LibraryBig className="h-4 w-4" />
            ) : (
              <CheckCircle2 className="h-4 w-4" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-slate-100">{item.title}</p>
            <p className="mt-0.5 truncate text-[10px] text-slate-500">
              {item.detail} • {formatActivityTime(item.at)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
