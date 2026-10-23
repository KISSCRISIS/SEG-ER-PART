import Bi from "@/components/Bi";
import DashboardLayout from "@/components/DashboardLayout";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Link, useSearch } from "wouter";

export default function RevisionToolsPage() {
  const tool = new URLSearchParams(useSearch()).get("tool");
  return <DashboardLayout><main className="mx-auto max-w-7xl space-y-5 text-slate-100">
    <header className="rounded-2xl border border-cyan-200/15 bg-slate-900/70 p-5">
      <Link href="/learn" className="text-sm text-cyan-200 underline">â† Back to Learn</Link>
      <h1 className="mt-4 text-2xl font-black"><Bi t="revision.title" /></h1>
      <p className="mt-2 text-sm text-slate-300" dir="rtl">Ø£Ø¯ÙˆØ§Øª Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„Ø³Ø±ÙŠØ¹Ø© ÙˆØªØ«Ø¨ÙŠØª Ø§Ù„Ù…Ø¹Ù„ÙˆÙ…Ø§Øª â€” Ø§Ø®ØªØ± Ø§Ù„Ø£Ø¯Ø§Ø© Ø§Ù„Ù…Ø·Ù„ÙˆØ¨Ø©.</p>
    </header>
    <section aria-label="Revision tools" className="grid gap-4 md:grid-cols-3">
      {[
        ["Flashcards", "Ø¨Ø·Ø§Ù‚Ø§Øª Ù„Ø§Ø³ØªØ±Ø¬Ø§Ø¹ Ø§Ù„Ù…Ø¹Ù„ÙˆÙ…Ø§Øª", "/learn/revision?tool=flashcards"],
        ["Exam Traps", "ØªÙ†Ø¨ÙŠÙ‡Ø§Øª Ù„Ù„Ø£Ø®Ø·Ø§Ø¡ Ø§Ù„Ø´Ø§Ø¦Ø¹Ø© ÙÙŠ Ø§Ù„Ø§Ø®ØªØ¨Ø§Ø±Ø§Øª", "/practice/exam-traps"],
        ["Topic Family Index", "ÙÙ‡Ø±Ø³ Ø¹Ø§Ø¦Ù„Ø§Øª Ø§Ù„Ù…ÙˆØ§Ø¶ÙŠØ¹ Ø§Ù„Ø·Ø¨ÙŠØ©", "/learn/revision?tool=topics"],
        ["Weakness Center", "Ù…Ø±ÙƒØ² Ø§ÙƒØªØ´Ø§Ù Ø§Ù„Ø£Ø®Ø·Ø§Ø¡ ÙˆØªØµÙ†ÙŠÙ Ù†Ù‚Ø§Ø· Ø§Ù„Ø¶Ø¹Ù ÙˆØ¥Ø¹Ø§Ø¯Ø© Ø§Ù„Ø§Ø®ØªØ¨Ø§Ø±", "/learn/weakness"],
      ].map(([title, description, href]) => <Link key={href} href={href} className="rounded-2xl border border-cyan-200/20 bg-slate-900/70 p-5 hover:border-cyan-300">
        <h2 className="font-black">{title}</h2><p className="mt-2 text-sm text-slate-300" dir="rtl">{description}</p><span className="mt-4 inline-block text-cyan-200">Open â†’</span>
      </Link>)}
    </section>
    {tool && <Link href="/learn/revision" className="inline-block text-sm text-cyan-200 underline">â† All revision tools</Link>}
    {tool === "flashcards" ? <Flashcards /> : tool === "topics" ? <Topics /> : tool ? <p>Choose a revision tool above.</p> : null}
  </main></DashboardLayout>;
}

function Flashcards() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const cards = trpc.library.flashcards.useQuery({ page, pageSize: 20, search: search.trim() || undefined });
  return <section className="space-y-4">
    <h2 className="text-xl font-black"><Bi t="revision.flashcards" /> {cards.data ? `Â· ${cards.data.total}` : ""}</h2>
    <input aria-label="Search flashcards" maxLength={120} value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search flashcardsâ€¦" className="w-full rounded-xl border border-white/10 bg-slate-900 p-3" />
    {cards.isLoading ? <p role="status">Loadingâ€¦</p> : cards.isError ? <button onClick={() => void cards.refetch()}>Unable to load cards. Retry</button> : <>
      <div className="grid gap-3 md:grid-cols-2">{cards.data?.items.map(card => <article key={card.cardId} className="rounded-xl border border-cyan-200/15 bg-slate-900/70 p-5">
        <p className="text-xs text-cyan-200">{card.source} Â· {card.sectionTitle}</p><h3 className="mt-3 font-bold">{card.question}</h3>
        <details className="mt-3"><summary className="cursor-pointer text-cyan-200">Ø¥Ø¸Ù‡Ø§Ø± Ø§Ù„Ø¥Ø¬Ø§Ø¨Ø©</summary><p className="mt-2 whitespace-pre-wrap text-sm leading-6" dir="auto">{card.answer}</p></details>
      </article>)}</div>
      {!cards.data?.total && <p><Bi t="revision.empty" /></p>}
      <nav aria-label="Flashcards pagination" className="flex flex-wrap gap-4">
        <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="rounded-lg bg-white/10 px-3 py-2 disabled:opacity-40"><Bi t="revision.prev" /></button>
        <span className="py-2">Page {page} / {Math.max(1, Math.ceil((cards.data?.total ?? 0) / 20))}</span>
        <button disabled={page * 20 >= (cards.data?.total ?? 0)} onClick={() => setPage(p => p + 1)} className="rounded-lg bg-white/10 px-3 py-2 disabled:opacity-40"><Bi t="revision.next" /></button>
      </nav>
    </>}
  </section>;
}

function Topics() {
  const topics = trpc.library.topicFamilies.useQuery();
  return <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
    <h2 className="text-xl font-black"><Bi t="revision.topics" /></h2>
    {topics.isLoading ? <p role="status">Loadingâ€¦</p> : topics.isError ? <button onClick={() => void topics.refetch()}>Unable to load topics. Retry</button> : <div className="mt-4 flex flex-wrap gap-3">{topics.data?.length ? topics.data.map(item => <span key={item.family} className="rounded-xl border border-cyan-200/10 bg-cyan-300/5 px-3 py-2 text-sm">{item.family} Â· {item.count}</span>) : <p>No topics available.</p>}</div>}
  </section>;
}


