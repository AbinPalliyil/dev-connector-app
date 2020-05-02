const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next){
    // Get the token from header
    const token = req.header('x-auth-token');
    // Cheeck if no token
    if(!token){
        return res.status(401).json({msg: "No token , authorization denined"});
    }
    // Verify token
    try {
        const decode = jwt.verify(token, config.get('jwtToken'));
        req.user = decode.user;
        next();
    } catch (error) {
        return res.status(401).json({msg: "Invalid token"});
    }


}