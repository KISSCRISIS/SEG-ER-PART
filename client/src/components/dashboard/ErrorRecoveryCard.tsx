import React from "react";
import Bi from "@/components/Bi";
import { Link } from "wouter";
import { ShieldAlert } from "lucide-react";
import type { ClassifiedError } from "@shared/study-plan-intelligence";

const SEVERITY_STYLE = {
  High: "border-rose-300/25 bg-rose-300/10 text-rose-200",
  Moderate: "border-amber-300/25 bg-amber-300/10 text-amber-200",
  Low: "border-emerald-300/25 bg-emerald-300/10 text-emerald-200",
} as const;

/**
 * Classified error recovery. Every entry shows its topic, evidence-based
 * error type, severity, and recommended action — all received through props
 * from the intelligence layer. Renders the shared empty state when no
 * error signal qualifies.
 */
export default function ErrorRecoveryCard({
  errors,
}: {
  errors: ClassifiedError[];
}) {
  return (
    <section
      aria-label="Error recovery"
      className="seg-reference-card seg-dashboard-card rounded-xl p-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white"><Bi t="weakness.retest.result" /></h2>
        <Link
          href="/practice/performance"
          className="text-[10px] font-bold text-cyan-200"
        >
          Details
        </Link>
      </div>
      <p className="mt-1 text-[10px] text-slate-500"><Bi t="dash.error.desc" /></p>
      <div className="mt-4 space-y-2.5">
        {errors.length ? (
          errors.map(error => (
            <article
              key={error.topic}
              className="rounded-xl border border-white/[.06] bg-[#07111e]/70 p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="flex min-w-0 items-center gap-2 truncate text-xs font-bold text-white">
                  <ShieldAlert className="h-3.5 w-3.5 shrink-0 text-rose-200" />
                  <span className="truncate">{error.topic}</span>
                </p>
                <span
                  className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-black ${SEVERITY_STYLE[error.severity]}`}
                >
                  {error.severity}
                </span>
              </div>
              <p className="mt-1.5 text-[11px] text-slate-300">
                Error: {error.errorType}
              </p>
              <p className="mt-0.5 text-[11px] font-semibold leading-5 text-cyan-100">
                Action: {error.action}
              </p>
              <ul className="mt-1.5 space-y-0.5">
                {error.reasons.map(reason => (
                  <li
                    key={reason}
                    className="text-[10px] leading-4 text-slate-500"
                  >
                    · {reason}
                  </li>
                ))}
              </ul>
            </article>
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-cyan-200/15 bg-cyan-300/[.03] p-3 text-xs leading-5 text-slate-400">
            No classified errors right now. Mistakes with enough evidence will
            appear here with a recommended action.
          </div>
        )}
      </div>
    </section>
  );
}
