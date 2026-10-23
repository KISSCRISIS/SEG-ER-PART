/**
 * API communication config — Android vs Web/Electron branching.
 * Keeps existing relative "/api/trpc" for Electron/web (unchanged).
 * Capacitor WebView uses absolute URL when VITE_API_URL is set; falls back to
 * relative for dev with vite proxy, but prefers absolute for production.
 */
import { isCapacitor } from "./capacitor-platform";

const RELATIVE_TRPC_URL = "/api/trpc";

/**
 * Returns tRPC endpoint URL.
 * - Electron/web: "/api/trpc" (proxy/relative, cookies work)
 * - Capacitor Android: VITE_API_URL + "/api/trpc" if set, else "/api/trpc"
 *   (Bearer mode will be used for auth; see mobile-auth.ts)
 */
export function getTrpcUrl(): string {
  if (!isCapacitor()) return RELATIVE_TRPC_URL;
  const apiBase = import.meta.env.VITE_API_URL as string | undefined;
  if (apiBase && typeof apiBase === "string" && apiBase.trim().length > 0) {
    const base = apiBase.replace(/\/$/, "");
    return `${base}/api/trpc`;
  }
  return RELATIVE_TRPC_URL;
}

/**
 * Whether to include credentials (cookies) in fetch.
 * - Web/Electron: "include" (cookie session primary)
 * - Capacitor: "omit" when using absolute URL cross-origin would strip cookies;
 *   Bearer token is used instead. "include" is harmless for same-origin.
 */
export function getFetchCredentials(): RequestCredentials {
  if (!isCapacitor()) return "include";
  const apiBase = import.meta.env.VITE_API_URL as string | undefined;
  if (apiBase && apiBase.trim().length > 0) return "omit";
  return "include";
}
