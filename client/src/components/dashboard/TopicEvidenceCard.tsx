import React from "react";
import Bi from "@/components/Bi";
import { Link } from "wouter";
import type { TopicEvidence } from "@shared/study-plan-intelligence";

function EvidenceRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 text-[11px]">
      <span className="text-slate-400">{label}</span>
      <span className="font-bold text-slate-100">{value}</span>
    </div>
  );
}

/**
 * Shows why a topic received priority: learning state, Qbank numbers,
 * repetition, and review flag, each stated as evidence. Renders the shared
 * empty state when no evidence item qualifies.
 */
export default function TopicEvidenceCard({
  items,
}: {
  items: TopicEvidence[];
}) {
  return (
    <section
      aria-label="Topic evidence"
      className="seg-reference-card seg-dashboard-card rounded-xl p-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white"><Bi t="dash.topic.evidence" /></h2>
        <Link
          href="/practice/performance"
          className="text-[10px] font-bold text-cyan-200"
        >
          Details
        </Link>
      </div>
      <p className="mt-1 text-[10px] text-slate-500">
        Why each priority topic earned its rank.
      </p>
      <div className="mt-4 space-y-3">
        {items.length ? (
          items.map(item => (
            <article
              key={item.topic}
              className="rounded-xl border border-white/[.06] bg-[#07111e]/70 p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="truncate text-xs font-bold text-white">
                  {item.topic}
                </h3>
                <span className="shrink-0 rounded-full border border-cyan-200/25 bg-cyan-300/10 px-2 py-0.5 text-[10px] font-black text-cyan-200">
                  {item.priority}
                </span>
              </div>
              <div className="mt-2 space-y-1.5">
                <EvidenceRow label="Learning" value={item.learning} />
                <EvidenceRow
                  label="Qbank"
                  value={
                    item.accuracy === null
                      ? "No attempts yet"
                      : `${item.accuracy}% accuracy`
                  }
                />
                <EvidenceRow
                  label="Repeated Errors"
                  value={String(item.repeatedErrors)}
                />
                <EvidenceRow label="Review" value={item.review} />
              </div>
              <ul className="mt-2 space-y-1 border-t border-white/[.06] pt-2">
                {item.reasons.map(reason => (
                  <li
                    key={reason}
                    className="text-[10px] leading-4 text-slate-400"
                  >
                    · {reason}
                  </li>
                ))}
              </ul>
            </article>
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-cyan-200/15 bg-cyan-300/[.03] p-3 text-xs leading-5 text-slate-400">
            No topic evidence yet. Answer Qbank questions to generate
            evidence-backed priorities.
          </div>
        )}
      </div>
    </section>
  );
}
