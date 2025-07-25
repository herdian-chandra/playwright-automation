const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("../tests/utils/APIUtils");

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

test.beforeAll("Send request to API Login", async ({}) => {
  // init new context
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  responseCreateOrder = await apiUtils.createOrder(createOrderPayload);
});

test("Login into website using API test", async ({ page }) => {
  /**
   * Local Storage - set token into website
   */
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, responseCreateOrder.token);

  // locator
  const cardTitle = page.locator(".card-body b");

  await page.goto("https://rahulshettyacademy.com/client");
  await cardTitle.first().waitFor(); // ensure the card title successfully loaded into DOM
  const allCardProductTitle = await cardTitle.allTextContents(); // get all product title, and return the array
  console.log(`~~~all the product card title:`, allCardProductTitle);
});

test.only("Create order using API test", async ({ page }) => {
  /**
   * Local Storage - set token into website
   */
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, responseCreateOrder.token);

  // locator
  const order_menu = page.locator("button[routerlink*='myorders']");
  const orderList = page.locator("tbody");
  const orderedProduct = page.locator("tbody tr");

  // the step of case
  await page.goto("https://rahulshettyacademy.com/client/");
  console.log("~~~ My order ID: ", responseCreateOrder.orderId);
  await order_menu.click();

  // order list page
  await orderList.waitFor();
  const lengthOrOrderedProduct = await orderedProduct.count();
  for (let i = 0; i < lengthOrOrderedProduct; i++) {
    const actualOrderId = await orderedProduct // get order id
      .nth(i)
      .locator("th")
      .textContent();
    if (responseCreateOrder.orderId.includes(actualOrderId)) {
      await orderedProduct.nth(i).locator("button").first().click(); // click view button
      break;
    }
  }
  const orderDetaild = await page.locator(".col-text").textContent();
  await page.pause();
  expect(responseCreateOrder.orderId.includes(orderDetaild)).toBeTruthy;
});
