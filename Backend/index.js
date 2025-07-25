const express = require('express');
const { apiRoute } = require('./src/api');
require('dotenv').config();


const app = express();
app.use(express.json());


app.use("/api", apiRoute);








