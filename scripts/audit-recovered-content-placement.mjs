import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(
  "SEG_CONTENT_LIBRARY",
  "01_RECOVERY_SOURCE_ARTIFACTS"
);
const refRoot = path.join(root, "REFERENCE_LIBRARY");

async function readJson(file) {
  return JSON.parse(await readFile(path.join(refRoot, file), "utf8"));
}

const [
  flashcards,
  appFlashcards,
  traps,
  mentors,
  fullReferences,
  topicFamilies,
  chapterStudyMap,
] = await Promise.all([
  readJson("flashcards.json"),
  readJson("appFlashcards.json"),
  readJson("examTraps.json"),
  readJson("arabicMentorExplanations.json"),
  readJson("fullReferenceLibrary.json"),
  readJson("masterTopicFamilyIndex.json"),
  readJson("chapterStudyMap.json"),
]);

const flashcardKeys = new Set(
  flashcards.map(item => `${item.cardId}|${item.question}`)
);
const appDuplicates = appFlashcards.filter(item =>
  flashcardKeys.has(`${item.cardId}|${item.question}`)
).length;
const referenceIds = new Set(fullReferences.map(item => item.id));
const mentorOnly = mentors.filter(item => !referenceIds.has(item.referenceId));

const placements = [
  {
    source: "flashcards.json",
    count: flashcards.length,
    placement: "Learn high-yield flashcards; Practice home quick drill",
    status: "active-private-pilot",
  },
  {
    source: "appFlashcards.json",
    count: appFlashcards.length,
    placement: "Deduplicated against flashcards.json",
    status: `duplicate-sidecar-${appDuplicates}-covered`,
  },
  {
    source: "examTraps.json",
    count: traps.length,
    placement: "Learn exam traps; Practice home trap drill",
    status: "active-private-pilot",
  },
  {
    source: "arabicMentorExplanations.json",
    count: mentors.length,
    placement:
      "Merged into Medical Journal references; standalone mentor notes for items missing from fullReferenceLibrary",
    status: `active-private-pilot-${mentorOnly.length}-mentor-only`,
  },
  {
    source: "fullReferenceLibrary.json",
    count: fullReferences.length,
    placement: "Medical Journal references",
    status: "active-private-pilot",
  },
  {
    source: "masterTopicFamilyIndex.json",
    count: topicFamilies.length,
    placement: "Learn topic family chips; Practice performance topic map",
    status: "active-private-pilot",
  },
  {
    source: "chapterStudyMap.json",
    count: chapterStudyMap.length,
    placement: "API-ready chapter map for future chapter-scoped reader routing",
    status: "api-ready",
  },
  {
    source: "1400q_Questions_and_Arabic_Explanations_UTF8.txt",
    count: 1,
    placement: "Learn content review queue",
    status: "quarantined-missing-correct-answers",
  },
  {
    source: "PreTest_All_Chapters_Questions_and_Arabic_Explanations_UTF8.txt",
    count: 1,
    placement: "Learn content review queue",
    status: "quarantined-ocr-corruption",
  },
  {
    source: "OSCE_Emergency_Medicine_Imaging_Section_UTF8.txt",
    count: 1,
    placement: "Atlas recovered station index",
    status: "active-index-images-missing",
  },
];

const generatedAt = new Date().toISOString();
const lines = [
  "# Recovered Content Placement Report",
  "",
  `Generated: ${generatedAt}`,
  "",
  "| Source | Count | Placement | Status |",
  "| --- | ---: | --- | --- |",
  ...placements.map(
    item =>
      `| ${item.source} | ${item.count} | ${item.placement} | ${item.status} |`
  ),
  "",
  "Notes:",
  "",
  "- Legacy 1400q and PreTest are intentionally not activated as examinable Qbank content because their supplied artifacts fail answer-key/OCR quality gates.",
  "- This report documents structural placement only; it does not replace clinical review.",
  "",
];

await mkdir(path.resolve("reports", "resident-content"), { recursive: true });
await writeFile(
  path.resolve("reports", "resident-content", "placement-report.md"),
  lines.join("\n")
);
await writeFile(
  path.resolve("reports", "resident-content", "placement-report.json"),
  JSON.stringify(
    { generatedAt, placements, mentorOnly: mentorOnly.length },
    null,
    2
  )
);

console.log(
  `Recovered content placement audit complete: ${placements.length} sources`
);
