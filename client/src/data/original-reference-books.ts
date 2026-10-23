/**
 * Canonical registry of the four Original Reference Books.
 *
 * Registration only: every entry points at an EXISTING source file already
 * present in this repository. No PDF is created, copied, or modified here.
 * Cover images are linked as asset references only (`coverSrc`); the files
 * land separately and the UI hides a missing cover at runtime.
 *
 * Separation contract (enforced by shape, not by merging):
 * - `kind` is always `"original-reference-book"` — entries here are never
 *   High-Yield Reviews (`client/src/data/high-yield-reviews.ts`) and never
 *   Question Bank items (`ResidentPracticePage` BANKS, untouched).
 * - Existing source identity is preserved: `sourceId` matches
 *   `medical-content/.../source-registry.json` (`pdf-oxford-essentials`,
 *   `pdf-rosen-5min`, `pdf-rosh-rotation-2019`) and `studyBookId` matches
 *   `client/src/lib/study-books.ts`, so routes, labels, and reading
 *   progress keep working unchanged.
 *
 * Inventory note (source of truth): no Tintinalli reference PDF exists in
 * this repository, so that entry is registered with
 * `sourceStatus: "pending-ingest"` and no invented file path. It becomes
 * readable the moment its PDF is ingested — no code change required.
 */

export type OriginalReferenceBookId =
  | "oxford-handbook"
  | "tintinalli"
  | "rosen"
  | "rosh-review";

export type OriginalReferenceBookFamily =
  | "OXFORD"
  | "TINTINALLI"
  | "ROSEN"
  | "ROSH";

export interface OriginalReferenceBook {
  /** Stable book id for the Original Reference Books shelf. */
  id: OriginalReferenceBookId;
  /** Canonical display title for this reference book. */
  title: string;
  /** Category. Original reference material only — never a summary. */
  category: "Original Reference Book" | "Original Reference Book / Reference Resource";
  /** Original book family. Identity is preserved, never reassigned. */
  family: OriginalReferenceBookFamily;
  /** Resource kind. Original books only — never `"high-yield-review"`. */
  kind: "original-reference-book";
  /** Cover asset filename, linked as an asset reference only. */
  coverAsset: string;
  /** Public cover URL. Resolves when the asset lands; hidden until then. */
  coverSrc: string;
  /**
   * Existing reference PDF, referenced — never duplicated.
   * `null` while the source PDF is not yet ingested (Tintinalli).
   */
  sourceFile: string | null;
  /**
   * Matching `sourceId` in the content source registry.
   * `null` while no registry source exists for the family.
   */
  sourceId: string | null;
  /**
   * Matching `STUDY_BOOKS` id that serves this book's reader route.
   * `null` while no reader source exists.
   */
  studyBookId: string | null;
  /** `active` = readable now; `pending-ingest` = registered, PDF awaited. */
  sourceStatus: "active" | "pending-ingest";
}

export const ORIGINAL_REFERENCE_BOOKS: readonly OriginalReferenceBook[] = [
  {
    id: "oxford-handbook",
    title: "Oxford Handbook of Emergency Medicine",
    category: "Original Reference Book",
    family: "OXFORD",
    kind: "original-reference-book",
    coverAsset: "10_oxford_handbook_emergency_medicine.png",
    coverSrc: "/covers/10_oxford_handbook_emergency_medicine.png",
    sourceFile: "client/public/study-books/emergency-oxford-essentials.pdf",
    sourceId: "pdf-oxford-essentials",
    studyBookId: "oxford-essentials",
    sourceStatus: "active",
  },
  {
    id: "tintinalli",
    title: "Tintinalli's Emergency Medicine",
    category: "Original Reference Book",
    family: "TINTINALLI",
    kind: "original-reference-book",
    coverAsset: "07_tintinallis_emergency_medicine.png",
    coverSrc: "/covers/07_tintinallis_emergency_medicine.png",
    sourceFile: "client/public/study-books/tintinallis-emergency-medicine.pdf",
    sourceId: "pdf-tintinalli-emergency-medicine",
    studyBookId: "tintinalli-emergency-medicine",
    sourceStatus: "active",
  },
  {
    id: "rosen",
    title: "Rosen's Emergency Medicine: Concepts and Clinical Practice",
    category: "Original Reference Book",
    family: "ROSEN",
    kind: "original-reference-book",
    coverAsset: "08_rosens_emergency_medicine.png",
    coverSrc: "/covers/08_rosens_emergency_medicine.png",
    sourceFile: "client/public/study-books/rosen-5min.pdf",
    sourceId: "pdf-rosen-5min",
    studyBookId: "rosen-5min",
    sourceStatus: "active",
  },
  {
    id: "rosh-review",
    title: "Rosh Review — EM Initial Certification",
    category: "Original Reference Book / Reference Resource",
    family: "ROSH",
    kind: "original-reference-book",
    coverAsset: "09_rosh_review_em_initial_certification.png",
    coverSrc: "/covers/09_rosh_review_em_initial_certification.png",
    sourceFile: "client/public/study-books/rosh-rotation-2019.pdf",
    sourceId: "pdf-rosh-rotation-2019",
    studyBookId: "rosh-rotation-2019",
    sourceStatus: "active",
  },
] as const;

export const ORIGINAL_REFERENCE_BOOK_MAP: Record<
  OriginalReferenceBookId,
  OriginalReferenceBook
> = Object.fromEntries(
  ORIGINAL_REFERENCE_BOOKS.map(book => [book.id, book])
) as Record<OriginalReferenceBookId, OriginalReferenceBook>;

/** Cover asset mapped from an existing study-book reader id, if registered. */
export function coverForStudyBook(
  studyBookId: string
): OriginalReferenceBook | undefined {
  return ORIGINAL_REFERENCE_BOOKS.find(book => book.studyBookId === studyBookId);
}
