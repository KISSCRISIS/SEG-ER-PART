// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useAuth } from "@/_core/hooks/useAuth";
import ProtectedRoute from "./ProtectedRoute";

vi.mock("@/_core/hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

const mockedUseAuth = vi.mocked(useAuth);

function authState(overrides: Partial<ReturnType<typeof useAuth>> = {}) {
  return {
    loading: false,
    user: null,
    isAuthenticated: false,
    error: null,
    refresh: vi.fn(),
    logout: vi.fn(),
    ...overrides,
  } as ReturnType<typeof useAuth>;
}

describe("ProtectedRoute", () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows a loading status while auth is being resolved", () => {
    mockedUseAuth.mockReturnValue(authState({ loading: true }));

    render(
      <ProtectedRoute>
        <div>Protected content</div>
      </ProtectedRoute>
    );

    expect(screen.getByRole("status").textContent).toContain(
      "Preparing your secure workspace"
    );
    expect(screen.queryByText("Protected content")).toBeNull();
    expect(mockedUseAuth).toHaveBeenCalledWith({
      redirectOnUnauthenticated: true,
    });
  });

  it("does not render protected content while redirecting an unauthenticated user", () => {
    mockedUseAuth.mockReturnValue(authState());

    render(
      <ProtectedRoute>
        <div>Protected content</div>
      </ProtectedRoute>
    );

    expect(screen.getByRole("status").textContent).toContain(
      "Redirecting to sign in"
    );
    expect(screen.queryByText("Protected content")).toBeNull();
  });

  it("renders protected content for an authenticated user", () => {
    mockedUseAuth.mockReturnValue(
      authState({
        user: { id: 1 } as ReturnType<typeof useAuth>["user"],
        isAuthenticated: true,
      })
    );

    render(
      <ProtectedRoute>
        <div>Protected content</div>
      </ProtectedRoute>
    );

    expect(screen.getByText("Protected content")).not.toBeNull();
    expect(screen.queryByRole("status")).toBeNull();
  });
});
