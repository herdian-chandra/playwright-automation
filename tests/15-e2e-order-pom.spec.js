const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../page-objects/LoginPage");
const { DashboardPage } = require("../page-objects/DashboardPage");

test("E2E Order item in Rahul Shetty Academy Ecom", async ({ page }) => {
  // locator
  const cartList = page.locator("div li");
  const checkout_btn = page.locator("button[type='button']");
  const paymentContainerTitle = page.locator(".payment__title");
  const inputCountry_txtField = page.locator("[placeholder*='Country']");
  const resultCountry_dropdown = page.locator(".ta-results");
  const emailShippingInfo = page.locator(".user__name [type='text']");
  const myEmail = "andrazain.project@gmail.com";
  const placeOrder_btn = page.locator(".actions .action__submit");
  const thankYouOrder = page.locator(".hero-primary");
  const orderIdGenerated = page.locator(".em-spacer-1 .ng-star-inserted");
  const order_menu = page.locator("button[routerlink*='myorders']");
  const orderList = page.locator("tbody");
  const orderedProduct = page.locator("tbody tr");

  // init new object
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  // variable
  const email = "andrazain.project@gmail.com";
  const password = "Asdf1234";
  const productName = "IPHONE 13 PRO";

  // login page
  await loginPage.goTo(); // go to url
  await loginPage.validLogin(email, password);

  // product list page
  await dashboardPage.searchProductAndAddToCart(productName);
  await dashboardPage.navigateToCartMenu();

  // cart list page
  await cartList.first().waitFor();
  const isProductExist = await page
    .locator(`h3:has-text('${productName}')`)
    .isVisible();
  expect(isProductExist).toBeTruthy(); // assert the product is exist
  await checkout_btn.locator("text=Checkout").click();

  // order page
  // shipment information
  await expect(emailShippingInfo.first()).toHaveText(myEmail); // assert the email
  await paymentContainerTitle.first().waitFor(); // assertion if the container card payment already loaded
  await inputCountry_txtField.pressSequentially("ind", { delay: 1000 }); // be careful using the delay. fast delay sometime is not working
  const lengthOfCountry = await resultCountry_dropdown
    .locator("button")
    .count();
  for (let i = 0; i < lengthOfCountry; i++) {
    const selectedCountry = await resultCountry_dropdown // find the country each iteration
      .locator("button")
      .nth(i)
      .textContent();
    if (selectedCountry === " Indonesia") {
      await resultCountry_dropdown.locator("button").nth(i).click(); // if country = Indonesia, then click it
      break;
    }
  }
  await placeOrder_btn.click();

  // thanks page
  await expect(thankYouOrder).toHaveText(" Thankyou for the order. ");
  const myOrderId = await orderIdGenerated.textContent();
  console.log("~~~ My order ID: ", myOrderId);
  await order_menu.click();

  // order list page
  await orderList.waitFor();
  const lengthOrOrderedProduct = await orderedProduct.count();
  for (let i = 0; i < lengthOrOrderedProduct; i++) {
    const actualOrderId = await orderedProduct // get order id
      .nth(i)
      .locator("th")
      .textContent();
    if (myOrderId.includes(actualOrderId)) {
      await orderedProduct.nth(i).locator("button").first().click(); // click view button
      break;
    }
  }
  const orderDetaild = await page.locator(".col-text").textContent();
  expect(myOrderId.includes(orderDetaild)).toBeTruthy;
});
