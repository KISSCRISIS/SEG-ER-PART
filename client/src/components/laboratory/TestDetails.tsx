import { Info, LockKeyhole, ShieldCheck } from "lucide-react";
import type { LaboratoryDemoTest } from "./LaboratoryCard";

import React from "react";

type TestDetailsProps = {
  test: LaboratoryDemoTest | null;
};

export default function TestDetails({ test }: TestDetailsProps) {
  if (!test) {
    return (
      <aside
        className="seg-reference-card rounded-2xl p-5 sm:p-6"
        aria-labelledby="laboratory-details-title"
      >
        <div className="grid h-11 w-11 place-items-center rounded-xl border border-cyan-200/20 bg-cyan-300/[.08] text-cyan-200">
          <Info className="h-5 w-5" aria-hidden="true" />
        </div>
        <h2
          id="laboratory-details-title"
          className="mt-5 text-lg font-semibold text-white"
        >
          Select a demo item
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Choose a placeholder from the list to inspect the foundation detail
          state.
        </p>
        <p className="mt-5 rounded-xl border border-amber-200/20 bg-amber-300/[.06] p-3 text-xs leading-5 text-amber-100">
          No approved Laboratory Dataset is connected. This screen is not
          clinical guidance.
        </p>
      </aside>
    );
  }

  return (
    <aside
      className="seg-reference-card rounded-2xl p-5 sm:p-6"
      aria-labelledby="laboratory-details-title"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.13em] text-cyan-200">
            {test.category}
          </p>
          <h2
            id="laboratory-details-title"
            className="mt-2 text-xl font-bold tracking-[-.03em] text-white"
          >
            {test.label}
          </h2>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full border border-amber-200/30 bg-amber-300/[.08] px-2 py-1 text-[9px] font-bold uppercase tracking-[.08em] text-amber-100">
          {test.status}
        </span>
      </div>

      <p className="mt-5 text-sm leading-6 text-slate-300">{test.summary}</p>

      <div className="mt-6 space-y-3">
        <div className="flex items-start gap-3 rounded-xl border border-white/[.08] bg-white/[.025] p-3">
          <ShieldCheck
            className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200"
            aria-hidden="true"
          />
          <p className="text-xs leading-5 text-slate-300">
            Placeholder only. Source, version, rights, review status, and audit
            lineage are not supplied for this demo item.
          </p>
        </div>
        <div className="flex items-start gap-3 rounded-xl border border-white/[.08] bg-white/[.025] p-3">
          <LockKeyhole
            className="mt-0.5 h-4 w-4 shrink-0 text-amber-200"
            aria-hidden="true"
          />
          <p className="text-xs leading-5 text-slate-300">
            Clinical fields are intentionally withheld: no values, ranges,
            interpretations, specimen requirements, or recommendations are
            shown.
          </p>
        </div>
      </div>

      <div className="mt-6 border-t border-white/[.08] pt-4">
        <p className="text-[10px] font-bold uppercase tracking-[.12em] text-slate-500">
          Demo keywords
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {test.keywords.map(keyword => (
            <span
              key={keyword}
              className="rounded-full border border-cyan-200/[.13] bg-cyan-300/[.05] px-2.5 py-1.5 text-[10px] text-cyan-100"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
