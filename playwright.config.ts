import { defineConfig, devices } from "@playwright/test";
import fs from "fs";

const localChromeWin =
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const useLocalChrome =
  !process.env.CI &&
  process.platform === "win32" &&
  fs.existsSync(localChromeWin);

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 2,
  reporter: [["list"]],
  timeout: 30000,
  use: {
    baseURL: "http://localhost:3000/kwsahe/",
    trace: "on-first-retry",
    launchOptions: {
      ...(useLocalChrome ? { executablePath: localChromeWin } : {}),
      args: [
        "--use-gl=angle",
        "--use-angle=swiftshader",
        "--enable-webgl",
        "--ignore-gpu-blocklist",
      ],
    },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000/kwsahe/",
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
});
