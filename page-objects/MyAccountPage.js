export class MyAccountPage {
    constructor(page) {
        this.page = page
    }

    async visit() {
        await this.page.goto("/my-account")
        await this.page.pause()
    }
}