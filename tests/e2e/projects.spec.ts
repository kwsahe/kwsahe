import { test, expect } from "@playwright/test";

test.describe("Projects Atlas (/work)", () => {
  test("displays all 14 projects and supports search, category/tech filters, sorting, reset, and Case Study navigation", async ({
    page,
  }) => {
    await page.goto("./work/");

    // Verify all 14 projects are rendered
    await expect(page.getByText(/14\s*\/\s*(전체\s*)?14/)).toBeVisible();

    // Search filter
    const searchInput = page.locator('input[type="search"], input[type="text"]').first();
    await searchInput.fill("57,690");
    await expect(page.getByText("Market Pulse").first()).toBeVisible();
    await expect(page.getByText(/1\s*\/\s*(전체\s*)?14/)).toBeVisible();

    // Clear search
    await searchInput.fill("");
    await expect(page.getByText(/14\s*\/\s*(전체\s*)?14/)).toBeVisible();

    // Category filter
    await page.getByRole("button", { name: "Internal AI", exact: true }).click();
    await expect(page.getByText("LINK21 AI JARVIS OFFICE").first()).toBeVisible();
    await expect(page.getByText("LINK21 BidPilot AI").first()).toBeVisible();

    // Tech stack filter
    await page.getByRole("button", { name: "All", exact: true }).first().click();
    await page.getByRole("button", { name: "ChromaDB", exact: true }).click();
    await expect(page.getByText("k-safety-law-rag").first()).toBeVisible();

    // Sort selector
    const sortSelect = page.locator("select").first();
    await sortSelect.selectOption("name");

    // Reset button restores all 14 projects
    const resetBtn = page.getByTestId("reset-filters-btn");
    await resetBtn.click();
    await expect(page.getByText(/14\s*\/\s*(전체\s*)?14/)).toBeVisible();

    // Enter a Case Study
    const jarvisLink = page
      .locator('a[href*="/work/link21-ai-jarvis-office"]')
      .first();
    await jarvisLink.click();
    await expect(page).toHaveURL(/\/work\/link21-ai-jarvis-office\/?$/);
  });
});
