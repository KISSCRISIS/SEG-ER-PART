import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve();
const CONTENT_DIR = path.join(ROOT, "SEG_CONTENT_LIBRARY", "02_PROCESSED_CONTENT", "ROSEN_BARKIN_5MIN");
const MANIFEST_PATH = path.join(CONTENT_DIR, "manifest.json");
const PAGES_PATH = path.join(CONTENT_DIR, "pages.jsonl");
const EDITORIAL_PATH = path.join(CONTENT_DIR, "editorial-translations.json");
const CHECKPOINT_EVERY = 10;
const CONCURRENCY = Math.max(1, Number(process.env.SEG_TRANSLATION_CONCURRENCY ?? 1));
const REQUEST_INTERVAL_MS = Math.max(500, Number(process.env.SEG_TRANSLATION_INTERVAL_MS ?? 1_500));
const TRANSLATION_HOST = process.env.SEG_TRANSLATION_HOST ?? "translate.google.com";
if (!/^translate\.google\.[a-z.]+$/i.test(TRANSLATION_HOST) && TRANSLATION_HOST !== "translate.googleapis.com") {
  throw new Error("SEG_TRANSLATION_HOST must be a Google Translate host");
}
let lastRequestAt = 0;

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const prepareOffline = args.has("--prepare-offline");
const force = args.has("--force");
const refreshMachine = args.has("--refresh-machine");
const requestedLimit = process.argv.find(value => value.startsWith("--limit="));
const limit = requestedLimit ? Number(requestedLimit.split("=")[1]) : Number.POSITIVE_INFINITY;

const manifest = JSON.parse(await fs.readFile(MANIFEST_PATH, "utf8"));
const editorial = JSON.parse(await fs.readFile(EDITORIAL_PATH, "utf8"));
if (editorial.sourceSha256 !== manifest.sha256) throw new Error("Editorial source fingerprint mismatch");

const pages = (await fs.readFile(PAGES_PATH, "utf8"))
  .split(/\r?\n/)
  .filter(Boolean)
  .map(JSON.parse);

const groups = new Map();
for (const page of pages) {
  const chapterId = String(page.text).match(/\bch(\d+[a-z]?)\.xml\b/i)?.[1];
  if (!chapterId) continue;
  const group = groups.get(chapterId) ?? [];
  group.push(page);
  groups.set(chapterId, group);
}

function compactSection(value, maxLength = 300) {
  const lines = String(value ?? "")
    .split(/\r?\n/)
    .map(line => line.replace(/\uFFFD/g, "").replace(/\s+/g, " ").trim())
    .filter(line => line)
    .filter(line => !/^P\d+:|^LWBK\S+|^\d+$/.test(line))
    .filter(line => !/^(ADDITIONAL READING|SEE ALSO|CODES|ICD9|ICD10)$/i.test(line))
    .map(line => line
      .replace(/^(DESCRIPTION|ETIOLOGY|RISK FACTORS|ALERT|SIGNS AND SYMPTOMS|HISTORY|PHYSICAL EXAM|ESSENTIAL WORKUP|DIAGNOSIS TESTS & INTERPRETATION|LAB|IMAGING|PRE-HOSPITAL|INITIAL STABILIZATION\/THERAPY|ED TREATMENT\/PROCEDURES?|MEDICATION|PEARLS AND PITFALLS)r?\s*/i, "$1: ")
      .replace(/^r\s+/, "• ")
      .replace(/^[–◦]\s*/, "• ")
      .replace(/\bED TREATMENT\/PROCEDURES?\b/gi, "Emergency department treatment and procedures")
      .replace(/\bED TREATMENT\b/gi, "Emergency department treatment"));
  const text = lines.join(" ").replace(/\s+([,.;:])/g, "$1").trim();
  if (text.length <= maxLength) return text;
  const candidate = text.slice(0, maxLength + 1);
  const sentenceEnd = Math.max(candidate.lastIndexOf(". "), candidate.lastIndexOf("; "));
  const cut = sentenceEnd >= Math.floor(maxLength * 0.55) ? sentenceEnd + 1 : candidate.lastIndexOf(" ", maxLength);
  return `${candidate.slice(0, Math.max(cut, Math.floor(maxLength * 0.8))).trim()}…`;
}

function sliceBetween(text, starts, ends) {
  const startMatches = starts
    .map(pattern => ({ pattern, match: pattern.exec(text) }))
    .filter(item => item.match)
    .sort((a, b) => a.match.index - b.match.index);
  if (!startMatches.length) return "";
  const start = startMatches[0].match.index + startMatches[0].match[0].length;
  const end = ends
    .map(pattern => pattern.exec(text.slice(start)))
    .filter(Boolean)
    .map(match => start + match.index)
    .sort((a, b) => a - b)[0] ?? text.length;
  return text.slice(start, end);
}

function prepareChapter(chapterId, group) {
  group.sort((a, b) => a.pdfPage - b.pdfPage);
  const fullText = group.map(page => page.text).join("\n");
  const firstLines = group[0].text.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  const headerIndex = firstLines.findIndex(line => /\bch\d+[a-z]?\.xml\b/i.test(line));
  const title = firstLines[headerIndex + 1];
  if (!title) throw new Error(`Missing title for chapter ${chapterId}`);

  let summarySource = sliceBetween(fullText, [/^\s*BASICS\s*$/im], [/^\s*DIAGNOSIS\s*$/im, /^\s*TREATMENT\s*$/im]);
  let diagnosisSource = sliceBetween(fullText, [/^\s*DIAGNOSIS\s*$/im], [/^\s*TREATMENT\s*$/im, /^\s*FOLLOW-UP\s*$/im, /^\s*PEARLS AND PITFALLS\s*$/im]);
  let managementSource = sliceBetween(fullText, [/^\s*TREATMENT\s*$/im], [/^\s*FOLLOW-UP\s*$/im, /^\s*PEARLS AND PITFALLS\s*$/im, /^\s*ADDITIONAL READING\s*$/im]);

  // A few reference-style chapters intentionally omit a conventional section.
  if (!summarySource) summarySource = sliceBetween(fullText, [/^\s*TREATMENT\s*$/im], [/^\s*FOLLOW-UP\s*$/im, /^\s*ADDITIONAL READING\s*$/im]);
  if (!diagnosisSource) diagnosisSource = "This reference topic does not contain a separate diagnosis section; use the source-specific indications and clinical context.";
  if (!managementSource) managementSource = sliceBetween(fullText, [/^\s*FOLLOW-UP(?: RECOMMENDATIONS)?\s*$/im], [/^\s*ADDITIONAL READING\s*$/im, /^\s*CODES\s*$/im]);
  if (!managementSource) managementSource = "This source topic does not contain a separate treatment section; consult the cited pages and current local protocol before clinical use.";

  return {
    chapterId,
    title,
    pdfPages: { start: group[0].pdfPage, end: group.at(-1).pdfPage },
    summary: compactSection(summarySource),
    diagnosis: compactSection(diagnosisSource),
    management: compactSection(managementSource),
  };
}

const SENTINEL = index => `ZZZSEGSECTION${String(index).padStart(2, "0")}ZZZ`;

function normalizeArabic(value) {
  return String(value ?? "")
    .replace(/Z+SEGSECTION\d+Z+/g, "")
    .replace(/المجرى الجوي/g, "مجرى الهواء")
    .replace(/الدورة الدموية الدموية/g, "الدورة الدموية")
    .replace(/قسم الحالات الطارئة/g, "قسم الطوارئ")
    .replace(/\s+([،؛:.])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

async function requestTranslation(input) {
  const url = new URL(`https://${TRANSLATION_HOST}/translate_a/single`);
  for (const [key, value] of Object.entries({ client: "gtx", sl: "en", tl: "ar", dt: "t", q: input })) {
    url.searchParams.set(key, value);
  }
  for (let attempt = 1; attempt <= 8; attempt += 1) {
    const waitForSlot = Math.max(0, lastRequestAt + REQUEST_INTERVAL_MS - Date.now());
    if (waitForSlot) await new Promise(resolve => setTimeout(resolve, waitForSlot));
    lastRequestAt = Date.now();
    const response = await fetch(url, { signal: AbortSignal.timeout(30_000) });
    if (response.ok) {
      const payload = await response.json();
      return payload[0].map(item => item?.[0] ?? "").join("");
    }
    if (response.status !== 429 && response.status < 500) throw new Error(`HTTP ${response.status}`);
    const retryAfter = Number(response.headers.get("retry-after"));
    const backoff = Number.isFinite(retryAfter) && retryAfter > 0
      ? Math.min(45_000, retryAfter * 1_000)
      : Math.min(45_000, 3_000 * (2 ** (attempt - 1)));
    console.warn(`Translation service HTTP ${response.status}; retrying in ${Math.ceil(backoff / 1000)}s (${attempt}/8)`);
    await new Promise(resolve => setTimeout(resolve, backoff));
  }
  throw new Error("Translation service retry limit reached");
}

async function translateOne(text, attempt = 1) {
  try {
    const result = normalizeArabic(await requestTranslation(text));
    if (!/[\u0600-\u06ff]/.test(result)) throw new Error("Translation did not contain Arabic text");
    return result;
  } catch (error) {
    if (attempt >= 4) throw error;
    await new Promise(resolve => setTimeout(resolve, 750 * (2 ** (attempt - 1))));
    return translateOne(text, attempt + 1);
  }
}

async function translateParts(parts, attempt = 1) {
  const joined = parts.map((part, index) => `${SENTINEL(index)} ${part}`).join(" ");
  if (joined.length > 700) {
    const translated = [];
    for (const part of parts) translated.push(await translateOne(part));
    return translated;
  }
  try {
    const translated = await requestTranslation(joined);
    const sections = translated.split(/Z+SEGSECTION\d+Z+/).filter(value => value.trim()).map(normalizeArabic);
    if (sections.length !== parts.length || sections.some(value => !/[\u0600-\u06ff]/.test(value))) {
      throw new Error(`Translation returned ${sections.length}/${parts.length} sections`);
    }
    return sections;
  } catch {
    if (attempt < 2) {
      await new Promise(resolve => setTimeout(resolve, 750));
      return translateParts(parts, attempt + 1);
    }
    // Some long source sections cause translation services to move or omit a sentinel.
    // Fall back to isolated requests so section boundaries remain exact.
    return Promise.all(parts.map(part => translateOne(part)));
  }
}

function buildDraft(chapter, translated) {
  const [arabicTitle, summaryAr, diagnosisAr, managementAr] = translated;
  const sourceHash = crypto.createHash("sha256")
    .update([chapter.summary, chapter.diagnosis, chapter.management].join("\n"))
    .digest("hex");
  return {
    title: chapter.title,
    arabicTitle,
    pdfPages: chapter.pdfPages,
    status: "machine-translated-under-review",
    summary: [{ en: chapter.summary, ar: summaryAr }],
    diagnosis: [{ en: chapter.diagnosis, ar: diagnosisAr }],
    management: [{ en: chapter.management, ar: managementAr }],
    arabicExplanation: [
      `الفكرة الأساسية: ${summaryAr}`,
      `للتقييم والتشخيص: ${diagnosisAr}`,
      `للتدبير: ${managementAr}`,
    ],
    editorialNotes: [
      "ملخص SEG آلي مستند حصراً إلى النص المستخرج من صفحات المصدر المحددة؛ لم تُضف ادعاءات طبية جديدة.",
      "الترجمة العربية آلية وقيد المراجعة اللغوية والسريرية. يجب التحقق من الجرعات والإرشادات المتغيرة زمنيًا قبل الاستخدام السريري.",
    ],
    provenance: {
      method: "source-section-extraction-plus-google-translation",
      translationScope: "Selected SEG summary only; not a full chapter translation",
      sourceTextSha256: sourceHash,
      generatedAt: new Date().toISOString(),
    },
  };
}

async function saveEditorial() {
  editorial.version = Math.max(2, Number(editorial.version) || 1);
  editorial.translationScope = "Selected SEG summaries, not full source chapters";
  editorial.lastGeneratedAt = new Date().toISOString();
  await fs.writeFile(EDITORIAL_PATH, `${JSON.stringify(editorial, null, 2)}\n`);
}

const candidates = [...groups.entries()]
  .map(([chapterId, group]) => prepareChapter(chapterId, group))
  .filter(chapter => {
    const existing = editorial.chapters[chapter.chapterId];
    return force || !existing || (refreshMachine && existing.status === "machine-translated-under-review");
  })
  .slice(0, limit);

if (prepareOffline) {
  const queuePath = path.join(CONTENT_DIR, "offline-translation-queue.json");
  await fs.writeFile(queuePath, `${JSON.stringify({
    schemaVersion: 1,
    sourceSha256: manifest.sha256,
    generatedAt: new Date().toISOString(),
    total: candidates.length,
    chapters: candidates,
  }, null, 2)}\n`);
  console.log(JSON.stringify({ queuePath, queued: candidates.length, existing: Object.keys(editorial.chapters).length }, null, 2));
  process.exit(0);
}

if (dryRun) {
  console.log(JSON.stringify({ indexed: groups.size, existing: Object.keys(editorial.chapters).length, pending: candidates.length, sample: candidates.slice(0, 3) }, null, 2));
  process.exit(0);
}

let completed = 0;
let cursor = 0;
async function worker() {
  while (cursor < candidates.length) {
    const chapter = candidates[cursor++];
    const translated = await translateParts([chapter.title, chapter.summary, chapter.diagnosis, chapter.management]);
    editorial.chapters[chapter.chapterId] = buildDraft(chapter, translated);
    completed += 1;
    if (completed % CHECKPOINT_EVERY === 0 || completed === candidates.length) {
      await saveEditorial();
      console.log(`checkpoint ${completed}/${candidates.length} · chapter ${chapter.chapterId}`);
    }
  }
}

await Promise.all(Array.from({ length: Math.min(CONCURRENCY, candidates.length || 1) }, worker));
await saveEditorial();
console.log(JSON.stringify({ indexed: groups.size, translatedNow: completed, editorialRecords: Object.keys(editorial.chapters).length }, null, 2));
