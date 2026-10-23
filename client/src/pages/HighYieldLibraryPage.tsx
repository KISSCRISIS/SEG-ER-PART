import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  HIGH_YIELD_REVIEW_MAP,
  type HighYieldReviewId,
} from "@/data/high-yield-reviews";
import {
  buildHighYieldChapterMap,
  type HighYieldSourceTopic,
} from "@/lib/high-yield-chapter-map";
import { trpc } from "@/lib/trpc";
import { BookOpen, CheckCircle2, Search, ShieldAlert } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";

type SourceId = "all" | HighYieldReviewId;
type CatalogSource = Exclude<SourceId, "all">;
type TopicHit = {
  source: CatalogSource;
  title: string;
  arabicTitle?: string;
  href: string;
};
type SummarySource = "rosh" | "tintinalli" | "rosen";

/**
 * Library cards derived from the canonical High-Yield Review registry.
 * Same five reviews, same order, same copy — single source of truth.
 */
const LIBRARY_ORDER: CatalogSource[] = [
  "rosh",
  "tintinalli",
  "rosen",
  "frcem",
  "hippo",
];

const sources: Array<{
  id: CatalogSource;
  title: string;
  count: number;
  description: string;
  href: string;
  accent: string;
}> = LIBRARY_ORDER.map(id => {
  const review = HIGH_YIELD_REVIEW_MAP[id];
  return {
    id,
    title: review.libraryTitle,
    count: review.chapters,
    description: review.libraryDescription,
    href: review.route,
    accent: review.libraryAccent,
  };
});

const sourceLabel: Record<SourceId, string> = {
  all: "All",
  rosh: "Rosh",
  tintinalli: "Tintinalli",
  rosen: "Rosen",
  frcem: "FRCEM",
  hippo: "HIPPO",
};
const matches = (value: string, query: string) =>
  value.toLocaleLowerCase().includes(query.toLocaleLowerCase());

function SourceTools() {
  const available = [
    "High-Yield Summary",
    "Qbank Integration",
    "References",
    "Arabic Explanation",
  ];
  return (
    <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-slate-300">
      {available.map(tool => (
        <span key={tool} className="flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
          {tool}
        </span>
      ))}
      <span className="text-slate-500">Algorithms · source-dependent</span>
      <span className="text-slate-500">Tables · source-dependent</span>
      <span className="text-slate-500">Exam Pearls · use Exam Traps</span>
    </div>
  );
}

export default function HighYieldLibraryPage() {
  const [filter, setFilter] = useState<SourceId>("all");
  const [search, setSearch] = useState("");
  const [topicHits, setTopicHits] = useState<TopicHit[]>([]);
  const [summaryIndexes, setSummaryIndexes] = useState<
    Record<SummarySource, HighYieldSourceTopic[]>
  >({ rosh: [], tintinalli: [], rosen: [] });
  const [topicError, setTopicError] = useState(false);
  const frcem = trpc.residentContent.chapters.useQuery({ family: "FRCEM" });
  const hippo = trpc.residentContent.chapters.useQuery({ family: "HIPPO" });
  const roshProgress = trpc.learningProgress.current.useQuery({
    track: "resident-emergency-medicine",
    contentType: "rosh-summary-chapter",
  });
  const tintinalliProgress = trpc.learningProgress.current.useQuery({
    track: "resident-emergency-medicine",
    contentType: "tintinalli-summary-chapter",
  });
  const rosenProgress = trpc.learningProgress.current.useQuery({
    track: "resident-emergency-medicine",
    contentType: "rosen-summary-chapter",
  });
  const query = search.trim();

  useEffect(() => {
    const controller = new AbortController();
    setTopicError(false);
    Promise.all([
      fetch("/content/summary-books/rosh-high-yield.json", {
        signal: controller.signal,
      }).then(response =>
        response.ok
          ? response.json()
          : Promise.reject(new Error("Rosh unavailable"))
      ),
      fetch("/content/summary-books/tintinalli-high-yield.json", {
        signal: controller.signal,
      }).then(response =>
        response.ok
          ? response.json()
          : Promise.reject(new Error("Tintinalli unavailable"))
      ),
      fetch("/content/summary-books/rosen-high-yield.json", {
        signal: controller.signal,
      }).then(response =>
        response.ok
          ? response.json()
          : Promise.reject(new Error("Rosen unavailable"))
      ),
    ])
      .then(([rosh, tintinalli, rosen]) => {
        if (controller.signal.aborted) return;
        const fromBook = (
          source: CatalogSource,
          href: string,
          data: {
            chapters?: Array<{
              unitId: string;
              title: string;
              arabicTitle?: string;
            }>;
          }
        ) =>
          (data.chapters ?? []).map(chapter => ({
            source,
            title: chapter.title,
            arabicTitle: chapter.arabicTitle,
            href: `${href}?chapter=${encodeURIComponent(chapter.unitId)}`,
          }));
        const roshRecords = rosh.chapters ?? [];
        const tintinalliRecords = tintinalli.chapters ?? [];
        const rosenRecords = rosen.chapters ?? [];
        setSummaryIndexes({
          rosh: roshRecords,
          tintinalli: tintinalliRecords,
          rosen: rosenRecords,
        });
        setTopicHits([
          ...fromBook("rosh", "/learn/summaries/rosh-high-yield", {
            chapters: roshRecords,
          }),
          ...fromBook("tintinalli", "/learn/summaries/tintinalli-high-yield", {
            chapters: tintinalliRecords,
          }),
          ...fromBook("rosen", "/learn/summaries/rosen-high-yield", {
            chapters: rosenRecords,
          }),
        ]);
      })
      .catch(() => {
        if (!controller.signal.aborted) setTopicError(true);
      });
    return () => controller.abort();
  }, []);

  const summaryStats = useMemo(() => {
    const progress = {
      rosh: roshProgress.data,
      tintinalli: tintinalliProgress.data,
      rosen: rosenProgress.data,
    };
    return (Object.keys(summaryIndexes) as SummarySource[]).reduce(
      (stats, source) => {
        const records = summaryIndexes[source];
        const progressData = progress[source];
        const lastTimestamp = Math.max(
          0,
          ...(progressData?.items ?? []).map(item =>
            new Date(item.updatedAt).getTime()
          )
        );
        stats[source] = {
          chapters: buildHighYieldChapterMap(source, records).length,
          topics: records.length,
          progress: records.length
            ? Math.round(
                ((progressData?.completedIds.length ?? 0) / records.length) *
                  100
              )
            : 0,
          lastReview: lastTimestamp
            ? new Intl.DateTimeFormat("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }).format(lastTimestamp)
            : "Not reviewed yet",
        };
        return stats;
      },
      {} as Record<
        SummarySource,
        {
          chapters: number;
          topics: number;
          progress: number;
          lastReview: string;
        }
      >
    );
  }, [
    rosenProgress.data,
    roshProgress.data,
    summaryIndexes,
    tintinalliProgress.data,
  ]);

  const sourceCards = useMemo(
    () =>
      sources.filter(
        source =>
          (filter === "all" || source.id === filter) &&
          (!query ||
            matches(
              `${source.title} ${source.description} ${source.id}`,
              query
            ))
      ),
    [filter, query]
  );
  const residentHits = useMemo<TopicHit[]>(
    () => [
      ...(frcem.data ?? []).map(chapter => ({
        source: "frcem" as const,
        title: chapter.chapterTitle,
        href: `/learn/chapter/frcem-${chapter.chapterNumber}`,
      })),
      ...(hippo.data ?? []).map(chapter => ({
        source: "hippo" as const,
        title: chapter.chapterTitle,
        href: `/learn/chapter/hippo-${chapter.chapterNumber}`,
      })),
    ],
    [frcem.data, hippo.data]
  );
  const visibleHits = useMemo(
    () =>
      [...topicHits, ...residentHits]
        .filter(
          hit =>
            (filter === "all" || hit.source === filter) &&
            matches(`${hit.title} ${hit.arabicTitle ?? ""}`, query)
        )
        .slice(0, 24),
    [filter, query, residentHits, topicHits]
  );

  return (
    <DashboardLayout>
      <main className="mx-auto max-w-7xl space-y-5 text-slate-100">
        <header className="rounded-2xl border border-cyan-200/15 bg-slate-900/70 p-5 sm:p-7">
          <Link href="/learn" className="text-sm text-cyan-200 underline">
            ← Back to Learn
          </Link>
          <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-cyan-300">
                High-Yield Learning Library
              </p>
              <h1 className="mt-2 text-3xl font-black">
                Emergency Medicine Library
              </h1>
              <p className="mt-2 text-sm text-slate-300">
                Exam-focused medical summaries with integrated learning tools.
              </p>
            </div>
            <div className="max-w-md rounded-xl border border-amber-300/20 bg-amber-300/5 p-3 text-xs text-amber-100">
              <ShieldAlert className="mr-2 inline h-4 w-4 align-text-bottom" />
              Source-linked learning drafts remain under clinical review. Tools
              never create or imply missing medical content.
            </div>
          </div>
          <label className="mt-6 flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950 px-3">
            <Search className="h-4 w-4 text-slate-500" />
            <input
              value={search}
              onChange={event => setSearch(event.target.value)}
              aria-label="Search sources and topics"
              placeholder="Search a source, chapter, or topic…"
              className="w-full bg-transparent py-3 text-sm outline-none"
            />
          </label>
          <div
            className="mt-4 flex flex-wrap gap-2"
            role="group"
            aria-label="Filter library by source"
          >
            {(Object.keys(sourceLabel) as SourceId[]).map(id => (
              <button
                type="button"
                key={id}
                onClick={() => setFilter(id)}
                aria-pressed={filter === id}
                className={`rounded-full px-4 py-2 text-xs font-bold ${filter === id ? "bg-cyan-300 text-slate-950" : "border border-white/10 bg-white/[.04] text-slate-200"}`}
              >
                {sourceLabel[id]}
              </button>
            ))}
          </div>
        </header>
        {query.length >= 2 && (
          <section
            aria-label="Topic search results"
            className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-black">Topic results</h2>
              <span className="text-xs text-slate-400">
                {visibleHits.length}
                {visibleHits.length === 24 ? "+" : ""} matches
              </span>
            </div>
            {topicError ? (
              <p role="alert" className="mt-3 text-sm text-amber-200">
                Some summary indexes could not be searched. You can still open a
                source card below.
              </p>
            ) : (
              <div className="mt-4 grid gap-2 md:grid-cols-2">
                {visibleHits.length ? (
                  visibleHits.map(hit => (
                    <Link
                      key={`${hit.source}:${hit.href}`}
                      href={hit.href}
                      className="rounded-xl border border-white/10 bg-white/[.03] p-3 transition hover:border-cyan-300/40"
                    >
                      <span className="text-[10px] font-black uppercase tracking-widest text-cyan-300">
                        {sourceLabel[hit.source]}
                      </span>
                      <strong className="mt-1 block text-sm">
                        {hit.title}
                      </strong>
                      {hit.arabicTitle && (
                        <span
                          dir="rtl"
                          className="mt-1 block text-xs text-slate-400"
                        >
                          {hit.arabicTitle}
                        </span>
                      )}
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">
                    No source-backed topics match this search.
                  </p>
                )}
              </div>
            )}
          </section>
        )}
        <section
          aria-label="Available summaries"
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {sourceCards.map(source => {
            const stats =
              source.id === "rosh" ||
              source.id === "tintinalli" ||
              source.id === "rosen"
                ? summaryStats[source.id]
                : undefined;
            return (
              <article
                key={source.id}
                className={`flex min-h-72 flex-col rounded-2xl border bg-gradient-to-br p-5 ${source.accent}`}
              >
                <BookOpen className="h-5 w-5 text-cyan-200" />
                <h2 className="mt-4 text-xl font-black">{source.title}</h2>
                <p className="mt-2 text-sm text-slate-300">
                  {source.description}
                </p>
                {stats ? (
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-lg bg-slate-950/35 p-2">
                      <span className="block text-slate-400">Chapters</span>
                      <strong className="mt-1 block text-cyan-100">
                        {stats.chapters}
                      </strong>
                    </div>
                    <div className="rounded-lg bg-slate-950/35 p-2">
                      <span className="block text-slate-400">Topics</span>
                      <strong className="mt-1 block text-cyan-100">
                        {stats.topics || source.count}
                      </strong>
                    </div>
                    <div className="rounded-lg bg-slate-950/35 p-2">
                      <span className="block text-slate-400">Progress</span>
                      <strong className="mt-1 block text-emerald-200">
                        {stats.progress}%
                      </strong>
                    </div>
                    <div className="rounded-lg bg-slate-950/35 p-2">
                      <span className="block text-slate-400">Last review</span>
                      <strong className="mt-1 block text-slate-200">
                        {stats.lastReview}
                      </strong>
                    </div>
                  </div>
                ) : (
                  <p className="mt-3 text-xs font-bold text-cyan-100">
                    {source.count} chapters
                  </p>
                )}
                <SourceTools />
                <Link
                  href={source.href}
                  className="mt-auto w-fit rounded-xl bg-cyan-300 px-4 py-2.5 text-sm font-black text-slate-950"
                >
                  {stats ? "Open Chapter Map" : "Continue Learning"}
                </Link>
              </article>
            );
          })}
        </section>
        {!sourceCards.length && (
          <p className="rounded-2xl border border-dashed border-white/15 p-8 text-center text-sm text-slate-400">
            No library sources match this filter or search.
          </p>
        )}
      </main>
    </DashboardLayout>
  );
}
