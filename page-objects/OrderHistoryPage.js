class OrderHistoryPage {
  constructor(page) {
    this.page = page;
    this.orderList = page.locator("tbody");
    this.orderedProduct = page.locator("tbody tr");
    this.orderDetailId = page.locator(".col-text");
  }

  async searchOrderAndSelect(orderId) {
    await this.orderList.waitFor();
    const lengthOrOrderedProduct = await this.orderedProduct.count();
    for (let i = 0; i < lengthOrOrderedProduct; i++) {
      const actualOrderId = await this.orderedProduct // get order id
        .nth(i)
        .locator("th")
        .textContent();
      if (orderId.includes(actualOrderId)) {
        await this.orderedProduct.nth(i).locator("button").first().click(); // click view button
        break;
      }
    }
  }

  async getOrderId() {
    // const orderDetaild = await this.orderDetailId.textContent();
    return await this.orderDetailId.textContent();
  }
}

module.exports = { OrderHistoryPage };
