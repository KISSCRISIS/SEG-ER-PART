import Bi from "@/components/Bi";
import DashboardLayout from "@/components/DashboardLayout";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Link } from "wouter";

export default function WeaknessCenterPage() {
  const [filterFamily, setFilterFamily] = useState<string>("all");
  const [filterChapter, setFilterChapter] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const list = trpc.weakness.list.useQuery({ family: filterFamily === "all" ? undefined : filterFamily, chapterNumber: filterChapter ? Number(filterChapter) || undefined : undefined, reviewStatus: filterStatus === "all" ? undefined : (filterStatus as any), search: search.trim() || undefined });
  const summary = trpc.weakness.summary.useQuery();
  const classify = trpc.weakness.classify.useMutation();
  const setStatus = trpc.weakness.setReviewStatus.useMutation();
  const retest = trpc.weakness.retest.useMutation();
  const classificationOptions = ["Knowledge Gap", "Sequence Error", "Guideline Conflict", "Contraindication", "Data Misinterpretation"];

  const toggleSelect = (id: string) => setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  return (
    <DashboardLayout>
      <main className="mx-auto max-w-6xl text-slate-100">
        <header className="rounded-2xl border border-cyan-200/15 bg-slate-900/70 p-6">
          <Link href="/learn/revision" className="text-sm text-cyan-200 underline">← Back to Revision</Link>
          <h1 className="mt-3 text-3xl font-black"><Bi t="weakness.title" /></h1>
          <p className="mt-2 text-sm text-slate-400">Detect repeated errors, classify gaps, retest selected items — works offline with AQRAB, IMPORTED, and all banks.</p>
        </header>

        <section className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
            <p className="text-xs text-cyan-300"><Bi t="weakness.total" /></p>
            <p className="mt-2 text-3xl font-black">{summary.data?.total ?? 0}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
            <p className="text-xs text-amber-300"><Bi t="weakness.repeated" /></p>
            <p className="mt-2 text-3xl font-black">{summary.data?.wrongOnly ?? 0}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
            <p className="text-xs text-rose-300">Weak topics (by family)</p>
            <p className="mt-2 text-3xl font-black">{(summary.data?.byFamily ?? []).length}</p>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-slate-900/70 p-5">
          <h2 className="text-lg font-black"><Bi t="weakness.filter" /></h2>
          <div className="mt-3 flex flex-wrap gap-3">
            <select value={filterFamily} onChange={e => { setFilterFamily(e.target.value); setSelectedIds([]); }} className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm">
              <option value="all"><Bi t="weakness.status.all" /></option>
              <option value="AQRAB">Aqrab — عقرب</option>
              <option value="IMPORTED"><Bi t="bank.IMPORTED" /></option>
              <option value="FRCEM">FRCEM</option>
              <option value="EDIC">EDIC</option>
              <option value="HIPPO">HIPPO</option>
            </select>
            <input value={filterChapter} onChange={e => { setFilterChapter(e.target.value); setSelectedIds([]); }} placeholder="Chapter number" className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm w-32" />
            <select value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setSelectedIds([]); }} className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm">
              <option value="all"><Bi t="weakness.status.all" /></option>
              <option value="unreviewed"><Bi t="weakness.status.unreviewed" /></option>
              <option value="reviewed"><Bi t="weakness.status.reviewed" /></option>
              <option value="mastery"><Bi t="weakness.status.mastery" /></option>
            </select>
            <input value={search} onChange={e => { setSearch(e.target.value); setSelectedIds([]); }} placeholder="Search question / chapter" maxLength={120} className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm w-72" />
            <button onClick={() => { setFilterFamily("all"); setFilterChapter(""); setFilterStatus("all"); setSearch(""); setSelectedIds([]); }} className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold"><Bi t="weakness.clear.selection" /></button>
          </div>

          <div className="mt-5 overflow-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-950 text-xs uppercase tracking-wider text-cyan-200">
                <tr>
                  <th className="px-3 py-2"><Bi t="weakness.select" /></th>
                  <th className="px-3 py-2"><Bi t="weakness.question" /></th>
                  <th className="px-3 py-2"><Bi t="weakness.bank" /></th>
                  <th className="px-3 py-2"><Bi t="weakness.chapter" /></th>
                  <th className="px-3 py-2"><Bi t="weakness.status" /></th>
                  <th className="px-3 py-2"><Bi t="weakness.classify" /></th>
                  <th className="px-3 py-2"><Bi t="weakness.notes" /></th>
                  <th className="px-3 py-2"><Bi t="weakness.action" /></th>
                </tr>
              </thead>
              <tbody>
                {(list.data?.items ?? []).map(item => (
                  <tr key={item.id + item.attemptedAt} className="border-t border-white/10 hover:bg-white/5">
                    <td className="px-3 py-2"><input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => toggleSelect(item.id)} aria-label={`Select ${item.id}`} /></td>
                    <td className="px-3 py-2 font-medium">{item.question?.slice(0, 120) ?? item.id}</td>
                    <td className="px-3 py-2 text-xs">{item.family}</td>
                    <td className="px-3 py-2 text-xs">{item.chapterNumber}</td>
                    <td className="px-3 py-2 text-xs">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase text-slate-400">{item.reviewStatus ?? "unreviewed"}</span>
                        <span className="text-[10px] text-slate-300">
                          wrong {item.wrongCount}/{item.attemptCount} · streak {item.correctStreak ?? 0}
                          {item.masteryEligible ? " · mastery-eligible" : ""}
                        </span>
                        <span className="text-[10px] text-slate-500">{(item.attempts ?? []).map((a: any, i: number) => `${i + 1}:${a.correct ? "✓" : "✗"}`).join(" ")}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <select value={item.classification ?? ""} onChange={e => classify.mutate({ questionId: item.id, classification: e.target.value || null })} className="rounded bg-slate-950 border border-white/10 px-2 py-1 text-xs" aria-label="Classify weakness">
                        <option value="">— select —</option>
                        {classificationOptions.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </td>
                    <td className="px-3 py-2 text-xs">{item.notes?.slice(0, 40) ?? ""}</td>
                    <td className="px-3 py-2 text-xs">
                      <button onClick={() => setStatus.mutate({ questionId: item.id, reviewStatus: item.reviewStatus === "mastery" ? "reviewed" : "mastery" })} className="rounded bg-cyan-500/20 px-2 py-1 text-xs font-bold">Mark {item.reviewStatus === "mastery" ? "Reviewed" : "Mastery"}</button>
                    </td>                  </tr>
                ))}
              </tbody>
            </table>
            {list.isLoading ? <p className="mt-3"><Bi t="weakness.loading" /></p> : list.isError ? <button onClick={() => list.refetch()}><Bi t="qbank.retry" /></button> : list.data?.items.length === 0 ? <p className="mt-3"><Bi t="weakness.empty" /></p> : null}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button onClick={() => retest.mutate({ questionIds: selectedIds })} disabled={selectedIds.length === 0} className="rounded-xl bg-cyan-500 px-5 py-3 font-black text-slate-950 disabled:opacity-40"><Bi t="weakness.retest" /> ({selectedIds.length})</button>
            <button onClick={() => { setSelectedIds([]); }} className="rounded-xl bg-white/10 px-4 py-3 text-sm font-bold"><Bi t="weakness.clear.selection" /></button>
          </div>
          {retest.data ? <p className="mt-3 text-sm text-cyan-200">Retest exam created with {retest.data.questionCount} question(s). Open Practice to resume it.</p> : null}
          {retest.error ? <p className="mt-3 text-sm text-rose-300">{retest.error.message}</p> : null}
          {setStatus.error ? <p className="mt-3 text-sm text-rose-300">{setStatus.error.message}</p> : null}
          {classify.error ? <p className="mt-3 text-sm text-rose-300">{classify.error.message}</p> : null}
        </section>
      </main>
    </DashboardLayout>
  );
}
