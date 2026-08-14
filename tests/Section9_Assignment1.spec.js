const { test, expect } = require('@playwright/test')

test('My booking ', async ({ page }) => {

    function futureDateValue(daysAhead = 1) {
        const date = new Date();                        // Step 1: Current date-time object
        date.setDate(date.getDate() + daysAhead);       // Step 2: Add 'daysAhead' to today's date
        return date.toISOString().slice(0, 16);          // Step 3: Format as YYYY-MM-DDTHH:mm
    }

    const eventDateTime = futureDateValue(3);

    console.log(eventDateTime)

    const baseurl = "https://eventhub.rahulshettyacademy.com/login";
    const username = "pratik@gmail.com"
    const password = "Test@1234"
    const eventTitle = `Test Event ${Date.now()}`;
    console.log(eventTitle);

    await page.goto(baseurl);
    await page.getByPlaceholder("you@email.com").fill(username);
    await page.getByPlaceholder("••••••").fill(password);
    await page.getByRole("button", { name: 'Sign In' }).click();

    await page.getByText("Browse Events →").waitFor();
    await expect(page.getByText("Browse Events →")).toBeVisible()


    await page.locator("//a[text()='Events']").click();

    await page.locator("button[type='button']").first().waitFor();
    await page.waitForLoadState('networkidle')
    await page.locator("button[type='button']").click();

    await page.locator("#event-title-input").fill(eventTitle);
    await page.getByPlaceholder("Describe the event…").fill("I am going to pune.....");

    const categoryDropdown = page.locator("#category");

    await categoryDropdown.selectOption("Sports");
    await page.locator("#city").fill("Mumbai");
    await page.getByPlaceholder("Venue name & address").fill("At post ghansoli Navimumbai");
    const calender = page.locator("input[id='event-date-&-time']");
    await calender.fill(eventDateTime);

    await page.getByLabel("Price ($)").fill("100");
    await page.getByLabel("Total Seats").fill("50");
    await page.locator("#add-event-btn").click();

    // await expect(page.locator("[style*='block']")).toContainText("Event created!");
    await expect(page.getByText('Event created!')).toContainText("Event created!")


    await page.waitForTimeout(2000);


    //Navigate to event 

    await page.locator("#nav-events").click();

    //wait for pageload
    await page.locator("[data-testid='event-card']").first().waitFor()

    const allEvents = page.locator("[data-testid='event-card']");
    const allEventsCounts = await allEvents.count()

    console.log(allEventsCounts);

    for (let i = 0; i < allEventsCounts; i++) {
        const actualEvent = await allEvents.locator("h3").nth(i).textContent();
        if (actualEvent === eventTitle) {
            await allEvents.locator("[data-testid='book-now-btn']").nth(i).click();
            console.log("Actual event are:----" + actualEvent)
            break;
        }
    }
    expect(await page.locator("#ticket-count")).toHaveText('1');

    await page.locator("#customerName").fill("Charudatta");
    await page.getByPlaceholder("you@email.com").fill("pratik@gmail.com");
    await page.getByPlaceholder("+91 98765 43210").fill("1234657891");
    await page.locator(".confirm-booking-btn").click();

    expect(await page.locator("h3.text-xl")).toContainText("Booking Confirmed!")

    const bookingRef = await page.locator(".booking-ref").textContent();
    console.log(bookingRef);


    // Step 7 — Verify in My Bookings

    await page.locator("//button[text()='View My Bookings']").click();

    await page.waitForLoadState('networkidle');
    // await expect(page).toHaveURL(baseurl+"/booking");
    const allBookingCard = await page.locator("#booking-card");
    await allBookingCard.first().waitFor();
    const allBookingCardCount = await allBookingCard.count();

let clicked = false;

    for (let i = 0; i < allBookingCardCount && !clicked; i++) {

        await allBookingCard.locator("span").first().waitFor()
        const cart = allBookingCard.nth(i);

        const span = await cart.locator("span");
        await span.first().waitFor()
        const spanCount = await span.count();
        console.log("span count " + spanCount)
        for (let j = 0; j < spanCount  && !clicked; j++) {

            const actualref = await span.nth(j).textContent();
            console.log("actual texxt ....." + actualref)
            if (actualref.includes(bookingRef)) {
                const button = cart.locator("button");
                const buttonCount = await button.count()
                const jbuttonName = await button.allTextContents();

                console.log("button count is****** :  " + buttonCount)

                console.log("JButtton Name are ------" + jbuttonName)
                
                for(let k=0;k<buttonCount;k++)
                {
                    const buttonACtualName = await button.nth(k).textContent();
                    console.log("buttonACtualName::::::::::::::" + buttonACtualName)
                    if(buttonACtualName.includes("View Details")){
                        
                        await button.nth(k).click();
                        console.log("k loop is starting _______")
                        
                         clicked=true;
                         break;
                    }
                    
                }

            }

        }
    }


})
