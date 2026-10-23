# SEG Drug HTML Recovery Status

**Execution mode:** `CONTROLLED READ-ONLY RECOVERY`  
**Batch run timestamp (UTC):** `2026-08-22T05:57:41.397874+00:00`  
**Source family:** **Drug HTML Artifact**  
**Source authority:** YaAllah SEG source/governance records remain controlling.  
**Recovery gate:** `BLOCKED_PENDING_EVIDENCE`  
**No production transformation:** `true`

## Recovery Result

The read-only batch verified the registered HTML artifact and retained its prior structural evidence. The artifact is available and hash-consistent, but this is not source-governance closure.

## Artifact Inventory and Integrity

| Registry reference | Artifact path | Type | Bytes | Logical lines | SHA-256 | Registry comparison |
|---|---|---|---:|---:|---|---|
| `LOCAL_INTAKE_ARTIFACT` | `/home/ubuntu/upload/deepseek_html_20260615_a3266b.html` | HTML | 25918 | 395 | `5367711d08df2393cf852815b1b9d0ad4dac8240ac061cd88c71a53884e938ac` | MATCH |

The HTML is the registered local intake artifact. The previously verified static structure contains 19 `summaryData` sections, 21 `quick` entries, 47 `drugList` entities, and 20 `trapsList` entries. The prior header claim of 40+ drugs and 120+ traps is not adopted as an inventory result. No explicit pairwise interaction table was observed.

All listed artifacts were read for fingerprinting only. No artifact was rewritten, normalized, renamed, deleted, or executed.

## Recovery Observations

- SHA-256 matches the registered value `5367711d08df2393cf852815b1b9d0ad4dac8240ac061cd88c71a53884e938ac`.
- The artifact contains embedded JavaScript data arrays and Arabic/English clinical labels.
- The title contains Rosen/Tintinalli reference signals; this does not establish canonical edition, publisher, ownership, or rights.
- Observed medication and precaution strings remain unvalidated text signals pending qualified clinical review.

These are structural or provenance observations only. They are not clinical correctness findings, dose validation, interaction validation, approval, or activation.

## Governance State

| Governance field | Current observed state |
|---|---|
| Source identity | Canonical title, owner/publisher, author/organization, edition/version, date, and original locator are not supplied. |
| Provenance | Local artifact fingerprint is confirmed; original-to-extraction-to-registry continuity remains incomplete. |
| Rights | `PENDING_EXTERNAL_EVIDENCE`; no ownership, license, display, educational-use, redistribution, or publication evidence supplied. |
| Medical review | `PENDING_CLINICAL_REVIEW`; no qualified reviewer decision for the exact HTML representation. |
| Professional track | Not explicitly governed; no track may be inferred from emergency-medicine signals or filename. |
| Allowed use | `INTERNAL_REFERENCE_ONLY` / `WAITING_FOR_EVIDENCE` |

## Remaining Blockers

- Canonical source identity and exact version/edition.
- Source-specific rights and display permissions.
- Attributable Emergency Medicine medication/pharmacology review covering preserved claims and conflicts.
- Original-source locator and extraction-event provenance.
- Separate audit evidence for any later governance decision.

## Next Allowed Action

Proceed to Evidence Closure Decision for source identity, rights, provenance, and role-based clinical review. Preserve the HTML unchanged; do not treat it as a validated dose or interaction database.

No normalization, schema mapping, content record creation, import, activation, publication, or learner exposure is authorized by this recovery report.

## Non-actions

| Action | Performed |
|---|---|
| Source modification | `false` |
| Medical content correction or rewriting | `false` |
| SQL or migration | `false` |
| Database/Supabase change | `false` |
| Prisma/Zod/mapping creation | `false` |
| Content import or activation | `false` |
| Clinical approval or rights approval | `false` |
| Git operation | `false` |

## References

[1]: /home/ubuntu/upload/deepseek_html_20260615_a3266b.html
[2]: /home/ubuntu/seg-internship-output/SEG_DRUG_HTML_SOURCE_REVIEW.md
[3]: /home/ubuntu/seg-internship-output/SEG_PHASE_7_8_11_UPDATED_SOURCE_REGISTRY.md

---

**Report status:** `RECOVERY_EVIDENCE_CAPTURED_PENDING_GOVERNANCE_CLOSURE`
