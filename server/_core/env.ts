function parseInteger(name: string, fallback: number) {
  const raw = process.env[name];
  if (!raw) return fallback;
  const parsed = Number(raw);
  if (!Number.isInteger(parsed) || parsed < 0) {
    throw new Error(`${name} must be a non-negative integer`);
  }
  return parsed;
}

function parseBoolean(name: string, fallback: boolean) {
  const raw = process.env[name];
  if (!raw) return fallback;
  if (["1", "true", "yes", "on"].includes(raw.toLowerCase())) return true;
  if (["0", "false", "no", "off"].includes(raw.toLowerCase())) return false;
  throw new Error(`${name} must be a boolean`);
}

export const ENV = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  appVersion: process.env.APP_VERSION ?? "dev",
  serviceName: process.env.SERVICE_NAME ?? "seg-api",
  port: parseInteger("PORT", 3000),
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  trustProxy: process.env.TRUST_PROXY ?? (process.env.NODE_ENV === "production" ? "1" : "false"),
  bodySizeLimit: process.env.BODY_SIZE_LIMIT ?? "10mb",
  apiRateLimit: parseInteger("API_RATE_LIMIT", 240),
  authRateLimit: parseInteger("AUTH_RATE_LIMIT", 30),
  requestTimeoutMs: parseInteger("REQUEST_TIMEOUT_MS", 30_000),
  keepAliveTimeoutMs: parseInteger("KEEP_ALIVE_TIMEOUT_MS", 5_000),
  headersTimeoutMs: parseInteger("HEADERS_TIMEOUT_MS", 6_000),
  enableHsts: parseBoolean("ENABLE_HSTS", false),
  hstsPreload: parseBoolean("HSTS_PRELOAD", false),
  disableCsp: parseBoolean("DISABLE_CSP", false),
  cspUpgradeInsecureRequests: parseBoolean("CSP_UPGRADE_INSECURE_REQUESTS", false),
  disablePrecompressedAssets: parseBoolean("DISABLE_PRECOMPRESSED_ASSETS", false),
};

export function assertProductionEnvironment() {
  if (!ENV.isProduction) return;

  const missing: string[] = [];
  if (!ENV.cookieSecret) missing.push("JWT_SECRET");
  if (!ENV.appId) missing.push("VITE_APP_ID");
  if (!ENV.oAuthServerUrl) missing.push("OAUTH_SERVER_URL");
  if (!ENV.databaseUrl) missing.push("DATABASE_URL");
  if (missing.length > 0) {
    throw new Error(`Missing required production environment variables: ${missing.join(", ")}`);
  }
}
