import { trpc } from "@/lib/trpc";

export default function TrapCompletionButton({ userId: _userId, trapId }: { userId: number; trapId: string }) {
  const utils = trpc.useUtils();
  const progress = trpc.revisionProgress.current.useQuery();
  const mutation = trpc.revisionProgress.set.useMutation({
    onSuccess: async () => { await utils.revisionProgress.current.invalidate(); },
  });
  const completed = progress.data?.completedIds.includes(trapId) ?? false;
  return <div className="mt-4" dir="rtl" lang="ar">
    <button type="button" aria-pressed={completed} disabled={!progress.data || mutation.isPending} onClick={() => mutation.mutate({ trapId, completed: !completed })} className={`w-full rounded-xl border px-4 py-3 text-sm font-bold disabled:opacity-50 ${completed ? "border-emerald-300/40 bg-emerald-300/15 text-emerald-200" : "border-cyan-200/30 bg-cyan-300/10 text-cyan-100"}`}>
      {mutation.isPending ? "جارٍ الحفظ…" : completed ? "✓ تم الفهم والاجتياز — تراجع" : "فهمت هذه النقطة ✓"}
    </button>
    <p className="mt-1 text-xs text-slate-400">يُحتسب ضمن إنجازك في مراجعة Exam Traps.</p>
    {(mutation.isError || progress.isError) && <p role="alert" className="mt-1 text-xs text-amber-200">تعذر حفظ أو تحميل الإنجاز. <button onClick={() => void progress.refetch()}>إعادة المحاولة</button></p>}
  </div>;
}
