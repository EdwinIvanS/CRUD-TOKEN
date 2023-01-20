const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Debes de pasar el objeto del usuario para firmar
 * @param {*} user
 */

const tokenSing = async (user) =>{
    const sing = jwt.sign(
        {
            _id: user,
            role: user.role
        },
            JWT_SECRET,
        {
            expiresIn: "2h"
        }
    )    
    return sing;
}

/**
 * Debes de pasar token de session
 * @param {*} user
 */

const verifyToken = async (tokenJwt) =>{
    try {
        return jwt.verify(tokenJwt, JWT_SECRET)
    } catch (error) {
        return error
    }
}

module.exports = {tokenSing, verifyToken}