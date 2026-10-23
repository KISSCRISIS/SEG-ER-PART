import React, { useMemo, useState } from "react";
import { Database, ShieldCheck } from "lucide-react";
import LaboratoryCard, { type LaboratoryDemoTest } from "./LaboratoryCard";
import LaboratorySearch from "./LaboratorySearch";
import TestDetails from "./TestDetails";

const DEMO_DATA_ONLY_TESTS: LaboratoryDemoTest[] = [
  {
    id: "DEMO-001",
    label: "DEMO TEST ALPHA",
    category: "Demo Category One",
    summary:
      "Generic placeholder for validating card, search, and detail layouts.",
    keywords: ["placeholder", "layout", "alpha"],
    status: "DEMO_DATA_ONLY",
  },
  {
    id: "DEMO-002",
    label: "DEMO TEST BETA",
    category: "Demo Category One",
    summary:
      "Generic placeholder for validating category filtering and responsive states.",
    keywords: ["placeholder", "responsive", "beta"],
    status: "DEMO_DATA_ONLY",
  },
  {
    id: "DEMO-003",
    label: "DEMO TEST GAMMA",
    category: "Demo Category Two",
    summary:
      "Generic placeholder for validating a future governed detail adapter.",
    keywords: ["placeholder", "adapter", "gamma"],
    status: "DEMO_DATA_ONLY",
  },
];

const DEMO_CATEGORIES = Array.from(
  new Set(DEMO_DATA_ONLY_TESTS.map(test => test.category))
);

export default function LaboratoryDashboard() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedTestId, setSelectedTestId] = useState(
    DEMO_DATA_ONLY_TESTS[0]?.id ?? ""
  );

  const filteredTests = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return DEMO_DATA_ONLY_TESTS.filter(test => {
      const matchesCategory =
        selectedCategory === "ALL" || test.category === selectedCategory;
      const searchableText = [
        test.label,
        test.category,
        test.summary,
        ...test.keywords,
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery =
        !normalizedQuery || searchableText.includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [query, selectedCategory]);

  const selectedTest =
    filteredTests.find(test => test.id === selectedTestId) ?? null;

  return (
    <div className="space-y-5">
      <section
        className="seg-glass rounded-2xl p-5 sm:p-6"
        aria-labelledby="laboratory-foundation-title"
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="seg-kicker">Laboratory reference foundation</div>
            <h1
              id="laboratory-foundation-title"
              className="mt-4 text-3xl font-bold tracking-[-.055em] text-white sm:text-4xl"
            >
              Laboratory Guide
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              A reversible interface foundation for a future governed Laboratory
              Dataset inside the existing SEG architecture.
            </p>
          </div>
          <div
            className="flex shrink-0 items-center gap-2 rounded-xl border border-amber-200/25 bg-amber-300/[.07] px-3 py-2 text-[10px] font-bold uppercase tracking-[.08em] text-amber-100"
            role="status"
          >
            <Database className="h-4 w-4" aria-hidden="true" />
            DEMO_DATA_ONLY
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-cyan-200/[.13] bg-cyan-300/[.045] p-3">
            <p className="text-[10px] font-bold uppercase tracking-[.11em] text-cyan-200">
              Current source
            </p>
            <p className="mt-2 text-sm font-semibold text-white">
              No approved dataset
            </p>
          </div>
          <div className="rounded-xl border border-cyan-200/[.13] bg-cyan-300/[.045] p-3">
            <p className="text-[10px] font-bold uppercase tracking-[.11em] text-cyan-200">
              Demo inventory
            </p>
            <p className="mt-2 text-sm font-semibold text-white">
              {DEMO_DATA_ONLY_TESTS.length} placeholders
            </p>
          </div>
          <div className="rounded-xl border border-cyan-200/[.13] bg-cyan-300/[.045] p-3">
            <p className="text-[10px] font-bold uppercase tracking-[.11em] text-cyan-200">
              Clinical status
            </p>
            <p className="mt-2 text-sm font-semibold text-white">
              Not available
            </p>
          </div>
        </div>
      </section>

      <LaboratorySearch
        tests={filteredTests}
        categories={DEMO_CATEGORIES}
        query={query}
        selectedCategory={selectedCategory}
        onQueryChange={setQuery}
        onCategoryChange={setSelectedCategory}
      />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.3fr)_minmax(20rem,.7fr)]">
        <section
          className="seg-reference-card rounded-2xl p-4 sm:p-5"
          aria-labelledby="laboratory-demo-list-title"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.13em] text-cyan-200">
                Foundation inventory
              </p>
              <h2
                id="laboratory-demo-list-title"
                className="mt-1 text-xl font-semibold text-white"
              >
                Demo items
              </h2>
            </div>
            <p className="text-[10px] text-slate-500">
              No medical content connected
            </p>
          </div>
          {filteredTests.length ? (
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {filteredTests.map(test => (
                <LaboratoryCard
                  key={test.id}
                  test={test}
                  selected={test.id === selectedTestId}
                  onSelect={nextTest => setSelectedTestId(nextTest.id)}
                />
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-xl border border-dashed border-cyan-200/20 bg-white/[.025] p-8 text-center">
              <p className="text-sm font-semibold text-white">
                No demo items match this filter.
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-400">
                Clear the search or choose another demo category. This empty
                state does not request or invent medical data.
              </p>
            </div>
          )}
        </section>

        <div className="space-y-5">
          <TestDetails test={selectedTest} />
          <section
            className="rounded-2xl border border-cyan-200/[.14] bg-cyan-300/[.04] p-4"
            aria-label="Laboratory governance notice"
          >
            <div className="flex items-start gap-3">
              <ShieldCheck
                className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200"
                aria-hidden="true"
              />
              <p className="text-xs leading-5 text-slate-300">
                Future Laboratory records require a source, version, rights
                evidence, clinical review, approval, and audit trail before they
                can replace these placeholders.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export { DEMO_DATA_ONLY_TESTS };
