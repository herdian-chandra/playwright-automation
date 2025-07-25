const { test, expect } = require("@playwright/test");

test("As a user, i can get all of product title in Rahul Shetty Academy Ecomm", async ({
  page,
}) => {
  //locator
  const email_TxtField = page.locator("#userEmail");
  const password_TxtField = page.locator("#userPassword");
  const login_Btn = page.locator("#login");
  const cardTitle = page.locator(".card-body b");

  //flow
  page.goto("https://rahulshettyacademy.com/client");
  await email_TxtField.fill("anshika@gmail.com");
  await password_TxtField.fill("Iamking@000");
  await login_Btn.click();
  await cardTitle.first().waitFor(); // wait for first cardTitle appear in the DOM
  const allTitles = await cardTitle.allTextContents(); // must be using waitFor before using this function
  console.log("~~~ all titles: ", allTitles);
});
