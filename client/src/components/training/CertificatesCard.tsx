import React from "react";
import { records } from "@/lib/dashboard-placeholders";

/**
 * Certificates — moved here from the Dashboard (Phase 3-A).
 * Unchanged UI. Records remain clearly marked PLACEHOLDER DATA
 * (see `lib/dashboard-placeholders.ts`).
 */
export default function CertificatesCard() {
  return (
    <section className="seg-reference-card seg-dashboard-card rounded-xl p-4">
      <div className="flex justify-between">
        <h2 className="text-sm font-semibold text-white">Certificates</h2>
        <button className="text-[10px] font-bold text-cyan-200">
          View All
        </button>
      </div>
      <div className="mt-4 space-y-2 text-xs">
        {records.map(([name, issuer, status]) => (
          <div
            key={name}
            className="flex items-center justify-between rounded-lg bg-white/[.025] px-2 py-1.5"
          >
            <div>
              <p className="font-semibold text-slate-200">{name}</p>
              <p className="mt-0.5 text-[9px] text-slate-500">{issuer}</p>
            </div>
            <span
              className={
                status === "Valid"
                  ? "text-[10px] font-bold text-emerald-300"
                  : "text-[10px] font-bold text-cyan-200"
              }
            >
              {status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
