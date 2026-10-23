import Bi from "@/components/Bi";
import DashboardLayout from "@/components/DashboardLayout";
import MedicalSystemsBrowser from "@/components/learn/MedicalSystemsBrowser";
import {
  HIGH_YIELD_REVIEW_MAP,
  type HighYieldReviewId,
} from "@/data/high-yield-reviews";
import { STUDY_BOOKS } from "@/lib/study-books";
import { trpc } from "@/lib/trpc";
import { RESIDENT_PATHWAY_SECTIONS } from "@shared/resident-taxonomy";
import {
  BookOpen,
  ClipboardList,
  LibraryBig,
  ShieldAlert,
  Target,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useLocation, useSearch } from "wouter";


/**
 * Learn source picker derived from the canonical High-Yield Review registry.
 * Same five reviews, same order, same copy and destinations â€” plus the
 * Original Books Library entry. Reviews stay separate from Qbank items.
 */
const LEARN_PICKER_ORDER: HighYieldReviewId[] = [
  "frcem",
  "hippo",
  "rosh",
  "tintinalli",
  "rosen",
];

const DIRECT_LEARN_SOURCES = [
  ...LEARN_PICKER_ORDER.map(id => {
    const review = HIGH_YIELD_REVIEW_MAP[id];
    return {
      label: review.learnLabel,
      meta: review.learnMeta,
      href: review.learnRoute,
    };
  }),
  { label: "Original Books Library", meta: "Original Book Â· 5 books", href: "/learn/books" },
];

export default function ResidentLearnPage() {
  const [, navigate] = useLocation();
  const urlSearch = useSearch();
  const [search, setSearch] = useState("");
  const [showMappedChapters, setShowMappedChapters] = useState(false);
  const [showAllChapters, setShowAllChapters] = useState(false);
  const params = new URLSearchParams(urlSearch);
  const requestedSection = Number(params.get("section"));
  const requestedFamily = params.get("family");
  const requestedChapter = Number(params.get("chapter"));
  const selectedSectionId = RESIDENT_PATHWAY_SECTIONS.some(
    ([id]) => id === requestedSection
  )
    ? requestedSection
    : undefined;
  const selectedSection = RESIDENT_PATHWAY_SECTIONS.find(
    ([id]) => id === selectedSectionId
  );
  const frcem = trpc.residentContent.chapters.useQuery({ family: "FRCEM" });
  const hippo = trpc.residentContent.chapters.useQuery({ family: "HIPPO" });
  const frcemProgress = trpc.residentContent.studyProgress.useQuery({ family: "FRCEM" });
  const hippoProgress = trpc.residentContent.studyProgress.useQuery({ family: "HIPPO" });
  const topicStats = trpc.residentContent.performanceSummary.useQuery();
  const topicMap = useMemo(
    () =>
      new Map(
        (topicStats.data?.topics ?? []).map(topic => [
          `${topic.family}:${topic.chapterNumber}`,
          topic,
        ])
      ),
    [topicStats.data]
  );
  const user = trpc.auth.me.useQuery();
  const chapters = [...(frcem.data ?? []), ...(hippo.data ?? [])];
  const normalizedSearch = search.trim().toLowerCase();
  const filteredChapters = chapters.filter(
    chapter =>
      (!requestedFamily || chapter.family === requestedFamily) &&
      (!requestedChapter || chapter.chapterNumber === requestedChapter) &&
      (!selectedSectionId || chapter.sectionId === selectedSectionId) &&
      (!normalizedSearch ||
        `${chapter.family} ${chapter.chapterTitle} ${chapter.sectionTitle}`
          .toLowerCase()
          .includes(normalizedSearch))
  );
  const filteredQuestionCount = filteredChapters.reduce(
    (sum, chapter) => sum + (chapter.questionCount ?? 0),
    0
  );
  const progressRows = [...(frcemProgress.data ?? []), ...(hippoProgress.data ?? [])];
  const isCompleted = (family: string, number: number) => progressRows.some(row => row.family === family && row.chapterNumber === number && row.completed);
  const completedChapters = chapters.filter(chapter => isCompleted(chapter.family, chapter.chapterNumber)).length;
  const totalChapters = chapters.length;
  const progressLoading = frcem.isLoading || hippo.isLoading || frcemProgress.isLoading || hippoProgress.isLoading;
  const progressError = frcem.isError || hippo.isError || frcemProgress.isError || hippoProgress.isError;
  const lastActivity = (() => { try { return user.data ? JSON.parse(localStorage.getItem(`seg-last-learn-activity:${user.data.id}`) ?? "null") as { bookId?: string; chapterId?: string; page?: number } | null : null; } catch { return null; } })();
  const continueChapter = chapters.find(chapter => `${chapter.family.toLowerCase()}-${chapter.chapterNumber}` === lastActivity?.chapterId);
  const continueBook = STUDY_BOOKS.find(book => book.id === lastActivity?.bookId);
  const continuePage = Number.isInteger(lastActivity?.page) && Number(lastActivity?.page) > 0 ? lastActivity?.page : undefined;
  const continueProgress = continueChapter && isCompleted(continueChapter.family, continueChapter.chapterNumber) ? 100 : 0;
  const sourceProgress = (family: string) => { const items = chapters.filter(chapter => chapter.family === family); return items.length ? Math.round(items.filter(chapter => isCompleted(family, chapter.chapterNumber)).length / items.length * 100) : 0; };
  const setSection = (sectionId?: number) =>
    navigate(sectionId ? `/learn?section=${sectionId}` : "/learn");

  return (
    <DashboardLayout>
      <main className="mx-auto max-w-7xl space-y-5 text-slate-100">
        {(requestedFamily || requestedChapter) && <div className="rounded-xl border border-cyan-200/20 p-3"><p><Bi t="learn.chapter.selected" /></p><Link href="/learn" className="text-cyan-300 underline"><Bi t="learn.browse" /></Link></div>}
        <header className="rounded-2xl border border-cyan-200/15 bg-slate-900/70 p-5">
          <div className="flex items-center gap-3">
            <BookOpen className="text-cyan-300" />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                Resident Emergency Medicine
              </p>
              <h1 className="text-2xl font-black"><Bi t="learn.title" /></h1>
            </div>
          </div>
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-300/20 bg-amber-300/5 p-3 text-xs text-amber-100">
            <ShieldAlert className="h-4 w-4 shrink-0" />
            Educational pilot content under review. Verify time-sensitive
            guidance and local protocols before clinical use.
          </div>
          <div className="mt-4 rounded-xl border border-cyan-200/15 bg-cyan-300/[.04] p-4">
            <p className="text-xs font-black uppercase tracking-widest text-cyan-200"><Bi t="learn.choose" /></p>
            <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-3">
              {DIRECT_LEARN_SOURCES.slice(0, 5).map(source => (
                <button
                  key={source.href}
                  type="button"
                  onClick={() => navigate(source.href)}
                  className="rounded-lg border border-cyan-200/15 bg-slate-950/70 px-3 py-2 text-left text-xs font-bold text-cyan-100 transition hover:border-cyan-300/50 hover:bg-cyan-300/10"
                >
                  <span className="block">{source.label}</span>{source.meta && <span className="mt-1 block text-[10px] font-normal text-slate-400">{source.meta}</span>}
                </button>
              ))}
              <button
                type="button"
                onClick={() => navigate("/learn/books")}
                className="rounded-lg border border-amber-200/20 bg-amber-300/5 px-3 py-2 text-left text-xs font-bold text-amber-100 transition hover:border-amber-200/50 hover:bg-amber-300/10"
              >
                Original books
              </button>
            </div>
          </div>
          {selectedSection ? (
            <div className="mt-4 rounded-xl border border-cyan-200/15 bg-cyan-300/[.06] p-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-cyan-300">
                Pathway filter active
              </p>
              <p className="mt-1 text-sm font-bold text-white">
                {selectedSection[0]}. {selectedSection[1]}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Showing mapped study chapters for this pathway section. Open Revision Tools for flashcards and exam traps.
              </p>
            </div>
          ) : null}
          <input
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder="Search mapped study chapters..." aria-label="Search mapped study chapters"
            className="mt-4 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm"
          />
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setSection()}
              className={`shrink-0 rounded-full border px-3 py-2 text-xs font-bold ${
                selectedSectionId
                  ? "border-white/10 bg-white/[.03] text-slate-300"
                  : "border-cyan-200/30 bg-cyan-300/10 text-cyan-100"
              }`}
            >
              All pathway
            </button>
            {RESIDENT_PATHWAY_SECTIONS.map(([id, title]) => (
              <button
                key={id}
                type="button"
                onClick={() => setSection(id)}
                className={`shrink-0 rounded-full border px-3 py-2 text-xs font-bold ${
                  selectedSectionId === id
                    ? "border-cyan-200/30 bg-cyan-300/10 text-cyan-100"
                    : "border-white/10 bg-white/[.03] text-slate-300"
                }`}
              >
                {id}. {title}
              </button>
            ))}
          </div>
        </header>
        <MedicalSystemsBrowser />
        <section className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl border border-cyan-200/20 bg-gradient-to-r from-cyan-400/15 to-blue-500/10 p-5">
            <p className="text-xs font-black uppercase tracking-widest text-cyan-200"><Bi t="learn.continue" /></p>
            <p className="mt-1 text-xs text-cyan-100/80" dir="rtl">Ù…ØªØ§Ø¨Ø¹Ø© Ø¢Ø®Ø± Ù…Ø­ØªÙˆÙ‰ Ø¯Ø±Ø§Ø³ÙŠ Ù…Ù† Ø­ÙŠØ« ØªÙˆÙ‚ÙØª</p>
            <h2 className="mt-2 text-xl font-black">{continueChapter?.chapterTitle ?? continueBook?.title ?? "Start your first learning chapter"}</h2>
            <p className="mt-1 text-sm text-slate-300">{continueChapter ? `${continueChapter.family} Â· Chapter ${continueChapter.chapterNumber}` : continueBook?.title ?? "Choose a chapter from your pathway to begin."}{continuePage ? ` Â· Last page: ${continuePage}` : ""}</p>
            <p className="mt-2 text-xs text-cyan-200" dir="rtl">{continueChapter ? (continueProgress === 100 ? "ØªÙ… ØªØ£ÙƒÙŠØ¯ Ø¥ÙƒÙ…Ø§Ù„ Ø§Ù„ÙØµÙ„" : "Ù„Ù… ØªØ¤ÙƒØ¯ Ø¥ÙƒÙ…Ø§Ù„ Ø§Ù„ÙØµÙ„ Ø¨Ø¹Ø¯") : "Ø¢Ø®Ø± Ù…ÙˆØ¶Ø¹ Ù…Ø­ÙÙˆØ¸ Ù„Ù„Ø§Ø³ØªÙƒÙ…Ø§Ù„Ø› Ù„Ø§ ÙŠÙØ­ØªØ³Ø¨ Ø¥Ù†Ø¬Ø§Ø²Ù‹Ø§"}</p>
            <button type="button" onClick={() => continueChapter ? navigate(`/learn/chapter/${continueChapter.family.toLowerCase()}-${continueChapter.chapterNumber}`) : continueBook ? navigate(`/learn/books/${continueBook.id}`) : setShowMappedChapters(true)} className="mt-4 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-black text-slate-950 disabled:opacity-40">{continueChapter || continueBook ? "Continue Reading" : "Start Learning"}</button>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
            <p className="text-xs font-black uppercase tracking-widest text-cyan-200"><Bi t="learn.progress" /></p>
            <p className="mt-1 text-xs text-cyan-100/80" dir="rtl">Ø§Ù„Ø¥Ù†Ø¬Ø§Ø² Ø­Ø³Ø¨ Ø§Ù„ÙØµÙˆÙ„ Ø§Ù„ØªÙŠ Ø£ÙƒÙ‘Ø¯Øª Ø¥ÙƒÙ…Ø§Ù„Ù‡Ø§</p>
            {progressLoading ? <p role="status" className="mt-3 text-sm" dir="rtl">Ø¬Ø§Ø±Ù ØªØ­Ù…ÙŠÙ„ Ø¥Ù†Ø¬Ø§Ø²Ùƒâ€¦</p> : progressError ? <div role="alert" className="mt-3 text-sm" dir="rtl">ØªØ¹Ø°Ø± ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ø¥Ù†Ø¬Ø§Ø². <button type="button" className="underline" onClick={() => { void frcem.refetch(); void hippo.refetch(); void frcemProgress.refetch(); void hippoProgress.refetch(); }}>Ø¥Ø¹Ø§Ø¯Ø© Ø§Ù„Ù…Ø­Ø§ÙˆÙ„Ø©</button></div> : <>
            <div className="mt-3 flex items-end gap-2"><span className="text-3xl font-black">{totalChapters ? Math.round((completedChapters / totalChapters) * 100) : 0}%</span><span className="pb-1 text-xs text-slate-400"><Bi t="learn.chapter.confirmed" /></span></div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-cyan-400" style={{ width: `${totalChapters ? Math.round((completedChapters / totalChapters) * 100) : 0}%` }} /></div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-300" dir="rtl" aria-live="polite"><span>Ø§Ù„ÙØµÙˆÙ„ Ø§Ù„Ù…ÙƒØªÙ…Ù„Ø©: {completedChapters}/{totalChapters}</span><span>Ø§Ù„Ù…ØªØ¨Ù‚ÙŠ: {totalChapters - completedChapters}</span><span>Ø§Ù„Ø£Ø³Ø¦Ù„Ø© Ø§Ù„Ù…Ø±ØªØ¨Ø·Ø©: {chapters.reduce((sum, chapter) => sum + (chapter.questionCount ?? 0), 0)}</span></div>
            <div className="mt-3 flex flex-wrap gap-2 text-[10px] text-slate-400">{["FRCEM", "HIPPO"].map(id => <span key={id} className="rounded-full bg-white/5 px-2 py-1">{id.split("-")[0].toUpperCase()}: {sourceProgress(id)}%</span>)}</div>
            <p className="mt-3 text-xs leading-5 text-slate-400" dir="rtl">ØªØªØ­Ø¯Ø« Ø§Ù„Ù†Ø³Ø¨Ø© Ø¹Ù†Ø¯ ØªØ£ÙƒÙŠØ¯ Ø¥ÙƒÙ…Ø§Ù„ Ø§Ù„ÙØµÙ„ Ø£Ùˆ Ø§Ù„ØªØ±Ø§Ø¬Ø¹ Ø¹Ù†Ù‡. Ø§Ù„Ø­Ø³Ø§Ø¨ ÙŠØ´Ù…Ù„ ÙØµÙˆÙ„ FRCEM ÙˆHIPPO Ø§Ù„Ù…Ø±ØªØ¨Ø·Ø© Ø­Ø§Ù„ÙŠÙ‹Ø§Ø› Ù…ÙˆØ¶Ø¹ Ø§Ù„ØµÙØ­Ø© ÙˆØ¥Ù†Ø¬Ø§Ø² Exam Traps Ù…Ù†ÙØµÙ„Ø§Ù†.</p>
            </>}
          </div>
        </section>
        <section className="rounded-2xl border border-cyan-200/10 bg-slate-900/70 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-cyan-300" />
              <div>
                <h2 className="font-black"><Bi t="learn.mapped.chapters" /></h2>
                <p className="mt-1 text-xs text-cyan-100/80" dir="rtl">Ø§Ù„ÙØµÙˆÙ„ Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠØ© Ø§Ù„Ù…Ø±ØªØ¨Ø·Ø© Ø¨Ù…Ø³Ø§Ø±Ùƒ ÙˆØ¨Ù†Ùƒ Ø§Ù„Ø£Ø³Ø¦Ù„Ø©</p>
                <p className="text-xs text-slate-400">
                  {filteredChapters.length} chapters Â· {filteredQuestionCount}{" "}
                  linked Qbank items
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setShowMappedChapters(value => !value)} className="rounded-xl border border-cyan-200/20 px-4 py-2.5 text-sm font-black text-cyan-100">{showMappedChapters ? "Hide chapters" : "Browse chapters"}</button>
              {selectedSectionId ? <Link href={`/practice/create?section=${selectedSectionId}`} className="rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-black text-slate-950"><Bi t="learn.practice" /></Link> : <Link href="/practice/create" className="rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-black text-slate-950"><Bi t="learn.create.practice" /></Link>}
              <Link href="/pathway" className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-bold text-slate-200"><Bi t="learn.view.pathway" /></Link>
            </div>
          </div>
          {showMappedChapters && <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {filteredChapters.length ? (
              (showAllChapters ? filteredChapters : filteredChapters.slice(0, 18)).map(chapter => (
                <article
                  key={`${chapter.family}-${chapter.chapterNumber}`}
                  className="rounded-2xl border border-white/10 bg-slate-950/45 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full border border-cyan-200/20 bg-cyan-300/10 px-2.5 py-1 text-[10px] font-black text-cyan-100">
                      {chapter.family} Â· Ch {chapter.chapterNumber}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {chapter.questionCount} Qs
                    </span>
                  </div>
                  <h3 className="mt-3 min-h-12 text-sm font-bold leading-6 text-white">
                    {chapter.chapterTitle}
                  </h3>
                  <p className="mt-1 text-[11px] leading-5 text-slate-400">
                    {chapter.sectionTitle}
                  </p>
                  {(() => {
                    const topic = topicMap.get(
                      `${chapter.family}:${chapter.chapterNumber}`
                    );
                    if (!topic) return null;
                    return (
                      <div className="mt-3" aria-live="polite">
                        <div className="flex items-center justify-between gap-2 text-[10px]">
                          <span
                            className={
                              topic.completed
                                ? "font-bold text-emerald-300"
                                : "text-slate-400"
                            }
                          >
                            {topic.completed ? "Completed" : "Not completed"}
                          </span>
                          <span className="font-bold text-cyan-200">
                            {topic.progress}%
                          </span>
                        </div>
                        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-cyan-400"
                            style={{ width: `${topic.progress}%` }}
                          />
                        </div>
                        <p className="mt-1 text-[10px] text-slate-500">
                          {topic.attempted} attempted Â· {topic.accuracy}% accuracy
                        </p>
                      </div>
                    );
                  })()}
                    <div className="mt-4 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => navigate(`/learn/chapter/${chapter.family.toLowerCase()}-${chapter.chapterNumber}`)}
                      className="rounded-xl border border-white/10 px-3 py-2 text-xs font-bold text-cyan-100"
                    >
                      Read Chapter
                    </button>
                    <Link
                      href={`/practice/create?section=${chapter.sectionId}`}
                      className="rounded-xl bg-white/[.06] px-3 py-2 text-center text-xs font-bold text-slate-100"
                    >
                      Practice
                    </Link>
                    <Link href={`/atlas?section=${chapter.sectionId}`} className="rounded-xl border border-white/10 px-3 py-2 text-center text-xs font-bold text-slate-200"><Bi t="learn.atlas" /></Link>
                    <Link href={`/journal?section=${chapter.sectionId}`} className="rounded-xl border border-white/10 px-3 py-2 text-center text-xs font-bold text-slate-200"><Bi t="learn.notes" /></Link>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-amber-300/20 bg-amber-300/[.05] p-4 text-sm leading-6 text-amber-100 md:col-span-2 xl:col-span-3">
                No mapped Learn chapters match this filter yet. Use Practice for
                Qbank-only material, or clear the filter to browse all active
                study sources.
              </div>
            )}
          </div>}
          {showMappedChapters && filteredChapters.length > 18 ? (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <p className="text-xs text-slate-400">
                Showing {showAllChapters ? filteredChapters.length : 18} of {filteredChapters.length} chapters.
              </p>
              <button
                type="button"
                onClick={() => setShowAllChapters(value => !value)}
                className="rounded-xl border border-cyan-200/20 px-4 py-2 text-xs font-bold text-cyan-100"
              >
                {showAllChapters ? "Show less" : `Show all (${filteredChapters.length})`}
              </button>
            </div>
          ) : null}
        </section>
        <section id="study-library" className="scroll-mt-6 rounded-2xl border border-white/10 bg-slate-900/70 p-5">
          <div className="flex items-center gap-2">
            <LibraryBig className="h-5 w-5 text-cyan-300" />
            <div>
              <h2 className="font-black"><Bi t="learn.library" /></h2>
              <p className="mt-1 text-xs text-cyan-100/80" dir="rtl">Ù…ÙƒØªØ¨Ø© Ø§Ù„ÙƒØªØ¨ ÙˆØ§Ù„Ù…Ø±Ø§Ø¬Ø¹ ÙˆØ§Ù„Ù…Ù„Ø®ØµØ§Øª Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠØ©</p>
              <p className="text-xs text-slate-400">
                Books and textual references only. FRCEM and HIPPO questions
                have been moved exclusively to Qbank SEG.
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="md:col-span-3 text-xs font-black uppercase tracking-widest text-cyan-200"><Bi t="learn.unified.guide" /></div>
            <article className="flex min-h-56 flex-col rounded-2xl border border-cyan-200/20 bg-gradient-to-br from-cyan-400/20 to-blue-500/10 p-5 md:col-span-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-cyan-300">Original SEG synthesis Â· under review</span>
              <h2 className="mt-4 text-xl font-black"><Bi t="learn.unified.title" /></h2>
              <p className="mt-2 max-w-3xl text-sm text-slate-300">A focused review route combining the three selected references with source page locators, Arabic explanation fields, and links reserved for SEG question mapping.</p>
              <Link href="/learn/unified-guide" className="mt-auto w-fit rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-black text-slate-950">BROWSE UNIFIED GUIDE</Link>
            </article>
            <Link href="/learn/summaries" className="md:col-span-3 block rounded-2xl border border-amber-200/20 bg-gradient-to-br from-amber-400/15 to-cyan-500/10 p-5 transition hover:border-cyan-300/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300">
              <h2 className="text-lg font-black"><Bi t="learn.high.yield" /></h2>
              <p className="mt-2 text-sm text-slate-300" dir="rtl">Ù…Ù„Ø®ØµØ§Øª Ù…Ø±ÙƒØ²Ø© Ù„Ø£Ù‡Ù… Ø§Ù„Ù†Ù‚Ø§Ø· Ø§Ù„Ø§Ù…ØªØ­Ø§Ù†ÙŠØ©</p>
              <span className="mt-4 inline-block rounded-xl bg-amber-300 px-4 py-2 text-sm font-black text-slate-950">Ø§Ø³ØªØ¹Ø±Ø§Ø¶ Ø§Ù„Ù…Ù„Ø®ØµØ§Øª â†</span>
            </Link>
            <Link href="/learn/books" className="md:col-span-3 block rounded-2xl border border-cyan-200/20 bg-slate-900/70 p-5 transition hover:border-cyan-300">
              <h2 className="text-lg font-black">Original Books Library</h2>
              <p className="mt-2 text-sm text-slate-300" dir="rtl">Ù…ÙƒØªØ¨Ø© Ø§Ù„ÙƒØªØ¨ ÙˆØ§Ù„Ù…Ø±Ø§Ø¬Ø¹ Ø§Ù„Ø£ØµÙ„ÙŠØ© â€” Ø§Ø®ØªØ± Ø§Ù„ÙƒØªØ§Ø¨ Ù„Ø¨Ø¯Ø¡ Ø§Ù„Ù‚Ø±Ø§Ø¡Ø©.</p>
              <span className="mt-4 inline-block rounded-xl bg-cyan-500 px-4 py-2 font-bold text-slate-950">Ø§Ø³ØªØ¹Ø±Ø§Ø¶ Ø§Ù„ÙƒØªØ¨ â†</span>
            </Link>
          </div>
        </section>
        <Link href="/learn/revision" className="block rounded-2xl border border-cyan-200/20 bg-slate-900/70 p-5 transition hover:border-cyan-300">
          <h2 className="text-lg font-black"><Bi t="revision.title" /></h2>
          <p className="mt-2 text-sm text-slate-300" dir="rtl">Ø£Ø¯ÙˆØ§Øª Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„Ø³Ø±ÙŠØ¹Ø© ÙˆØªØ«Ø¨ÙŠØª Ø§Ù„Ù…Ø¹Ù„ÙˆÙ…Ø§Øª</p>
          <span className="mt-4 inline-block rounded-xl bg-cyan-500 px-4 py-2 font-bold text-slate-950">Ø§Ø®ØªÙŠØ§Ø± Ø£Ø¯Ø§Ø© Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø© â†</span>
        </Link>
        <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-cyan-200/10 bg-cyan-300/5 p-5">
          <div>
            <h2 className="font-bold"><Bi t="learn.find.frcem" /></h2>
            <p className="mt-1 text-xs text-slate-400">
              All question banks, explanations, exam modes, and performance
              tracking are now located in Practice.
            </p>
          </div>
          <button
            onClick={() => navigate("/practice/create")}
            className="flex items-center gap-2 rounded-xl border border-cyan-200/20 px-4 py-2.5 text-sm font-bold text-cyan-100"
          >
            <ClipboardList className="h-4 w-4" />
            <Bi t="learn.open.qbank" />
          </button>
        </section>
      </main>
    </DashboardLayout>
  );
}


