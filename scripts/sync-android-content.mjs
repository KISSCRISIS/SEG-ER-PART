/**
 * Sync Android offline content — additive only.
 *
 * Copies the exact runtime content files read by the Node server
 * (server/residentContent.ts :: load() and server/recoveryLibrary.ts)
 * into client/public/content/ so the Capacitor WebView can fetch them
 * with zero server: fetch("/content/qbank/...") etc.
 *
 * Quarantined banks (legacy 1400q / PreTest) are intentionally NOT synced:
 * they fail answer-key/OCR quality gates server-side and must stay out
 * of the mobile bundle too.
 *
 * Usage: node scripts/sync-android-content.mjs [--check]
 *   --check verifies the destination is up to date without copying.
 */
import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const DEST = path.join(ROOT, "client", "public", "content");

// [source relative to repo root, destination relative to client/public/content]
const FILES = [
  // --- Qbanks + study books (server/residentContent.ts) ---
  ...[
    "edic-sba-2026-question-bank.jsonl",
    "frcem-question-bank.jsonl",
    "hippo-question-bank.jsonl",
    "oxford-sce-question-bank.jsonl",
    "peer-physicians-case-series-2026-question-bank.jsonl",
    "peer-physicians-2026-unified-question-bank.jsonl",
    "rosen-10e-question-bank.jsonl",
    "rosh-initial-certification-2026-merged-four-files-question-bank.jsonl",
    "tintinalli-9e-question-bank.jsonl",
    "frcem-study-book.json",
    "hippo-study-book.json",
  ].map((f) => [
    path.join("SEG_CONTENT_LIBRARY", "02_PROCESSED_CONTENT", "RESIDENT_EMERGENCY_MEDICINE", f),
    path.join("qbank", f),
  ]),
  // --- Reference library (server/recoveryLibrary.ts) ---
  ...[
    "fullReferenceLibrary.json",
    "flashcards.json",
    "examTraps.json",
    "masterTopicFamilyIndex.json",
    "chapterStudyMap.json",
    "arabicMentorExplanations.json",
  ].map((f) => [
    path.join("SEG_CONTENT_LIBRARY", "01_RECOVERY_SOURCE_ARTIFACTS", "REFERENCE_LIBRARY", f),
    path.join("reference", f),
  ]),
  // --- OSCE station index (server/recoveryLibrary.ts :: listRecoveredOsceStations) ---
  [
    path.join("SEG_CONTENT_LIBRARY", "01_RECOVERY_SOURCE_ARTIFACTS", "OSCE_Emergency_Medicine_Imaging_Section_UTF8.txt"),
    path.join("osce", "OSCE_Emergency_Medicine_Imaging_Section_UTF8.txt"),
  ],
];

const checkOnly = process.argv.includes("--check");

let totalBytes = 0;
const manifest = { generatedAt: new Date().toISOString(), files: [] };
const problems = [];

for (const [srcRel, destRel] of FILES) {
  const src = path.join(ROOT, srcRel);
  const dest = path.join(DEST, destRel);
  let buffer;
  try {
    buffer = await readFile(src);
  } catch {
    problems.push(`MISSING source: ${srcRel}`);
    continue;
  }
  const sha256 = createHash("sha256").update(buffer).digest("hex").slice(0, 16);
  totalBytes += buffer.length;
  manifest.files.push({ path: destRel.replace(/\\/g, "/"), bytes: buffer.length, sha256 });
  if (!checkOnly) {
    await mkdir(path.dirname(dest), { recursive: true });
    await copyFile(src, dest);
  } else {
    try {
      const existing = await readFile(dest);
      const existingHash = createHash("sha256").update(existing).digest("hex").slice(0, 16);
      if (existingHash !== sha256) problems.push(`STALE: ${destRel}`);
    } catch {
      problems.push(`ABSENT: ${destRel}`);
    }
  }
}

if (!checkOnly) {
  await writeFile(path.join(DEST, "manifest.json"), JSON.stringify(manifest, null, 2), "utf8");
}

console.log(
  `${checkOnly ? "[check]" : "[sync]"} ${manifest.files.length}/${FILES.length} files, ${(totalBytes / 1048576).toFixed(1)} MB -> client/public/content/`
);
if (problems.length > 0) {
  for (const p of problems) console.error(`  ! ${p}`);
  process.exit(1);
}
console.log("OK: content bundle complete (quarantined legacy banks excluded).");
