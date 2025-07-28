// @ts-check
import { defineConfig, devices } from "@playwright/test";
import { trace } from "console";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: "./tests",
  reporter: "html",
  timeout: 40 * 1000, //global timeout 40sec every step
  expect: {
    timeout: 10000, //for assertion
  },
  projects: [
    {
      name: "chrome",
      use: {
        browserName: "chromium",
        headless: false,
        screenshot: "on",
        trace: "retain-on-failure",
      },
    },
    {
      name: "firefox",
      use: {
        browserName: "firefox",
        headless: true,
        screenshot: "on",
        trace: "retain-on-failure",
      },
    },
  ],
};

module.exports = config;
