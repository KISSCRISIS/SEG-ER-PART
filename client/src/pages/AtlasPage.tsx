import DashboardLayout from "@/components/DashboardLayout";
import { trpc } from "@/lib/trpc";
import { RESIDENT_PATHWAY_SECTIONS } from "@shared/resident-taxonomy";
import {
  BookOpen,
  ClipboardList,
  Eye,
  EyeOff,
  ImageOff,
  Images,
  NotebookPen,
  Search,
  ShieldAlert,
  ZoomIn,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useLocation, useSearch } from "wouter";
import Bi from "@/components/Bi";
import { biText } from "@/lib/seg-i18n";

export default function AtlasPage() {
  const [, navigate] = useLocation();
  const urlSearch = useSearch();
  const requestedSection = Number(
    new URLSearchParams(urlSearch).get("section")
  );
  const selectedSection = RESIDENT_PATHWAY_SECTIONS.find(
    ([id]) => id === requestedSection
  );
  const selectedSectionId = selectedSection?.[0];
  const stations = trpc.library.osceStations.useQuery({
    sectionId: selectedSectionId,
  });
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [diagnosisVisible, setDiagnosisVisible] = useState(false);
  const [notes, setNotes] = useState<Record<number, string>>(() => {
    try {
      const raw = window.localStorage.getItem("seg-atlas-notes");
      const parsed: unknown = raw ? JSON.parse(raw) : {};
      return typeof parsed === "object" && parsed !== null
        ? (parsed as Record<number, string>)
        : {};
    } catch {
      return {};
    }
  });
  const filtered = useMemo(() => {
    const value = search.trim().toLowerCase();
    return (stations.data ?? []).filter(item =>
      value
        ? `${item.title} ${item.sectionTitle} ${item.expectedImage}`
            .toLowerCase()
            .includes(value)
        : true
    );
  }, [stations.data, search]);
  const active = filtered.find(item => item.stationNumber === selected);
  const setSection = (sectionId?: number) => {
    setSelected(null);
    navigate(sectionId ? `/atlas?section=${sectionId}` : "/atlas");
  };
  const saveNote = (stationNumber: number, value: string) => {
    const next = { ...notes, [stationNumber]: value };
    setNotes(next);
    window.localStorage.setItem("seg-atlas-notes", JSON.stringify(next));
  };

  return (
    <DashboardLayout>
      <main className="mx-auto max-w-7xl space-y-5 text-slate-100">
        <header className="rounded-2xl border border-cyan-200/15 bg-slate-900/70 p-5">
          <div className="flex items-center gap-3">
            <Images className="text-cyan-300" />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                <Bi t="atlas.workspace" />
              </p>
              <h1 className="text-2xl font-black"><Bi t="atlas.title" /></h1>
            </div>
          </div>
          <div className="mt-4 flex gap-2 rounded-xl border border-amber-300/20 bg-amber-300/5 p-3 text-xs text-amber-100">
            <ShieldAlert className="h-4 w-4 shrink-0" />
            The OSCE station index was recovered, but its 14 referenced image
            files are absent from the supplied final ZIP. No substitute images
            were invented.
            <Bi t="atlas.notice" />
          </div>
          {selectedSection ? (
            <div className="mt-4 rounded-xl border border-cyan-200/15 bg-cyan-300/[.06] p-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-cyan-300">
                <Bi t="atlas.section.desc" />
              </p>
              <p className="mt-1 text-sm font-bold text-white">
                {selectedSection[0]}. {selectedSection[1]}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  href={`/learn?section=${selectedSection[0]}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-cyan-200/20 px-3 py-2 text-xs font-bold text-cyan-100"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  Learn
                </Link>
                <Link
                  href={`/practice/create?section=${selectedSection[0]}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-3 py-2 text-xs font-black text-slate-950"
                >
                  <ClipboardList className="h-3.5 w-3.5" />
                  Practice
                </Link>
                <Link
                  href={`/journal?section=${selectedSection[0]}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[.04] px-3 py-2 text-xs font-bold text-slate-100"
                >
                  <NotebookPen className="h-3.5 w-3.5" />
                  Journal
                </Link>
              </div>
            </div>
          ) : null}
        </header>
        <section className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/70 p-3">
          <Search className="h-4 w-4 text-cyan-300" />
          <input
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder={biText("atlas.search")}
            aria-label={biText("atlas.search")}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-500"
          />
        </section>
        {stations.isLoading ? (
          <p
            role="status"
            className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-sm text-slate-300"
          >
            <Bi t="atlas.loading" />
          </p>
        ) : null}
        {!stations.isLoading && stations.isError ? (
          <div
            role="alert"
            className="flex flex-wrap items-center gap-3 rounded-2xl border border-rose-300/20 bg-rose-300/5 p-4 text-sm text-rose-100"
          >
            <span><Bi t="atlas.error" /></span>
            <button
              type="button"
              onClick={() => void stations.refetch()}
              className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold"
            >
              <Bi t="atlas.retry" />
            </button>
          </div>
        ) : null}
        <section className="flex gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/70 p-3">
          <button
            type="button"
            onClick={() => setSection()}
            className={`shrink-0 rounded-full border px-3 py-2 text-xs font-bold ${
              selectedSectionId
                ? "border-white/10 bg-white/[.03] text-slate-300"
                : "border-cyan-200/30 bg-cyan-300/10 text-cyan-100"
            }`}
          >
            <Bi t="atlas.all.assets" />
          </button>
          {RESIDENT_PATHWAY_SECTIONS.map(([id, title]) => (
            <button
              key={id}
              type="button"
              onClick={() => setSection(id)}
              className={`shrink-0 rounded-full border px-3 py-2 text-xs font-bold ${
                selectedSectionId === id
                  ? "border-cyan-200/30 bg-cyan-300/10 text-cyan-100"
                  : "border-white/10 bg-white/[.03] text-slate-300"
              }`}
            >
              {id}. {title}
            </button>
          ))}
        </section>
        <div className="grid gap-4 lg:grid-cols-[1fr_380px]">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {!stations.isLoading && !stations.isError && filtered.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-white/15 bg-slate-900/50 p-6 text-sm text-slate-400 sm:col-span-2 xl:col-span-3">
                No visual cases match this search or filter yet. Clear the
                search or choose another pathway section.
              </p>
            ) : null}
            {filtered.map(item => (
              <article
                key={item.stationNumber}
                className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"
              >
                <div className="grid aspect-video place-items-center rounded-xl border border-dashed border-white/15 bg-slate-950/70">
                  <ImageOff className="h-9 w-9 text-slate-500" />
                </div>
                <p className="mt-4 text-xs font-bold text-cyan-300">
                  OSCE Station {item.stationNumber} · Source page{" "}
                  {item.sourcePage}
                </p>
                <p className="mt-1 inline-flex rounded-full border border-cyan-200/15 bg-cyan-300/[.06] px-2.5 py-1 text-[10px] font-bold text-cyan-100">
                  S{item.sectionId} · {item.sectionTitle}
                </p>
                <h2 className="mt-2 font-bold">{item.title}</h2>
                <p className="mt-3 break-all text-[11px] text-slate-500">
                  Expected asset: {item.expectedImage}
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => {
                      setSelected(item.stationNumber);
                      setDiagnosisVisible(false);
                    }}
                    className="flex items-center gap-2 rounded-xl bg-cyan-500 px-3 py-2 text-xs font-black text-slate-950"
                  >
                    <ZoomIn className="h-4 w-4" />
                    Open
                  </button>
                  <span className="rounded-xl bg-amber-300/10 px-3 py-2 text-xs text-amber-200">
                    Awaiting original
                  </span>
                </div>
              </article>
            ))}
          </div>
          <aside className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
            {active ? (
              <>
                <p className="text-xs font-bold text-cyan-300">
                  Station {active.stationNumber}
                </p>
                <p className="mt-1 inline-flex rounded-full border border-cyan-200/15 bg-cyan-300/[.06] px-2.5 py-1 text-[10px] font-bold text-cyan-100">
                  S{active.sectionId} · {active.sectionTitle}
                </p>
                <h2 className="mt-2 text-xl font-black">{active.title}</h2>
                <div className="mt-4 grid aspect-video place-items-center rounded-xl border border-dashed border-white/15 bg-slate-950">
                  <ImageOff className="h-10 w-10 text-slate-500" />
                </div>
                <button
                  onClick={() => setDiagnosisVisible(value => !value)}
                  className="mt-4 flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-sm"
                >
                  {diagnosisVisible ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  {diagnosisVisible ? "Hide case label" : "Reveal case label"}
                </button>
                {diagnosisVisible ? (
                  <p className="mt-3 rounded-xl bg-cyan-300/5 p-3 text-sm">
                    {active.title}
                  </p>
                ) : null}
                <textarea
                  value={notes[active.stationNumber] ?? ""}
                  onChange={event =>
                    saveNote(active.stationNumber, event.target.value)
                  }
                  rows={7}
                  placeholder={biText("atlas.note.title")}
                  className="mt-4 w-full rounded-xl border border-white/10 bg-slate-950 p-3 text-sm"
                />
                <p className="mt-3 text-[11px] text-amber-200">
                  Provenance: recovered index only. Image source file missing,
                  PHI review pending after original recovery.
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <Link
                    href={`/learn?section=${active.sectionId}`}
                    className="rounded-lg border border-cyan-200/20 px-3 py-2 text-center text-xs font-bold text-cyan-100"
                  >
                    Learn
                  </Link>
                  <Link
                    href={`/practice/create?section=${active.sectionId}`}
                    className="rounded-lg bg-cyan-500 px-3 py-2 text-center text-xs font-black text-slate-950"
                  >
                    Practice
                  </Link>
                  <Link
                    href={`/journal?section=${active.sectionId}`}
                    className="rounded-lg border border-white/10 bg-white/[.04] px-3 py-2 text-center text-xs font-bold text-slate-100"
                  >
                    Journal
                  </Link>
                </div>
              </>
            ) : (
              <div className="grid min-h-96 place-items-center text-center text-sm text-slate-400">
                      <Bi t="atlas.no.cases" />
              </div>
            )}
          </aside>
        </div>
      </main>
    </DashboardLayout>
  );
}
