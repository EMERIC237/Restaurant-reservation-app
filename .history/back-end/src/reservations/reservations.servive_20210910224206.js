/**
 * Defines the services for reservation controllers.
 *
 * @type {Router}
 */
const knex = require("../db/connection");

function list() {
  return knex("reservations").select("*");
}

function create(reservati) {
    
}