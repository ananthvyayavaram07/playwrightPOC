import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testMatch: ["tests/**.ts"],
  timeout: 120000,
  reporter: "html",
  use: {
    headless: false,
    screenshot: "on",
    video: "on",
    // viewport:{width:1920,height:1080},
    viewport: null,
    launchOptions: {
      slowMo: 100,
      args: ["--start-maximized"],
    },
  },
  retries: 0,
  globalSetup: "support/utils/globalSetup.ts",
};

export default config;
