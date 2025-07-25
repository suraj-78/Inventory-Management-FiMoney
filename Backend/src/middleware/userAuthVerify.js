const jwt = require('jsonwebtoken')

function userAuthmiddleware( req, res, next)
{
    const authToken = req.header('Authorization');  // here i will directly pass the token from the frontend
    if(!authToken){
        return res.status(401).json({
            message : "No token entered"
        })
    }
    try {
        const decode = jwt.verify(authToken, process.env.JWT_TOKEN);
        if(decode) next();

    } catch (error) {
        res.status(401).json({
            message : "Invalid token , please signin again"
        })
    }
}

module.exports={
    userAuthmiddleware
}