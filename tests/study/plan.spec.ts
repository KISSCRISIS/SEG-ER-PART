import { test, expect } from "@playwright/test";
test("saved settings and daily completion survive reload", async ({ page }) => {
  await page.goto("/local-login");
  await page.locator('input[name="email"]').fill("study-ui@example.test");
  await page.locator('button[type="submit"]').click();
  await page.waitForURL("**/dashboard");
  await page.goto("/pathway");
  await page.getByLabel("Daily hours", { exact: true }).fill("1.5");
  await page.getByRole("button", { name: "Save plan", exact: true }).click();
  await expect(page.getByText("Plan saved.", { exact: true })).toBeVisible();
  const task = page.getByRole("checkbox", { name: /^Complete / }).first();
  await expect(task).toBeEnabled();
  await task.click();
  await expect(task).toBeChecked();
  await page.reload();
  await expect(page.getByLabel("Daily hours", { exact: true })).toHaveValue("1.5");
  await expect(page.getByRole("checkbox", { name: /^Complete / }).first()).toBeChecked();
});
