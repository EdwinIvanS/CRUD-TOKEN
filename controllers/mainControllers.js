const userSchema = require("../models/user");
const handleHttpError = require("../utils/handleHttpError")

const mainController = {
    create : async (req, res) => {             
        try {   
            const { name, age, email } = req.body;
            const userExist = await userSchema.findOne({email : email })
            if(userExist) return handleHttpError.httpError(res, "USER_EMAIL_EXIST", 404)
            else{
                console.log("aqui estoy" + userExist)
                const createUser = await userSchema({ name, age, email }).save();
                console.log(createUser)
                data = {
                    status : 200,
                    descripcion : "USER_CREATE",
                    user : createUser
                }
                
                res.send(data)
            }

        } catch (error) { handleHttpError.httpError(res, "INTERNAL_SERVER_ERROR", 500) }   
    },

    query : async (req, res) => {
                
        try {
            const user = req.user
            const findUser = await userSchema.find();
            if(findUser[0]=== undefined) return handleHttpError.httpError(res, "NOT_EXIST_INFOMATION_BD", 404)

            data ={
                status : 200,
                descripcion : "SUCCESSFUL_QUERY",
                userQuery : user.name,
                users : findUser
            }
            res.send(data)
        } catch (error) { handleHttpError.httpError(res, "INTERNAL_SERVER_ERROR", 500) }
    },

    update : async (req, res) => {
        try {   
            const { name, age, email } = req.body;            
            await userSchema.findByIdAndUpdate(req.params.id, { name, age, email })

            data ={
                status : 200,
                descripcion : "SUCCESSFUL_UPDATE",
                users : req.body
            }
            res.send(data)            
        } catch (error) { handleHttpError.httpError(res, "INTERNAL_SERVER_ERROR", 500)} 
    },

    delete : async (req, res) => {
        try {
            const deleteUser = await userSchema.findByIdAndDelete(req.params.id)
            console.log(deleteUser)

            if(deleteUser== null) return handleHttpError.httpError(res, "NOT_EXIST_INFOMATION_BD", 404)

            data ={
                    status : 200,
                    descripcion : "SUCCESSFUL_DELETE",
                    users : deleteUser
                }

            res.send(data)
            
        } catch (error) {handleHttpError.httpError(res, "INTERNAL_SERVER_ERROR", 500)}
        
    }
}

module.exports = mainController;