import React, { useEffect, useMemo, useState } from "react";
import type { HighYieldMapChapter } from "@/lib/high-yield-chapter-map";
import { CheckCircle2, ChevronDown, ChevronRight, Circle } from "lucide-react";

export default function HighYieldChapterMap({
  chapters,
  activeTopicId,
  completedIds,
  onSelectTopic,
}: {
  chapters: HighYieldMapChapter[];
  activeTopicId?: string;
  completedIds?: ReadonlySet<string>;
  onSelectTopic: (sourceIndex: number) => void;
}) {
  const activeChapter = useMemo(
    () =>
      chapters.find(chapter =>
        chapter.topics.some(topic => topic.id === activeTopicId)
      ),
    [activeTopicId, chapters]
  );
  const [openChapterId, setOpenChapterId] = useState<string | null>(
    activeChapter?.id ?? chapters[0]?.id ?? null
  );

  useEffect(() => {
    if (activeChapter) setOpenChapterId(activeChapter.id);
  }, [activeChapter]);

  const topicCount = chapters.reduce(
    (total, chapter) => total + chapter.topics.length,
    0
  );
  return (
    <aside className="rounded-2xl border border-white/10 bg-slate-900/70 lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:overflow-hidden">
      <div className="border-b border-white/10 p-4">
        <p className="text-sm font-black text-cyan-200">Chapter Map</p>
        <p className="mt-1 text-xs text-slate-400">
          {chapters.length} chapters · {topicCount} topics
        </p>
      </div>
      <nav
        aria-label="Book chapter map"
        className="max-h-[65vh] space-y-2 overflow-y-auto p-3 lg:max-h-[calc(100vh-7rem)]"
      >
        {chapters.map(chapter => {
          const open = chapter.id === openChapterId;
          const completed = chapter.topics.filter(topic =>
            completedIds?.has(topic.id)
          ).length;
          return (
            <section
              key={chapter.id}
              className="overflow-hidden rounded-xl border border-white/10 bg-slate-950/45"
            >
              <button
                type="button"
                onClick={() => setOpenChapterId(open ? null : chapter.id)}
                aria-expanded={open}
                className="flex w-full items-start gap-2 p-3 text-start"
              >
                {open ? (
                  <ChevronDown className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                ) : (
                  <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                )}
                <span className="min-w-0 flex-1">
                  <strong className="block text-xs leading-5 text-slate-100">
                    {chapter.title}
                  </strong>
                  <span className="mt-1 block text-[10px] text-slate-500">
                    {chapter.topics.length} topics · {completed}/
                    {chapter.topics.length} complete
                  </span>
                </span>
              </button>
              {open && (
                <div className="space-y-1 border-t border-white/10 p-2">
                  {chapter.topics.map(topic => {
                    const done = completedIds?.has(topic.id) ?? false;
                    const active = topic.id === activeTopicId;
                    return (
                      <button
                        type="button"
                        key={topic.id}
                        onClick={() => onSelectTopic(topic.sourceIndex)}
                        aria-current={active ? "page" : undefined}
                        className={`flex w-full items-start gap-2 rounded-lg border p-2 text-start ${active ? "border-cyan-300/50 bg-cyan-300/10" : "border-transparent hover:bg-white/5"}`}
                      >
                        {done ? (
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300" />
                        ) : (
                          <Circle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-600" />
                        )}
                        <span className="min-w-0">
                          <span className="block text-xs font-semibold leading-5 text-slate-200">
                            {topic.title}
                          </span>
                          {topic.arabicTitle && (
                            <span
                              dir="rtl"
                              className="mt-0.5 block text-[11px] leading-5 text-slate-400"
                            >
                              {topic.arabicTitle}
                            </span>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </nav>
    </aside>
  );
}
