class LoginPage {

    constructor(page){
        this.page=page;
        this.loginButton = page.locator("#login");
        this.usernameInput =page.locator("#userEmail")
        this.passwordInput = page.locator("#userPassword")

    }
    async goToUrl(){
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
       
    }

    async validLogin(username,password){
            await this.usernameInput.fill(username);
            await this.passwordInput.fill(password);
            await this.loginButton.click();
            await this.page.waitForLoadState("networkidle");
            
    }

}
// module.exports ={LoginPage};
module.exports = LoginPage;