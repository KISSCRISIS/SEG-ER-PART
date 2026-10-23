import { z } from "zod";

/**
 * Phase 4-D: topicId as the primary knowledge key.
 *
 * Executable contracts for the Content Intelligence Foundation. Generated
 * artifacts (`medical-content/knowledge-graph/`) are validated against
 * these schemas: every map/mapping value must resolve to a registered
 * topicId, and every system must be a known medical system.
 */

export const topicIdSchema = z
  .string()
  .regex(/^EM_[A-Z]+_[A-Z0-9_]+$/, "topicId must look like EM_CARDIO_ACS");

const prioritySchema = z.enum(["Very High", "High", "Medium", "Low"]);

export const topicRegistryEntrySchema = z.object({
  topicId: topicIdSchema,
  topicName: z.string().min(1),
  system: z.string().min(1),
  systemId: z.string().min(1),
  priority: prioritySchema,
  blueprintWeight: z.object({
    value: z.string().min(1),
    basis: z.array(z.string()),
  }),
  status: z.literal("under-review"),
});

export const topicRegistrySchema = z.object({
  schemaVersion: z.literal(1),
  generatedAt: z.string().min(1),
  origin: z.string().min(1),
  topics: z.array(topicRegistryEntrySchema).min(1),
});

export const topicIdMapSchema = z.object({
  schemaVersion: z.literal(1),
  generatedAt: z.string().min(1),
  origin: z.string().min(1),
  map: z.record(z.string(), topicIdSchema),
  coverage: z.record(
    z.string(),
    z.object({ total: z.number(), mapped: z.number() })
  ),
  unmapped: z.array(z.string()),
});

export const topicReferenceSchema = z.object({
  source: z.string().min(1),
  chapter: z.string().min(1),
  unitId: z.string().min(1),
  kind: z.enum(["chapter", "topic"]),
});

export const bookTopicMappingSchema = z.object({
  schemaVersion: z.literal(1),
  generatedAt: z.string().min(1),
  origin: z.string().min(1),
  mappings: z.array(
    z.object({
      sourceId: z.string().min(1),
      contentId: z.string().min(1),
      contentType: z.enum(["chapter", "topic", "unit", "summary"]),
      topicId: topicIdSchema,
      location: z.string().min(1),
      mappingConfidence: z.enum(["High", "Medium", "Low"]),
      mappingMethod: z.string().min(1),
      reviewStatus: z.string().min(1),
    })
  ),
});

export const mcqMetadataSchema = z.object({
  questionId: z.string().min(1),
  topicId: topicIdSchema,
  source: z.string().min(1),
  difficulty: z.enum(["Easy", "Medium", "Hard"]).optional(),
  boardRelevance: prioritySchema.optional(),
  errorClassification: z
    .enum([
      "Knowledge Gap",
      "Concept Error",
      "Management Decision Error",
      "Diagnostic Reasoning Error",
      "Question Interpretation Error",
    ])
    .nullable()
    .optional(),
});

export const algorithmMetadataSchema = z.object({
  algorithmId: z.string().regex(/^ALG_[A-Z0-9_]+$/),
  topicId: topicIdSchema,
  type: z.enum([
    "Management Algorithm",
    "Diagnostic Algorithm",
    "Resuscitation Algorithm",
  ]),
  priority: prioritySchema,
});

export const examPearlMetadataSchema = z.object({
  pearlId: z.string().regex(/^PEARL_[A-Z0-9_]+$/),
  topicId: topicIdSchema,
  category: z.enum([
    "Management",
    "Diagnosis",
    "Resuscitation",
    "Pharmacology",
    "Disposition",
  ]),
  importance: prioritySchema,
});

export const tableMetadataSchema = z.object({
  tableId: z.string().regex(/^TABLE_[A-Z0-9_]+$/),
  topicId: topicIdSchema,
  type: z.enum([
    "Comparison Table",
    "Criteria Table",
    "Dosing Table",
    "Algorithm Table",
    "Reference Table",
  ]),
});

export const contentTopicMappingSchema = z.object({
  schemaVersion: z.literal(1),
  generatedAt: z.string().min(1),
  origin: z.string().min(1),
  mappings: z.array(
    z.object({
      contentId: z.string().min(1),
      contentType: z.enum(["algorithm", "examPearl", "table"]),
      topicId: topicIdSchema,
      mappingConfidence: z.enum(["High", "Medium", "Low"]),
      mappingMethod: z.string().min(1),
      reviewStatus: z.string().min(1),
    })
  ),
});

export const graphIndexSchema = z.object({
  schemaVersion: z.literal(1),
  generatedAt: z.string().min(1),
  origin: z.string().min(1),
  topics: z.array(z.unknown()),
  sources: z.array(z.unknown()),
  contents: z.array(
    z.object({
      contentId: z.string().min(1),
      topicId: topicIdSchema,
      sourceId: z.string().min(1).optional(),
    })
  ),
  questions: z.array(z.unknown()),
  relations: z.array(
    z.object({
      type: z.enum(["BELONGS_TO", "CONTAINS", "HAS_QUESTIONS"]),
      from: z.string().min(1),
      to: z.string().min(1),
    })
  ),
});

export type TopicRegistry = z.infer<typeof topicRegistrySchema>;
export type TopicIdMap = z.infer<typeof topicIdMapSchema>;
export type BookTopicMapping = z.infer<typeof bookTopicMappingSchema>;
export type McqMetadata = z.infer<typeof mcqMetadataSchema>;
export type AlgorithmMetadata = z.infer<typeof algorithmMetadataSchema>;
export type ExamPearlMetadata = z.infer<typeof examPearlMetadataSchema>;
export type TableMetadata = z.infer<typeof tableMetadataSchema>;
export type ContentTopicMapping = z.infer<typeof contentTopicMappingSchema>;
export type GraphIndex = z.infer<typeof graphIndexSchema>;
