import test from "../support/utils/pageObjects";

test.describe("Alert scenarios",async() =>{        
    test("Accept alert", async ({page,common}) => {    
        await page.goto("https://letcode.in/alert");             
        await common.acceptAlert(`[id="prompt"]`)        
    })

    test("Dismiss alert", async ({page,common}) => {    
        await page.goto("https://letcode.in/alert");             
        await common.dismissAlert(`[id="prompt"]`)        
    })

    test("Read message from alert", async ({page,common}) => {    
        await page.goto("https://letcode.in/alert");             
        await common.readMessage(`[id="prompt"]`)          
    })
})

