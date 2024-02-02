import test from "../support/utils/pageObjects";

test.describe("",async() =>{        
    test("login", async ({page}) => {    
        await page.goto("https://www.google.com");                        
    })
})
