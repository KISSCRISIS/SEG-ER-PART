/**
 * Shared Dashboard data shapes.
 *
 * Structural contracts matching the existing tRPC dashboard payloads.
 * Components receive these via props; no fetching happens here.
 */

export interface MasterySection {
  sectionId: number;
  sectionTitle: string;
  attempted: number;
  correct: number;
  accuracy: number;
  questionCount: number;
}

export interface MasteryFamilyRow {
  family: string;
  attempted: number;
  correct: number;
  accuracy: number;
}

export interface MasterySummary {
  attempted: number;
  correct: number;
  accuracy: number;
  strongest: MasterySection[];
  weakest: MasterySection[];
  byFamily?: MasteryFamilyRow[];
  nextRecommendedSection?: MasterySection;
  sections?: Array<{
    attempted: number;
    accuracy: number;
  }>;
}

export interface DashboardPracticeSummary {
  attempted: number;
  correct: number;
  recent?: Array<{
    id?: number;
    questionId: string;
    family: string;
    chapterNumber: number;
    correct: boolean | number;
    attemptedAt: string | Date;
  }>;
}

export interface DashboardExam {
  id: string;
  name: string;
  status: string;
  questionIds: unknown;
  correctCount?: number | null;
  startedAt?: string | Date;
  updatedAt?: string | Date;
}

export interface DashboardNote {
  id: string;
  title: string;
  bookmarked?: number | boolean;
  lastReviewedAt?: string | Date | null;
  updatedAt?: string | Date;
}

export interface DashboardTrainingPlan {
  label: string;
  focus: string;
  primarySectionId: number;
  readingMinutes: number;
  questionTarget: number;
  reviewMinutes: number;
}
