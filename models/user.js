const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
        name : {
            type : String,
            require : true
        },
        age : {
            type : Number,
            require : true
        },
        email : {
            type : String,
            unique : true
        },
        password:{
            type: String
            //select : false
        },
        role:{
            type: ["user", "admin"],
            default: "user"
        }
    }
    ,
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User',userSchema);