# Updated Source Package Intake Findings

## Package

- Uploaded archive: `/home/ubuntu/upload/كتبعلاءنصدراسي.zip`
- Archive SHA-256: `34650a96c8b244c65a0bfb4969a658df1c9d45220636c9ed661b11acf2358bf3`
- Archive size: 8,962,439 bytes
- Extraction directory: `/home/ubuntu/seg-manus-status/phase_7_8_10_updated_source_intake/`
- Original archive preserved; no existing source was overwritten.

## Contents observed

- `كتب علاء نص دراسي/1400q_Study_Guide_UTF8.txt`
- `كتب علاء نص دراسي/Emergency_Oxford_Essentials.pdf`
- `كتب علاء نص دراسي/FRCEM_High_Yield_Study_Book.txt`
- `كتب علاء نص دراسي/FRCEM_High_Yield_Study_Book_Colored.pdf`
- `كتب علاء نص دراسي/FRCEM_High_Yield_Study_Book_Editable.docx`
- `كتب علاء نص دراسي/HIPPO_High_Yield_Study_Book.txt`
- `كتب علاء نص دراسي/HIPPO_High_Yield_Study_Book_Colored.pdf`
- `كتب علاء نص دراسي/HIPPO_High_Yield_Study_Book_Editable.docx`
- `كتب علاء نص دراسي/pretestnew_Study_Guide_UTF8.txt`
- `اسئله +الشرح بالعربي/frcem All_Chapters_Questions_and_Explanations_Full.txt`
- `اسئله +الشرح بالعربي/FRCEM_High_Yield_Study_Book.txt` (same SHA as the copy under the other folder)
- `اسئله +الشرح بالعربي/HIPPO_Questions_Answers_Brief_Arabic_Explanations_By_Chapter.txt`

## Selected file hashes

- FRCEM High-Yield TXT: `f5fb6b3f88b94a1b5a1a360acfe4616a5b3a5940a4b0854a35ba646f5f95a4a1`
- HIPPO High-Yield TXT: `fe9b1df0eae11416195c919095aa946c80212ed48e3ef59f9c0a50e2db5eef5c`
- FRCEM full questions TXT: `08d73b475a7ff1eda0cbbe905c5109628598b5210e8710ac0e8fae19dddad995`
- HIPPO questions/Arabic explanations TXT: `b9c1636f84f802d9f68794a3fa6f3d6ca34617fc08eda0a9ffb863262001771b`
- 1400q study guide TXT: `66ffbf5e7936488e12e71950d617f2f401451600e21ea5f8a98d5bfc508895be7`
- pretestnew study guide TXT: `b4ba84879b1247b9aaeb6172c6dffcb7dcc0860f8894e4651b2bc8a9fd669166`
- Oxford PDF: `353219418d900a27e48bb28c086965135451600e21ea5f8a98d5bfc508895be7`
- FRCEM colored PDF: `9011b079fea60f8b981616eba1602a84b75041806093f895c12f5ea9b602de67`
- HIPPO colored PDF: `065afd12c7e6477e161a99ef417f22005c8c5501ce831d24fd3b34e6231777d8`
- FRCEM editable DOCX: `6075e82c335b1375a14664914c63fefa75fe9c64d12968d972becfd2b92025ea`
- HIPPO editable DOCX: `d9b4ff0b54a11616195c919095aa946c80212ed48e3ef59f9c0a50e2db5eef5c`

## Observed metadata/content signals

- FRCEM TXT begins with `Comprehensive Deduplicated Study Book`, `Prepared for Dr. Alaa Al-Asfar`, and scope `synthesis of 1,529 source questions across 32 chapters`; it includes an educational disclaimer.
- FRCEM colored PDF: 258 pages; title `FRCEM Emergency Medicine High-Yield Review`; producer WeasyPrint 69.0; 32 chapters and 1,529 source questions stated on cover.
- HIPPO colored PDF: 144 pages; title `HIPPO Emergency Medicine High-Yield Review`; 18 chapters and 1,927 source questions stated on cover.
- Oxford PDF: 265 pages; title `Emergency Clinical Medicine Essentials`; author `Manus AI`; creator `Typst 0.11.1`; no publisher/edition/rights evidence observed in the inspected PDF metadata.
- Editable DOCX files have `python-docx` creator metadata; no clear owner/publisher/version metadata was observed in the inspected core properties.
- The archive includes duplicates in different folders; FRCEM High-Yield TXT copies have identical SHA-256.

## Existing-source comparison signal

A filename/hash search against `/home/ubuntu/seg-staging-prep-input/SEG_LEGACY_CONTENT_HANDOFF` and `/home/ubuntu/seg-legacy-knowledge-audit-input` found no identical old FRCEM/HIPPO/Oxford/1400q/pretest study-book files for the new text/PDF/DOCX artifacts. This indicates the package is a distinct intake package or a new presentation/export set, not proof of new clinical content or ownership.

## Governance interpretation

The package is an evidence/source intake candidate. It is not yet a replacement source, approved clinical content, production JSON, or import package. Rights, publisher/owner, edition/version, locator, track/taxonomy, and independent clinical review remain to be established from supplied evidence. Any adoption must be versioned and reversible; original sources must remain preserved.
