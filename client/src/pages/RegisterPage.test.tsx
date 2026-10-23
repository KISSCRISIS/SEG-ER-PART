import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "@/contexts/ThemeContext";
import RegisterPage from "./RegisterPage";

const { register, toast } = vi.hoisted(() => ({
  register: vi.fn(),
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

vi.mock("sonner", () => ({ toast }));
vi.mock("@/lib/trpc", () => ({
  trpc: { auth: { register: { useMutation: () => ({ mutateAsync: register, isPending: false }) } } },
}));

describe("Registration reference implementation interactions", () => {
  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, "hasPointerCapture", { configurable: true, value: () => false });
    Object.defineProperty(HTMLElement.prototype, "setPointerCapture", { configurable: true, value: () => undefined });
    Object.defineProperty(HTMLElement.prototype, "releasePointerCapture", { configurable: true, value: () => undefined });
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", { configurable: true, value: () => undefined });
    toast.error.mockReset();
    toast.success.mockReset();
    register.mockReset();
    register.mockResolvedValue({ email: "samir@example.test", verificationRequired: true });
    window.localStorage.clear();
    window.history.replaceState({}, "", "/register");
  });

  it("validates missing required fields, toggles password visibility, updates role selection, submits complete details, and opens sign in", async () => {
    const user = userEvent.setup();
    render(<ThemeProvider defaultTheme="dark"><RegisterPage /></ThemeProvider>);

    const themeToggle = screen.getByRole("button", { name: "Switch to light mode" });
    await user.click(themeToggle);
    expect(document.documentElement.dataset.segTheme).toBe("light");

    await user.click(screen.getByRole("button", { name: /create account/i }));
    expect(toast.error).toHaveBeenCalledWith("Please complete the required registration details.");

    const password = screen.getByPlaceholderText("Password") as HTMLInputElement;
    const confirmPassword = screen.getByPlaceholderText("Confirm Password") as HTMLInputElement;
    expect(password.type).toBe("password");
    await user.click(screen.getByRole("button", { name: "Show password" }));
    expect(password.type).toBe("text");

    const professionalRole = screen.getByRole("combobox", { name: "Professional role" }) as HTMLSelectElement;
    fireEvent.change(professionalRole, { target: { value: "Critical care" } });
    expect(professionalRole.value).toBe("Critical care");

    const country = screen.getByRole("combobox", { name: "Country" });
    expect(country.textContent).toContain("Jordan");
    await user.click(country);
    expect(screen.getByRole("option", { name: "Saudi Arabia" })).toBeTruthy();
    await user.click(screen.getByRole("option", { name: "Saudi Arabia" }));
    expect(country.textContent).toContain("Saudi Arabia");

    const graduationYear = screen.getByRole("combobox", { name: "Graduation year" });
    expect(graduationYear.textContent).toContain("2015");
    await user.click(graduationYear);
    expect(screen.getByRole("option", { name: "2015" })).toBeTruthy();
    await user.click(screen.getByRole("option", { name: "2015" }));
    expect(graduationYear.textContent).toContain("2015");

    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "Dr Samir Al-Haddad" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email Address"), {
      target: { value: "samir@example.test" },
    });
    fireEvent.change(password, { target: { value: "SEG-Clinical2026!" } });
    fireEvent.change(confirmPassword, {
      target: { value: "SEG-Clinical2026!" },
    });
    await user.click(screen.getByRole("checkbox", { name: /I agree/i }));
    await user.click(screen.getByRole("button", { name: /create account/i }));
    expect(register).toHaveBeenCalledWith(expect.objectContaining({
      email: "samir@example.test",
      password: "SEG-Clinical2026!",
      professionalTrack: "Critical care",
      acceptedTerms: true,
    }));
    expect(toast.success).toHaveBeenCalledWith("Verification code sent. Check your email.");
    expect(window.location.pathname).toBe("/verify-email");

    await user.click(screen.getByRole("button", { name: "Sign in" }));
    expect(window.location.pathname).toBe("/login");
  });
});
