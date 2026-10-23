import { readFile } from "node:fs/promises";
import path from "node:path";
import { normalizeExamTraps } from "./normalizeExamTraps";
import {
  classifyResidentChapter,
  getResidentSection,
} from "@shared/resident-taxonomy";

type ReferenceItem = {
  id: string;
  source: string;
  chapterNumber: string;
  chapterTitle: string;
  topic: string;
  keyPoints: string[];
  relatedTraps: string[];
  boardSafeLogic?: string;
  arabicMentorExplanation?: string;
  needsVerification?: boolean;
};

type Flashcard = {
  topicId?: string;
  cardId: string;
  type: string;
  question: string;
  answer: string;
  source: string;
  yield: string;
  sourceFile?: string;
};

type ExamTrap = {
  topicId?: string;
  id: string;
  text: string;
  referenceId: string;
  source: string;
  topic: string;
};

type MentorExplanation = {
  topicId?: string;
  referenceId: string;
  topic: string;
  source: string;
  explanation: string;
};

type TopicFamily = {
  family: string;
  entries: string[];
  count: number;
};

type ChapterStudyMap = {
  source: string;
  chapterNumber: string;
  entries: {
    id: string;
    chapterTitle: string;
    topic: string;
    families?: string[];
    keywords?: string[];
  }[];
  count: number;
};

type SectionFilterInput = {
  sectionId?: number;
};

const root = path.resolve(
  process.env.SEG_CONTENT_ROOT ?? ".",
  "SEG_CONTENT_LIBRARY",
  "01_RECOVERY_SOURCE_ARTIFACTS"
);
let referenceCache: Promise<ReferenceItem[]> | undefined;
let flashcardCache: Promise<Flashcard[]> | undefined;
let trapCache: Promise<ExamTrap[]> | undefined;
let topicFamilyCache: Promise<TopicFamily[]> | undefined;
let chapterStudyCache: Promise<ChapterStudyMap[]> | undefined;
let mentorCache: Promise<MentorExplanation[]> | undefined;

async function readJson<T>(...parts: string[]) {
  return JSON.parse(await readFile(path.join(root, ...parts), "utf8")) as T;
}

async function loadReferences() {
  referenceCache ??= Promise.all([
    readJson<ReferenceItem[]>("REFERENCE_LIBRARY", "fullReferenceLibrary.json"),
    loadMentorExplanations(),
  ]).then(([references, mentors]) => {
    const existing = new Set(references.map(item => item.id));
    const mentorOnly = mentors
      .filter(item => !existing.has(item.referenceId))
      .map(
        (item): ReferenceItem => ({
          id: item.referenceId,
          source: `${item.source} Arabic Mentor`,
          chapterNumber: "N/A",
          chapterTitle: "Arabic Mentor Explanations",
          topic: item.topic,
          keyPoints: [item.explanation],
          relatedTraps: [],
          arabicMentorExplanation: item.explanation,
          needsVerification: true,
        })
      );
    return [...references, ...mentorOnly];
  });
  return referenceCache;
}

async function loadFlashcards() {
  flashcardCache ??= readJson<Flashcard[]>(
    "REFERENCE_LIBRARY",
    "flashcards.json"
  );
  return flashcardCache;
}

async function loadExamTraps() {
  trapCache ??= readJson<ExamTrap[]>("REFERENCE_LIBRARY", "examTraps.json");
  return trapCache;
}

async function loadTopicFamilies() {
  topicFamilyCache ??= readJson<TopicFamily[]>(
    "REFERENCE_LIBRARY",
    "masterTopicFamilyIndex.json"
  );
  return topicFamilyCache;
}

async function loadChapterStudyMap() {
  chapterStudyCache ??= readJson<ChapterStudyMap[]>(
    "REFERENCE_LIBRARY",
    "chapterStudyMap.json"
  );
  return chapterStudyCache;
}

async function loadMentorExplanations() {
  mentorCache ??= readJson<MentorExplanation[]>(
    "REFERENCE_LIBRARY",
    "arabicMentorExplanations.json"
  );
  return mentorCache;
}

function classifyRecoveredItem(...values: Array<string | undefined>) {
  const sectionId = classifyResidentChapter(values.filter(Boolean).join(" "));
  return {
    sectionId,
    sectionTitle:
      getResidentSection(sectionId)?.[1] ?? "Emergency Medicine Foundations",
  };
}

export async function listRecoveredReferences(
  input: {
    search?: string;
    source?: string;
    page: number;
    pageSize: number;
  } & SectionFilterInput
) {
  const references = await loadReferences();
  const search = input.search?.trim().toLowerCase();
  const enriched = references.map(item => ({
    ...item,
    ...classifyRecoveredItem(
      item.topic,
      item.chapterTitle,
      item.source,
      item.keyPoints.join(" "),
      item.arabicMentorExplanation
    ),
  }));
  const filtered = enriched.filter(
    item =>
      (!input.sectionId || item.sectionId === input.sectionId) &&
      (!input.source || item.source === input.source) &&
      (!search ||
        `${item.topic} ${item.chapterTitle} ${item.keyPoints.join(" ")} ${item.arabicMentorExplanation ?? ""}`
          .toLowerCase()
          .includes(search))
  );
  const start = (input.page - 1) * input.pageSize;
  return {
    total: filtered.length,
    sources: Array.from(new Set(references.map(item => item.source))).sort(),
    sections: Array.from(
      new Map(
        enriched.map(item => [
          item.sectionId,
          { sectionId: item.sectionId, sectionTitle: item.sectionTitle },
        ])
      ).values()
    ).sort((a, b) => a.sectionId - b.sectionId),
    items: filtered.slice(start, start + input.pageSize),
  };
}

export async function listRecoveredFlashcards(
  input: {
    search?: string;
    source?: string;
    type?: string;
    yield?: string;
    page: number;
    pageSize: number;
  } & SectionFilterInput
) {
  const flashcards = await loadFlashcards();
  const search = input.search?.trim().toLowerCase();
  const enriched = flashcards.map(item => ({
    ...item,
    ...classifyRecoveredItem(
      item.question,
      item.answer,
      item.source,
      item.type,
      item.yield
    ),
  }));
  const filtered = enriched.filter(
    item =>
      (!input.sectionId || item.sectionId === input.sectionId) &&
      (!input.source || item.source === input.source) &&
      (!input.type || item.type === input.type) &&
      (!input.yield || item.yield === input.yield) &&
      (!search ||
        `${item.question} ${item.answer} ${item.source} ${item.type}`
          .toLowerCase()
          .includes(search))
  );
  const start = (input.page - 1) * input.pageSize;
  return {
    total: filtered.length,
    sources: Array.from(new Set(flashcards.map(item => item.source))).sort(),
    types: Array.from(new Set(flashcards.map(item => item.type))).sort(),
    yields: Array.from(new Set(flashcards.map(item => item.yield))).sort(),
    sections: Array.from(
      new Map(
        enriched.map(item => [
          item.sectionId,
          { sectionId: item.sectionId, sectionTitle: item.sectionTitle },
        ])
      ).values()
    ).sort((a, b) => a.sectionId - b.sectionId),
    items: filtered.slice(start, start + input.pageSize),
  };
}

export async function listRecoveredExamTraps(
  input: {
    search?: string;
    source?: string;
    page: number;
    pageSize: number;
  } & SectionFilterInput
) {
  const [rawTraps, mentors, cards] = await Promise.all([loadExamTraps(), loadMentorExplanations(), loadFlashcards()]);
  const traps = normalizeExamTraps(rawTraps, cards, mentors);
  const search = input.search?.trim().toLowerCase();
  const enriched = traps.map(item => ({
    ...item,
    ...classifyRecoveredItem(item.text, item.topic, item.source),
  }));
  const filtered = enriched.filter(
    item =>
      (!input.sectionId || item.sectionId === input.sectionId) &&
      (!input.source || item.source === input.source) &&
      (!search ||
        `${item.text} ${item.topic} ${item.source}`
          .toLowerCase()
          .includes(search))
  );
  const start = (input.page - 1) * input.pageSize;
  return {
    total: filtered.length,
    sources: Array.from(new Set(traps.map(item => item.source))).sort(),
    sections: Array.from(
      new Map(
        enriched.map(item => [
          item.sectionId,
          { sectionId: item.sectionId, sectionTitle: item.sectionTitle },
        ])
      ).values()
    ).sort((a, b) => a.sectionId - b.sectionId),
    items: filtered.slice(start, start + input.pageSize),
  };
}

export async function listRecoveredTopicFamilies() {
  return loadTopicFamilies();
}

export async function listRecoveredChapterStudyMap(input: {
  source?: string;
  search?: string;
}) {
  const chapters = await loadChapterStudyMap();
  const search = input.search?.trim().toLowerCase();
  return chapters.filter(
    chapter =>
      (!input.source || chapter.source === input.source) &&
      (!search ||
        `${chapter.source} ${chapter.chapterNumber} ${chapter.entries
          .map(item => `${item.chapterTitle} ${item.topic}`)
          .join(" ")}`
          .toLowerCase()
          .includes(search))
  );
}

export function getRecoveryReviewQueue() {
  return [
    {
      id: "legacy-1400q",
      title: "1400q legacy question bank",
      target: "Qbank SEG after answer-key repair",
      status: "quarantined-missing-correct-answers" as const,
      reason:
        "The recovered text has question stems and options, but correct-answer fields are blank in the supplied artifact.",
    },
    {
      id: "legacy-pretest",
      title: "PreTest legacy question bank",
      target: "Qbank SEG after OCR repair",
      status: "quarantined-ocr-corruption" as const,
      reason:
        "The recovered text contains systematic OCR corruption, including missing letters inside clinical stems and options.",
    },
    {
      id: "legacy-osce-images",
      title: "OSCE visual image files",
      target: "Atlas & Visual Assets",
      status: "text-only-images-missing" as const,
      reason:
        "The station index exists, but the referenced image files were not present in the supplied package.",
    },
  ];
}

export async function listRecoveredOsceStations(input?: SectionFilterInput) {
  const text = await readFile(
    path.join(root, "OSCE_Emergency_Medicine_Imaging_Section_UTF8.txt"),
    "utf8"
  );
  const matches = Array.from(
    text.matchAll(
      /^STATION\s+(\d+)\s+—\s+(.+)$(?:\r?\n)IMAGE:\s+images\/(.+)$(?:\r?\n)SOURCE PAGE:\s+(\d+)/gm
    )
  );
  return matches
    .map(match => ({
      stationNumber: Number(match[1]),
      title: match[2].trim(),
      expectedImage: match[3].trim(),
      sourcePage: Number(match[4]),
      assetStatus: "missing-from-final-package" as const,
      reviewStatus: "private-pilot-under-review" as const,
      ...classifyRecoveredItem(match[2].trim(), match[3].trim(), "OSCE"),
    }))
    .filter(item => !input?.sectionId || item.sectionId === input.sectionId);
}
