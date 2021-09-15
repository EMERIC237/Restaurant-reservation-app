/**
 * defines the routers for tables resources
 * 
 * @type
 */
const UserAuthController = require('./../../controllers/index').UserAuthController;

//Require Controller in route file

const express = require('express');
const router = express.Router();

router.post('/login',UserAuthController.Login);
router.post('/signup',UserAuthController.SignUp);

module.exports = router;