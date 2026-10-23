import { readFile, writeFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

export type RawQuestion = {
  id: string;
  family?: string;
  chapterNumber?: number;
  chapterTitle?: string;
  sourceQuestionNumber?: number;
  question?: string;
  options?: { key: string; text: string }[];
  correctAnswerKey?: string | null;
  correctAnswer?: string;
  englishExplanation?: string;
  arabicExplanation?: string;
  references?: string[];
  notes?: string;
  governanceStatus?: string;
};

export type ImportRow = {
  index: number;
  raw: Partial<RawQuestion>;
  errors: string[];
  duplicateOf?: string;
};

function isObject(obj: unknown): obj is Record<string, unknown> {
  return typeof obj === "object" && obj !== null && !Array.isArray(obj);
}

function parseCsvLine(line: string): string[] {
  const out: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (inQuotes) {
      if (char === '"') {
        if (line[i + 1] === '"') { current += '"'; i++; }
        else inQuotes = false;
      } else current += char;
    } else if (char === '"') inQuotes = true;
    else if (char === ",") { out.push(current); current = ""; }
    else current += char;
  }
  out.push(current);
  return out.map(value => value.trim());
}

export async function parseImportPayload(filename: string, content: string) {
  const format = filename.toLowerCase().endsWith(".csv") ? "csv" : "json";
  if (format === "csv") {
    const lines = content.trim().split(/\r?\n/).filter(line => line.trim().length > 0);
    if (lines.length < 2) return { rows: [] as RawQuestion[] };
    const headers = parseCsvLine(lines[0]).map(h => h.toLowerCase().replace(/[^a-z0-9]/g, ""));
    const rows: RawQuestion[] = [];
    for (let i = 1; i < lines.length; i++) {
      const parts = parseCsvLine(lines[i]);
      const obj: Partial<RawQuestion> = {};
      headers.forEach((h, idx) => {
        const val = parts[idx] ?? "";
        if (h === "id") obj.id = val || undefined;
        else if (h === "family") obj.family = val || undefined;
        else if (h === "chapternumber") obj.chapterNumber = val ? Number(val) || undefined : undefined;
        else if (h === "sourcequestionnumber") obj.sourceQuestionNumber = val ? Number(val) || undefined : undefined;
        else if (h === "question") obj.question = val || undefined;
        else if (h === "chaptertitle") obj.chapterTitle = val || undefined;
        else if (h === "correctanswerkey") obj.correctAnswerKey = val || undefined;
        else if (h === "correctanswer") obj.correctAnswer = val || undefined;
        else if (h === "englishexplanation") obj.englishExplanation = val || undefined;
        else if (h === "arabicexplanation") obj.arabicExplanation = val || undefined;
        else if (h === "notes") obj.notes = val || undefined;
        else if (h === "governancestatus") obj.governanceStatus = val || undefined;
        else if (h === "references") obj.references = val ? val.split("|").map(s => s.trim()).filter(Boolean) : [];
        else if (h === "options") {
          if (!val) { obj.options = []; return; }
          try {
            const parsed = JSON.parse(val);
            obj.options = Array.isArray(parsed) ? parsed : [];
          } catch {
            // Support A|B|C style options where the first token is the key
            obj.options = val.split("|").map(part => {
              const [key, ...rest] = part.split(":");
              return { key: (key ?? "").trim(), text: rest.join(":").trim() };
            }).filter(option => option.key);
          }
        }
      });
      if (obj.id) rows.push(obj as RawQuestion);
    }
    return { rows };
  }
  // JSON / JSONL
  const trimmed = content.trim();
  if (trimmed.startsWith("[")) {
    const parsed = JSON.parse(trimmed);
    if (Array.isArray(parsed)) return { rows: parsed as RawQuestion[] };
  }
  const lines = trimmed.split(/\r?\n/).filter(l => l.trim().length > 0);
  const rows = lines.map(l => JSON.parse(l) as RawQuestion);
  return { rows };
}

export function validateRows(rows: RawQuestion[], existingIds = new Set<string>()) {
  const results: ImportRow[] = [];
  const seen = new Set<string>();
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    const errors: string[] = [];
    if (!r.id || typeof r.id !== "string" || r.id.trim().length === 0) errors.push("Missing or empty id");
    if (!r.question || typeof r.question !== "string" || r.question.trim().length < 3) errors.push("Missing or too short question text");
    if (!r.chapterTitle || typeof r.chapterTitle !== "string") errors.push("Missing chapterTitle");
    if (!r.options || !Array.isArray(r.options) || r.options.length === 0) errors.push("Options must be a non-empty array");
    else {
      for (let j = 0; j < r.options.length; j++) {
        const opt = r.options[j];
        if (!opt || typeof opt !== "object" || !opt.key || !opt.text) errors.push(`Invalid option at index ${j}`);
      }
    }
    if (r.correctAnswerKey) {
      const hasKey = r.options?.some(o => o.key === r.correctAnswerKey);
      if (!hasKey) errors.push(`correctAnswerKey "${r.correctAnswerKey}" not found in options`);
    } else errors.push("Missing correctAnswerKey");
    if (r.id && seen.has(r.id)) errors.push(`Duplicate id within import: ${r.id}`);
    else if (r.id) seen.add(r.id);
    if (r.id && existingIds.has(r.id)) errors.push(`Already exists in banks: ${r.id}`);
    results.push({ index: i, raw: r, errors, duplicateOf: r.id && existingIds.has(r.id) ? r.id : undefined });
  }
  return results;
}

/** Normalized fingerprint used to detect duplicated question bodies across banks. */
export function questionFingerprint(question: {
  question?: string;
  options?: { key: string; text: string }[];
}): string {
  const body = (question.question ?? "").trim().toLowerCase().replace(/\s+/g, " ");
  const options = (question.options ?? [])
    .map(option => `${option.key}:${(option.text ?? "").trim().toLowerCase()}`)
    .sort()
    .join("|");
  return `${body}::${options}`;
}

export async function listImportedFiles(dirRoot: string) {
  try {
    const entries = await readdir(dirRoot, { withFileTypes: true });
    const files = entries.filter(e => e.isFile() && (e.name.endsWith(".jsonl") || e.name.endsWith(".json")));
    return files.map(f => f.name);
  } catch { return []; }
}
