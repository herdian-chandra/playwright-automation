const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given(
  "user login to the web using {string} and {string}",
  { timeout: 100 * 1000 },
  async function (email, password) {
    // login page
    const loginPage = this.poManager.getLoginPage(); // need world constructor
    await loginPage.goTo(); // go to url
    await loginPage.validLogin(email, password);
  }
);

When("add {string} to the cart", async function (productName) {
  // dashboard and shown the product list page
  this.dashboardPage = this.poManager.getDashboardPage(); // need world constructor
  await this.dashboardPage.searchProductAndAddToCart(productName);
  await this.dashboardPage.navigateToCartMenu();
});

Then("verify {string} is diplayed in the cart", async function (productName) {
  // cart page
  const cartPage = this.poManager.getCartPage(); // need world constructor
  await cartPage.verifyProductIsDisplayed(productName);
  await cartPage.checkoutTheProduct();
});

When("user input valid detail and checkout the order", async function () {
  // order review page
  const orderReviewPage = this.poManager.getOrderReviewPage(); // need world constructor
  // await orderReviewPage.verifyEmail(email);
  await orderReviewPage.searchCountryAndSelect("ind", " Indonesia");
  this.orderId = await orderReviewPage.submitAndGetOrderId(); // need world constructor
  console.log(`~~~ order id`, this.orderId); // need world constructor
});

Then("verify order is present in order history", async function () {
  // order history and thanks page
  await this.dashboardPage.navigateToOrdersMenu(); // need world constructor
  const orderHistoryPage = this.poManager.getOrderHistoryPage(); // need world constructor
  await orderHistoryPage.searchOrderAndSelect(this.orderId); // need world constructor
  expect(
    this.orderId.includes(await orderHistoryPage.getOrderId()) // need world constructor
  ).toBeTruthy();
});
