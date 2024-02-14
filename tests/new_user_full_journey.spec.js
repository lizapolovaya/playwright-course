import { test } from "@playwright/test"
import { v4 as UUID4 } from 'uuid';
import { ProductPage } from "../page-objects/ProductPage"
import { Navigation } from "./../page-objects/Navigation.js"
import { Checkout } from "./../page-objects/Checkout.js"
import { LoginPage } from "./../page-objects/LoginPage.js"
import { RegisterPage } from "./../page-objects/RegisterPage.js"
import { DeliveryDetails } from "./../page-objects/DeliveryDetails.js"
import { deliveryDetails as userAddress} from "./../data/deliveryDetails.js"
import { PaymentPage } from "./../page-objects/PaymentPage.js"
import { paymentDetails } from "../data/paymentDetails.js"; 

test.only("New user full end-to-end test journey", async ({ page }) => {

    //ProductPage.visit()
    const productPage = new ProductPage(page)
    await productPage.visit()
    await productPage.sortByCheapest()
    await productPage.addProductToTheBasket(0)
    await productPage.addProductToTheBasket(1)
    await productPage.addProductToTheBasket(2)
    await productPage.addProductToTheBasket(3)
    await productPage.addProductToTheBasket(4)

    const navigation = new Navigation(page)
    await navigation.goToCheckout()

    const checkout = new Checkout(page)
    await checkout.removeCheapestProduct()
    await checkout.continueToCheckout()

    const login = new LoginPage(page)
    await login.moveToSignup()

    const registerPage = new RegisterPage(page)
    const email = UUID4() + "@gmail.com"
    const password = UUID4()
    await registerPage.signUpAsNewUser(email, password)

    const deliveryDetails = new DeliveryDetails(page)
    await deliveryDetails.fillDetails(userAddress)
    await deliveryDetails.saveDetails()
    await deliveryDetails.continueToPayment()

    const paymentPage = new PaymentPage(page)
    await paymentPage.activateDiscount()
    await paymentPage.fillPaymentDetails(paymentDetails)
    await paymentPage.completePayment()


})