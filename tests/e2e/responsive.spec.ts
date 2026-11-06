import { test, expect } from "@playwright/test";

const VIEWPORTS = [
  { width: 360, height: 800, label: "Mobile Small (360x800)" },
  { width: 390, height: 844, label: "Mobile Standard (390x844)" },
  { width: 768, height: 1024, label: "Tablet Portrait (768x1024)" },
  { width: 1024, height: 768, label: "Tablet Landscape (1024x768)" },
  { width: 1440, height: 900, label: "Desktop Standard (1440x900)" },
  { width: 1920, height: 1080, label: "Desktop Full HD (1920x1080)" },
];

test.describe("Responsive Layout Across 6 Viewports", () => {
  for (const vp of VIEWPORTS) {
    test(`renders Home, Work, and Lab without horizontal overflow at ${vp.label}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      for (const route of ["./", "./work/", "./lab/"]) {
        await page.goto(route);
        await expect(page.locator("h1").first()).toBeVisible();

        const hasOverflow = await page.evaluate(() => {
          return (
            document.documentElement.scrollWidth >
            document.documentElement.clientWidth
          );
        });
        expect(
          hasOverflow,
          `Horizontal overflow detected on ${route} at ${vp.width}x${vp.height}`
        ).toBe(false);
      }
    });
  }
});
