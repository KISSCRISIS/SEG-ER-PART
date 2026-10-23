/**
 * Offline-mode detection — isolated Android layer.
 * - Capacitor (Android WebView): always offline-first, no server exists there.
 * - Desktop browser with `?offline=1`: runs the same offline stack against the
 *   bundled /content files, so the full app can be verified with the Node
 *   server stopped. Used for acceptance testing only.
 * Windows Electron keeps current behavior (false → existing server paths).
 */
import { isCapacitor } from "../capacitor-platform";

export function isOfflineMode(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("offline") === "1") return true;
  } catch {
    // URL parsing unavailable — fall through to platform detection.
  }
  return isCapacitor();
}
