import DashboardLayout from "@/components/DashboardLayout";
import LearningCompletionButton from "@/components/LearningCompletionButton";
import { useEffect, useMemo, useState } from "react";
import { BookOpen, Search, ShieldAlert } from "lucide-react";

type GuideChapter = { id: string; unitId?: string; title: string; source: string; sourcePages?: { start?: number; end?: number }; status: string; clinicalReview: string; arabicExplanation: string };
type Guide = { title: string; targetPages: number; chapters: GuideChapter[]; status: string };

export default function UnifiedGuidePage() {
  const [guide, setGuide] = useState<Guide | null>(null);
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  useEffect(() => {
    setIsLoading(true);
    setLoadError(false);
    Promise.all([
      fetch("/content/seg-unified-guide/outline.json").then(response => response.json()),
      fetch("/content/seg-unified-guide/summary-samples.json").then(response => response.json()),
      fetch("/content/seg-unified-guide/summary-batch-02.json").then(response => response.json()),
      fetch("/content/seg-unified-guide/summary-batch-03.json").then(response => response.json()),
      fetch("/content/seg-unified-guide/summary-batch-04.json").then(response => response.json()),
      fetch("/content/seg-unified-guide/summary-batch-05.json").then(response => response.json()),
      fetch("/content/seg-unified-guide/summary-batch-06.json").then(response => response.json()),
      fetch("/content/seg-unified-guide/summary-batch-07.json").then(response => response.json()),
      fetch("/content/seg-unified-guide/summary-batch-08.json").then(response => response.json()),
      fetch("/content/seg-unified-guide/summary-batch-09.json").then(response => response.json()),
      fetch("/content/seg-unified-guide/summary-batch-10.json").then(response => response.json()),
    ]).then(([outline, firstBatch, secondBatch, thirdBatch, fourthBatch, fifthBatch, sixthBatch, seventhBatch, eighthBatch, ninthBatch, tenthBatch]) => {
      const batches = [firstBatch, secondBatch, thirdBatch, fourthBatch, fifthBatch, sixthBatch, seventhBatch, eighthBatch, ninthBatch, tenthBatch].flatMap(batch => batch.items as GuideChapter[]);
      const chapters = outline.chapters.map((chapter: GuideChapter) => ({
        ...chapter,
        ...(batches.find(item => item.unitId === chapter.id || item.id === chapter.id) ?? {}),
      }));
      const existingIds = new Set(chapters.map((chapter: GuideChapter) => chapter.id));
      const additionalSummaries = batches
        .filter(item => item.unitId && !existingIds.has(item.unitId))
        .map(item => ({ ...item, id: item.unitId as string }));
      setGuide({ ...outline, chapters: [...chapters, ...additionalSummaries] as GuideChapter[] });
      setIsLoading(false);
    }).catch(() => {
      setGuide(null);
      setLoadError(true);
      setIsLoading(false);
    });
  }, [reloadKey]);
  const chapters = useMemo(() => (guide?.chapters ?? []).filter((chapter: GuideChapter) => !search.trim() || `${chapter.title} ${chapter.source}`.toLowerCase().includes(search.trim().toLowerCase())), [guide, search]);
  const visibleChapters = showAll ? chapters : chapters.slice(0, 60);
  return <DashboardLayout><main className="mx-auto max-w-7xl space-y-5 text-slate-100"><header className="rounded-2xl border border-cyan-200/15 bg-slate-900/70 p-5"><div className="flex items-center gap-3"><BookOpen className="text-cyan-300" /><div><p className="text-xs font-bold uppercase tracking-widest text-cyan-300">SEG Original Review Guide</p><h1 className="text-2xl font-black">{isLoading ? "Loading guide…" : (guide?.title ?? "Unified guide")}</h1></div></div><div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-300/20 bg-amber-300/5 p-3 text-xs text-amber-100"><ShieldAlert className="h-4 w-4 shrink-0" />Original high-yield synthesis. Every unit is under clinical review and is not an official Jordanian Board blueprint.</div><div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="rounded-xl bg-white/[.04] p-3"><p className="text-xs text-slate-400">Units</p><p className="text-xl font-black">{guide?.chapters.length ?? "—"}</p></div><div className="rounded-xl bg-white/[.04] p-3"><p className="text-xs text-slate-400">Target pages</p><p className="text-xl font-black">{guide?.targetPages ?? "—"}</p></div><div className="rounded-xl bg-white/[.04] p-3"><p className="text-xs text-slate-400">Status</p><p className="text-xl font-black">{guide?.status ?? (loadError ? "unavailable" : "loading")}</p></div></div><div className="mt-4 flex gap-2"><label className="flex flex-1 items-center gap-2 rounded-xl border border-white/10 bg-slate-950 px-3"><Search className="h-4 w-4 text-slate-500" /><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search guide units..." className="w-full bg-transparent py-3 text-sm outline-none" /></label>{chapters.length > 60 && <button type="button" onClick={() => setShowAll(value => !value)} className="rounded-xl border border-cyan-300/30 px-3 text-xs font-bold text-cyan-100">{showAll ? "Show less" : `Show all (${chapters.length})`}</button>}</div>{isLoading ? (<p role="status" className="mt-4 rounded-xl border border-white/10 bg-slate-950 p-4 text-sm text-slate-300">Loading guide units…</p>) : null}{!isLoading && loadError ? (<div role="alert" className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-rose-300/20 bg-rose-300/5 p-4 text-sm text-rose-100"><span>Unable to load the unified guide. Please retry.</span><button type="button" onClick={() => setReloadKey(value => value + 1)} className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold">Retry</button></div>) : null}</header><section className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{visibleChapters.map(chapter => <article key={chapter.id} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"><div className="flex items-center justify-between gap-2"><span className="rounded-full bg-cyan-300/10 px-2 py-1 text-[10px] font-bold text-cyan-100">{chapter.source}</span><span className="text-[10px] text-amber-200">{chapter.status}</span></div><h2 className="mt-3 text-sm font-bold leading-6">{chapter.title}</h2><p className="mt-2 text-xs text-slate-400">Pages {chapter.sourcePages?.start ?? "?"}–{chapter.sourcePages?.end ?? "?"} · Clinical review: {chapter.clinicalReview}</p><p className="mt-3 text-xs leading-5 text-slate-300">{chapter.arabicExplanation}</p><LearningCompletionButton contentType="unified-guide-unit" contentId={chapter.id} requirementLabel="الدليل الموحد" /></article>)}{!showAll && chapters.length > 60 && <p className="md:col-span-2 xl:col-span-3 text-center text-sm text-slate-400">Showing the first 60 matches.</p>}</section></main></DashboardLayout>;
}
