const { test, expext, expect } = require("@playwright/test");

test("Handle Calendar in Rahul Shetty Academy Selenium Practise", async ({
  page,
}) => {
  // variable
  const month = "10";
  const date = "15";
  const year = "2027";
  const expectedChosenDate = [month, date, year];

  // locator
  const calendarPicker = page.locator(".react-date-picker__wrapper");
  const labelMonthYearDatePicker = page.locator(
    ".react-calendar__navigation__label__labelText"
  );
  const monthPicker = page.locator(".react-calendar__year-view__months__month");
  const chosenDate = page.locator(".react-date-picker__inputGroup input");

  // pick date
  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  await calendarPicker.click();
  await labelMonthYearDatePicker.click(); // display month
  await labelMonthYearDatePicker.click(); // display year
  await page.getByText(year).click();
  await monthPicker.nth(Number(month) - 1).click();
  await page.locator(`//abbr[text()='${date}']`).click();
  const dateInput = page.locator(".react-date-picker__inputGroup input");
  for (let index = 0; index < dateInput.length; index++) {
    const getValue = dateInput[index].getAttribute("value");
    await expect(getValue).toEqual(expectedChosenDate[index]);
  }
});
