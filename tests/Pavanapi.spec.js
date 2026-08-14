const { test, expect } = require('@playwright/test')

test.skip("Api test1", async ({ request }) => {
    const response = await request.get("https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=somename")
    console.log(await response.json())
    expect(await response.status()).toBe(200)

})

test.skip("Post Method", async ({ request }) => {
    const response = await request.post("https://rahulshettyacademy.com/Library/Addbook.php", {
        data: {
            name: "Learn Appium Automation with Java",
            isbn: "bcd",
            aisle: "227",
            author: "John foe"
        }
    })

    //check the status code
    expect(await response.status()).toBe(200);

    const body = await response.json();
    console.log(body)

    expect(body).toHaveProperty("ID")

})

test.skip("get details of book", async ({ request }) => {

    const response = await request.get("https://rahulshettyacademy.com/Library/GetBook.php?ID=3389")
    const statusCode = await response.json()
    console.log(await statusCode)

    expect(response.status()).toBe(200);
})


test("Post method practice", async ({ request }) => {

    const bookData = {

        name: "Learn Appium Automation with Java",
        isbn: "bcd",
        aisle: "227",
        author: "John foe"
    }
    const response = await request.post("https://rahulshettyacademy.com/Library/Addbook.php", {
        data: bookData

    })

    const status=await response.status();
    const body=await response.json()
    console.log(body);

    expect(response.ok()).toBeTruthy();
  


})