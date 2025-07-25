require('dotenv').config();
const express = require("express");
const { Router } = require('express')
const userRoute = Router();
const jwt = require("jsonwebtoken")
const { userModel } = require('../models/userModel');
const bcrypt = require('bcryptjs')


const jwtsecret = process.env.JWT_SECRET;

const register = async (req, res) => {

    console.log("Signup route hit");

    try {
        const {username , password} = req.body;

        const flag = await userModel.findOne({username});
        if(flag)
        {
            return res.status(409).json({
                message : "User already exist, please Sign In"
            })
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            username,
            password : hashedPassword
        });

        res.status(201).send({message : 'User Registerd successfully'});

    } catch (error) {
        if( error.code === 11000) return res.status(409).send({error : 'Username already exists'});
        res.status(500).send({error : 'Server error'});
    }

};

const login =  async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await userModel.findOne({username});
        if(!user)
        {
            return res.status(401).send({error : 'Invalid credentials'});
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if(!passwordMatch) return res.status(401).send({message : 'Invalid Credentials'})

        const token = jwt.sign({ userId : user._id}, jwtsecret);
        res.status(200).send({access_token : token});

    } catch (error) {
        console.error("LOGIN FAILED:", error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

module.exports = {
   register, 
   login
}