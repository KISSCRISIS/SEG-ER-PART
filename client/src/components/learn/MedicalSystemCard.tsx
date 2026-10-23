import { Link } from "wouter";
import { BookOpenCheck, BookX } from "lucide-react";
import type {
  MedicalSystemCardData,
  SummarySource,
} from "@/data/medical-systems";
import MedicalSystemIcon from "./MedicalSystemIcon";

export interface MedicalSystemCardProgress {
  completed: number;
  total: number;
}

const SOURCE_LABEL: Record<SummarySource, string> = {
  rosh: "Rosh",
  tintinalli: "Tintinalli",
  rosen: "Rosen",
};

const ALL_SOURCES: SummarySource[] = ["tintinalli", "rosh", "rosen"];

/**
 * One system-first navigation card. Shows which books contain the system,
 * how many chapters/topics it holds, and the learner's progress.
 */
export default function MedicalSystemCard({
  system,
  progress,
}: {
  system: MedicalSystemCardData;
  progress?: MedicalSystemCardProgress;
}) {
  const percent =
    progress && progress.total > 0
      ? Math.round((progress.completed / progress.total) * 100)
      : 0;
  return (
    <article
      className={`flex min-h-64 flex-col rounded-2xl border bg-gradient-to-br p-5 ${system.accent}`}
    >
      <div className="flex items-center gap-3">
        <span className="rounded-xl bg-cyan-300/10 p-2.5">
          <MedicalSystemIcon
            name={system.icon}
            className="h-6 w-6 text-cyan-200"
          />
        </span>
        <h3 className="text-lg font-black">{system.title}</h3>
      </div>
      <ul aria-label={`${system.title} sources`} className="mt-3 space-y-1">
        {ALL_SOURCES.map(source => {
          const present = system.sources.includes(source);
          return (
            <li
              key={source}
              className={`flex items-center gap-1.5 text-[11px] ${present ? "text-slate-200" : "text-slate-600"}`}
            >
              {present ? (
                <BookOpenCheck className="h-3.5 w-3.5 text-emerald-300" />
              ) : (
                <BookX className="h-3.5 w-3.5" />
              )}
              {SOURCE_LABEL[source]}
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-xs text-slate-300">
        {system.sources.length}{" "}
        {system.sources.length === 1 ? "book" : "books"} ·{" "}
        {system.chapterCount} chapters · {system.topicCount} topics
      </p>
      <div className="mt-3">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>Progress</span>
          <span className="font-bold text-emerald-200">
            {progress ? `${progress.completed}/${progress.total}` : "—"} ·{" "}
            {percent}%
          </span>
        </div>
        <div
          className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${system.title} progress`}
        >
          <div
            className="h-full rounded-full bg-emerald-300 transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
      <Link
        href={system.route}
        className="mt-4 w-fit rounded-xl bg-cyan-300 px-4 py-2.5 text-sm font-black text-slate-950 transition hover:bg-cyan-200"
      >
        Open
      </Link>
    </article>
  );
}
