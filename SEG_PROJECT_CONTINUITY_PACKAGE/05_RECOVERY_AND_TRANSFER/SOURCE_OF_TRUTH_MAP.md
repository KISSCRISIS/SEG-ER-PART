# SOURCE_OF_TRUTH_MAP

| Concern | Primary source of truth | Secondary evidence | Do not use as authority |
|---|---|---|---|
| Approved visual scope | `01_MANUS_VISUAL_FREEZE_STATE/SEG_FINAL_VISUAL_FREEZE_ACCEPTANCE_DECISION.md` | Freeze validation and final readiness reports | Unapproved screenshots or generated references |
| Dashboard UX | `01_MANUS_VISUAL_FREEZE_STATE/SEG_DASHBOARD_UX_FINAL_REPORT.md` | Freeze pass report and source tests | New top-level routes |
| Visual assets | `01_MANUS_VISUAL_FREEZE_STATE/SEG_VISUAL_ASSET_REGISTRY_FINAL_REPORT.md` | Asset inventory and managed URL records | Contact sheets or reference boards as UI assets |
| Current execution state | `02_EXECUTION_HISTORY/LAST_MANUS_STATE.md` | `NEXT_PENDING_COMMANDS.md` and command ledger | Informal memory without a checkpoint |
| Content governance | `03_CONTENT_PREPARATION_STATE/SEG_FINAL_CONTENT_PREPARATION_DECISION_REPORT.md` | Content readiness and verification reports | UI labels as medical taxonomy or unreviewed text |
| Current architecture | `04_PROJECT_GOVERNANCE/SEG_ARCHITECTURE_RULES.md` | Master state and release orchestrator | Unapproved framework rewrite |
| Decisions | `04_PROJECT_GOVERNANCE/SEG_DECISION_LOG.md` | Project memory and release orchestrator | Assumptions inferred from missing files |
| Change control | `04_PROJECT_GOVERNANCE/SEG_CHANGE_CONTROL_RULES.md` | `todo.md` and reports | Destructive overwrite or untracked edits |
| Recovery | `05_RECOVERY_AND_TRANSFER/PROJECT_RESTART_INSTRUCTIONS.md` | `SEG_TRANSFER_README.md` and `DEPLOYMENT.md` | Extracting over an existing copy |
| Production readiness | Project root `SEG_PRODUCTION_READINESS.md` and `DEPLOYMENT.md` | `SEG_PHASE3_DELIVERY_MANIFEST.md` | Static-only deployment when Express controls are required |
| Future Next.js migration | `05_RECOVERY_AND_TRANSFER/SEG_NEXTJS_MIGRATION_PLAN.md` | Project root migration plan | Next.js implementation before explicit authorization |

## Conflict rule

عند تعارض ملفين، لا تُحل المشكلة بالحدس. استخدم الملف الأعلى في هذا الجدول، سجّل التعارض في `SEG_DECISION_LOG.md`، واطلب قراراً جديداً إذا لم يكن المرجع الأعلى حاسماً.
