const base = require('@playwright/test')

exports.customTest=base.test.extend({
testdataForOrder : {
     username : "chde908@gmail.com",
     password : "Test@1234",
    productName : "ZARA COAT 3"
}
}
)
