# SEG Master Roadmap

**Version:** 1.0\
**Date:** 2026-08-17

------------------------------------------------------------------------

# Purpose

This document defines the approved execution roadmap for the SEG
project.

It separates completed foundations, current work, pending phases, and
final release requirements.

------------------------------------------------------------------------

# Phase 1 --- Foundation

Status:

    COMPLETE

Scope:

-   Application foundation.
-   Existing architecture stabilization.
-   Core project structure.
-   Authentication foundation.
-   Database boundaries.

------------------------------------------------------------------------

# Phase 2 --- Governance & Security

Status:

    COMPLETE

Scope:

-   Security validation.
-   Audit workflows.
-   Governance rules.
-   Release control foundation.
-   Medical governance boundaries.

------------------------------------------------------------------------

# Phase 3 --- Visual Implementation

Status:

    IN PROGRESS

Objective:

Reach final SEG visual acceptance while preserving existing architecture
and protected boundaries.

Completed:

-   Visual system implementation.
-   Main application surfaces improvement.
-   Dashboard visual work.
-   Accessibility review process.

Remaining:

-   Production deployment verification.
-   Final visual evidence collection.
-   Responsive acceptance validation.

------------------------------------------------------------------------

# Phase 4 --- Content Pipeline Preparation

Status:

    NEXT PHASE

Objective:

Prepare a controlled, traceable, and reversible pipeline for supplied medical resources without modifying original sources or exposing learner-facing content.

Governed activities:

-   READ_ONLY source handoff, inventory, and immutable preservation.
-   Metadata and Source Mapping for provenance, version, checksum, rights, locators, taxonomy, and explicit track context.
-   Canonical Schema Validation against the versioned manifest contract.
-   Rights and Provenance Review with fail-closed blockers.
-   Explicitly authorized bounded Pilot Conversion, when required, with all outputs `Pending Clinical Review` and `NOT_APPROVED`.
-   Preparation of Content QA, integration dry-run, release, and rollback evidence.

Phase 4 does not perform clinical review, approval, activation, database import, application integration, commit, push, deployment, or publication.

------------------------------------------------------------------------

# Phase 5 --- Medical Content Governance and Integration

Status:

    PENDING

Process:

    Source Handoff
      ↓
    READ_ONLY Intake / Source Mapping
      ↓
    Canonical Schema Validation
      ↓
    Rights and Provenance Review
      ↓
    Bounded Pilot Conversion (if explicitly authorized)
      ↓
    Medical Review
      ↓
    Governance Registration / Approval Evidence
      ↓
    Content QA
      ↓
    Separate Implementation Authorization
      ↓
    Integration Dry-Run
      ↓
    Controlled Release / Activation of approved records only

Required governance:

-   Source ID, exact location, version, and SHA-256 checksum.
-   Rights evidence for text, images, and display scope.
-   Explicit taxonomy and professional-track context without mixing.
-   Qualified reviewer identity/role, cited locators, decision, and review dates.
-   Append-only audit trail and stable record/artifact identifiers.
-   Deterministic Content QA for the exact candidate hash.
-   Explicit implementation target, idempotency, isolation, and rollback evidence.

A structural or QA `PASS` does not replace clinical review or approval. Missing evidence stops the handoff.

------------------------------------------------------------------------

# Phase 6 --- Final Release

Status:

    PENDING

Requirements:

-   Deployment parity confirmed.
-   Visual acceptance completed.
-   Evidence package completed.
-   Final governance review completed.

------------------------------------------------------------------------

# Execution Principles

Priority order:

1.  Reuse existing architecture.
2.  Modify only when required.
3.  Create new components only when justified.

Protected:

-   Authentication.
-   Database boundaries.
-   Security controls.
-   Medical governance.
-   Approved design system.
