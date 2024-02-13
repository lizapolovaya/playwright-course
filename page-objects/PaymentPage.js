import { expect } from "@playwright/test"


export class PaymentPage {
      /**
     * @param {import("@playwright/test").Page} page 
     */

      constructor(page) {
        this.page = page 

        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]')
                                .locator('[data-qa="discount-code"]')
        this.discountCodeInput = page.locator('[data-qa="discount-code-input"]')                        
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
      }
}