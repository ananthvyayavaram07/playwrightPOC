import { expect } from "@playwright/test";
import test from "../support/utils/pageObjects";

test("single Window handling", async ({ page }) => {
    await page.goto("https://newqa.qa-pathfactory.com/")
    let color=await page.locator("#input-button").evaluate(ele=>{
        return window.getComputedStyle(ele).getPropertyValue("background-color")
    })
    
    console.log(color)
  });