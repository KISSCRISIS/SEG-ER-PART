import DashboardLayout from "@/components/DashboardLayout";
import { trpc } from "@/lib/trpc";
import {
  classifyResidentChapter,
  getResidentSection,
  RESIDENT_PATHWAY_SECTIONS,
} from "@shared/resident-taxonomy";
import {
  BookMarked,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Download,
  Edit3,
  LoaderCircle,
  Plus,
  Save,
  ShieldAlert,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import Bi from "@/components/Bi";
import { biText } from "@/lib/seg-i18n";
import { Link, useLocation, useSearch } from "wouter";

type Tab = "references" | "notes";
type LinkedType = "none" | "question" | "chapter" | "asset";

const emptyForm = {
  id: "",
  title: "",
  body: "",
  tags: "",
  folder: "General",
  linkedType: "none" as LinkedType,
  linkedId: "",
  bookmarked: false,
};

function inferNoteSection(note: {
  title: string;
  body: string;
  tags: unknown;
  folder: string;
}) {
  const tags = Array.isArray(note.tags) ? note.tags.join(" ") : "";
  const sectionId = classifyResidentChapter(
    `${note.title} ${note.body} ${tags} ${note.folder}`
  );
  return {
    sectionId,
    sectionTitle:
      getResidentSection(sectionId)?.[1] ?? "Emergency Medicine Foundations",
  };
}

export default function MedicalJournalPage() {
  const [, navigate] = useLocation();
  const urlSearch = useSearch();
  const [tab, setTab] = useState<Tab>("references");
  const [search, setSearch] = useState("");
  const [source, setSource] = useState("all");
  const [page, setPage] = useState(1);
  const [form, setForm] = useState(emptyForm);
  const [noteError, setNoteError] = useState<string | null>(null);
  const params = new URLSearchParams(urlSearch);
  const requestedSection = Number(params.get("section"));
  const selectedSection = RESIDENT_PATHWAY_SECTIONS.find(
    ([id]) => id === requestedSection
  );
  const selectedSectionId = selectedSection?.[0];
  const references = trpc.library.references.useQuery({
    search: search || undefined,
    source: source === "all" ? undefined : source,
    sectionId: selectedSectionId,
    page,
    pageSize: 12,
  });
  const notes = trpc.journalNotes.list.useQuery();
  const createNote = trpc.journalNotes.create.useMutation();
  const updateNote = trpc.journalNotes.update.useMutation();
  const deleteNote = trpc.journalNotes.delete.useMutation();
  const utils = trpc.useUtils();
  const pages = Math.max(1, Math.ceil((references.data?.total ?? 0) / 12));
  const filteredNotes = useMemo(() => {
    const value = search.trim().toLowerCase();
    return (notes.data ?? []).filter(note => {
      const noteSection = inferNoteSection(note);
      const matchesSection =
        !selectedSectionId || noteSection.sectionId === selectedSectionId;
      const matchesSearch = value
        ? `${note.title} ${note.body} ${JSON.stringify(note.tags)} ${note.folder}`
            .toLowerCase()
            .includes(value)
        : true;
      return matchesSection && matchesSearch;
    });
  }, [notes.data, search, selectedSectionId]);
  const setSection = (sectionId?: number) => {
    setPage(1);
    navigate(sectionId ? `/journal?section=${sectionId}` : "/journal");
  };
  const saveNote = async () => {
    setNoteError(null);
    const payload = {
      title: form.title.trim(),
      body: form.body.trim(),
      tags: form.tags
        .split(",")
        .map(tag => tag.trim())
        .filter(Boolean),
      folder: form.folder.trim() || "General",
      linkedType: form.linkedType,
      linkedId: form.linkedId.trim() || null,
      bookmarked: form.bookmarked,
    };
    if (!payload.title) {
      setNoteError("Title is required to save a note.");
      return;
    }
    if (payload.linkedType !== "none" && !payload.linkedId) {
      setNoteError("Linked item ID is required when a link type is selected.");
      return;
    }
    try {
      if (form.id) await updateNote.mutateAsync({ id: form.id, ...payload });
      else await createNote.mutateAsync(payload);
      setForm(emptyForm);
      await utils.journalNotes.list.invalidate();
    } catch {
      setNoteError("Unable to save this note. Please retry.");
    }
  };
  const exportNotes = () => {
    const blob = new Blob([JSON.stringify(notes.data ?? [], null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "jem-nexus-medical-journal-notes.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout>
      <main className="mx-auto max-w-7xl space-y-5 text-slate-100">
        <header className="rounded-2xl border border-cyan-200/15 bg-slate-900/70 p-5">
          <div className="flex items-center gap-3">
            <BookMarked className="text-cyan-300" />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                <Bi t="journal.workspace" />
              </p>
              <h1 className="text-2xl font-black"><Bi t="journal.title" /></h1>
            </div>
          </div>
          <div className="mt-4 flex gap-2 rounded-xl border border-amber-300/20 bg-amber-300/5 p-3 text-xs text-amber-100">
            <ShieldAlert className="h-4 w-4 shrink-0" />
            <Bi t="journal.notice" />
          </div>
          {selectedSection ? (
            <div className="mt-4 rounded-xl border border-cyan-200/15 bg-cyan-300/[.06] p-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-cyan-300">
                <Bi t="journal.section.desc" />
              </p>
              <p className="mt-1 text-sm font-bold text-white">
                {selectedSection[0]}. {selectedSection[1]}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  href={`/learn?section=${selectedSection[0]}`}
                  className="rounded-lg border border-cyan-200/20 px-3 py-2 text-xs font-bold text-cyan-100"
                >
                  <Bi t="journal.learn.section" />
                </Link>
                <Link
                  href={`/practice/create?section=${selectedSection[0]}`}
                  className="rounded-lg bg-cyan-500 px-3 py-2 text-xs font-black text-slate-950"
                >
                  <Bi t="journal.practice.section" />
                </Link>
              </div>
            </div>
          ) : null}
        </header>
        <section className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/70 p-3">
          {(["references", "notes"] as Tab[]).map(value => (
            <button
              key={value}
              onClick={() => setTab(value)}
              className={`rounded-xl px-4 py-2 text-sm font-bold capitalize ${tab === value ? "bg-cyan-500 text-slate-950" : "bg-white/5"}`}
            >
              {value}
            </button>
          ))}
          <input
            value={search}
            onChange={event => {
              setSearch(event.target.value);
              setPage(1);
            }}
            placeholder={biText("journal.search")}
            aria-label="Search references and notes"
            className="min-w-64 flex-1 rounded-xl border border-white/10 bg-slate-950 px-4 py-3"
          />
          {tab === "notes" ? (
            <button
              onClick={exportNotes}
              className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-3 text-sm"
            >
              <Download className="h-4 w-4" />
              <Bi t="journal.export" />
            </button>
          ) : (
            <select
              aria-label="Reference source"
              value={source}
              onChange={event => {
                setSource(event.target.value);
                setPage(1);
              }}
              className="rounded-xl border border-white/10 bg-slate-950 px-3 py-3"
            >
              <option value="all"><Bi t="journal.all.sources" /></option>
              {references.data?.sources.map(value => (
                <option key={value}>{value}</option>
              ))}
            </select>
          )}
        </section>
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
            <Bi t="journal.all" />
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
        {tab === "references" ? (
          <>
            {references.isLoading ? (
              <LoaderCircle
                role="status"
                aria-label="Loading references"
                className="animate-spin text-cyan-300"
              />
            ) : references.isError ? (
              <div
                role="alert"
                className="flex flex-wrap items-center gap-3 rounded-2xl border border-rose-300/20 bg-rose-300/5 p-4 text-sm text-rose-100"
              >
                <span><Bi t="journal.error.refs" /></span>
                <button
                  type="button"
                  onClick={() => void references.refetch()}
                  className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold"
                >
                  Retry
                </button>
              </div>
            ) : references.data && references.data.items.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/15 p-8 text-center text-sm text-slate-400">
                <Bi t="journal.no.refs" />
              </div>
            ) : (
              <div className="grid gap-4 lg:grid-cols-2">
                {references.data?.items.map(item => (
                  <article
                    key={item.id}
                    className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"
                  >
                    <p className="text-xs font-bold text-cyan-300">
                      {item.source} · <Bi t="journal.chapter" /> {item.chapterNumber}
                    </p>
                    <p className="mt-1 inline-flex rounded-full border border-cyan-200/15 bg-cyan-300/[.06] px-2.5 py-1 text-[10px] font-bold text-cyan-100">
                      S{item.sectionId} · {item.sectionTitle}
                    </p>
                    <h2 className="mt-2 text-lg font-black">{item.topic}</h2>
                    <p className="mt-1 text-xs text-slate-400">
                      {item.chapterTitle}
                    </p>
                    <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
                      {item.keyPoints.map((point, index) => (
                        <li
                          key={index}
                          className="rounded-lg bg-white/[.03] p-3"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                    {item.arabicMentorExplanation ? (
                      <p
                        dir="rtl"
                        className="mt-4 rounded-xl border border-cyan-300/10 bg-cyan-300/5 p-4 text-right text-sm leading-7"
                      >
                        {item.arabicMentorExplanation}
                      </p>
                    ) : null}
                    <button
                      onClick={() => {
                        setNoteError(null);
                        setTab("notes");
                        setForm({
                          ...emptyForm,
                          title: `Note: ${item.topic}`,
                          linkedType: "chapter",
                          linkedId: item.id,
                          tags: `${item.source}, ${item.chapterTitle}, S${item.sectionId}, ${item.sectionTitle}`,
                        });
                      }}
                      className="mt-4 flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-bold text-slate-950"
                    >
                      <Plus className="h-4 w-4" />
                      <Bi t="journal.add.note" />
                    </button>
                  </article>
                ))}
              </div>
            )}
            <footer
              aria-label="References pagination"
              className="flex items-center justify-between rounded-xl bg-slate-900/70 p-3 text-sm"
            >
              <button
                type="button"
                aria-label="Previous references page"
                disabled={page <= 1}
                onClick={() => setPage(value => value - 1)}
              >
                <ChevronLeft />
              </button>
              <span>
                {page} / {pages} · {references.data?.total ?? 0} <Bi t="journal.records" />
              </span>
              <button
                type="button"
                aria-label="Next references page"
                disabled={page >= pages}
                onClick={() => setPage(value => value + 1)}
              >
                <ChevronRight />
              </button>
            </footer>
          </>
        ) : (
          <section className="grid gap-5 lg:grid-cols-[380px_1fr]">
            <form
              onSubmit={event => {
                event.preventDefault();
                void saveNote();
              }}
              className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/70 p-5"
            >
              <h2 className="font-black">
                {form.id ? <Bi t="journal.edit.note" /> : <Bi t="journal.new.note" />}
              </h2>
              <input
                value={form.title}
                onChange={event =>
                  setForm({ ...form, title: event.target.value })
                }
                placeholder={biText("journal.title.placeholder")}
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2"
              />
              <textarea
                value={form.body}
                onChange={event =>
                  setForm({ ...form, body: event.target.value })
                }
                placeholder={biText("journal.note.placeholder")}
                rows={8}
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2"
              />
              <input
                value={form.tags}
                onChange={event =>
                  setForm({ ...form, tags: event.target.value })
                }
                placeholder={biText("journal.tags")}
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  value={form.folder}
                  onChange={event =>
                    setForm({ ...form, folder: event.target.value })
                  }
                  placeholder={biText("journal.folder")}
                  className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2"
                />
                <select
                  value={form.linkedType}
                  onChange={event =>
                    setForm({
                      ...form,
                      linkedType: event.target.value as LinkedType,
                    })
                  }
                  className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2"
                >
                  <option value="none"><Bi t="journal.linked.type.none" /></option>
                  <option value="question"><Bi t="journal.linked.type.question" /></option>
                  <option value="chapter"><Bi t="journal.linked.type.chapter" /></option>
                  <option value="asset"><Bi t="journal.linked.type.asset" /></option>
                </select>
              </div>
              <input
                value={form.linkedId}
                onChange={event =>
                  setForm({ ...form, linkedId: event.target.value })
                }
                placeholder={biText("journal.linked.id")}
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2"
              />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.bookmarked}
                  onChange={event =>
                    setForm({ ...form, bookmarked: event.target.checked })
                  }
                  className="accent-cyan-400"
                />
                Bookmark
              </label>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={createNote.isPending || updateNote.isPending}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 font-black text-slate-950 disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  <Bi t="journal.save" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setForm(emptyForm);
                    setNoteError(null);
                  }}
                  className="rounded-xl bg-white/5 px-4 py-3 text-sm"
                >
                  <Bi t="journal.reset" />
                </button>
              </div>
              {noteError ? (
                <p
                  role="alert"
                  className="rounded-xl border border-rose-300/20 bg-rose-300/5 p-3 text-sm text-rose-100"
                >
                  {noteError}
                </p>
              ) : null}
            </form>
            <div className="space-y-3">
              {notes.isLoading ? (
                <LoaderCircle
                  role="status"
                  aria-label="Loading notes"
                  className="animate-spin text-cyan-300"
                />
              ) : notes.isError ? (
                <div
                  role="alert"
                  className="flex flex-wrap items-center gap-3 rounded-2xl border border-rose-300/20 bg-rose-300/5 p-4 text-sm text-rose-100"
                >
                  <span><Bi t="journal.error.notes" /></span>
                  <button
                    type="button"
                    onClick={() => void notes.refetch()}
                    className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold"
                  >
                    Retry
                  </button>
                </div>
              ) : (notes.data ?? []).length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/15 p-8 text-center text-sm text-slate-400">
                  <Bi t="journal.no.notes" />
                </div>
              ) : filteredNotes.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/15 p-8 text-center text-sm text-slate-400">
                  <Bi t="journal.no.match.notes" />
                </div>
              ) : (
                filteredNotes.map(note => {
                  const noteSection = inferNoteSection(note);
                  return (
                    <article
                      key={note.id}
                      className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-xs text-cyan-300">{note.folder}</p>
                          <h2 className="mt-1 text-lg font-black">
                            {note.title}
                          </h2>
                          <p className="mt-2 inline-flex rounded-full border border-cyan-200/15 bg-cyan-300/[.06] px-2.5 py-1 text-[10px] font-bold text-cyan-100">
                            S{noteSection.sectionId} ·{" "}
                            {noteSection.sectionTitle}
                          </p>
                        </div>
                        {note.bookmarked ? (
                          <Bookmark className="text-amber-300" />
                        ) : null}
                      </div>
                      <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-300">
                        <Bi t="journal.no.body" />
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {((note.tags as string[]) ?? []).map(tag => (
                          <span
                            key={tag}
                            className="rounded-full bg-cyan-300/10 px-2 py-1 text-[11px] text-cyan-100"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Link
                          href={`/learn?section=${noteSection.sectionId}`}
                          className="rounded-lg border border-cyan-200/20 px-3 py-2 text-xs font-bold text-cyan-100"
                        >
                          <Bi t="journal.learn.short" />
                        </Link>
                        <Link
                          href={`/practice/create?section=${noteSection.sectionId}`}
                          className="rounded-lg bg-white/[.06] px-3 py-2 text-xs font-bold text-slate-100"
                        >
                          <Bi t="journal.practice.short" />
                        </Link>
                      </div>
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3 text-xs text-slate-400">
                        <span>
                          {note.linkedType !== "none"
                            ? `${note.linkedType}: ${note.linkedId ?? "unassigned"}`
                            : "Personal note"}{" "}
                          · <Bi t="journal.last.reviewed" /> {note.lastReviewedAt ? new Date(note.lastReviewedAt).toLocaleDateString() : biText("account.not.recorded")}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setNoteError(null);
                              setForm({
                                id: note.id,
                                title: note.title,
                                body: note.body,
                                tags: ((note.tags as string[]) ?? []).join(
                                  ", "
                                ),
                                folder: note.folder,
                                linkedType: note.linkedType,
                                linkedId: note.linkedId ?? "",
                                bookmarked: Boolean(note.bookmarked),
                              });
                            }}
                            className="rounded-lg bg-white/5 p-2"
                            title={biText("journal.edit")}
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={async () => {
                              setNoteError(null);
                              try {
                                await updateNote.mutateAsync({
                                  id: note.id,
                                  title: note.title,
                                  body: note.body,
                                  tags: (note.tags as string[]) ?? [],
                                  folder: note.folder,
                                  linkedType: note.linkedType,
                                  linkedId: note.linkedId,
                                  bookmarked: Boolean(note.bookmarked),
                                  markReviewed: true,
                                });
                                await utils.journalNotes.list.invalidate();
                              } catch {
                                setNoteError(
                                  "Unable to mark this note as reviewed. Please retry."
                                );
                              }
                            }}
                            className="rounded-lg bg-emerald-300/10 px-3 py-2 text-emerald-200"
                          >
                            Reviewed
                          </button>
                          <button
                            onClick={async () => {
                              if (
                                !window.confirm(
                                  biText("journal.confirm.delete")
                                )
                              )
                                return;
                              setNoteError(null);
                              try {
                                await deleteNote.mutateAsync({ id: note.id });
                                await utils.journalNotes.list.invalidate();
                              } catch {
                                setNoteError(
                                  "Unable to delete this note. Please retry."
                                );
                              }
                            }}
                            className="rounded-lg bg-rose-300/10 p-2 text-rose-200"
                            title={biText("journal.delete")}
                            aria-label={`Delete note ${note.title}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </section>
        )}
      </main>
    </DashboardLayout>
  );
}
