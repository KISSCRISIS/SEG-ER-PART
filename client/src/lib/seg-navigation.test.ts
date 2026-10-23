import { describe, expect, it } from "vitest";
import {
  getDashboardAccessState,
  getSafePostLoginPath,
  routeRequiresAuth,
  SEG_ROUTES,
} from "./seg-navigation";

describe("SEG route protection", () => {
  it("keeps My Home behind the authentication boundary", () => {
    expect(routeRequiresAuth(SEG_ROUTES.dashboard)).toBe(true);
  });

  it("keeps internal routes protected and public entry routes reachable", () => {
    expect(routeRequiresAuth(SEG_ROUTES.account)).toBe(true);
    expect(routeRequiresAuth(SEG_ROUTES.laboratory)).toBe(true);
    expect(routeRequiresAuth("/laboratory/?filter=chemistry")).toBe(true);
    expect(routeRequiresAuth(SEG_ROUTES.landing)).toBe(false);
    expect(routeRequiresAuth(SEG_ROUTES.register)).toBe(false);
    expect(routeRequiresAuth(SEG_ROUTES.login)).toBe(false);
    expect(routeRequiresAuth(SEG_ROUTES.verifyEmail)).toBe(false);
  });

  it("accepts only known protected return destinations after login", () => {
    expect(getSafePostLoginPath("?returnTo=%2Flaboratory")).toBe(
      SEG_ROUTES.laboratory
    );
    expect(getSafePostLoginPath("?returnTo=https%3A%2F%2Fevil.example")).toBe(
      SEG_ROUTES.dashboard
    );
    expect(getSafePostLoginPath("?returnTo=%2Flogin")).toBe(
      SEG_ROUTES.dashboard
    );
  });

  it("preserves nested study and exam destinations including filters and position", () => {
    for (const target of ["/practice/create?section=7", "/practice/exams", "/learn/books/oxford?page=12#chapter", "/learn/summaries/rosen-high-yield?chapter=aaa", "/learn/chapter/frcem-1", "/dashboard#pathway"]) {
      expect(getSafePostLoginPath(`?returnTo=${encodeURIComponent(target)}`)).toBe(target);
    }
    for (const target of ["//evil.example", "/\\evil.example", "/learn/../login", "/practice/unknown"]) {
      expect(getSafePostLoginPath(`?returnTo=${encodeURIComponent(target)}`)).toBe(SEG_ROUTES.dashboard);
    }
  });

  it("keeps unauthenticated users out of My Home while the session state resolves", () => {
    expect(
      getDashboardAccessState({ loading: true, isAuthenticated: false })
    ).toBe("loading");
    expect(
      getDashboardAccessState({ loading: false, isAuthenticated: false })
    ).toBe("unauthenticated");
    expect(
      getDashboardAccessState({ loading: false, isAuthenticated: true })
    ).toBe("authenticated");
  });
});
