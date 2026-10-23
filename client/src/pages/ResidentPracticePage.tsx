import DashboardLayout from "@/components/DashboardLayout";
import QbankNav from "@/components/QbankNav";
import Bi from "@/components/Bi";
import { trpc } from "@/lib/trpc";
import { RESIDENT_PATHWAY_SECTIONS } from "@shared/resident-taxonomy";
import { SMART_EXAM_THRESHOLD, SMART_EXAM_BATCH_SIZE } from "@shared/smart-exam-cache";
import { readCachedBatch, readWindowFromCache, writeCachedBatch } from "@/lib/smartExamCache";
import { toast } from "sonner";
import {
  Calculator,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Eraser,
  Flag,
  FlaskConical,
  Highlighter,
  LoaderCircle,
  Pause,
  Play,
  Strikethrough,
  XCircle,
} from "lucide-react";
import React, {
  memo,
  useEffect,
  useMemo,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { useLocation, useSearch } from "wouter";

type Family =
  | "EDIC"
  | "FRCEM"
  | "HIPPO"
  | "OXFORD_SCE"
  | "PEER_2026"
  | "PEER_PHYSICIANS"
  | "ROSEN_10E"
  | "ROSH_2026"
  | "TINTINALLI_9E"
  | "AQRAB"
  | "IMPORTED";
type SessionMode = "study" | "exam";
type GoToFilter = "all" | "flagged" | "not-attempted";
type MarkTool = "answer" | "highlight" | "strike";
type QuestionType = "all" | "unused" | "incorrect" | "flagged" | "skipped" | "searched";
type TimeMode = "timed" | "untimed";
/**
 * Shared question-limit logic: total available questions across the given
 * banks minus excluded chapters, from questionCatalog data. Falls back to the
 * legacy cap of 100 while the catalog is loading or a bank has no entry.
 */
function bankQuestionLimit(
  rows:
    | {
        family: string;
        chapters: { chapterNumber: number; count?: number | null }[];
      }[]
    | undefined,
  families: string[],
  excludedChapterKeys: string[]
): number {
  if (!rows) return 100;
  let total = 0;
  for (const family of families) {
    const entry = rows.find(item => item.family === family);
    if (!entry) return 100;
    for (const chapter of entry.chapters) {
      if (!excludedChapterKeys.includes(`${family}:${chapter.chapterNumber}`)) {
        total += chapter.count ?? 0;
      }
    }
  }
  return Math.max(1, total);
}
const BANKS: { value: Family; label: string }[] = [
  { value: "EDIC", label: "EDIC SBA 2026" },
  { value: "FRCEM", label: "FRCEM" },
  { value: "HIPPO", label: "HIPPO" },
  { value: "OXFORD_SCE", label: "Oxford Acute Medicine SCE" },
  { value: "PEER_2026", label: "PEER for Physicians 2026" },
  {
    value: "PEER_PHYSICIANS",
    label: "PEER for Physicians - Case Series 2026",
  },
  { value: "ROSEN_10E", label: "Rosen's Emergency Medicine 10e" },
  { value: "ROSH_2026", label: "ROSH Review EM Initial Certification 2026" },
  { value: "TINTINALLI_9E", label: "Tintinalli Board Review 9e" },
  { value: "AQRAB", label: "Aqrab" },
  { value: "IMPORTED", label: "Imported (Custom)" },
];
const LAB_VALUES = [
  ["Na⁺", "135–145 mmol/L"],
  ["K⁺", "3.5–5.0 mmol/L"],
  ["Glucose", "70–100 mg/dL fasting"],
  ["Creatinine", "0.6–1.3 mg/dL"],
  ["pH", "7.35–7.45"],
  ["PaCO₂", "35–45 mmHg"],
  ["HCO₃⁻", "22–26 mmol/L"],
  ["Hemoglobin", "F 12–16 / M 13.5–17.5 g/dL"],
] as const;
const formatTime = (seconds: number) =>
  `${String(Math.floor(Math.max(0, seconds) / 60)).padStart(2, "0")}:${String(Math.max(0, seconds) % 60).padStart(2, "0")}`;

function MiniCalculator({ onClose }: { onClose: () => void }) {
  const [expression, setExpression] = useState("");
  const calculate = () => {
    const match = expression
      .replace(/\s/g, "")
      .match(/^(-?\d+(?:\.\d+)?)([+\-*/])(-?\d+(?:\.\d+)?)$/);
    if (!match) return setExpression("Invalid");
    const left = Number(match[1]),
      right = Number(match[3]);
    const result =
      match[2] === "+"
        ? left + right
        : match[2] === "-"
          ? left - right
          : match[2] === "*"
            ? left * right
            : right === 0
              ? NaN
              : left / right;
    setExpression(Number.isFinite(result) ? String(result) : "Invalid");
  };
  return (
    <div className="absolute right-0 top-12 z-30 w-[min(16rem,calc(100vw-1rem))] max-w-[calc(100vw-1rem)] rounded-2xl border border-cyan-200/20 bg-slate-950 p-3 shadow-2xl">
      <div className="flex items-center justify-between">
        <b className="text-sm">Calculator</b>
        <button onClick={onClose} aria-label="Close calculator">
          ×
        </button>
      </div>
      <input
        aria-label="Calculation"
        value={expression}
        readOnly
        className="mt-3 w-full rounded-lg bg-white/5 p-3 text-right"
      />
      <div className="mt-2 grid grid-cols-4 gap-1">
        {[
          "7",
          "8",
          "9",
          "/",
          "4",
          "5",
          "6",
          "*",
          "1",
          "2",
          "3",
          "-",
          "0",
          ".",
          "C",
          "+",
        ].map(key => (
          <button
            key={key}
            onClick={() =>
              setExpression(value => (key === "C" ? "" : value + key))
            }
            className="rounded-lg bg-white/5 p-2"
          >
            {key}
          </button>
        ))}
      </div>
      <button
        onClick={calculate}
        className="mt-2 w-full rounded-lg bg-cyan-500 py-2 font-bold text-slate-950"
      >
        =
      </button>
    </div>
  );
}

/**
 * questionsByIds travels over GET (httpBatchLink), so one call with hundreds
 * of ids blows up the URL. Frozen sessions load in parallel chunks instead;
 * order is preserved when the chunks are merged back.
 */
const FROZEN_QUESTION_BATCH_SIZE = 100;
/**
 * Navigator window size. Only one window of buttons renders at a time so
 * large exams stay usable; each button is memoized on primitive props so
 * answering one question does not rerender the rest.
 */
const NAVIGATOR_PAGE_SIZE = 100;

const NavigatorButton = memo(function NavigatorButton({
  index,
  variant,
  isCurrent,
  isFlagged,
}: {
  index: number;
  variant: "correct" | "incorrect" | "selected" | "idle";
  isCurrent: boolean;
  isFlagged: boolean;
}) {
  const stateClasses =
    variant === "correct"
      ? "border-emerald-300/60 bg-emerald-300/20 text-emerald-100"
      : variant === "incorrect"
        ? "border-rose-300/60 bg-rose-300/20 text-rose-100"
        : variant === "selected"
          ? "border-emerald-300/40 bg-emerald-300/10"
          : "border-white/10 bg-white/[.03]";
  return (
    <button
      type="button"
      data-qindex={index}
      aria-label={`Go to question ${index + 1}`}
      className={`relative h-9 min-w-9 rounded-lg border text-xs ${stateClasses} ${isCurrent ? (variant === "correct" || variant === "incorrect" ? "ring-2 ring-cyan-300 font-black" : "border-cyan-200 bg-cyan-500 font-black text-slate-950") : ""}`}
    >
      {index + 1}
      {isFlagged ? (
        <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-amber-300" />
      ) : null}
    </button>
  );
});

export default function ResidentPracticePage() {
  const [, navigate] = useLocation();
  const search = useSearch();
  const searchParams = new URLSearchParams(search);
  const resumeExamId = searchParams.get("resume");
  const initialSection = Number(searchParams.get("section"));
  const urlFamily = searchParams.get("family");
  const initialFamilies: Family[] = urlFamily
    ? [urlFamily as Family]
    : ["FRCEM"];
  const [families, setFamilies] = useState<Family[]>(initialFamilies),
    [sectionId, setSectionId] = useState<number | "all">(
      Number.isInteger(initialSection) &&
        initialSection >= 1 &&
        initialSection <= 22
        ? initialSection
        : "all"
    ),
    [includedSections, setIncludedSections] = useState<number[]>([]),
    [excludedSections, setExcludedSections] = useState<number[]>([]),
    [mode, setMode] = useState<SessionMode>("study"),
    [questionCount, setQuestionCount] = useState(0),
    [minutes, setMinutes] = useState(15);
  const [examName, setExamName] = useState(""),
    [questionType, setQuestionType] = useState<QuestionType>("all"),
    [questionOrder, setQuestionOrder] = useState<"listed" | "random">("listed"),
    [searchTerm, setSearchTerm] = useState(""),
    [excludedChapterKeys, setExcludedChapterKeys] = useState<string[]>([]),
    [expandedFamilies, setExpandedFamilies] = useState<Family[]>([]),
    [timeMode, setTimeMode] = useState<TimeMode>("untimed"),
    [mediaTags, setMediaTags] = useState<string[]>([]);
  const [started, setStarted] = useState(false),
    [paused, setPaused] = useState(false),
    [finished, setFinished] = useState(false),
    [remaining, setRemaining] = useState(900),
    [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<Record<string, string>>({}),
    [results, setResults] = useState<
      Record<string, { correct: boolean; correctAnswer: string }>
    >({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set()),
    [highlighted, setHighlighted] = useState<Set<string>>(new Set()),
    [struck, setStruck] = useState<Set<string>>(new Set());
  const [goToFilter, setGoToFilter] = useState<GoToFilter>("all"),
    [tool, setTool] = useState<MarkTool>("answer"),
    [showLabs, setShowLabs] = useState(false),
    [showCalc, setShowCalc] = useState(false),
    [reviewFilter, setReviewFilter] = useState<
      "all" | "correct" | "incorrect" | "skipped"
    >("all"),
    [issueDraft, setIssueDraft] = useState(""),
    [shuffleKey, setShuffleKey] = useState(0);
  const [examId, setExamId] = useState<string | null>(null);
  const [sessionQuestionIds, setSessionQuestionIds] = useState<string[]>([]);
  const examsQuery = trpc.qbank.exams.useQuery(undefined, {
    enabled: Boolean(resumeExamId),
  });
  const resumeExam = examsQuery.data?.find(exam => exam.id === resumeExamId);
  const catalog = trpc.residentContent.questionCatalog.useQuery(undefined, { enabled: !started });
  const resumeQuestionIds = useMemo(() => {
    const ids = (resumeExam?.questionIds as string[]) ?? [];
    const configuration = resumeExam?.configuration as
      | { families?: Family[]; excludedChapterKeys?: string[] }
      | undefined;
    return ids.slice(
      0,
      bankQuestionLimit(
        catalog.data,
        configuration?.families?.length ? configuration.families : ["FRCEM"],
        configuration?.excludedChapterKeys ?? []
      )
    );
  }, [resumeExam?.questionIds, resumeExam?.configuration, catalog.data]);
  const availableQuestionMax = useMemo(
    () => bankQuestionLimit(catalog.data, families, excludedChapterKeys),
    [catalog.data, families, excludedChapterKeys]
  );
  useEffect(() => {
    setQuestionCount(current => Math.min(current, availableQuestionMax));
  }, [availableQuestionMax]);
  useEffect(() => {
    if (!started && !resumeExamId) {
      setQuestionCount(availableQuestionMax);
    }
  }, [availableQuestionMax, started, resumeExamId]);
  const query = trpc.residentContent.sessionQuestions.useQuery(
    {
      families,
      excludedChapterKeys,
      sectionId: sectionId === "all" ? undefined : sectionId,
      includeSectionIds: includedSections.length ? includedSections : undefined,
      excludeSectionIds: excludedSections.length ? excludedSections : undefined,
      questionType,
      search: questionType === "searched" ? searchTerm : undefined,
      order: questionOrder,
      seed: shuffleKey,
      count: questionCount,
    },
    { enabled: started && !resumeExamId }
  );
  const frozenQuestionIds = resumeExamId ? resumeQuestionIds : sessionQuestionIds;
  const isLargeExam = frozenQuestionIds.length > SMART_EXAM_THRESHOLD;
  // Small exams (<500): fast path - load all chunks in parallel (existing behavior).
  // Large exams (>500): windowed loading - current batch + next batch, cached locally.
  const frozenQuestionChunks = useMemo(() => {
    if (isLargeExam) return [] as string[][];
    const chunks: string[][] = [];
    for (
      let index = 0;
      index < frozenQuestionIds.length;
      index += FROZEN_QUESTION_BATCH_SIZE
    ) {
      chunks.push(
        frozenQuestionIds.slice(index, index + FROZEN_QUESTION_BATCH_SIZE)
      );
    }
    return chunks;
  }, [frozenQuestionIds, isLargeExam]);
  const frozenBatchQueries = trpc.useQueries(t =>
    frozenQuestionChunks.map(ids =>
      t.residentContent.questionsByIds({ questionIds: ids })
    )
  );
  const frozenQuestionsQuery = useMemo(() => {
    if (isLargeExam) return { data: undefined, isLoading: false, isError: false };
    if (!frozenQuestionChunks.length) {
      return { data: undefined, isLoading: false, isError: false };
    }
    const isLoading = frozenBatchQueries.some(batch => batch.isLoading);
    const isError = frozenBatchQueries.some(batch => batch.isError);
    const complete = frozenBatchQueries.every(
      batch => batch.data !== undefined
    );
    return {
      data: complete
        ? frozenBatchQueries.flatMap(batch => batch.data ?? [])
        : undefined,
      isLoading,
      isError,
    };
  }, [isLargeExam, frozenQuestionChunks.length, frozenBatchQueries]);

  // Smart cache window queries for large exams
  const smartWindowEnabled = isLargeExam && frozenQuestionIds.length > 0;
  // When resuming, use examId-backed batch (server SQLite cache); for new sessions use generic batch
  const smartBatchResumeQuery = trpc.qbank.examBatch.useQuery(
    { examId: resumeExamId ?? examId ?? "", currentIndex: current, batchSize: SMART_EXAM_BATCH_SIZE },
    { enabled: smartWindowEnabled && Boolean(resumeExamId || examId) },
  );
  // questionsBatch travels over GET (httpBatchLink), so the id list must stay small:
  // sending every id of a 2500-question session overflows the request header limit
  // (431 Request Header Fields Too Large). Only the current window plus the prefetch
  // batch is requested; the server slices the same ids in the same order.
  const smartWindowOffset = Math.floor(current / SMART_EXAM_BATCH_SIZE) * SMART_EXAM_BATCH_SIZE;
  const smartWindowIds = frozenQuestionIds.slice(smartWindowOffset, smartWindowOffset + SMART_EXAM_BATCH_SIZE * 2);
  const smartBatchNewQuery = trpc.residentContent.questionsBatch.useQuery(
    { questionIds: smartWindowIds, offset: 0, limit: SMART_EXAM_BATCH_SIZE * 2 },
    { enabled: smartWindowEnabled && !resumeExamId && !examId && smartWindowIds.length > 0 },
  );
  const smartWindowData = smartBatchResumeQuery.data ?? smartBatchNewQuery.data;
  const smartWindowLoading = smartBatchResumeQuery.isLoading || smartBatchNewQuery.isLoading;
  const smartWindowError = smartBatchResumeQuery.isError || smartBatchNewQuery.isError;

  // Client-side cache for window batches (mirrors server SQLite cache)
  useEffect(() => {
    if (!isLargeExam || !smartWindowData?.items?.length) return;
    const examKey = resumeExamId ?? examId ?? "pending-session";
    const base = Math.floor(current / SMART_EXAM_BATCH_SIZE) * SMART_EXAM_BATCH_SIZE;
    const batches = [
      smartWindowData.items.slice(0, SMART_EXAM_BATCH_SIZE),
      smartWindowData.items.slice(SMART_EXAM_BATCH_SIZE, SMART_EXAM_BATCH_SIZE * 2),
    ];
    batches.forEach((batch, offset) => {
      if (!batch.length) return;
      const batchIndex = Math.floor((base + offset * SMART_EXAM_BATCH_SIZE) / SMART_EXAM_BATCH_SIZE);
      const idsSlice = frozenQuestionIds.slice(batchIndex * SMART_EXAM_BATCH_SIZE, (batchIndex + 1) * SMART_EXAM_BATCH_SIZE);
      writeCachedBatch(examKey, batchIndex, idsSlice, batch);
    });
    // Prefetch next window silently in background (next batch already included, but warm cache for further navigation)
    const prefetched = readWindowFromCache(examKey, frozenQuestionIds, current) !== null;
    void prefetched;
  }, [isLargeExam, smartWindowData, current, frozenQuestionIds, resumeExamId, examId]);
  const createExam = trpc.qbank.createExam.useMutation();
  const updateExam = trpc.qbank.updateExam.useMutation();
  const setQuestionState = trpc.qbank.setQuestionState.useMutation();
  const reportIssue = trpc.qbank.reportIssue.useMutation();
  const arabicAvailability = trpc.residentContent.arabicTranslationAvailability.useQuery();
  const translateArabic = trpc.residentContent.translateArabicExplanation.useMutation();
  const [translatedArabic, setTranslatedArabic] = useState<Record<string, string>>({});
  const [translateArabicError, setTranslateArabicError] = useState<Record<string, string>>({});
  const summary = trpc.residentContent.practiceSummary.useQuery(),
    submitAnswer = trpc.residentContent.submitAnswer.useMutation(),
    utils = trpc.useUtils();
  const smartQuestionsMap = useMemo(() => {
    if (!isLargeExam || !smartWindowData?.items) return new Map<string, unknown>();
    return new Map<string, unknown>(smartWindowData.items.map(item => [item.id, item] as const));
  }, [isLargeExam, smartWindowData]);
  const questions = useMemo(() => {
    if (isLargeExam) {
      // For large exams keep IDs as source of truth; bodies are windowed.
      // Return window items for progress that needs bodies, but total count comes from IDs elsewhere.
      // To preserve navigator/progress behavior, return a sparse array of window items; the caller
      // checks length via frozenQuestionIds when large.
      return smartWindowData?.items ?? [];
    }
    return frozenQuestionIds.length
      ? frozenQuestionsQuery.data ?? []
      : query.data?.items ?? [];
  }, [isLargeExam, smartWindowData, frozenQuestionIds.length, frozenQuestionsQuery.data, query.data?.items]);
  const largeQuestion = useMemo(() => {
    if (!isLargeExam) return undefined;
    const id = frozenQuestionIds[current];
    if (!id) return undefined;
    const fromWindow = smartQuestionsMap.get(id) as { id: string; chapterTitle: string; sourceQuestionNumber: number; question: string; options: { key: string; text: string }[]; englishExplanation: string; arabicExplanation: string } | undefined;
    if (fromWindow) return fromWindow as unknown as typeof fromWindow;
    const examKey = resumeExamId ?? examId ?? "pending-session";
    const batchIndex = Math.floor(current / SMART_EXAM_BATCH_SIZE);
    const cached = readCachedBatch<{ id: string }>(examKey, batchIndex);
    const found = cached?.questions.find(q => (q as { id: string }).id === id);
    return found as unknown as typeof fromWindow | undefined;
  }, [isLargeExam, frozenQuestionIds, current, smartQuestionsMap, resumeExamId, examId]);
  const question = isLargeExam ? largeQuestion : questions[current];

  useEffect(() => {
    if (started && !resumeExamId && !sessionQuestionIds.length && query.data?.items.length) {
      setSessionQuestionIds(query.data.items.map(item => item.id));
    }
  }, [started, resumeExamId, sessionQuestionIds.length, query.data?.items]);

  useEffect(() => {
    if (!resumeExam || !resumeExamId) return;
    const configuration = resumeExam.configuration as {
      families?: Family[];
      sectionId?: number | "all";
      includedSections?: number[];
      excludedSections?: number[];
      questionType?: QuestionType;
      questionOrder?: "listed" | "random";
      searchTerm?: string;
      excludedChapterKeys?: string[];
      mediaTags?: string[];
    };
    setExamId(resumeExam.id);
    setExamName(resumeExam.name);
    setFamilies(
      configuration.families?.length ? configuration.families : ["FRCEM"]
    );
    setSectionId(configuration.sectionId ?? "all");
    setIncludedSections(configuration.includedSections ?? []);
    setExcludedSections(configuration.excludedSections ?? []);
    setQuestionType(configuration.questionType ?? "all");
    setQuestionOrder(configuration.questionOrder ?? "listed");
    setSearchTerm(configuration.searchTerm ?? "");
    setExcludedChapterKeys(configuration.excludedChapterKeys ?? []);
    setMediaTags(configuration.mediaTags ?? []);
    setMode(resumeExam.mode === "test" ? "exam" : "study");
    setTimeMode(resumeExam.timeMode);
    setSelected((resumeExam.answers as Record<string, string>) ?? {});
    setResults(
      (resumeExam.results as Record<
        string,
        { correct: boolean; correctAnswer: string }
      >) ?? {}
    );
    setFlagged(new Set((resumeExam.flaggedQuestionIds as string[]) ?? []));
    setCurrent(
      Math.min(resumeExam.currentIndex ?? 0, resumeQuestionIds.length - 1)
    );
    setRemaining(
      resumeExam.remainingSeconds ??
        Math.ceil(resumeQuestionIds.length * 1.5) * 60
    );
    setQuestionCount(resumeQuestionIds.length || 10);
    setStarted(true);
    setPaused(false);
    setFinished(resumeExam.status === "completed");
  }, [resumeExam, resumeExamId, resumeQuestionIds.length]);

  useEffect(() => {
    if (!started || examId || (!sessionQuestionIds.length && !isLargeExam) || createExam.isPending) return;
    // For large exams, IDs are the source of truth - don't require full bodies.
    // For small exams keep fast path requiring loaded bodies.
    if (!isLargeExam && !questions.length) return;
    const idsForExam = frozenQuestionIds.length ? frozenQuestionIds : query.data?.items.map(i => i.id) ?? [];
    if (!idsForExam.length) return;
    void createExam
      .mutateAsync({
        name: examName || `${mode === "exam" ? "Test" : "Tutor"} session`,
        mode: mode === "exam" ? "test" : "tutor",
        timeMode,
        configuration: {
          families,
          sectionId,
          includedSections,
          excludedSections,
          questionType,
          questionOrder,
          searchTerm,
          excludedChapterKeys,
          mediaTags,
        },
        questionIds: idsForExam,
        remainingSeconds: timeMode === "timed" ? remaining : null,
      })
      .then(exam => setExamId(exam.id))
      .catch(error => {
        toast.error(error instanceof Error ? error.message : "Failed to create exam. Please retry.");
      });
  }, [
    started,
    examId,
    sessionQuestionIds.length,
    questions,
    frozenQuestionIds,
    isLargeExam,
    // query.data?.items is stable when not large
    query.data?.items,
    createExam,
    examName,
    mode,
    timeMode,
    families,
    sectionId,
    includedSections,
    excludedSections,
    questionType,
    questionOrder,
    searchTerm,
    excludedChapterKeys,
    mediaTags,
    remaining,
  ]);

  useEffect(() => {
    if (!started || timeMode !== "timed" || paused || finished) return;
    const timer = window.setInterval(
      () => setRemaining(value => (value > 0 ? value - 1 : 0)),
      1000
    );
    return () => window.clearInterval(timer);
  }, [started, timeMode, paused, finished]);
  useEffect(() => {
    if (
      started &&
      timeMode === "timed" &&
      remaining === 0 &&
      !finished &&
      questions.length
    )
      void gradeExam();
  }, [remaining]); // eslint-disable-line react-hooks/exhaustive-deps
  const totalQuestions = isLargeExam ? frozenQuestionIds.length : questions.length;
  const answeredCount = useMemo(() => {
    const ids = isLargeExam ? frozenQuestionIds : questions.map(q => q.id);
    return ids.reduce((sum, id) => sum + (selected[id] ? 1 : 0), 0);
  }, [isLargeExam, frozenQuestionIds, questions, selected]);
  const flaggedCount = useMemo(() => {
    const ids = isLargeExam ? frozenQuestionIds : questions.map(q => q.id);
    return ids.reduce((sum, id) => sum + (flagged.has(id) ? 1 : 0), 0);
  }, [isLargeExam, frozenQuestionIds, questions, flagged]);
  const unansweredCount = totalQuestions - answeredCount;
  const navigatorPageCount = Math.max(
    1,
    Math.ceil(totalQuestions / NAVIGATOR_PAGE_SIZE)
  );
  const [navigatorPage, setNavigatorPage] = useState(0);
  const [jumpDraft, setJumpDraft] = useState("");
  useEffect(() => {
    const page = Math.floor(current / NAVIGATOR_PAGE_SIZE);
    setNavigatorPage(previous => (previous === page ? previous : page));
  }, [current]);
  const navigatorItems = useMemo(() => {
    const start = Math.min(
      navigatorPage,
      navigatorPageCount - 1
    ) * NAVIGATOR_PAGE_SIZE;
    if (isLargeExam) {
      const idsSlice = frozenQuestionIds.slice(start, start + NAVIGATOR_PAGE_SIZE);
      return idsSlice
        .map((id, offset) => ({ item: { id } as { id: string }, index: start + offset }))
        .filter(
          ({ item }) =>
            goToFilter === "all" ||
            (goToFilter === "flagged"
              ? flagged.has(item.id)
              : !selected[item.id])
        );
    }
    return questions
      .slice(start, start + NAVIGATOR_PAGE_SIZE)
      .map((item, offset) => ({ item, index: start + offset }))
      .filter(
        ({ item }) =>
          goToFilter === "all" ||
          (goToFilter === "flagged"
            ? flagged.has(item.id)
            : !selected[item.id])
      );
  }, [isLargeExam, frozenQuestionIds, questions, navigatorPage, navigatorPageCount, goToFilter, flagged, selected]);
  const handleNavigatorClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    const target = (event.target as HTMLElement).closest("[data-qindex]");
    if (!target) return;
    goToQuestion(Number(target.getAttribute("data-qindex")));
  };
  const startSession = () => {
    if (!families.length || (questionType === "searched" && !searchTerm.trim())) return;
    setStarted(true);
    setFinished(false);
    setPaused(false);
    setCurrent(0);
    setSelected({});
    setResults({});
    setFlagged(new Set());
    setHighlighted(new Set());
    setStruck(new Set());
    setExamId(null);
    setSessionQuestionIds([]);
    setRemaining(minutes * 60);
    setShuffleKey(Math.floor(Math.random() * 2_000_000_000) + 1);
  };
  const toggleFamily = (family: Family) =>
    setFamilies(previous =>
      previous.includes(family)
        ? previous.filter(value => value !== family)
        : [...previous, family]
    );
  const resetForm = () => {
    setExamName("");
    setFamilies(["FRCEM"]);
    setSectionId("all");
    setIncludedSections([]);
    setExcludedSections([]);
    setMode("study");
    setQuestionType("all");
    setQuestionOrder("listed");
    setSearchTerm("");
    setExcludedChapterKeys([]);
    setTimeMode("untimed");
    setQuestionCount(10);
    setMinutes(15);
    setMediaTags([]);
  };
  const chooseOption = (key: string) => {
    if (!question || finished || (mode === "study" && results[question.id]))
      return;
    const markId = `${question.id}:${key}`;
    if (tool === "highlight")
      return setHighlighted(previous => {
        const next = new Set(previous);
        if (next.has(markId)) next.delete(markId);
        else next.add(markId);
        return next;
      });
    if (tool === "strike")
      return setStruck(previous => {
        const next = new Set(previous);
        if (next.has(markId)) next.delete(markId);
        else next.add(markId);
        return next;
      });
    setSelected(previous => ({ ...previous, [question.id]: key }));
  };
  const confirmStudyAnswer = async () => {
    if (!question || !selected[question.id]) return;
    try {
      const answer = await submitAnswer.mutateAsync({
        questionId: question.id,
        selectedAnswer: selected[question.id],
      });
      setResults(previous => ({ ...previous, [question.id]: answer }));
      await utils.residentContent.practiceSummary.invalidate();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to submit answer.");
    }
  };
  const saveExam = (
    status: "paused" | "completed",
    correct?: number,
    resultSnapshot = results
  ) => {
    if (!examId) return;
    void updateExam.mutateAsync({
      id: examId,
      status,
      answers: selected,
      results: resultSnapshot,
      flaggedQuestionIds: Array.from(flagged),
      currentIndex: current,
      remainingSeconds: timeMode === "timed" ? remaining : null,
      correctCount: correct ?? null,
    }).catch(error => {
      toast.error(error instanceof Error ? error.message : "Failed to save progress.");
    });
  };
  const markSkippedIfNeeded = (item = question) => {
    if (!item || selected[item.id]) return;
    void setQuestionState.mutateAsync({
      questionId: item.id,
      skipped: true,
    }).catch(() => {
      // Best-effort: skipped state is non-critical, avoid noisy toast.
    });
  };
  const goToQuestion = (index: number) => {
    markSkippedIfNeeded();
    const maxIdx = isLargeExam ? frozenQuestionIds.length - 1 : questions.length - 1;
    setCurrent(Math.max(0, Math.min(maxIdx, index)));
    if (examId) saveExam("paused");
  };
  async function gradeExam() {
    if (finished) return;
    setPaused(true);
    const graded: Record<string, { correct: boolean; correctAnswer: string }> =
      {};
    const idsToGrade = isLargeExam ? frozenQuestionIds : questions.map(q => q.id);
    for (const id of idsToGrade) {
      const answer = selected[id];
      if (answer)
        graded[id] = await submitAnswer.mutateAsync({
          questionId: id,
          selectedAnswer: answer,
        });
    }
    setResults(graded);
    setFinished(true);
    setPaused(false);
    saveExam(
      "completed",
      Object.values(graded).filter(item => item.correct).length,
      graded
    );
    await utils.residentContent.practiceSummary.invalidate();
  }
  const resetMarks = () => {
    if (!question) return;
    setHighlighted(
      previous =>
        new Set(
          Array.from(previous).filter(
            value => !value.startsWith(`${question.id}:`)
          )
        )
    );
    setStruck(
      previous =>
        new Set(
          Array.from(previous).filter(
            value => !value.startsWith(`${question.id}:`)
          )
        )
    );
    setTool("answer");
  };

  if (!started)
    return (
      <DashboardLayout>
        <main className="mx-auto max-w-6xl text-slate-100">
          <QbankNav />
          <header className="rounded-2xl border border-cyan-200/15 bg-slate-900/70 p-5">
            <div className="flex items-center gap-3">
              <ClipboardList className="text-cyan-300" />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                  <Bi t="practice.title" />
                </p>
                <h1 className="text-2xl font-black">Create New Study Session</h1>
              </div>
            </div>
            <p className="mt-3 text-xs text-amber-200">
              Under review · private educational pilot
            </p>
          </header>
          <section className="mt-5 grid gap-5 rounded-2xl border border-white/10 bg-slate-900/70 p-5 md:grid-cols-2">
            <label className="text-sm">
              <Bi t="practice.session.name" />
              <input
                value={examName}
                onChange={event => setExamName(event.target.value)}
                maxLength={100}
                placeholder="e.g. Cardiology revision 01"
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 p-3"
              />
            </label>
            <label className="text-sm">
              <Bi t="practice.session.count" />
              <input
                type="number"
                min={1}
                max={availableQuestionMax}
                value={questionCount}
                onChange={event => {
                  const count = Math.min(
                    availableQuestionMax,
                    Math.max(1, Number(event.target.value))
                  );
                  setQuestionCount(count);
                  setMinutes(Math.ceil(count * 1.5));
                }}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 p-3"
              />
              <span className="mt-1 block text-xs text-slate-400">
                {catalog.isLoading
                  ? "Loading bank sizes…"
                  : `Up to ${availableQuestionMax.toLocaleString()} questions in the selected banks.`}
              </span>
            </label>
            <label className="text-sm">
              <Bi t="practice.session.type" />
              <select
                value={mode}
                onChange={event => setMode(event.target.value as SessionMode)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 p-3"
              >
                <option value="study">Tutor — immediate feedback</option>
                <option value="exam">Test — grade at the end</option>
              </select>
            </label>
            <label className="text-sm">
              <Bi t="practice.session.order" />
              <select
                value={questionOrder}
                onChange={event => setQuestionOrder(event.target.value as "listed" | "random")}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 p-3"
              >
                <option value="listed">As listed</option>
                <option value="random">Random</option>
              </select>
            </label>
            <label className="text-sm">
              <Bi t="practice.session.time" />
              <select
                value={timeMode}
                onChange={event => setTimeMode(event.target.value as TimeMode)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 p-3"
              >
                <option value="untimed">Untimed</option>
                <option value="timed">Timed</option>
              </select>
            </label>
            {timeMode === "timed" ? (
              <label className="text-sm">
                <Bi t="practice.session.duration" />
                <input
                  type="number"
                  min={1}
                  max={300}
                  value={minutes}
                  onChange={event =>
                    setMinutes(Math.max(1, Number(event.target.value)))
                  }
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 p-3"
                />
                <span className="mt-1 block text-xs text-slate-400">
                  Recommended: 1.5 minutes per question.
                </span>
              </label>
            ) : (
              <div className="rounded-xl bg-emerald-300/5 p-4 text-sm text-emerald-100">
                No time restriction
              </div>
            )}
            <fieldset className="md:col-span-2">
              <legend className="text-lg font-bold">Question Selection</legend>
              <p className="mt-1 text-sm text-slate-400">Question source</p>
              <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {([
                  ["all", "All Questions", "Practice with all available questions"],
                  ["unused", "Unattempted Questions", "Questions you have not tried yet"],
                  ["incorrect", "Incorrectly Answered", "Questions you got wrong before"],
                  ["flagged", "Flagged Questions", "Questions marked for review"],
                  ["searched", "Searched Questions", "Find questions by keywords"],
                  ["skipped", "Skipped Questions", "Questions you skipped before"],
                ] as const).map(([value, label, description]) => (
                  <label key={value} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 ${questionType === value ? "border-cyan-300 bg-cyan-300/10" : "border-white/10 bg-slate-950/40"}`}>
                    <input type="radio" name="question-source" checked={questionType === value} onChange={() => setQuestionType(value)} className="mt-1 accent-cyan-400" />
                    <span><span className="block font-bold">{label}</span><span className="block text-xs text-slate-400">{description}</span></span>
                  </label>
                ))}
              </div>
              {questionType === "searched" ? (
                <input value={searchTerm} onChange={event => setSearchTerm(event.target.value)} maxLength={120} placeholder="Search question text or chapter" aria-label="Search questions" className="mt-3 w-full rounded-xl border border-white/10 bg-slate-950 p-3" />
              ) : null}
            </fieldset>
            <fieldset className="md:col-span-2">
              <legend className="text-lg font-bold">Select Question Banks / Chapters</legend>
              <p className="mb-3 mt-1 text-xs text-slate-400">Choose one or more banks. Open a bank to include or exclude its available chapters.</p>
              <div className="space-y-2">
                {BANKS.map(bank => {
                  const entry = catalog.data?.find(item => item.family === bank.value);
                  const expanded = expandedFamilies.includes(bank.value);
                  return (
                    <div key={bank.value} className="overflow-hidden rounded-xl border border-white/10 bg-slate-950/40">
                      <div className="flex items-center gap-3 p-3">
                        <input type="checkbox" aria-label={`Select ${bank.label}`} checked={families.includes(bank.value)} onChange={() => toggleFamily(bank.value)} className="h-4 w-4 accent-cyan-400" />
                        <button type="button" aria-expanded={expanded} onClick={() => setExpandedFamilies(previous => expanded ? previous.filter(value => value !== bank.value) : [...previous, bank.value])} className="flex min-w-0 flex-1 items-center justify-between gap-3 text-left">
                          <span className="font-bold"><Bi t={`bank.${bank.value}` as any} /></span>
                          <span className="shrink-0 text-xs text-slate-400">{entry?.count.toLocaleString() ?? "…"} questions · {entry?.chapters.length ?? "…"} chapters {expanded ? "⌃" : "⌄"}</span>
                        </button>
                      </div>
                      {expanded ? <div className="max-h-80 space-y-1 overflow-y-auto border-t border-white/10 p-2">
                        {entry?.chapters.map(chapter => {
                          const key = `${bank.value}:${chapter.chapterNumber}`;
                          return <label key={key} className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm hover:bg-white/5">
                            <span className="flex items-center gap-3"><input type="checkbox" checked={families.includes(bank.value) && !excludedChapterKeys.includes(key)} onChange={() => { if (!families.includes(bank.value)) setFamilies(previous => [...previous, bank.value]); setExcludedChapterKeys(previous => previous.includes(key) ? previous.filter(value => value !== key) : [...previous, key]); }} className="accent-cyan-400" />{chapter.chapterTitle}</span>
                            <span className="shrink-0 text-xs text-slate-400">{chapter.count} Qs</span>
                          </label>;
                        })}
                      </div> : null}
                    </div>
                  );
                })}
              </div>
              {!families.length ? <p className="mt-2 text-xs text-rose-300">Select at least one question bank.</p> : null}
            </fieldset>
            <label className="text-sm">
              Categories
              <select
                value={sectionId}
                onChange={event =>
                  setSectionId(
                    event.target.value === "all"
                      ? "all"
                      : Number(event.target.value)
                  )
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 p-3"
              >
                <option value="all">Include all medical categories</option>
                {RESIDENT_PATHWAY_SECTIONS.map(([id, title]) => (
                  <option key={id} value={id}>
                    {id}. {title}
                  </option>
                ))}
              </select>
            </label>
            <fieldset className="md:col-span-2">
              <legend className="text-sm">Include / Exclude Sections</legend>
              <div className="mt-2 grid max-h-72 gap-2 overflow-auto rounded-xl border border-white/10 p-3 sm:grid-cols-2 lg:grid-cols-3">
                {RESIDENT_PATHWAY_SECTIONS.map(([id, title]) => {
                  const state = includedSections.includes(id)
                    ? "include"
                    : excludedSections.includes(id)
                      ? "exclude"
                      : "neutral";
                  return (
                    <div
                      key={id}
                      className="grid grid-cols-[1fr_auto] items-center gap-2 rounded-lg bg-white/[.025] p-2"
                    >
                      <span className="text-xs">
                        {id}. {title}
                      </span>
                      <select
                        aria-label={`Section ${id} filter`}
                        value={state}
                        onChange={event => {
                          const next = event.target.value;
                          setIncludedSections(previous =>
                            next === "include"
                              ? previous.includes(id)
                                ? previous
                                : [...previous, id]
                              : previous.filter(value => value !== id)
                          );
                          setExcludedSections(previous =>
                            next === "exclude"
                              ? previous.includes(id)
                                ? previous
                                : [...previous, id]
                              : previous.filter(value => value !== id)
                          );
                        }}
                        className="rounded-md border border-white/10 bg-slate-950 px-2 py-1 text-xs"
                      >
                        <option value="neutral">Any</option>
                        <option value="include">Include</option>
                        <option value="exclude">Exclude</option>
                      </select>
                    </div>
                  );
                })}
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm">Content Tags</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {["Vignette Image", "ECG", "X-ray", "Clinical Photo"].map(
                  tag => (
                    <label
                      key={tag}
                      className={`cursor-pointer rounded-lg border px-3 py-2 text-xs ${mediaTags.includes(tag) ? "border-cyan-300 bg-cyan-300/10" : "border-white/10"}`}
                    >
                      <input
                        className="sr-only"
                        type="checkbox"
                        checked={mediaTags.includes(tag)}
                        onChange={() =>
                          setMediaTags(previous =>
                            previous.includes(tag)
                              ? previous.filter(value => value !== tag)
                              : [...previous, tag]
                          )
                        }
                      />
                      {tag}
                    </label>
                  )
                )}
              </div>
              <p className="mt-2 text-[10px] text-slate-500">
                Visual filtering activates as indexed media assets are attached.
              </p>
            </fieldset>
          </section>
          <div className="mt-5 flex justify-end gap-3">
            <button
              onClick={resetForm}
              className="rounded-xl border border-white/15 px-5 py-3 text-sm font-bold"
            >
              RESET
            </button>
            <button
              disabled={!families.length || (questionType === "searched" && !searchTerm.trim())}
              onClick={startSession}
              className="rounded-xl bg-cyan-500 px-6 py-3 font-black text-slate-950 disabled:opacity-40"
            >
              <Bi t="practice.start.session" />
            </button>
          </div>
        </main>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <main className="mx-auto max-w-6xl space-y-4 text-slate-100">
        <QbankNav />
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-900/80 p-3">
          <div>
            <p className="text-xs font-bold text-cyan-300">
              {families.map(value => <Bi t={`bank.${value}`} key={value} />).reduce((acc: React.ReactNode, el) => acc ? <>{acc}<span> + </span>{el}</> : el, null)}
            </p>
            <b>{examName || `${mode === "exam" ? "Test" : "Tutor"} session`}</b>
          </div>
          <div className="flex flex-wrap items-center gap-1">
            <button
              onClick={() => setTool("highlight")}
              aria-pressed={tool === "highlight"}
              className={`rounded-lg p-2 ${tool === "highlight" ? "bg-yellow-300 text-slate-950" : "bg-white/5"}`}
              title="Highlight"
            >
              <Highlighter className="h-4 w-4" />
            </button>
            <button
              onClick={() => setTool("strike")}
              aria-pressed={tool === "strike"}
              className={`rounded-lg p-2 ${tool === "strike" ? "bg-rose-300 text-slate-950" : "bg-white/5"}`}
              title="Strike"
            >
              <Strikethrough className="h-4 w-4" />
            </button>
            <button
              onClick={resetMarks}
              className="rounded-lg bg-white/5 p-2"
              title="Erase"
            >
              <Eraser className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                if (question) {
                  const nextFlagged = !flagged.has(question.id);
                  setFlagged(previous => {
                    const next = new Set(previous);
                    if (next.has(question.id)) next.delete(question.id);
                    else next.add(question.id);
                    return next;
                  });
                  void setQuestionState.mutateAsync({
                    questionId: question.id,
                    flagged: nextFlagged,
                    skipped: false,
                  });
                }
              }}
              className={`rounded-lg p-2 ${question && flagged.has(question.id) ? "bg-amber-300 text-slate-950" : "bg-white/5"}`}
              title="Flag"
            >
              <Flag className="h-4 w-4" />
            </button>
            <div className="relative">
              <button
                onClick={() => setShowLabs(value => !value)}
                className="rounded-lg bg-white/5 p-2"
                title="Normal lab values"
              >
                <FlaskConical className="h-4 w-4" />
              </button>
              {showLabs ? (
                <div className="absolute right-0 top-12 z-30 w-[min(18rem,calc(100vw-1rem))] max-w-[calc(100vw-1rem)] rounded-2xl border border-cyan-200/20 bg-slate-950 p-4 shadow-2xl">
                  <b className="text-sm">Normal Lab Values</b>
                  <div className="mt-3 space-y-2">
                    {LAB_VALUES.map(([name, value]) => (
                      <div
                        key={name}
                        className="flex justify-between gap-3 text-xs"
                      >
                        <span className="text-cyan-200">{name}</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="relative">
              <button
                onClick={() => setShowCalc(value => !value)}
                className="rounded-lg bg-white/5 p-2"
                title="Calculator"
              >
                <Calculator className="h-4 w-4" />
              </button>
              {showCalc ? (
                <MiniCalculator onClose={() => setShowCalc(false)} />
              ) : null}
            </div>
          </div>
          {mode === "exam" ? (
            <div className="flex items-center gap-2">
              <b
                className={`font-mono text-xl ${remaining < 60 ? "text-rose-300" : "text-cyan-200"}`}
              >
                {formatTime(remaining)}
              </b>
              <button
                onClick={() => setPaused(value => !value)}
                disabled={finished}
                className="flex items-center gap-1 rounded-lg bg-white/5 px-3 py-2 text-xs"
              >
                {paused ? (
                  <Play className="h-4 w-4" />
                ) : (
                  <Pause className="h-4 w-4" />
                )}
                {paused ? "RESUME" : "PAUSE EXAM"}
              </button>
            </div>
          ) : null}
        </header>
        <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-4" aria-label="Question navigator">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <b className="text-sm">
              Q {totalQuestions ? current + 1 : 0} / {totalQuestions}
            </b>
            <span className="text-xs font-bold text-emerald-200">
              Answered {answeredCount}
            </span>
            <span className="text-xs text-slate-400">
              Unanswered {unansweredCount}
            </span>
            <span className="text-xs font-bold text-amber-200">
              Flagged {flaggedCount}
            </span>
            <form
              className="flex items-center gap-2"
              onSubmit={event => {
                event.preventDefault();
                if (!jumpDraft.trim() || !totalQuestions) return;
                goToQuestion(
                  Math.min(
                    totalQuestions,
                    Math.max(1, Number(jumpDraft))
                  ) - 1
                );
                setJumpDraft("");
              }}
            >
              <label htmlFor="navigator-jump" className="text-xs text-slate-400">
                Jump to
              </label>
              <input
                id="navigator-jump"
                value={jumpDraft}
                onChange={event => setJumpDraft(event.target.value)}
                inputMode="numeric"
                placeholder={`1-${totalQuestions || 1}`}
                className="w-20 rounded-lg border border-white/10 bg-slate-950 px-2 py-1.5 text-xs"
              />
              <button
                type="submit"
                className="rounded-lg bg-white/5 px-3 py-1.5 text-xs font-bold"
              >
                Go
              </button>
            </form>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <b className="mr-2 text-sm">Go To</b>
            {(["all", "flagged", "not-attempted"] as GoToFilter[]).map(
              value => (
                <button
                  key={value}
                  onClick={() => setGoToFilter(value)}
                  className={`rounded-lg px-3 py-1.5 text-xs capitalize ${goToFilter === value ? "bg-cyan-500 font-bold text-slate-950" : "bg-white/5"}`}
                >
                  {value.replace("-", " ")}
                </button>
              )
            )}
          </div>
          {navigatorPageCount > 1 ? (
            <div className="mt-3 flex flex-wrap gap-1" aria-label="Question ranges">
              {Array.from({ length: navigatorPageCount }, (_, page) => {
                const start = page * NAVIGATOR_PAGE_SIZE + 1;
                const end = Math.min(
                  totalQuestions,
                  (page + 1) * NAVIGATOR_PAGE_SIZE
                );
                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setNavigatorPage(page)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold ${Math.min(navigatorPage, navigatorPageCount - 1) === page ? "bg-cyan-500 text-slate-950" : "bg-white/5 text-slate-300"}`}
                  >
                    {start}-{end}
                  </button>
                );
              })}
            </div>
          ) : null}
          <div className="mt-3 flex flex-wrap gap-1" onClick={handleNavigatorClick}>
            {navigatorItems.length ? (
              navigatorItems.map(({ item, index }) => {
                const itemResult = results[item.id];
                return (
                  <NavigatorButton
                    key={item.id}
                    index={index}
                    variant={
                      itemResult
                        ? itemResult.correct
                          ? "correct"
                          : "incorrect"
                        : selected[item.id]
                          ? "selected"
                          : "idle"
                    }
                    isCurrent={current === index}
                    isFlagged={flagged.has(item.id)}
                  />
                );
              })
            ) : (
              <p className="text-xs text-slate-400">
                No questions in this range match the current filter.
              </p>
            )}
          </div>
        </section>
        {query.isError || (!isLargeExam && frozenQuestionsQuery.isError) || smartWindowError ? (
          <div className="rounded-2xl border border-rose-300/20 bg-rose-300/5 p-6 text-sm text-rose-100">
            <Bi t="practice.error.load" /> <button onClick={() => setStarted(false)} className="ml-2 underline"><Bi t="practice.reset.all" /></button>
          </div>
        ) : !query.isLoading && (isLargeExam ? !smartWindowData && !smartWindowLoading : !frozenQuestionsQuery.isLoading) && !examsQuery.isLoading && !question ? (
          <div className="rounded-2xl border border-amber-300/20 bg-amber-300/5 p-6 text-sm text-amber-100">
            <Bi t="practice.no.match.filter" /> <button onClick={() => setStarted(false)} className="ml-2 underline"><Bi t="practice.reset.all" /></button>
          </div>
        ) : query.isLoading || (!isLargeExam && frozenQuestionsQuery.isLoading) || (isLargeExam && smartWindowLoading) || examsQuery.isLoading || !question ? (
          <div className="flex min-h-80 items-center justify-center">
            <LoaderCircle className="animate-spin text-cyan-300" />
          </div>
        ) : (
          <article
            className={`rounded-2xl border border-white/10 bg-slate-900/70 p-5 ${paused ? "pointer-events-none select-none blur-sm" : ""}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-black text-cyan-200">
                Question {current + 1} (of {totalQuestions})
              </p>
              <p className="text-xs text-slate-400">
                {question.chapterTitle} · Source Q
                {question.sourceQuestionNumber}
              </p>
            </div>
            <h1 className="mt-5 text-lg font-semibold leading-8">
              {question.question}
            </h1>
            <div className="mt-5 grid gap-3">
              {question.options.map(option => {
                const markId = `${question.id}:${option.key}`;
                const answeredResult = results[question.id];
                const isCorrectChoice = Boolean(
                  answeredResult && option.key === answeredResult.correctAnswer
                );
                const isWrongChoice = Boolean(
                  answeredResult &&
                    !answeredResult.correct &&
                    selected[question.id] === option.key
                );
                const optionClasses = answeredResult
                  ? isCorrectChoice
                    ? "border-emerald-300/70 bg-emerald-300/15"
                    : isWrongChoice
                      ? "border-rose-300/70 bg-rose-300/15"
                      : "border-white/10 bg-white/[.025]"
                  : selected[question.id] === option.key
                    ? "border-cyan-300 bg-cyan-300/10"
                    : "border-white/10 bg-white/[.025]";
                return (
                  <button
                    key={option.key}
                    onClick={() => chooseOption(option.key)}
                    className={`rounded-xl border p-4 text-left transition ${optionClasses} ${highlighted.has(markId) ? "ring-2 ring-yellow-300 bg-yellow-300/10" : ""} ${struck.has(markId) ? "opacity-45 line-through" : ""}`}
                  >
                    <b
                      className={`mr-3 ${isCorrectChoice ? "text-emerald-300" : isWrongChoice ? "text-rose-300" : "text-cyan-300"}`}
                    >
                      {option.key}
                    </b>
                    {option.text}
                    {isCorrectChoice ? (
                      <CheckCircle2 className="ml-2 inline h-4 w-4 text-emerald-300" />
                    ) : null}
                    {isWrongChoice ? (
                      <XCircle className="ml-2 inline h-4 w-4 text-rose-300" />
                    ) : null}
                  </button>
                );
              })}
            </div>
            {mode === "study" && !results[question.id] ? (
              <button
                disabled={!selected[question.id] || submitAnswer.isPending}
                onClick={() => void confirmStudyAnswer()}
                className="mt-5 rounded-xl bg-cyan-500 px-5 py-2.5 font-bold text-slate-950 disabled:opacity-40"
              >
                CONFIRM ANSWER
              </button>
            ) : null}
            {results[question.id] ? (
              <div
                className={`mt-5 rounded-xl border p-5 ${results[question.id].correct ? "border-emerald-300/20 bg-emerald-300/5" : "border-rose-300/20 bg-rose-300/5"}`}
              >
                <p
                  className={`flex items-center gap-2 font-bold ${results[question.id].correct ? "text-emerald-200" : "text-rose-200"}`}
                >
                  {results[question.id].correct ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <XCircle className="h-5 w-5" />
                  )}
                  {results[question.id].correct ? "Correct" : "Incorrect"}
                </p>
                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <section>
                    <h2 className="text-xs font-black uppercase tracking-widest text-cyan-300">
                      Explanation
                    </h2>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-300">
                      {question.englishExplanation}
                    </p>
                  </section>
                  <section>
                    <h2 className="text-xs font-black uppercase tracking-widest text-cyan-300">
                      Quick review
                    </h2>
                    <p className="mt-2 text-sm font-semibold">
                      Correct answer: {results[question.id].correctAnswer}
                    </p>
                    <h2 className="mt-4 text-xs font-black uppercase tracking-widest text-cyan-300">
                      الشرح العربي المبسط
                    </h2>
                    {question.arabicExplanation || translatedArabic[question.id] ? (
                      <>
                        <p
                          dir="rtl"
                          className="mt-2 whitespace-pre-wrap text-right text-sm leading-7"
                        >
                          {translatedArabic[question.id] ?? question.arabicExplanation}
                        </p>
                        {translatedArabic[question.id] ||
                        (question as { arabicExplanationSource?: string }).arabicExplanationSource === "on-demand" ? (
                          <p className="mt-2 inline-block rounded-full bg-amber-300/10 px-2.5 py-1 text-[10px] font-bold text-amber-200">
                            ترجمة آلية · بانتظار المراجعة
                          </p>
                        ) : null}
                      </>
                    ) : (
                      <div className="mt-2">
                        <p className="text-sm text-slate-400">
                          قيد إعداد الملخص العربي ومراجعته.
                        </p>
                        {arabicAvailability.data?.available ? (
                          <>
                            <button
                              type="button"
                              disabled={translateArabic.isPending}
                              onClick={() =>
                                void (async () => {
                                  setTranslateArabicError(previous => ({
                                    ...previous,
                                    [question.id]: "",
                                  }));
                                  try {
                                    const result =
                                      await translateArabic.mutateAsync({
                                        questionId: question.id,
                                      });
                                    if (result.text) {
                                      setTranslatedArabic(previous => ({
                                        ...previous,
                                        [question.id]: result.text,
                                      }));
                                    }
                                  } catch {
                                    setTranslateArabicError(previous => ({
                                      ...previous,
                                      [question.id]:
                                        "تعذر إنشاء الترجمة. حاول لاحقًا.",
                                    }));
                                  }
                                })()
                              }
                              className="mt-2 rounded-lg border border-cyan-200/20 px-3 py-2 text-xs font-bold text-cyan-100 disabled:opacity-40"
                            >
                              {translateArabic.isPending
                                ? "جارٍ الترجمة…"
                                : "ترجم الآن"}
                            </button>
                            {translateArabicError[question.id] ? (
                              <p role="alert" className="mt-2 text-xs text-rose-200">
                                {translateArabicError[question.id]}
                              </p>
                            ) : null}
                          </>
                        ) : null}
                      </div>
                    )}
                  </section>
                </div>
                <form
                  onSubmit={async event => {
                    event.preventDefault();
                    if (!issueDraft.trim()) return;
                    await reportIssue.mutateAsync({
                      questionId: question.id,
                      issueType: "other",
                      details: issueDraft,
                    });
                    setIssueDraft("");
                  }}
                  className="mt-5 rounded-xl border border-white/10 bg-slate-950/40 p-3"
                >
                  <label className="text-xs font-bold text-amber-200">
                    Report question issue
                    <textarea
                      value={issueDraft}
                      onChange={event => setIssueDraft(event.target.value)}
                      rows={2}
                      placeholder="Wrong answer, outdated guideline, unclear explanation..."
                      className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950 p-2 text-sm font-normal text-slate-100"
                    />
                  </label>
                  <button
                    disabled={reportIssue.isPending || !issueDraft.trim()}
                    className="mt-2 rounded-lg bg-amber-300 px-3 py-2 text-xs font-black text-slate-950 disabled:opacity-40"
                  >
                    SEND REPORT
                  </button>
                  {reportIssue.isSuccess && !issueDraft ? (
                    <span className="ml-3 text-xs text-emerald-200">
                      Report saved.
                    </span>
                  ) : null}
                </form>
              </div>
            ) : null}
          </article>
        )}
        <footer className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-900/80 p-3">
          <button
            disabled={current === 0}
            onClick={() => goToQuestion(current - 1)}
            className="flex items-center gap-1 rounded-lg bg-white/5 px-4 py-2 disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>
          <div className="flex items-center gap-2">
            {mode === "exam" && !finished ? (
              <button
                onClick={() => void gradeExam()}
                disabled={submitAnswer.isPending || !questions.length}
                className="rounded-lg bg-rose-500 px-4 py-2 text-sm font-black"
              >
                GRADE EXAM
              </button>
            ) : null}
            <button
              onClick={() => {
                if (!finished) saveExam("paused");
                navigate("/practice/exams");
                setStarted(false);
              }}
              className="rounded-lg bg-white/5 px-4 py-2 text-sm"
            >
              End session
            </button>
          </div>
          <button
            disabled={current >= questions.length - 1}
            onClick={() => goToQuestion(current + 1)}
            className="flex items-center gap-1 rounded-lg bg-cyan-500 px-4 py-2 font-bold text-slate-950 disabled:opacity-30"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </footer>
        {finished ? (
          <section className="rounded-2xl border border-cyan-200/20 bg-cyan-300/5 p-5">
            <div className="text-center">
              <p className="text-sm text-slate-300">Exam complete</p>
              <p className="mt-1 text-3xl font-black text-cyan-200">
                {Object.values(results).filter(item => item.correct).length} /{" "}
                {questions.length}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                {questions.length - Object.keys(results).length} not attempted
              </p>
            </div>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {(["all", "correct", "incorrect", "skipped"] as const).map(
                value => (
                  <button
                    key={value}
                    onClick={() => setReviewFilter(value)}
                    className={`rounded-lg px-3 py-2 text-xs capitalize ${reviewFilter === value ? "bg-cyan-500 font-bold text-slate-950" : "bg-white/5"}`}
                  >
                    {value}
                  </button>
                )
              )}
            </div>
            <div className="mt-5 grid gap-2">
              {questions
                .map((item, index) => ({
                  item,
                  index,
                  result: results[item.id],
                }))
                .filter(({ result }) => {
                  if (reviewFilter === "correct") return result?.correct;
                  if (reviewFilter === "incorrect")
                    return result && !result.correct;
                  if (reviewFilter === "skipped") return !result;
                  return true;
                })
                .map(({ item, index, result }) => (
                  <button
                    key={item.id}
                    onClick={() => goToQuestion(index)}
                    className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-slate-950/50 p-3 text-left text-sm"
                  >
                    <span>
                      <b>Q{index + 1}</b> · {item.chapterTitle}
                    </span>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-bold ${!result ? "bg-amber-300/10 text-amber-200" : result.correct ? "bg-emerald-300/10 text-emerald-200" : "bg-rose-300/10 text-rose-200"}`}
                    >
                      {!result
                        ? "Skipped"
                        : result.correct
                          ? "Correct"
                          : "Incorrect"}
                    </span>
                  </button>
                ))}
            </div>
          </section>
        ) : null}
        <span className="sr-only">
          Overall practice accuracy:{" "}
          {summary.data?.attempted
            ? Math.round((summary.data.correct / summary.data.attempted) * 100)
            : 0}
          %
        </span>
      </main>
    </DashboardLayout>
  );
}
