import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import HighYieldChapterMap from "@/components/HighYieldChapterMap";
import SummaryLanguageMode from "@/components/SummaryLanguageMode";
import SummaryLearningActions from "@/components/SummaryLearningActions";
import TopicEnhancements from "@/components/learn/TopicEnhancements";
import { buildHighYieldChapterMap } from "@/lib/high-yield-chapter-map";
import { useSummaryLanguageMode } from "@/lib/summary-language";
import { trpc } from "@/lib/trpc";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";

type Chapter = {
  unitId: string;
  title: string;
  arabicTitle?: string | null;
  source: string;
  edition: number;
  highYieldSummary: string[];
  diagnosis: string[];
  management: string[];
  arabicExplanation: string;
  arabicExplanationStatus: string;
  pages: { start: number; end: number };
  reviewStatus: string;
};
type LanguageMode = "english" | "arabic" | "both";
type ArabicSections = {
  summary: string;
  diagnosis: string;
  management: string;
};
const TRACK = "resident-emergency-medicine";
const CONTENT_TYPE = "tintinalli-summary-chapter";

function parseArabicSections(text: string): ArabicSections {
  const normalized = text.trim();
  const diagnosisMarker = "التشخيص والتقييم:";
  const managementMarker = "التدبير والعلاج:";
  if (
    !normalized.includes(diagnosisMarker) &&
    !normalized.includes(managementMarker)
  ) {
    return {
      summary: normalized.replace(/^ملخص عربي مبسط:\s*/, ""),
      diagnosis: "",
      management: "",
    };
  }
  const [beforeManagement, management = ""] = normalized.split(
    managementMarker,
    2
  );
  const [summary, diagnosis = ""] = beforeManagement.split(diagnosisMarker, 2);
  return {
    summary: summary.replace(/^ملخص عربي مبسط:\s*/, "").trim(),
    diagnosis: diagnosis.trim(),
    management: management.trim(),
  };
}

function ContentCard({
  title,
  english,
  arabic,
  mode,
}: {
  title: string;
  english: string;
  arabic: string;
  mode: LanguageMode;
}) {
  if (!english && !arabic) return null;
  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70">
      <h2 className="border-b border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-black uppercase tracking-wider text-cyan-200">
        {title}
      </h2>
      <div className={mode === "both" ? "grid md:grid-cols-2" : "grid"}>
        {mode !== "arabic" && (
          <div
            lang="en"
            className="whitespace-pre-line p-5 text-sm leading-7 text-slate-200 md:border-e md:border-white/10"
          >
            {english || "No English content is available for this section."}
          </div>
        )}
        {mode !== "english" && (
          <div
            lang="ar"
            dir="rtl"
            className="whitespace-pre-line p-5 text-sm leading-8 text-slate-100"
          >
            {arabic ||
              "لا تتوفر ترجمة عربية منفصلة لهذا القسم؛ راجع الملخص العربي للفصل."}
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

export default function TintinalliHighYieldSummaryPage() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const { mode, changeMode } = useSummaryLanguageMode("tintinalli");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  const utils = trpc.useUtils();
  const savedProgress = trpc.learningProgress.current.useQuery({
    track: TRACK,
    contentType: CONTENT_TYPE,
  });
  const saveProgress = trpc.learningProgress.set.useMutation({
    onSuccess: async () => {
      await Promise.all([
        utils.learningProgress.current.invalidate(),
        utils.studyPlan.current.invalidate(),
      ]);
    },
  });

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    fetch("/content/summary-books/tintinalli-high-yield.json", {
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
    () => buildHighYieldChapterMap("tintinalli", chapters),
    [chapters]
  );
  const chapter = chapters[activeIndex];
  const completed = useMemo(
    () => new Set(savedProgress.data?.completedIds ?? []),
    [savedProgress.data?.completedIds]
  );
  const arabic = chapter
    ? parseArabicSections(chapter.arabicExplanation)
    : { summary: "", diagnosis: "", management: "" };
  const progress = chapters.length
    ? Math.round((completed.size / chapters.length) * 100)
    : 0;

  function selectChapter(index: number) {
    setActiveIndex(index);
    const selected = chapters[index];
    if (selected)
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}?chapter=${encodeURIComponent(selected.unitId)}`
      );
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function toggleCompleted(unitId: string) {
    saveProgress.mutate({
      track: TRACK,
      contentType: CONTENT_TYPE,
      contentId: unitId,
      completed: !completed.has(unitId),
    });
  }
  return (
    <DashboardLayout>
      <main className="mx-auto max-w-[1600px] text-slate-100">
        <header className="mb-5 rounded-2xl border border-cyan-200/15 bg-slate-900/70 p-5">
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
                <h1 className="text-2xl font-black">
                  Tintinalli Emergency Medicine High-Yield Review
                </h1>
                <p className="mt-1 text-sm text-slate-300">
                  189 source-linked chapter summaries · bilingual study reader
                </p>
              </div>
            </div>
            <div className="min-w-44 rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm">
              <div className="flex justify-between">
                <span>Read</span>
                <strong>
                  {completed.size} / {chapters.length || 189}
                </strong>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full bg-cyan-400 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-1 text-end text-xs text-cyan-200">{progress}%</p>
              <p dir="rtl" className="mt-1 text-[10px] text-slate-400">
                يُحتسب ضمن إنجاز مسار مقيمي الإسعاف والطوارئ.
              </p>
            </div>
          </div>
        </header>
        {loading ? (
          <p role="status" className="p-8 text-center">
            Loading 189 chapters…
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
          <div className="grid items-start gap-5 lg:grid-cols-[21rem_minmax(0,1fr)]">
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
                    <h1 className="mt-1 text-2xl font-black">
                      {chapter.title}
                    </h1>
                    {chapter.arabicTitle && (
                      <p
                        dir="rtl"
                        className="mt-1 text-lg font-bold text-slate-300"
                      >
                        {chapter.arabicTitle}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-slate-400">
                      PDF pages {chapter.pages.start}–{chapter.pages.end}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      disabled={activeIndex === 0}
                      onClick={() => selectChapter(activeIndex - 1)}
                      className="rounded-xl border border-white/10 bg-white/5 p-3 disabled:opacity-30"
                      aria-label="Previous chapter"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      disabled={activeIndex === chapters.length - 1}
                      onClick={() => selectChapter(activeIndex + 1)}
                      className="rounded-xl border border-white/10 bg-white/5 p-3 disabled:opacity-30"
                      aria-label="Next chapter"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                  <SummaryLanguageMode mode={mode} onChange={changeMode} />
                  <div dir="rtl" className="text-end">
                    <button
                      disabled={!savedProgress.data || saveProgress.isPending}
                      onClick={() => toggleCompleted(chapter.unitId)}
                      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold disabled:opacity-50 ${completed.has(chapter.unitId) ? "bg-emerald-300 text-emerald-950" : "bg-white/10 text-slate-100"}`}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      {saveProgress.isPending
                        ? "جارٍ الحفظ…"
                        : completed.has(chapter.unitId)
                          ? "✓ تم الفهم والاجتياز — تراجع"
                          : "فهمت هذه النقطة ✓"}
                    </button>
                    <p className="mt-1 text-xs text-slate-400">
                      يُحتسب ضمن إنجازك في مراجعة Tintinalli ومسارك الدراسي
                      الكامل.
                    </p>
                    {(savedProgress.isError || saveProgress.isError) && (
                      <p role="alert" className="mt-1 text-xs text-amber-200">
                        تعذر حفظ أو تحميل الإنجاز.{" "}
                        <button onClick={() => void savedProgress.refetch()}>
                          إعادة المحاولة
                        </button>
                      </p>
                    )}
                  </div>
                </div>
              </header>
              <SummaryLearningActions
                readHref={`/learn/summaries/tintinalli-high-yield?chapter=${encodeURIComponent(chapter.unitId)}`}
              />
              <ContentCard
                title="1. High-Yield Summary"
                english={chapter.highYieldSummary.join(" ")}
                arabic={arabic.summary}
                mode={mode}
              />
              <ContentCard
                title="2. Arabic Explanation · الشرح العربي"
                english=""
                arabic={chapter.arabicExplanation}
                mode={mode}
              />
              <UnstructuredSection
                title="3. Clinical Approach"
                description="Use the source-linked Diagnosis and Management sections below; this chapter has no separate structured clinical-approach field."
              />
              <ContentCard
                title="4. Diagnosis"
                english={chapter.diagnosis.join(" ")}
                arabic={arabic.diagnosis}
                mode={mode}
              />
              <ContentCard
                title="5. Management"
                english={chapter.management.join(" ")}
                arabic={arabic.management}
                mode={mode}
              />
              <TopicEnhancements source="tintinalli" unitId={chapter.unitId} />
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
                description="Open SEG Exam Traps for its separate source-governed revision collection."
                href="/practice/exam-traps"
              />
              <footer className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-xs text-slate-400">
                <span>
                  {chapter.source} · Edition {chapter.edition} · Pages{" "}
                  {chapter.pages.start}–{chapter.pages.end}
                </span>
                <Link
                  href="/learn/books"
                  className="rounded-lg bg-cyan-300/10 px-3 py-2 font-bold text-cyan-200"
                >
                  Open source library · فتح مكتبة المصادر
                </Link>
              </footer>
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
