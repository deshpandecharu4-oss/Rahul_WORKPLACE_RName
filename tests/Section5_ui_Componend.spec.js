const { test, expect } = require('@playwright/test')

test.skip('UI componend', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")


    const username = page.locator("#username")
    const password = page.locator("#password");

    await username.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2")

    await page.waitForTimeout(3000);


    //Radio button
    const radiobutton = page.locator(".radiotextsty");
    await radiobutton.last().click();

    await page.locator("#okayBtn").click();


    //Dropdown

    const dropdown = page.locator("select.form-control")

    await dropdown.selectOption('teach')
    await page.locator("input#terms").click();


    // expect(await page.locator("input#terms").isChecked).toBeTruthy();


    await page.locator("input#terms").uncheck();
    expect(await page.locator("input#terms").isChecked).toBeFalsy()
    await page.waitForTimeout(3000)
})




//Child window handling : -- Example 

test('Child window ', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    const usernameTxt = page.locator("#username")
    const passwordTxt = page.locator("#password");
    const signBtn = page.locator("#signInBtn")

    await usernameTxt.fill("rahulshettyacademy");
    await passwordTxt.fill("Learning@830$3mK2")

    await page.waitForTimeout(2000);
    console.log(await usernameTxt.inputValue());

    const documentLink = page.locator("a[href*='https://rahulshetty']")

    const [newPage] = await Promise.all([

        context.waitForEvent("page"),
        documentLink.click()

    ])
    // await newPage.waitForTimeout(3000)

    const text1 = await newPage.locator("p[class*=red] a").textContent();
    console.log(text1);

    const arrayText1 = text1.split("@")
    const domainUsername = arrayText1[1].split(".")[0]
    console.log("we can use as a domain name :-----" + domainUsername)

    await newPage.waitForTimeout(3000);
    console.log(await page.title())
    await newPage.waitForTimeout(3000);
    await usernameTxt.fill(domainUsername)

    await newPage.waitForTimeout(5000);

    expect(await usernameTxt.inputValue()).toContain("rahulshettyacademy")


})
