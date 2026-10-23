import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import MedicalSystemIcon from "@/components/learn/MedicalSystemIcon";
import SystemBookSelector, {
  type SystemSourceFilter,
} from "@/components/learn/SystemBookSelector";
import {
  MEDICAL_SYSTEMS_INDEX_URL,
  medicalSystemById,
  type IndexedSystemTopic,
  type MedicalSystemsIndex,
  type SummarySource,
} from "@/data/medical-systems";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, CheckCircle2, Circle, ShieldAlert } from "lucide-react";
import { Link } from "wouter";

const TRACK = "resident-emergency-medicine";
const CONTENT_TYPES: Record<SummarySource, string> = {
  rosh: "rosh-summary-chapter",
  tintinalli: "tintinalli-summary-chapter",
  rosen: "rosen-summary-chapter",
};

const SOURCE_LABEL: Record<SummarySource, string> = {
  rosh: "Rosh",
  tintinalli: "Tintinalli",
  rosen: "Rosen",
};

type Filter = "all" | "algorithms" | "pearls" | "tables";

const FILTERS: Array<{ id: Filter; label: string }> = [
  { id: "all", label: "All" },
  { id: "algorithms", label: "Algorithms" },
  { id: "pearls", label: "Exam Pearls" },
  { id: "tables", label: "Tables" },
];

function matchesFilter(topic: IndexedSystemTopic, filter: Filter): boolean {
  switch (filter) {
    case "algorithms":
      return topic.hasAlgorithm;
    case "pearls":
      return topic.hasPearls;
    case "tables":
      return topic.hasTables;
    default:
      return true;
  }
}

const EMPTY_FILTER_MESSAGE: Record<Exclude<Filter, "all">, string> = {
  algorithms:
    "No source-structured algorithm is available for this system yet. Tools never invent missing clinical content.",
  pearls:
    "No source-structured exam pearls are recorded for this system yet. Use Exam Traps for the separate revision collection.",
  tables:
    "No source-structured table is available for this system yet.",
};

export default function MedicalSystemPage({ systemId }: { systemId: string }) {
  const system = medicalSystemById(systemId);
  const [index, setIndex] = useState<MedicalSystemsIndex | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  const [filter, setFilter] = useState<Filter>("all");
  const [source, setSource] = useState<SystemSourceFilter>("all");

  const roshProgress = trpc.learningProgress.current.useQuery({
    track: TRACK,
    contentType: CONTENT_TYPES.rosh,
  });
  const tintinalliProgress = trpc.learningProgress.current.useQuery({
    track: TRACK,
    contentType: CONTENT_TYPES.tintinalli,
  });
  const rosenProgress = trpc.learningProgress.current.useQuery({
    track: TRACK,
    contentType: CONTENT_TYPES.rosen,
  });

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    fetch(MEDICAL_SYSTEMS_INDEX_URL, {
      signal: controller.signal,
      cache: "no-cache",
    })
      .then(async response => {
        if (!response.ok) throw new Error("System index unavailable");
        const data = (await response.json()) as MedicalSystemsIndex;
        if (data.schemaVersion !== 1 || !Array.isArray(data.systems)) {
          throw new Error("Invalid system index format");
        }
        if (!controller.signal.aborted) setIndex(data);
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [retry]);

  const entry = useMemo(
    () => index?.systems.find(item => item.id === systemId),
    [index, systemId]
  );

  const completedBySource = useMemo<Record<SummarySource, Set<string>>>(
    () => ({
      rosh: new Set(roshProgress.data?.completedIds ?? []),
      tintinalli: new Set(tintinalliProgress.data?.completedIds ?? []),
      rosen: new Set(rosenProgress.data?.completedIds ?? []),
    }),
    [roshProgress.data, tintinalliProgress.data, rosenProgress.data]
  );

  const visibleTopics = useMemo(
    () =>
      (entry?.topics ?? []).filter(
        topic =>
          (source === "all" || topic.source === source) &&
          matchesFilter(topic, filter)
      ),
    [entry, filter, source]
  );

  const grouped = useMemo(() => {
    const groups = new Map<SummarySource, IndexedSystemTopic[]>();
    for (const topic of visibleTopics) {
      groups.set(topic.source, [...(groups.get(topic.source) ?? []), topic]);
    }
    return Array.from(groups, ([source, topics]) => ({ source, topics }));
  }, [visibleTopics]);

  const completedCount = (entry?.topics ?? []).filter(topic =>
    completedBySource[topic.source].has(topic.id)
  ).length;
  const totalCount = entry?.topicCount ?? 0;
  const percent =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <DashboardLayout>
      <main className="mx-auto max-w-7xl space-y-5 text-slate-100">
        <header className="rounded-2xl border border-cyan-200/15 bg-slate-900/70 p-5">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-sm text-cyan-200 underline"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Learn
          </Link>
          {!system ? (
            <div role="alert" className="mt-4">
              <h1 className="text-2xl font-black">Unknown medical system</h1>
              <p className="mt-2 text-sm text-slate-300">
                This system is not part of the Learn navigation.{" "}
                <Link href="/learn" className="text-cyan-200 underline">
                  Browse all systems
                </Link>
              </p>
            </div>
          ) : (
            <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="rounded-xl bg-cyan-300/10 p-3">
                  <MedicalSystemIcon
                    name={system.icon}
                    className="h-7 w-7 text-cyan-200"
                  />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                    Medical System
                  </p>
                  <h1 className="mt-1 text-2xl font-black">{system.title}</h1>
                  <p className="mt-1 text-sm text-slate-300">
                    {entry?.sources.length ?? "…"} books ·{" "}
                    {entry?.chapterCount ?? "…"} chapters ·{" "}
                    {entry?.topicCount ?? "…"} topics ·{" "}
                    {entry?.algorithmCount ?? "…"} algorithms ·{" "}
                    {entry?.examPearlsCount ?? "…"} exam pearls ·{" "}
                    {entry?.tablesCount ?? "…"} tables
                  </p>
                </div>
              </div>
              <div className="min-w-44 rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm">
                <div className="flex justify-between">
                  <span>Read</span>
                  <strong>
                    {completedCount} / {totalCount}
                  </strong>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full bg-emerald-300 transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <p className="mt-1 text-end text-xs text-cyan-200">{percent}%</p>
              </div>
            </div>
          )}
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-300/20 bg-amber-300/5 p-3 text-xs text-amber-100">
            <ShieldAlert className="h-4 w-4 shrink-0" />
            System browsing reorganizes your existing study sources. It adds no
            medical content and never replaces source readers or local
            protocols.
          </div>
        </header>

        {system &&
          (loading ? (
            <p role="status" className="p-8 text-center text-sm text-slate-400">
              Loading {system.title} topics…
            </p>
          ) : error || !entry ? (
            <div
              role="alert"
              className="rounded-xl border border-rose-300/30 p-5"
              dir="rtl"
            >
              تعذر تحميل مواضيع هذا الجهاز.{" "}
              <button
                type="button"
                className="underline"
                onClick={() => setRetry(value => value + 1)}
              >
                إعادة المحاولة
              </button>
            </div>
          ) : (
            <>
              <section aria-label="Available sources">
                <h2 className="text-xs font-black uppercase tracking-widest text-cyan-300">
                  Available Sources
                </h2>
                <div className="mt-2">
                  <SystemBookSelector
                    sourceCounts={entry.sourceCounts}
                    totalTopics={entry.topicCount}
                    value={source}
                    onChange={setSource}
                  />
                </div>
              </section>
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Filter system topics"
              >
                {FILTERS.map(item => {
                  const count =
                    item.id === "all"
                      ? entry.topicCount
                      : item.id === "algorithms"
                        ? entry.algorithmCount
                        : item.id === "pearls"
                          ? entry.examPearlsCount
                          : entry.tablesCount;
                  const active = filter === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFilter(item.id)}
                      aria-pressed={active}
                      className={`rounded-full px-4 py-2 text-xs font-bold ${active ? "bg-cyan-300 text-slate-950" : "border border-white/10 bg-white/[.04] text-slate-200"}`}
                    >
                      {item.label} · {count}
                    </button>
                  );
                })}
              </div>
              {visibleTopics.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-white/15 bg-white/[.02] p-8 text-center text-sm text-slate-400">
                  {EMPTY_FILTER_MESSAGE[filter as Exclude<Filter, "all">]}
                </p>
              ) : (
                <div className="space-y-5">
                  {grouped.map(group => (
                    <section
                      key={group.source}
                      aria-label={`${SOURCE_LABEL[group.source]} topics`}
                      className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70"
                    >
                      <h2 className="border-b border-white/10 bg-white/[.03] px-5 py-3 text-sm font-black text-cyan-200">
                        {SOURCE_LABEL[group.source]} · {group.topics.length}{" "}
                        topics
                      </h2>
                      <ul className="divide-y divide-white/5">
                        {group.topics.map(topic => {
                          const done = completedBySource[topic.source].has(
                            topic.id
                          );
                          return (
                            <li key={`${topic.source}:${topic.id}`}>
                              <Link
                                href={topic.href}
                                className="flex items-start gap-3 p-4 transition hover:bg-white/5"
                              >
                                {done ? (
                                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                                ) : (
                                  <Circle className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />
                                )}
                                <span className="min-w-0">
                                  <span className="flex flex-wrap items-center gap-2">
                                    <strong className="text-sm font-semibold text-slate-100">
                                      {topic.title}
                                    </strong>
                                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-bold text-slate-400">
                                      {topic.kind === "chapter"
                                        ? "Chapter"
                                        : "Topic"}
                                    </span>
                                  </span>
                                  {topic.arabicTitle && (
                                    <span
                                      dir="rtl"
                                      className="mt-0.5 block text-xs text-slate-400"
                                    >
                                      {topic.arabicTitle}
                                    </span>
                                  )}
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </section>
                  ))}
                </div>
              )}
            </>
          ))}
      </main>
    </DashboardLayout>
  );
}
