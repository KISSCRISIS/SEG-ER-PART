import Bi from "@/components/Bi";
import DashboardLayout from "@/components/DashboardLayout";
import QbankNav from "@/components/QbankNav";
import { trpc } from "@/lib/trpc";
import { RESIDENT_PATHWAY_SECTIONS } from "@shared/resident-taxonomy";
import {
  BarChart3,
  BookOpenCheck,
  FilePlus2,
  FolderClock,
  Play,
  Settings,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLocation, useSearch } from "wouter";

export type QbankView = "home" | "exams" | "performance" | "settings";

export default function QbankPortalPage({ view }: { view: QbankView }) {
  const [, navigate] = useLocation();
  const urlSearch = useSearch();
  const requestedSection = Number(
    new URLSearchParams(urlSearch).get("section")
  );
  const selectedSection = RESIDENT_PATHWAY_SECTIONS.find(
    ([id]) => id === requestedSection
  );
  const selectedSectionId = selectedSection?.[0];
  const summary = trpc.residentContent.practiceSummary.useQuery();
  const performance = trpc.residentContent.performanceSummary.useQuery();
  const examsQuery = trpc.qbank.exams.useQuery();
  const flashcards = trpc.library.flashcards.useQuery({
    sectionId: selectedSectionId,
    page: 1,
    pageSize: 3,
  });
  const traps = trpc.library.examTraps.useQuery({
    sectionId: selectedSectionId,
    page: 1,
    pageSize: 3,
  });
  const reviewQueue = trpc.library.recoveryReviewQueue.useQuery();
  const catalog = trpc.residentContent.questionCatalog.useQuery();
  const attempted = summary.data?.attempted ?? 0,
    correct = summary.data?.correct ?? 0,
    accuracy = attempted ? Math.round((correct / attempted) * 100) : 0;
  const overviewCards: {
    label: string;
    value: string | number;
    icon: LucideIcon;
  }[] = [
    { label: "Questions attempted", value: attempted, icon: BookOpenCheck },
    { label: "Correct answers", value: correct, icon: FolderClock },
    { label: "Overall accuracy", value: `${accuracy}%`, icon: BarChart3 },
  ];
  const savedExams = examsQuery.data ?? [];
  const homeLoading =
    summary.isLoading ||
    flashcards.isLoading ||
    traps.isLoading ||
    reviewQueue.isLoading;
  const homeError =
    summary.isError ||
    flashcards.isError ||
    traps.isError ||
    reviewQueue.isError;
  const retryHome = () => {
    if (summary.isError) void summary.refetch();
    if (flashcards.isError) void flashcards.refetch();
    if (traps.isError) void traps.refetch();
    if (reviewQueue.isError) void reviewQueue.refetch();
  };
  return (
    <DashboardLayout>
      <main className="mx-auto max-w-6xl text-slate-100">
        <QbankNav />
        {view === "home" ? (
          <>
            <header className="rounded-2xl border border-cyan-200/15 bg-slate-900/70 p-6">
              <p className="text-xs font-black uppercase tracking-widest text-cyan-300">
                Qbank SEG
              </p>
              <h1 className="mt-2 text-3xl font-black">
                Emergency Medicine Question Bank
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Create focused sessions, resume your work, and track learning
                performance.
              </p>
              {selectedSection ? (
                <p className="mt-3 rounded-xl border border-cyan-200/15 bg-cyan-300/[.06] p-3 text-xs text-cyan-100">
                  Filtered support drills: {selectedSection[0]}.{" "}
                  {selectedSection[1]}
                </p>
              ) : null}
              <button
                onClick={() =>
                  navigate(
                    selectedSectionId
                      ? `/practice/create?section=${selectedSectionId}`
                      : "/practice/create"
                  )
                }
                className="mt-5 flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-black text-slate-950"
              >
                <FilePlus2 className="h-4 w-4" />
                CREATE A NEW EXAM
              </button>
            </header>
            {homeLoading ? (
              <p
                role="status"
                className="mt-5 rounded-xl border border-white/10 bg-slate-900/70 p-4 text-sm text-slate-300"
              >
                Loading Qbank overview…
              </p>
            ) : null}
            {!homeLoading && homeError ? (
              <div
                role="alert"
                className="mt-5 flex flex-wrap items-center gap-3 rounded-xl border border-rose-300/20 bg-rose-300/5 p-4 text-sm text-rose-100"
              >
                <span><Bi t="qbank.error.overview" /></span>
                <button
                  onClick={retryHome}
                  className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold"
                >
                  <Bi t="qbank.retry" />
                </button>
              </div>
            ) : null}
            <section className="mt-5 grid gap-4 sm:grid-cols-3">
              {overviewCards.map(({ label, value, icon: Icon }) => (
                <article
                  key={label}
                  className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"
                >
                  <Icon className="h-5 w-5 text-cyan-300" />
                  <p className="mt-4 text-3xl font-black">{value}</p>
                  <p className="text-xs text-slate-400">{label}</p>
                </article>
              ))}
            </section>
            <section className="mt-5 grid gap-4 lg:grid-cols-3">
              <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                <p className="text-xs font-black uppercase tracking-widest text-cyan-300">
                  Flashcards
                </p>
                <p className="mt-2 text-3xl font-black">
                  {flashcards.data?.total ?? 0}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Recovered high-yield recall cards.
                </p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                <p className="text-xs font-black uppercase tracking-widest text-amber-300">
                  Exam Traps
                </p>
                <p className="mt-2 text-3xl font-black">
                  {traps.data?.total ?? 0}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  <Bi t="qbank.trap.desc" />
                </p>
              </article>
              <article className="rounded-2xl border border-amber-300/20 bg-amber-300/5 p-5">
                <p className="text-xs font-black uppercase tracking-widest text-amber-300">
                  Review Queue
                </p>
                <p className="mt-2 text-3xl font-black">
                  {reviewQueue.data?.length ?? 0}
                </p>
                <p className="mt-1 text-xs text-slate-300">
                  <Bi t="qbank.review.desc" />
                </p>
              </article>
            </section>
            <section className="mt-5 grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                <h2 className="font-black"><Bi t="qbank.quick.flash" /></h2>
                <div className="mt-3 space-y-3">
                  {flashcards.isLoading ? (
                    <p role="status" className="text-sm text-slate-400">
                      <Bi t="qbank.loading.flashcards" />
                    </p>
                  ) : flashcards.isError ? (
                    <div role="alert" className="text-sm text-rose-100">
                      Unable to load flashcards. <button
                        onClick={() => void flashcards.refetch()}
                        className="underline"
                      >
                        <Bi t="qbank.retry" />
                      </button>
                    </div>
                  ) : flashcards.data?.items.length ? (
                    flashcards.data.items.map(card => (
                    <div
                      key={card.cardId}
                      className="rounded-xl bg-white/[.03] p-3"
                    >
                      <p className="text-xs font-bold text-cyan-300">
                        {card.type} · {card.yield} · S{card.sectionId}
                      </p>
                      <p className="mt-1 text-[10px] text-cyan-200">
                        {card.sectionTitle}
                      </p>
                      <p className="mt-1 text-sm">{card.question}</p>
                      <p className="mt-1 text-xs text-slate-400">
                        {card.answer}
                      </p>
                    </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400">
                      <Bi t="qbank.empty.flashcards" />
                    </p>
                  )}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                <h2 className="font-black"><Bi t="qbank.trap" /></h2>
                <div className="mt-3 space-y-3">
                  {traps.isLoading ? (
                    <p role="status" className="text-sm text-slate-400">
                      <Bi t="qbank.loading.traps" />
                    </p>
                  ) : traps.isError ? (
                    <div role="alert" className="text-sm text-rose-100">
                      Unable to load exam traps. 
                      <button
                        onClick={() => void traps.refetch()}
                        className="underline"
                      >
                        Retry
                      </button>
                    </div>
                  ) : traps.data?.items.length ? (
                    traps.data.items.map(trap => (
                    <div
                      key={trap.id}
                      className="rounded-xl bg-white/[.03] p-3"
                    >
                      <p className="text-xs font-bold text-amber-300">
                        {trap.source} · S{trap.sectionId}
                      </p>
                      <p className="mt-1 text-[10px] text-amber-100">
                        {trap.sectionTitle}
                      </p>
                      <p className="mt-1 text-sm">{trap.text}</p>
                    </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400">
                      <Bi t="qbank.empty.traps" />
                    </p>
                  )}
                </div>
              </div>
            </section>
          </>
        ) : null}
        {view === "exams" ? (
          <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
            <FolderClock className="text-cyan-300" />
            <h1 className="mt-3 text-2xl font-black"><Bi t="qbank.my.exams" /></h1>
            <p className="mt-2 text-sm text-slate-400">
              Completed and paused exam sessions will appear here. Attempt
              history is already retained securely.
            </p>
            {examsQuery.isLoading ? (
              <p
                role="status"
                className="mt-5 rounded-xl border border-white/10 p-8 text-center text-sm text-slate-400"
              >
                <Bi t="qbank.loading.exams" />
              </p>
            ) : examsQuery.isError ? (
              <div
                role="alert"
                className="mt-5 flex flex-wrap items-center justify-center gap-3 rounded-xl border border-rose-300/20 bg-rose-300/5 p-8 text-center text-sm text-rose-100"
              >
                <span><Bi t="qbank.error.exams" /></span>
                <button
                  onClick={() => void examsQuery.refetch()}
                  className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold"
                >
                  Retry
                </button>
              </div>
            ) : savedExams.length ? (
              <div className="mt-5 space-y-3">
                {savedExams.map(exam => (
                  <article
                    key={exam.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[.025] p-4"
                  >
                    <div>
                      <b>{exam.name}</b>
                      <p className="mt-1 text-xs text-slate-400">
                        {(
                          (exam.configuration as { families?: string[] })
                            ?.families ?? []
                        ).join(" + ")}{" "}
                        ·{" "}
                        {
                          Object.keys(
                            (exam.answers as Record<string, string>) ?? {}
                          ).length
                        }
                        /{((exam.questionIds as string[]) ?? []).length}{" "}
                        answered · {new Date(exam.startedAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-right">
                      <button
                        onClick={() =>
                          navigate(`/practice/create?resume=${exam.id}`)
                        }
                        className="flex items-center gap-2 rounded-lg bg-cyan-500 px-3 py-2 text-xs font-black text-slate-950"
                      >
                        <Play className="h-3.5 w-3.5" />
                        {exam.status === "completed" ? "REVIEW" : "RESUME"}
                      </button>
                      <div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${exam.status === "completed" ? "bg-emerald-300/10 text-emerald-200" : "bg-amber-300/10 text-amber-200"}`}
                        >
                          {exam.status}
                        </span>
                        {exam.correctCount !== null ? (
                          <p className="mt-2 text-sm font-bold">
                            {exam.correctCount}/
                            {((exam.questionIds as string[]) ?? []).length}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-xl border border-dashed border-white/15 p-8 text-center text-sm text-slate-400">
                No saved exam sessions yet. Create your first named exam.
              </div>
            )}
          </section>
        ) : null}
        {view === "performance" ? (
          <section className="space-y-5">
            <header className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
              <BarChart3 className="text-cyan-300" />
              <h1 className="mt-3 text-2xl font-black"><Bi t="qbank.performance" /></h1>
            </header>
            {summary.isLoading || performance.isLoading ? (
              <p
                role="status"
                className="rounded-xl border border-white/10 bg-slate-900/70 p-4 text-sm text-slate-300"
              >
                Loading performance…
              </p>
            ) : summary.isError || performance.isError ? (
              <div
                role="alert"
                className="flex flex-wrap items-center gap-3 rounded-xl border border-rose-300/20 bg-rose-300/5 p-4 text-sm text-rose-100"
              >
                <span>Unable to load performance. Please retry.</span>
                <button
                  onClick={() => {
                    if (summary.isError) void summary.refetch();
                    if (performance.isError) void performance.refetch();
                  }}
                  className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold"
                >
                  Retry
                </button>
              </div>
            ) : null}
            <div className="grid gap-4 sm:grid-cols-3">
              <Metric label="Attempted" value={attempted} />
              <Metric label="Correct" value={correct} />
              <Metric label="Accuracy" value={`${accuracy}%`} />
            </div>
            <p className="rounded-xl border border-amber-300/20 bg-amber-300/5 p-4 text-xs text-amber-100">
              Detailed strengths and weaknesses become more meaningful after
              attempts across several pathway categories.
            </p>
            <section className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                <h2 className="font-black"><Bi t="qbank.strongest" /></h2>
                <div className="mt-4 space-y-3">
                  {performance.data?.strongest?.length ? (
                    performance.data.strongest.map(section => (
                      <Metric
                        key={section.sectionId}
                        label={section.sectionTitle}
                        value={`${section.accuracy}%`}
                      />
                    ))
                  ) : (
                    <p className="text-sm text-slate-400">
                      <Bi t="qbank.no.strongest" />
                      this view.
                    </p>
                  )}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                <h2 className="font-black"><Bi t="qbank.weakest" /></h2>
                <div className="mt-4 space-y-3">
                  {performance.data?.weakest?.length ? (
                    performance.data.weakest.map(section => (
                      <Metric
                        key={section.sectionId}
                        label={`${section.sectionTitle} · ${section.attempted} attempts`}
                        value={`${section.accuracy}%`}
                      />
                    ))
                  ) : (
                    <p className="text-sm text-slate-400">
                      <Bi t="qbank.no.weakest" />
                      this view.
                    </p>
                  )}
                </div>
              </div>
            </section>
            <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
              <h2 className="font-black"><Bi t="qbank.families" /></h2>
              {catalog.isLoading ? (
                <p role="status" className="mt-4 text-sm text-slate-400">
                  Loading question banks…
                </p>
              ) : catalog.isError ? (
                <div
                  role="alert"
                  className="mt-4 flex flex-wrap items-center gap-3 text-sm text-rose-100"
                >
                  <span>Unable to load question banks.</span>
                  <button
                    onClick={() => void catalog.refetch()}
                    className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold"
                  >
                    Retry
                  </button>
                </div>
              ) : catalog.data?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {catalog.data.map(family => (
                    <button
                      type="button"
                      key={family.family}
                      onClick={() =>
                        navigate(`/practice/create?family=${family.family}`)
                      }
                      className="rounded-full bg-cyan-300/10 px-3 py-2 text-xs font-bold hover:bg-cyan-300/25"
                    >
                      {family.family} · {family.count}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-400">
                  <Bi t="qbank.error.banks" />
                </p>
              )}
            </section>
          </section>
        ) : null}
        {view === "settings" ? (
          <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
            <Settings className="text-cyan-300" />
            <h1 className="mt-3 text-2xl font-black"><Bi t="portal.settings" /></h1>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-white/[.03] p-4">
                <b><Bi t="portal.current.access" /></b>
                <p className="mt-1 text-sm text-emerald-200">
                  Private pilot access
                </p>
              </div>
              <div className="rounded-xl bg-white/[.03] p-4">
                <b><Bi t="portal.default.timing" /></b>
                <p className="mt-1 text-sm text-slate-400">
                  90 seconds per question
                </p>
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </DashboardLayout>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
      <p className="text-3xl font-black text-cyan-200">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{label}</p>
    </article>
  );
}
