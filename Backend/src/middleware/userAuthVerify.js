const jwt = require('jsonwebtoken')
require('dotenv').config();

function userAuthmiddleware( req, res, next)
{
    const authToken = req.header('Authorization');  // here i will directly pass the token from the frontend
    if(!authToken){
        
        return res.status(401).json({
            message : "No token entered"
        })
    }
    try {
        const token = authToken.split(' ')[1]; // as it is [Bearer , token]
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        if(decoded) next();

    } catch (error) {
        res.status(401).json({
            message : "Invalid token , please signin again"
        })
    }
}

module.exports={
    userAuthmiddleware
}