const jwt = require('jsonwebtoken');
require('dotenv').config({path: __dirname + '/../../variables.env'}); 

module.exports = ((req, res, next) => {
console.log(process.env.SECRET)
    //read token
    const token =req.header('x-auth-token');
    if(!token) {
        return res.status(401).json({msg: "No hay token. No puede tener acceso"})
    }

    try {
        console.log(process.env.SECRET)
        const hash = jwt.verify(token, process.env.SECRET);
        console.log(hash)
        req.user = hash.user;
        console.log(hash.user)
        next();
        
    } catch (error) {
        res.status(401).json({msg: "Token No valido"})
    }

})