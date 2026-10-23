import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { useEffect, useRef } from "react";

export default function RevisionProgressCard() {
  const progress = trpc.revisionProgress.current.useQuery();
  const user = trpc.auth.me.useQuery();
  const utils = trpc.useUtils();
  const attempted = useRef<number | null>(null);
  const migrate = trpc.revisionProgress.importLocal.useMutation({ onSuccess: () => utils.revisionProgress.current.invalidate() });
  useEffect(() => {
    if (!user.data || !progress.data || attempted.current === user.data.id) return;
    attempted.current = user.data.id;
    try {
      const prefix = `seg:trap-understood:${user.data.id}:`;
      const recorded = new Set(progress.data.recordedIds);
      const ids = Object.keys(localStorage).filter(key => key.startsWith(prefix) && localStorage.getItem(key) === "true")
        .map(key => key.slice(prefix.length)).filter(id => !recorded.has(id));
      if (ids.length) migrate.mutate({ ids: ids.slice(0, 1000) });
    } catch { /* Existing browser storage may be unavailable; database progress still works. */ }
  }, [user.data, progress.data, migrate]);
  return <section dir="rtl" lang="ar" className="rounded-2xl border border-cyan-200/20 bg-slate-900/70 p-5 text-slate-100">
    <h2 className="font-bold">متطلبات المراجعة — Exam Traps</h2>
    {migrate.isError && <button onClick={() => migrate.reset()}>تعذر نقل علامات المتصفح القديمة. أعد فتح الصفحة للمحاولة مجددًا.</button>}
    {progress.isLoading ? <p role="status">جارٍ تحميل الإنجاز…</p> : progress.isError ? <button onClick={() => void progress.refetch()}>تعذر تحميل الإنجاز — إعادة المحاولة</button> : progress.data && <>
      <p className="mt-2" aria-live="polite">اجتزت {progress.data.completed} من {progress.data.total} · المتبقي {progress.data.remaining}</p>
      <progress className="mt-3 w-full" value={progress.data.completed} max={progress.data.total || 1} aria-label="إنجاز مراجعة الفخاخ" />
      <p>{progress.data.percentage}% · {progress.data.requirementCompleted ? "اكتمل متطلب مراجعة الفخاخ" : "متطلب المراجعة قيد الإنجاز"}</p>
      <p className="mt-2 text-xs text-slate-400">يُسجل إقرارك بالفهم كتقدم في المراجعة، بصورة مستقلة عن نتائج الاختبارات.</p>
      {progress.data.nextHref && <Link href={progress.data.nextHref} className="mt-3 inline-block rounded-lg bg-cyan-500 px-4 py-2 font-bold text-slate-950">استكمال النقاط المتبقية</Link>}
    </>}
  </section>;
}
