import { describe, expect, it } from "vitest";
import { buildHighYieldChapterMap } from "./high-yield-chapter-map";

describe("high-yield chapter map", () => {
  const topics = [
    { unitId: "acs", title: "Acute Coronary Syndrome" },
    { unitId: "arrhythmia", title: "Cardiac Arrhythmias" },
    { unitId: "head-trauma", title: "Head Trauma" },
  ];

  it("groups Tintinalli and Rosen topics into shared clinical chapters", () => {
    for (const source of ["tintinalli", "rosen"] as const) {
      const map = buildHighYieldChapterMap(source, topics);
      expect(
        map.find(chapter => chapter.title === "Cardiovascular Emergencies")
          ?.topics
      ).toHaveLength(2);
      expect(
        map.find(chapter => chapter.title === "Trauma")?.topics[0].id
      ).toBe("head-trauma");
    }
  });

  it("keeps each existing Rosh source chapter intact", () => {
    const map = buildHighYieldChapterMap("rosh", topics);
    expect(map).toHaveLength(3);
    expect(map.every(chapter => chapter.topics.length === 1)).toBe(true);
  });
});
