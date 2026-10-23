export const SEG_ROUTES = {
  landing: "/",
  register: "/register",
  login: "/login",
  verifyEmail: "/verify-email",
  dashboard: "/dashboard",
  pathway: "/pathway",
  laboratory: "/laboratory",
  learn: "/learn",
  practice: "/practice",
  atlas: "/atlas",
  journal: "/journal",
  account: "/account",
} as const;

const PROTECTED_ROUTES = new Set<string>([
  SEG_ROUTES.dashboard,
  SEG_ROUTES.pathway,
  SEG_ROUTES.laboratory,
  SEG_ROUTES.learn,
  SEG_ROUTES.practice,
  SEG_ROUTES.atlas,
  SEG_ROUTES.journal,
  SEG_ROUTES.account,
]);

export function routeRequiresAuth(path: string): boolean {
  const pathname = path.split(/[?#]/, 1)[0].replace(/\/+$/, "") || "/";
  return PROTECTED_ROUTES.has(pathname) ||
    /^\/practice\/(create|exams|performance|settings|exam-traps)$/.test(pathname) ||
    /^\/learn\/(?:books(?:\/[^/]+)?|summaries(?:\/[^/]+)?|chapter\/[^/]+|system\/[^/]+|unified-guide|revision)$/.test(pathname);
}

export function getSafePostLoginPath(search: string): string {
  const requestedPath = new URLSearchParams(search).get("returnTo");
  if (!requestedPath || !requestedPath.startsWith("/") ||
    requestedPath.startsWith("//") || requestedPath.includes("\\") ||
    Array.from(requestedPath).some(character => character.charCodeAt(0) <= 32)) {
    return SEG_ROUTES.dashboard;
  }
  const destination = new URL(requestedPath, "https://seg.local");
  return routeRequiresAuth(destination.pathname)
    ? destination.pathname + destination.search + destination.hash
    : SEG_ROUTES.dashboard;
}

export type DashboardAccessState =
  | "loading"
  | "unauthenticated"
  | "authenticated";

export function getDashboardAccessState({
  loading,
  isAuthenticated,
}: {
  loading: boolean;
  isAuthenticated: boolean;
}): DashboardAccessState {
  if (loading) return "loading";
  return isAuthenticated ? "authenticated" : "unauthenticated";
}
