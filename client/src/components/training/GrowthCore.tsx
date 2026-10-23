import React from "react";
import { Link } from "wouter";
import { ArrowUpRight, Trophy } from "lucide-react";
import { segAssets } from "@/lib/seg-assets";
import { professionalDomains } from "@/lib/dashboard-placeholders";

const growthFrameworkSources = [
  "IFEM GME Emergency Medicine Curriculum 2025",
  "ACGME Emergency Medicine Milestones 2.0",
  "RCEM Emergency Medicine Curriculum 2021, 2025 update",
] as const;

/**
 * Professional Growth Core — moved here from the Dashboard (Phase 3-A).
 * Unchanged UI and data contracts. Domain scores remain clearly marked
 * PLACEHOLDER DATA (see `lib/dashboard-placeholders.ts`) until the weighted
 * scoring service lands.
 */
export default function GrowthCore() {
  const average = Math.round(
    professionalDomains.reduce((sum, domain) => sum + domain.value, 0) /
      professionalDomains.length
  );
  const weakest = [...professionalDomains].sort((a, b) => a.value - b.value)[0];
  return (
    <section className="seg-dashboard-core seg-dashboard-card relative min-h-[520px] overflow-hidden rounded-xl p-4">
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white">
            Professional Growth Core
          </p>
          <p className="mt-1 text-[10px] text-slate-400">
            Competency map for emergency medicine residency
          </p>
        </div>
        <div className="rounded-xl border border-cyan-200/20 bg-cyan-300/10 px-3 py-2 text-right">
          <p className="text-[10px] text-cyan-100">Readiness</p>
          <p className="text-lg font-black text-white">{average}%</p>
        </div>
      </div>
      <div className="seg-dashboard-core-stage" aria-hidden="true">
        <div className="seg-core-aura" />
        <div className="seg-core-blend-field" />
        <img
          src={segAssets.dashboardBrainHeartCoreClean}
          alt=""
          className="seg-core-dashboard-brain-heart seg-core-artifact-mask"
        />
        <div className="seg-core-ring seg-core-ring-one" />
        <div className="seg-core-ring seg-core-ring-two" />
      </div>
      <div className="relative z-10 mt-8 grid gap-3 sm:grid-cols-2">
        {professionalDomains.map(
          ({ title, subtitle, value, target, icon: Icon }) => (
            <article
              key={title}
              className="rounded-xl border border-cyan-200/[.12] bg-[#07111e]/75 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,.03)] backdrop-blur"
            >
              <div className="flex items-start gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-cyan-200/20 bg-cyan-300/[.08] text-cyan-200">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-bold text-white">{title}</p>
                      <p className="mt-0.5 text-[10px] leading-4 text-slate-400">
                        {subtitle}
                      </p>
                    </div>
                    <span className="text-xs font-black text-cyan-200">
                      {value}%
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                  <p className="mt-2 text-[10px] leading-4 text-cyan-100">
                    Next: {target}
                  </p>
                </div>
              </div>
            </article>
          )
        )}
      </div>
      <div className="relative z-10 mt-4 grid gap-3 rounded-xl border border-amber-300/20 bg-amber-300/[.06] p-3 sm:grid-cols-[1fr_auto]">
        <div>
          <p className="text-xs font-bold text-amber-100">Priority Focus</p>
          <p className="mt-1 text-sm text-slate-200">
            {weakest.title}: {weakest.target}
          </p>
        </div>
        <Link
          href="/practice/create"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-500 px-3 py-2 text-xs font-black text-slate-950"
        >
          Practice now
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="relative z-10 mt-3 flex flex-wrap gap-2">
        {growthFrameworkSources.map(source => (
          <span
            key={source}
            className="rounded-full border border-white/10 bg-white/[.035] px-2.5 py-1 text-[10px] text-slate-300"
          >
            {source}
          </span>
        ))}
      </div>
      <div className="relative z-10 mt-3 flex items-center justify-center gap-2 text-[10px] text-slate-400">
        <Trophy className="h-3.5 w-3.5 text-cyan-300" />
        Private pilot scoring: reading progress + Qbank activity + personal
        review notes.
      </div>
    </section>
  );
}
