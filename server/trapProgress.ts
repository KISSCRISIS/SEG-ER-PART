import { TRPCError } from "@trpc/server";
import { listTrapRecords, putTrapRecord } from "./trapProgressStorage";
import { listRecoveredExamTraps } from "./recoveryLibrary";

async function catalog() {
  const first = await listRecoveredExamTraps({ page: 1, pageSize: 50 });
  const rest = await Promise.all(Array.from({ length: Math.ceil(first.total / 50) - 1 }, (_, index) => listRecoveredExamTraps({ page: index + 2, pageSize: 50 })));
  return [...first.items, ...rest.flatMap(page => page.items)];
}
export async function getTrapProgress(userId: number) {
  const items = await catalog();
  const rows = await listTrapRecords(userId);
  const completed = new Set(rows.filter(row => row.completed).map(row => row.trapId));
  const completedIds = items.filter(item => completed.has(item.id)).map(item => item.id);
  const nextIndex = items.findIndex(item => !completed.has(item.id));
  return {
    completedIds, recordedIds: rows.map(row => row.trapId),
    completed: completedIds.length, total: items.length,
    remaining: items.length - completedIds.length,
    percentage: items.length ? Math.round(completedIds.length / items.length * 100) : 0,
    requirementCompleted: items.length > 0 && completedIds.length === items.length,
    nextHref: nextIndex < 0 ? null : `/practice/exam-traps?page=${Math.floor(nextIndex / 50) + 1}#${items[nextIndex].id}`,
  };
}
export async function setTrapProgress(userId: number, trapId: string, completed: boolean) {
  if (!(await catalog()).some(item => item.id === trapId)) throw new TRPCError({ code: "NOT_FOUND", message: "Unknown exam trap" });
  const existing = (await listTrapRecords(userId)).find(row => row.trapId === trapId);
  if (existing?.completed === completed) return { success: true };
  await putTrapRecord(userId, { trapId, completed, completedAt: completed ? new Date() : null, updatedAt: new Date() });
  return { success: true };
}
export async function importTrapProgress(userId: number, ids: string[]) {
  const valid = new Set((await catalog()).map(item => item.id));
  const existing = new Set((await listTrapRecords(userId)).map(row => row.trapId));
  for (const id of Array.from(new Set(ids))) {
    if (valid.has(id) && !existing.has(id)) await putTrapRecord(userId, { trapId: id, completed: true, completedAt: new Date(), updatedAt: new Date() }, true);
  }
  return { success: true };
}
