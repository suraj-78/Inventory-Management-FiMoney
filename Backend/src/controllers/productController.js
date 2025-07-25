const express = require('express');
const { Router } = require('express');
const { model } = require('mongoose');


const productRoute = Router();

productRoute.get("/getproduct", (req, res) => {
    
});

module.exports = {
    productRoute
}