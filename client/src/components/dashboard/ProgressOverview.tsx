import type { LucideIcon } from "lucide-react";
import React from "react";

export type ProgressOverviewItem = readonly [
  label: string,
  value: number,
  icon: LucideIcon,
];

/**
 * Shared Learning/Practice/Mastery progress visualization.
 * Purely presentational: renders the given placeholder (or future live)
 * items with the approved Dashboard styling. No data fetching here.
 */
export default function ProgressOverview({
  items,
  compact = false,
}: {
  items: readonly ProgressOverviewItem[];
  compact?: boolean;
}) {
  return (
    <div className={compact ? "space-y-3" : "space-y-4"}>
      {items.map(([label, value, Icon]) => (
        <div key={label}>
          <div className="flex items-center gap-2">
            <Icon className="h-3.5 w-3.5 shrink-0 text-cyan-300" />
            <div className="flex flex-1 items-center justify-between gap-3 text-[11px]">
              <span className="text-slate-300">{label}</span>
              <span className="font-semibold text-cyan-200">{value}%</span>
            </div>
          </div>
          <div className="mt-1.5 h-1 rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-500"
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
