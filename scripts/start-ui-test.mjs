import path from "node:path";

process.env.NODE_ENV = "production";
process.env.PORT ||= "3000";
process.env.JWT_SECRET ||= "ui-test-only-secret-at-least-thirty-two-characters";
process.env.VITE_APP_ID ||= "ui-test";
process.env.OAUTH_SERVER_URL ||= "https://oauth.invalid";
process.env.DATABASE_URL ||= "sqlite://.tmp-playwright-data/workspace.sqlite";
process.env.SEG_LOCAL_WORKSPACE = "true";
process.env.SEG_LOCAL_EMAIL_LOGIN = "true";
process.env.SEG_LOCAL_DATA_DIR ||= path.resolve(import.meta.dirname, "../.tmp-playwright-data");

await import("../dist/index.js");
