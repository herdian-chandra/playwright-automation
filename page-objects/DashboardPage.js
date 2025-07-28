class DashboardPage {
  constructor(page) {
    this.productCard = page.locator(".card-body");
    this.productCardTitle = page.locator(".card-body b");
    this.cart_menu = page.locator("[routerlink*='cart']");
    this.order_menu = page.locator("button[routerlink*='myorders']");
  }

  async searchProductAndAddToCart(productName) {
    await this.productCardTitle.first().waitFor(); // wait for the list prouduct from API appears
    const allProductTitle = await await this.productCardTitle.allTextContents();
    console.log("~~~ all product title: ", allProductTitle); // ensure product title
    const lengthOfProduct = await this.productCard.count(); // counting total length of product
    for (let i = 0; i < lengthOfProduct; i++) {
      if (
        (await this.productCard.nth(i).locator("b").textContent()) ===
        productName
      ) {
        await this.productCard.nth(i).locator("text=  Add To Cart").click(); // click add to cart
        break;
      }
    }
  }

  async navigateToCartMenu() {
    await this.cart_menu.click();
  }

  async navigateToOrdersMenu() {
    await this.order_menu.click();
  }
}

module.exports = { DashboardPage };
