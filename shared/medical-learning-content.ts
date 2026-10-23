import { z } from "zod";

const textListSchema = z.array(z.string());

export const medicalLearningAlgorithmSchema = z.union([
  z.string(),
  z
    .object({
      id: z.string().min(1).optional(),
      title: z.string().min(1),
      steps: z.array(z.string()).default([]),
    })
    .passthrough(),
]);

export const medicalLearningTopicSchema = z
  .object({
    id: z.string().min(1),
    title: z.string().min(1),
    fullOriginalSummary: textListSchema.default([]),
    arabicExplanations: textListSchema.default([]),
    highYieldPoints: textListSchema.default([]),
    diagnosis: textListSchema.default([]),
    management: textListSchema.default([]),
    algorithms: z.array(medicalLearningAlgorithmSchema).default([]),
    examPearls: textListSchema.default([]),
    references: z.array(z.unknown()).optional(),
    provenance: z.unknown().optional(),
    legacy: z.record(z.string(), z.unknown()).optional(),
  })
  .passthrough();

export const medicalLearningChapterSchema = z
  .object({
    id: z.string().min(1),
    title: z.string().min(1),
    topics: z.array(medicalLearningTopicSchema).default([]),
    source: z.string().optional(),
    order: z.number().int().nonnegative().optional(),
    legacy: z.record(z.string(), z.unknown()).optional(),
  })
  .passthrough();

export const medicalLearningBookSchema = z
  .object({
    id: z.string().min(1),
    title: z.string().min(1),
    chapters: z.array(medicalLearningChapterSchema).default([]),
    edition: z.union([z.string(), z.number()]).optional(),
    source: z.string().optional(),
    legacy: z.record(z.string(), z.unknown()).optional(),
  })
  .passthrough();

export const medicalLearningLibrarySchema = z.object({
  schemaVersion: z.literal(1),
  books: z.array(medicalLearningBookSchema),
});

export type MedicalLearningTopic = z.infer<typeof medicalLearningTopicSchema>;
export type MedicalLearningChapter = z.infer<
  typeof medicalLearningChapterSchema
>;
export type MedicalLearningBook = z.infer<typeof medicalLearningBookSchema>;
export type MedicalLearningLibrary = z.infer<
  typeof medicalLearningLibrarySchema
>;

type UnknownRecord = Record<string, unknown>;
type LegacyMetadata = { id?: string; title?: string; source?: string };

function asRecord(value: unknown): UnknownRecord {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as UnknownRecord)
    : {};
}

function asText(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function asTextList(value: unknown): string[] {
  if (typeof value === "string") return value.trim() ? [value.trim()] : [];
  if (!Array.isArray(value)) return [];
  return value.flatMap(item =>
    typeof item === "string" && item.trim() ? [item.trim()] : []
  );
}

function legacyTopic(
  record: UnknownRecord,
  index: number
): MedicalLearningTopic {
  const id =
    asText(record.unitId) ?? asText(record.id) ?? `legacy-topic-${index + 1}`;
  const title = asText(record.title) ?? asText(record.chapterTitle) ?? id;
  return medicalLearningTopicSchema.parse({
    id,
    title,
    fullOriginalSummary: asTextList(
      record.fullOriginalSummary ??
        record.originalSummary ??
        record.summary ??
        record.highYieldSummary ??
        record.bilingualStudyContent
    ),
    arabicExplanations: asTextList(
      record.arabicExplanations ?? record.arabicExplanation
    ),
    highYieldPoints: asTextList(
      record.highYieldPoints ?? record.highYieldSummary
    ),
    diagnosis: asTextList(record.diagnosis),
    management: asTextList(record.management),
    algorithms: Array.isArray(record.algorithms) ? record.algorithms : [],
    examPearls: asTextList(record.examPearls),
    references: Array.isArray(record.references) ? record.references : [],
    provenance: record.provenance,
    legacy: record,
  });
}

/**
 * Creates a canonical read model from existing Learn JSON without mutating or
 * discarding the source record. Legacy fields remain available under `legacy`.
 */
export function adaptLegacySummaryBook(
  input: unknown,
  metadata: LegacyMetadata = {}
): MedicalLearningBook {
  const root = asRecord(input);
  const records = Array.isArray(root.chapters)
    ? root.chapters.map(asRecord)
    : [];
  const chapterGroups = new Map<
    string,
    { title: string; source?: string; records: UnknownRecord[] }
  >();

  records.forEach((record, index) => {
    const nestedTopics = Array.isArray(record.topics)
      ? record.topics.map(asRecord)
      : [record];
    const chapterId =
      asText(record.chapterId) ??
      asText(record.sourceChapterId) ??
      asText(record.unitId) ??
      asText(record.id) ??
      `legacy-chapter-${index + 1}`;
    const current = chapterGroups.get(chapterId) ?? {
      title:
        asText(record.chapterTitle) ??
        (asText(record.sourceChapterId)
          ? asText(record.sourceChapterId)!
          : (asText(record.title) ?? chapterId)),
      source: asText(record.source) ?? metadata.source,
      records: [],
    };
    current.records.push(...nestedTopics);
    chapterGroups.set(chapterId, current);
  });

  const id =
    metadata.id ?? asText(root.book) ?? asText(root.id) ?? "legacy-learn-book";
  return medicalLearningBookSchema.parse({
    id,
    title: metadata.title ?? asText(root.title) ?? id,
    edition: root.edition,
    source: metadata.source ?? asText(root.source),
    chapters: Array.from(chapterGroups.entries()).map(
      ([chapterId, group], chapterIndex) => ({
        id: chapterId,
        title: group.title,
        source: group.source,
        order: chapterIndex,
        topics: group.records.map(legacyTopic),
      })
    ),
    legacy: root,
  });
}

export function adaptLegacyResidentStudyBook(
  input: unknown,
  metadata: Required<Pick<LegacyMetadata, "id" | "title">> &
    Pick<LegacyMetadata, "source">
): MedicalLearningBook {
  const chapters = Array.isArray(input) ? input.map(asRecord) : [];
  return adaptLegacySummaryBook(
    {
      book: metadata.id,
      title: metadata.title,
      source: metadata.source,
      chapters,
    },
    metadata
  );
}
