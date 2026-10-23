import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { LayoutGrid } from "lucide-react";
import {
  MEDICAL_SYSTEMS_INDEX_URL,
  mergeSystemCards,
  type MedicalSystemsIndex,
  type SummarySource,
} from "@/data/medical-systems";
import { trpc } from "@/lib/trpc";
import MedicalSystemCards, {
  type MedicalSystemCardProgress,
} from "./MedicalSystemCards";

const TRACK = "resident-emergency-medicine";
const CONTENT_TYPES: Record<SummarySource, string> = {
  rosh: "rosh-summary-chapter",
  tintinalli: "tintinalli-summary-chapter",
  rosen: "rosen-summary-chapter",
};

/**
 * "Browse by Medical System" section for the Learn page. Navigation only:
 * counts come from the generated index and progress from the existing
 * learning-progress store. No medical content is created here.
 */
export default function MedicalSystemsBrowser() {
  const [index, setIndex] = useState<MedicalSystemsIndex | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);

  const roshProgress = trpc.learningProgress.current.useQuery({
    track: TRACK,
    contentType: CONTENT_TYPES.rosh,
  });
  const tintinalliProgress = trpc.learningProgress.current.useQuery({
    track: TRACK,
    contentType: CONTENT_TYPES.tintinalli,
  });
  const rosenProgress = trpc.learningProgress.current.useQuery({
    track: TRACK,
    contentType: CONTENT_TYPES.rosen,
  });

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    fetch(MEDICAL_SYSTEMS_INDEX_URL, {
      signal: controller.signal,
      cache: "no-cache",
    })
      .then(async response => {
        if (!response.ok) throw new Error("System index unavailable");
        const data = (await response.json()) as MedicalSystemsIndex;
        if (data.schemaVersion !== 1 || !Array.isArray(data.systems)) {
          throw new Error("Invalid system index format");
        }
        if (!controller.signal.aborted) setIndex(data);
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [retry]);

  const systems = useMemo(
    () => (index ? mergeSystemCards(index) : []),
    [index]
  );

  const progress = useMemo(() => {
    if (!index) return undefined;
    const completedBySource: Record<SummarySource, Set<string>> = {
      rosh: new Set(roshProgress.data?.completedIds ?? []),
      tintinalli: new Set(tintinalliProgress.data?.completedIds ?? []),
      rosen: new Set(rosenProgress.data?.completedIds ?? []),
    };
    const result: Record<string, MedicalSystemCardProgress> = {};
    for (const entry of index.systems) {
      const completed = entry.topics.filter(topic =>
        completedBySource[topic.source].has(topic.id)
      ).length;
      result[entry.id] = { completed, total: entry.topicCount };
    }
    return result;
  }, [index, roshProgress.data, tintinalliProgress.data, rosenProgress.data]);

  return (
    <section
      aria-label="Browse by Medical System"
      className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <LayoutGrid className="h-5 w-5 text-cyan-300" />
          <div>
            <h2 className="font-black">Browse by Medical System</h2>
            <p className="mt-1 text-xs text-cyan-100/80" dir="rtl">
              تصفح المحتوى حسب الجهاز الطبي
            </p>
            <p className="text-xs text-slate-400">
              Explore the same study sources organized by body system.
            </p>
          </div>
        </div>
        <Link
          href="/learn/summaries"
          className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-bold text-slate-200 transition hover:border-cyan-300/50"
        >
          All summaries
        </Link>
      </div>
      <div className="mt-5">
        {loading ? (
          <p role="status" className="p-8 text-center text-sm text-slate-400">
            Loading medical systems…
          </p>
        ) : error || !index ? (
          <div
            role="alert"
            className="rounded-xl border border-amber-300/20 bg-amber-300/5 p-4 text-sm text-amber-100"
          >
            The system index could not be loaded. You can still browse every
            source directly.{" "}
            <button
              type="button"
              className="underline"
              onClick={() => setRetry(value => value + 1)}
            >
              Try again
            </button>{" "}
            <Link href="/learn/summaries" className="underline">
              Open summaries
            </Link>
          </div>
        ) : (
          <MedicalSystemCards systems={systems} progress={progress} />
        )}
      </div>
    </section>
  );
}
