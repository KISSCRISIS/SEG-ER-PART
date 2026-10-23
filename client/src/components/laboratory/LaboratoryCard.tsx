import { ArrowUpRight, FlaskConical } from "lucide-react";

import React from "react";

export type LaboratoryDemoTest = {
  id: string;
  label: string;
  category: string;
  summary: string;
  keywords: string[];
  status: "DEMO_DATA_ONLY";
};

type LaboratoryCardProps = {
  test: LaboratoryDemoTest;
  selected: boolean;
  onSelect: (test: LaboratoryDemoTest) => void;
};

export default function LaboratoryCard({
  test,
  selected,
  onSelect,
}: LaboratoryCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(test)}
      aria-pressed={selected}
      className={`seg-glass-interactive w-full rounded-2xl border p-4 text-left transition-colors sm:p-5 ${
        selected
          ? "border-cyan-300/70 bg-cyan-300/[.09] shadow-[0_0_26px_rgba(0,212,255,.14)]"
          : "border-cyan-200/[.14] bg-slate-950/35 hover:border-cyan-200/35"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-cyan-200/20 bg-cyan-300/[.08] text-cyan-200">
          <FlaskConical className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-amber-200/30 bg-amber-300/[.08] px-2 py-1 text-[9px] font-bold uppercase tracking-[.08em] text-amber-100">
          {test.status}
        </span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[.13em] text-cyan-200">
            {test.category}
          </p>
          <h3 className="mt-2 truncate text-base font-semibold text-white">
            {test.label}
          </h3>
        </div>
        <ArrowUpRight
          className="mt-1 h-4 w-4 shrink-0 text-cyan-200"
          aria-hidden="true"
        />
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-300">{test.summary}</p>
      <div
        className="mt-4 flex flex-wrap gap-1.5"
        aria-label={`${test.label} demo keywords`}
      >
        {test.keywords.map(keyword => (
          <span
            key={keyword}
            className="rounded-full border border-white/[.09] bg-white/[.035] px-2 py-1 text-[10px] text-slate-400"
          >
            {keyword}
          </span>
        ))}
      </div>
    </button>
  );
}
