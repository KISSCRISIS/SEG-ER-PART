process.env.NODE_ENV = "development";
process.env.SEG_LOCAL_WORKSPACE ??= "true";
process.env.SEG_LOCAL_EMAIL_LOGIN ??= "true";
process.env.SEG_LOCAL_DATA_DIR ??= ".seg-local-data";

await import("../server/_core/index.ts");
