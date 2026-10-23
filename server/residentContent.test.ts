import { describe, expect, it } from "vitest";
import { getResidentQuestion, getResidentStudyChapter, listResidentChapters, listResidentQuestionCatalog, listResidentQuestions, selectResidentSessionQuestions, summarizeTopicProgress } from "./residentContent";

describe("resident content pathway mapping", () => {
  it("maps every extracted chapter and question to the 22-section pathway", async () => {
    const chapters = await listResidentChapters();
    expect(chapters).toHaveLength(50);
    expect(chapters.every(item => item.sectionId >= 1 && item.sectionId <= 22)).toBe(true);
    expect(chapters.filter(item => item.sectionId === 7).length).toBeGreaterThan(0);

    const traumaQuestions = await listResidentQuestions({ sectionId: 7, page: 1, pageSize: 10 });
    expect(traumaQuestions.total).toBeGreaterThan(0);
    expect(traumaQuestions.items.every(item => item.sectionId === 7)).toBe(true);

    const chapter = await getResidentStudyChapter("FRCEM", 1);
    expect(chapter?.sectionId).toBe(7);
  });

  it.each([
    ["EDIC", 995],
    ["FRCEM", 1529],
    ["HIPPO", 1927],
    ["OXFORD_SCE", 356],
    ["PEER_2026", 2139],
    ["PEER_PHYSICIANS", 685],
    ["ROSEN_10E", 1044],
    ["ROSH_2026", 3994],
    ["TINTINALLI_9E", 756],
  ] as const)("loads the private %s PDF bank with complete answer data", async (family, expected) => {
    const result = await listResidentQuestions({ family, page: 1, pageSize: 25 });
    expect(result.total).toBe(expected);
    expect(result.items).toHaveLength(25);
    expect(result.items.every(item => item.options.length >= 3)).toBe(true);
    expect(result.items.every(item => Boolean(item.correctAnswerKey))).toBe(true);
    expect(result.items.every(item => Boolean(item.englishExplanation))).toBe(true);
  });

  it("builds a complete bank/chapter catalog from practice-eligible questions", async () => {
    const catalog = await listResidentQuestionCatalog();
    expect(catalog).toHaveLength(9);
    expect(catalog.reduce((sum, bank) => sum + bank.count, 0)).toBe(13425);
    expect(catalog.find(bank => bank.family === "ROSH_2026")).toMatchObject({ count: 3994 });
    expect(catalog.find(bank => bank.family === "ROSH_2026")?.chapters).toHaveLength(20);
  });

  it("selects from the full bank before applying chapter and history filters", async () => {
    const catalog = await listResidentQuestionCatalog();
    const rosh = catalog.find(bank => bank.family === "ROSH_2026")!;
    const selectedChapter = rosh.chapters[0];
    const otherChapters = rosh.chapters.slice(1).map(chapter => `ROSH_2026:${chapter.chapterNumber}`);
    const base = {
      families: ["ROSH_2026" as const], excludedChapterKeys: otherChapters,
      questionType: "all" as const, order: "listed" as const, seed: 1,
      count: 10, attempts: [], states: [],
    };
    const selected = await selectResidentSessionQuestions(base);
    expect(selected.total).toBe(selectedChapter.count);
    expect(selected.items).toHaveLength(10);
    expect(selected.items.every(item => item.chapterNumber === selectedChapter.chapterNumber)).toBe(true);
    const first = selected.items[0];
    const incorrect = await selectResidentSessionQuestions({
      ...base, questionType: "incorrect", attempts: [{ questionId: first.id, correct: 0 }],
    });
    expect(incorrect.total).toBe(1);
    expect(incorrect.items[0].id).toBe(first.id);
    const unused = await selectResidentSessionQuestions({
      ...base, questionType: "unused", attempts: [{ questionId: first.id, correct: 0 }],
    });
    expect(unused.total).toBe(selectedChapter.count - 1);
  });

  it("now resolves previously malformed records after repair", async () => {
    const frcemQ = await getResidentQuestion("frcem-ch-06-q-0010");
    expect(frcemQ).not.toBeNull();
    expect(frcemQ?.correctAnswerKey).toBe("M");
    expect(frcemQ?.options.length).toBe(15);
    const oxfordQ = await getResidentQuestion("oxford-sce-ch-04-q-0019");
    expect(oxfordQ).not.toBeNull();
    expect(oxfordQ?.correctAnswerKey).toBe("A");
    expect(oxfordQ?.options.length).toBe(5);
  });

  it("summarizes per-topic progress from study rows and attempts", async () => {
    const chapters = await listResidentChapters();
    const target = chapters.find(item => item.questionCount >= 3)!;
    const sample = await listResidentQuestions({
      family: target.family,
      chapterNumber: target.chapterNumber,
      page: 1,
      pageSize: 3,
    });
    const ids = sample.items.map(item => item.id);
    const topics = await summarizeTopicProgress({
      chapters,
      attempts: [
        { questionId: ids[0], correct: 1 },
        { questionId: ids[1], correct: 0 },
        { questionId: ids[2], correct: 1 },
      ],
      progress: [
        { family: target.family, chapterNumber: target.chapterNumber, completed: 1 },
      ],
    });
    expect(topics).toHaveLength(chapters.length);
    const row = topics.find(
      item =>
        item.family === target.family &&
        item.chapterNumber === target.chapterNumber
    )!;
    expect(row.completed).toBe(true);
    expect(row.attempted).toBe(3);
    expect(row.correct).toBe(2);
    expect(row.accuracy).toBe(67);
    expect(row.progress).toBe(
      Math.round(40 + (3 / target.questionCount) * 30 + (2 / 3) * 30)
    );
    const untouched = topics.find(item => item !== row)!;
    expect(untouched.attempted).toBe(0);
    expect(untouched.progress).toBe(0);
    expect(
      topics.every(
        item =>
          item.progress >= 0 &&
          item.progress <= 100 &&
          Number.isInteger(item.progress)
      )
    ).toBe(true);
  });
});
