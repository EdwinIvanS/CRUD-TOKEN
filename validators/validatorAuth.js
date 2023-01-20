const { check } = require("express-validator");
const validateResult = require("../utils/handleValidatorAuth");

const validatorRegister = [
    check("name").exists().notEmpty().isLength({min:3, max:25}).withMessage("Debes ingresar un nombre de usuario"),
    check("age").exists().notEmpty().isNumeric({min:8, max:50}).withMessage("Debes ingresar la edad"),
    check("email").exists().notEmpty().withMessage("Debes ingresar un correo electrónico"),
    check("password").exists().notEmpty().isLength({min:3, max:15}).withMessage("Debes ingresar una contraseña"),
    (req, res, next ) =>{
        return validateResult( req, res, next )
    }
]

const validatorLogin = [
    check("email").exists().notEmpty().withMessage("Debes ingresar un correo electrónico"),
    check("password").exists().notEmpty().isLength({min:3, max:15}).withMessage("Debes ingresar una contraseña"),
    (req, res, next ) =>{
        return validateResult( req, res, next )
    }
]

module.exports = {validatorRegister, validatorLogin};