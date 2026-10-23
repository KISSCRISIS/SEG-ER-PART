import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { normalizeExamTraps } from "./normalizeExamTraps";

const directory = "SEG_CONTENT_LIBRARY/01_RECOVERY_SOURCE_ARTIFACTS/REFERENCE_LIBRARY/";
const read = (file: string) => JSON.parse(readFileSync(directory + file, "utf8"));
describe("exam trap source reconciliation", () => {
  it("resolves all 221 source-less records with exact evidence, preserves IDs and Arabic", () => {
    const raw = read("examTraps.json");
    const normalized = normalizeExamTraps(raw, read("flashcards.json"), read("arabicMentorExplanations.json"));
    const recovered = normalized.filter(item => item.provenance.method === "topic-id-and-exact-card-text");
    expect(recovered).toHaveLength(221);
    expect(normalized.map(item => item.id)).toEqual(raw.map((item: { id: string }) => item.id));
    expect(normalized.every(item => item.source !== "Source unresolved")).toBe(true);
    expect(normalized.every(item => /[\u0600-\u06ff]/.test(item.arabicExplanation ?? ""))).toBe(true);
    expect(normalized.find(item => item.id === "TRP_0195")).toMatchObject({ source: "Rosen Ch 2, FRCEM Batch 1" });
    expect(normalized.find(item => item.id === "TRP_0195")?.arabicExplanation).toContain("Tidal volume");
    expect(normalized.find(item => item.id === "TRP_0395")?.arabicExplanation).toContain("الفرز");
    expect(normalized.find(item => item.id === "TRP_0413")?.source).toContain("Tintinalli?");
  });
  it("never joins missing IDs or guesses a conflicting source", () => {
    const traps = [{ id: "x", text: "text", topic: "topic", topicId: "a" }];
    const cards = [{ cardId: "1", topicId: "a", answer: "text", source: "A" }, { cardId: "2", topicId: "a", answer: "text", source: "B" }];
    const result = normalizeExamTraps(traps, cards, [{ explanation: "Unrelated" }])[0];
    expect(result.source).toBe("Source unresolved");
    expect(result.arabicExplanation).toBeNull();
  });
});
