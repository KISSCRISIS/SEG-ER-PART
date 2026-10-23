# SEG Pending Tasks

**Version:** 1.0\
**Date:** 2026-08-17

------------------------------------------------------------------------

# Priority 1 --- Deployment Ownership Recovery

Status:

    BLOCKED

Objective:

Recover verified ownership mapping for the existing Manus deployment.

Required evidence:

-   website_id
-   deployment-owner task_id
-   latest checkpoint identity
-   verified runtime-to-commit connection

Current finding:

Production deployment identity is not verified.

Decision:

Do not create a new Website deployment. Do not redeploy until ownership
mapping is confirmed.

------------------------------------------------------------------------

# Priority 2 --- Final Visual Acceptance

Status:

    PENDING

Required:

-   Production visual verification.
-   Authenticated screenshot evidence.
-   Responsive acceptance matrix.
-   Runtime parity validation.

------------------------------------------------------------------------

# Priority 3 --- Content Pipeline

Status:

    NEXT

Tasks:

-   Perform READ_ONLY source handoff and immutable inventory.
-   Map source identity, version, checksum, rights, locators, taxonomy, and explicit professional track.
-   Validate candidate records against the canonical manifest schema without adding unrecognized fields.
-   Record rights/provenance blockers separately from clinical-review decisions.
-   Run a bounded Pilot Converter only after explicit authorization; keep all provisional outputs `Pending Clinical Review` and `NOT_APPROVED`.
-   Prepare deterministic Content QA evidence for exact artifact hashes and track separation.
-   Prepare integration dry-run, idempotency, isolation, release, and rollback evidence without importing or activating content.
-   Supply a source package before any real extraction or pilot validation.

Phase 4 documentation and templates are prepared locally. Clinical review, approval, implementation authorization, database integration, activation, and publication remain pending separate evidence and authorization.

------------------------------------------------------------------------

# Priority 4 --- Final Release Preparation

Status:

    PENDING

Requirements:

-   Deployment parity.
-   Evidence completion.
-   Governance approval.
-   Final release review.
