import { useState } from "react";
import { isCalendarDate, studyWeek } from "@shared/study-calendar";
import { trpc } from "@/lib/trpc";
import { buildStudyPlan, type StudyPlanId } from "@shared/study-plan-engine";

const plans: StudyPlanId[] = ["residency-year-1", "residency-year-2", "residency-year-3", "residency-year-4", "jordan-board-part-1", "jordan-board-part-2"];
export default function StudyPlanSettings() {
  const current = trpc.studyPlan.current.useQuery();
  const utils = trpc.useUtils();
  const today = trpc.studyPlan.today.useQuery(undefined, { enabled: Boolean(current.data), refetchInterval: 60000 });
  const date = today.data?.date ?? "";
  const completions = trpc.studyPlan.taskCompletions.useQuery({ date }, { enabled: Boolean(date) });
  const completeTask = trpc.studyPlan.completeTask.useMutation({ onSuccess: () => utils.studyPlan.taskCompletions.invalidate({ date }) });
  const save = trpc.studyPlan.save.useMutation({ onSuccess: async () => { await utils.studyPlan.current.invalidate(); await utils.studyPlan.today.invalidate(); } });
  const [draft, setDraft] = useState<{ planId: StudyPlanId; dailyHours: number; examDate: string; restDays: number[] } | null>(null);
  const settings = draft ?? { planId: (current.data?.planId ?? plans[0]) as StudyPlanId, dailyHours: current.data?.dailyHours ?? 2, examDate: current.data?.examDate ?? "", restDays: (current.data?.restDays ?? []) as number[] };
  const generated = current.data ? buildStudyPlan(current.data) : null;
  const validSavedDate = !current.data?.examDate || isCalendarDate(current.data.examDate);
  const week = date && current.data && validSavedDate ? studyWeek(date, current.data.dailyHours, current.data.restDays, current.data.examDate || undefined) : [];
  if (generated) {
    for (const task of generated.dailyTasks) {
      const target = task.kind === "learn" ? current.data?.nextReading : task.kind === "practice" || task.kind === "review" ? current.data?.nextPractice : undefined;
      if (target) { task.href = target.href; task.title = `${task.kind === "learn" ? "Read" : "Practice"}: ${target.title}`; }
    }
    generated.dailyTasks = today.data?.tasks ?? [];
  }
  return <section className="rounded-2xl border border-cyan-200/20 bg-slate-900 p-5">
    <h2 className="text-lg font-bold">Study plan settings</h2>
    {current.isLoading ? <p>Loading saved plan…</p> : <form className="mt-4 space-y-4" onSubmit={event => { event.preventDefault(); save.mutate(settings); }}>
      <div className="grid gap-3 sm:grid-cols-3">
        <label>Training plan<select className="block w-full rounded bg-slate-800 p-2" value={settings.planId} onChange={e => setDraft({ ...settings, planId: e.target.value as StudyPlanId })}>{plans.map(id => <option key={id} value={id}>{id.replaceAll("-", " ")}</option>)}</select></label>
        <label>Exam date<input className="block w-full rounded bg-slate-800 p-2" type="date" value={settings.examDate} onChange={e => setDraft({ ...settings, examDate: e.target.value })} /></label>
        <label>Daily hours<input className="block w-full rounded bg-slate-800 p-2" type="number" min="0.5" max="16" step="0.5" required value={settings.dailyHours} onChange={e => setDraft({ ...settings, dailyHours: Number(e.target.value) })} /></label>
      </div>
      <fieldset><legend>Rest days</legend><div className="flex flex-wrap gap-4">{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => <label key={day}><input type="checkbox" checked={settings.restDays.includes(index)} onChange={e => setDraft({ ...settings, restDays: e.target.checked ? [...settings.restDays, index] : settings.restDays.filter(d => d !== index) })} /> {day}</label>)}</div></fieldset>
      <button disabled={save.isPending || current.isError} className="rounded bg-cyan-600 px-4 py-2 disabled:opacity-50">{save.isPending ? "Saving…" : "Save plan"}</button>
      {(save.error || current.error) && <p role="alert">{save.error?.message ?? current.error?.message}</p>}
      {save.isSuccess && <p role="status">Plan saved.</p>}
    </form>}
    {generated && <div className="mt-4 space-y-2"><h3>Today's time allocation · {date}</h3>
      <p className="text-xs">Marking a task complete records your daily checklist, not clinical mastery.</p>
      {generated.dailyTasks.map(task => <div className="flex items-center gap-3 rounded bg-slate-800 p-2" key={task.id}>
        <input type="checkbox" aria-label={`Complete ${task.title}`} disabled={completeTask.isPending || completions.isLoading || completions.isError} checked={completions.data?.some(row => row.taskId === task.id && row.completed) ?? false} onChange={e => completeTask.mutate({ date, taskId: task.id, completed: e.target.checked })} />
        <a href={task.href}>{task.title} · {task.minutes} min</a>
      </div>)}
      {(completeTask.error || completions.error) && <p role="alert">{completeTask.error?.message ?? completions.error?.message}</p>}
      {today.isLoading && <p>Loading today's saved tasks…</p>}
      {today.error && <p role="alert">{today.error.message}</p>}
      {today.data && !generated.dailyTasks.length && <p>Rest day.</p>}<p className="text-xs text-slate-400">{generated.disclaimer}</p><p className="text-xs text-slate-400">Today's tasks stay fixed; schedule changes apply to future days. Dates use Amman time.</p></div>}
    {week.length > 0 && <div className="mt-5"><h3 className="font-bold">Next seven days · available study time</h3><ul className="mt-2 grid gap-2 sm:grid-cols-2">{week.map(day => <li key={day.date} className="rounded bg-slate-800 p-2">{day.date} · {day.examReached ? "Exam date reached" : day.rest ? "Rest day" : `${day.minutes} min`}</li>)}</ul><p className="mt-2 text-xs text-slate-400">Future content tasks are selected when each day starts, using your updated progress.</p></div>}
  </section>;
}
