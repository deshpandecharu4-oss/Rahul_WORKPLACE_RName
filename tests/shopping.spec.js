const{test, expect} = require('@playwright/test')

test('shopping test', async ({page}) =>{

await page.goto('https://demowebshop.tricentis.com/')


await page.locator("//a[text()='Log in']").click()
await page.locator("#Email").fill('pratikmisal@gmail.com')
await page.locator(".password").fill('Test@1234')

await page.locator(".button-1.login-button").click();
// await page.locator("text=Books").first().click();
// await page.locator("//li//a[normalize-space()='Books']").first().click();
await page.locator("(//div[@class='header-menu']//a[normalize-space()='Books'])[1]").click()


const productname='Computing and Internet'

// const books=await page.locator("//div[@class='product-grid']/div//h2//a").allTextContents();
const books=await page.$$("//div[@class='product-grid']/div//h2//a");
console.log(books);
console.log(books.length);



for(let i=0 ; i<books.length;i++)
{
    console.log("------going to loop------")
    console.log("vvvvvvv" + books(i).textContent()+":::: book contain names ")
    if(await books.nth(i).textContent()===productname)
    {
        await nth(i).locator("(//input[@value='Add to cart'])").click();
        break;
    }

}




})