const{test, expect} =require('@playwright/test')

test.skip('test1', async ({page})=>{

await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
await page.locator('#username').fill("charu");
await page.locator("#password").fill("wrongpassword")
await page.locator("#signInBtn").click()

// to capture the text value using textContent and by using allTextContent() 
// console.log(await page.locator(["style*='display: block;'"] ).textContent());
console.log(await page.locator('[style*="display: block;"]').textContent());

// to validate the error message 
expect(await page.locator('[style*="display: block;"]')).toContainText('Incorrect')

})


// Second test
test('test 2: nth method and first()', async ({page})=>{

await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
await page.locator('#username').fill("rahulshettyacademy");
await page.locator("#password").fill("Learning@830$3mK2")
await page.locator("#signInBtn").click()

// console.log(await page.locator(".card-body a").textContent())
// error Error: strict mode violation: locator('.card-body a') resolved to 4 elements:
    // await page.waitForTimeout(2000);

//  const allproduct = await page.locator('.card-body a').allTextContents();
// console.log(allproduct);


// console.log(await page.locator(".card-body a").allTextContents);

await page.pause();

})