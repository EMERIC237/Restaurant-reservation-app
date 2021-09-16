/**
 * defines the routers for tables resources
 *
 * @type {router}
 */
const controller = require("./tables.controller");

//Require Controller in route file

const express = require("express");
const router = express.Router();
const methodNotAllowed = require("../")

router.post("/login", UserAuthController.Login);
router.post("/signup", UserAuthController.SignUp);

module.exports = router;
