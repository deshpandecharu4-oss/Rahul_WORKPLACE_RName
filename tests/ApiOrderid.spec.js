const { test, expect, request } = require('@playwright/test');

const loginPayload = { userEmail: "chde908@gmail.com", userPassword: "Test@1234" }
const orderPayload = { orders: [{ country: "Belize", productOrderedId: "6960ea76c941646b7a8b3dd5" }] }

let token;
let orderid;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    await apiContext.tracing.start({ screenshots: true, snapshots: true });
    //Login post method
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        { data: loginPayload })

    // Validating Response
    expect(loginResponse.ok()).toBeTruthy()

    //Parse Json 
    const loginResponseJson = await loginResponse.json();
    token = await loginResponseJson.token;
    console.log("loginResponseJson--: ", loginResponseJson)

    //order post method

    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayload,
            headers: {
                'authorization': token,
                'content-type': 'application/json',
            }
        })
    //validating response

    const orderResponseJson = await orderResponse.json();
    console.log("orderresponse--- ", orderResponseJson);
    orderid = orderResponseJson.orders[0];
     console.log("Order ID  ", orderid)
    console.log(orderResponseJson.message)
    


})
test("order through API", async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)

    }, token)

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("li button.btn").nth(1).click();

    await page.locator("tbody").waitFor()
    const rows = page.locator("tbody tr");
    const rowsCount = await rows.count()
    await page.waitForTimeout(4000);
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