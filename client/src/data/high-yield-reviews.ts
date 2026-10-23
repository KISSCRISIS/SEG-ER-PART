/**
 * Canonical registry of the five High-Yield Review summaries.
 *
 * Registration only: every entry points at an EXISTING source file already
 * present in this repository. No content is created, copied, or modified
 * here. `kind` is always `"high-yield-review"` — reviews are never merged
 * with Question Bank items (see `ResidentPracticePage` BANKS, untouched).
 *
 * Source identity mirrors `medical-content/.../source-registry.json`
 * (`tintinalli-summaries`, `rosen-summaries`, `rosh-summaries`,
 * `frcem-study-book`, `hippo-study-book`). Chapter counts match the source
 * files exactly (Tintinalli 189, Rosen 626, Rosh 12, HIPPO 18, FRCEM 32).
 */

export type HighYieldReviewId =
  | "tintinalli"
  | "rosen"
  | "rosh"
  | "hippo"
  | "frcem";

export type HighYieldReviewFamily =
  | "TINTINALLI"
  | "ROSEN"
  | "ROSH"
  | "HIPPO"
  | "FRCEM";

export interface HighYieldReview {
  /** Stable review id, shared with the summary readers and chapter map. */
  id: HighYieldReviewId;
  /** Canonical display title for this review. */
  title: string;
  /** Original book family. Identity is preserved, never reassigned. */
  family: HighYieldReviewFamily;
  /** Resource kind. High-Yield Review only — never `"qbank"`. */
  kind: "high-yield-review";
  /** Matching `sourceId` in the content source registry. */
  sourceId: string;
  /** Existing source file. Referenced, never duplicated. */
  sourceFile: string;
  /** Chapter/topic count, exactly as stored in the source file. */
  chapters: number;
  /** Learn route that renders this review. */
  route: string;
  /**
   * Destination of the Learn source picker button (existing behavior:
   * FRCEM/HIPPO open their book reader, JSON summaries open their reader).
   */
  learnRoute: string;
  /** Label shown on the Learn source picker (existing copy). */
  learnLabel: string;
  /** Meta line shown on the Learn source picker (existing copy). */
  learnMeta: string;
  /** Card title shown in the High-Yield Library (existing copy). */
  libraryTitle: string;
  /** Card description shown in the High-Yield Library (existing copy). */
  libraryDescription: string;
  /** Card accent shown in the High-Yield Library (existing styling). */
  libraryAccent: string;
}

export const HIGH_YIELD_REVIEWS: readonly HighYieldReview[] = [
  {
    id: "tintinalli",
    title: "High-Yield Review — Tintinalli",
    family: "TINTINALLI",
    kind: "high-yield-review",
    sourceId: "tintinalli-summaries",
    sourceFile: "client/public/content/summary-books/tintinalli-high-yield.json",
    chapters: 189,
    route: "/learn/summaries/tintinalli-high-yield",
    learnRoute: "/learn/summaries/tintinalli-high-yield",
    learnLabel: "Tintinalli High-Yield Summary",
    learnMeta: "Summary · 189 topics",
    libraryTitle: "Tintinalli Emergency Medicine Review",
    libraryDescription:
      "Source-linked chapter summaries in a bilingual study reader.",
    libraryAccent: "border-blue-200/25 from-blue-400/15 to-cyan-500/10",
  },
  {
    id: "rosen",
    title: "High-Yield Review — Rosen's",
    family: "ROSEN",
    kind: "high-yield-review",
    sourceId: "rosen-summaries",
    sourceFile: "client/public/content/summary-books/rosen-high-yield.json",
    chapters: 626,
    route: "/learn/summaries/rosen-high-yield",
    learnRoute: "/learn/summaries/rosen-high-yield",
    learnLabel: "Rosen High-Yield Summary",
    learnMeta: "Bilingual drafts · source topic index",
    libraryTitle: "Rosen & Barkin 5-Minute Review",
    libraryDescription:
      "Source-indexed emergency topics with summary, Arabic explanation, and references.",
    libraryAccent: "border-rose-200/25 from-rose-400/15 to-cyan-500/10",
  },
  {
    id: "rosh",
    title: "High-Yield Review — Rosh Review",
    family: "ROSH",
    kind: "high-yield-review",
    sourceId: "rosh-summaries",
    sourceFile: "client/public/content/summary-books/rosh-high-yield.json",
    chapters: 12,
    route: "/learn/summaries/rosh-high-yield",
    learnRoute: "/learn/summaries/rosh-high-yield",
    learnLabel: "Rosh High-Yield Summary",
    learnMeta: "Summary · 12 chapters",
    libraryTitle: "Rosh Emergency Medicine Review",
    libraryDescription:
      "Twelve page-linked source chapters for focused emergency-medicine revision.",
    libraryAccent: "border-amber-200/25 from-amber-400/15 to-cyan-500/10",
  },
  {
    id: "hippo",
    title: "High-Yield Review — HIPPO",
    family: "HIPPO",
    kind: "high-yield-review",
    sourceId: "hippo-study-book",
    sourceFile:
      "SEG_CONTENT_LIBRARY/02_PROCESSED_CONTENT/RESIDENT_EMERGENCY_MEDICINE/hippo-study-book.json",
    chapters: 18,
    route: "/learn?family=HIPPO",
    learnRoute: "/learn/books/hippo-high-yield",
    learnLabel: "HIPPO High-Yield Review",
    learnMeta: "Summary · 18 chapters",
    libraryTitle: "HIPPO High-Yield Review",
    libraryDescription:
      "Resident study chapters mapped to the existing SEG learning pathway.",
    libraryAccent: "border-orange-200/25 from-orange-400/15 to-cyan-500/10",
  },
  {
    id: "frcem",
    title: "High-Yield Review — FRCEM",
    family: "FRCEM",
    kind: "high-yield-review",
    sourceId: "frcem-study-book",
    sourceFile:
      "SEG_CONTENT_LIBRARY/02_PROCESSED_CONTENT/RESIDENT_EMERGENCY_MEDICINE/frcem-study-book.json",
    chapters: 32,
    route: "/learn?family=FRCEM",
    learnRoute: "/learn/books/frcem-high-yield",
    learnLabel: "FRCEM High-Yield Review",
    learnMeta: "Summary · 32 chapters",
    libraryTitle: "FRCEM High-Yield Review",
    libraryDescription:
      "Resident study chapters mapped to the existing SEG learning pathway.",
    libraryAccent: "border-cyan-200/25 from-cyan-400/15 to-blue-500/10",
  },
] as const;

export const HIGH_YIELD_REVIEW_MAP: Record<HighYieldReviewId, HighYieldReview> =
  Object.fromEntries(
    HIGH_YIELD_REVIEWS.map(review => [review.id, review])
  ) as Record<HighYieldReviewId, HighYieldReview>;
