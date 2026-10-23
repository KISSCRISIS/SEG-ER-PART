import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";
import superjson from "superjson";

/** SQLite document storage preserves dates and isolates each user's workspace. */
export class LocalStore {
  private database: DatabaseSync;
  constructor(filename: string) {
    if (filename !== ":memory:") mkdirSync(path.dirname(filename), { recursive: true });
    this.database = new DatabaseSync(filename);
    this.database.exec("PRAGMA busy_timeout=5000; PRAGMA journal_mode=DELETE; PRAGMA synchronous=FULL;");
    this.database.exec(`CREATE TABLE IF NOT EXISTS workspace (
      collection TEXT NOT NULL, user_id INTEGER NOT NULL, id TEXT NOT NULL,
      document TEXT NOT NULL, PRIMARY KEY(collection, user_id, id));`);
  }
  list<T>(collection: string, userId: number): T[] {
    return this.database.prepare("SELECT document FROM workspace WHERE collection=? AND user_id=? ORDER BY rowid")
      .all(collection, userId).map(row => superjson.parse<T>(String(row.document)));
  }
  put<T>(collection: string, userId: number, id: string, document: T, insertOnly = false) {
    const conflict = insertOnly ? "" : " ON CONFLICT(collection,user_id,id) DO UPDATE SET document=excluded.document";
    this.database.prepare("INSERT INTO workspace(collection,user_id,id,document) VALUES(?,?,?,?)" + conflict)
      .run(collection, userId, id, superjson.stringify(document));
  }
  update<T extends object>(collection: string, userId: number, id: string, values: Partial<T>) {
    this.database.exec("BEGIN IMMEDIATE");
    try {
      const row = this.database.prepare("SELECT document FROM workspace WHERE collection=? AND user_id=? AND id=?").get(collection, userId, id);
      if (row) this.put(collection, userId, id, { ...superjson.parse<T>(String(row.document)), ...values });
      this.database.exec("COMMIT");
    } catch (error) { this.database.exec("ROLLBACK"); throw error; }
  }
  delete(collection: string, userId: number, id: string) {
    this.database.prepare("DELETE FROM workspace WHERE collection=? AND user_id=? AND id=?").run(collection, userId, id);
  }
  close() { this.database.close(); }
}

let instance: LocalStore | undefined;
export function localStorageEnabled() { return process.env.SEG_LOCAL_WORKSPACE === "true"; }
export function localStore() {
  if (!process.env.SEG_LOCAL_DATA_DIR) throw new Error("SEG_LOCAL_DATA_DIR is required for local workspace storage");
  return instance ??= new LocalStore(path.resolve(process.env.SEG_LOCAL_DATA_DIR, "workspace.sqlite"));
}
