const{test, expect} = require('@playwright/test')

test("wait for", async ({page})=>{

await page.goto("https://rahulshettyacademy.com/client");
await page.locator("#userEmail").fill("chde908@gmail.com")
await page.locator("#userPassword").fill("Test@1234")
await page.locator("#login").click();

// await page.waitForLoadState('networkidle');
// await page.waitForLoadState
// console.log(await page.locator(".card-body b").allTextContents());

await page.locator(".card-body b").last().waitFor();
const allproduct= await page.locator(".card-body b").allTextContents();

console.log(allproduct);

})