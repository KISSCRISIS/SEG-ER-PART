import React from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { LaboratoryDemoTest } from "./LaboratoryCard";

type LaboratorySearchProps = {
  tests: LaboratoryDemoTest[];
  categories: string[];
  query: string;
  selectedCategory: string;
  onQueryChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
};

export default function LaboratorySearch({
  tests,
  categories,
  query,
  selectedCategory,
  onQueryChange,
  onCategoryChange,
}: LaboratorySearchProps) {
  const resultLabel = `${tests.length} ${tests.length === 1 ? "demo item" : "demo items"}`;

  return (
    <section
      className="seg-glass rounded-2xl p-4 sm:p-5"
      aria-labelledby="laboratory-search-title"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-cyan-200/20 bg-cyan-300/[.08] text-cyan-200">
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <h2
              id="laboratory-search-title"
              className="text-sm font-semibold text-white"
            >
              Search the foundation
            </h2>
            <p className="mt-0.5 text-[10px] text-slate-400">
              Local filtering of placeholders only
            </p>
          </div>
        </div>
        <p
          className="text-[10px] font-semibold uppercase tracking-[.1em] text-cyan-200"
          aria-live="polite"
        >
          {resultLabel}
        </p>
      </div>

      <label className="relative mt-4 block">
        <span className="sr-only">Search demo laboratory items</span>
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={event => onQueryChange(event.target.value)}
          placeholder="Search demo labels or keywords"
          className="seg-field pl-10 pr-10 text-sm"
          autoComplete="off"
        />
        {query ? (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            aria-label="Clear demo search"
            className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : null}
      </label>

      <div className="mt-4 flex flex-wrap gap-2" aria-label="Demo categories">
        <button
          type="button"
          onClick={() => onCategoryChange("ALL")}
          aria-pressed={selectedCategory === "ALL"}
          className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold transition-colors ${
            selectedCategory === "ALL"
              ? "border-cyan-200/60 bg-cyan-300/15 text-cyan-100"
              : "border-white/[.1] bg-white/[.03] text-slate-400 hover:border-cyan-200/30 hover:text-cyan-100"
          }`}
        >
          All demo items
        </button>
        {categories.map(category => (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            aria-pressed={selectedCategory === category}
            className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold transition-colors ${
              selectedCategory === category
                ? "border-cyan-200/60 bg-cyan-300/15 text-cyan-100"
                : "border-white/[.1] bg-white/[.03] text-slate-400 hover:border-cyan-200/30 hover:text-cyan-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}
