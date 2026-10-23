import "dotenv/config";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("SEG_CONTENT_LIBRARY", "02_PROCESSED_CONTENT", "RESIDENT_EMERGENCY_MEDICINE");
const files = [
  "oxford-sce-question-bank.jsonl",
  "rosen-10e-question-bank.jsonl",
  "tintinalli-9e-question-bank.jsonl",
];
const key = process.env.BUILT_IN_FORGE_API_KEY || process.env.OPENAI_API_KEY;
const base = (process.env.BUILT_IN_FORGE_API_URL || "https://forge.manus.im").replace(/\/$/, "");
if (!key) throw new Error("BUILT_IN_FORGE_API_KEY or OPENAI_API_KEY is required");

const sleep = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
const save = (file, records) => writeFile(path.join(root, file), `${records.map(item => JSON.stringify(item)).join("\n")}\n`, "utf8");

async function translateBatch(records) {
  const input = records.map(item => ({
    id: item.id,
    answer: item.correctAnswer,
    explanation: item.englishExplanation.slice(0, 1800),
  }));
  const response = await fetch(`${base}/v1/chat/completions`, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
    body: JSON.stringify({
      messages: [
        { role: "system", content: "You are a precise bilingual emergency-medicine editor. Return JSON only: {items:[{id,arabicExplanation}]}. For every input, write one or two concise Arabic sentences that faithfully summarize why the stated answer is correct. Preserve drug names, doses, thresholds, and negation. Do not add advice, new facts, or claim clinical approval." },
        { role: "user", content: JSON.stringify(input) },
      ],
      response_format: { type: "json_object" },
      max_tokens: 2600,
    }),
  });
  if (!response.ok) throw new Error(`Translation API failed: ${response.status} ${await response.text()}`);
  const payload = await response.json();
  const content = payload.choices?.[0]?.message?.content;
  const parsed = JSON.parse(typeof content === "string" ? content : content?.map(part => part.text || "").join("") || "{}");
  if (!Array.isArray(parsed.items)) throw new Error("Translation API returned no items array");
  return new Map(parsed.items.map(item => [item.id, String(item.arabicExplanation || "").trim()]));
}

for (const file of files) {
  const source = await readFile(path.join(root, file), "utf8");
  const records = source.trim().split("\n").map(line => JSON.parse(line));
  const pending = records.filter(item => !item.arabicExplanation);
  process.stdout.write(`${file}: ${pending.length} pending\n`);
  for (let offset = 0; offset < pending.length; offset += 10) {
    const batch = pending.slice(offset, offset + 10);
    let translated;
    for (let attempt = 0; attempt < 5; attempt += 1) {
      try {
        translated = await translateBatch(batch);
        break;
      } catch (error) {
        if (attempt === 4) throw error;
        await sleep(750 * 2 ** attempt);
      }
    }
    for (const item of batch) {
      const arabic = translated.get(item.id);
      if (!arabic) throw new Error(`Missing Arabic explanation for ${item.id}`);
      item.arabicExplanation = arabic;
      item.arabicExplanationStatus = "ai-draft-under-review";
    }
    if ((offset / 10) % 5 === 0 || offset + 10 >= pending.length) {
      await save(file, records);
      process.stdout.write(`${file}: ${Math.min(offset + 10, pending.length)}/${pending.length}\n`);
    }
  }
  await save(file, records);
}
