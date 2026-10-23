import { describe, expect, it } from "vitest";
import { gradeSelectedAnswer, resolveCorrectAnswerKey } from "./qbank-answer";

const options = [{ key: "A", text: "Amoxicillin" }, { key: "B", text: "Ciprofloxacin" }];

describe("Qbank answer resolution", () => {
  it("grades by the explicit option key, not by the first letter of answer text", () => {
    const question = { options, correctAnswerKey: "B", correctAnswer: "Ciprofloxacin" };
    expect(gradeSelectedAnswer(question, "B")).toBe(true);
    expect(gradeSelectedAnswer(question, "A")).toBe(false);
    expect(gradeSelectedAnswer(question, "Ciprofloxacin")).toBeNull();
  });

  it("infers a missing key only from one exact option text", () => {
    expect(resolveCorrectAnswerKey({ options, correctAnswerKey: null, correctAnswer: " ciprofloxacin " })).toBe("B");
    expect(resolveCorrectAnswerKey({ options, correctAnswerKey: null, correctAnswer: "Cipro" })).toBeNull();
    expect(resolveCorrectAnswerKey({ options: [...options, { key: "C", text: "Ciprofloxacin" }], correctAnswer: "Ciprofloxacin" })).toBeNull();
  });

  it("holds a question whose declared key is absent from its options", () => {
    expect(resolveCorrectAnswerKey({ options, correctAnswerKey: "E", correctAnswer: "E. E" })).toBeNull();
  });

  it("holds malformed extracted options with duplicate keys", () => {
    expect(resolveCorrectAnswerKey({ options: [...options, { key: "A", text: "Explanation accidentally parsed as an option" }], correctAnswerKey: "B", correctAnswer: "Ciprofloxacin" })).toBeNull();
  });
});
