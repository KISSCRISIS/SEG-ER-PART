import Bi from "@/components/Bi";
import DashboardLayout from "@/components/DashboardLayout";
import { STUDY_BOOKS } from "@/lib/study-books";
import { trpc } from "@/lib/trpc";
import ChapterCompletion from "@/components/ChapterCompletion";
import {
  ArrowLeft,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
  Search,
  Save,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";

export default function StudyBookReaderPage({ bookId }: { bookId: string }) {
  const user = trpc.auth.me.useQuery();
  if (!user.data) return <p role="status">Loading reader…</p>;
  // Custom imported PDFs from the local PDF library.
  if (bookId === "imported") {
    const pdfParam = new URLSearchParams(window.location.search).get("pdf");
    const pdfId = typeof pdfParam === "string" ? pdfParam : null;
    if (!pdfId) {
      return (
        <DashboardLayout>
          <main className="mx-auto max-w-5xl text-slate-100">
            <header className="rounded-2xl border border-cyan-200/15 bg-slate-900/70 p-6">
              <Link href="/learn/pdf" className="text-sm text-cyan-200 underline">← <Bi t="pdf.back" /></Link>
              <h1 className="mt-3 text-2xl font-black"><Bi t="study.title" /></h1>
            </header>
          </main>
        </DashboardLayout>
      );
    }
    return (
      <DashboardLayout>
        <main className="mx-auto max-w-5xl text-slate-100">
          <HeaderPdfView pdfId={pdfId} title="Imported Personal PDF" />
        </main>
      </DashboardLayout>
    );
  }
  return <UserBookReader key={`${user.data.id}:${bookId}`} bookId={bookId} userId={user.data.id} />;
}

function UserBookReader({ bookId, userId }: { bookId: string; userId: number }) {
  const [, navigate] = useLocation();
  const book = STUDY_BOOKS.find(item => item.id === bookId) ?? STUDY_BOOKS[0];
  const storageKey = `seg-study-book-${userId}-${book.id}`;
  const chapterId = new URLSearchParams(window.location.search).get("chapter");
  const matched = /^(frcem|hippo)-(\d+)$/.exec(chapterId ?? "");
  const family = matched?.[1] === "hippo" ? "HIPPO" : "FRCEM";
  const chapterNumber = Number(matched?.[2] ?? 1);
  const validContext = !!matched && chapterNumber >= 1 && chapterNumber <= 99 && book.id === `${matched[1]}-high-yield`;
  const chapter = trpc.residentContent.studyChapter.useQuery({ family, chapterNumber: validContext ? chapterNumber : 1 }, { enabled: validContext });
  const bookmarkKey = `${storageKey}-bookmarks`;
  const notesKey = `${storageKey}-notes`;
  const highlightKey = `${storageKey}-highlights`;
  const saved = Number(window.localStorage.getItem(storageKey) ?? 1);
  const parseStorage = <T,>(key: string, fallback: T): T => {
    try { const raw = window.localStorage.getItem(key); return raw ? JSON.parse(raw) as T : fallback; } catch { return fallback; }
  };
  const savedBookmarks = parseStorage<number[]>(bookmarkKey, []).filter(value => Number.isInteger(value) && value >= 1 && value <= book.pages);
  const savedNotes = parseStorage<Record<string, string>>(notesKey, {});
  const savedHighlights = parseStorage<number[]>(highlightKey, []).filter(value => Number.isInteger(value) && value >= 1 && value <= book.pages);
  const [page, setPage] = useState(
    Number.isFinite(saved) && saved >= 1 && saved <= book.pages ? saved : 1
  );
  const [zoom, setZoom] = useState("page-width");
  const [bookmarks, setBookmarks] = useState<number[]>(savedBookmarks);
  const [notes, setNotes] = useState<Record<string, string>>(savedNotes);
  const [highlights, setHighlights] = useState<number[]>(savedHighlights);
  const [noteDraft, setNoteDraft] = useState(savedNotes[String(page)] ?? "");
  useEffect(
    () => window.localStorage.setItem(storageKey, String(page)),
    [page, storageKey]
  );
  useEffect(() => { try { window.localStorage.setItem(`seg-last-learn-activity:${userId}`, JSON.stringify({ bookId: book.id, chapterId: validContext && chapter.data ? chapterId : undefined, page, updatedAt: Date.now() })); } catch { /* Position storage may be unavailable. */ } }, [book.id, page, userId, chapterId, validContext, chapter.data]);
  useEffect(() => setNoteDraft(notes[String(page)] ?? ""), [notes, page]);
  useEffect(
    () => window.localStorage.setItem(bookmarkKey, JSON.stringify(bookmarks)),
    [bookmarkKey, bookmarks]
  );
  useEffect(
    () => window.localStorage.setItem(notesKey, JSON.stringify(notes)),
    [notesKey, notes]
  );
  useEffect(() => window.localStorage.setItem(highlightKey, JSON.stringify(highlights)), [highlightKey, highlights]);
  const source = useMemo(
    () =>
      `${book.file}#page=${page}&zoom=${zoom}&view=FitH&toolbar=1&navpanes=1`,
    [book.file, page, zoom]
  );
  const go = (value: number) =>
    setPage(Math.min(book.pages, Math.max(1, value)));
  const bookmarked = bookmarks.includes(page);
  const highlighted = highlights.includes(page);
  const progressPercent = Math.round((page / book.pages) * 100);
  const toggleBookmark = () =>
    setBookmarks(previous =>
      previous.includes(page)
        ? previous.filter(value => value !== page)
        : [...previous, page].sort((a, b) => a - b)
    );
  const saveNote = () =>
    setNotes(previous => ({
      ...previous,
      [page]: noteDraft.trim(),
    }));
  return (
    <DashboardLayout>
      <main className="mx-auto max-w-[1500px] space-y-4 text-slate-100">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-cyan-200/15 bg-slate-900/80 p-3">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => navigate("/learn")}
              aria-label="Back to Learn"
              className="rounded-lg bg-white/5 p-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="min-w-0">
              <p className="truncate text-sm font-black">{book.title}</p>
              <p className="text-[10px] text-slate-400">
                {book.format} · {book.pages} pages · Last position saved locally
              </p>
              <div className="mt-2 flex items-center gap-2 text-[10px] text-cyan-200">
                <div className="h-1.5 w-32 overflow-hidden rounded-full bg-white/10" aria-label={`Reading progress ${progressPercent}%`}>
                  <div className="h-full rounded-full bg-cyan-400" style={{ width: `${progressPercent}%` }} />
                </div>
                <span>{progressPercent}% book position · not completion</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setHighlights(previous => previous.includes(page) ? previous.filter(value => value !== page) : [...previous, page].sort((a, b) => a - b))} aria-label="Highlight current page" className={`rounded-lg px-3 py-2 text-xs ${highlighted ? "bg-yellow-300 text-slate-950" : "bg-white/5"}`}>{highlighted ? "Highlighted" : "Highlight"}</button>
            <button
              onClick={toggleBookmark}
              className={`rounded-lg p-2 ${bookmarked ? "bg-amber-300 text-slate-950" : "bg-white/5"}`}
              title="Bookmark this page"
            >
              <Bookmark className="h-4 w-4" />
            </button>
            <a
              href={book.file}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 rounded-lg bg-white/5 px-3 py-2 text-xs"
            >
              <Maximize2 className="h-4 w-4" />
              Full screen
            </a>
            <a
              href={`${book.file}#page=${page}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-white/5 p-2"
              title="Open original PDF"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </header>
        <section className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-slate-900/70 p-3">
          <div className="flex items-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => go(page - 1)}
              className="rounded-lg bg-white/5 p-2 disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <label className="text-xs">
              Page{" "}
              <input
                aria-label="Current page"
                type="number"
                min={1}
                max={book.pages}
                value={page}
                onChange={event => go(Number(event.target.value))}
                className="mx-2 w-20 rounded-lg border border-white/10 bg-slate-950 px-2 py-1.5 text-center"
              />{" "}
              of {book.pages}
            </label>
            <button
              disabled={page >= book.pages}
              onClick={() => go(page + 1)}
              className="rounded-lg bg-white/5 p-2 disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-cyan-300" />
            <span className="text-[10px] text-slate-400">
              <Bi t="pdf.search.hint" />
            </span>
            <select
              aria-label="Reader zoom"
              value={zoom}
              onChange={event => setZoom(event.target.value)}
              className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-xs"
            >
              <option value="page-width"><Bi t="pdf.page.width" /></option>
              <option value="page-fit"><Bi t="pdf.page.fit" /></option>
              <option value="100">100%</option>
              <option value="125">125%</option>
              <option value="150">150%</option>
            </select>
          </div>
        </section>
        <section className="grid gap-4 xl:grid-cols-[1fr_320px]">
          <iframe
            key={source}
            title={`${book.title} reader`}
            src={source}
            className="h-[calc(100dvh-190px)] max-h-[calc(100dvh-190px)] min-h-[420px] w-full max-w-full overflow-auto rounded-2xl border border-white/10 bg-white md:min-h-[520px] xl:min-h-[620px]"
          />
          <aside className="space-y-4">
            {validContext && chapter.data && <section className="rounded-2xl border border-white/10 p-4"><h2>{chapter.data.chapterTitle}</h2><ChapterCompletion family={family} chapterNumber={chapterNumber} /></section>}
            <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <h2 className="text-sm font-black"><Bi t="pdf.bookmark" /></h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {bookmarks.length ? (
                  bookmarks.map(value => (
                    <button
                      key={value}
                      onClick={() => go(value)}
                      className={`rounded-lg px-3 py-2 text-xs ${value === page ? "bg-cyan-500 font-bold text-slate-950" : "bg-white/5"}`}
                    >
                      p. {value}
                    </button>
                  ))
                ) : (
                  <p className="text-xs text-slate-400"><Bi t="pdf.empty.bookmarks" /></p>
                )}
              </div>
            </section>
            <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"><h2 className="text-sm font-black"><Bi t="pdf.highlights" /></h2><div className="mt-3 flex flex-wrap gap-2">{highlights.length ? highlights.map(value => <button key={value} onClick={() => go(value)} className="rounded-lg bg-yellow-300/20 px-3 py-2 text-xs">p. {value}</button>) : <p className="text-xs text-slate-400"><Bi t="pdf.empty.highlights" /></p>}</div></section>
            <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <h2 className="text-sm font-black"><Bi t="pdf.note" /></h2>
              <textarea
                value={noteDraft}
                onChange={event => setNoteDraft(event.target.value)}
                rows={8}
                placeholder={`Note for page ${page}`}
                className="mt-3 w-full rounded-xl border border-white/10 bg-slate-950 p-3 text-sm"
              />
              <button
                onClick={saveNote}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 text-sm font-black text-slate-950"
              >
                <Save className="h-4 w-4" />
                <Bi t="pdf.save.note" />
              </button>
            </section>
          </aside>
        </section>
      </main>
    </DashboardLayout>
  );
}

/**
 * Reader for PDFs imported into the local workspace library.
 * The file itself is streamed by the authenticated
 * `/api/pdf-library/file/:pdfId` route; notes, bookmarks, and the reading
 * position are persisted by the `pdfLibrary` procedures in the local store.
 */
function HeaderPdfView({ pdfId, title }: { pdfId: string; title: string }) {
  const [page, setPage] = useState(1);
  const [noteDraft, setNoteDraft] = useState("");
  const [savedPages, setSavedPages] = useState<number[]>([]);
  const position = trpc.pdfLibrary.getPosition.useQuery({ pdfId });
  const saveBookmark = trpc.pdfLibrary.saveBookmark.useMutation();
  const saveNote = trpc.pdfLibrary.saveNote.useMutation();
  const summarize = trpc.pdfLibrary.summarize.useMutation();
  const notesQuery = trpc.pdfLibrary.notes.useQuery({ pdfId });
  const bookmarksQuery = trpc.pdfLibrary.bookmarks.useQuery({ pdfId });

  useEffect(() => {
    const stored = position.data?.page;
    if (typeof stored === "number" && stored >= 1) setPage(stored);
  }, [position.data?.page]);

  const fileUrl = useMemo(() => `/api/pdf-library/file/${encodeURIComponent(pdfId)}`, [pdfId]);

  const addBookmark = () => {
    saveBookmark.mutate(
      { pdfId, page },
      { onSuccess: () => {
        setSavedPages(prev => (prev.includes(page) ? prev : [...prev, page].sort((a, b) => a - b)));
        bookmarksQuery.refetch();
      } },
    );
  };

  const storeNote = () => {
    if (!noteDraft.trim()) return;
    saveNote.mutate({ pdfId, page, text: noteDraft.trim() }, { onSuccess: () => notesQuery.refetch() });
  };

  return (
    <main className="mx-auto max-w-6xl space-y-4 text-slate-100">
      <header className="rounded-2xl border border-cyan-200/15 bg-slate-900/70 p-5">
        <Link href="/learn/pdf" className="text-sm text-cyan-200 underline">← <Bi t="pdf.back" /></Link>
        <h1 className="mt-3 text-2xl font-black">{title}</h1>
        <p className="mt-1 text-xs text-slate-400">{pdfId}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setPage(prev => Math.max(1, prev - 1))}
            className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm">p. {page}</span>
          <button
            type="button"
            onClick={() => setPage(prev => prev + 1)}
            className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={addBookmark}
            className="flex items-center gap-2 rounded-lg bg-cyan-500/20 px-3 py-2 text-xs font-bold"
          >
            <Bookmark className="h-4 w-4" />
            <Bi t="pdf.bookmark" />
          </button>
          <button
            type="button"
            onClick={() => summarize.mutate({ pdfId })}
            className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold"
          >
            <Bi t="pdf.lib.title" />
          </button>
        </div>
      </header>

      <section className="grid gap-4 lg:grid-cols-[1fr_20rem]">
        <iframe
          title={title}
          src={fileUrl}
          className="h-[calc(100dvh-260px)] min-h-[520px] w-full rounded-2xl border border-white/10 bg-white"
        />
        <aside className="space-y-4">
          <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
            <h2 className="text-sm font-black"><Bi t="pdf.bookmark" /></h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {(bookmarksQuery.data?.pages ?? savedPages).length ? (
                (bookmarksQuery.data?.pages ?? savedPages).map(value => (
                  <button
                    key={value}
                    onClick={() => setPage(value)}
                    className={`rounded-lg px-3 py-2 text-xs ${value === page ? "bg-cyan-500 font-bold text-slate-950" : "bg-white/5"}`}
                  >
                    p. {value}
                  </button>
                ))
              ) : (
                <p className="text-xs text-slate-400"><Bi t="pdf.empty.bookmarks" /></p>
              )}
            </div>
          </section>
          <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
            <h2 className="text-sm font-black"><Bi t="pdf.note" /></h2>
            <textarea
              value={noteDraft}
              onChange={event => setNoteDraft(event.target.value)}
              rows={8}
              placeholder={`Note for page ${page}`}
              className="mt-3 w-full rounded-xl border border-white/10 bg-slate-950 p-3 text-sm"
            />
            <button
              onClick={storeNote}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 text-sm font-black text-slate-950"
            >
              <Save className="h-4 w-4" />
              <Bi t="pdf.save.note" />
            </button>
            <p className="mt-2 text-[10px] text-slate-500">Saved notes: {(notesQuery.data?.items ?? []).length || 0} note(s)</p>
            {Array.isArray(notesQuery.data?.items) && notesQuery.data.items.length > 0 && (
              <div className="mt-3 text-xs space-y-2">
                {notesQuery.data.items.map((n: any) => (
                  <div key={`${n.page}-${n.updatedAt}`} className="rounded-lg bg-white/5 px-3 py-2">
                    <span className="font-bold text-cyan-200">p. {n.page}</span>
                    <p className="text-slate-300 mt-1 whitespace-pre-wrap">{n.text}</p>
                    <p className="text-[10px] text-slate-500">{n.updatedAt ? new Date(n.updatedAt).toLocaleString() : ""}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
          <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
            <button
              type="button"
              disabled={summarize.isPending}
              onClick={() => summarize.mutate({ pdfId })}
              className="w-full rounded-xl bg-cyan-500 px-4 py-2.5 font-bold text-slate-950 disabled:opacity-40"
            >
              <Bi t="pdf.summary" /> ({summarize.data?.pageCount ?? 0})
            </button>
          </section>
          {summarize.data ? (
            <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-xs">
              <p className="font-bold text-cyan-300">Summary ({summarize.data.pageCount} pages)</p>
              <p className="mt-1 whitespace-pre-wrap leading-relaxed text-slate-300">{summarize.data.summaryText}</p>
              {typeof summarize.data.pagesExtracted === "number" && typeof summarize.data.isImageOnlyDetected === "boolean" && (
                <p className="mt-2 text-[10px] text-slate-500">
                  Is image-only pages: {summarize.data.isImageOnlyDetected ? "yes" : "no"} · Extracted page range: {Array.isArray(summarize.data.pagesExtracted) ? summarize.data.pagesExtracted.join(", ") : String(summarize.data.pagesExtracted)}
                </p>
              )}
            </section>
          ) : null}
          {summarize.error ? <p className="text-xs text-rose-300">{summarize.error.message}</p> : null}
        </aside>
      </section>
    </main>
  );
}
