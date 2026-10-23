import DashboardLayout from "@/components/DashboardLayout";
import RevisionProgressCard from "@/components/RevisionProgressCard";
import StudyPlanSettings from "@/components/StudyPlanSettings";
import CertificatesCard from "@/components/training/CertificatesCard";
import GrowthCore from "@/components/training/GrowthCore";
import { trpc } from "@/lib/trpc";
import { RESIDENT_PATHWAY_SECTIONS } from "@shared/resident-taxonomy";
import {
  BarChart3,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Compass,
  GraduationCap,
  Images,
  NotebookPen,
  Target,
} from "lucide-react";
import { Link } from "wouter";

const TARGET_ATTEMPTS_PER_SECTION = 20;

const TRAINING_LEVEL_CONFIG = {
  pgy1: {
    label: "PGY-1",
    focus: "Build safe ED foundations before breadth.",
    readingWeight: 0.65,
    practiceWeight: 0.35,
    emphasis: [1, 2, 3, 4, 5, 7, 17],
  },
  pgy2: {
    label: "PGY-2",
    focus: "Convert core knowledge into high-volume clinical decisions.",
    readingWeight: 0.55,
    practiceWeight: 0.45,
    emphasis: [3, 6, 7, 8, 9, 10, 18],
  },
  pgy3: {
    label: "PGY-3",
    focus: "Prioritize senior decision-making, critical care, and systems.",
    readingWeight: 0.45,
    practiceWeight: 0.55,
    emphasis: [3, 17, 18, 19, 20, 21],
  },
  pgy4: {
    label: "PGY-4",
    focus: "Shift toward leadership, supervision, risk, and exam refinement.",
    readingWeight: 0.4,
    practiceWeight: 0.6,
    emphasis: [19, 20, 21, 22, 3, 18],
  },
  pgy5_plus: {
    label: "PGY-5+",
    focus: "Use SEG for advanced review, teaching, and weak-area closure.",
    readingWeight: 0.35,
    practiceWeight: 0.65,
    emphasis: [20, 21, 19, 3, 18, 22],
  },
  attending: {
    label: "Attending",
    focus: "Maintenance, teaching review, governance, and high-risk updates.",
    readingWeight: 0.3,
    practiceWeight: 0.7,
    emphasis: [19, 20, 21, 22, 3, 17],
  },
  pilot_reviewer: {
    label: "Pilot reviewer",
    focus: "Stress-test content routing, provenance, and clinical review gaps.",
    readingWeight: 0.5,
    practiceWeight: 0.5,
    emphasis: [19, 20, 22, 17, 3, 21],
  },
} as const;

function getTrainingConfig(value?: string | null) {
  if (value && value in TRAINING_LEVEL_CONFIG) {
    return TRAINING_LEVEL_CONFIG[value as keyof typeof TRAINING_LEVEL_CONFIG];
  }
  return TRAINING_LEVEL_CONFIG.pgy1;
}

type StudyProgressRow = {
  family: string;
  chapterNumber: number;
  completed: boolean | number;
};

function clampPercent(value: number) {
  return Math.min(100, Math.max(0, Math.round(value)));
}

function sourceLabel(families: string[]) {
  return families.length ? families.join(", ") : "Awaiting mapped source";
}

export default function ResidentPathwayPage() {
  const frcem = trpc.residentContent.chapters.useQuery({ family: "FRCEM" });
  const hippo = trpc.residentContent.chapters.useQuery({ family: "HIPPO" });
  const frcemProgress = trpc.residentContent.studyProgress.useQuery({
    family: "FRCEM",
  });
  const hippoProgress = trpc.residentContent.studyProgress.useQuery({
    family: "HIPPO",
  });
  const practice = trpc.residentContent.practiceSummary.useQuery();
  const performance = trpc.residentContent.performanceSummary.useQuery();
  const account = trpc.account.profile.useQuery();
  const savedPlan = trpc.studyPlan.current.useQuery();
  const pageLoading =
    frcem.isLoading ||
    hippo.isLoading ||
    frcemProgress.isLoading ||
    hippoProgress.isLoading ||
    practice.isLoading ||
    performance.isLoading ||
    account.isLoading ||
    savedPlan.isLoading;
  const pageError =
    frcem.isError ||
    hippo.isError ||
    frcemProgress.isError ||
    hippoProgress.isError ||
    practice.isError ||
    performance.isError ||
    account.isError ||
    savedPlan.isError;
  const retryPage = () => {
    if (frcem.isError) void frcem.refetch();
    if (hippo.isError) void hippo.refetch();
    if (frcemProgress.isError) void frcemProgress.refetch();
    if (hippoProgress.isError) void hippoProgress.refetch();
    if (practice.isError) void practice.refetch();
    if (performance.isError) void performance.refetch();
    if (account.isError) void account.refetch();
    if (savedPlan.isError) void savedPlan.refetch();
  };
  const trainingConfig = getTrainingConfig(
    account.data?.learningProfile?.trainingLevel
  );

  const chapters = [...(frcem.data ?? []), ...(hippo.data ?? [])];
  const progressRows: StudyProgressRow[] = [
    ...(frcemProgress.data ?? []),
    ...(hippoProgress.data ?? []),
  ];
  const completed = new Set(
    progressRows
      .filter(item => item.completed)
      .map(item => `${item.family}:${item.chapterNumber}`)
  );

  const sectionCards = RESIDENT_PATHWAY_SECTIONS.map(([id, title]) => {
    const isTrainingFocus = (
      trainingConfig.emphasis as readonly number[]
    ).includes(id);
    const sectionChapters = chapters.filter(item => item.sectionId === id);
    const done = sectionChapters.filter(item =>
      completed.has(`${item.family}:${item.chapterNumber}`)
    ).length;
    const readingProgress = sectionChapters.length
      ? clampPercent((done / sectionChapters.length) * 100)
      : 0;
    const stats = performance.data?.sections?.find(
      section => section.sectionId === id
    );
    const practiceCoverage = stats?.questionCount
      ? clampPercent(
          ((stats.attempted ?? 0) /
            Math.min(stats.questionCount, TARGET_ATTEMPTS_PER_SECTION)) *
            100
        )
      : 0;
    const practiceMastery = stats?.attempted
      ? clampPercent(practiceCoverage * 0.4 + (stats.accuracy ?? 0) * 0.6)
      : 0;
    const overallProgress = clampPercent(
      readingProgress * trainingConfig.readingWeight +
        practiceMastery * trainingConfig.practiceWeight
    );
    const families = Array.from(
      new Set(sectionChapters.map(item => item.family))
    ).sort();
    const nextAction =
      sectionChapters.length && done < sectionChapters.length
        ? "Continue reading"
        : stats?.attempted
          ? "Review weak questions"
          : "Create focused exam";

    return {
      id,
      title,
      sectionChapters,
      done,
      readingProgress,
      practiceCoverage,
      practiceMastery,
      overallProgress,
      stats,
      families,
      nextAction,
      isTrainingFocus,
    };
  });

  const attempted = practice.data?.attempted ?? 0;
  const accuracy = attempted
    ? Math.round(((practice.data?.correct ?? 0) / attempted) * 100)
    : 0;
  const totalQuestionCount = sectionCards.reduce(
    (sum, section) => sum + (section.stats?.questionCount ?? 0),
    0
  );
  const overallPathwayProgress = sectionCards.length
    ? clampPercent(
        sectionCards.reduce(
          (sum, section) => sum + section.overallProgress,
          0
        ) / sectionCards.length
      )
    : 0;
  const weakFocus = performance.data?.nextRecommendedSection;
  const trainingFocus = sectionCards.find(
    section =>
      section.isTrainingFocus &&
      (section.overallProgress < 75 ||
        section.sectionChapters.length > 0 ||
        (section.stats?.questionCount ?? 0) > 0)
  );
  const suggestedSection = weakFocus
    ? {
        id: weakFocus.sectionId,
        title: weakFocus.sectionTitle,
        reason: `${weakFocus.attempted} attempts · ${weakFocus.accuracy}% accuracy · ${weakFocus.questionCount} indexed questions`,
        tone: "Weak-area driven",
      }
    : trainingFocus
      ? {
          id: trainingFocus.id,
          title: trainingFocus.title,
          reason: `${trainingConfig.label} priority · ${trainingFocus.overallProgress}% composite progress`,
          tone: "Training-level driven",
        }
      : null;
  const startHereSection =
    sectionCards.find(section =>
      (trainingConfig.emphasis as readonly number[]).includes(section.id)
    ) ?? sectionCards[0];

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-5 text-slate-100">
        {pageLoading ? (
          <p
            role="status"
            className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-sm text-slate-300"
          >
            Loading your pathway…
          </p>
        ) : null}
        {!pageLoading && pageError ? (
          <div
            role="alert"
            className="flex flex-wrap items-center gap-3 rounded-2xl border border-rose-300/20 bg-rose-300/5 p-4 text-sm text-rose-100"
          >
            <span>Unable to load your pathway. Please retry.</span>
            <button
              type="button"
              onClick={retryPage}
              className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold"
            >
              Retry
            </button>
          </div>
        ) : null}
        <StudyPlanSettings />
        <RevisionProgressCard />
        <header className="rounded-2xl border border-cyan-200/15 bg-slate-900/70 p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <Compass className="text-cyan-300" />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                  Resident Emergency Medicine
                </p>
                <h1 className="text-2xl font-black">My Pathway</h1>
              </div>
            </div>
            <div className="rounded-xl border border-cyan-200/20 bg-cyan-300/10 px-4 py-2 text-right">
              <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-200">
                Composite Progress
              </p>
              <p className="text-2xl font-black text-white">
                {overallPathwayProgress}%
              </p>
            </div>
          </div>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300">
            The resident pathway decides what to study next. It combines mapped
            Learn chapters, Qbank activity, weak areas, and source linkage while
            keeping student, intern, nursing, and other paths separate.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-4">
            <Metric label="Mapped Learn chapters" value={chapters.length} />
            <Metric label="Indexed Qbank items" value={totalQuestionCount} />
            <Metric label="Practice attempts" value={attempted} />
            <Metric label="Practice accuracy" value={`${accuracy}%`} />
          </div>
          <div className="mt-4 rounded-xl border border-cyan-200/20 bg-cyan-300/[.06] p-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-200">
                  <GraduationCap className="h-4 w-4" />
                  Training-level personalization
                </p>
                <p className="mt-1 text-sm font-black text-white">
                  {trainingConfig.label}: {trainingConfig.focus}
                </p>
              </div>
              <Link
                href="/account"
                className="rounded-xl border border-cyan-200/20 px-3 py-2 text-xs font-black text-cyan-100"
              >
                Edit level
              </Link>
            </div>
            <p className="mt-2 text-[11px] leading-5 text-slate-300">
              Progress weighting: reading{" "}
              {Math.round(trainingConfig.readingWeight * 100)}% / practice{" "}
              {Math.round(trainingConfig.practiceWeight * 100)}%. Highlighted
              sections are emphasized for this resident level.
            </p>
          </div>
          <div className="mt-4 rounded-xl border border-emerald-300/20 bg-emerald-300/[.05] p-3">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-200">Saved study plan</p>
            <p className="mt-1 text-sm font-black text-white">{savedPlan.data?.planId ?? "No plan configured yet"}</p>
            <p className="mt-1 text-xs text-slate-300">{savedPlan.data ? `Daily target: ${savedPlan.data.dailyHours} hours · ${savedPlan.data.qbankAttempted ?? 0} Qbank attempts` : "Configure a plan to generate persistent daily tasks."}</p>
          </div>
          <div className="mt-4 rounded-xl border border-amber-300/20 bg-amber-300/[.06] p-3">
            <p className="text-xs font-bold text-amber-100">
              Current pathway rule
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-300">
              Active calculations use reviewed in-app data only: FRCEM/HIPPO
              study chapters plus normalized Qbank sources. PreTest/1400q and
              visual OSCE material remain candidates until normalization,
              labeling, and review are complete.
            </p>
          </div>
        </header>

        {suggestedSection ? (
          <section className="rounded-2xl border border-rose-300/20 bg-rose-300/[.06] p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-rose-200">
                  Suggested next focus · {suggestedSection.tone}
                </p>
                <h2 className="mt-1 text-lg font-black text-white">
                  {suggestedSection.title}
                </h2>
                <p className="mt-1 text-xs text-slate-300">
                  {suggestedSection.reason}
                </p>
              </div>
              <Link
                href={`/practice/create?section=${suggestedSection.id}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-xs font-black text-slate-950"
              >
                Create focused exam
                <ClipboardList className="h-4 w-4" />
              </Link>
            </div>
          </section>
        ) : null}

        {!suggestedSection && startHereSection ? (
          <section
            aria-label="Start here"
            className="rounded-2xl border border-cyan-200/20 bg-cyan-300/[.05] p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-cyan-200">
                  Start here · {trainingConfig.label}
                </p>
                <h2 className="mt-1 text-lg font-black text-white">
                  {startHereSection.title}
                </h2>
                <p className="mt-1 text-xs text-slate-300">
                  {trainingConfig.focus}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/learn?section=${startHereSection.id}`}
                  className="rounded-xl border border-cyan-200/20 px-4 py-2 text-xs font-black text-cyan-100"
                >
                  Start learning
                </Link>
                <Link
                  href={`/practice/create?section=${startHereSection.id}`}
                  className="rounded-xl bg-cyan-500 px-4 py-2 text-xs font-black text-slate-950"
                >
                  Create focused exam
                </Link>
              </div>
            </div>
          </section>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {sectionCards.map(section => (
            <section
              key={section.id}
              className={`rounded-2xl border p-5 ${
                section.isTrainingFocus
                  ? "border-cyan-200/30 bg-cyan-300/[.055]"
                  : "border-white/10 bg-slate-900/70"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-300/10 text-sm font-black text-cyan-200">
                  {section.id}
                </span>
                {section.isTrainingFocus ? (
                  <span className="rounded-full border border-cyan-200/20 bg-cyan-300/10 px-2 py-1 text-[10px] font-black uppercase tracking-wider text-cyan-100">
                    {trainingConfig.label} focus
                  </span>
                ) : section.done > 0 ? (
                  <span className="flex items-center gap-1 text-xs text-emerald-300">
                    <CheckCircle2 className="h-4 w-4" />
                    {section.done} read
                  </span>
                ) : (
                  <span className="text-xs text-slate-500">
                    {section.nextAction}
                  </span>
                )}
              </div>

              <h2 className="mt-4 min-h-12 font-bold leading-6">
                {section.title}
              </h2>
              <p className="mt-2 text-xs text-slate-400">
                Sources: {sourceLabel(section.families)}
              </p>

              <div className="mt-4 space-y-3">
                <ProgressLine
                  label="Overall pathway"
                  value={section.overallProgress}
                  tone="cyan"
                />
                <ProgressLine
                  label={`Reading ${section.done}/${section.sectionChapters.length}`}
                  value={section.readingProgress}
                  tone="emerald"
                />
                <ProgressLine
                  label={`Practice ${section.stats?.attempted ?? 0}/${Math.min(section.stats?.questionCount ?? 0, TARGET_ATTEMPTS_PER_SECTION)}`}
                  value={section.practiceMastery}
                  tone="amber"
                />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <MiniStat
                  label="Qbank"
                  value={section.stats?.questionCount ?? 0}
                />
                <MiniStat label="Tried" value={section.stats?.attempted ?? 0} />
                <MiniStat
                  label="Accuracy"
                  value={`${section.stats?.accuracy ?? 0}%`}
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <Link
                  href={`/learn?section=${section.id}`}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs font-bold text-cyan-200"
                >
                  <BookOpen className="h-4 w-4" />
                  Learn
                </Link>
                <Link
                  href={`/practice/create?section=${section.id}`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-3 py-2 text-xs font-bold text-slate-950"
                >
                  <ClipboardList className="h-4 w-4" />
                  Practice
                </Link>
                <Link
                  href={`/journal?section=${section.id}`}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[.04] px-3 py-2 text-xs font-bold text-slate-100"
                >
                  <NotebookPen className="h-4 w-4" />
                  Journal
                </Link>
                <Link
                  href={`/atlas?section=${section.id}`}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[.04] px-3 py-2 text-xs font-bold text-slate-100"
                >
                  <Images className="h-4 w-4" />
                  Atlas
                </Link>
              </div>

              {section.sectionChapters.length === 0 &&
              !section.stats?.questionCount ? (
                <p className="mt-3 text-[11px] text-amber-200">
                  No active source material mapped yet.
                </p>
              ) : null}
            </section>
          ))}
        </div>

        <section aria-label="Professional development">
          <p className="text-xs font-black uppercase tracking-widest text-cyan-300">
            Professional Development
          </p>
          <h2 className="mt-1 text-xl font-black text-white">
            Growth and credentials
          </h2>
          <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(17rem,.7fr)]">
            <GrowthCore />
            <CertificatesCard />
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl bg-white/[.03] p-3">
      <p className="text-xl font-black text-cyan-200">{value}</p>
      <p className="text-xs text-slate-400">{label}</p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-white/[.06] bg-white/[.025] px-2 py-2">
      <p className="text-sm font-black text-white">{value}</p>
      <p className="mt-0.5 text-[9px] text-slate-500">{label}</p>
    </div>
  );
}

function ProgressLine({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "cyan" | "emerald" | "amber";
}) {
  const color =
    tone === "emerald"
      ? "bg-emerald-300"
      : tone === "amber"
        ? "bg-amber-300"
        : "bg-cyan-400";
  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-[10px]">
        <span className="flex items-center gap-1.5 truncate text-slate-300">
          {tone === "cyan" ? <Target className="h-3 w-3" /> : null}
          {tone === "amber" ? <BarChart3 className="h-3 w-3" /> : null}
          {label}
        </span>
        <span className="font-bold text-slate-100">{value}%</span>
      </div>
      <div className="mt-1 h-1.5 rounded-full bg-white/10">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
