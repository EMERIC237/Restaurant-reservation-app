/**
 * defines the routers for tables resources
 *
 * @type {router}
 */
const controller = require("./tables.controller");

//Require Controller in route file

const express = require("express");
const router = express.Router();
const methodNotAllowed = require("../errors/methodNotAllowed");

router.post
router.post("/signup", UserAuthController.SignUp);

module.exports = router;
