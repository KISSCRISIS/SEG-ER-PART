import type { SourceCounts, SummarySource } from "@/data/medical-systems";

export type SystemSourceFilter = "all" | SummarySource;

const SOURCE_LABEL: Record<SystemSourceFilter, string> = {
  all: "All sources",
  tintinalli: "Tintinalli",
  rosh: "Rosh",
  rosen: "Rosen",
};

/**
 * Lets the learner view a medical system across every available source or
 * narrow it to one specific book. Selection only filters navigation; the
 * underlying sources are never modified.
 */
export default function SystemBookSelector({
  sourceCounts,
  totalTopics,
  value,
  onChange,
}: {
  sourceCounts: SourceCounts[];
  totalTopics: number;
  value: SystemSourceFilter;
  onChange: (value: SystemSourceFilter) => void;
}) {
  const options: Array<{
    id: SystemSourceFilter;
    label: string;
    detail: string;
  }> = [
    {
      id: "all",
      label: SOURCE_LABEL.all,
      detail: `${totalTopics} topics`,
    },
    ...sourceCounts.map(item => ({
      id: item.source as SystemSourceFilter,
      label: SOURCE_LABEL[item.source],
      detail: `${item.topics} topics · ${item.chapters} chapters`,
    })),
  ];
  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filter system by source book"
    >
      {options.map(option => {
        const active = value === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            aria-pressed={active}
            className={`rounded-full px-4 py-2 text-xs font-bold ${active ? "bg-cyan-300 text-slate-950" : "border border-white/10 bg-white/[.04] text-slate-200"}`}
          >
            {option.label} · {option.detail}
          </button>
        );
      })}
    </div>
  );
}
