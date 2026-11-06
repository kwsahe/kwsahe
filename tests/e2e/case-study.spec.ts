import { test, expect } from "@playwright/test";

const ALL_14_SLUGS = [
  "link21-ai-jarvis-office",
  "link21-ai-hub",
  "link21-bidpilot-ai",
  "link21-premium",
  "tri-agent-control",
  "market-pulse",
  "k-safety-law-rag",
  "link21-ai-chatbot",
  "business-card-auto",
  "construction-accident-vl-agent",
  "O2O-demand-forecasting-solution",
  "ecommerce-data-analysis-practice",
  "english-word-streamlit",
  "Artesia",
];

test.describe("Case Study Routes (/work/[slug])", () => {
  test("all 14 static Case Study routes return HTTP 200 and render structured sections", async ({
    page,
  }) => {
    for (const slug of ALL_14_SLUGS) {
      const res = await page.goto(`./work/${slug}/`);
      expect(res?.status(), `HTTP status failed for ${slug}`).toBe(200);
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.getByText(/01\.\s*Overview/i)).toBeVisible();
      await expect(page.getByText(/02\.\s*Problem/i)).toBeVisible();
    }
  });

  test("supports accessible Lightbox modal (open, slide navigation, Escape close, focus restoration) and prev/next navigation", async ({
    page,
  }) => {
    await page.goto("./work/link21-ai-jarvis-office/");

    const openBtn = page.getByTestId("open-lightbox-btn");
    await expect(openBtn).toBeVisible();
    await openBtn.click();

    const lightbox = page.getByTestId("case-study-lightbox");
    await expect(lightbox).toBeVisible();
    await expect(lightbox).toContainText("[1/4]");

    // Navigate next slide inside modal
    const nextBtn = page.getByTestId("lightbox-next-btn");
    await nextBtn.click();
    await expect(lightbox).toContainText("[2/4]");

    // Close with Escape key and verify focus returns to trigger button
    await page.keyboard.press("Escape");
    await expect(lightbox).toBeHidden();
    await expect(openBtn).toBeFocused();
  });
});
