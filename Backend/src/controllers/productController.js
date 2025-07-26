const express = require('express');

const { productModel } = require('../models/productModel');


const addProduct = async (req, res) => {
   
    try {
         const { name , type, sku, image_url, description, quantity, price } = req.body;

        const product = await productModel.create({
            name, 
            type, 
            sku,
            image_url, 
            description,
            quantity,
            price
        });

        res.status(201).send({message : 'Product added', product_id : product._id});

    } catch (error) {
        console.error("ADD PRODUCT FAILED:", error);
        res.status(500).send({ error: "Error occured while adding product." });
        
    }
};

const getProducts = async(req, res) => {
    try {
        
        const page = parseInt(req.query.page, 10) || 1; // wehre 10 is the base and 1 is the default value of the page
        const limit = parseInt(req.query.limit, 10) || 10;
        const skipPages = (page - 1) * limit;

        const products = await productModel.find().skip(skipPages).limit(limit);

        res.status(200).send(products);

    } catch (error) {
        res.status(500).send(error);
    }
}

const updateQuantity = async (req, res) => {
    try {
        const { quantity } = req.body;
        const product = await productModel.findByIdAndUpdate(req.params.id, {quantity}, { new: true, runValidators: true});

        if(!product) return res.status(404).send({error : 'Product not found'});

        res.status(200).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = {
    addProduct, 
    getProducts,
    updateQuantity
}


