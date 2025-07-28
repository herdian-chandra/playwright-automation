const { expect } = require("@playwright/test");

class CartPage {
  constructor(page) {
    this.page = page;
    this.cartList = page.locator("div li").first();
    this.checkout_btn = page.locator("text=Checkout");
    // this.productCardTitle = page.locator(".card-body b");
    // this.cart_menu = page.locator("[routerlink*='cart']");
    // this.order_menu = page.locator("button[routerlink*='myorders']");
  }

  async verifyProductIsDisplayed(productName) {
    await this.cartList.waitFor();
    const bool = await this.getProductLocator(productName).isVisible();
    expect(bool).toBeTruthy();
  }

  async checkoutTheProduct() {
    await this.checkout_btn.click();
  }

  // this method only return the locator purpose, and no need async
  getProductLocator(productName) {
    return this.page.locator(`h3:has-text('${productName}')`);
  }
}

module.exports = { CartPage };
