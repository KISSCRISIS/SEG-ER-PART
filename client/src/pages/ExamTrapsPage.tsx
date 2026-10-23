import DashboardLayout from "@/components/DashboardLayout";
import { trpc } from "@/lib/trpc";
import { Link, useSearch } from "wouter";
import { useState, useEffect } from "react";
import TrapCompletionButton from "@/components/TrapCompletionButton";
import RevisionProgressCard from "@/components/RevisionProgressCard";

export default function ExamTrapsPage() {
  const user = trpc.auth.me.useQuery();
  const query = useSearch();
  const [page, setPage] = useState(() => { const value = Number(new URLSearchParams(window.location.search).get("page")); return Number.isInteger(value) && value > 0 ? value : 1; });
  const traps = trpc.library.examTraps.useQuery({ page, pageSize: 50 });
  const total = traps.data?.total ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / 50));
  useEffect(() => { const requested = Number(new URLSearchParams(query).get("page")); setPage(Number.isInteger(requested) && requested > 0 ? requested : 1); }, [query]);
  useEffect(() => {
    if (traps.data && page > pageCount) setPage(pageCount);
    const id = window.location.hash.slice(1);
    if (traps.data && id) document.getElementById(id)?.scrollIntoView({ block: "center" });
  }, [traps.data, page, pageCount]);
  const controls = <nav aria-label="Exam traps pagination" className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 p-4">
    <button disabled={page === 1 || traps.isFetching} onClick={() => setPage(value => value - 1)} className="rounded-lg bg-white/10 px-3 py-2 disabled:opacity-40">Previous</button>
    {traps.data && <><span aria-live="polite">{total ? (page - 1) * 50 + 1 : 0}–{Math.min(page * 50, total)} / {total}</span><label>Page <select aria-label="Choose page" value={page} onChange={event => setPage(Number(event.target.value))} className="rounded bg-slate-900 p-2">{Array.from({ length: pageCount }, (_, index) => <option key={index} value={index + 1}>{index + 1}</option>)}</select></label></>}
    <button disabled={!traps.data || page >= pageCount || traps.isFetching} onClick={() => setPage(value => value + 1)} className="rounded-lg bg-white/10 px-3 py-2 disabled:opacity-40">Next</button>
    {traps.isFetching && <span role="status">Loading…</span>}
    {traps.isError && <button onClick={() => void traps.refetch()} role="alert">Unable to load. Retry</button>}
    <p className="w-full text-xs text-amber-100" dir="rtl">50 نقطة في كل صفحة؛ استخدم التالي أو رقم الصفحة للوصول لجميع النقاط.</p>
  </nav>;
  return <DashboardLayout><main className="mx-auto max-w-5xl space-y-5 text-slate-100"><header className="rounded-2xl border border-amber-200/20 bg-slate-900/80 p-6"><Link href="/learn" className="text-xs text-cyan-200 underline">← Back to Learn</Link><p className="mt-4 text-xs font-black uppercase tracking-widest text-amber-300">Revision Tools</p><h1 className="mt-2 text-2xl font-black">Exam Traps</h1><p className="mt-1 text-sm text-slate-300">{traps.data?.total ?? 0} high-yield warning points and common distractor pitfalls.</p></header><RevisionProgressCard />{controls}<section className="grid gap-3 md:grid-cols-2">{traps.data?.items.length ? traps.data.items.map(trap => <article id={trap.id} key={trap.id} className="rounded-2xl border border-amber-200/15 bg-slate-900/70 p-5"><div className="flex items-center justify-between gap-2"><span className="text-[10px] font-black uppercase tracking-widest text-amber-300">{trap.source}</span><span className="text-[10px] text-slate-500">S{trap.sectionId}</span></div><p className="mt-2 text-xs text-cyan-200">{trap.sectionTitle}</p><p className="mt-3 text-sm leading-6 text-slate-200">{trap.text}</p>{trap.arabicExplanation && <div lang="ar" dir="rtl" className="mt-4 rounded-xl border border-cyan-200/15 bg-cyan-300/5 p-3"><p className="text-sm leading-7 text-slate-200">{trap.arabicExplanation}</p></div>}{user.data && <TrapCompletionButton key={`${user.data.id}:${trap.id}`} userId={user.data.id} trapId={trap.id} />}</article>) : <div className="rounded-xl border border-dashed border-amber-200/20 p-5 text-sm text-amber-100">{traps.isLoading ? "Loading exam traps…" : traps.isError ? "Unable to load exam traps. Please retry." : "No exam traps are available for this view."}</div>}</section>{controls}</main></DashboardLayout>;
}
