import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  adaptLegacyResidentStudyBook,
  adaptLegacySummaryBook,
  medicalLearningLibrarySchema,
} from "./medical-learning-content";

const readJson = (path: string) => JSON.parse(readFileSync(path, "utf8"));

describe("unified medical learning content schema", () => {
  it("supports the complete canonical Book → Chapter → Topic hierarchy", () => {
    const library = medicalLearningLibrarySchema.parse({
      schemaVersion: 1,
      books: [
        {
          id: "book-1",
          title: "Book",
          chapters: [
            {
              id: "chapter-1",
              title: "Chapter",
              topics: [
                {
                  id: "topic-1",
                  title: "Topic",
                  fullOriginalSummary: ["Original source summary"],
                  arabicExplanations: ["شرح عربي"],
                  highYieldPoints: ["High yield"],
                  diagnosis: ["Diagnosis"],
                  management: ["Management"],
                  algorithms: [{ title: "Approach", steps: ["Step 1"] }],
                  examPearls: ["Pearl"],
                },
              ],
            },
          ],
        },
      ],
    });
    expect(library.books[0].chapters[0].topics[0].algorithms).toHaveLength(1);
    expect(library.books[0].chapters[0].topics[0].references).toBeUndefined();
    expect(library.books[0].chapters[0].topics[0].provenance).toBeUndefined();
  });

  it.each([
    ["Rosh", "client/public/content/summary-books/rosh-high-yield.json", 12],
    [
      "Tintinalli",
      "client/public/content/summary-books/tintinalli-high-yield.json",
      189,
    ],
    ["Rosen", "client/public/content/summary-books/rosen-high-yield.json", 626],
  ])(
    "adapts every existing %s summary without changing its source record",
    (_name, path, expectedTopics) => {
      const source = readJson(path);
      const book = adaptLegacySummaryBook(source);
      const topics = book.chapters.flatMap(chapter => chapter.topics);
      expect(topics).toHaveLength(expectedTopics);
      expect(
        topics.every(topic => Array.isArray(topic.fullOriginalSummary))
      ).toBe(true);
      expect(topics.every(topic => topic.legacy)).toBe(true);
      expect(source.chapters).toHaveLength(expectedTopics);
    }
  );

  it.each([
    ["FRCEM", "frcem-study-book.json", 32],
    ["HIPPO", "hippo-study-book.json", 18],
  ])(
    "adapts every existing %s resident chapter",
    (family, file, expectedChapters) => {
      const source = readJson(
        `SEG_CONTENT_LIBRARY/02_PROCESSED_CONTENT/RESIDENT_EMERGENCY_MEDICINE/${file}`
      );
      const book = adaptLegacyResidentStudyBook(source, {
        id: family.toLowerCase(),
        title: `${family} Study Book`,
      });
      expect(book.chapters).toHaveLength(expectedChapters);
      expect(
        book.chapters.every(
          chapter => chapter.topics[0].fullOriginalSummary.length > 0
        )
      ).toBe(true);
    }
  );
});
