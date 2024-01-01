import test from "../support/utils/pageObjects";

test.describe("",async() =>{    
    const filePath = `../downloads/index.png`
    test("upoad files using input tag", async ({page,common}) => {    
        await page.goto("https://cgi-lib.berkeley.edu/ex/fup.html");             
        await common.ulpoadFileWithInputTag(`input[name="upfile"]`,filePath)        
    })
})
