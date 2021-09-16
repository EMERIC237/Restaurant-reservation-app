/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */
const knex = require("../db/connection");

function list() {
    return knex("reservations").select("*")
}