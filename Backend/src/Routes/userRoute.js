const express = require('express');
const { Router } = require('express');
const { userAuthmiddleware } = require('../middleware/userAuthVerify');
const userController = require("../controllers/userController");
const userRoute = Router();

userRoute.post("/signup", userAuthmiddleware, userController.signup);
userRoute.post("/singin", userAuthmiddleware, userController.signin);

module.exports = {
    userRoute
}