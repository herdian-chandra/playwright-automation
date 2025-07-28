class LoginPage {
  constructor(page) {
    this.page = page;
    this.email_txtField = page.locator("#userEmail");
    this.password_txtField = page.locator("#userPassword");
    this.login_btn = page.locator("#login");
  }

  async goTo() {
    await this.page.goto("https://rahulshettyacademy.com/client");
  }

  async validLogin(email, password) {
    await this.email_txtField.fill(email);
    await this.password_txtField.fill(password);
    await this.login_btn.click();
    await this.page.waitForLoadState("networkidle");
  }
}

module.exports = { LoginPage };
