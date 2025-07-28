const { expect } = require("@playwright/test");

class OrderReviewPage {
  constructor(page) {
    this.page = page;
    this.emailShippingInfo = page.locator(".user__name [type='text']");
    this.paymentContainerTitle = page.locator(".payment__title");
    this.inputCountry_txtField = page.locator("[placeholder*='Country']");
    this.resultCountry_dropdown = page.locator(".ta-results");
    this.placeOrder_btn = page.locator(".actions .action__submit");
    this.thankYouOrder = page.locator(".hero-primary");
    this.orderIdGenerated = page.locator(".em-spacer-1 .ng-star-inserted");
  }

  async verifyEmail(email) {
    await expect(this.emailShippingInfo.first()).toHaveText(email); // assert the email
  }

  async searchCountryAndSelect(countrySpell, countryName) {
    await this.paymentContainerTitle.first().waitFor(); // assertion if the container card payment already loaded
    await this.inputCountry_txtField.pressSequentially(countrySpell, {
      delay: 1000,
    }); // be careful using the delay. fast delay sometime is not working
    const lengthOfCountry = await this.resultCountry_dropdown
      .locator("button")
      .count();
    for (let i = 0; i < lengthOfCountry; i++) {
      const selectedCountry = await this.resultCountry_dropdown // find the country each iteration
        .locator("button")
        .nth(i)
        .textContent();
      if (selectedCountry === countryName) {
        await this.resultCountry_dropdown.locator("button").nth(i).click(); // if country = Indonesia, then click it
        break;
      }
    }
  }

  async submitAndGetOrderId() {
    await this.placeOrder_btn.click();
    await expect(this.thankYouOrder).toHaveText(" Thankyou for the order. ");
    return await this.orderIdGenerated.textContent();
  }
}

module.exports = { OrderReviewPage };
