import { trpc } from "@/lib/trpc";

export default function ChapterCompletion({ family, chapterNumber }: { family: "FRCEM" | "HIPPO"; chapterNumber: number }) {
  const utils = trpc.useUtils();
  const progress = trpc.residentContent.studyProgress.useQuery({ family });
  const completed = Boolean(progress.data?.find(row => row.chapterNumber === chapterNumber)?.completed);
  const save = trpc.residentContent.saveStudyProgress.useMutation({ onSuccess: async () => {
    await Promise.all([utils.residentContent.studyProgress.invalidate(), utils.studyPlan.current.invalidate()]);
  } });
  return <div dir="rtl" className="mt-4"><button type="button" disabled={!progress.data || save.isPending} aria-pressed={completed} onClick={() => save.mutate({ family, chapterNumber, completed: !completed })} className="rounded-xl bg-cyan-500 px-4 py-3 font-bold text-slate-950 disabled:opacity-50">{save.isPending ? "جارٍ الحفظ…" : completed ? "✓ تم الفهم والاجتياز — تراجع" : "فهمت هذه النقطة ✓"}</button>
    <p className="mt-1 text-xs text-slate-400">يُحتسب ضمن إنجازك في مسار مقيمي الإسعاف والطوارئ.</p>
    {(save.isError || progress.isError) && <p role="alert">تعذر حفظ أو تحميل الإنجاز. <button onClick={() => void progress.refetch()}>إعادة المحاولة</button></p>}</div>;
}
