import { test, expect } from "@playwright/test";

test.describe("Primary Navigation, Resume PDF & SEO Assets", () => {
  test("navigates across Home, Work, Lab, About, Contact and verifies Resume PDF, robots.txt, and sitemap.xml", async ({
    page,
    request,
  }) => {
    await page.goto("./");

    const nav = page.locator("header nav").first();
    await nav.getByRole("link", { name: /프로젝트|Projects/ }).click();
    await expect(page).toHaveURL(/\/kwsahe\/work\/?$/);

    await nav.getByRole("link", { name: /아키텍처 랩|Architecture Lab/ }).click();
    await expect(page).toHaveURL(/\/kwsahe\/lab\/?$/);

    await nav.getByRole("link", { name: /소개|About/ }).click();
    await expect(page).toHaveURL(/\/kwsahe\/about\/?$/);
    await expect(page.getByText(/빅데이터분석기사|Big Data Analytics Engineer/)).toBeVisible();
    await expect(page.getByText(/AI-901/).first()).toBeVisible();

    await nav.getByRole("link", { name: /연락처|Contact/ }).click();
    await expect(page).toHaveURL(/\/kwsahe\/contact\/?$/);
    await expect(page.getByText("kwhoney223@gmail.com").first()).toBeVisible();

    // Verify Resume PDF link points to /kwsahe/assets/resume-kwon-sangheon.pdf and returns HTTP 200
    const resumeHref = await page
      .locator('a[href*="resume-kwon-sangheon.pdf"]')
      .first()
      .getAttribute("href");
    expect(resumeHref).toBe("/kwsahe/assets/resume-kwon-sangheon.pdf");

    const pdfRes = await request.get(
      "http://localhost:3000/kwsahe/assets/resume-kwon-sangheon.pdf"
    );
    expect(pdfRes.status()).toBe(200);
    expect(pdfRes.headers()["content-type"]).toContain("application/pdf");

    // Verify robots.txt and sitemap.xml
    const robotsRes = await request.get("http://localhost:3000/kwsahe/robots.txt");
    expect(robotsRes.status()).toBe(200);
    expect(await robotsRes.text()).toContain("Sitemap: https://kwsahe.github.io/kwsahe/sitemap.xml");

    const sitemapRes = await request.get("http://localhost:3000/kwsahe/sitemap.xml");
    expect(sitemapRes.status()).toBe(200);
    expect(await sitemapRes.text()).toContain("https://kwsahe.github.io/kwsahe/work/link21-ai-jarvis-office/");
  });
});
