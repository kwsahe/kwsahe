import { test, expect } from "@playwright/test";

test.describe("Home Page & 3D Nexus Core", () => {
  test("loads Hero, 3D Nexus Core (6 flagship satellites), and navigates to Work & Lab with 0 console/page errors", async ({
    page,
  }) => {
    const pageErrors: string[] = [];
    const consoleErrors: string[] = [];
    page.on("pageerror", (err) => pageErrors.push(err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });

    await page.goto("./");

    // Hero headings & tagline
    await expect(page.locator("h1")).toContainText(/권상헌|Sangheon Kwon/);
    await expect(page.getByText(/From Architecture to Production/).first()).toBeVisible();

    // 3D Nexus Core container & 6 flagship satellite selector buttons
    const coreRegion = page.getByTestId("nexus-core-scene");
    await expect(coreRegion).toBeVisible();
    await expect(coreRegion.getByRole("button", { name: "JARVIS OFFICE" })).toBeVisible();
    await expect(coreRegion.getByRole("button", { name: "LINK21 AI HUB" })).toBeVisible();
    await expect(coreRegion.getByRole("button", { name: "BidPilot AI" })).toBeVisible();
    await expect(coreRegion.getByRole("button", { name: "tri-agent-control" })).toBeVisible();
    await expect(coreRegion.getByRole("button", { name: "Market Pulse" })).toBeVisible();
    await expect(coreRegion.getByRole("button", { name: "k-safety-law-rag" })).toBeVisible();

    // Selecting a satellite updates the HUD metric & Case Study deep-link
    await coreRegion.getByRole("button", { name: "BidPilot AI" }).click();
    await expect(coreRegion).toContainText("188/191 · 2,659 Tests");

    // Navigate to Projects Atlas
    const exploreWorkLink = page.locator('a[href="/kwsahe/work"], a[href="/kwsahe/work/"]').first();
    await exploreWorkLink.click();
    await expect(page).toHaveURL(/\/kwsahe\/work\/?$/);

    expect(pageErrors).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });
});
