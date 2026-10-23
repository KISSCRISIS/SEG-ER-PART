import Bi from "@/components/Bi";
import React from "react";
import type { ReadinessBand } from "@shared/study-plan-intelligence";
import type { ReadinessBreakdown } from "./readiness";

const BAND_LABEL: Record<ReadinessBand, string> = {
  green: "dash.band.green",
  yellow: "dash.band.yellow",
  red: "dash.band.red",
};

const BAND_STYLE: Record<ReadinessBand, string> = {
  green: "border-emerald-300/25 bg-emerald-300/10 text-emerald-200",
  yellow: "border-amber-300/25 bg-amber-300/10 text-amber-200",
  red: "border-rose-300/25 bg-rose-300/10 text-rose-200",
};

const BREAKDOWN_LABELS: Array<{ key: keyof ReadinessBreakdown; label: string }> = [
  { key: "coverage", label: "dash.readiness.coverage" },
  { key: "qbankPerformance", label: "dash.readiness.qbank" },
  { key: "priorityCompletion", label: "dash.readiness.priority" },
  { key: "revisionCompliance", label: "dash.readiness.revision" },
  { key: "recentTrend", label: "dash.readiness.trend" },
];

/**
 * Board Readiness Index: a transparent indicator of current preparation
 * status based on available learning evidence. It is not an exam outcome
 * prediction. Receives the scored index, band, and evidence breakdown
 * through props — all scoring comes from `@shared/study-plan-intelligence`
 * via the caller. No formulas here.
 */
export default function ReadinessIndexCard({
  score,
  band,
  breakdown,
}: {
  score: number;
  band: ReadinessBand;
  breakdown: ReadinessBreakdown;
}) {
  return (
    <section
      aria-label="Board Readiness Index"
      className="seg-reference-card seg-dashboard-card rounded-xl p-4 sm:p-5"
    >
      <div className="flex flex-wrap items-center gap-5">
        <div className="relative grid h-28 w-28 shrink-0 place-items-center rounded-full border border-cyan-200/20 bg-cyan-300/[.06]">
          <span className="text-2xl font-black text-white">{score}%</span>
          <span
            className={`absolute -bottom-2 rounded-full border px-2.5 py-0.5 text-[10px] font-black ${BAND_STYLE[band]}`}
          >
            <Bi t={BAND_LABEL[band] as any} />
          </span>
        </div>
        <div className="min-w-52 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-200">
            <Bi t="dash.board.title" />
          </p>
          <h2 className="mt-1 text-xl font-black text-white">
            <Bi t="dash.board.readiness" />
          </h2>
          <p className="mt-1 text-xs leading-5 text-slate-400">
            <Bi t="dash.board.readiness.desc" />
          </p>
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {BREAKDOWN_LABELS.map(({ key, label }) => (
          <div key={key}>
            <div className="flex justify-between gap-2 text-[10px]">
              <span className="truncate text-slate-300"><Bi t={label as any} /></span>
              <span className="font-bold text-slate-100">
                {breakdown[key]}%
              </span>
            </div>
            <div className="mt-1 h-1.5 rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300"
                style={{ width: `${breakdown[key]}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
