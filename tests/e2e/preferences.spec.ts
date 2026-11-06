import { test, expect } from "@playwright/test";

test.describe("User Preferences (KO/EN, Dark/Light Theme, Reduced Motion)", () => {
  test("toggles KO/EN language, Dark/Light theme, and Reduced Motion, persisting across page reloads", async ({
    page,
  }) => {
    await page.goto("./");

    // 1. Switch Language from KO to EN
    const enBtn = page.locator("header button", { hasText: "EN" }).first();
    await enBtn.click();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByText(/Explore Projects \(14\)/)).toBeVisible();

    // 2. Switch Theme from Dark to Light
    const themeBtn = page
      .locator('header button[aria-label*="light mode"], header button[aria-label*="라이트 모드"]')
      .first();
    await themeBtn.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

    // 3. Toggle Reduced Motion
    const motionBtn = page
      .locator('header button[title*="motion"], header button[title*="모션"]')
      .first();
    await motionBtn.click();
    await expect(motionBtn).toHaveAttribute("aria-pressed", "true");

    // 4. Reload page and verify persistence from localStorage
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await expect(motionBtn).toHaveAttribute("aria-pressed", "true");
  });
});
