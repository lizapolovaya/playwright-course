import { expect } from "@playwright/test"

export class MyAccountPage {
     /**
     * @param {import("@playwright/test").Page} page 
     */

    constructor(page) {
        this.page = page

        this.pageHeading = page.getByRole('heading', {name:'My Account'})
    }

    async visit() {
        await this.page.goto("/my-account")
        await this.page.pause()
    }

    async waitForPageHeading() {
        await this.pageHeading.waitFor()
    }
}