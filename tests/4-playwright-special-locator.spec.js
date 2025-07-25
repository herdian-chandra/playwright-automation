const { test, expect } = require("@playwright/test");

test("Using Playwright special locator", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel("Check me out if you Love IceCreams!").click();
  await page.getByLabel("Employed").click();
  await page.getByLabel("Gender").selectOption("Female");
  await page.getByPlaceholder("Password").fill("Asdf1234");
  await page.getByRole("button", { name: "Submit" }).click();
  await page
    .getByText("Success! The Form has been submitted successfully!.")
    .isVisible();
  await page.getByRole("link", { name: "Shop" }).click();
  await page
    .locator("app-card")
    .filter({ hasText: "Nokia Edge" })
    .getByRole("button")
    .click();
});

test("E2E Order item in Rahul Shetty Academy Ecom", async ({ page }) => {
  // login
  await page.goto("https://rahulshettyacademy.com/client");
  await page
    .getByPlaceholder("email@example.com")
    .fill("andrazain.project@gmail.com");
  await page.getByPlaceholder("enter your passsword").fill("Asdf1234");
  await page.getByRole("button", { name: "Login" }).click();

  // product list page
  await page.locator(".card-body b").first().waitFor(); // asserti + waiting full loaded
  await page
    .locator(".card-body")
    .filter({ hasText: "IPHONE 13 PRO" })
    .getByRole("button", { name: "Add To Cart" })
    .click();
  await page
    .getByRole("listitem")
    .getByRole("button", { name: "Cart" })
    .click();

  // cart list page
  await page.locator("div.infoWrap").waitFor();
  expect(page.locator("div.infoWrap").getByText("IPHONE 13 PRO")).toBeVisible();
  await page.getByRole("button", { name: "Checkout" }).click();

  // order page
  await page
    .getByPlaceholder("Select Country")
    .pressSequentially("ind", { delay: 1000 });
  await page.getByRole("button", { name: "Indonesia" }).click();
  await page.getByText("PLACE ORDER").click();

  // thank you page
  await expect(page.getByText("Thankyou for the order.")).toBeVisible();
});
