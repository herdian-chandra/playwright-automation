const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("../utils/APIUtils");

// global variable
let responseCreateOrder;

// payload
const loginPayload = {
  userEmail: "andrazain.project@gmail.com",
  userPassword: "Asdf1234",
};
const createOrderPayload = {
  orders: [
    { country: "Indonesia", productOrderedId: "67a8df56c0d3e6622a297ccd" },
  ],
};
const emptyStateOrderPayload = {
  data: [],
  message: "No orders",
};

test.beforeAll("Send request to API Login", async ({}) => {
  // init new context
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  responseCreateOrder = await apiUtils.createOrder(createOrderPayload);
});

test("Create order using API test", async ({ page }) => {
  /**
   * Local Storage - set token into website
   */
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, responseCreateOrder.token);

  /**
   * Intercept the network
   * change response in my order page to empty state
   */
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      const response = await page.request.fetch(route.request()); // send request to the route and store the response into res var
      let body = JSON.stringify(emptyStateOrderPayload);
      route.fulfill({
        response,
        body, // fulfill with new empty state payload
      });
    }
  );

  // locator
  const order_menu = page.locator("button[routerlink*='myorders']");

  // the step of case
  await page.goto("https://rahulshettyacademy.com/client/");
  await order_menu.click();
  await page.waitForResponse(
    // this code line is important
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"
  );
  console.log(await page.locator(".mt-4").textContent());
});
