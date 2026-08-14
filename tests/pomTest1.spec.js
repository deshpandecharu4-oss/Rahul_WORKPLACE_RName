const { test, expect } = require('@playwright/test');

const POManager = require('../pageobjects/POManager')
const dataset =JSON.parse(JSON.stringify(require('../utils/placeholderTestData.json')));


test(`@Web Client App login  and product is ${dataset.productName}`, async ({ page }) => {


    const poManager=new POManager(page)
    const loginPage = poManager.getLoginPage()
    await loginPage.goToUrl();
    await loginPage.validLogin(dataset.username,dataset.password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddToCart(dataset.productName);
    await page.waitForTimeout(5000);
    await dashboardPage.navigateCart();

})

test(`@Web Client App login  and product is ${dataset.productName}`, async ({ page }) => {


    const poManager=new POManager(page)
    const loginPage = poManager.getLoginPage()
    await loginPage.goToUrl();
    await loginPage.validLogin(dataset.username,dataset.password);

})
