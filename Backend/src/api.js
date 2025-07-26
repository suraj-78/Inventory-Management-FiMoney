const express = require('express');

const {Router} = express;

const apiRoute = Router();

const userRoute = require('./Routes/userRoute');
const productRoute = require('./Routes/productRoute');

apiRoute.use("/", userRoute);
apiRoute.use("/products", productRoute);


module.exports = {
    apiRoute
}