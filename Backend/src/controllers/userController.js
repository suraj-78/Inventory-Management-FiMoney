require('dotenv').config();
const express = require("express");
const { Router } = require('express')
const userRoute = Router();
const jwt = require("jsonwebtoken")
const {z} = require('zod');
const mongoose = require('mongoose');


const jwtsecret = process.env.JWT_SECRET;

userRoute.post("/signup", async (req, res) => {

    console.log("Signup route hit");



});

userRoute.post("/signin", (req, res) => {
    const { } = req.body;
})

module.exports = {
    userRoute
}