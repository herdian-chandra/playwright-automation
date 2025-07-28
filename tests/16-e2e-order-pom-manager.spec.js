const { test, expect } = require("@playwright/test");
const { POManager } = require("../page-objects/POManager");

test("E2E Order item in Rahul Shetty Academy Ecom", async ({ page }) => {
  // init new object
  const poManager = new POManager(page);

  // variable
  const email = "andrazain.project@gmail.com";
  const password = "Asdf1234";
  const productName = "IPHONE 13 PRO";
  const countrySpell = "ind";
  const countryName = " Indonesia";

  // login page
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo(); // go to url
  await loginPage.validLogin(email, password);

  // dashboard and shown the product list page
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAndAddToCart(productName);
  await dashboardPage.navigateToCartMenu();

  // cart page
  const cartPage = poManager.getCartPage();
  await cartPage.verifyProductIsDisplayed(productName);
  await cartPage.checkoutTheProduct();

  // order review page
  const orderReviewPage = poManager.getOrderReviewPage();
  await orderReviewPage.verifyEmail(email);
  await orderReviewPage.searchCountryAndSelect(countrySpell, countryName);
  const orderId = await orderReviewPage.submitAndGetOrderId();
  console.log(`~~~ order id`, orderId);

  // order history and thanks page
  await dashboardPage.navigateToOrdersMenu();
  const orderHistoryPage = poManager.getOrderHistoryPage();
  await orderHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();
});
