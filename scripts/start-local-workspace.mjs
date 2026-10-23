import path from 'node:path';

process.env.SEG_LOCAL_WORKSPACE = 'true';
process.env.SEG_LOCAL_EMAIL_LOGIN = 'true';
process.env.SEG_LOCAL_DATA_DIR ||= path.resolve(import.meta.dirname, '../local-data');
process.env.PORT ||= '3012';
await import('./start-production.mjs');
