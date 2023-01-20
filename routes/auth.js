var express = require('express');
var router = express.Router();
var auth = require("../controllers/mainAuth");
const {validatorRegister, validatorLogin} = require("../validators/validatorAuth");

//TODO:http://localhost:3001/api/auth/login
router.post('/login', validatorLogin, auth.Login);

//TODO:http://localhost:3001/api/auth/register
router.post('/register', validatorRegister, auth.Register);

module.exports = router;
