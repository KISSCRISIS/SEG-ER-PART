import Bi from "@/components/Bi";
import DashboardLayout from "@/components/DashboardLayout";
import {
  ORIGINAL_REFERENCE_BOOKS,
  coverForStudyBook,
} from "@/data/original-reference-books";
import { STUDY_BOOKS } from "@/lib/study-books";
import { Link } from "wouter";

/**
 * LEARN â†’ Original Reference Books.
 *
 * Readable cards keep their existing STUDY_BOOKS metadata, routes, and
 * progress behavior untouched. Covers from the Original Reference Books
 * registry are linked as assets only (hidden until the file lands).
 * Registered-but-pending sources (no PDF ingested yet) render as visible,
 * disabled cards â€” never as invented files.
 */
export default function OriginalBooksLibraryPage() {
  const pendingBooks = ORIGINAL_REFERENCE_BOOKS.filter(
    book => book.sourceStatus === "pending-ingest"
  );
  return <DashboardLayout><main className="mx-auto max-w-7xl space-y-5 text-slate-100">
    <header className="rounded-2xl border border-cyan-200/15 bg-slate-900/70 p-5">
      <Link href="/learn" className="text-sm text-cyan-200 underline">â† Back to Learn</Link>
      <h1 className="mt-4 text-2xl font-black"><Bi t="library.original" /></h1>
      <p className="mt-2 text-sm text-slate-300" dir="rtl">Ø§Ø®ØªØ± Ø§Ù„ÙƒØªØ§Ø¨ Ù„ÙØªØ­ Ø§Ù„Ù…Ø±Ø¬Ø¹ Ø§Ù„Ø£ØµÙ„ÙŠ ÙˆØ¨Ø¯Ø¡ Ø§Ù„Ù‚Ø±Ø§Ø¡Ø©.</p>
    </header>
    <section aria-label="Original books" className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {STUDY_BOOKS.map(book => {
        const cover = coverForStudyBook(book.id);
        return <article key={book.id} className={`flex flex-col rounded-2xl border border-white/10 bg-gradient-to-br ${book.accent} p-5`}>
          <p className="text-xs text-cyan-200"><Bi t="library.original.ref" /></p>
          {cover ? (
            <img
              src={cover.coverSrc}
              alt={`Cover: ${cover.title}`}
              loading="lazy"
              onError={event => {
                event.currentTarget.style.display = "none";
              }}
              className="mt-3 w-full rounded-xl border border-white/10 object-cover"
            />
          ) : null}
          <h2 className="mt-3 text-xl font-black">{book.title}</h2>
          <p className="mt-2 text-sm text-slate-300">{book.subtitle}</p>
          <p className="my-3 text-sm text-slate-400">{book.pages} <Bi t="library.pages" /></p>
          <Link href={`/learn/books/${book.id}`} className="mt-auto rounded-xl bg-cyan-500 px-4 py-3 text-center font-bold text-slate-950"><Bi t="library.open" /></Link>
        </article>;
      })}
      {pendingBooks.map(book => (
        <article key={book.id} className="flex flex-col rounded-2xl border border-dashed border-white/15 bg-slate-900/50 p-5">
          <p className="text-xs text-amber-200">{book.category}</p>
          <img
            src={book.coverSrc}
            alt={`Cover: ${book.title}`}
            loading="lazy"
            onError={event => {
              event.currentTarget.style.display = "none";
            }}
            className="mt-3 w-full rounded-xl border border-white/10 object-cover"
          />
          <h2 className="mt-3 text-xl font-black">{book.title}</h2>
          <p className="mt-2 text-sm text-slate-300">{book.family} Â· source <Bi t="library.pending.btn" /></p>
          <button disabled aria-disabled="true" title="Source PDF pending ingest" className="mt-auto cursor-not-allowed rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center font-bold text-slate-400">PDF pending ingest</button>
        </article>
      ))}
    </section>
  </main></DashboardLayout>;
}


