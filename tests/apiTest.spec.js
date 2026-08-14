const { test, expect, request } = require('@playwright/test')
const { apiutils } = require('./utils/apiutils');
const { validateHeaderValue } = require('node:http');


const loginPayload = { userEmail: "chde908@gmail.com", userPassword: "Test@1234" }
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] }
let response;


test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new apiutils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);

})

test("Api test using utils", async ({ page }) => {

    // await page.addInitScript(value => {
    //     window.localStorage.setItem('token', value)
    // }, response.token);

    // await page.goto("https://rahulshettyacademy.com/client");
    // await page.waitForTimeout(3000);
    // await page.locator("li button.btn").nth(1).click();

    await page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.waitForTimeout(7000);

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();


    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    //await page.pause();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

});


