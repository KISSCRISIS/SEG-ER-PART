/**
 * Mobile authentication / session handling.
 * Preserves existing cookie flow for Electron/web.
 * For Capacitor Android, mirrors Bearer token to persistent storage so WebView
 * restarts keep session (Android WebView may clear sessionStorage on close).
 */
import { COOKIE_NAME } from "@shared/const";
import { isCapacitor } from "./capacitor-platform";
import { sessionGet, sessionSet, sessionRemove, storageGet, storageGetAsync, storageRemoveAsync, storageSetAsync } from "./mobile-storage";

const MANUS_COOKIE_KEY = "manus-cookie";
const PERSISTENT_TOKEN_KEY = "seg-persistent-token";

/**
 * Persist token for Capacitor (Bearer fallback path).
 * Web: uses sessionStorage only (existing behavior).
 * Capacitor: also persists to Preferences/localStorage async.
 */
export async function persistSessionToken(rawCookieOrToken: string): Promise<void> {
  try {
    sessionSet(MANUS_COOKIE_KEY, rawCookieOrToken);
  } catch {}
  if (isCapacitor()) {
    try {
      const token = extractToken(rawCookieOrToken);
      if (token) await storageSetAsync(PERSISTENT_TOKEN_KEY, token);
    } catch {}
  }
}

export async function clearPersistentToken(): Promise<void> {
  try {
    sessionRemove(MANUS_COOKIE_KEY);
  } catch {}
  try {
    // also clear legacy sessionStorage Bearer path
    sessionRemove("manus-cookie");
  } catch {}
  if (isCapacitor()) {
    try {
      await storageRemoveAsync(PERSISTENT_TOKEN_KEY);
    } catch {}
    try {
      window.localStorage.removeItem(PERSISTENT_TOKEN_KEY);
    } catch {}
  }
}

/**
 * Retrieve Bearer token for Authorization header.
 * Priority:
 * 1. sessionStorage "manus-cookie" → Bearer (existing Preview/WebView path)
 * 2. Capacitor persistent token (Preferences)
 * 3. localStorage fallback (if any)
 */
export function getBearerTokenSync(): string | null {
  // Synchronous fast path for httpBatchLink headers() which is sync.
  try {
    const raw = sessionGet(MANUS_COOKIE_KEY);
    if (raw) {
      const token = extractToken(raw);
      if (token) return token;
    }
  } catch {}
  // Fallback to persistent storage sync (localStorage copy)
  try {
    const persisted = storageGet(PERSISTENT_TOKEN_KEY);
    if (persisted) return persisted;
  } catch {}
  return null;
}

export async function getBearerTokenAsync(): Promise<string | null> {
  const sync = getBearerTokenSync();
  if (sync) return sync;
  if (isCapacitor()) {
    try {
      const v = await storageGetAsync(PERSISTENT_TOKEN_KEY);
      return v;
    } catch {
      return null;
    }
  }
  return null;
}

function extractToken(raw: string): string | null {
  if (!raw) return null;
  const prefix = `${COOKIE_NAME}=`;
  // raw may be "app_session_id=xxx; ..." or just token
  if (raw.includes(prefix)) {
    const pair = raw.split(";").find(s => s.trim().startsWith(prefix));
    const token = pair?.trim().slice(prefix.length);
    return token && token.length > 0 ? token : null;
  }
  // If raw looks like JWT (no prefix), return as-is
  if (raw.trim().length > 20 && raw.includes(".")) return raw.trim();
  return raw.trim() || null;
}
