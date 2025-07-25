const { test, expect } = require("@playwright/test");

test("Test security testing, unatuhorized order not belong in account", async ({
  page,
}) => {
  // locator
  const email_txtField = page.locator("#userEmail");
  const password_txtField = page.locator("#userPassword");
  const login_btn = page.locator("#login");
  const order_menu = page.locator("button[routerlink*='myorders']");
  const view_btn = page.locator("button:has-text('View')");

  // login page
  await page.goto("https://rahulshettyacademy.com/client");
  await email_txtField.fill("andrazain.project@gmail.com");
  await password_txtField.fill("Asdf1234");
  await login_btn.click();
  await order_menu.click();
  // after clicking the menu
  // we can intercept the url before clicking one detail order
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", // refer the API, not url in the website
    (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
      })
  );
  await view_btn.first().click();
  await page.pause();
});
