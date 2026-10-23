/** Minimal local PDF extractor — no external AI, no invented medical summaries.
 *  Uses Node zlib for FlateDecode streams; extracts text from /Tj and /TJ operators.
 *  If a page yields no extractable text, it is marked image-only (OCR needed).
 *  Source page numbers are preserved so summaries reference actual pages.
 */
import { randomBytes } from "node:crypto";
import { lstat, mkdir, writeFile, readdir } from "node:fs/promises";
import path from "node:path";
import zlib from "node:zlib";

export const PDF_STORE_DIR = process.env.SEG_LOCAL_DATA_DIR
  ? path.resolve(process.env.SEG_LOCAL_DATA_DIR, "pdf-library")
  : path.resolve(".", ".seg-pdf-library");

export type ExtractedText = { page: number; text: string; isImageOnly: boolean; sourcePages: number[] };

function inflateBuffer(buffer: Buffer): Buffer {
  try { return zlib.inflateSync(buffer); } catch { return zlib.inflateRawSync(buffer); }
}

export function countPagesAndExtract(pdfBuffer: Buffer): { pageCount: number; pages: ExtractedText[] } {
  const text = pdfBuffer.toString("latin1");
  const pages: ExtractedText[] = [];
  const textRegexes = [
    /\(([^(\\\)]+)\)\s*Tj/g,
    /\[([^\]]+)\]\s*TJ/g,
  ];

  // Count pages by finding /Type /Page (excluding Pages)
  let pageCount = 0;
  pageCount = Array.from(text.matchAll(/\/Type\s*\/Page\s*(?!\w)/g)).length;

  // For text extraction, split by content streams roughly
  const streamRegex = /stream\r?\n([\s\S]*?)endstream/g;
  let streamIndex = 0;
  for (const streamMatch of text.matchAll(streamRegex)) {
    streamIndex++;
    const raw = streamMatch[1];
    if (raw.length < 10) continue;
    let decompressed = "";
    try {
      const compressed = Buffer.from(raw.replace(/\r?\n/g, "").trim(), "latin1");
      // Only attempt inflate if it looks compressed (starts with zlib header or has FlateDecode)
      if (raw.includes("/FlateDecode") || raw.length > 50) {
        try {
          const inflated = inflateBuffer(compressed);
          decompressed = inflated.toString("latin1");
        } catch {
          decompressed = raw.replace(/\r?\n/g, " ");
        }
      } else {
        decompressed = raw.replace(/\r?\n/g, " ");
      }
    } catch {
      decompressed = raw.replace(/\r?\n/g, " ");
    }
    // Extract text from Tj / TJ
    let pageText = "";
    for (const regex of textRegexes) {
      for (const m of decompressed.matchAll(regex)) {
        pageText += m[1].replace(/\\\(/g, "(").replace(/\\\)/g, ")").replace(/\\n/g, "\n").replace(/\\r/g, " ").replace(/\\t/g, " ").trim() + " ";
      }
    }
    // Only record if any text found or if it's the first stream per page
    if (pageText.trim().length > 2 || streamIndex <= pageCount) {
      pages.push({ page: streamIndex, text: pageText.trim(), isImageOnly: pageText.trim().length < 10, sourcePages: [streamIndex] });
    }
  }

  // If stream-based extraction didn't find much, fall back to simple text extraction from PDF body
  if (pages.length === 0) {
    const bodyText = pdfBuffer.toString("latin1").replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F]/g, " ");
    // Just report total pages and one summary page
    pages.push({ page: 1, text: bodyText.slice(0, 8000), isImageOnly: bodyText.trim().length < 50, sourcePages: Array.from({ length: pageCount }, (_, i) => i + 1) });
  }

  return { pageCount, pages };
}

export function summarizeExtracted(pages: ExtractedText[], pageRange?: number[]): { summaryText: string; sourcePages: number[]; isImageOnlyDetected: boolean } {
  const selected = pageRange ? pages.filter(p => p.sourcePages.some(sp => pageRange.includes(sp))) : pages;
  const hasText = selected.some(p => !p.isImageOnly && p.text.trim().length > 0);
  const hasImageOnly = selected.some(p => p.isImageOnly);
  if (!hasText && hasImageOnly) {
    return {
      summaryText: "[SCANNED IMAGE — No extractable text layer detected on selected pages. No medical content synthesized. Source pages: " + selected.map(p => p.sourcePages[0]).join(", ") + ". OCR is required for text extraction.]",
      sourcePages: selected.flatMap(p => p.sourcePages),
      isImageOnlyDetected: true,
    };
  }
  const allText = selected.map(p => `--- Page ${p.page} ---\n${p.text}`).join("\n\n");
  // Extractive summary: first 800 chars of combined text with source citations
  const preview = allText.slice(0, 1200).trim();
  return {
    summaryText: `Extractive summary (local only, no external AI used) — source pages: ${selected.flatMap(p => p.sourcePages).filter((v, i, a) => a.indexOf(v) === i).join(", ")}\n\n${preview}\n\n[Full text available in original file; this is not a medical interpretation.]`,
    sourcePages: selected.flatMap(p => p.sourcePages),
    isImageOnlyDetected: false,
  };
}

// Storage helpers
const MAX_PDF_BYTES = 35 * 1024 * 1024;

export function getPdfLibraryDir(): string | null {
  const root = process.env.SEG_LOCAL_DATA_DIR;
  return root ? path.resolve(root, "pdf-library") : null;
}

/** Validate an opaque, owner-scoped PDF ID before constructing a filesystem path. */
export function isValidOwnedPdfId(userId: number, pdfId: string): boolean {
  return Number.isSafeInteger(userId)
    && userId > 0
    && typeof pdfId === "string"
    && pdfId.length > 0
    && pdfId.length <= 240
    && !pdfId.includes("/")
    && !pdfId.includes("\\")
    && !pdfId.includes("\0")
    && pdfId === path.basename(pdfId)
    && pdfId.toLowerCase().endsWith(".pdf")
    && pdfId.startsWith(String(userId) + "-");
}

/**
 * Return a PDF path only when the requested regular file belongs to this user.
 * lstat intentionally rejects symbolic links instead of following them.
 */
export async function getOwnedPdfPath(userId: number, pdfId: string): Promise<string | null> {
  const dir = getPdfLibraryDir();
  if (!dir || !isValidOwnedPdfId(userId, pdfId)) return null;

  const filePath = path.resolve(dir, pdfId);
  if (path.dirname(filePath) !== dir) return null;

  try {
    const info = await lstat(filePath);
    if (!info.isFile() || info.isSymbolicLink()) return null;
    return filePath;
  } catch {
    return null;
  }
}

export async function storePdf(userId: number, filename: string, buffer: Buffer) {
  const dir = getPdfLibraryDir();
  if (!dir) throw new Error("SEG_LOCAL_DATA_DIR not set");
  if (!Number.isSafeInteger(userId) || userId <= 0) throw new Error("Invalid PDF owner.");
  if (
    !filename
    || filename !== filename.trim()
    || filename.includes("/")
    || filename.includes("\\")
    || filename.includes("\0")
    || filename.length > 120
    || !filename.toLowerCase().endsWith(".pdf")
  ) {
    throw new Error("Invalid PDF filename.");
  }
  if (!Buffer.isBuffer(buffer) || buffer.length < 5 || buffer.length > MAX_PDF_BYTES) {
    throw new Error("PDF exceeds the 35 MiB upload limit or is empty.");
  }
  if (buffer.subarray(0, 5).toString("ascii") !== "%PDF-") {
    throw new Error("The uploaded file does not have a valid PDF header.");
  }

  await mkdir(dir, { recursive: true });
  const id = String(userId) + "-" + Date.now() + "-" + randomBytes(6).toString("hex") + "-" + path.basename(filename);
  const filePath = path.resolve(dir, id);
  if (path.dirname(filePath) !== dir) throw new Error("Invalid PDF path.");
  await writeFile(filePath, buffer, { flag: "wx" });

  return { id, filePath, name: filename, pages: 0, createdAt: new Date().toISOString() };
}

export async function listStoredPdfs(userId: number): Promise<{ id: string; name: string; pages: number; createdAt: string; filePath: string }[]> {
  const dir = getPdfLibraryDir();
  if (!dir || !Number.isSafeInteger(userId) || userId <= 0) return [];

  const prefix = String(userId) + "-";
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    const files = entries.filter(entry =>
      entry.isFile() && entry.name.startsWith(prefix) && entry.name.toLowerCase().endsWith(".pdf")
    );
    const rows = await Promise.all(files.map(async file => {
      const filePath = path.resolve(dir, file.name);
      if (path.dirname(filePath) !== dir) return null;
      try {
        const info = await lstat(filePath);
        if (!info.isFile() || info.isSymbolicLink()) return null;
        const storedName = file.name.slice(prefix.length).replace(/^\d+-[a-f0-9]{12}-/i, "");
        return {
          id: file.name,
          name: storedName || file.name,
          pages: 0,
          createdAt: info.mtime.toISOString(),
          filePath,
        };
      } catch {
        return null;
      }
    }));
    return rows.filter((row): row is NonNullable<typeof row> => row !== null);
  } catch {
    return [];
  }
}
