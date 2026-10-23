/**
 * Offline tRPC-compatible facade.
 * Exposes the same router/procedure/useQuery/useMutation/useUtils shape the
 * pages already use, implemented directly over @tanstack/react-query against
 * the on-device procedures (procedures.ts). No HTTP, no transformer.
 *
 * client/src/lib/trpc.ts swaps this in when isOfflineMode() is true.
 * main.tsx skips the tRPC client/Provider in that case.
 */
import {
  useMutation,
  useQueries as useTanStackQueries,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import {
  accountProcedures,
  authProcedures,
  journalNotesProcedures,
  learningProgressProcedures,
  libraryProcedures,
  qbankProcedures,
  residentContentProcedures,
  revisionProgressProcedures,
  studyPlanProcedures,
} from "./procedures";

type QueryKey = readonly unknown[];

function queryKeyFor(path: string[], input: unknown): QueryKey {
  return ["offline", ...path, input === undefined ? null : input];
}

type QueryHook<TInput, TData> = (
  input: TInput,
  opts?: Omit<UseQueryOptions<TData, Error, TData, QueryKey>, "queryKey" | "queryFn">
) => ReturnType<typeof useQuery<TData, Error, TData, QueryKey>>;

type MutationHook<TInput, TData> = (
  opts?: Omit<UseMutationOptions<TData, Error, TInput>, "mutationFn">
) => ReturnType<typeof useMutation<TData, Error, TInput>>;

type QueryOptionsShape<TData> = {
  queryKey: QueryKey;
  queryFn: () => Promise<TData>;
};

type QueryNode<TInput, TData> = {
  /** Direct call (tRPC v11 useQueries mapper style) returns query options. */
  (input: TInput): QueryOptionsShape<TData>;
  useQuery: QueryHook<TInput, TData>;
  queryOptions: (input: TInput, opts?: object) => QueryOptionsShape<TData> & Record<string, unknown>;
};

function makeQuery<TInput, TData>(path: string[], handler: (input: TInput) => Promise<TData>): QueryNode<TInput, TData> {
  const options = (input: TInput, opts?: object) => ({
    queryKey: queryKeyFor(path, input),
    queryFn: () => handler(input),
    ...opts,
  });
  const node = ((input: TInput) => options(input)) as QueryNode<TInput, TData>;
  // Named use* so react-hooks/rules-of-hooks accepts the hook call below.
  const useNodeQuery: QueryNode<TInput, TData>["useQuery"] = (input, opts) =>
    useQuery<TData, Error, TData, QueryKey>({
      ...options(input),
      ...opts,
    });
  node.useQuery = useNodeQuery;
  node.queryOptions = (input, opts) => options(input, opts);
  return node;
}

function makeMutation<TInput, TData>(handler: (input: TInput) => Promise<TData>): {
  useMutation: MutationHook<TInput, TData>;
} {
  return {
    useMutation: opts =>
      useMutation<TData, Error, TInput>({
        mutationFn: input => handler(input),
        ...opts,
      }),
  };
}

type UtilsLeaf = {
  invalidate: (input?: unknown) => Promise<void>;
  setData: (input: unknown, updater: unknown) => void;
  getData: (input?: unknown) => unknown;
  refetch: (input?: unknown) => Promise<unknown>;
};

function useOfflineUtils(): unknown {
  const queryClient = useQueryClient();
  const leaf = (path: string[]): UtilsLeaf => ({
    invalidate: input => queryClient.invalidateQueries({ queryKey: queryKeyFor(path, input) }),
    setData: (input, updater) => {
      queryClient.setQueryData(queryKeyFor(path, input), updater);
    },
    getData: input => queryClient.getQueryData(queryKeyFor(path, input)),
    refetch: input => queryClient.refetchQueries({ queryKey: queryKeyFor(path, input) }).then(() => undefined),
  });
  const build = (path: string[]): unknown =>
    new Proxy(leaf(path), {
      get: (target, prop, receiver) => {
        if (typeof prop === "string" && !(prop in target)) return build([...path, prop]);
        return Reflect.get(target, prop, receiver);
      },
    });
  return build([]);
}

/**
 * Batch queries (tRPC v11 useQueries mapper style):
 *   trpc.useQueries(t => chunks.map(ids => t.residentContent.questionsByIds({ questionIds: ids })))
 * Each mapped call returns query options executed here via TanStack.
 */
function useOfflineQueries(mapper: (t: any) => Array<{ queryKey: QueryKey; queryFn: () => Promise<any> }>) {
  const queries = mapper(offlineTrpc);
  return useTanStackQueries({
    queries: queries.map(options => ({ ...options })),
  });
}

const q = <TInput, TData>(path: string[], handler: (input: TInput) => Promise<TData>) => makeQuery(path, handler);
const m = <TInput, TData>(handler: (input: TInput) => Promise<TData>) => makeMutation(handler);

export const offlineTrpc = {
  useUtils: () => useOfflineUtils(),
  useQueries: useOfflineQueries,
  auth: {
    me: q(["auth", "me"], authProcedures.me),
    login: m(authProcedures.login),
    register: m(authProcedures.register),
    verifyEmail: m(authProcedures.verifyEmail),
    resendVerification: m(authProcedures.resendVerification),
    logout: m(authProcedures.logout),
  },
  account: {
    profile: q(["account", "profile"], accountProcedures.profile),
    updateProfile: m(accountProcedures.updateProfile),
  },
  learningProgress: {
    current: q(["learningProgress", "current"], learningProgressProcedures.current),
    set: m(learningProgressProcedures.set),
  },
  revisionProgress: {
    current: q(["revisionProgress", "current"], revisionProgressProcedures.current),
    set: m(revisionProgressProcedures.set),
    importLocal: m(revisionProgressProcedures.importLocal),
  },
  studyPlan: {
    today: q(["studyPlan", "today"], studyPlanProcedures.today),
    taskCompletions: q(["studyPlan", "taskCompletions"], studyPlanProcedures.taskCompletions),
    completeTask: m(studyPlanProcedures.completeTask),
    current: q(["studyPlan", "current"], studyPlanProcedures.current),
    save: m(studyPlanProcedures.save),
  },
  qbank: {
    exams: q(["qbank", "exams"], qbankProcedures.exams),
    history: q(["qbank", "history"], qbankProcedures.history),
    createExam: m(qbankProcedures.createExam),
    updateExam: m(qbankProcedures.updateExam),
    setQuestionState: m(qbankProcedures.setQuestionState),
    reportIssue: m(qbankProcedures.reportIssue),
    examBatch: q(["qbank", "examBatch"], qbankProcedures.examBatch),
    examWindow: q(["qbank", "examWindow"], qbankProcedures.examWindow),
  },
  journalNotes: {
    list: q(["journalNotes", "list"], journalNotesProcedures.list),
    create: m(journalNotesProcedures.create),
    update: m(journalNotesProcedures.update),
    delete: m(journalNotesProcedures.delete),
  },
  library: {
    references: q(["library", "references"], libraryProcedures.references),
    osceStations: q(["library", "osceStations"], libraryProcedures.osceStations),
    flashcards: q(["library", "flashcards"], libraryProcedures.flashcards),
    examTraps: q(["library", "examTraps"], libraryProcedures.examTraps),
    topicFamilies: q(["library", "topicFamilies"], libraryProcedures.topicFamilies),
    chapterStudyMap: q(["library", "chapterStudyMap"], libraryProcedures.chapterStudyMap),
    recoveryReviewQueue: q(["library", "recoveryReviewQueue"], libraryProcedures.recoveryReviewQueue),
  },
  residentContent: {
    chapters: q(["residentContent", "chapters"], residentContentProcedures.chapters),
    studyChapter: q(["residentContent", "studyChapter"], residentContentProcedures.studyChapter),
    questionCatalog: q(["residentContent", "questionCatalog"], residentContentProcedures.questionCatalog),
    sessionQuestions: q(["residentContent", "sessionQuestions"], residentContentProcedures.sessionQuestions),
    questions: q(["residentContent", "questions"], residentContentProcedures.questions),
    questionsByIds: q(["residentContent", "questionsByIds"], residentContentProcedures.questionsByIds),
    questionsBatch: q(["residentContent", "questionsBatch"], residentContentProcedures.questionsBatch),
    arabicTranslationAvailability: q(
      ["residentContent", "arabicTranslationAvailability"],
      residentContentProcedures.arabicTranslationAvailability
    ),
    translateArabicExplanation: m(residentContentProcedures.translateArabicExplanation),
    studyProgress: q(["residentContent", "studyProgress"], residentContentProcedures.studyProgress),
    saveStudyProgress: m(residentContentProcedures.saveStudyProgress),
    practiceSummary: q(["residentContent", "practiceSummary"], residentContentProcedures.practiceSummary),
    performanceSummary: q(["residentContent", "performanceSummary"], residentContentProcedures.performanceSummary),
    submitAnswer: m(residentContentProcedures.submitAnswer),
  },
};
