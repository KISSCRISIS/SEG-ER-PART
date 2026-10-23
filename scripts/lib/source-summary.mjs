const BOILERPLATE = [
  /^P\d+:\s*OSO\/OVY.*$/i,
  /^LWBK\S+.*$/i,
  /^.*\bAll rights reserved\.?\s*$/i,
  /^CHAPTER\s+\d+\s*:\s*/i,
];

export function cleanSourceText(value, limit = 1800) {
  const lines = String(value ?? "").split(/\r?\n/)
    .map(line => line.replace(/\uFFFD/g, "").replace(/©[^\n]{0,160}?All rights reserved\.?/gi, "").replace(/\s+/g, " ").trim())
    .filter(line => line && !BOILERPLATE.some(pattern => pattern.test(line)));
  return lines.join(" ").replace(/\s+([,.;:])/g, "$1").slice(0, limit).trim();
}

export function extractSourceSection(text, patterns, limit = 1200) {
  const source = String(text ?? "");
  for (const pattern of patterns) {
    const match = pattern.exec(source);
    if (match) return cleanSourceText(source.slice(match.index, match.index + limit), limit);
  }
  return "";
}

export function findTintinalliTitle(text, number) {
  const lines = String(text ?? "").split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  const chapterHeading = String(text ?? "").match(new RegExp(`CHAPTER\\s+${number}\\s*:\\s*([^\\n]+)`, "i"));
  if (chapterHeading?.[1]) {
    const title = chapterHeading[1].replace(/\s+\d+\s*$/, "").trim();
    if (title.length > 3) return title;
  }
  const chapterLine = lines.find(line => new RegExp(`^${number}\\s+`).test(line));
  if (chapterLine) {
    const title = chapterLine.replace(new RegExp(`^${number}\\s+`), "").replace(/\s{2,}.*/, "").trim();
    if (title.length > 3) return title;
  }
  const sectionLine = lines.find(line => /^CHAPTER\s+\d+:/i.test(line));
  return sectionLine?.replace(/^CHAPTER\s+\d+\s*:\s*/i, "").trim() || `Chapter ${number}`;
}

export function arabicEditorialStatus(sourceName) {
  return {
    status: "pending-editorial",
    message: `الترجمة العربية التحريرية لهذا القسم من ${sourceName} لم تُنجز بعد؛ يُعرض النص الإنجليزي المصدر مع صفحاته دون ترجمة آلية قد تغيّر المعنى السريري.`,
  };
}
