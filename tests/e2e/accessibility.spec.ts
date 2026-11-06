import { test, expect } from "@playwright/test";

test.describe("WCAG 2.2 AA Accessibility & Asset Integrity", () => {
  test("verifies semantic landmarks, skip-to-content keyboard link, accessible button names, and zero broken images", async ({
    page,
  }) => {
    await page.goto("./");

    // 1. Semantic landmarks
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("main#main")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();

    // 2. Skip-to-content link receives first keyboard Tab focus
    await page.keyboard.press("Tab");
    const skipLink = page.locator("a.skip-link");
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toHaveAttribute("href", "#main");

    // 3. Every visible button has an accessible name (text or aria-label)
    const unnamedButtons = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll("button"));
      return buttons
        .filter((btn) => {
          const text = (btn.textContent || "").trim();
          const ariaLabel = (btn.getAttribute("aria-label") || "").trim();
          const title = (btn.getAttribute("title") || "").trim();
          return text.length === 0 && ariaLabel.length === 0 && title.length === 0;
        })
        .map((btn) => btn.outerHTML);
    });
    expect(unnamedButtons).toEqual([]);

    // 4. Verify zero broken images on Work page
    await page.goto("./work/");
    await page.waitForTimeout(500);
    const brokenImages = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll("img"));
      return imgs
        .filter((img) => img.complete && img.naturalWidth === 0)
        .map((img) => img.src);
    });
    expect(brokenImages).toEqual([]);
  });
});
