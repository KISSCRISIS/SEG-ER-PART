import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import HighYieldChapterMap from "@/components/HighYieldChapterMap";
import LearningCompletionButton from "@/components/LearningCompletionButton";
import SummaryLanguageMode from "@/components/SummaryLanguageMode";
import SummaryLearningActions from "@/components/SummaryLearningActions";
import TopicEnhancements from "@/components/learn/TopicEnhancements";
import { buildHighYieldChapterMap } from "@/lib/high-yield-chapter-map";
import { useSummaryLanguageMode } from "@/lib/summary-language";
import { trpc } from "@/lib/trpc";
import {
  ArrowLeft,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";

type Topic = {
  unitId: string;
  sourceChapterId: string;
  title: string;
  source: string;
  edition: number;
  editorialStatus: "bilingual-draft" | "machine-translated-under-review";
  highYieldSummary: string[];
  diagnosis: string[];
  management: string[];
  arabicTranslation: {
    summary: string[];
    diagnosis: string[];
    management: string[];
  };
  arabicExplanation: string[];
  editorialNotes: string[];
  pages: { start: number; end: number };
  printedPages: { start: number; end: number } | null;
  reviewStatus: string;
};
const CONTENT_TYPE = "rosen-summary-chapter";
const TRACK = "resident-emergency-medicine";

function ContentSection({
  title,
  english,
  arabic,
  mode,
}: {
  title: string;
  english?: string;
  arabic?: string;
  mode: "english" | "both" | "arabic";
}) {
  if (mode === "english" && !english) return null;
  if (mode === "arabic" && !arabic) return null;
  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70">
      <h2 className="border-b border-white/10 bg-white/[.03] px-5 py-3 text-sm font-black text-cyan-200">
        {title}
      </h2>
      <div
        className={
          mode === "both" && english && arabic ? "grid md:grid-cols-2" : "grid"
        }
      >
        {mode !== "arabic" && english && (
          <div
            lang="en"
            className="whitespace-pre-line p-5 text-sm leading-7 text-slate-200"
          >
            {english}
          </div>
        )}
        {mode !== "english" && arabic && (
          <div
            lang="ar"
            dir="rtl"
            className="whitespace-pre-line border-t border-white/10 p-5 text-sm leading-8 text-slate-100 md:border-s md:border-t-0"
          >
            {arabic}
          </div>
        )}
      </div>
    </section>
  );
}

function UnstructuredSection({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href?: string;
}) {
  const body = (
    <>
      <h2 className="font-bold text-slate-200">{title}</h2>
      <p className="mt-1 text-sm text-slate-400">{description}</p>
    </>
  );
  return href ? (
    <Link
      href={href}
      className="block rounded-2xl border border-dashed border-white/15 bg-white/[.02] p-4 transition hover:border-cyan-300/40"
    >
      {body}
    </Link>
  ) : (
    <section className="rounded-2xl border border-dashed border-white/15 bg-white/[.02] p-4">
      {body}
    </section>
  );
}

export default function RosenHighYieldSummaryPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [request, setRequest] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { mode, changeMode } = useSummaryLanguageMode("rosen");
  const savedProgress = trpc.learningProgress.current.useQuery({
    track: TRACK,
    contentType: CONTENT_TYPE,
  });

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    fetch("/content/summary-books/rosen-high-yield.json", {
      signal: controller.signal,
      cache: "no-cache",
    })
      .then(async response => {
        if (!response.ok) throw new Error("Summary unavailable");
        const data = await response.json();
        if (data.schemaVersion !== 2 || !Array.isArray(data.chapters))
          throw new Error("Summary format unavailable");
        if (!controller.signal.aborted) {
          setTopics(data.chapters);
          const requested = new URLSearchParams(window.location.search).get(
            "chapter"
          );
          const requestedIndex = data.chapters.findIndex(
            (topic: Topic) => topic.unitId === requested
          );
          if (requestedIndex >= 0) setActiveIndex(requestedIndex);
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [request]);

  const chapterMap = useMemo(
    () => buildHighYieldChapterMap("rosen", topics),
    [topics]
  );
  const completed = useMemo(
    () => new Set(savedProgress.data?.completedIds ?? []),
    [savedProgress.data?.completedIds]
  );
  const progress = topics.length
    ? Math.round((completed.size / topics.length) * 100)
    : 0;
  const topic = topics[activeIndex];
  const selectTopic = (index: number) => {
    setActiveIndex(index);
    const selected = topics[index];
    if (selected)
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}?chapter=${encodeURIComponent(selected.unitId)}`
      );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <DashboardLayout>
      <main className="mx-auto max-w-[1600px] space-y-5 text-slate-100">
        <header className="rounded-2xl border border-cyan-200/15 bg-slate-900/70 p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <Link
                href="/learn/summaries"
                className="rounded-lg bg-white/5 p-2"
                aria-label="Back to summaries"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <BookOpen className="mt-1 shrink-0 text-cyan-300" />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                  Book → Chapter Map → Topics → Content
                </p>
                <h1 className="mt-1 text-2xl font-black">
                  Rosen &amp; Barkin Emergency Medicine High-Yield Review
                </h1>
                <p className="mt-1 text-sm text-slate-300">
                  {topics.length || 626} source-indexed topics · one topic at a
                  time
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-start gap-3">
              <div className="min-w-44 rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm">
                <div className="flex justify-between">
                  <span>Read</span>
                  <strong>
                    {completed.size} / {topics.length || 626}
                  </strong>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full bg-cyan-400 transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-1 text-end text-xs text-cyan-200">
                  {progress}%
                </p>
                <p dir="rtl" className="mt-1 text-[10px] text-slate-400">
                  يُحتسب ضمن إنجاز مسار مقيمي الإسعاف والطوارئ.
                </p>
              </div>
              <SummaryLanguageMode mode={mode} onChange={changeMode} />
            </div>
          </div>
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-300/20 bg-amber-300/5 p-3 text-xs text-amber-100">
            <ShieldAlert className="h-4 w-4 shrink-0" />
            Source-based study material from the fifth edition (2014). It is
            under clinical review and is not a current treatment protocol or
            official board blueprint.
          </div>
        </header>
        {loading ? (
          <p role="status" className="p-8 text-center">
            Loading source topics…
          </p>
        ) : error ? (
          <div
            role="alert"
            className="rounded-xl border border-rose-300/30 p-5"
            dir="rtl"
          >
            تعذر تحميل الملخصات.{" "}
            <button
              className="underline"
              onClick={() => setRequest(value => value + 1)}
            >
              إعادة المحاولة
            </button>
          </div>
        ) : !topics.length ? (
          <div role="status" className="rounded-2xl border border-white/10 bg-slate-900/70 p-8 text-center text-sm text-slate-300">
            No source topics available for this summary. The index loaded but contains no chapters.
          </div>
        ) : topic ? (
          <div className="grid items-start gap-5 lg:grid-cols-[21rem_minmax(0,1fr)]">
            <HighYieldChapterMap
              chapters={chapterMap}
              activeTopicId={topic.unitId}
              completedIds={completed}
              onSelectTopic={selectTopic}
            />
            <article className="min-w-0 space-y-4">
              <header className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                      {topic.sourceChapterId} · Topic {activeIndex + 1} of{" "}
                      {topics.length}
                    </p>
                    <h2 className="mt-1 text-2xl font-black">{topic.title}</h2>
                    <p className="mt-2 text-xs text-slate-400">
                      PDF pages {topic.pages.start}–{topic.pages.end}
                      {topic.printedPages &&
                        ` · Book pages ${topic.printedPages.start}–${topic.printedPages.end}`}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={activeIndex === 0}
                      onClick={() => selectTopic(activeIndex - 1)}
                      className="rounded-xl border border-white/10 bg-white/5 p-3 disabled:opacity-30"
                      aria-label="Previous topic"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      disabled={activeIndex === topics.length - 1}
                      onClick={() => selectTopic(activeIndex + 1)}
                      className="rounded-xl border border-white/10 bg-white/5 p-3 disabled:opacity-30"
                      aria-label="Next topic"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="mt-4 border-t border-white/10 pt-4">
                  <SummaryLearningActions
                    readHref={`/learn/summaries/rosen-high-yield?chapter=${encodeURIComponent(topic.unitId)}`}
                  />
                </div>
              </header>
              <ContentSection
                title="1. High-Yield Summary"
                english={topic.highYieldSummary.join(" ")}
                arabic={topic.arabicTranslation.summary.join(" ")}
                mode={mode}
              />
              <ContentSection
                title="2. Arabic Explanation · الشرح العربي"
                arabic={topic.arabicExplanation.join(" ")}
                mode={mode}
              />
              <UnstructuredSection
                title="3. Clinical Approach"
                description="Use the source-linked Diagnosis and Management sections below; this topic has no separate structured clinical-approach field."
              />
              <ContentSection
                title="4. Diagnosis"
                english={topic.diagnosis.join(" ")}
                arabic={topic.arabicTranslation.diagnosis.join(" ")}
                mode={mode}
              />
              <ContentSection
                title="5. Management"
                english={topic.management.join(" ")}
                arabic={topic.arabicTranslation.management.join(" ")}
                mode={mode}
              />
              <TopicEnhancements source="rosen" unitId={topic.unitId} />
              <UnstructuredSection
                title="6. Algorithms"
                description="No source-structured algorithm is available for this topic."
              />
              <UnstructuredSection
                title="7. Tables"
                description="No source-structured table is available for this topic."
              />
              <UnstructuredSection
                title="8–9. Exam Pearls & Exam Traps"
                description="Open SEG Exam Traps for its separate source-governed revision collection."
                href="/practice/exam-traps"
              />
              <footer className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <p className="text-xs text-slate-400">
                  11. References · {topic.source} · Edition {topic.edition} ·
                  PDF pages {topic.pages.start}–{topic.pages.end}
                </p>
                <a
                  href={`/study-books/rosen-5min.pdf#page=${topic.pages.start}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block rounded-lg bg-cyan-300/10 px-3 py-2 text-xs font-bold text-cyan-200"
                >
                  Open cited source pages · فتح صفحات المصدر
                </a>
                <details className="text-xs text-amber-100">
                  <summary className="cursor-pointer">
                    Editorial limitations · ملاحظات المراجعة
                  </summary>
                  {topic.editorialNotes.map(note => (
                    <p className="mt-2" key={note}>
                      {note}
                    </p>
                  ))}
                </details>
              </footer>
              <LearningCompletionButton
                contentType={CONTENT_TYPE}
                contentId={topic.unitId}
                requirementLabel="مراجعة Rosen"
              />
            </article>
          </div>
        ) : (
          <div role="status" className="rounded-2xl border border-white/10 bg-slate-900/70 p-8 text-center text-sm text-slate-300">
            No matching topic found. Please select a chapter from the map or{" "}
            <button className="underline" onClick={() => setActiveIndex(0)}>
              return to the first topic
            </button>
            .
          </div>
        )}
      </main>
    </DashboardLayout>
  );
}
