const { $ } = require('@wdio/globals')
const Page = require('./page');

class LoginPage extends Page {
    get fieldUsername () {return $('#user-name');}
    get fieldPassword () {return $('#password');}
    get btnLogin () {return $('#login-button');}
    get errorLockedUser() { return $('//h3[text()="Epic sadface: Sorry, this user has been locked out."]')}
    get errorNotRegisterdUser() { return $('//h3[text()="Epic sadface: Username and password do not match any user in this service"]')}
    get errorBlankUsername() { return $('//h3[text()="Epic sadface: Username is required"]')}
    get errorBlankPassword() { return $('//h3[text()="Epic sadface: Password is required"]')}

    async login (username, password) {
        await this.fieldUsername.waitForDisplayed({ timeout : 3000})
        await this.fieldUsername.setValue(username);
        await this.fieldPassword.setValue(password);
        await this.btnLogin.click();
    }

    async validateLockedUser(){
        await this.errorLockedUser.waitForDisplayed({ timeout : 3000})
        await expect(this.errorLockedUser).toBeDisplayed()
    }

    async validateNotRegisteredUser(){
        await this.errorNotRegisterdUser.waitForDisplayed({ timeout : 3000})
        await expect(this.errorNotRegisterdUser).toBeDisplayed()
    }

    async validateBlankUsername(){
        await this.errorBlankUsername.waitForDisplayed({ timeout : 3000})
        await expect(this.errorBlankUsername).toBeDisplayed()
    }

    async validateBlankPassword(){
        await this.errorBlankPassword.waitForDisplayed({ timeout : 3000})
        await expect(this.errorBlankPassword).toBeDisplayed()
    }

    open () {
        return super.open('/');
    }
}

module.exports = new LoginPage();