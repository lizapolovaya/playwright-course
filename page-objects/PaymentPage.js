import { expect } from "@playwright/test"
import { paymentDetails } from "../data/paymentDetails.js"


export class PaymentPage {
      /**
     * @param {import("@playwright/test").Page} page 
     */

      constructor(page) {
        this.page = page 

        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]')
                                .locator('[data-qa="discount-code"]')
        this.discountCodeInput = page.locator('[data-qa="discount-code-input"]')                        
        this.submitCodeButton = page.locator('[data-qa="submit-discount-button"]')
        this.discountActivatedMessage = page.locator('[data-qa="discount-active-message"]')
        this.discountedValue = page.locator('[data-qa="total-with-discount-value"]')
        this.totalValue = page.locator('[data-qa="total-value"]') 
        this.cardOwnerInput = page.locator('[data-qa="credit-card-owner"]')
        this.cardNumberInput = page.locator('[data-qa="credit-card-number"]')
        this.validUntilInput = page.locator('[data-qa="valid-until"]')
        this.cvcCodeInput = page.locator('[data-qa="credit-card-cvc"]')
        this.payButton = page.locator('[data-qa="pay-button"]')
      }

      async activateDiscount() {
         await this.discountCode.waitFor()
         const code = await this.discountCode.innerText()
         await this.discountCodeInput.waitFor()
        
        // await this.discountCodeInput.fill(code)
        // await expect(this.discountCodeInput).toHaveValue(code)
         
        await this.discountCodeInput.focus()
        await this.page.keyboard.type(code, {delay: 1000})
        expect(await this.discountCodeInput.inputValue()).toBe(code)
        expect(await this.discountedValue.isVisible()).toBe(false)
        expect(await this.discountActivatedMessage.isVisible()).toBe(false)
        
        await this.submitCodeButton.waitFor()
        await this.submitCodeButton.click()
        await this.discountActivatedMessage.waitFor()
        expect(this.discountActivatedMessage).toBeVisible()

        await this.discountedValue.waitFor()
        const discountedValueText = await this.discountedValue.innerText()
        const discountValueOnlyStringNumber = discountedValueText.replace("$", "")
        const discountValueNumber = parseInt(discountValueOnlyStringNumber, 10)
        
        await this.totalValue.waitFor()
        const totalValueText = await this.totalValue.innerText()
        const totalValueOnlyStringNumber = totalValueText.replace("$", "")
        const totalValueNumber = parseInt(totalValueOnlyStringNumber, 10)
        
        expect(this.discountedValue).toBeVisible()
        expect(discountValueNumber).toBeLessThan(totalValueNumber)

      }

      async fillPaymentDetails(paymentDetails) {
        await this.cardOwnerInput.fill(paymentDetails.cardOwner)
        await this.cardNumberInput.fill(paymentDetails.cardNumber)
        await this.validUntilInput.fill(paymentDetails.validUntil)
        await this.cvcCodeInput.fill(paymentDetails.cvcCode)

        //await this.page.pause()
      }

      async completePayment(){
        await this.payButton.waitFor()
        await this.payButton.click()
        await this.page.waitForURL(/\/thank-you/)
      }
}