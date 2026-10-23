# SEG Deployment Status

**Version:** 1.0\
**Date:** 2026-08-17

------------------------------------------------------------------------

# Runtime

URL:

    https://seg-guide-bjjkqn7t.manus.space/dashboard

------------------------------------------------------------------------

# Repository

    KISSCRISIS/manus

Branch:

    main

Validated commit:

    0e704ce65064e9c2b5deb06522aa2ef1d42b739a

------------------------------------------------------------------------

# Current State

Local:

    PASS

Production:

    BLOCKED

------------------------------------------------------------------------

# Asset Comparison

Local build:

    index-DlfGnksn.css
    index-3Rme5JN8.js

Production runtime:

    index-DYmvRKgr.css
    index-QumL5cbf.js

------------------------------------------------------------------------

# Finding

Production is not proven to match the validated local build.

Decision:

    LOCAL != DEPLOYED

------------------------------------------------------------------------

# Missing Deployment Evidence

Required:

-   website_id.
-   deployment-owner task.
-   latest checkpoint.
-   verified deployment mapping.

------------------------------------------------------------------------

# Rule

No redeploy or new Website creation until deployment ownership is
verified.
