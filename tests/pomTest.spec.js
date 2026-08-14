const { test, expect } = require('@playwright/test');

const POManager = require('../pageobjects/POManager')
// const dataset =JSON.parse(JSON.stringify(require('../utils/placeholderTestData.json')));
const dataset=JSON.parse(JSON.stringify(require('../utils/ParameterTestData.json')));

for(const data of dataset){
test(`Client App login  and product is ${data.productName}`, async ({ page }) => {


    const poManager=new POManager(page)
    const loginPage = poManager.getLoginPage()
    await loginPage.goToUrl();
    await loginPage.validLogin(data.username,data.password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddToCart(data.productName);
    await page.waitForTimeout(5000);
    await dashboardPage.navigateCart();

    
})
}
