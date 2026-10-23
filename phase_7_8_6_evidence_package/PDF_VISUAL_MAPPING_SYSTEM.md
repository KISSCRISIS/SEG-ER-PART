# PDF Visual Mapping System

This version adds the first working implementation of the PDF visual mapping system.

## What changed

The uploaded visual PDF is no longer treated as a random page gallery inside educational sections. The project now includes:

- `src/data/visualAssets.json` — structured metadata for extracted visual assets.
- `public/visual-assets/` — clinically relevant extracted images from the PDF.
- `TopicMatchedVisuals` component — renders topic-matched visuals with English learning focus and simple Arabic support.
- `/admin/visual-mapping` — admin review board for checking suggested section/topic mapping.

## Filtering rules

The system filters out front matter and blocks raw educational misuse:

- cover pages
- author/intro pages
- copyright/front matter
- table-of-contents pages
- footer logos and tiny ornaments
- blank/unrelated pages

## What is extracted

The extraction focuses on useful visual elements, not full pages:

- ECG strips
- tables
- algorithms
- diagrams
- clinical images
- imaging/ultrasound visuals
- high-yield visual summaries

## Current status

This is the first automated mapping pass. It extracted 542 clinically useful visual assets and mapped them to sections such as:

- ECG Atlas
- POCUS Atlas
- Critical Care
- Toxicology & Antidotes
- Algorithms
- Visual Signs
- Topics

Every asset is marked as `needsReview: true` by default. This is intentional because medical visual mapping must be verified before final publishing.

## Admin workflow

Open:

`/admin/visual-mapping`

Use it to review:

- suggested topic
- suggested section(s)
- source page
- visual type
- whether the image should be shown, edited, remapped, or hidden

## Important note

This is not yet a perfect human-reviewed final mapping. It is the infrastructure and first large extraction pass. The next quality round should focus on ECG first, then Critical Care, Toxicology, POCUS, and full Topics textbook integration.
