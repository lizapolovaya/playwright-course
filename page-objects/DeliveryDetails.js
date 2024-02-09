export class DeliveryDetails {
      /**
     * @param {import("@playwright/test").Page} page 
     */

    constructor(page) {
        this.page = page

        this.firstNameInput = page.locator('[data-qa="delivery-first-name"]')
        this.lastNameInput = page.locator('[data-qa="delivery-last-name"]')
        this.streetInput = page.locator('[data-qa="delivery-address-street"]')
        this.postcodeInput = page.locator('[data-qa="delivery-postcode"]')
        this.cityInput = page.locator('[data-qa="delivery-city"]')
        this.countryDropdown = page.locator('[data-qa="country-dropdown"]')
    }

    async fillDetails(firstName, lastName, street, postcode, city) {
        await this.firstNameInput.fill(firstName)
        await this.lastNameInput.fill(lastName)
        await this.streetInput.fill(street)
        await this.postcodeInput.fill(postcode)
        await this.cityInput.fill(city)
        await this.countryDropdown.selectOption("Ukraine")

        await this.page.pause()

    }
}