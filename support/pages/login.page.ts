import { Page, Locator } from "@playwright/test";
import ENV from "../utils/env";
export default class LoginPage {
  constructor(public page: Page) {}

  public loginPageElements = {
    username: `input[placeholder="Email or Username"]`,
    password: `input[placeholder="Password"]`,
    loginBtn: `input[value="Log in"]`,
  };

  public async loginToApplication(username?: string, password?: string) {
    await this.page.goto(ENV.BASE_URL);   

    const user = await this.page.locator(this.loginPageElements.username);
    await user.waitFor({ state: "attached" });
    if (!username) {
      await user.fill(ENV.USERNAME);
    }

    const pwd = await this.page.locator(this.loginPageElements.password);
    await pwd.waitFor({ state: "attached" });
    if (!password) {
      await pwd.fill(ENV.PASSWORD);
    }

    const login = await this.page.locator(this.loginPageElements.loginBtn);
    await login.waitFor({ state: "attached" });
    await login.click();

    await Promise.all([
      this.page.waitForResponse(
        (resp) =>
          resp.url().includes("authoring/home") &&
          resp.status() === 200
      )
    ]);
  }
}
