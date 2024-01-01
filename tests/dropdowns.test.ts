import test from "../support/utils/pageObjects";

test.describe("Dropdown scenarios", () => {
  test("Select option or value from dropdown", async ({ page }) => {
    await page.goto("https://letcode.in/dropdowns");
    let fruits=await page.$("select[id='fruits']")
    //await page.selectOption(fruits,'Mango') // select by text
    fruits?.selectOption("2")
  });

  test("Select multiple option or value from dropdown", async ({ page }) => {
    await page.goto("https://letcode.in/dropdowns");
    let fruits=await page.$('[id="superheros"]')    
    fruits?.selectOption([{index:2},{label:"Aquaman"},{value:"am"}])    
  });

  test("Get selected value", async ({ page }) => {
    await page.goto("https://letcode.in/dropdowns");
    let fruits=await page.$eval<string,HTMLSelectElement>('[id="country"]',ele=>ele.value)
    console.log(fruits);    
  });
});
