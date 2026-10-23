import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const viewports = [
  { name: "mobile-320", width: 320, height: 800 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1440", width: 1440, height: 1000 },
] as const;

for (const viewport of viewports) {
  test.describe(viewport.name, () => {
    test.use({ viewport });
    for (const route of ["/", "/login", "/register"] as const) {
      test(`${route} renders without horizontal overflow`, async ({ page }) => {
        await page.goto(route);
        await expect(page.locator("body")).toBeVisible();
        await expect(page).toHaveTitle(/SEG|JEM Nexus/i);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow, `horizontal overflow at ${viewport.width}px`).toBeLessThanOrEqual(1);
      });
    }
  });
}

test("public authentication surfaces have no serious axe violations", async ({ page }) => {
  for (const route of ["/login", "/register"] as const) {
    await page.goto(route);
    await expect(page).toHaveTitle(/SEG|JEM Nexus/i);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    const blocking = results.violations.filter(violation => ["serious", "critical"].includes(violation.impact ?? ""));
    expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
  }
});

test("authenticated Practice session builder lists banks and expands chapters", async ({ page }) => {
  await page.goto("/local-login");
  await page.getByLabel("البريد الإلكتروني").fill("playwright@seg.local");
  await Promise.all([
    page.waitForURL(/\/dashboard$/),
    page.getByRole("button", { name: "الدخول إلى مساحتي" }).click(),
  ]);
  await page.goto("/practice/create");
  await expect(page.getByRole("heading", { name: "Create New Study Session" })).toBeVisible();
  await expect(page.getByText("ROSH Review EM Initial Certification 2026", { exact: true })).toBeVisible();
  const roshToggle = page.getByRole("button", { name: /ROSH Review EM Initial Certification 2026/ });
  await roshToggle.click();
  await expect(roshToggle).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByText("Cardiovascular Disorders", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "START STUDY SESSION" })).toBeEnabled();
});
