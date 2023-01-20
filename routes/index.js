var express = require('express');
var router = express.Router();
var authMiddleware = require("../middleware/authMiddleware");
var rolMiddleware = require("../middleware/rolMiddleware")
var mainController = require('../controllers/mainControllers');
const {validatorUsers} = require("../validators/validatorUsers");
const cacheInit = require("../middleware/cacheMiddleware")

/* GET home page. */
router.post('/create',  validatorUsers, authMiddleware, rolMiddleware(["admin"]), mainController.create);
router.get('/users', authMiddleware, rolMiddleware(["admin"]), cacheInit, mainController.query);
router.put('/usersUpdate/:id', validatorUsers, authMiddleware, rolMiddleware(["admin"]), mainController.update);
router.delete('/usersDelete/:id', authMiddleware, rolMiddleware(["admin"]), mainController.delete);

module.exports = router;
