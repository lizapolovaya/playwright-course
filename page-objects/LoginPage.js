
export class LoginPage {
    /**
     * @param {import("@playwright/test").Page} page 
     */
   constructor(page) {
        this.page = page
        this.continueToSignupButton = page.locator('[data-qa="go-to-signup-button"]')
    }

    async moveToSignup() {
        await this.continueToSignupButton.waitFor()
        await this.continueToSignupButton.click()
        this.page.waitForURL(/\/signup/)
    }
}