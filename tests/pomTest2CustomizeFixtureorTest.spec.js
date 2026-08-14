const { test, expect } = require('@playwright/test');
const {customTest} = require ('../utils/testdata-baseFixtureTest')
const POManager = require('../pageobjects/POManager')

customTest('Client App login from customText', async ({ page,testdataForOrder}) => {


    const poManager=new POManager(page)
    const loginPage = poManager.getLoginPage()
    await loginPage.goToUrl();
    await loginPage.validLogin(testdataForOrder.username,testdataForOrder.password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddToCart(testdataForOrder.productName);
    await page.waitForTimeout(5000);
    await dashboardPage.navigateCart();

    
})
