const handleHttpError = require("../utils/handleHttpError");

const checkRol = (roles) => (req, res, next) =>{
    try {
        const user = req.user;

        const rolesByUser = user.role; 

        const checkValue = roles.some((rolSingle)=> rolesByUser.includes(rolSingle))

        if(!checkValue) return handleHttpError.httpError(res,"USER_NOT_PERMISSIONS", 403)     
        else next();
        
    } catch (error) {
        handleHttpError.httpError(res, "ERROR_PERMISSIONS", 403)
    }
}

module.exports = checkRol;