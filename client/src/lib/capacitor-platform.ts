/**
 * Platform detection — isolated Android layer.
 * Windows Electron keeps current behavior (isCapacitor=false → existing paths).
 * No import of @capacitor/core at top-level to keep web/Electron bundle untouched.
 */

export function isCapacitor(): boolean {
  if (typeof window === "undefined") return false;
  const w = window as unknown as { Capacitor?: { isNativePlatform?: () => boolean; getPlatform?: () => string } };
  try {
    if (w.Capacitor?.isNativePlatform?.()) return true;
    if (w.Capacitor?.getPlatform?.() === "android" || w.Capacitor?.getPlatform?.() === "ios") return true;
  } catch {
    // ignore
  }
  // Fallback: capacitor:// or http with Capacitor bridge
  try {
    if (window.location.protocol === "capacitor:") return true;
    if (document.URL.startsWith("capacitor://")) return true;
  } catch {}
  return false;
}

export function getCapacitorPlatform(): "android" | "ios" | "web" {
  if (typeof window === "undefined") return "web";
  const w = window as unknown as { Capacitor?: { getPlatform?: () => string } };
  try {
    const p = w.Capacitor?.getPlatform?.();
    if (p === "android" || p === "ios") return p;
  } catch {}
  return isCapacitor() ? "android" : "web";
}

export function isAndroid(): boolean {
  return getCapacitorPlatform() === "android";
}

export function isElectron(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const ua = window.navigator.userAgent || "";
    if (ua.toLowerCase().includes("electron")) return true;
  } catch {}
  // Electron with contextIsolation sandbox does not expose process; fallback to userAgent only.
  return false;
}

export function isWeb(): boolean {
  return !isCapacitor() && !isElectron();
}
