# SEG Attached Reference Evidence v1

**Project:** Smart Emergency Guide (SEG)

**Purpose:** Preserve the user-supplied visual reference and evidence artifacts as a separate, non-runtime evidence package for future visual comparison and continuity review.

**Status:** REFERENCE ONLY — NOT FOR APPLICATION RUNTIME, MEDICAL CONTENT ACTIVATION, OR VISUAL FREEZE APPROVAL

## Source package

The artifacts were supplied in `SEGFinalSourceValidationandFileReview(3).zip` and extracted without renaming, editing, cropping, recompressing, or replacing any entry. The source archive SHA-256 is:

`2a3e9d87bbc04e83b91a2656a1fce7c2db96296a40f4c20d8ace556c3cec5117`

The source archive contained 86 files: 74 PNG files, 10 JPG files, one TSV metadata file, and one Markdown mapping file. Archive integrity was verified before extraction, and all archive paths were safe relative paths.

## Companion attachments

`NewTextDocument(2).txt` was compared byte-for-byte with the archive entry `SEG_LEGACY_SCREEN_REFERENCE_MAPPING.md` and was an exact match. It was therefore not duplicated under a second filename.

`seg-image-metadata.tsv` was compared byte-for-byte with the archive entry `seg-image-metadata.tsv` and was an exact match. It was therefore not duplicated under a second filename.

## Placement and boundaries

All extracted artifacts are stored under:

`RECOVERY_HANDOFF/ATTACHED_REFERENCE_EVIDENCE_v1/`

They are deliberately kept outside `client/`, `client/public/`, `server/`, and any active application asset path. They must not be treated as approved production assets, medical-content records, a replacement for the SEG final visual authority package, or evidence of authenticated runtime behavior.

The legacy screenshot mapping retains its stated role: historical visual continuity reference only. The image metadata file records supplied package metadata; it does not constitute rights clearance, clinical approval, or activation authorization.

## Duplicate content preserved

Two duplicate-content groups were detected within the supplied archive and were preserved exactly because the original filenames and provenance were retained:

- `pasted_file_EtagF1_image.png` and `pasted_file_JusCbM_image.png`
- `pasted_file_lgEq6G_image.png` and `pasted_file_zxvUQg_image.png`

No source entry was deleted solely because its bytes matched another entry.

## Validation status

The archive passed ZIP integrity and safe-path checks before extraction. A final package audit must confirm image readability, metadata consistency, forbidden-path exclusion, and checksum integrity after the package is rebuilt.

## Governance limitation

These files are preserved for evidence and continuity. No design patch, UI change, authentication change, database change, medical-content import, activation, commit, or push is authorized by this evidence package.
