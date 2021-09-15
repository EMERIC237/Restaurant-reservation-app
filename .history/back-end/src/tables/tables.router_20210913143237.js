import { Router } from 'express';

// import all controllers
// import SessionController from './app/controllers/SessionController';

const routes = new Router();

// Add routes
// routes.get('/', SessionController.store);
// routes.post('/', SessionController.store);
// routes.put('/', SessionController.store);
// routes.delete('/', SessionController.store);

module.exports = routes;
const UserAuthController = require('./../../controllers/index').UserAuthController;

//Require Controller in route file

const express = require('express');
const router = express.Router();

router.post('/login',UserAuthController.Login);
router.post('/signup',UserAuthController.SignUp);

module.exports = router;