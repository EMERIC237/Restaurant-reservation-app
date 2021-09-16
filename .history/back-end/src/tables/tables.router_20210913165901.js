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


router.route("/:table_id/seat/")
router.route("/new").post(controller.create).all(methodNotAllowed);
router.post("/").get(controller.list).all(methodNotAllowed);

module.exports = router;
