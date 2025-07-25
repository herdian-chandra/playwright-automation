const { test, expect, request } = require("@playwright/test");

// global variable
let token;
let orderId;

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
  const apiContext = await request.newContext();
  /**
   * API - Login
   */
  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: loginPayload,
    }
  );
  expect(loginResponse.ok()).toBeTruthy();
  const loginResponseJson = await loginResponse.json(); // conver response into json fomrat
  token = loginResponseJson.token; // extract/get the token from response
  console.log(`~~~token:`, token);

  /**
   * API - Create Order
   */
  const createOrderResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      data: createOrderPayload,
    }
  );
  const createOrderResponseJson = await createOrderResponse.json();
  console.log(`~~~create order response:`, createOrderResponseJson);
  orderId = createOrderResponseJson.orders[0]; // get orderId
  console.log(`~~~orderId:`, orderId);
});

test("Login into website using API test", async ({ page }) => {
  /**
   * Local Storage - set token into website
   */
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  // locator
  const cardTitle = page.locator(".card-body b");

  await page.goto("https://rahulshettyacademy.com/client");
  await cardTitle.first().waitFor(); // ensure the card title successfully loaded into DOM
  const allCardProductTitle = await cardTitle.allTextContents(); // get all product title, and return the array
  console.log(`~~~all the product card title:`, allCardProductTitle);
});

test("Create order using API test", async ({ page }) => {
  /**
   * Local Storage - set token into website
   */
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  // locator
  const order_menu = page.locator("button[routerlink*='myorders']");
  const orderList = page.locator("tbody");
  const orderedProduct = page.locator("tbody tr");

  // the step of case
  await page.goto("https://rahulshettyacademy.com/client/");
  console.log("~~~ My order ID: ", orderId);
  await order_menu.click();

  // order list page
  await orderList.waitFor();
  const lengthOrOrderedProduct = await orderedProduct.count();
  for (let i = 0; i < lengthOrOrderedProduct; i++) {
    const actualOrderId = await orderedProduct // get order id
      .nth(i)
      .locator("th")
      .textContent();
    if (orderId.includes(actualOrderId)) {
      await orderedProduct.nth(i).locator("button").first().click(); // click view button
      break;
    }
  }
  const orderDetaild = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderDetaild)).toBeTruthy;
});
