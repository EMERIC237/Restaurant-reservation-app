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

router.route("/new").post(controller.cr)
router.post("/signup", UserAuthController.SignUp);

module.exports = router;