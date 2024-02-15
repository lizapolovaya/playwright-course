import { expect } from "@playwright/test"
import { isDesktopViewport } from "./../utils/isDesktopViewport.js"


export class Navigation{
    /**
     * @param {import("@playwright/test").Page} page 
     */
    constructor(page) {
        this.page = page
        this.basketCounter = page.locator('[data-qa="header-basket-count"]')
        this.checkoutLink = page.getByRole('link', {name:'Checkout'})
        this.mobileBurgerMenu = page.locator('[data-qa="burger-button"]')

    }

    async getBasketCount() {
        await this.basketCounter.waitFor()
        const text = await this.basketCounter.innerText()
        return parseInt(text, 10)
    }

    // true if desktop
    // false if mobile

    async goToCheckout() {
        if(!isDesktopViewport(this.page)){
            await this.mobileBurgerMenu.waitFor()
            await this.mobileBurgerMenu.click()   
        }
       
        await this.checkoutLink.waitFor()
        await this.checkoutLink.click()
        await this.page.waitForURL("/basket")
    }

}