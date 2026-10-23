import React from "react";
import type { SummaryLanguageMode } from "@/lib/summary-language";

export default function SummaryLanguageMode({ mode, onChange }: { mode: SummaryLanguageMode; onChange: (mode: SummaryLanguageMode) => void }) {
  const options: Array<{ value: SummaryLanguageMode; label: string }> = [
    { value: "english", label: "English Only" },
    { value: "both", label: "English + Arabic Explanation" },
    { value: "arabic", label: "Arabic Study Mode" },
  ];
  return <div className="inline-flex max-w-full flex-wrap rounded-xl border border-white/10 bg-slate-950 p-1" role="group" aria-label="Language mode">
    {options.map(option => <button key={option.value} type="button" onClick={() => onChange(option.value)} aria-pressed={mode === option.value} className={`rounded-lg px-3 py-2 text-xs font-bold ${mode === option.value ? "bg-cyan-300 text-slate-950" : "text-slate-300"}`}>{option.label}</button>)}
  </div>;
}
