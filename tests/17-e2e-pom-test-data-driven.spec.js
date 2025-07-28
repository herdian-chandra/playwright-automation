const { test, expect } = require("@playwright/test");
const { POManager } = require("../page-objects/POManager");
// json -> string -> js object
const testData = JSON.parse(
  JSON.stringify(require("../utils/orderTestData.json"))
);

for (const data of testData) {
  test(`E2E Order item in Rahul Shetty Academy Ecom for product ${data.productName}`, async ({
    page,
  }) => {
    // init new object
    const poManager = new POManager(page);

    // login page
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo(); // go to url
    await loginPage.validLogin(data.email, data.password);

    // dashboard and shown the product list page
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAndAddToCart(data.productName);
    await dashboardPage.navigateToCartMenu();

    // cart page
    const cartPage = poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(data.productName);
    await cartPage.checkoutTheProduct();

    // order review page
    const orderReviewPage = poManager.getOrderReviewPage();
    await orderReviewPage.verifyEmail(data.email);
    await orderReviewPage.searchCountryAndSelect("ind", " Indonesia");
    const orderId = await orderReviewPage.submitAndGetOrderId();
    console.log(`~~~ order id`, orderId);

    // order history and thanks page
    await dashboardPage.navigateToOrdersMenu();
    const orderHistoryPage = poManager.getOrderHistoryPage();
    await orderHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();
  });
}
