const mongoose = require('mongoose');
require("dotenv").config();

const connectToBD = async () => {
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected")
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectToBD;