const { test, expect } = require("@playwright/test");
const { addAbortListener } = require("events");
const { request } = require("http");

test("UI basic action", async ({ page }) => {
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

  // abort the image
  // await page.route("**/*.{jpg, png, jpeg}", (route) => route.abort());
  // await page.pause();

  // display all request and response from the page of website
  page.on("request", (request) => console.log(`~~~REQUEST:`, request.url()));
  page.on("response", (response) =>
    console.log(`~~~RESPONSE:`, response.url(), response.status())
  );

  // assert with product appears
  console.log("~~~ get 1st value: ", await cardTitle.first().textContent()); // using first function to get 1st value
  console.log("~~~ get 2nd value: ", await cardTitle.nth(1).textContent()); // using nth-indexing function to get 2nd value
  // this allTextContents() just only work before textContent()
  const allCardTitle = await cardTitle.allTextContents();
  console.log("~~~ all card title: ", allCardTitle);
});
