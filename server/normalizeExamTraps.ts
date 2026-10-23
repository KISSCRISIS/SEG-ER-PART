import { examTrapArabic } from "./examTrapArabic";

type Trap = { id: string; text: string; topic: string; topicId?: string; referenceId?: string; source?: string };
type Card = { cardId: string; answer: string; topicId?: string; source?: string };
type Mentor = { topicId?: string; referenceId?: string; explanation: string };

/** Resolve recovered formats only through explicit IDs and exact text evidence. */
export function normalizeExamTraps(traps: Trap[], cards: Card[], mentors: Mentor[]) {
  return traps.map(item => {
    const evidence = item.topicId ? cards.filter(card => card.topicId === item.topicId && card.answer === item.text && card.source) : [];
    const sources = Array.from(new Set(evidence.map(card => card.source!)));
    const sameText = traps.filter(other => other.id !== item.id && other.text === item.text && other.referenceId);
    const original = sameText.length === 1 ? sameText[0] : undefined;
    const referenceId = item.referenceId ?? original?.referenceId;
    const topicMentors = item.topicId ? mentors.filter(mentor => mentor.topicId === item.topicId) : [];
    const referenceMentors = referenceId ? mentors.filter(mentor => mentor.referenceId === referenceId) : [];
    const mentor = topicMentors.length === 1 ? topicMentors[0] : referenceMentors.length === 1 ? referenceMentors[0] : undefined;
    return {
      ...item,
      source: item.source || (sources.length === 1 ? sources[0] : "Source unresolved"),
      referenceId,
      arabicExplanation: examTrapArabic[item.id] ?? (original ? examTrapArabic[original.id] : undefined) ?? mentor?.explanation ?? null,
      provenance: {
        method: item.source ? "original-record" : sources.length === 1 ? "topic-id-and-exact-card-text" : "unresolved",
        evidenceFile: item.source ? "examTraps.json" : "flashcards.json",
        evidenceIds: evidence.map(card => card.cardId),
        topicId: item.topicId ?? null,
        referenceId: referenceId ?? null,
        duplicateOf: original?.id ?? null,
        reviewStatus: "under-review",
        // Recovered source labels do not establish a PDF edition or page.
        edition: null,
        page: null,
      },
    };
  });
}
