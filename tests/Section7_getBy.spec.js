const { test, expect } = require('@playwright/test');

test('New sript using get by locators', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/")
    await page.getByLabel("Check me out if you Love IceCreams!").click()
    await page.getByLabel("Employed").click()
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abcd")



    await page.getByRole("button", { name: "Submit" }).click()

    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();

    await page.getByRole("link", { name: "Shop" }).click()

    await page.locator(".row app-card").filter({ hasText: "Nokia Edge" }).getByRole("button", { name: "Add " }).click()
    await page.getByText(/Checkout/).click();

})

test("End to end senario", async ({ page }) => {
    const username = "chde908@gmail.com"
    const password = "Test@1234"

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder("email@example.com").fill(username)
    await page.getByPlaceholder("enter your passsword").fill(password)

    await page.getByRole("button", { name: "Login" }).click()
    await page.locator(".card-body").first().waitFor()
    await page.locator(".card-body").filter({ hasText: "ZARA COAT 3" }).getByRole("button", { name: " Add To Cart" }).click()
    await page.getByRole("listitem").getByRole("button", { name: "Cart" }).click()

    await page.getByRole("button", { name: "Checkout" }).waitFor()
    await page.getByRole("button", { name: "Checkout" }).click();

    await page.getByPlaceholder("Select Country").pressSequentially('ind', { delay: 150 })
    await page.getByRole("button", { name: "India" }).nth(1).click()

    await page.waitForTimeout(5000)

})

test.only("handle calender", async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    const month="6"
    const date="20"
    const year="2027"

    const expectedlist =[month,date,year]

    await page.waitForTimeout(3000);
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();

    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(month)-1).click();
    
    // Concatenation passing value to xpath using declared variable so use '"+date+"' 
    // if not use '""' this quates and only used "" then it refer x path only

    await page.locator("//abbr[text()='"+date+"']").click()

    // await page.locator(`//abbr[text()='${date}']`).click();

    const inputs= await page.locator(".react-date-picker__inputGroup__inputB");

    for(let i=0;i<expectedlist.length;i++){

        const value=await inputs.nth(i).inputValue();

        console.log(value)
        expect(value).toEqual(expectedlist[i])

    }

    // await page.pause()


})
