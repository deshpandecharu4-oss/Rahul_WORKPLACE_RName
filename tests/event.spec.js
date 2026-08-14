const{test, expect} = require('@playwright/test')

test('my test', async ({page})=>{
    await page.goto("https://eventhub.rahulshettyacademy.com/login")

    await page.locator("#email").fill("pratik@gmail.com")
    await page.locator("#password").fill("Test@1234")
    await page.locator("#login-btn").click()

    const newPage = await Promise.all([
  page.waitForEvent('page'), // Waits for a new page to be created
  page.click("API Docs") // Action that triggers opening the new tab
]);

// Now you can interact with the new tab
await newPage.waitForLoadState();

    

    await page.pause();
})