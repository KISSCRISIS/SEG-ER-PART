/**
 * Parity tests: the offline content layer must answer exactly like the Node
 * server modules for identical inputs. The stubbed fetch serves the real
 * synced content files, so any logic drift between server/* and
 * client/src/lib/offline/content.ts fails loudly here.
 *
 * Run from the repo root so SEG_CONTENT_ROOT (".") resolves correctly.
 */
import { beforeAll, describe, expect, it } from "vitest";
import { OFFLINE_TEST_ROOT, stubContentFetch } from "./test-utils";
import {
  getResidentQuestionsBatch as serverBatch,
  listResidentChapters as serverChapters,
  listResidentQuestionCatalog as serverCatalog,
  regradeResidentAttempts as serverRegrade,
  selectResidentSessionQuestions as serverSession,
} from "../../../../server/residentContent";
import {
  getRecoveryReviewQueue as serverQueue,
  listRecoveredChapterStudyMap as serverMap,
  listRecoveredExamTraps as serverTraps,
  listRecoveredFlashcards as serverCards,
  listRecoveredOsceStations as serverOsce,
  listRecoveredReferences as serverReferences,
  listRecoveredTopicFamilies as serverFamilies,
} from "../../../../server/recoveryLibrary";
import {
  getResidentQuestionsBatch as offlineBatch,
  listRecoveredChapterStudyMap as offlineMap,
  listRecoveredExamTraps as offlineTraps,
  listRecoveredFlashcards as offlineCards,
  listRecoveredOsceStations as offlineOsce,
  listRecoveredReferences as offlineReferences,
  listRecoveredTopicFamilies as offlineFamilies,
  listResidentChapters as offlineChapters,
  listResidentQuestionCatalog as offlineCatalog,
  regradeResidentAttempts as offlineRegrade,
  selectResidentSessionQuestions as offlineSession,
  getRecoveryReviewQueue as offlineQueue,
} from "./content";

beforeAll(() => {
  process.env.SEG_CONTENT_ROOT = OFFLINE_TEST_ROOT;
  stubContentFetch();
}, 30000);

describe("offline/server content parity", () => {
  it("lists identical resident chapters", async () => {
    expect(await offlineChapters()).toEqual(await serverChapters());
    expect(await offlineChapters("FRCEM")).toEqual(await serverChapters("FRCEM"));
  }, 90000);

  it("builds an identical question catalog", async () => {
    expect(await offlineCatalog()).toEqual(await serverCatalog());
  }, 90000);

  it("selects identical practice sessions", async () => {
    const input = {
      families: ["FRCEM"] as ("FRCEM")[],
      questionType: "all" as const,
      order: "listed" as const,
      seed: 1,
      count: 5,
      attempts: [],
      states: [],
    };
    expect(await offlineSession(input)).toEqual(await serverSession(input));
  }, 90000);

  it("pages identical exam traps (covers trap normalization)", async () => {
    const input = { page: 1, pageSize: 5 };
    expect(await offlineTraps(input)).toEqual(await serverTraps(input));
  }, 90000);

  it("pages identical references (covers mentor merge)", async () => {
    const input = { page: 1, pageSize: 5 };
    expect(await offlineReferences(input)).toEqual(await serverReferences(input));
  }, 90000);

  it("pages identical flashcards", async () => {
    const input = { page: 1, pageSize: 5 };
    expect(await offlineCards(input)).toEqual(await serverCards(input));
  }, 90000);

  it("parses an identical OSCE station index", async () => {
    expect(await offlineOsce()).toEqual(await serverOsce());
  }, 90000);

  it("returns identical static indexes and review queue", async () => {
    expect(await offlineFamilies()).toEqual(await serverFamilies());
    expect(await offlineMap({})).toEqual(await serverMap({}));
    expect(offlineQueue()).toEqual(serverQueue());
  }, 90000);

  it("batches and regrades identically", async () => {
    const session = await offlineSession({
      families: ["FRCEM"],
      questionType: "all",
      order: "listed",
      seed: 1,
      count: 1,
      attempts: [],
      states: [],
    });
    const first = session.items[0];
    const attempts = [
      { questionId: first.id, selectedAnswer: first.correctAnswerKey as string, correct: 0 },
      { questionId: "no-such-question", selectedAnswer: "A", correct: 0 },
    ];
    expect(await offlineRegrade(attempts)).toEqual(await serverRegrade(attempts));
    const ids = [first.id, "no-such-question"];
    expect(await offlineBatch(ids, 0, 50)).toEqual(await serverBatch(ids, 0, 50));
  }, 90000);
});
