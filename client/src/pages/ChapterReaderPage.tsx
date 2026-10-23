import DashboardLayout from "@/components/DashboardLayout";
import ChapterCompletion from "@/components/ChapterCompletion";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useEffect } from "react";

export default function ChapterReaderPage({ chapterId }: { chapterId: string }) {
  const match = /^(frcem|hippo)-(\d+)$/.exec(chapterId);
  const family = match?.[1] === "hippo" ? "HIPPO" : "FRCEM";
  const chapterNumber = Number(match?.[2] ?? 1);
  const bookId = family === "HIPPO" ? "hippo-high-yield" : "frcem-high-yield";
  const user = trpc.auth.me.useQuery();
  const query = trpc.residentContent.studyChapter.useQuery({ family, chapterNumber }, { enabled: !!match && chapterNumber <= 99 });
  const chapter = query.data;
  useEffect(() => {
    if (!chapter || !user.data) return;
    try { const page = Number(localStorage.getItem(`seg-study-book-${user.data.id}-${bookId}`)); localStorage.setItem(`seg-last-learn-activity:${user.data.id}`, JSON.stringify({ bookId, chapterId, page: page > 0 ? page : undefined, updatedAt: Date.now() })); } catch { /* Completion is stored in the database independently. */ }
  }, [chapter, user.data, bookId, chapterId]);
  return <DashboardLayout><main className="mx-auto max-w-5xl space-y-5 text-slate-100">
    <Link href="/learn">← Learn</Link>
    {!match || chapterNumber > 99 ? <p>Chapter not found.</p> : query.isLoading ? <p role="status">Loading chapter…</p> : query.isError ? <button onClick={() => void query.refetch()}>Unable to load chapter. Retry</button> : !chapter ? <p>Chapter not found.</p> : <>
      <header className="rounded-2xl border border-cyan-200/15 bg-slate-900/80 p-6"><h1 className="text-2xl font-black">{chapter.chapterTitle}</h1><p>{family} · Chapter {chapterNumber} · {chapter.sectionTitle}</p></header>
      <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
        <div className="whitespace-pre-wrap text-sm leading-7" dir="auto">{chapter.bilingualStudyContent || "No chapter text available."}</div>
        <Link href={`/learn/books/${bookId}?chapter=${chapterId}`} className="mt-4 block text-cyan-200 underline">Open Source Reader</Link>
        <ChapterCompletion family={family} chapterNumber={chapterNumber} />
      </article>
    </>}
  </main></DashboardLayout>;
}
