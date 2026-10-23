# SEG Recovery Handoff

This directory contains non-secret runtime recovery and transfer evidence supplemental to the validated SEG source snapshot.

It is intentionally separate from application source and must not replace `client/`, `server/`, `drizzle/`, `shared/`, or any existing authentication/database files.

Runtime secret values, OAuth credentials, database connection strings, Forge keys, cookies, tokens, and `.env` files are intentionally excluded. The official Manus/WebDev Secret Manager remains the only approved source for protected values.

The documents preserve project/deployment identifiers, checkpoint references, environment variable names/status, transfer exclusions, file registry, and the current completeness gap assessment.
