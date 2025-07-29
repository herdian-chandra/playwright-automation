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
  // reporter: [["line"], ["allure-playwright"]],
  timeout: 40 * 1000, //global timeout 40sec, every step
  // timeout: 100 * 1000, //for debuging only
  retries: 2,
  workers: 3,
  expect: {
    timeout: 10000, //for assertion
  },
  use: {
    browserName: "chromium", //chrome
    // browserName: "firefox", //firefox
    // browserName: "webkit", //safari
    headless: false,
    screenshot: "on",
    trace: "retain-on-failure", // on, off
    // trace: "on", // on, off
  },
};

module.exports = config;
