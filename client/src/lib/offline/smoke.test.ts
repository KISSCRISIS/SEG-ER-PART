/**
 * Offline smoke test: a full single-device user journey through
 * procedures.ts (the exact handlers the app calls in offline mode).
 * jsdom localStorage backs the device store; stubbed fetch serves the real
 * bundled content. Must run from the repo root.
 */
import { beforeAll, describe, expect, it } from "vitest";
import { stubContentFetch } from "./test-utils";
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

beforeAll(() => {
  stubContentFetch();
}, 30000);

describe("offline user journey", () => {
  it("registers, reads content, and signs out/in", async () => {
    expect(await authProcedures.me()).toBeNull();
    const reg = await authProcedures.register({
      fullName: "Smoke Tester",
      email: "smoke@example.com",
      professionalTrack: "Emergency medicine",
      country: "Jordan",
      graduationYear: 2015,
      preferredLanguage: "en",
    });
    expect(reg.verificationRequired).toBe(false);
    const me = await authProcedures.me();
    expect(me?.email).toBe("smoke@example.com");
    const profile = await accountProcedures.profile();
    expect(profile.learningProfile.professionalTrack).toBe("Emergency medicine");

    const chapters = await residentContentProcedures.chapters({ family: "FRCEM" });
    expect(chapters.length).toBeGreaterThan(0);
    const chapter = await residentContentProcedures.studyChapter({ family: "FRCEM", chapterNumber: 1 });
    expect(chapter?.family).toBe("FRCEM");
    const catalog = await residentContentProcedures.questionCatalog();
    expect(catalog.reduce((sum, bank) => sum + bank.count, 0)).toBeGreaterThan(1000);

    const refs = await libraryProcedures.references({ page: 1, pageSize: 5 });
    expect(refs.total).toBeGreaterThan(0);
    const trapsPage = await libraryProcedures.examTraps({ page: 1, pageSize: 5 });
    expect(trapsPage.total).toBeGreaterThan(0);
    expect(await libraryProcedures.topicFamilies()).toBeInstanceOf(Array);
    expect((await libraryProcedures.recoveryReviewQueue()).length).toBe(3);
    expect((await libraryProcedures.osceStations(undefined)).length).toBeGreaterThan(0);

    await authProcedures.logout();
    expect(await authProcedures.me()).toBeNull();
    const back = await authProcedures.login({ email: "smoke@example.com", remember: true });
    expect(back.user.email).toBe("smoke@example.com");
  }, 120000);

  it("practices questions, tracks performance, and manages exams", async () => {
    const session = await residentContentProcedures.sessionQuestions({
      families: ["FRCEM"],
      questionType: "all",
      order: "listed",
      seed: 1,
      count: 3,
    });
    expect(session.items).toHaveLength(3);
    const [first, second] = session.items;
    const right = await residentContentProcedures.submitAnswer({
      questionId: first.id,
      selectedAnswer: first.correctAnswerKey as string,
    });
    expect(right.correct).toBe(true);
    const wrongKey = second.options.map(o => o.key).find(k => k !== second.correctAnswerKey) as string;
    const wrong = await residentContentProcedures.submitAnswer({ questionId: second.id, selectedAnswer: wrongKey });
    expect(wrong.correct).toBe(false);

    const summary = await residentContentProcedures.practiceSummary();
    expect(summary.attempted).toBe(2);
    expect(summary.correct).toBe(1);
    const perf = await residentContentProcedures.performanceSummary();
    expect(perf.attempted).toBe(2);
    expect(perf.topics.length).toBeGreaterThan(0);

    const ids = session.items.map(q => q.id);
    const exam = await qbankProcedures.createExam({
      name: "Smoke exam",
      mode: "tutor",
      timeMode: "untimed",
      configuration: {},
      questionIds: ids,
    });
    await qbankProcedures.updateExam({
      id: exam.id,
      status: "active",
      answers: { [first.id]: first.correctAnswerKey as string, [second.id]: wrongKey },
      results: {},
      flaggedQuestionIds: [first.id],
      currentIndex: 1,
      remainingSeconds: null,
    });
    const exams = await qbankProcedures.exams();
    expect(exams).toHaveLength(1);
    expect(exams[0].flaggedQuestionIds).toEqual([first.id]);
    const history = await qbankProcedures.history();
    expect(history.attempts.length).toBe(2);

    const batch = await qbankProcedures.examBatch({ examId: exam.id, currentIndex: 0 });
    expect(batch.total).toBe(3);
    expect(batch.isLargeExam).toBe(false);
    const window = await qbankProcedures.examWindow({ examId: exam.id, currentIndex: 0 });
    expect(window.items.length).toBe(3);
    const byIds = await residentContentProcedures.questionsByIds({ questionIds: ids });
    expect(byIds).toHaveLength(3);
    await qbankProcedures.setQuestionState({ questionId: first.id, flagged: true });
    await qbankProcedures.reportIssue({ questionId: first.id, issueType: "other", details: "smoke test report" });

    await residentContentProcedures.saveStudyProgress({ family: "FRCEM", chapterNumber: 1, completed: true });
    const progress = await residentContentProcedures.studyProgress({ family: "FRCEM" });
    expect(progress.some(row => row.chapterNumber === 1 && row.completed === 1)).toBe(true);
  }, 120000);

  it("keeps a journal, learns, plans, and hunts traps", async () => {
    const note = await journalNotesProcedures.create({
      title: "Smoke note",
      body: "offline works",
      tags: ["smoke"],
      folder: "General",
      linkedType: "none",
      bookmarked: true,
    });
    expect((await journalNotesProcedures.list())).toHaveLength(1);
    await journalNotesProcedures.update({
      id: note.id,
      title: "Smoke note v2",
      body: "offline works",
      tags: ["smoke"],
      folder: "General",
      linkedType: "none",
      bookmarked: false,
      markReviewed: true,
    });
    const [updated] = await journalNotesProcedures.list();
    expect(updated.title).toBe("Smoke note v2");
    expect(updated.lastReviewedAt).toBeInstanceOf(Date);
    await journalNotesProcedures.delete({ id: note.id });
    expect(await journalNotesProcedures.list()).toHaveLength(0);

    await learningProgressProcedures.set({
      track: "resident-emergency-medicine",
      contentType: "tintinalli-summary-chapter",
      contentId: "smoke-unit",
      completed: true,
    });
    const lp = await learningProgressProcedures.current({ track: "resident-emergency-medicine" });
    expect(lp.completedIds).toContain("smoke-unit");

    const traps0 = await revisionProgressProcedures.current();
    expect(traps0.total).toBeGreaterThan(0);
    expect(traps0.completed).toBe(0);
    const trapId = traps0.completedIds.length === 0 ? (await libraryProcedures.examTraps({ page: 1, pageSize: 1 })).items[0].id : traps0.completedIds[0];
    await revisionProgressProcedures.set({ trapId, completed: true });
    expect((await revisionProgressProcedures.current()).completed).toBe(1);

    await studyPlanProcedures.save({ planId: "residency-year-1", dailyHours: 2, restDays: [] });
    const current = await studyPlanProcedures.current();
    expect(current?.planId).toBe("residency-year-1");
    const today = await studyPlanProcedures.today();
    expect(today?.tasks.length).toBeGreaterThan(0);
    const task = today!.tasks[0];
    await studyPlanProcedures.completeTask({ date: today!.date, taskId: task.id, completed: true });
    expect(await studyPlanProcedures.taskCompletions({ date: today!.date })).toHaveLength(1);

    expect((await residentContentProcedures.arabicTranslationAvailability()).available).toBe(false);
    const bankQuestion = (await residentContentProcedures.sessionQuestions({
      families: ["FRCEM"],
      questionType: "all",
      order: "listed",
      seed: 1,
      count: 50,
    })).items.find(q => q.arabicExplanation?.trim());
    if (bankQuestion) {
      const tr = await residentContentProcedures.translateArabicExplanation({ questionId: bankQuestion.id });
      expect(tr.source).toBe("bank");
    }
    await expect(
      residentContentProcedures.translateArabicExplanation({ questionId: "no-such-question" })
    ).rejects.toThrow();
  }, 120000);
});
