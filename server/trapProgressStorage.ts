import { eq } from "drizzle-orm";
import { getDb } from "./db";
import { trapStudyProgress } from "../drizzle/schema";
import { localStorageEnabled, localStore } from "./localStore";

export type TrapProgress = { trapId: string; completed: boolean; completedAt: Date | null; updatedAt: Date };
export async function listTrapRecords(userId: number): Promise<TrapProgress[]> {
  if (localStorageEnabled()) return localStore().list<TrapProgress>("trapProgress", userId);
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const rows = await db.select().from(trapStudyProgress).where(eq(trapStudyProgress.userId, userId));
  return rows.map(row => ({ ...row, completed: Boolean(row.completed) }));
}
export async function putTrapRecord(userId: number, row: TrapProgress, importOnly = false) {
  if (localStorageEnabled()) {
    localStore().put("trapProgress", userId, row.trapId, row);
    return;
  }
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const values = { ...row, userId, completed: Number(row.completed) };
  if (importOnly) {
    // Existing rows (including explicit undo) always take precedence over browser imports.
    await db.insert(trapStudyProgress).values(values).onDuplicateKeyUpdate({ set: { trapId: row.trapId } });
  } else {
    await db.insert(trapStudyProgress).values(values).onDuplicateKeyUpdate({ set: { completed: values.completed, completedAt: row.completedAt, updatedAt: row.updatedAt } });
  }
}
