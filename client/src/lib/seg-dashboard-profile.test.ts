import { describe, expect, it } from "vitest";
import {
  resolveDashboardDisplayName,
  segDashboardPresentationProfile,
} from "./seg-dashboard-profile";

describe("segDashboardPresentationProfile", () => {
  it("provides the shared presentation identity used by My Home", () => {
    expect(segDashboardPresentationProfile).toEqual({
      displayName: "Dr. Ahmed",
      initials: "A",
      specialty: "Emergency Medicine",
    });
  });
});

describe("resolveDashboardDisplayName", () => {
  it("prefers the authenticated user name", () => {
    expect(resolveDashboardDisplayName("Dr. Layla Haddad")).toBe(
      "Dr. Layla Haddad"
    );
  });

  it("falls back to the presentation identity when no name exists", () => {
    expect(resolveDashboardDisplayName(undefined)).toBe("Dr. Ahmed");
    expect(resolveDashboardDisplayName(null)).toBe("Dr. Ahmed");
    expect(resolveDashboardDisplayName("   ")).toBe("Dr. Ahmed");
  });
});
