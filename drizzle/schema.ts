import {
  date,
  index,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

export const trapStudyProgress = mysqlTable("trapStudyProgress", {
  userId: int("userId").notNull(),
  trapId: varchar("trapId", { length: 80 }).notNull(),
  completed: int("completed").notNull().default(0),
  completedAt: timestamp("completedAt"),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
}, table => [primaryKey({ columns: [table.userId, table.trapId] })]);

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
  emailVerifiedAt: timestamp("emailVerifiedAt"),
});

/** Pathway-agnostic completion state for Learn, Atlas, revision, and future professional tracks. */
export const learningItemProgress = mysqlTable("learningItemProgress", {
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  track: varchar("track", { length: 96 }).notNull(),
  contentType: varchar("contentType", { length: 64 }).notNull(),
  contentId: varchar("contentId", { length: 160 }).notNull(),
  completed: int("completed").notNull().default(0),
  completedAt: timestamp("completedAt"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, table => [
  primaryKey({ columns: [table.userId, table.track, table.contentType, table.contentId] }),
  index("learningItemProgress_user_track_idx").on(table.userId, table.track),
]);

export const emailCredentials = mysqlTable(
  "emailCredentials",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    email: varchar("email", { length: 320 }).notNull(),
    passwordHash: varchar("passwordHash", { length: 255 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [
    uniqueIndex("emailCredentials_userId_unique").on(table.userId),
    uniqueIndex("emailCredentials_email_unique").on(table.email),
  ]
);

export const learningProfiles = mysqlTable(
  "learningProfiles",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    professionalTrack: varchar("professionalTrack", { length: 96 }).notNull(),
    trainingLevel: varchar("trainingLevel", { length: 32 })
      .default("pgy1")
      .notNull(),
    country: varchar("country", { length: 96 }),
    graduationYear: int("graduationYear"),
    preferredLanguage: mysqlEnum("preferredLanguage", ["en", "ar"])
      .default("en")
      .notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [uniqueIndex("learningProfiles_userId_unique").on(table.userId)]
);

export const emailVerificationCodes = mysqlTable(
  "emailVerificationCodes",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    codeHash: varchar("codeHash", { length: 128 }).notNull(),
    expiresAt: timestamp("expiresAt").notNull(),
    attempts: int("attempts").default(0).notNull(),
    lastSentAt: timestamp("lastSentAt").defaultNow().notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  table => [
    uniqueIndex("emailVerificationCodes_userId_unique").on(table.userId),
  ]
);

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type EmailCredential = typeof emailCredentials.$inferSelect;

/** Stable identity for a governed medical-learning content item. */
export const medicalContentItems = mysqlTable(
  "medicalContentItems",
  {
    id: int("id").autoincrement().primaryKey(),
    slug: varchar("slug", { length: 180 }).notNull(),
    contentType: mysqlEnum("contentType", [
      "article",
      "clinical_pathway",
      "drug_monograph",
      "case",
      "quiz",
      "visual_atlas",
    ]).notNull(),
    lifecycleStatus: mysqlEnum("lifecycleStatus", [
      "draft",
      "in_review",
      "approved",
      "retired",
    ])
      .default("draft")
      .notNull(),
    currentVersion: int("currentVersion").default(0).notNull(),
    createdByUserId: int("createdByUserId").references(() => users.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [
    uniqueIndex("medicalContentItems_slug_unique").on(table.slug),
    index("medicalContentItems_status_idx").on(table.lifecycleStatus),
  ]
);

/** Immutable snapshot. Corrections create a new monotonically increasing version. */
export const medicalContentRevisions = mysqlTable(
  "medicalContentRevisions",
  {
    id: int("id").autoincrement().primaryKey(),
    contentItemId: int("contentItemId")
      .notNull()
      .references(() => medicalContentItems.id, { onDelete: "cascade" }),
    version: int("version").notNull(),
    locale: mysqlEnum("locale", ["en", "ar"]).default("en").notNull(),
    title: varchar("title", { length: 300 }).notNull(),
    summary: text("summary"),
    body: json("body").notNull(),
    changeSummary: text("changeSummary").notNull(),
    evidenceReviewedThrough: date("evidenceReviewedThrough"),
    reviewStatus: mysqlEnum("reviewStatus", [
      "draft",
      "in_review",
      "changes_requested",
      "approved",
      "rejected",
    ])
      .default("draft")
      .notNull(),
    createdByUserId: int("createdByUserId").references(() => users.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  table => [
    uniqueIndex("medicalContentRevisions_item_version_unique").on(
      table.contentItemId,
      table.version
    ),
    index("medicalContentRevisions_reviewStatus_idx").on(table.reviewStatus),
  ]
);

/** Normalized bibliographic/source record used as content provenance. */
export const medicalSources = mysqlTable(
  "medicalSources",
  {
    id: int("id").autoincrement().primaryKey(),
    sourceType: mysqlEnum("sourceType", [
      "guideline",
      "systematic_review",
      "journal",
      "textbook",
      "regulator",
      "local_protocol",
      "other",
    ]).notNull(),
    title: varchar("title", { length: 500 }).notNull(),
    publisher: varchar("publisher", { length: 255 }),
    canonicalUrl: varchar("canonicalUrl", { length: 2048 }),
    externalIdentifier: varchar("externalIdentifier", { length: 255 }),
    publishedAt: date("publishedAt"),
    accessedAt: timestamp("accessedAt").notNull(),
    contentChecksum: varchar("contentChecksum", { length: 128 }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  table => [
    index("medicalSources_externalIdentifier_idx").on(table.externalIdentifier),
  ]
);

/** Claim-level provenance link between an immutable revision and a source. */
export const medicalRevisionSources = mysqlTable(
  "medicalRevisionSources",
  {
    revisionId: int("revisionId")
      .notNull()
      .references(() => medicalContentRevisions.id, { onDelete: "cascade" }),
    sourceId: int("sourceId")
      .notNull()
      .references(() => medicalSources.id, { onDelete: "restrict" }),
    locator: varchar("locator", { length: 500 }),
    claimScope: text("claimScope").notNull(),
    addedAt: timestamp("addedAt").defaultNow().notNull(),
  },
  table => [primaryKey({ columns: [table.revisionId, table.sourceId] })]
);

/** Append-only clinical review decision and attributable reviewer identity. */
export const medicalClinicalReviews = mysqlTable(
  "medicalClinicalReviews",
  {
    id: int("id").autoincrement().primaryKey(),
    revisionId: int("revisionId")
      .notNull()
      .references(() => medicalContentRevisions.id, { onDelete: "cascade" }),
    reviewerUserId: int("reviewerUserId").references(() => users.id, {
      onDelete: "set null",
    }),
    reviewerName: varchar("reviewerName", { length: 255 }).notNull(),
    reviewerCredential: varchar("reviewerCredential", {
      length: 255,
    }).notNull(),
    decision: mysqlEnum("decision", [
      "changes_requested",
      "approved",
      "rejected",
    ]).notNull(),
    notes: text("notes").notNull(),
    checklistVersion: varchar("checklistVersion", { length: 64 }).notNull(),
    reviewedAt: timestamp("reviewedAt").defaultNow().notNull(),
  },
  table => [
    index("medicalClinicalReviews_revision_idx").on(
      table.revisionId,
      table.reviewedAt
    ),
  ]
);

export type MedicalContentItem = typeof medicalContentItems.$inferSelect;
export type MedicalContentRevision =
  typeof medicalContentRevisions.$inferSelect;
export type MedicalSource = typeof medicalSources.$inferSelect;
export type MedicalClinicalReview = typeof medicalClinicalReviews.$inferSelect;

/** Per-user reading state for the locally governed resident study library. */
export const residentStudyProgress = mysqlTable(
  "residentStudyProgress",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    family: mysqlEnum("family", ["FRCEM", "HIPPO"]).notNull(),
    chapterNumber: int("chapterNumber").notNull(),
    completed: int("completed").default(0).notNull(),
    lastReadAt: timestamp("lastReadAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [
    uniqueIndex("residentStudyProgress_user_family_chapter_unique").on(
      table.userId,
      table.family,
      table.chapterNumber
    ),
    index("residentStudyProgress_user_idx").on(table.userId),
  ]
);

/** Append-only practice history. Question IDs remain stable across source re-extraction. */
export const residentQuestionAttempts = mysqlTable(
  "residentQuestionAttempts",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    questionId: varchar("questionId", { length: 160 }).notNull(),
    family: mysqlEnum("family", [
      "EDIC",
      "FRCEM",
      "HIPPO",
      "OXFORD_SCE",
      "PEER_2026",
      "PEER_PHYSICIANS",
      "ROSEN_10E",
      "ROSH_2026",
      "TINTINALLI_9E",
      "AQRAB",
    ]).notNull(),
    chapterNumber: int("chapterNumber").notNull(),
    selectedAnswer: varchar("selectedAnswer", { length: 8 }).notNull(),
    correct: int("correct").notNull(),
    attemptedAt: timestamp("attemptedAt").defaultNow().notNull(),
  },
  table => [
    index("residentQuestionAttempts_user_idx").on(
      table.userId,
      table.attemptedAt
    ),
    index("residentQuestionAttempts_question_idx").on(table.questionId),
  ]
);

export const qbankExams = mysqlTable(
  "qbankExams",
  {
    id: varchar("id", { length: 64 }).primaryKey(),
    userId: int("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 120 }).notNull(),
    mode: mysqlEnum("mode", ["tutor", "test"]).notNull(),
    timeMode: mysqlEnum("timeMode", ["timed", "untimed"]).notNull(),
    status: mysqlEnum("status", ["active", "paused", "completed"])
      .default("active")
      .notNull(),
    configuration: json("configuration").notNull(),
    questionIds: json("questionIds").notNull(),
    answers: json("answers").notNull(),
    results: json("results").notNull(),
    flaggedQuestionIds: json("flaggedQuestionIds").notNull(),
    currentIndex: int("currentIndex").default(0).notNull(),
    remainingSeconds: int("remainingSeconds"),
    correctCount: int("correctCount"),
    startedAt: timestamp("startedAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
    completedAt: timestamp("completedAt"),
  },
  table => [
    index("qbankExams_user_status_idx").on(table.userId, table.status),
    index("qbankExams_updated_idx").on(table.updatedAt),
  ]
);

export const qbankQuestionStates = mysqlTable(
  "qbankQuestionStates",
  {
    userId: int("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    questionId: varchar("questionId", { length: 160 }).notNull(),
    flagged: int("flagged").default(0).notNull(),
    skipped: int("skipped").default(0).notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [
    primaryKey({ columns: [table.userId, table.questionId] }),
    index("qbankQuestionStates_user_idx").on(table.userId),
  ]
);

export const medicalJournalNotes = mysqlTable(
  "medicalJournalNotes",
  {
    id: varchar("id", { length: 64 }).primaryKey(),
    userId: int("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 180 }).notNull(),
    body: text("body").notNull(),
    tags: json("tags").notNull(),
    folder: varchar("folder", { length: 100 }).default("General").notNull(),
    linkedType: mysqlEnum("linkedType", [
      "none",
      "question",
      "chapter",
      "asset",
    ])
      .default("none")
      .notNull(),
    linkedId: varchar("linkedId", { length: 180 }),
    bookmarked: int("bookmarked").default(0).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
    lastReviewedAt: timestamp("lastReviewedAt"),
  },
  table => [
    index("medicalJournalNotes_user_updated_idx").on(
      table.userId,
      table.updatedAt
    ),
  ]
);

export const contentIssueReports = mysqlTable(
  "contentIssueReports",
  {
    id: varchar("id", { length: 64 }).primaryKey(),
    userId: int("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    itemType: mysqlEnum("itemType", ["question", "chapter", "asset"]).notNull(),
    itemId: varchar("itemId", { length: 180 }).notNull(),
    issueType: mysqlEnum("issueType", [
      "incorrect_answer",
      "outdated_guideline",
      "unclear_explanation",
      "duplicate",
      "source_locator",
      "other",
    ]).notNull(),
    details: text("details").notNull(),
    status: mysqlEnum("status", ["open", "reviewing", "resolved", "dismissed"])
      .default("open")
      .notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [
    index("contentIssueReports_item_idx").on(table.itemType, table.itemId),
    index("contentIssueReports_user_status_idx").on(table.userId, table.status),
  ]
);

/**
 * On-demand Arabic translations for Qbank explanations. Bank JSONL content
 * stays the primary source; rows here are fallback-only overrides shown with
 * an AI/pending-review badge until a reviewer approves them.
 */
export const questionArabicTranslations = mysqlTable(
  "questionArabicTranslations",
  {
    questionId: varchar("questionId", { length: 180 }).primaryKey(),
    sourceBank: varchar("sourceBank", { length: 64 }).notNull(),
    text: text("text").notNull(),
    status: mysqlEnum("status", ["pending-review", "approved"])
      .default("pending-review")
      .notNull(),
    createdByUserId: int("createdByUserId").references(() => users.id, {
      onDelete: "cascade",
    }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [
    index("questionArabicTranslations_bank_idx").on(table.sourceBank),
  ]
);
