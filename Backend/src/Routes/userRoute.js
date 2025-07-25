
const { Router } = require('express');
const userController = require("../controllers/userController");
const userRoute = Router();

userRoute.post("/signup",userController.signup);
userRoute.post("/signin",userController.signin);

module.exports = {
    userRoute
}