class DashboardPage{
    constructor(page){
        this.page=page
         this.products = page.locator(".card-body");
         this.productsText =page.locator(".card-body b")
         this.cartLink=page.locator("[routerlink*=cart]")
         this.AddToCartButton=page.locator("text= Add To Cart")
         
    }

   async searchProductAddToCart(productName)
   
   {
    const productTitle=await this.productsText.allTextContents();
    console.log(productTitle);

    const productsCount=await this.products.count();
    console.log(productsCount)

    for(let i=0;i<productsCount;i++){
        if(await this.products.nth(i).locator("b").textContent()===productName){
            await this.products.nth(i).locator("text= Add To Cart").click()
            console.log("Selected the product sucessfuly....." + productName)
            break;
        }
    }
    }
    async navigateCart(){
        await this.cartLink.click();
    }

}
// module.exports={DashboardPage}
module.exports = DashboardPage;