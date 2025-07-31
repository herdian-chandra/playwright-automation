const playwright = require("@playwright/test");
const { POManager } = require("../../page-objects/POManager");
const { Before, After, AfterStep, Status } = require("@cucumber/cucumber");
const path = require("path");

Before(async function () {
  const browser = await playwright.chromium.launch({ headless: false });
  const context = await browser.newContext();
  this.page = await context.newPage(); // need world constructor

  // init new object
  this.poManager = new POManager(this.page);
});

AfterStep(async function ({ result }) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
    await this.page.screenshot({ path: "ss-failed-1.png" });
  }
});

After(function () {
  console.log(`i am the last execute`);
});
