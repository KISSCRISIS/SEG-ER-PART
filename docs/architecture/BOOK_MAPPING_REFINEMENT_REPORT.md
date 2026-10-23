# Book Mapping Refinement Report

Refinement of `book-topic-mapping.json` under the rule: keep only mappings
supported by existing SEG content. Whole-system chapters are not valid
targets for narrow clinical topics.

## Previous mappings

82 total: rosen-summaries 50, tintinalli-summaries 25, rosh-summaries 7 —
all High confidence.

## Review finding (Rosh)

All 7 Rosh links mapped an entire system chapter to one narrow topic:

| Rosh chapter | Was mapped to | Verdict |
|---|---|---|
| Cardiovascular System | EM_CARDIO_TAMPONADE | removed |
| Gastrointestinal/Nutritional | EM_GI_BLEED | removed |
| Pulmonology | EM_RESP_PE | removed |
| Neurology | EM_NEURO_STATUS | removed |
| Urology/Renal | EM_ENDO_HYPERK | removed (also cross-system) |
| Endocrinology | EM_ENDO_HYPO | removed |
| Obstetrics/Gynecology | EM_OBGYN_ECTOPIC | removed |

Root cause: 15 chapter-title aliases in `layer.json` `matchAliases`
(`CARDIOVASCULAR SYSTEM`, `PULMONOLOGY`, `NEUROLOGY`,
`GASTROINTESTINAL/NUTRITIONAL`, `ENDOCRINOLOGY`, `UROLOGY/RENAL`,
`OBSTETRICS/GYNECOLOGY`). All removed; clinical aliases kept. After removal
no Rosh chapter matches any alias, confirmed by regeneration (rosh 0/12).

## Updated mappings

75 total: rosen-summaries 50, tintinalli-summaries 25, rosh-summaries 0.
Spot-check verified every remaining mapping resolves to a real titled unit
and none targets a bare system-chapter label.

## Removed uncertain mappings

7 Rosh links (listed above). No replacement links invented; the chapters
stay addressable in Learn readers and the medical-systems index.

## Confidence distribution

- High: 75 (`curated-enhancement-link`)
- Medium: 0
- Low: 0
- Unmapped items: 752 summaries + system-level books (documented in
  BOOK_TOPIC_MAPPING_REPORT.md, never guessed)

## Side fixes in this pass

- `scripts/build-book-mapping.ts` now rebuilds the index deterministically
  instead of merging additively (removed mappings no longer linger), and the
  `CONTAINS` relation correctly targets the content node.
- Regenerated chain: global-layer → medical-systems → topic-graph →
  book-mapping. Layer content nodes (95) unchanged.
