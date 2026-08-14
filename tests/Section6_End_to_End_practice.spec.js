const { test, expect } = require("@playwright/test");
// Steps Url : -https://rahulshettyacademy.com/client/#/auth/login
// 1. Enter email id 
// 2. password
// 3.login button
// 4.selecct product ZARA COAT 3 using for loop
// 5.Click on add that cart 
// 6. Click on Cart section
// 7.verify product name : ZARA COAT 3  is visible apply assertion 
// 8.fill india in dropdown
// 9.verify email id shown correctly with login email id 
// 10. click on place order button
// 11.capture order id
// 12.go to order book 
// 13. select the order is shown in order list
// 14.click on view button
// 15. validate the order idDetails
// 16.capture thanku message 

test('End to End senario', async ({ page }) => {
    const baseUrl = "https://rahulshettyacademy.com/client/#/auth/login"
    const username = "chde908@gmail.com"
    const password = "Test@1234"



    await page.goto(baseUrl);
    const usernameTxt = page.locator("#userEmail")
    const passwordTxt = page.locator("#userPassword")
    const loginBtn = page.locator("#login")
    const allproductList = page.locator(".card-body");
    const productName = "ZARA COAT 3";

    await usernameTxt.fill(username);
    await passwordTxt.fill(password);
    await loginBtn.click()

    await allproductList.first().waitFor();
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