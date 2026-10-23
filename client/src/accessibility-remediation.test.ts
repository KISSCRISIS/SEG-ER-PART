import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectFile = (relativePath: string) => readFileSync(resolve(process.cwd(), relativePath), "utf8");

describe("approved WCAG remediation guardrails", () => {
  it("keeps browser zoom available", () => {
    expect(projectFile("client/index.html")).not.toContain("maximum-scale");
  });

  it("keeps the light Landing action AA-compliant and preserves valid landmarks", () => {
    const home = projectFile("client/src/pages/Home.tsx");
    const css = projectFile("client/src/index.css");

    expect(home).toContain('<section className="seg-landing-v4-critical" aria-label="Emergency response countdown">');
    expect(home).not.toContain('<aside className="seg-landing-v4-critical"');
    expect(css).toContain("html.light .seg-landing-v4-action { border-color: #0F766E; background: #0F766E; color: #FFFFFF;");
  });

  it("uses semantic region and group relationships for Login, Registration, and the Dashboard gate", () => {
    const login = projectFile("client/src/pages/LoginPage.tsx");
    const registration = projectFile("client/src/pages/RegisterPage.tsx");
    const dashboard = projectFile("client/src/components/DashboardLayout.tsx");

    expect(login).toContain('<nav aria-label="Display settings">');
    expect(login).not.toContain('className="seg-login-v2-language" aria-label=');
    expect(registration).toContain('<section className="seg-register-v2-benefits" aria-label="SEG learning benefits">');
    expect(registration).toContain('className="seg-register-v2-languages" role="group" aria-label="Language selection"');
    expect(dashboard).toContain('<main className="seg-app flex min-h-screen items-center justify-center p-5">');
    expect(dashboard).toContain('aria-labelledby="dashboard-sign-in-title"');
  });
});
