const { test, expect } = require("@playwright/test");

test("More usefull validation in playwright", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await page.goto("https://www.google.com/");
  await page.goBack(); // goForward

  // locator
  const elementHideAndShow = page.locator("#displayed-text");
  const hide_btn = page.locator("#hide-textbox");
  const confirm_btn = page.locator("#confirmbtn");
  const mouseHover_btn = page.locator("#mousehover");

  await expect(elementHideAndShow).toBeVisible();
  await hide_btn.click();
  await expect(elementHideAndShow).toBeHidden(); // assert the hidden element
  await confirm_btn.click();
  page.on("dialog", (dialog) => dialog.accept()); // handling javascript pop up
  await mouseHover_btn.hover();
  // iframe
  const iframePage = page.frameLocator("#courses-iframe");
  await iframePage.locator("li a[href='learning-path']:visible").click();
  await iframePage.locator("li a[href='lifetime-access']:visible").click();
  const getText = await iframePage.locator(".text h2").textContent();
  console.log("~~~ result: ", getText);
  const getNumber = getText.split(" ")[1];
  console.log("~~~ result of number: ", getNumber);
});
