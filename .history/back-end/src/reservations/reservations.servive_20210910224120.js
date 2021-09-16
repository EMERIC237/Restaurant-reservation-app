/**
 * Defines the services for reservation con.
 *
 * @type {Router}
 */
const knex = require("../db/connection");

function list() {
    return knex("reservations").select("*")
}