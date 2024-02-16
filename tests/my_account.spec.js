import { test } from "@playwright/test"
import { MyAccountPage } from "./../page-objects/MyAccountPage"
import { getLoginToken } from "../api-calls/getLoginToken.js" 
import { adminDetails } from "../data/userDetails.js"  


test.only("My account using cookie injection and mocking network request", async ({ page }) => {
    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password)
     
    await page.route("**/api/user**", async (route, request) => {
        await route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({message: "PLAYWRIGHT ERROR FOR MOCKING"}),

        })
    })


    const myAccount = new MyAccountPage(page)
    await myAccount.visit()
    await page.pause()

    await page.evaluate(([loginTokenInsideBrowserCode]) => {
        document.cookie = "token=" + loginTokenInsideBrowserCode
    }, [loginToken])
    await myAccount.visit()
    await myAccount.waitForPageHeading()
    await page.pause()

})