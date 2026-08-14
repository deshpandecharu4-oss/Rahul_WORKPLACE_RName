const { test, expect, request } = require('@playwright/test')
let webContext;
test.beforeAll(async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("chde908@gmail.com")
    await page.locator("#userPassword").fill("Test@123")
    await page.locator("#login").click();

    await context.storageState({ path: 'state.json' })
    webContext = await browser.newContext({ storageState: 'state.json' });

})


test("validating title", async () => {
      
        const page = await webContext.newPage();
        page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        await page.waitForTimeout(2000);
         await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/auth/login");
})

test("end to end test", async ({})=>{

    
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");

    const allproductList = await page.locator(".card-body");
    const allproductCount = await allproductList.count();
    console.log(allproductCount);

    for (let i = 0; i < allproductCount; i++) {
        const productNames = await allproductList.nth(i).locator("b").textContent();
        console.log("all product names:---" + productNames);

        if (await productNames === productName) {
            await allproductList.nth(i).locator("text= Add To Cart").click();
            console.log("Selected the product sucessfuly....." + productNames)
            break;
        }
    }
   
    await page.locator("[routerlink*='/cart']").click()
    await page.locator("[class*='items']").first().waitFor();

    const productBoolean = await page.locator('h3:has-text("ZARA COAT 3")').isVisible();
    console.log(productBoolean);
    expect(productBoolean).toBeTruthy();

    await page.locator('text=Checkout').click();

    await page.locator(".field .text-validated").first().waitFor();

    await page.locator(".field .text-validated").fill("125466666666")
    const cardnumberInputValue = await page.locator(".field .text-validated").inputValue();

    console.log("*** Card number input value **** " + cardnumberInputValue);
    const cardExperyMonthDropdown = await page.locator("div select").first();
    await cardExperyMonthDropdown.selectOption({ label: '03' });

    const cardExperyDateDropdown = await page.locator("div select").last();
    await cardExperyDateDropdown.selectOption({ label: '20' });

    const countrySearchDrop = await page.locator("[placeholder='Select Country']");
    await countrySearchDrop.pressSequentially('ind', { delay: 150 })




    const dropdown = page.locator(".ta-results");   // no await here
    await dropdown.waitFor()
    const optionsCount = await dropdown.locator("button").count();   // await only on action






    console.log("*****Country Dropdown count****" + optionsCount);

    for (let i = 0; i < optionsCount; i++) {
        const countryNames = await dropdown.locator("button").nth(i).textContent();
        console.log("***Country Name**** ::" + countryNames)

        if (countryNames === " India") {
            await dropdown.locator("button").nth(i).click()
            break;
        }
    }

    // await expect(page.locator("label[type='text']")).toHaveText(username);
    await expect(page.locator("label[type='text']")).toContainText(username);

    await page.locator(".action__submit").click()
    const orderid = await page.locator(".em-spacer-1 .ng-star-inserted").textContent()


    const orderLink = await page.locator("button[routerlink*='myorders']").click()

    await page.locator("tbody").waitFor()
    const rows = page.locator("tbody tr");
    const rowsCount = await rows.count()

    for (let i = 0; i < rowsCount; i++) {
        const orderids = await rows.nth(i).locator("th").textContent();
        if (orderid.includes(orderids)) {

            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent()
    expect(orderid.includes(orderIdDetails)).toBeTruthy();

    await page.waitForTimeout(5000);

})
