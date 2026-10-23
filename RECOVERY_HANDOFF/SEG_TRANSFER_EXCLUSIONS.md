# SEG Transfer Exclusions

| Exclusion | Reason |
|---|---|
| `.env`, `.env.*`, secrets, keys, passwords, tokens, connection strings | Never export protected credentials or runtime secrets. |
| `node_modules`, `dist`, coverage, caches | Reproducible/generated output; install or build after authorized import. |
| `.git`, browser/session artifacts, `client/public/__manus__` | Repository/session metadata is not portable runtime source. |
| `.manus-logs`, `*.log`, `*.tmp` | Runtime traces and temporary files are not release source. |
| Image binaries and large static media | Managed URLs and non-secret manifests are transferred; images are not duplicated. |
| Dockerfile | Not present in the current Vite/Express project source. |
| Requested optional auth/deployment reports | Not present in the current source tree; see deployment reference. |
