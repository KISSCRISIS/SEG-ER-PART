import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const file = path.resolve(
  "SEG_CONTENT_LIBRARY",
  "02_PROCESSED_CONTENT",
  "RESIDENT_EMERGENCY_MEDICINE",
  "rosen-10e-question-bank.jsonl"
);
const targetId = "rosen-10e-ch-192-q-0058";
const lines = (await readFile(file, "utf8")).trimEnd().split(/\r?\n/);
let changed = false;
const fixed = lines.map(line => {
  const item = JSON.parse(line);
  if (item.id !== targetId) return line;
  changed = true;
  item.question =
    "Which of the following statements is true regarding air medical transport (AMT)?";
  item.options = [
    {
      key: "A",
      text: "AMT does little to improve outcomes when used for STEMI transport from rural areas.",
    },
    {
      key: "B",
      text: "AMT scene response for acute stroke is limited by emergency medical service providers' inability to effectively triage and identify patients who would likely benefit from HEMS scene response.",
    },
    {
      key: "C",
      text: "Faster times to a trauma center are not required for outcomes benefit from AMT.",
    },
    {
      key: "D",
      text: "The emphasis for AMT of neonates is often more on the mode of transport than on the transport team.",
    },
  ];
  item.correctAnswerKey = "C";
  item.correctAnswer =
    "C. Faster times to a trauma center are not required for outcomes benefit from AMT.";
  item.englishExplanation =
    "Air medical transport may provide outcome benefit for selected trauma patients beyond simple transport time reduction. Appropriate use depends on patient severity, geography, crew capability, and access to definitive trauma care. For some patients, the advanced team and earlier critical-care interventions may contribute to benefit even when faster arrival alone is not the only driver.";
  item.arabicExplanation =
    "الإجابة الصحيحة هي C. قد يفيد النقل الطبي الجوي بعض مرضى الرضوض المختارين ليس فقط لأنه أسرع، بل بسبب خبرة الفريق، شدة الإصابة، بُعد المكان، وإمكانية الوصول لمركز رعاية نهائية مناسب. لذلك لا يكون اختصار الوقت وحده الشرط الوحيد للفائدة.";
  item.arabicExplanationStatus = "local-summary-under-review";
  return JSON.stringify(item);
});

if (!changed) throw new Error(`Target question not found: ${targetId}`);
await writeFile(file, `${fixed.join("\n")}\n`);
console.log(`Fixed ${targetId}`);
