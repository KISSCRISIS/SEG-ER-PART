import { useEffect, useState } from "react";
import { BookOpen, Route, ShieldAlert, Star, Table } from "lucide-react";
import type { SummarySource } from "@/data/medical-systems";

interface LayerTable {
  title?: string;
  headers: string[];
  rows: string[][];
}

interface LayerEnhancement {
  id: string;
  topic: string;
  medicalSystem: string;
  algorithm: { title: string; steps: string[] };
  examPearls: string[];
  tables: LayerTable[];
  references: string[];
}

interface EnhancementsIndex {
  schemaVersion: number;
  origin: string;
  status: string;
  enhancements: LayerEnhancement[];
  byUnitId: Record<string, string[]>;
}

const INDEX_URL = "/content/global-enhancements-index.json";

let cachedIndex: Promise<EnhancementsIndex | null> | null = null;

function loadIndex(): Promise<EnhancementsIndex | null> {
  if (!cachedIndex) {
    cachedIndex = fetch(INDEX_URL, { cache: "no-cache" })
      .then(async response => {
        if (!response.ok) throw new Error("Enhancement index unavailable");
        const data = (await response.json()) as EnhancementsIndex;
        if (data.schemaVersion !== 1 || !Array.isArray(data.enhancements)) {
          throw new Error("Invalid enhancement index format");
        }
        return data;
      })
      .catch(() => null);
  }
  return cachedIndex;
}

/**
 * Global study-enhancement layer for one Learn topic: the existing full
 * explanation stays untouched while Algorithm, Exam Pearls, and Tables
 * appear as additional study cards. Renders nothing when the current topic
 * has no mapped enhancement.
 */
export default function TopicEnhancements({
  source,
  unitId,
}: {
  source: SummarySource;
  unitId: string;
}) {
  const [items, setItems] = useState<LayerEnhancement[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadIndex().then(data => {
      if (cancelled || !data) return;
      const ids = data.byUnitId[`${source}:${unitId}`] ?? [];
      const byId = new Map(data.enhancements.map(item => [item.id, item]));
      setItems(
        ids.flatMap(id => {
          const item = byId.get(id);
          return item ? [item] : [];
        })
      );
    });
    return () => {
      cancelled = true;
    };
  }, [source, unitId]);

  if (!items || items.length === 0) return null;

  return (
    <section
      aria-label="Study enhancements"
      className="space-y-4 rounded-2xl border border-cyan-200/20 bg-gradient-to-br from-cyan-400/10 to-blue-500/5 p-5"
    >
      <div className="flex items-start gap-2">
        <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
        <div>
          <h2 className="text-sm font-black text-cyan-200">
            Study Enhancements · Global Learning Layer
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Linked study aids from the SEG Emergency Medicine Master Library.
            They complement — never replace — the source explanation above.
          </p>
        </div>
      </div>
      {items.map(item => (
        <article
          key={item.id}
          className="space-y-3 rounded-xl border border-white/10 bg-slate-950/50 p-4"
        >
          <h3 className="font-black text-slate-100">{item.topic}</h3>
          <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-900/70">
            <h4 className="flex items-center gap-2 border-b border-white/10 bg-white/[.03] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-cyan-200">
              <Route className="h-3.5 w-3.5" /> Algorithm
            </h4>
            <ol className="list-decimal space-y-1.5 p-4 ps-9 text-sm leading-7 text-slate-200">
              {item.algorithm.steps.map(step => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
          <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-900/70">
            <h4 className="flex items-center gap-2 border-b border-white/10 bg-white/[.03] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-amber-200">
              <Star className="h-3.5 w-3.5" /> Exam Pearls
            </h4>
            <ul className="list-disc space-y-1.5 p-4 ps-9 text-sm leading-7 text-slate-200">
              {item.examPearls.map(pearl => (
                <li key={pearl}>{pearl}</li>
              ))}
            </ul>
          </div>
          {item.tables.map(table => (
            <div
              key={table.title ?? table.headers.join("|")}
              className="overflow-hidden rounded-xl border border-white/10 bg-slate-900/70"
            >
              <h4 className="flex items-center gap-2 border-b border-white/10 bg-white/[.03] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-emerald-200">
                <Table className="h-3.5 w-3.5" />{" "}
                {table.title ?? "Tables"}
              </h4>
              <div className="overflow-x-auto p-4">
                <table className="w-full min-w-80 border-collapse text-sm">
                  <thead>
                    <tr>
                      {table.headers.map(header => (
                        <th
                          key={header}
                          className="border border-white/10 bg-white/5 px-3 py-2 text-start text-xs font-black text-cyan-100"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map(row => (
                      <tr key={row.join("|")}>
                        {row.map((cell, cellIndex) => (
                          <td
                            key={`${cellIndex}-${cell}`}
                            className="border border-white/10 px-3 py-2 text-slate-200"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
          <p className="flex items-start gap-1.5 text-[11px] text-slate-500">
            <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            Under review study aid ({item.references[0]}). Verify against full
            guidelines and local protocols before clinical use.
          </p>
        </article>
      ))}
    </section>
  );
}
