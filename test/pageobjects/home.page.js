const { $, expect } = require('@wdio/globals')
const Page = require('./page');
const loginPage = require('../pageobjects/login.page');

class HomePage extends Page{
    get iconCart () { return $('.shopping_cart_link') }
    get addBackpackToCart () { return $('#add-to-cart-sauce-labs-backpack') }
    get badgeCart () { return $('.shopping_cart_badge') }

    async validateHomePage() {
        await expect(browser).toHaveUrlContaining('/inventory.html')
        await expect(this.iconCart).toBeDisplayed()
    }

    //Login With StandardUser
    async loginStandarUser(){
        await loginPage.open()
        await loginPage.login(process.env.USERNAME_STANDARD_USER, process.env.PASSWORD_SAUCEDEMO)
    }
    //

    async addAProductToCart(){
        await this.loginStandarUser()
        await this.addBackpackToCart.waitForDisplayed({ timeout : 3000})
        await this.addBackpackToCart.click()
    }

    async validateBadgeCart(){
        
        await this.badgeCart.waitForDisplayed({ timeout : 3000 })
        await expect(this.badgeCart).toBeDisplayed()
    }

    open () {
        return super.open('/inventory.html');
    }
}

module.exports = new HomePage();