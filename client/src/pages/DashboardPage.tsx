import DashboardLayout from "@/components/DashboardLayout";
import Bi from "@/components/Bi";
import ErrorRecoveryCard from "@/components/dashboard/ErrorRecoveryCard";
import MasteryOverview from "@/components/dashboard/MasteryOverview";
import ProgressOverview from "@/components/dashboard/ProgressOverview";
import ReadinessIndexCard from "@/components/dashboard/ReadinessIndexCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import TodayPlan from "@/components/dashboard/TodayPlan";
import TopicEvidenceCard from "@/components/dashboard/TopicEvidenceCard";
import { selectReadinessBreakdown } from "@/components/dashboard/readiness";
import type {
  DashboardExam,
  DashboardNote,
  DashboardPracticeSummary,
  DashboardTrainingPlan,
  MasterySummary,
} from "@/components/dashboard/types";
import { scorePercent, sectionTitle, toArray } from "@/components/dashboard/utils";
import { SECTION_TO_SYSTEM } from "@/data/medical-systems";
import { highYieldSectionFor } from "@/lib/high-yield-chapter-map";
import {
  calculateReadinessScore,
  classifyTopicError,
  readinessBand,
  selectPriorityEvidence,
  type ClassifiedError,
  type ReadinessBand,
  type TopicEvidence,
} from "@shared/study-plan-intelligence";
import { resolveDashboardDisplayName } from "@/lib/seg-dashboard-profile";
import { trpc } from "@/lib/trpc";
import React from "react";
import {
  Activity,
  BookOpen,
  BrainCircuit,
  CircleHelp,
  ClipboardList,
  NotebookPen,
  ShieldAlert,
  Stethoscope,
  Target,
} from "lucide-react";
import { Link } from "wouter";

const dashboardQuickActions = [
  ["Continue Learning", BookOpen, "/learn"],
  ["Create Exam", CircleHelp, "/practice/create"],
  ["My Exams", ClipboardList, "/practice/exams"],
  ["Performance", Target, "/practice/performance"],
  ["Atlas", Activity, "/atlas"],
  ["Medical Journal", NotebookPen, "/journal"],
] as const;

const DASHBOARD_TRAINING_PLANS = {
  pgy1: {
    label: "PGY-1",
    focus: "Foundations, triage, first-look resuscitation, ECG safety.",
    primarySectionId: 2,
    readingMinutes: 20,
    questionTarget: 10,
    reviewMinutes: 5,
  },
  pgy2: {
    label: "PGY-2",
    focus: "Core ED decisions, trauma, toxicology, sepsis, common procedures.",
    primarySectionId: 7,
    readingMinutes: 15,
    questionTarget: 15,
    reviewMinutes: 8,
  },
  pgy3: {
    label: "PGY-3",
    focus: "Critical care, senior reasoning, procedures, disposition risk.",
    primarySectionId: 3,
    readingMinutes: 12,
    questionTarget: 20,
    reviewMinutes: 10,
  },
  pgy4: {
    label: "PGY-4",
    focus: "Leadership, systems, exam refinement, simulation, supervision.",
    primarySectionId: 19,
    readingMinutes: 10,
    questionTarget: 25,
    reviewMinutes: 12,
  },
  pgy5_plus: {
    label: "PGY-5+",
    focus: "Advanced review, teaching, weak-area closure, governance.",
    primarySectionId: 20,
    readingMinutes: 10,
    questionTarget: 30,
    reviewMinutes: 15,
  },
  attending: {
    label: "Attending",
    focus:
      "Maintenance, teaching review, high-risk updates, clinical governance.",
    primarySectionId: 19,
    readingMinutes: 8,
    questionTarget: 20,
    reviewMinutes: 15,
  },
  pilot_reviewer: {
    label: "Pilot reviewer",
    focus:
      "Validate routing, content provenance, question quality, review gaps.",
    primarySectionId: 22,
    readingMinutes: 15,
    questionTarget: 15,
    reviewMinutes: 15,
  },
} as const;

function getDashboardTrainingPlan(
  value?: string | null
): DashboardTrainingPlan {
  if (value && value in DASHBOARD_TRAINING_PLANS) {
    return DASHBOARD_TRAINING_PLANS[
      value as keyof typeof DASHBOARD_TRAINING_PLANS
    ];
  }
  return DASHBOARD_TRAINING_PLANS.pgy1;
}

/** All resident Qbank families surfaced on the Dashboard (Qbank evidence only). */
const DASHBOARD_QBANK_FAMILIES = [
  { value: "FRCEM", label: "FRCEM" },
  { value: "HIPPO", label: "HIPPO" },
  { value: "OXFORD_SCE", label: "Oxford SCE" },
  { value: "ROSEN_10E", label: "Rosen 10e" },
  { value: "TINTINALLI_9E", label: "Tintinalli 9e" },
] as const;

export interface ProgressSnapshot {
  hasData: boolean;
  overall: number;
  learning: number;
  practice: number;
  mastery: number;
}

function ProgressCard({ snapshot }: { snapshot: ProgressSnapshot }) {
  return (
    <section className="seg-reference-card seg-dashboard-card rounded-xl p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">
          My Progress Overview
        </h2>
        <span className="text-[10px] text-slate-400"><Bi t="dash.this.month" /></span>
      </div>
      {!snapshot.hasData ? (
        <div className="mt-6 rounded-lg border border-dashed border-cyan-200/15 bg-cyan-300/[.03] p-3 text-xs leading-5 text-slate-400">
          No progress yet. Answer your first questions to start tracking
          progress.
        </div>
      ) : (
        <>
          <div className="mt-6 flex items-center gap-4">
            <div className="seg-progress-ring">
              <span className="text-lg font-bold text-white">
                {snapshot.overall}%
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                Overall Progress
              </p>
              <p className="mt-1 text-[11px] text-slate-400">
                Great! Keep going
              </p>
            </div>
          </div>
          <div className="mt-6">
            <ProgressOverview
              items={[
                ["Learning", snapshot.learning, BrainCircuit],
                ["Practice", snapshot.practice, Stethoscope],
                ["Mastery", snapshot.mastery, Target],
              ]}
            />
          </div>
        </>
      )}
    </section>
  );
}

function PracticePerformanceCard({
  practice,
  exams = [],
  familyRows = [],
}: {
  practice?: DashboardPracticeSummary;
  exams?: DashboardExam[];
  familyRows?: Array<{
    family: string;
    label: string;
    attempted: number;
    accuracy: number;
  }>;
}) {
  const attempted = practice?.attempted ?? 0;
  const correct = practice?.correct ?? 0;
  const avgScore = scorePercent(correct, attempted);
  const topScore = exams.reduce((best, exam) => {
    if (exam.status !== "completed") return best;
    return Math.max(
      best,
      scorePercent(exam.correctCount, toArray(exam.questionIds).length)
    );
  }, 0);

  return (
    <section className="seg-reference-card seg-dashboard-card rounded-xl p-4 xl:col-span-4">
      <div className="flex justify-between">
        <h2 className="text-sm font-semibold text-white">
          Practice Performance
        </h2>
        <Link
          href="/practice/performance"
          className="text-[10px] font-bold text-cyan-200"
        >
          Details
        </Link>
      </div>
      <div className="mt-5 grid grid-cols-3 divide-x divide-white/10 text-center">
        <div>
          <p className="text-[10px] text-slate-400"><Bi t="dash.q.solved" /></p>
          <p className="mt-2 text-2xl font-bold text-white">{attempted}</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400"><Bi t="dash.avg.score" /></p>
          <p className="mt-2 text-2xl font-bold text-cyan-200">{avgScore}%</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400"><Bi t="dash.top.score" /></p>
          <p className="mt-2 text-2xl font-bold text-white">{topScore}%</p>
        </div>
      </div>
      {familyRows.length ? (
        <div className="mt-4 space-y-1.5 border-t border-white/10 pt-3">
          {familyRows.map(row => (
            <div
              key={row.family}
              className="flex items-center justify-between gap-3 text-[10px]"
            >
              <span className="truncate text-slate-300">{row.label}</span>
              <span className="shrink-0 font-bold text-slate-100">
                {row.attempted} Qs · {row.accuracy}%
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function HomeDashboard({
  mastery,
  practice,
  exams = [],
  notes = [],
  trainingPlan,
  readinessScore,
  readinessBandValue,
  readinessBreakdown,
  evidenceItems,
  classifiedErrors,
  progressSnapshot,
  familyRows = [],
}: {
  mastery?: MasterySummary;
  practice?: DashboardPracticeSummary;
  exams?: DashboardExam[];
  notes?: DashboardNote[];
  trainingPlan: DashboardTrainingPlan;
  readinessScore: number;
  readinessBandValue: ReadinessBand;
  readinessBreakdown: {
    coverage: number;
    qbankPerformance: number;
    priorityCompletion: number;
    revisionCompliance: number;
    recentTrend: number;
  };
  evidenceItems: TopicEvidence[];
  classifiedErrors: ClassifiedError[];
  progressSnapshot: ProgressSnapshot;
  familyRows?: Array<{
    family: string;
    label: string;
    attempted: number;
    accuracy: number;
  }>;
}) {
  return (
    <div className="grid gap-4 xl:grid-cols-12">
      <section className="seg-reference-card seg-dashboard-card rounded-xl border-cyan-200/20 bg-cyan-300/[.045] p-4 xl:col-span-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-200">
              Today’s resident routing
            </p>
            <h2 className="mt-1 text-lg font-black text-white">
              {trainingPlan.label} plan ·{" "}
              {sectionTitle(trainingPlan.primarySectionId)}
            </h2>
            <p className="mt-1 text-xs leading-5 text-slate-300">
              {trainingPlan.focus}
            </p>
          </div>
          <Link
            href="/account"
            className="rounded-xl border border-cyan-200/20 px-4 py-2 text-xs font-black text-cyan-100"
          >
            Edit PGY level
          </Link>
        </div>
      </section>
      <div className="xl:col-span-12">
        <ReadinessIndexCard
          score={readinessScore}
          band={readinessBandValue}
          breakdown={readinessBreakdown}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:col-span-12">
        <TopicEvidenceCard items={evidenceItems} />
        <ErrorRecoveryCard errors={classifiedErrors} />
      </div>
      <div className="space-y-4 xl:col-span-3">
        <ProgressCard snapshot={progressSnapshot} />
        <MasteryOverview
          mastery={mastery}
          practice={practice}
          notes={notes}
          sections={["knowledge"]}
        />
      </div>
      <div className="space-y-4 xl:col-span-4">
        <TodayPlan
          mastery={mastery}
          practice={practice}
          exams={exams}
          notes={notes}
          trainingPlan={trainingPlan}
        />
        <section className="seg-reference-card seg-dashboard-card rounded-xl p-4">
          <div className="flex justify-between">
            <h2 className="text-sm font-semibold text-white">
              Recent Activity
            </h2>
            <Link
              href="/practice/performance"
              className="text-[10px] font-bold text-cyan-200"
            >
              View All
            </Link>
          </div>
          <div className="mt-4">
            <RecentActivity practice={practice} exams={exams} notes={notes} />
          </div>
        </section>
      </div>
      <section className="seg-reference-card seg-dashboard-card rounded-xl p-4 xl:col-span-7">
        <div>
          <h2 className="text-sm font-semibold text-white"><Bi t="dash.quick.actions" /></h2>
          <p className="mt-1 text-[10px] text-slate-500">
            <Bi t="dash.quick.desc" />
          </p>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {dashboardQuickActions.map(([label, Icon, href]) => (
            <Link
              key={label}
              href={href}
              className="seg-dashboard-action seg-glass-interactive rounded-lg border border-white/10 bg-[#07111e]/80 p-3 text-center"
            >
              <Icon className="mx-auto h-6 w-6 text-cyan-300" />
              <p className="mt-2 text-[10px] font-semibold text-slate-100">
                {label}
              </p>
            </Link>
          ))}
        </div>
      </section>
      <MasteryOverview
        mastery={mastery}
        practice={practice}
        notes={notes}
        sections={["weak"]}
      />
      <PracticePerformanceCard
        practice={practice}
        exams={exams}
        familyRows={familyRows}
      />
      <MasteryOverview
        mastery={mastery}
        practice={practice}
        notes={notes}
        sections={["due"]}
      />
    </div>
  );
}

export default function DashboardPage() {
  const practiceSummary = trpc.residentContent.practiceSummary.useQuery();
  const mastery = trpc.residentContent.performanceSummary.useQuery();
  const exams = trpc.qbank.exams.useQuery();
  const notes = trpc.journalNotes.list.useQuery();
  const account = trpc.account.profile.useQuery();
  const frcemChapters = trpc.residentContent.chapters.useQuery({
    family: "FRCEM",
  });
  const hippoChapters = trpc.residentContent.chapters.useQuery({
    family: "HIPPO",
  });
  const frcemProgress = trpc.residentContent.studyProgress.useQuery({
    family: "FRCEM",
  });
  const hippoProgress = trpc.residentContent.studyProgress.useQuery({
    family: "HIPPO",
  });
  const trainingPlan = getDashboardTrainingPlan(
    account.data?.learningProfile?.trainingLevel
  );
  const displayName = resolveDashboardDisplayName(account.data?.user?.name);
  const pausedExam = exams.data?.find(exam => exam.status === "paused");
  const lastExam = exams.data?.[0];
  const attempted = practiceSummary.data?.attempted ?? 0;
  const correct = practiceSummary.data?.correct ?? 0;
  const accuracy = attempted ? Math.round((correct / attempted) * 100) : 0;

  // Evidence-calibrated intelligence (Phase 4-C): breakdown mapping here,
  // all scoring in `@shared/study-plan-intelligence`. Section titles map to
  // body systems through the existing chapter-map classifier (data mapping,
  // no scoring). Question-level repetition has no section mapping, so
  // evidence items carry repeatedErrors 0; repetition still drives
  // TodayPlan recovery rows via `generateRecoveryActions()`.
  const readinessBreakdown = selectReadinessBreakdown({
    mastery: mastery.data,
    practice: practiceSummary.data,
    chapters: [...(frcemChapters.data ?? []), ...(hippoChapters.data ?? [])],
    progressRows: [
      ...(frcemProgress.data ?? []),
      ...(hippoProgress.data ?? []),
    ],
    notes: notes.data ?? [],
  });
  const readinessScore = calculateReadinessScore(readinessBreakdown);
  const readinessBandValue = readinessBand(readinessScore);
  // Real user progress (no placeholders): chapter coverage + Qbank accuracy
  // + mastery accuracy. Empty state when the user has no recorded activity.
  const progressLearning = readinessBreakdown.coverage;
  const progressPractice = accuracy;
  const progressMastery = mastery.data?.accuracy ?? 0;
  const progressSnapshot: ProgressSnapshot = {
    hasData:
      attempted > 0 ||
      (mastery.data?.attempted ?? 0) > 0 ||
      readinessBreakdown.coverage > 0 ||
      (notes.data?.length ?? 0) > 0,
    overall: Math.round(
      (progressLearning + progressPractice + progressMastery) / 3
    ),
    learning: progressLearning,
    practice: progressPractice,
    mastery: progressMastery,
  };
  // Qbank evidence spans all 5 resident families (server `byFamily` already
  // aggregates every family; unattempted families render as 0, never hidden).
  const serverByFamily = mastery.data?.byFamily ?? [];
  const familyRows = DASHBOARD_QBANK_FAMILIES.map(bank => {
    const row = serverByFamily.find(item => item.family === bank.value);
    return {
      family: bank.value,
      label: bank.label,
      attempted: row?.attempted ?? 0,
      accuracy: row?.accuracy ?? 0,
    };
  });
  const evidenceItems = selectPriorityEvidence({
    topics: (mastery.data?.weakest ?? []).map(section => ({
      topic: section.sectionTitle,
      system:
        SECTION_TO_SYSTEM[highYieldSectionFor(section.sectionTitle)] ?? null,
      accuracy: section.accuracy,
      attempts: section.attempted,
      repeatedErrors: 0,
    })),
    maxTopics: 3,
  });
  const classifiedErrors = evidenceItems.map(item =>
    classifyTopicError({
      topic: item.topic,
      system: item.system,
      accuracy: item.accuracy ?? 0,
      attempts: item.attempts,
      repeatedErrors: item.repeatedErrors,
    })
  );
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1410px]">
        <section className="seg-dashboard-greeting mb-5 grid gap-4 xl:grid-cols-[minmax(220px,1fr)_minmax(245px,1fr)] xl:items-center">
          <div>
            <p className="text-xs text-slate-400"><Bi t="dash.greeting" /></p>
            <h1 className="mt-1 text-3xl font-bold tracking-[-0.045em] text-white">
              {displayName}
            </h1>
            <p className="mt-1 text-sm text-slate-300">
              <Bi t="dash.ready" />
            </p>
          </div>
          <section className="seg-reference-card seg-dashboard-role rounded-xl px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] text-slate-400"><Bi t="dash.role.label" /></p>
                <p className="mt-1 text-sm font-bold text-white">
                  <Bi t="dash.role" />
                </p>
                <button title="Pilot preview — coming soon" className="mt-2 text-[10px] font-bold text-cyan-200">
                  <Bi t="dash.pilot" />
                </button>
              </div>
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-cyan-200/25 bg-cyan-300/10 text-cyan-200">
                <ShieldAlert className="h-5 w-5" />
              </div>
            </div>
          </section>
        </section>
        <section className="mb-5 grid gap-3 rounded-2xl border border-cyan-200/15 bg-slate-900/70 p-4 text-slate-100 md:grid-cols-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-300">
              <Bi t="dash.training.level" />
            </p>
            <p className="mt-1 text-2xl font-black">{trainingPlan.label}</p>
            <p className="truncate text-xs text-slate-400">
              {sectionTitle(trainingPlan.primarySectionId)}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-300">
              <Bi t="dash.prac.accuracy" />
            </p>
            <p className="mt-1 text-2xl font-black">{accuracy}%</p>
            <p className="text-xs text-slate-400">
              {correct}/{attempted} correct
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-300">
              <Bi t="dash.resume" />
            </p>
            {pausedExam ? (
              <Link
                href={`/practice/create?resume=${pausedExam.id}`}
                className="mt-2 inline-flex rounded-lg bg-cyan-500 px-3 py-2 text-xs font-black text-slate-950"
              >
                {pausedExam.name}
              </Link>
            ) : (
              <p className="mt-2 text-xs text-slate-400">
                <Bi t="dash.no.paused" />
              </p>
            )}
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-300">
              Last Exam
            </p>
            <p className="mt-2 truncate text-sm font-bold">
              {lastExam?.name ?? "No saved exam"}
            </p>
            <p className="text-xs text-slate-400">
              {lastExam?.status ?? "Create one from Qbank SEG"}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-300">
              Journal
            </p>
            <p className="mt-1 text-2xl font-black">
              {notes.data?.length ?? 0}
            </p>
            <Link href="/journal" className="text-xs text-cyan-200">
              Open notes
            </Link>
          </div>
        </section>
        <HomeDashboard
          mastery={mastery.data}
          practice={practiceSummary.data}
          exams={exams.data}
          notes={notes.data}
          trainingPlan={trainingPlan}
          readinessScore={readinessScore}
          readinessBandValue={readinessBandValue}
          readinessBreakdown={readinessBreakdown}
          evidenceItems={evidenceItems}
          classifiedErrors={classifiedErrors}
          progressSnapshot={progressSnapshot}
          familyRows={familyRows}
        />
      </div>
    </DashboardLayout>
  );
}
