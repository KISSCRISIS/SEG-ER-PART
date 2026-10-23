import { and, desc, eq, inArray, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  emailCredentials,
  emailVerificationCodes,
  contentIssueReports,
  InsertUser,
  learningProfiles,
  learningItemProgress,
  medicalJournalNotes,
  qbankExams,
  questionArabicTranslations,
  qbankQuestionStates,
  residentQuestionAttempts,
  residentStudyProgress,
  users,
} from "../drizzle/schema";
import { ENV } from "./_core/env";
import { localStorageEnabled, localStore } from "./localStore";

export { localStorageEnabled };

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && ENV.databaseUrl) {
    try {
      _db = drizzle(ENV.databaseUrl);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export type LearningItemProgressInput = {
  userId: number;
  track: string;
  contentType: string;
  contentId: string;
  completed: boolean;
};

/** Generic user-scoped completion storage shared by all current and future pathways. */
export async function listLearningItemProgress(userId: number, track: string, contentType?: string) {
  if (localStorageEnabled()) {
    return localStore().list<typeof learningItemProgress.$inferSelect>("learning-item-progress", userId)
      .filter(row => row.track === track && (!contentType || row.contentType === contentType));
  }
  const database = await getDb();
  if (!database) throw new Error("Database is unavailable");
  const conditions = [eq(learningItemProgress.userId, userId), eq(learningItemProgress.track, track)];
  if (contentType) conditions.push(eq(learningItemProgress.contentType, contentType));
  return database.select().from(learningItemProgress).where(and(...conditions));
}

export async function setLearningItemProgress(input: LearningItemProgressInput) {
  const now = new Date();
  const row = { ...input, completed: Number(input.completed), completedAt: input.completed ? now : null, updatedAt: now };
  const storageId = `${input.track}:${input.contentType}:${input.contentId}`;
  if (localStorageEnabled()) {
    localStore().put("learning-item-progress", input.userId, storageId, row);
    return row;
  }
  const database = await getDb();
  if (!database) throw new Error("Database is unavailable");
  await database.insert(learningItemProgress).values(row).onDuplicateKeyUpdate({
    set: { completed: row.completed, completedAt: row.completedAt, updatedAt: now },
  });
  return row;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (process.env.SEG_LOCAL_EMAIL_LOGIN === "true" && localStorageEnabled()) {
    localStore().update("local-users", 0, user.openId, user);
    return;
  }
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  if (process.env.SEG_LOCAL_EMAIL_LOGIN === "true" && localStorageEnabled()) return localStore().list<typeof users.$inferSelect>("local-users", 0).find(user => user.openId === openId);
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db
    .select()
    .from(users)
    .where(eq(users.openId, openId))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getLearningProfile(userId: number) {
  if (process.env.SEG_LOCAL_EMAIL_LOGIN === "true" && localStorageEnabled()) return localStore().list<typeof learningProfiles.$inferSelect>("profiles", userId)[0] ?? { id: userId, userId, professionalTrack: "Emergency Medicine Resident", trainingLevel: "pgy1", country: null, graduationYear: null, preferredLanguage: "en" as const, createdAt: new Date(), updatedAt: new Date() };
  const db = await getDb();
  if (!db) throw new Error("Database is not available");

  const result = await db
    .select()
    .from(learningProfiles)
    .where(eq(learningProfiles.userId, userId))
    .limit(1);

  return result[0] ?? null;
}

export async function updateAccountProfile(input: {
  userId: number;
  fullName: string;
  professionalTrack: string;
  trainingLevel: string;
  country?: string | null;
  graduationYear?: number | null;
  preferredLanguage: "en" | "ar";
}) {
  if (process.env.SEG_LOCAL_EMAIL_LOGIN === "true" && localStorageEnabled()) {
    const user = localStore().list<typeof users.$inferSelect>("local-users", 0).find(row => row.id === input.userId);
    if (!user) throw new Error("Local user not found");
    localStore().update("local-users", 0, user.openId, { name: input.fullName.trim(), updatedAt: new Date() });
    localStore().put("profiles", input.userId, "profile", { ...await getLearningProfile(input.userId), ...input, updatedAt: new Date() });
    return;
  }
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const country = input.country?.trim() || null;

  await db.transaction(async tx => {
    await tx
      .update(users)
      .set({ name: input.fullName.trim() })
      .where(eq(users.id, input.userId));

    await tx
      .insert(learningProfiles)
      .values({
        userId: input.userId,
        professionalTrack: input.professionalTrack.trim(),
        trainingLevel: input.trainingLevel,
        country,
        graduationYear: input.graduationYear ?? null,
        preferredLanguage: input.preferredLanguage,
      })
      .onDuplicateKeyUpdate({
        set: {
          professionalTrack: input.professionalTrack.trim(),
          trainingLevel: input.trainingLevel,
          country,
          graduationYear: input.graduationYear ?? null,
          preferredLanguage: input.preferredLanguage,
        },
      });
  });
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function getOrCreateLocalEmailUser(emailInput: string) {
  if (!localStorageEnabled()) {
    throw new Error("Local workspace storage is not enabled");
  }
  const email = normalizeEmail(emailInput);
  const store = localStore();
  const localUsers = store.list<typeof users.$inferSelect>("local-users", 0);
  const existing = localUsers.find(user => user.email === email);
  if (existing) {
    const updated = { ...existing, lastSignedIn: new Date(), updatedAt: new Date() };
    store.put("local-users", 0, existing.openId, updated);
    return updated;
  }
  const now = new Date();
  const user = {
    id: localUsers.reduce((max, item) => Math.max(max, item.id), 0) + 1,
    openId: `local-email:${email}`,
    email,
    name: email.split("@")[0],
    role: "user" as const,
    loginMethod: "local-email",
    createdAt: now,
    updatedAt: now,
    lastSignedIn: now,
    emailVerifiedAt: now,
  };
  store.put("local-users", 0, user.openId, user, true);
  return user;
}

export async function getEmailCredential(email: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select({ credential: emailCredentials, user: users })
    .from(emailCredentials)
    .innerJoin(users, eq(emailCredentials.userId, users.id))
    .where(eq(emailCredentials.email, normalizeEmail(email)))
    .limit(1);

  return result[0];
}

export async function createEmailUser(input: {
  openId: string;
  name: string;
  email: string;
  passwordHash: string;
  professionalTrack: string;
  trainingLevel?: string;
  country?: string;
  graduationYear?: number;
  preferredLanguage: "en" | "ar";
  verificationCodeHash: string;
  verificationExpiresAt: Date;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");

  const email = normalizeEmail(input.email);
  return db.transaction(async tx => {
    const insertResult = await tx.insert(users).values({
      openId: input.openId,
      name: input.name,
      email,
      loginMethod: "email",
      lastSignedIn: new Date(),
    });
    const userId = Number(insertResult[0].insertId);
    if (!Number.isSafeInteger(userId) || userId <= 0) {
      throw new Error("Failed to create user");
    }

    await tx
      .insert(emailCredentials)
      .values({ userId, email, passwordHash: input.passwordHash });
    await tx.insert(learningProfiles).values({
      userId,
      professionalTrack: input.professionalTrack,
      trainingLevel: input.trainingLevel ?? "pgy1",
      country: input.country,
      graduationYear: input.graduationYear,
      preferredLanguage: input.preferredLanguage,
    });
    await tx.insert(emailVerificationCodes).values({
      userId,
      codeHash: input.verificationCodeHash,
      expiresAt: input.verificationExpiresAt,
    });

    const created = await tx
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    if (!created[0]) throw new Error("Failed to load created user");
    return created[0];
  });
}

export async function getEmailVerification(email: string) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const result = await db
    .select({ verification: emailVerificationCodes, user: users })
    .from(emailCredentials)
    .innerJoin(users, eq(emailCredentials.userId, users.id))
    .innerJoin(
      emailVerificationCodes,
      eq(emailVerificationCodes.userId, users.id)
    )
    .where(eq(emailCredentials.email, normalizeEmail(email)))
    .limit(1);
  return result[0];
}

export async function incrementVerificationAttempts(
  userId: number,
  attempts: number
) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db
    .update(emailVerificationCodes)
    .set({ attempts })
    .where(eq(emailVerificationCodes.userId, userId));
}

export async function replaceVerificationCode(
  userId: number,
  codeHash: string,
  expiresAt: Date
) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db
    .insert(emailVerificationCodes)
    .values({
      userId,
      codeHash,
      expiresAt,
      attempts: 0,
      lastSentAt: new Date(),
    })
    .onDuplicateKeyUpdate({
      set: { codeHash, expiresAt, attempts: 0, lastSentAt: new Date() },
    });
}

export async function markEmailVerified(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.transaction(async tx => {
    await tx
      .update(users)
      .set({ emailVerifiedAt: new Date(), lastSignedIn: new Date() })
      .where(eq(users.id, userId));
    await tx
      .delete(emailVerificationCodes)
      .where(eq(emailVerificationCodes.userId, userId));
  });
}

export async function upsertResidentStudyProgress(input: {
  userId: number;
  family: "FRCEM" | "HIPPO";
  chapterNumber: number;
  completed: boolean;
}) {
  if (localStorageEnabled()) {
    localStore().put("progress", input.userId, `${input.family}:${input.chapterNumber}`, { ...input, id: input.chapterNumber, completed: Number(input.completed), lastReadAt: new Date() });
    return;
  }
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const now = new Date();
  await db
    .insert(residentStudyProgress)
    .values({
      userId: input.userId,
      family: input.family,
      chapterNumber: input.chapterNumber,
      completed: input.completed ? 1 : 0,
      lastReadAt: now,
    })
    .onDuplicateKeyUpdate({
      set: { completed: input.completed ? 1 : 0, lastReadAt: now },
    });
}

export async function getResidentStudyProgress(
  userId: number,
  family: "FRCEM" | "HIPPO"
) {
  if (localStorageEnabled()) return localStore().list<typeof residentStudyProgress.$inferSelect>("progress", userId).filter(row => row.family === family);
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  return db
    .select()
    .from(residentStudyProgress)
    .where(
      and(
        eq(residentStudyProgress.userId, userId),
        eq(residentStudyProgress.family, family)
      )
    );
}

export async function recordResidentQuestionAttempt(input: {
  userId: number;
  questionId: string;
  family:
    | "EDIC"
    | "FRCEM"
    | "HIPPO"
    | "OXFORD_SCE"
    | "PEER_2026"
    | "PEER_PHYSICIANS"
    | "ROSEN_10E"
    | "ROSH_2026"
    | "TINTINALLI_9E"
    | "AQRAB";
  chapterNumber: number;
  selectedAnswer: string;
  correct: boolean;
}) {
  if (localStorageEnabled()) {
    const rows = localStore().list<typeof residentQuestionAttempts.$inferSelect>("attempts", input.userId);
    const id = rows.reduce((max, row) => Math.max(max, row.id), 0) + 1;
    localStore().put("attempts", input.userId, String(id), { ...input, id, correct: Number(input.correct), attemptedAt: new Date() }, true);
    return;
  }
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db
    .insert(residentQuestionAttempts)
    .values({ ...input, correct: input.correct ? 1 : 0 });
}

export async function getResidentPracticeSummary(userId: number) {
  if (localStorageEnabled()) {
    const { attempts } = await getQuestionHistory(userId);
    return { attempted: attempts.length, correct: attempts.reduce((total, row) => total + row.correct, 0), recent: attempts.slice(0, 10) };
  }
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const totals = await db
    .select({
      attempted: sql<number>`count(*)`,
      correct: sql<number>`coalesce(sum(${residentQuestionAttempts.correct}), 0)`,
    })
    .from(residentQuestionAttempts)
    .where(eq(residentQuestionAttempts.userId, userId));
  const recent = await db
    .select()
    .from(residentQuestionAttempts)
    .where(eq(residentQuestionAttempts.userId, userId))
    .orderBy(desc(residentQuestionAttempts.attemptedAt))
    .limit(10);
  return {
    attempted: Number(totals[0]?.attempted ?? 0),
    correct: Number(totals[0]?.correct ?? 0),
    recent,
  };
}

export async function listQbankExams(userId: number) {
  if (localStorageEnabled()) return localStore().list<typeof qbankExams.$inferSelect>("exams", userId).sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  return db
    .select()
    .from(qbankExams)
    .where(eq(qbankExams.userId, userId))
    .orderBy(desc(qbankExams.updatedAt));
}

export async function createQbankExam(input: typeof qbankExams.$inferInsert) {
  if (localStorageEnabled()) {
    localStore().put("exams", input.userId, input.id, { status: "active", currentIndex: 0, remainingSeconds: null, correctCount: null, completedAt: null, startedAt: new Date(), updatedAt: new Date(), ...input }, true);
    return input;
  }
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.insert(qbankExams).values(input);
  return input;
}

export async function updateQbankExam(
  userId: number,
  id: string,
  values: Partial<typeof qbankExams.$inferInsert>
) {
  if (localStorageEnabled()) {
    localStore().update("exams", userId, id, { ...values, id, userId, updatedAt: new Date() });
    return;
  }
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db
    .update(qbankExams)
    .set(values)
    .where(and(eq(qbankExams.id, id), eq(qbankExams.userId, userId)));
}

export async function setQuestionState(
  userId: number,
  questionId: string,
  values: { flagged?: boolean; skipped?: boolean }
) {
  if (localStorageEnabled()) {
    const previous = localStore().list<typeof qbankQuestionStates.$inferSelect>("states", userId).find(row => row.questionId === questionId);
    localStore().put("states", userId, questionId, { userId, questionId, flagged: values.flagged === undefined ? previous?.flagged ?? 0 : Number(values.flagged), skipped: values.skipped === undefined ? previous?.skipped ?? 0 : Number(values.skipped), updatedAt: new Date() });
    return;
  }
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const row = {
    userId,
    questionId,
    flagged: values.flagged ? 1 : 0,
    skipped: values.skipped ? 1 : 0,
  };
  await db
    .insert(qbankQuestionStates)
    .values(row)
    .onDuplicateKeyUpdate({
      set: {
        flagged:
          values.flagged === undefined
            ? sql`${qbankQuestionStates.flagged}`
            : row.flagged,
        skipped:
          values.skipped === undefined
            ? sql`${qbankQuestionStates.skipped}`
            : row.skipped,
      },
    });
}

export async function getQuestionHistory(userId: number) {
  if (localStorageEnabled()) return {
    attempts: localStore().list<typeof residentQuestionAttempts.$inferSelect>("attempts", userId).sort((a, b) => b.attemptedAt.getTime() - a.attemptedAt.getTime()),
    states: localStore().list<typeof qbankQuestionStates.$inferSelect>("states", userId),
  };
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const attempts = await db
    .select()
    .from(residentQuestionAttempts)
    .where(eq(residentQuestionAttempts.userId, userId))
    .orderBy(desc(residentQuestionAttempts.attemptedAt));
  const states = await db
    .select()
    .from(qbankQuestionStates)
    .where(eq(qbankQuestionStates.userId, userId));
  return { attempts, states };
}

export async function listJournalNotes(userId: number) {
  if (localStorageEnabled()) return localStore().list<typeof medicalJournalNotes.$inferSelect>("notes", userId).sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  return db
    .select()
    .from(medicalJournalNotes)
    .where(eq(medicalJournalNotes.userId, userId))
    .orderBy(desc(medicalJournalNotes.updatedAt));
}

export async function createJournalNote(
  input: typeof medicalJournalNotes.$inferInsert
) {
  if (localStorageEnabled()) {
    localStore().put("notes", input.userId, input.id, { folder: "General", linkedType: "none", linkedId: null, bookmarked: 0, lastReviewedAt: null, createdAt: new Date(), updatedAt: new Date(), ...input }, true);
    return input;
  }
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.insert(medicalJournalNotes).values(input);
  return input;
}

export async function updateJournalNote(
  userId: number,
  id: string,
  values: Partial<typeof medicalJournalNotes.$inferInsert>
) {
  if (localStorageEnabled()) { localStore().update("notes", userId, id, { ...values, id, userId, updatedAt: new Date() }); return; }
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db
    .update(medicalJournalNotes)
    .set(values)
    .where(
      and(
        eq(medicalJournalNotes.id, id),
        eq(medicalJournalNotes.userId, userId)
      )
    );
}

export async function deleteJournalNote(userId: number, id: string) {
  if (localStorageEnabled()) { localStore().delete("notes", userId, id); return; }
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db
    .delete(medicalJournalNotes)
    .where(
      and(
        eq(medicalJournalNotes.id, id),
        eq(medicalJournalNotes.userId, userId)
      )
    );
}

export async function createContentIssueReport(
  input: typeof contentIssueReports.$inferInsert
) {
  if (localStorageEnabled()) {
    localStore().put("issues", input.userId, input.id, { status: "open", createdAt: new Date(), updatedAt: new Date(), ...input }, true);
    return input;
  }
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.insert(contentIssueReports).values(input);
  return input;
}

export async function getArabicTranslations(questionIds: string[]) {
  if (!questionIds.length) {
    return new Map<string, typeof questionArabicTranslations.$inferSelect>();
  }
  if (localStorageEnabled()) {
    const rows = localStore().list<typeof questionArabicTranslations.$inferSelect>("arabic-translations", 0);
    return new Map(
      rows
        .filter(row => questionIds.includes(row.questionId))
        .map(row => [row.questionId, row] as const)
    );
  }
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const rows = await db
    .select()
    .from(questionArabicTranslations)
    .where(inArray(questionArabicTranslations.questionId, questionIds));
  return new Map(rows.map(row => [row.questionId, row] as const));
}

export async function saveArabicTranslation(
  input: typeof questionArabicTranslations.$inferInsert
) {
  if (localStorageEnabled()) {
    localStore().put(
      "arabic-translations",
      0,
      input.questionId,
      {
        status: "pending-review",
        createdByUserId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...input,
      },
      true
    );
    return input;
  }
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db
    .insert(questionArabicTranslations)
    .values(input)
    .onDuplicateKeyUpdate({
      set: {
        text: input.text,
        sourceBank: input.sourceBank,
        status: input.status ?? "pending-review",
        updatedAt: new Date(),
      },
    });
  return input;
}

export async function getStudyPlan(userId: number) {
  if (localStorageEnabled()) return localStore().list<any>("studyPlans", userId)[0] ?? null;
  return null;
}

export async function saveStudyPlan(userId: number, plan: unknown) {
  if (localStorageEnabled()) { localStore().put("studyPlans", userId, "current", { ...plan as object, userId, updatedAt: new Date() }); return plan; }
  throw new Error("Study plan persistence requires local workspace mode; hosted storage is not configured");
}

export type StudyTaskCompletion = { date: string; taskId: string; completed: boolean; updatedAt: Date };
export async function getOrCreateDailyPlan(userId: number, date: string, planId: string, tasks: import("../shared/study-plan-engine").DailyTask[]) {
  if (!localStorageEnabled()) throw new Error("Daily plan storage requires local workspace mode");
  const id = `${date}:${planId}`;
  const saved = localStore().list<{ id: string; tasks: typeof tasks }>("dailyPlans", userId).find(row => row.id === id);
  if (saved) return saved.tasks;
  localStore().put("dailyPlans", userId, id, { id, date, planId, tasks, createdAt: new Date() }, true);
  return tasks;
}
export async function getStudyTaskCompletions(userId: number, date: string) {
  if (!localStorageEnabled()) throw new Error("Study task storage requires local workspace mode");
  return localStore().list<StudyTaskCompletion>("studyTaskCompletions", userId).filter(row => row.date === date);
}
export async function saveStudyTaskCompletion(userId: number, input: Omit<StudyTaskCompletion, "updatedAt">) {
  if (!localStorageEnabled()) throw new Error("Study task storage requires local workspace mode");
  const assigned = localStore().list<{ date: string; tasks: { id: string }[] }>("dailyPlans", userId)
    .some(day => day.date === input.date && day.tasks.some(task => task.id === input.taskId));
  if (!assigned) throw new Error("Task is not assigned in the saved daily plan");
  localStore().put("studyTaskCompletions", userId, `${input.date}:${input.taskId}`, { ...input, updatedAt: new Date() });
  return { success: true as const };
}
