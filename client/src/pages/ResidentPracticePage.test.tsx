import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import ResidentPracticePage from "./ResidentPracticePage";

const store = vi.hoisted(() => ({ count: 500 }));

vi.mock("@/components/DashboardLayout", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <main>{children}</main>
  ),
}));

vi.mock("@/components/QbankNav", () => ({
  default: () => <nav>QbankNav</nav>,
}));

vi.mock("@/lib/trpc", () => {
  function buildItems(count: number) {
    return Array.from({ length: count }, (_, index) => ({
      id: `frcem-test-q-${index + 1}`,
      family: "FRCEM",
      chapterNumber: 1,
      chapterTitle: "Test Chapter",
      sourceQuestionNumber: index + 1,
      question: `Test question ${index + 1}?`,
      options: [
        { key: "A", text: "Option A" },
        { key: "B", text: "Option B" },
      ],
      correctAnswerKey: "A",
      correctAnswer: "Option A",
      englishExplanation: "Because A.",
      arabicExplanation: "",
      references: [],
      governanceStatus: "under-review",
    }));
  }

  function buildExam(count: number) {
    const ids = Array.from(
      { length: count },
      (_, index) => `frcem-test-q-${index + 1}`
    );
    return {
      id: "resume-1",
      name: "Resume exam",
      mode: "tutor",
      timeMode: "untimed",
      configuration: {
        families: ["FRCEM"],
        sectionId: "all",
        includedSections: [],
        excludedSections: [],
        questionType: "all",
        questionOrder: "listed",
        searchTerm: "",
        excludedChapterKeys: [],
        mediaTags: [],
      },
      questionIds: ids,
      answers: {},
      results: {},
      flaggedQuestionIds: [],
      currentIndex: 0,
      remainingSeconds: 3600,
      status: "paused",
    };
  }

  // Real React Query caches data by key, so identities stay stable across
  // renders. Plain mock factories rebuild on every render; fresh identities
  // retrigger the resume effect endlessly. Cache by requested size instead.
  const cache: { count: number; items: any[]; exam: any; catalog: any[] } = {
    count: -1,
    items: [],
    exam: null,
    catalog: [],
  };
  function synced() {
    if (cache.count !== store.count) {
      cache.count = store.count;
      cache.items = buildItems(store.count);
      cache.exam = buildExam(store.count);
      cache.catalog = [
        {
          family: "FRCEM",
          count: store.count,
          chapters: [
            {
              chapterNumber: 1,
              chapterTitle: "Test Chapter",
              count: store.count,
            },
          ],
        },
      ];
    }
    return cache;
  }
  // Static responses are shared constants: fresh literals per render would
  // change identities and retrigger effects that depend on query data.
  const STATIC_EMPTY_LIST = { data: [] };
  const STATIC_PRACTICE = { data: { attempted: 0, correct: 0 } };
  const STATIC_EMPTY_SESSION = { data: { items: [], total: 0 } };
  const STATIC_NO_ARABIC = { data: { available: false } };
  const STATIC_ACCOUNT = {
    data: {
      user: { name: "Tester" },
      learningProfile: { trainingLevel: "pgy1" },
    },
  };
  const questionsByIdsData = (questionIds: string[]) => ({
    data: synced().items.filter((item: { id: string }) =>
      questionIds.includes(item.id)
    ),
    isLoading: false,
    isError: false,
  });
  return {
    trpc: {
      useQueries: (cb: (t: any) => any[]) =>
        cb({
          residentContent: {
            questionsByIds: (input: { questionIds: string[] }) =>
              questionsByIdsData(input.questionIds),
          },
        }),
      residentContent: {
      practiceSummary: { useQuery: () => STATIC_PRACTICE },
      chapters: { useQuery: () => STATIC_EMPTY_LIST },
      studyProgress: { useQuery: () => STATIC_EMPTY_LIST },
      questionCatalog: {
        useQuery: () => ({ data: synced().catalog }),
      },
      sessionQuestions: { useQuery: () => STATIC_EMPTY_SESSION },
      questionsByIds: {
        useQuery: ({ questionIds }: { questionIds: string[] }) =>
          questionsByIdsData(questionIds),
      },
      arabicTranslationAvailability: { useQuery: () => STATIC_NO_ARABIC },
      translateArabicExplanation: { useMutation: () => ({ mutateAsync: vi.fn() }) },
      questionsBatch: {
        useQuery: ({ questionIds, offset, limit }: { questionIds: string[]; offset: number; limit: number }) => {
          const ids = questionIds.slice(offset, offset + limit);
          return {
            data: { total: questionIds.length, offset, limit, items: synced().items.filter((i: { id: string }) => ids.includes(i.id)), isLargeExam: questionIds.length > 500 },
            isLoading: false,
            isError: false,
          };
        },
      },
      submitAnswer: {
        useMutation: () => ({
          mutateAsync: async () => ({ correct: true, correctAnswer: "A" }),
        }),
      },
    },
    qbank: {
      exams: { useQuery: () => ({ data: [synced().exam] }) },
      createExam: { useMutation: () => ({ mutateAsync: vi.fn(async () => ({ id: "new" })) }) },
      updateExam: { useMutation: () => ({ mutateAsync: vi.fn(async () => ({})) }) },
      setQuestionState: { useMutation: () => ({ mutateAsync: vi.fn(async () => ({})) }) },
      reportIssue: { useMutation: () => ({ mutateAsync: vi.fn(async () => ({})) }) },
      examBatch: {
        useQuery: ({ currentIndex, batchSize }: { currentIndex: number; batchSize: number }) => {
          const start = Math.floor(currentIndex / batchSize) * batchSize;
          const ids = synced().exam.questionIds.slice(start, start + batchSize * 2);
          const items = synced().items.filter((i: { id: string }) => ids.includes(i.id));
          return { data: { total: synced().exam.questionIds.length, isLargeExam: synced().exam.questionIds.length > 500, batchSize, currentBatchIndex: Math.floor(currentIndex / batchSize), items, prefetchNext: start + batchSize * 2 < synced().exam.questionIds.length }, isLoading: false, isError: false };
        },
      },
      examWindow: {
        useQuery: ({ currentIndex }: { currentIndex: number }) => {
          const batchSize = 50;
          const start = Math.floor(currentIndex / batchSize) * batchSize;
          const ids = synced().exam.questionIds.slice(start, start + batchSize * 2);
          const items = synced().items.filter((i: { id: string }) => ids.includes(i.id));
          return { data: { total: synced().exam.questionIds.length, items, batchSize, isLargeExam: synced().exam.questionIds.length > 500 }, isLoading: false, isError: false };
        },
      },
    },
    journalNotes: { list: { useQuery: () => STATIC_EMPTY_LIST } },
    account: {
      profile: {
        useQuery: () => STATIC_ACCOUNT,
      },
    },
    useUtils: () => ({
      residentContent: { practiceSummary: { invalidate: vi.fn(async () => {}) } },
    }),
    },
  };
});

function exactText(text: string) {
  return screen.getByText(
    (_, element) => element?.textContent === text
  );
}

async function renderResumed(count: number) {
  store.count = count;
  window.history.replaceState({}, "", "/practice/create?resume=resume-1");
  const view = render(<ResidentPracticePage />);
  await waitFor(() => exactText(`Q 1 / ${count}`));
  return view;
}

describe.each([200, 500, 1000])(
  "large exam navigator (%i questions)",
  count => {
    it("windows buttons, counts ranges, and jumps", async () => {
      const view = await renderResumed(count);
      try {
        exactText(`Answered 0`);
        exactText(`Unanswered ${count}`);
        exactText(`Flagged 0`);
        const pages = Math.ceil(count / 100);
        expect(
          screen.getByRole("button", { name: `1-100` })
        ).not.toBeNull();
        expect(
          screen.getByRole("button", {
            name: `${count - 99}-${count}`,
          })
        ).not.toBeNull();
        expect(
          screen.getAllByLabelText(/Go to question/).length
        ).toBe(Math.min(100, count));
        expect(pages).toBe(count / 100);

        fireEvent.change(screen.getByLabelText("Jump to"), {
          target: { value: String(count) },
        });
        fireEvent.click(screen.getByRole("button", { name: "Go" }));
        await waitFor(() => exactText(`Q ${count} / ${count}`));
        expect(
          screen.getAllByLabelText(/Go to question/)[0].getAttribute("aria-label")
        ).toBe(`Go to question ${count - 99}`);

        fireEvent.click(screen.getByRole("button", { name: "flagged" }));
        await waitFor(() =>
          screen.getByText("No questions in this range match the current filter.")
        );
        fireEvent.click(screen.getByRole("button", { name: "all" }));
        await waitFor(
          () =>
            expect(
              screen.getAllByLabelText(/Go to question/).length
            ).toBeGreaterThan(0)
        );
      } finally {
        view.unmount();
      }
    });

    it("tracks answers and flags without breaking the window", async () => {
      const view = await renderResumed(count);
      try {
        fireEvent.click(screen.getAllByText("Option A")[0]);
        fireEvent.click(screen.getByRole("button", { name: "CONFIRM ANSWER" }));
        await waitFor(() => exactText(`Answered 1`));
        exactText(`Unanswered ${count - 1}`);
        fireEvent.click(screen.getByTitle("Flag"));
        await waitFor(() => exactText(`Flagged 1`));
        expect(
          screen.getAllByLabelText(/Go to question/).length
        ).toBe(Math.min(100, count));
      } finally {
        view.unmount();
      }
    });
  }
);

