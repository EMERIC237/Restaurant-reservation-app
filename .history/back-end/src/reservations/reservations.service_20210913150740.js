/**
 * Defines the services for reservation controllers.
 *
 * @type {services}
 */
const knex = require("../db/connection");

// function list() {
//   return knex("reservations").select("*");
// }

function listPerDate(date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date })
    .groupBy("reservation_time")
    .orderBy("reservation_time");
}

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

fun
module.exports = {
  create,
  listPerDate,
};
