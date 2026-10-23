import React from "react";
import { BookOpen, NotebookPen, Route } from "lucide-react";
import { Link } from "wouter";

/** Links a source-backed summary to existing SEG tools without asserting that those tools contain new source data. */
export default function SummaryLearningActions({
  readHref,
}: {
  readHref?: string;
}) {
  return (
    <nav aria-label="Learning tools" className="flex flex-wrap gap-2">
      {readHref && (
        <Link
          href={readHref}
          className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-300 px-3 py-2 text-xs font-black text-slate-950"
        >
          <BookOpen className="h-3.5 w-3.5" />
          Read
        </Link>
      )}
      <Link
        href="/journal"
        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[.04] px-3 py-2 text-xs font-bold text-slate-100"
      >
        <NotebookPen className="h-3.5 w-3.5" />
        Add Notes
      </Link>
      <Link
        href="/pathway"
        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[.04] px-3 py-2 text-xs font-bold text-slate-100"
      >
        <Route className="h-3.5 w-3.5" />
        Track Progress
      </Link>
    </nav>
  );
}
