const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSing, verifyToken } = require("../utils/handleJwt");
const userModel = require("../models/user");
const handleHttpError = require("../utils/handleHttpError");

const authUser = {
    Register: async (req, res) =>{
        try {
            req = matchedData(req);
            const password = await encrypt(req.password);
            const body = {...req, password }
            const dataUser = await userModel.create(body);
            dataUser.set("password", undefined, { strict: false})

            const data = {
                token: await tokenSing(dataUser),
                user : dataUser
            }        
        res.send(
            {status: "OK 200", data}
        ); 
        } catch (error) { handleHttpError.httpError(res, "INTERNAL_SERVER_ERROR", 500)}       
    },

    Login : async (req, res) =>{
        try {
            let respuesta = "";
            req = matchedData(req);
            const user = await userModel.findOne({email:req.email});

            if (!user) { 
                handleHttpError.httpError(res, "USER_NOT_EXITS", 404) 
            }
            else {
                const comparacion = await compare(req.password, user.password);
                if (!comparacion) { 
                    handleHttpError.httpError(res, "PASSWORD_INCORRECT", 401) 
                } 
                else {
                    const data = {
                        token : await tokenSing(user),
                        user 
                    }
                    res.send({data})
                }        
            } 
        } catch (error) {
            handleHttpError.httpError(res, "INTERNAL_SERVER_ERROR", 500)
        }
    }
}

module.exports = authUser;