/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/date").get(controller.listPerDate).all(methodNotAllowed);
router.route("/new")

module.exports = router;
