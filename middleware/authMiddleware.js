const handleHttpError = require("../utils/handleHttpError");
const errorsHttp = require("../utils/handleHttpError");
const { verifyToken } = require("../utils/handleJwt");
const userModel = require('../models/user')

const authMiddleware = async(req, res, next) =>{
    try {
        if(!req.headers.authorization){
            handleHttpError.httpError(res,"NEED_SESSION", 401)
        }
        else{
            const token = req.headers.authorization.split(' ').pop();
            const dataToken = await verifyToken(token);

            if(!dataToken._id){
                handleHttpError.httpError(res,"ERROR_ID_TOKEN", 401)
            } 
            
            const user = await userModel.findById(dataToken._id)
            req.user = user
                        
            next()
        }
    } catch (error) { 
        handleHttpError.httpError(res, "NOT_SESSION", 500) 
    }
}

module.exports = authMiddleware;