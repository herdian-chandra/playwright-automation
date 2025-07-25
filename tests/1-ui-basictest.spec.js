const { test, expect } = require("@playwright/test");
const { beforeEach } = require("node:test");

/**
 * this is how we write basic test in playwright
 */
// browser and page is a fixture feature from playwright

test("Browser context testcase in playwright", async ({ browser }) => {
  beforeEach("", () => {});

  //initial browser
  const context = await browser.newContext(); //new context = new instance = fresh browser
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  //locator
  const username_txtField = page.locator("#username");
  const password_txtField = page.locator("[id='password']");
  const signIn_Btn = page.locator("#signInBtn");
  const cardTitle = page.locator(".card-body a");

  console.log("~~~ the title: ", await page.title());
  /**
   * login
   */
  //using css selector method
  await username_txtField.fill("rahulshetty");
  await password_txtField.fill("learning");
  await signIn_Btn.click();
  // await page.locator("#username").fill("rahulshetty");
  // await page.locator("[id='password']").fill("learning");
  // await page.locator("#signInBtn").click();
  console.log(
    "~~~ the error msg: ",
    await page.locator("[style*='block']").textContent()
  );
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");
  // re-login using valid credentials
  await username_txtField.fill("");
  await username_txtField.fill("rahulshettyacademy");
  await password_txtField.fill("learning");
  await signIn_Btn.click();
  // assert with product appears
  console.log("~~~ get 1st value: ", await cardTitle.first().textContent()); // using first function to get 1st value
  console.log("~~~ get 2nd value: ", await cardTitle.nth(1).textContent()); // using nth-indexing function to get 2nd value
  // this allTextContents() just only work before textContent()
  const allCardTitle = await cardTitle.allTextContents();
  console.log("~~~ all card title: ", allCardTitle);
});

test("UI basic action", async ({ page }) => {
  //goto url
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  //locator
  const username_txtField = page.locator("#username");
  const password_txtField = page.locator("[id='password']");
  const user_RadioBtn = page.locator(".radiotextsty");
  const okay_Btn = page.locator("#okayBtn");
  const dropdown = page.locator("select.form-control");
  const tnc_checkbox = page.locator("#terms");
  const signIn_Btn = page.locator("#signInBtn");
  const web_hyperLink = page.locator("[href*='documents-request']");
  const cardTitle = page.locator(".card-body a");

  await username_txtField.fill("rahulshettyacademy");
  await password_txtField.fill("learning");
  await user_RadioBtn.last().click();
  await expect(await user_RadioBtn.last()).toBeChecked(); //assertions
  await okay_Btn.click();
  await dropdown.selectOption("consult");
  await tnc_checkbox.click();
  await expect(tnc_checkbox).toBeChecked();
  await tnc_checkbox.uncheck();
  expect(await tnc_checkbox.isChecked()).toBeFalsy(); //assert get the current boolean and ensure it
  await expect(web_hyperLink).toHaveAttribute("class", "blinkingText");
  await signIn_Btn.click();
});

test("Handling child windows & tab", async ({ browser }) => {
  // create new context
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  // locator in page instance
  const web_hyperLink = page.locator("[href*='documents-request']");
  const username_txtField = page.locator("#username");

  // create new context for new tab
  const [newTab] = await Promise.all([
    context.waitForEvent("page"),
    web_hyperLink.click(),
  ]);
  const paragraph = await newTab.locator("[class='im-para red']").textContent();
  console.log("~~~ the paragraph: ", paragraph);
  // extract email from paragraph
  const firstSplit = paragraph.split("@");
  console.log("~~~ 1st split: ", firstSplit);
  const email = firstSplit[1].split(" ")[0];
  console.log("~~~ email: ", email);

  await username_txtField.fill(email);
});
