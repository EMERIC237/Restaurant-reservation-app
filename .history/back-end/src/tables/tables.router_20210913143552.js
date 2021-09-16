/**
 * defines the routers for tables resources
 * 
 * @type {router}
 */
const controller = require('./.').UserAuthController;

//Require Controller in route file

const express = require('express');
const router = express.Router();

router.post('/login',UserAuthController.Login);
router.post('/signup',UserAuthController.SignUp);

module.exports = router;