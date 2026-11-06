import { test, expect } from "@playwright/test";

test.describe("Architecture Lab (/lab) — Graph Traversal & 2D/3D Sync", () => {
  test("switches across all 6 systems, decouples Node Select from Packet Step, and syncs state across 3D and 2D SVG", async ({
    page,
  }) => {
    await page.goto("./lab/");

    const labScene = page.getByTestId("architecture-lab-scene");
    await expect(labScene).toBeVisible();

    // 1. Verify initial system (JARVIS OFFICE) & pause simulation for deterministic step testing
    const playPauseBtn = page.getByTestId("lab-play-pause-btn");
    await playPauseBtn.click(); // Pause

    // Initial simulation step is EDGE 1 / 6
    const stepIndicator = page.getByTestId("lab-sim-step-indicator");
    await expect(stepIndicator).toContainText("EDGE 1 / 6");

    // 2. Click node 5 (Publish Gate) to inspect it — verify Inspector updates WITHOUT changing EDGE 1 / 6
    const publishGateNodeBtn = page.getByTestId("lab-node-btn-jarvis-publish-gate");
    await publishGateNodeBtn.click();
    await expect(page.getByTestId("lab-inspector-title")).toContainText("Publish Gate");
    await expect(stepIndicator).toContainText("EDGE 1 / 6");

    // 3. Click Step button — advances simulation along directed graph to EDGE 2 / 6
    const stepBtn = page.getByTestId("lab-step-btn");
    await stepBtn.click();
    await expect(stepIndicator).toContainText("EDGE 2 / 6");

    // 4. Switch to 2D SVG mode and verify system, selected node, and simulation step remain synchronized
    const viewModeBtn = page.getByTestId("lab-viewmode-btn");
    await viewModeBtn.click();
    await expect(page.getByTestId("lab-2d-svg-view")).toBeVisible();
    await expect(stepIndicator).toContainText("EDGE 2 / 6");

    // 5. Reset button returns simulation to EDGE 1 / 6 and node 1
    await page.getByTestId("lab-reset-btn").click();
    await expect(stepIndicator).toContainText("EDGE 1 / 6");
    await expect(page.getByTestId("lab-inspector-title")).toContainText("Ask Jarvis");

    // 6. Verify switching across all 6 systems
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
