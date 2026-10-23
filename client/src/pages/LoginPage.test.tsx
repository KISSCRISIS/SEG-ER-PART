import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "@/contexts/ThemeContext";
import LoginPage from "./LoginPage";

const { login, startLogin, toast } = vi.hoisted(() => ({
  login: vi.fn(),
  startLogin: vi.fn(),
  toast: { error: vi.fn(), info: vi.fn() },
}));

vi.mock("@/const", () => ({ startLogin }));
vi.mock("sonner", () => ({ toast }));
vi.mock("@/lib/trpc", () => ({
  trpc: { auth: { login: { useMutation: () => ({ mutateAsync: login, isPending: false }) } } },
}));

describe("Login final reference implementation interactions", () => {
  beforeEach(() => {
    startLogin.mockReset();
    login.mockReset();
    login.mockResolvedValue({ user: { id: 1 } });
    toast.info.mockReset();
    toast.error.mockReset();
    window.localStorage.clear();
    window.history.replaceState({}, "", "/login");
  });

  it("keeps the approved lockup, email-only login, password-recovery feedback, OAuth actions, and Register navigation available", async () => {
    const user = userEvent.setup();
    const view = render(<ThemeProvider defaultTheme="dark"><LoginPage /></ThemeProvider>);

    expect(screen.getByAltText(/SEG — Smart Emergency Guide/i)).not.toBeNull();
    expect(screen.getByRole("heading", { name: "Welcome Back" })).not.toBeNull();
    expect((screen.getByRole("checkbox", { name: "Remember me" }) as HTMLInputElement).checked).toBe(true);
    expect(screen.getByRole("link", { name: "Register" }).getAttribute("href")).toBe("/register");
    expect(screen.getByRole("button", { name: "Switch to light mode" })).not.toBeNull();

    await user.click(screen.getByRole("button", { name: "Forgot password?" }));
    expect(toast.info).toHaveBeenCalledWith("Password recovery will be available in the next authentication phase.");

    await user.type(screen.getByRole("textbox", { name: "Email Address" }), "clinician@example.test");
    await user.click(screen.getByRole("button", { name: "Login" }));
    expect(screen.queryByLabelText("Password")).toBeNull();
    expect(login).toHaveBeenCalledWith({ email: "clinician@example.test", remember: true });
    expect(window.location.pathname).toBe("/dashboard");
    expect(startLogin).not.toHaveBeenCalled();

    view.unmount();
    for (const provider of ["Google", "Microsoft", "Apple"]) {
      const providerView = render(<ThemeProvider defaultTheme="dark"><LoginPage /></ThemeProvider>);
      await user.click(screen.getByRole("button", { name: new RegExp(provider, "i") }));
      providerView.unmount();
    }

    expect(startLogin).toHaveBeenCalledTimes(3);
  });

  it("routes an unverified email account to the verification-code page", async () => {
    login.mockRejectedValue(new Error("Verify your email address before signing in."));
    const user = userEvent.setup();
    render(<ThemeProvider defaultTheme="dark"><LoginPage /></ThemeProvider>);

    await user.type(screen.getByRole("textbox", { name: "Email Address" }), "pilot@example.test");
    await user.click(screen.getByRole("button", { name: "Login" }));

    expect(window.location.pathname).toBe("/verify-email");
    expect(window.location.search).toBe("?email=pilot%40example.test");
    expect(toast.info).toHaveBeenCalledWith("Enter the verification code sent to your email.");
  });
});
