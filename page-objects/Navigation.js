import { expect } from "@playwright/test"

export class Navigation{
    /**
     * @param {import("@playwright/test").Page} page 
     */
    constructor(page) {
        this.page = page
        this.basketCounter = page.locator('[data-qa="header-basket-count"]')
        this.checkoutLink = page.getByRole('link', {name:'Checkout'})
    }

    async getBasketCount() {
        await this.basketCounter.waitFor()
        const text = await this.basketCounter.innerText()
        return parseInt(text, 10)
    }

    async goToCheckout() {
        await this.checkoutLink.waitFor()
        await this.checkoutLink.click()
        await this.page.waitForURL("/basket")
    }

}