const { test, expect } = require("@playwright/test");

test("E2E Order item in Rahul Shetty Academy Ecom", async ({ page }) => {
  // locator
  const email_txtField = page.locator("#userEmail");
  const password_txtField = page.locator("#userPassword");
  const login_btn = page.locator("#login");
  const productCard = page.locator(".card-body");
  const productCardTitle = page.locator(".card-body b");
  const productName = "IPHONE 13 PRO";
  const cart_menu = page.locator("[routerlink*='cart']");
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

  // login page
  await page.goto("https://rahulshettyacademy.com/client");
  await email_txtField.fill("andrazain.project@gmail.com");
  await password_txtField.fill("Asdf1234");
  await login_btn.click();

  // product list page
  await expect(page).toHaveTitle("Let's Shop"); // assertions
  await productCardTitle.first().waitFor(); // wait for the list prouduct from API appears
  const allProductTitle = await productCardTitle.allTextContents();
  console.log("~~~ all product title: ", allProductTitle); // ensure product title

  const lengthOfProduct = await productCard.count(); // counting total length of product
  for (let i = 0; i < lengthOfProduct; i++) {
    if ((await productCard.nth(i).locator("b").textContent()) === productName) {
      // if product title = ADIDAS ORIGINAL
      await productCard.nth(i).locator("text=  Add To Cart").click(); // click add to cart
      break;
    }
  }
  await cart_menu.click();

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
