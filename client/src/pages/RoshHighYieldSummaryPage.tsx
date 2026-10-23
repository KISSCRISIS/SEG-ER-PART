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

type Chapter = {
  unitId: string;
  title: string;
  source: string;
  edition: number;
  highYieldSummary: string[];
  diagnosis: string[];
  management: string[];
  arabicExplanation: string;
  arabicExplanationStatus?: string;
  pages: { start: number; end: number };
  reviewStatus: string;
};
const CONTENT_TYPE = "rosh-summary-chapter";
const TRACK = "resident-emergency-medicine";

function Section({
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
  if (mode === "arabic" && !arabic) return null;
  if (mode === "english" && !english) return null;
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

export default function RoshHighYieldSummaryPage() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [retry, setRetry] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { mode, changeMode } = useSummaryLanguageMode("rosh");
  const savedProgress = trpc.learningProgress.current.useQuery({
    track: TRACK,
    contentType: CONTENT_TYPE,
  });

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    fetch("/content/summary-books/rosh-high-yield.json", {
      signal: controller.signal,
      cache: "no-cache",
    })
      .then(async response => {
        if (!response.ok) throw new Error("Summary unavailable");
        const data = await response.json();
        if (data.schemaVersion !== 2 || !Array.isArray(data.chapters))
          throw new Error("Invalid summary format");
        if (!controller.signal.aborted) {
          setChapters(data.chapters);
          const requested = new URLSearchParams(window.location.search).get(
            "chapter"
          );
          const requestedIndex = data.chapters.findIndex(
            (chapter: Chapter) => chapter.unitId === requested
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
  }, [retry]);

  const chapterMap = useMemo(
    () => buildHighYieldChapterMap("rosh", chapters),
    [chapters]
  );
  const completed = useMemo(
    () => new Set(savedProgress.data?.completedIds ?? []),
    [savedProgress.data?.completedIds]
  );
  const progress = chapters.length
    ? Math.round((completed.size / chapters.length) * 100)
    : 0;
  const chapter = chapters[activeIndex];
  const selectChapter = (index: number) => {
    setActiveIndex(index);
    const selected = chapters[index];
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
                  Rosh Emergency Medicine High-Yield Review
                </h1>
                <p className="mt-1 text-sm text-slate-300">
                  {chapters.length || 12} page-linked source chapters · one
                  chapter at a time
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-start gap-3">
              <div className="min-w-44 rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm">
                <div className="flex justify-between">
                  <span>Read</span>
                  <strong>
                    {completed.size} / {chapters.length || 12}
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
            Arabic Study Mode shows the source-linked Arabic explanation, not a
            replacement for the original source or local clinical protocol.
          </div>
        </header>
        {loading ? (
          <p role="status" className="p-8 text-center">
            Loading source chapters…
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
              onClick={() => setRetry(value => value + 1)}
            >
              إعادة المحاولة
            </button>
          </div>
        ) : !chapters.length ? (
          <div role="status" className="rounded-2xl border border-white/10 bg-slate-900/70 p-8 text-center text-sm text-slate-300">
            No source chapters available for this summary. The index loaded but contains no chapters.
          </div>
        ) : chapter ? (
          <div className="grid items-start gap-5 lg:grid-cols-[20rem_minmax(0,1fr)]">
            <HighYieldChapterMap
              chapters={chapterMap}
              activeTopicId={chapter.unitId}
              completedIds={completed}
              onSelectTopic={selectChapter}
            />
            <article className="min-w-0 space-y-4">
              <header className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                      Chapter {activeIndex + 1} of {chapters.length}
                    </p>
                    <h2 className="mt-1 text-2xl font-black">
                      {chapter.title}
                    </h2>
                    <p className="mt-2 text-xs text-slate-400">
                      PDF pages {chapter.pages.start}–{chapter.pages.end}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={activeIndex === 0}
                      onClick={() => selectChapter(activeIndex - 1)}
                      className="rounded-xl border border-white/10 bg-white/5 p-3 disabled:opacity-30"
                      aria-label="Previous chapter"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      disabled={activeIndex === chapters.length - 1}
                      onClick={() => selectChapter(activeIndex + 1)}
                      className="rounded-xl border border-white/10 bg-white/5 p-3 disabled:opacity-30"
                      aria-label="Next chapter"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="mt-4 border-t border-white/10 pt-4">
                  <SummaryLearningActions
                    readHref={`/learn/summaries/rosh-high-yield?chapter=${encodeURIComponent(chapter.unitId)}`}
                  />
                </div>
              </header>
              <Section
                title="1. High-Yield Summary"
                english={chapter.highYieldSummary.join(" ")}
                mode={mode}
              />
              <Section
                title="2. Arabic Explanation · الشرح العربي"
                arabic={chapter.arabicExplanation}
                mode={mode}
              />
              <UnstructuredSection
                title="3. Clinical Approach"
                description="Use the source-linked Diagnosis and Management sections below; this summary does not expose a separate structured clinical-approach field."
              />
              <Section
                title="4. Diagnosis"
                english={chapter.diagnosis.join(" ")}
                mode={mode}
              />
              <Section
                title="5. Management"
                english={chapter.management.join(" ")}
                mode={mode}
              />
              <TopicEnhancements source="rosh" unitId={chapter.unitId} />
              <UnstructuredSection
                title="6. Algorithms"
                description="No source-structured algorithm is available for this chapter."
              />
              <UnstructuredSection
                title="7. Tables"
                description="No source-structured table is available for this chapter."
              />
              <UnstructuredSection
                title="8–9. Exam Pearls & Exam Traps"
                description="Open SEG Exam Traps for its separate, source-governed revision collection."
                href="/practice/exam-traps"
              />
              <footer className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <p className="text-xs text-slate-400">
                  11. References · {chapter.source} · Edition {chapter.edition}{" "}
                  · PDF pages {chapter.pages.start}–{chapter.pages.end}
                </p>
                <a
                  href={`/study-books/rosh-rotation-2019.pdf#page=${chapter.pages.start}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block rounded-lg bg-cyan-300/10 px-3 py-2 text-xs font-bold text-cyan-200"
                >
                  Open cited source pages · فتح المصدر
                </a>
              </footer>
              <LearningCompletionButton
                contentType={CONTENT_TYPE}
                contentId={chapter.unitId}
                requirementLabel="مراجعة Rosh"
              />
            </article>
          </div>
        ) : (
          <div role="status" className="rounded-2xl border border-white/10 bg-slate-900/70 p-8 text-center text-sm text-slate-300">
            No matching chapter found. Please select a chapter from the map or{" "}
            <button className="underline" onClick={() => setActiveIndex(0)}>
              return to the first chapter
            </button>
            .
          </div>
        )}
      </main>
    </DashboardLayout>
  );
}
