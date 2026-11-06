import { test, expect } from "@playwright/test";

test.describe("Architecture Lab (/lab) — Contiguous Graph Traversal & 2D/3D Sync", () => {
  test("switches across all 6 systems, verifies contiguous Remediation (7 steps) and Primary (5 steps) paths, decouples Node Select from Packet Step, and syncs 3D/2D", async ({
    page,
  }) => {
    await page.goto("./lab/");

    const labScene = page.getByTestId("architecture-lab-scene");
    await expect(labScene).toBeVisible();

    // 1. Verify initial system (JARVIS OFFICE) & pause simulation for deterministic step testing
    const playPauseBtn = page.getByTestId("lab-play-pause-btn");
    await playPauseBtn.click(); // Pause

    // Initial simulation step on default Remediation Loop Path is EDGE 1 / 7
    const stepIndicator = page.getByTestId("lab-sim-step-indicator");
    await expect(stepIndicator).toContainText("EDGE 1 / 7");

    // 2. Click node 5 (Publish Gate) to inspect it — verify Inspector updates WITHOUT changing EDGE 1 / 7
    const publishGateNodeBtn = page.getByTestId("lab-node-btn-jarvis-publish-gate");
    await publishGateNodeBtn.click();
    await expect(page.getByTestId("lab-inspector-title")).toContainText("Publish Gate");
    await expect(stepIndicator).toContainText("EDGE 1 / 7");

    // 3. Click Step button — advances simulation along contiguous directed graph to EDGE 2 / 7
    const stepBtn = page.getByTestId("lab-step-btn");
    await stepBtn.click();
    await expect(stepIndicator).toContainText("EDGE 2 / 7");

    // 4. Switch to Primary Happy Path (5 steps) and verify step resets to EDGE 1 / 5
    const primaryPathBtn = page.getByTestId("lab-path-btn-primary");
    await primaryPathBtn.click();
    await expect(stepIndicator).toContainText("EDGE 1 / 5");

    // Switch back to Remediation Loop Path (7 steps)
    await page.getByTestId("lab-path-btn-remediation").click();
    await expect(stepIndicator).toContainText("EDGE 1 / 7");

    // 5. Switch view mode (3D <-> 2D SVG) and verify state remains synchronized
    const viewModeBtn = page.getByTestId("lab-viewmode-btn");
    const svgView = page.getByTestId("lab-2d-svg-view");
    const was2dInitially = await svgView.isVisible();
    await viewModeBtn.click();
    if (!was2dInitially) {
      await expect(svgView).toBeVisible();
    }
    await expect(stepIndicator).toContainText("EDGE 1 / 7");

    // 6. Reset button returns simulation to EDGE 1 / 7 and node 1 (Ask Jarvis)
    await page.getByTestId("lab-reset-btn").click();
    await expect(stepIndicator).toContainText("EDGE 1 / 7");
    await expect(page.getByTestId("lab-inspector-title")).toContainText("Ask Jarvis");

    // 7. Verify switching across all 6 systems
    const systemNames = [
      "LINK21 BidPilot AI",
      "tri-agent-control",
      "Market Pulse",
      "k-safety-law-rag",
      "LINK21 AI Chatbot (링키)",
      "LINK21 AI JARVIS OFFICE",
    ];
    for (const name of systemNames) {
      await labScene.getByRole("tab", { name }).click();
      await expect(labScene.getByRole("tab", { name })).toHaveAttribute(
        "aria-selected",
        "true"
      );
    }
  });
});
