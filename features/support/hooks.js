const playwright = require("@playwright/test");
const { POManager } = require("../../page-objects/POManager");
const { Before, After } = require("@cucumber/cucumber");

Before(async function () {
  const browser = await playwright.chromium.launch({ headless: false });
  const context = await browser.newContext();
  this.page = await context.newPage(); // need world constructor

  // init new object
  this.poManager = new POManager(this.page);
});

After(function () {
  console.log(`i am the last execute`);
});
