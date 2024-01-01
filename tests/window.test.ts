import test from "../support/utils/pageObjects";

test.describe("Window handling", () => {
  test("single Window handling", async ({ page, context }) => {
    await page.goto("https://letcode.in/windows");
    const [newTab] = await Promise.all([
      context.waitForEvent("page"), //listner
      page.locator('[id="home"]').click(),
    ]);
    await newTab.waitForLoadState();
    console.log(await newTab.title()); //child tab
    console.log(await page.title()); //parent tab
    await newTab.close();
    await page.waitForTimeout(5000);
    await page.bringToFront();
  });

  test.only("Multi Window handling", async ({ page, context }) => {
    await page.goto("https://letcode.in/windows");
    const [MultiPages] = await Promise.all([
      context.waitForEvent("page"), //listner
      page.locator("#multi").click(),
    ]);
    await MultiPages.waitForLoadState();
    const pages = MultiPages.context().pages();
    console.log(pages.length);
    await pages[0].bringToFront();
    await page.waitForTimeout(5000);
  });
});
