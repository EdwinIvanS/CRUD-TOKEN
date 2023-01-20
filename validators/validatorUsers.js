const { check } = require("express-validator");
const handleValidatorUser = require("../utils/handleValidatorUsers");

const validatorUsers = [
    check("name").exists().notEmpty().withMessage("Debes ingresar un nombre de usuario"),
    check("age").exists().notEmpty().isNumeric({min:1, max:90}).withMessage("Debes ser mayor de edad"),
    check("email").exists().notEmpty().withMessage("Debes ingresar un correo electrónico"),
    (req, res, next ) =>{
        return handleValidatorUser(req, res, next)
    }
]

module.exports = {validatorUsers};