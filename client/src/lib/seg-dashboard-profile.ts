export const segDashboardPresentationProfile = Object.freeze({
  displayName: "Dr. Ahmed",
  initials: "A",
  specialty: "Emergency Medicine",
});

/**
 * Resolve the dashboard greeting name. The authenticated user's name wins;
 * the shared presentation identity is only a fallback for signed-in sessions
 * without a stored name (or while the profile is still loading).
 */
export function resolveDashboardDisplayName(
  userName: string | null | undefined
): string {
  const trimmed = userName?.trim();
  return trimmed
    ? trimmed
    : segDashboardPresentationProfile.displayName;
}
