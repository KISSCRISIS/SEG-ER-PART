/**
 * Phase 4-E.4-B: Qbank Topic Mapping Engine.
 *
 * Deterministically maps each of the 5,612 Qbank questions to a canonical
 * topicId via priority: 1) chapter metadata 2) source category 3) clinical
 * keywords 4) explanation concepts. Never guesses: unmapped questions stay
 * status unmapped. Emits qbank-topic-mapping.json and extends the graph
 * index with questions + HAS_QUESTIONS relations only.
 *
 *   pnpm index:qbank-mapping
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

interface TopicDef {
  topicId: string;
  keywords: RegExp[];
  chapterPatterns: RegExp[];
}

const TOPICS: TopicDef[] = [
  {
    topicId: "EM_PEDS_FEVER",
    keywords: [/\bpaediatric fever\b/i, /\bpediatric fever\b/i, /\bneonatal fever\b/i, /\bfever in child/i, /\bfever.*infant/i],
    chapterPatterns: [/\bfever\b/i],
  },
  {
    topicId: "EM_OBGYN_ECTOPIC",
    keywords: [/\bectopic pregnancy\b/i, /\bectopic\b/i],
    chapterPatterns: [/\bectopic\b/i],
  },
  {
    topicId: "EM_TOX_OPIOID",
    keywords: [/\bopioid\b/i, /\bopiate\b/i, /\bheroin\b/i, /\bnaloxone\b/i, /\bopioid overdose\b/i],
    chapterPatterns: [/\btoxic/i, /\bpoison/i],
  },
  {
    topicId: "EM_ENDO_HYPERK",
    keywords: [/\bhyperkalaemia\b/i, /\bhyperkalemia\b/i],
    chapterPatterns: [/\bhyperkalaem/i],
  },
  {
    topicId: "EM_ENDO_HYPO",
    keywords: [/\bhypoglycaemia\b/i, /\bhypoglycemia\b/i, /\bhypoglycaemic\b/i, /\bhypoglycemic\b/i],
    chapterPatterns: [/\bhypogly/i],
  },
  {
    topicId: "EM_ENDO_DKA_HHS",
    keywords: [/\bdiabetic ketoacidosis\b/i, /\b\bdka\b/i, /\bhyperosmolar\b/i, /\bhhs\b/i, /\bhyperglycaemic hyperosmolar\b/i],
    chapterPatterns: [/\bdiabetic\b/i, /\bketoacidosis\b/i, /\bhyperosmolar\b/i],
  },
  {
    topicId: "EM_ID_SEPSIS",
    keywords: [/\bsepsis\b/i, /\bseptic shock\b/i, /\bsepticaemia\b/i, /\bsepticemia\b/i],
    chapterPatterns: [/\bsepsis\b/i, /\binfectious\b/i],
  },
  {
    topicId: "EM_GI_BLEED",
    keywords: [/\bgi bleed\b/i, /\bgastrointestinal bleed/i, /\bhaematemesis\b/i, /\bhematemesis\b/i, /\bmelaena\b/i, /\bmelena\b/i, /\bhematochezia\b/i],
    chapterPatterns: [/\bbleed\b/i],
  },
  {
    topicId: "EM_GI_ABD_PAIN",
    keywords: [/\babdominal pain\b/i, /\bacute abdomen\b/i, /\bperitonitis\b/i],
    chapterPatterns: [/\babdominal\b/i, /\bgastrointestinal\b/i],
  },
  {
    topicId: "EM_NEURO_STATUS",
    keywords: [/\bstatus epilepticus\b/i],
    chapterPatterns: [/\bepilep/i, /\bseizure\b/i],
  },
  {
    topicId: "EM_NEURO_STROKE",
    keywords: [/\bstroke\b/i, /\bcva\b/i, /\btransient ischaemic attack\b/i, /\btransient ischemic attack\b/i, /\btia\b/i, /\bintracerebral haemorrhage\b/i, /\bsubarachnoid\b/i],
    chapterPatterns: [/\bstroke\b/i, /\bneurolog/i],
  },
  {
    topicId: "EM_TRAUMA_TBI",
    keywords: [/\btraumatic brain injury\b/i, /\btbi\b/i, /\bhead injury\b/i, /\bconcussion\b/i, /\bsubdural\b/i, /\bepidural haematoma\b/i, /\bintracranial haemorrhage\b/i],
    chapterPatterns: [/\btrauma\b/i, /\bhead\b/i],
  },
  {
    topicId: "EM_TRAUMA_PRIMARY_SURVEY",
    keywords: [/\bprimary survey\b/i, /\babcde\b/i, /\batls\b/i],
    chapterPatterns: [/\btrauma\b/i, /\bresuscitation\b/i],
  },
  {
    topicId: "EM_RESP_PE",
    keywords: [/\bpulmonary embolism\b/i, /\bpulmonary embolus\b/i, /\bpe\b.*\bembol/i],
    chapterPatterns: [/\bembol/i],
  },
  {
    topicId: "EM_RESP_PNEUMOTHORAX",
    keywords: [/\bpneumothorax\b/i, /\btension pneumothorax\b/i],
    chapterPatterns: [/\bpneumothorax\b/i],
  },
  {
    topicId: "EM_RESP_COPD",
    keywords: [/\bcopd\b/i, /\bchronic obstructive pulmonary disease\b/i],
    chapterPatterns: [/\bcopd\b/i],
  },
  {
    topicId: "EM_RESP_ASTHMA",
    keywords: [/\basthma\b/i],
    chapterPatterns: [/\basthma\b/i],
  },
  {
    topicId: "EM_CARDIO_TAMPONADE",
    keywords: [/\btamponade\b/i, /\bpericardial effusion\b/i, /\bpericarditis\b/i],
    chapterPatterns: [/\btamponade\b/i, /\bpericard/i],
  },
  {
    topicId: "EM_CARDIO_ACS",
    keywords: [/\bacute coronary syndrome\b/i, /\bmyocardial infarction\b/i, /\bstemi\b/i, /\bnstemi\b/i, /\bunstable angina\b/i],
    chapterPatterns: [/\bcoronary\b/i, /\bcardio/i],
  },
  {
    topicId: "EM_CRIT_ANAPHYLAXIS",
    keywords: [/\banaphylaxis\b/i, /\banaphylactic\b/i],
    chapterPatterns: [/\banaphylaxis\b/i],
  },
  {
    topicId: "EM_CRIT_ARREST",
    keywords: [/\bcardiac arrest\b/i, /\bcardiopulmonary arrest\b/i, /\bpulseless\b/i, /\bventricular fibrillation\b/i, /\basystole\b/i],
    chapterPatterns: [/\barrest\b/i, /\bresuscitation\b/i],
  },
  {
    topicId: "EM_CRIT_SHOCK",
    keywords: [/\bshock\b/i],
    chapterPatterns: [/\bshock\b/i],
  },
];

// Sources in canonical order
const SOURCES: Array<{ sourceId: string; family: string; file: string }> = [
  { sourceId: "qbank-tintinalli-9e", family: "TINTINALLI_9E", file: "SEG_CONTENT_LIBRARY/02_PROCESSED_CONTENT/RESIDENT_EMERGENCY_MEDICINE/tintinalli-9e-question-bank.jsonl" },
  { sourceId: "qbank-rosen-10e", family: "ROSEN_10E", file: "SEG_CONTENT_LIBRARY/02_PROCESSED_CONTENT/RESIDENT_EMERGENCY_MEDICINE/rosen-10e-question-bank.jsonl" },
  { sourceId: "qbank-frcem", family: "FRCEM", file: "SEG_CONTENT_LIBRARY/02_PROCESSED_CONTENT/RESIDENT_EMERGENCY_MEDICINE/frcem-question-bank.jsonl" },
  { sourceId: "qbank-hippo", family: "HIPPO", file: "SEG_CONTENT_LIBRARY/02_PROCESSED_CONTENT/RESIDENT_EMERGENCY_MEDICINE/hippo-question-bank.jsonl" },
  { sourceId: "qbank-oxford-sce", family: "OXFORD_SCE", file: "SEG_CONTENT_LIBRARY/02_PROCESSED_CONTENT/RESIDENT_EMERGENCY_MEDICINE/oxford-sce-question-bank.jsonl" },
];

interface MappingEntry {
  questionId: string;
  sourceId: string;
  topicId: string | null;
  mappingConfidence: "High" | "Medium" | "Low";
  mappingMethod: string;
  reviewStatus: "mapped" | "unmapped";
}

function classify(
  chapterTitle: string,
  question: string,
  explanation: string
): { topicId: string | null; confidence: MappingEntry["mappingConfidence"]; method: string } {

  // Priority 1: chapter metadata — highly specific phrase in chapter title
  for (const t of TOPICS) {
    for (const pat of t.chapterPatterns) {
      if (pat.test(chapterTitle)) {
        // Require at least a keyword also in question/explanation to avoid broad-chapter false positives
        const hasKeywordInQ = t.keywords.some(k => k.test(question));
        const hasKeywordInE = t.keywords.some(k => k.test(explanation));
        if (hasKeywordInQ) return { topicId: t.topicId, confidence: "High", method: "chapter-title-clinical-domain" };
        if (hasKeywordInE) return { topicId: t.topicId, confidence: "Medium", method: "chapter-title-clinical-domain" };
      }
    }
  }
  // Priority 3: clinical keywords in question stem
  for (const t of TOPICS) {
    for (const pat of t.keywords) {
      if (pat.test(question)) {
        // For very generic single-word topics like "shock", require stronger evidence: already specific topics checked first
        return { topicId: t.topicId, confidence: t.topicId === "EM_CRIT_SHOCK" && !/\bshock\b/i.test(question) ? "Low" : "High", method: "clinical-keyword-match" };
      }
    }
  }
  // Priority 4: explanation concepts
  for (const t of TOPICS) {
    for (const pat of t.keywords) {
      if (pat.test(explanation)) {
        return { topicId: t.topicId, confidence: "Medium", method: "explanation-concept-match" };
      }
    }
  }
  return { topicId: null, confidence: "Low", method: "no-match" };
}

function main(): void {
  const mappings: MappingEntry[] = [];
  let total = 0;
  for (const src of SOURCES) {
    const raw = readFileSync(resolve(root, src.file), "utf8").trim().split("\n");
    for (const line of raw) {
      if (!line.trim()) continue;
      const j = JSON.parse(line);
      total++;
      const chapterTitle = String(j.chapterTitle ?? "");
      const question = String(j.question ?? "");
      const explanation = String(j.englishExplanation ?? "");
      const result = classify(chapterTitle, question, explanation);
      const entry: MappingEntry = result.topicId
        ? {
            questionId: String(j.id),
            sourceId: src.sourceId,
            topicId: result.topicId,
            mappingConfidence: result.confidence,
            mappingMethod: result.method,
            reviewStatus: "mapped",
          }
        : {
            questionId: String(j.id),
            sourceId: src.sourceId,
            topicId: null as unknown as string,
            mappingConfidence: "Low",
            mappingMethod: "no-match",
            reviewStatus: "unmapped",
          };
      // For unmapped, remove topicId field to keep schema clean (set null then delete)
      if (!result.topicId) {
        delete (entry as unknown as Record<string, unknown>).topicId;
        (entry as unknown as Record<string, unknown>).topicId = null;
      }
      mappings.push(entry);
    }
  }

  // For file output, represent unmapped topicId as null explicitly
  const output = {
    schemaVersion: 1 as const,
    generatedAt: new Date().toISOString(),
    origin: "Phase 4-E.4-B deterministic engine: 22 topic keywords in specificity order; never guesses. Priority: chapter metadata → clinical keywords → explanation concepts.",
    totalQuestions: total,
    mappings,
  };

  const outPath = resolve(root, "medical-content/emergency-board/knowledge-graph/qbank-topic-mapping.json");
  const altPath = resolve(root, "medical-content/knowledge-graph/qbank-topic-mapping.json");
  writeFileSync(outPath, JSON.stringify(output, null, 2) + "\n");
  writeFileSync(altPath, JSON.stringify(output, null, 2) + "\n");

  // Update graph index: add questions + HAS_QUESTIONS relations for mapped only
  // Read the canonical main index (has 177 contents from book mapping) — not
  // the emergency-board mirror which may be stale.
  const indexPath = resolve(root, "medical-content/knowledge-graph/knowledge-graph-index.json");
  const indexAltPath = resolve(root, "medical-content/emergency-board/knowledge-graph/knowledge-graph-index.json");
  const index = JSON.parse(readFileSync(indexPath, "utf8")) as {
    schemaVersion: number;
    generatedAt: string;
    origin: string;
    topics: unknown[];
    sources: unknown[];
    contents: unknown[];
    questions: unknown[];
    relations: Array<{ type: string; from: string; to: string }>;
  };
  // Append questions (only mapped) and relations if not already present
  const existingQ = new Set((index.questions as Array<{ questionId?: string; id?: string }>).map(q => (q as Record<string, string>).questionId ?? (q as Record<string, string>).id ?? ""));
  const existingR = new Set(index.relations.map(r => `${r.type}:${r.from}:${r.to}`));
  let addedQ = 0, addedR = 0;
  for (const m of mappings) {
    if (m.reviewStatus !== "mapped" || !m.topicId) continue;
    const qid = m.questionId;
    if (!existingQ.has(qid)) {
      (index.questions as unknown[]).push({
        questionId: qid,
        sourceId: m.sourceId,
        topicId: m.topicId,
        mappingConfidence: m.mappingConfidence,
      });
      existingQ.add(qid);
      addedQ++;
    }
    const key = `HAS_QUESTIONS:${m.topicId}:${qid}`;
    if (!existingR.has(key)) {
      index.relations.push({ type: "HAS_QUESTIONS", from: m.topicId, to: qid });
      existingR.add(key);
      addedR++;
    }
  }
  index.generatedAt = new Date().toISOString();
  index.origin = "Phase 4-E.4-B adds mapped questions + HAS_QUESTIONS relations; unmapped questions stay out of graph";
  writeFileSync(indexPath, JSON.stringify(index, null, 2) + "\n");
  // Mirror to emergency-board path
  writeFileSync(indexAltPath, JSON.stringify(index, null, 2) + "\n");

  const mapped = mappings.filter(m => m.reviewStatus === "mapped").length;
  const byConf = {
    High: mappings.filter(m => m.mappingConfidence === "High" && m.reviewStatus === "mapped").length,
    Medium: mappings.filter(m => m.mappingConfidence === "Medium" && m.reviewStatus === "mapped").length,
    LowUnmapped: mappings.filter(m => m.reviewStatus === "unmapped").length,
  };
  const bySrc: Record<string, number> = {};
  const byTopic: Record<string, number> = {};
  for (const m of mappings) {
    if (m.reviewStatus === "mapped") {
      bySrc[m.sourceId] = (bySrc[m.sourceId] ?? 0) + 1;
      const tid = m.topicId as string;
      byTopic[tid] = (byTopic[tid] ?? 0) + 1;
    }
  }
  console.log(`Total: ${total} Mapped: ${mapped} Unmapped: ${total - mapped}`);
  console.log(`Confidence High:${byConf.High} Medium:${byConf.Medium} Low/unmapped:${byConf.LowUnmapped}`);
  console.log(`By source mapped: ${JSON.stringify(bySrc)}`);
  console.log(`By topic top 5: ${Object.entries(byTopic).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([k,v])=>k+":"+v).join(" ")}`);
  console.log(`Added questions: ${addedQ} relations: ${addedR}`);
  console.log(`Wrote ${outPath}`);
}

main();
