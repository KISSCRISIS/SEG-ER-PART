// Embedded XML chapter IDs distinguish real topics from authors and subheadings.
export function buildRosenSummaries(manifest, pages, editorial) {
  if (editorial.sourceSha256 !== manifest.sha256) throw new Error("Editorial source fingerprint mismatch");
  const groups = new Map();
  for (const page of pages) {
    const chapter = String(page.text).match(/\bch(\d+[a-z]?)\.xml\b/)?.[1];
    if (!chapter) continue;
    const group = groups.get(chapter) ?? [];
    group.push(page);
    groups.set(chapter, group);
  }
  const used = new Set();
  const chapters = [...groups.entries()].map(([chapter, group]) => {
    group.sort((a, b) => a.pdfPage - b.pdfPage);
    const lines = group[0].text.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
    const header = lines.findIndex(line => /\bch\d+[a-z]?\.xml\b/.test(line));
    const title = lines[header + 1];
    if (!title || !/[A-Z]{3}/.test(title)) throw new Error(`Missing title for chapter ${chapter}`);
    const range = { start: group[0].pdfPage, end: group.at(-1).pdfPage };
    if (group.length !== range.end - range.start + 1) throw new Error(`Non-contiguous chapter ${chapter}`);
    const draft = editorial.chapters[chapter];
    if (draft) {
      used.add(chapter);
      if (draft.title !== title || draft.pdfPages.start !== range.start || draft.pdfPages.end !== range.end) {
        throw new Error(`Editorial title/page mismatch for chapter ${chapter}`);
      }
      for (const field of ["summary", "diagnosis", "management"]) {
        if (!draft[field]?.length || draft[field].some(p => !p.en?.trim() || !/[\u0600-\u06ff]/.test(p.ar ?? ""))) {
          throw new Error(`Missing bilingual ${field}: ${chapter}`);
        }
      }
      if (!draft.arabicExplanation?.length) throw new Error(`Missing explanation: ${chapter}`);
    }
    const aliases = (manifest.topics ?? []).filter(t => t.pdfStart >= range.start && t.pdfStart <= range.end).map(t => t.id);
    const legacy = (manifest.topics ?? []).find(t => t.title === title && t.pdfStart === range.start);
    const printed = group.map(p => p.text.trim().split(/\r?\n/).at(-1)).map(n => /^\d+$/.test(n) ? Number(n) : null);
    return {
      unitId: legacy?.id ?? `rosen-5min-ch-${chapter}`,
      sourceChapterId: `ch${chapter}`, legacyAliases: aliases, title,
      source: manifest.title, edition: manifest.edition,
      editorialStatus: draft ? (draft.status ?? "bilingual-draft") : "pending-editorial",
      highYieldSummary: draft?.summary.map(p => p.en) ?? [],
      diagnosis: draft?.diagnosis.map(p => p.en) ?? [],
      management: draft?.management.map(p => p.en) ?? [],
      arabicTranslation: draft ? Object.fromEntries(["summary", "diagnosis", "management"].map(key => [key, draft[key].map(p => p.ar)])) : null,
      arabicExplanation: draft?.arabicExplanation ?? [],
      editorialNotes: draft?.editorialNotes ?? [],
      pages: range,
      printedPages: printed.every(n => n !== null) ? { start: printed[0], end: printed.at(-1) } : null,
      references: [{ source: manifest.title, edition: manifest.edition, pages: range, pageNumbering: "PDF" }],
      provenance: { sourceId: manifest.id, sourceSha256: manifest.sha256, extractedPages: group.length, method: "source-chapter-xml-id", editorialVersion: draft ? editorial.version : null, editorial: draft?.provenance ?? null },
      reviewStatus: "UNDER_REVIEW", clinicalReview: "pending",
    };
  }).sort((a, b) => a.pages.start - b.pages.start);
  if (Object.keys(editorial.chapters).some(id => !used.has(id))) throw new Error("Unmatched editorial chapter");
  const indexedPages = new Set(chapters.flatMap(t => Array.from({ length: t.pages.end - t.pages.start + 1 }, (_, i) => t.pages.start + i)));
  const humanBilingualDrafts = chapters.filter(topic => topic.editorialStatus === "bilingual-draft").length;
  const machineTranslatedUnderReview = chapters.filter(topic => topic.editorialStatus === "machine-translated-under-review").length;
  const translatedSummaries = humanBilingualDrafts + machineTranslatedUnderReview;
  const audit = {
    legacyHeadingCount: manifest.topics.length,
    indexedSourceChapters: chapters.length,
    bilingualDrafts: humanBilingualDrafts,
    machineTranslatedUnderReview,
    translatedSummaries,
    pendingEditorial: chapters.length - translatedSummaries,
    sourcePagesIndexed: indexedPages.size,
    excludedPages: pages.filter(p => !indexedPages.has(p.pdfPage)).map(p => p.pdfPage),
    legacyIndexPreserved: true,
    clinicalApproval: false,
    notes: [
      "Counts reflect source chapter identifiers, not clinical approval or verified table-of-contents coverage.",
      "Front/back matter is not medical summary content. Unedited topics link to the source PDF without fake translations.",
      "Arabic translates the selected SEG English summary plus a separate educational explanation, not the full original chapter.",
    ],
  };
  return { schemaVersion: 2, book: manifest.id, total: chapters.length, status: "UNDER_REVIEW", audit, chapters };
}
