const { test, expect } = require("@playwright/test");

test("Testing with screenshot page or section ", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  // locator
  const elementHideAndShow = page.locator("#displayed-text");
  const hide_btn = page.locator("#hide-textbox");

  await expect(elementHideAndShow).toBeVisible();
  await elementHideAndShow.screenshot({ path: "screenshot/ss1.png" });
  await hide_btn.click();
  await page.screenshot({ path: "screenshot/ss2-after-hide.png" });
  await expect(elementHideAndShow).toBeHidden(); // assert the hidden element
});

test("Visual Testing ", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  // expect(await page.screenshot()).toMatchSnapshot("login-page.png");
});
