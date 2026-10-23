import fs from "node:fs/promises";
const file = "client/public/content/summary-books/tintinalli-high-yield.json";
const data = JSON.parse(await fs.readFile(file, "utf8"));
const batch = data.chapters.slice(0, 10);
for (const chapter of batch) {
  const text = chapter.highYieldSummary.join(" ").slice(0, 5000);
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(text)}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const result = await response.json();
    const translated = result[0].map(part => part[0]).join("").trim();
    if (translated) {
      chapter.arabicExplanation = `ترجمة عربية مبسطة للملخص الإنجليزي:\n\n${translated}`;
      chapter.arabicExplanationStatus = "machine-translated-under-review";
    }
  } catch (error) {
    console.warn(`Skipped ${chapter.unitId}: ${error.message}`);
  }
}
data.generatedAt = new Date().toISOString();
await fs.writeFile(file, JSON.stringify(data, null, 2));
console.log(`Translated ${batch.filter(c => c.arabicExplanationStatus === "machine-translated-under-review").length}/${batch.length} chapters`);
