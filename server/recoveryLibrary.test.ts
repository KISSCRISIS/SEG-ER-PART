import { describe, expect, it } from "vitest";
import {
  getRecoveryReviewQueue,
  listRecoveredExamTraps,
  listRecoveredFlashcards,
  listRecoveredOsceStations,
  listRecoveredReferences,
  listRecoveredTopicFamilies,
} from "./recoveryLibrary";

describe("recovery library", () => {
  it("loads the recovered reference catalog without inventing missing OSCE assets", async () => {
    const references = await listRecoveredReferences({ page: 1, pageSize: 12 });
    expect(references.total).toBe(390);
    expect(references.items).toHaveLength(12);
    expect(
      references.items.every(
        item => item.sectionId >= 1 && item.sectionId <= 22
      )
    ).toBe(true);

    const cardiovascularReferences = await listRecoveredReferences({
      sectionId: 4,
      page: 1,
      pageSize: 12,
    });
    expect(cardiovascularReferences.total).toBeGreaterThan(0);
    expect(
      cardiovascularReferences.items.every(item => item.sectionId === 4)
    ).toBe(true);

    const flashcards = await listRecoveredFlashcards({ page: 1, pageSize: 10 });
    expect(flashcards.total).toBe(760);
    expect(
      flashcards.items.every(
        item => item.sectionId >= 1 && item.sectionId <= 22
      )
    ).toBe(true);

    const traps = await listRecoveredExamTraps({ page: 1, pageSize: 10 });
    expect(traps.total).toBe(415);
    expect(
      traps.items.every(item => item.sectionId >= 1 && item.sectionId <= 22)
    ).toBe(true);

    const investigationCards = await listRecoveredFlashcards({
      sectionId: 17,
      page: 1,
      pageSize: 10,
    });
    expect(investigationCards.total).toBeGreaterThan(0);
    expect(investigationCards.items.every(item => item.sectionId === 17)).toBe(
      true
    );

    const systemsTraps = await listRecoveredExamTraps({
      sectionId: 19,
      page: 1,
      pageSize: 10,
    });
    expect(systemsTraps.total).toBeGreaterThan(0);
    expect(systemsTraps.items.every(item => item.sectionId === 19)).toBe(true);

    const families = await listRecoveredTopicFamilies();
    expect(families).toHaveLength(38);

    const queue = getRecoveryReviewQueue();
    expect(queue.map(item => item.status)).toContain(
      "quarantined-ocr-corruption"
    );

    const stations = await listRecoveredOsceStations();
    expect(stations).toHaveLength(14);
    expect(
      stations.every(item => item.sectionId >= 1 && item.sectionId <= 22)
    ).toBe(true);
    expect(
      stations.every(item => item.assetStatus === "missing-from-final-package")
    ).toBe(true);

    const filteredStations = await listRecoveredOsceStations({
      sectionId: stations[0].sectionId,
    });
    expect(filteredStations.length).toBeGreaterThan(0);
    expect(
      filteredStations.every(item => item.sectionId === stations[0].sectionId)
    ).toBe(true);
  });
});
