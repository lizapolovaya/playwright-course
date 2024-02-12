import { deliveryDetails as userAddress} from "./../data/deliveryDetails.js"
import { expect } from "@playwright/test"

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
        this.saveAddressButton = page.locator('[data-qa="save-address-button"]')
        this.savedAddressContainer = page.locator('[data-qa="saved-address-container"]')
    }

    async fillDetails(userAddress) {
        await this.firstNameInput.fill(userAddress.firstName)
        await this.lastNameInput.fill(userAddress.lastName)
        await this.streetInput.fill(userAddress.street)
        await this.postcodeInput.fill(userAddress.postcode)
        await this.cityInput.fill(userAddress.city)
        await this.countryDropdown.selectOption(userAddress.country)
    }

    async saveDetails() {
        const addressCountBeforeSaving = await this.savedAddressContainer.count()
        await this.saveAddressButton.waitFor()
        await this.saveAddressButton.click()
        await expect(this.savedAddressContainer).toHaveCount(addressCountBeforeSaving + 1)

        //await this.page.pause()

    }
}