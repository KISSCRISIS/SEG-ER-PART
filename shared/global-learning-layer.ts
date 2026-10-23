import { z } from "zod";

/**
 * SEG global study-enhancement layer (algorithms + exam pearls + tables).
 *
 * A book-independent educational layer: each entry carries its own content
 * plus match aliases. A build script resolves aliases against the existing
 * book/summary sources and emits read-only mappings, so original sources
 * are never edited or duplicated. Everything stays `under-review`.
 */

export const enhancementAlgorithmSchema = z.object({
  title: z.string().min(1),
  steps: z.array(z.string().min(1)).min(1),
});

export const enhancementTableSchema = z.object({
  title: z.string().min(1).optional(),
  headers: z.array(z.string().min(1)).min(1),
  rows: z.array(z.array(z.string())).default([]),
});

export const enhancementSourceMappingSchema = z.object({
  books: z.array(z.enum(["tintinalli", "rosh", "rosen"])).min(1),
  matchAliases: z.array(z.string().min(1)).min(1),
});

export const globalEnhancementSchema = z
  .object({
    id: z.string().min(1),
    topic: z.string().min(1),
    medicalSystem: z.string().min(1),
    algorithm: enhancementAlgorithmSchema,
    examPearls: z.array(z.string().min(1)).min(1),
    tables: z.array(enhancementTableSchema).min(1),
    references: z.array(z.string().min(1)).min(1),
    sourceMapping: enhancementSourceMappingSchema,
    status: z.literal("under-review"),
  })
  .passthrough();

export const globalLearningLayerSchema = z.object({
  schemaVersion: z.literal(1),
  origin: z.string().min(1),
  provenance: z.string().min(1),
  enhancements: z.array(globalEnhancementSchema).min(1),
});

export type GlobalEnhancement = z.infer<typeof globalEnhancementSchema>;
export type GlobalLearningLayer = z.infer<typeof globalLearningLayerSchema>;
export type EnhancementSourceMapping = z.infer<
  typeof enhancementSourceMappingSchema
>;
