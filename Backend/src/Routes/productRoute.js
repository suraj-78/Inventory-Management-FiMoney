
const { Router } = require('express');
const productController = require("../controllers/productController");
const productRoute = Router();
const { userAuthmiddleware } = require("../middleware/userAuthVerify");


productRoute.put("/addProduct", userAuthmiddleware, productController.addProduct);
productRoute.get("/getProduct", userAuthmiddleware,  productController.getProduct);
productRoute.post("/updateProduct",userAuthmiddleware, productController.updateQuantity);

module.exports = {
    productRoute
}