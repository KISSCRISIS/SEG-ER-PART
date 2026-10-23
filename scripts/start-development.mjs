import { randomBytes } from "node:crypto";

process.env.NODE_ENV = "development";
process.env.SEG_LOCAL_WORKSPACE ??= "true";
process.env.SEG_LOCAL_EMAIL_LOGIN ??= "true";
process.env.SEG_LOCAL_DATA_DIR ??= ".seg-local-data";
// Use a per-process secret when developers have not configured one; never use an empty signing key.
if (!process.env.JWT_SECRET) process.env.JWT_SECRET = randomBytes(32).toString("hex");

await import("../server/_core/index.ts");
