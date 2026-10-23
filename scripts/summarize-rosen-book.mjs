import fs from "node:fs/promises";
import path from "node:path";
import { buildRosenSummaries } from "./lib/rosen-summaries.mjs";

const dir = path.resolve("SEG_CONTENT_LIBRARY", "02_PROCESSED_CONTENT", "ROSEN_BARKIN_5MIN");
const manifest = JSON.parse(await fs.readFile(path.join(dir, "manifest.json"), "utf8"));
const pages = (await fs.readFile(path.join(dir, "pages.jsonl"), "utf8")).split(/\r?\n/).filter(Boolean).map(JSON.parse);
const editorial = JSON.parse(await fs.readFile(path.join(dir, "editorial-translations.json"), "utf8"));
const result = buildRosenSummaries(manifest, pages, editorial);

// Preserve the previous OCR drafts once for traceability.
const current = path.join(dir, "topic-summaries.json");
try {
  await fs.copyFile(current, path.join(dir, "topic-summaries.legacy-ocr.json"), fs.constants.COPYFILE_EXCL);
} catch (error) {
  if (!["EEXIST", "ENOENT"].includes(error.code)) throw error;
}
const json = JSON.stringify(result, null, 2);
await fs.writeFile(current, json);
await fs.writeFile(path.resolve("client/public/content/summary-books/rosen-high-yield.json"), json);
await fs.mkdir("reports/medical-books", { recursive: true });
await fs.writeFile("reports/medical-books/rosen-summary-editorial-audit.json", JSON.stringify(result.audit, null, 2));
console.log(JSON.stringify(result.audit, null, 2));
