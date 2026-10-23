/**
 * Device document store — offline replacement for server/localStore.ts
 * (node:sqlite). Same collection/id/document semantics, persisted per user
 * via the mobile-storage abstraction (Capacitor Preferences on Android,
 * localStorage on web). Dates survive the round-trip through an explicit
 * marker so queries observe real Date objects, like superjson on the server.
 */
import { storageGetAsync, storageRemoveAsync, storageSetAsync } from "../mobile-storage";

const PREFIX = "seg-offline/v1";
const DATE_MARK = "$segDate";

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

function collectionKey(collection: string, userId: number): string {
  return `${PREFIX}:${collection}:${userId}`;
}

function serialize(value: unknown): JsonValue {
  if (value instanceof Date) return { [DATE_MARK]: value.toISOString() } as JsonValue;
  if (Array.isArray(value)) return value.map(serialize) as JsonValue;
  if (value !== null && typeof value === "object") {
    const out: { [key: string]: JsonValue } = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) out[k] = serialize(v);
    return out;
  }
  return value as JsonValue;
}

function deserialize(value: JsonValue): unknown {
  if (Array.isArray(value)) return value.map(deserialize);
  if (value !== null && typeof value === "object") {
    const rec = value as { [key: string]: JsonValue };
    const keys = Object.keys(rec);
    if (keys.length === 1 && typeof rec[DATE_MARK] === "string") {
      return new Date(rec[DATE_MARK] as string);
    }
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(rec)) out[k] = deserialize(v);
    return out;
  }
  return value;
}

async function readCollection<T>(collection: string, userId: number): Promise<Record<string, T>> {
  try {
    const raw = await storageGetAsync(collectionKey(collection, userId));
    if (!raw) return {};
    const parsed = deserialize(JSON.parse(raw) as JsonValue);
    if (parsed !== null && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, T>;
    }
    return {};
  } catch {
    return {};
  }
}

async function writeCollection<T>(collection: string, userId: number, docs: Record<string, T>): Promise<void> {
  await storageSetAsync(collectionKey(collection, userId), JSON.stringify(serialize(docs)));
}

export async function listDocs<T>(collection: string, userId: number): Promise<T[]> {
  return Object.values(await readCollection<T>(collection, userId));
}

export async function getDoc<T>(collection: string, userId: number, id: string): Promise<T | null> {
  const docs = await readCollection<T>(collection, userId);
  return docs[id] ?? null;
}

export async function putDoc<T>(collection: string, userId: number, id: string, doc: T): Promise<void> {
  const docs = await readCollection<T>(collection, userId);
  docs[id] = doc;
  await writeCollection(collection, userId, docs);
}

export async function updateDoc<T extends object>(
  collection: string,
  userId: number,
  id: string,
  values: Partial<T>
): Promise<void> {
  const docs = await readCollection<T>(collection, userId);
  if (docs[id]) {
    docs[id] = { ...docs[id], ...values };
    await writeCollection(collection, userId, docs);
  }
}

export async function deleteDoc(collection: string, userId: number, id: string): Promise<void> {
  const docs = await readCollection<unknown>(collection, userId);
  if (id in docs) {
    delete docs[id];
    await writeCollection(collection, userId, docs);
  }
}

export async function clearCollection(collection: string, userId: number): Promise<void> {
  try {
    await storageRemoveAsync(collectionKey(collection, userId));
  } catch {
    // storage unavailable — nothing to clear.
  }
}
