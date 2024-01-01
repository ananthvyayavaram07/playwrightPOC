import { test as baseTest } from "@playwright/test";
import LoginPage from "../pages/login.page";
import CLAPage from "../pages/cla.page";
import common from "../utils/common"

const test = baseTest.extend<{
  loginPage: LoginPage;
  claPage: CLAPage;
  common:common;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  claPage: async ({ page }, use) => {
    await use(new CLAPage(page));
  },
  common: async ({ page }, use) => {
    await use(new common(page));
  },
});

export default test;
export const expect = test.expect;
