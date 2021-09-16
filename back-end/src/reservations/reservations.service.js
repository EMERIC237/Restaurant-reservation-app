/**
 * Defines the services for reservation controllers.
 *
 * @type {services}
 */
const knex = require("../db/connection");

// function list() {
//   return knex("reservations").select("*");
// }
function read(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}
function listPerDate(date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date })
    .andWhereNot("status", "finished")
    .orderBy("reservation_time");
}

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function updateStatus(reservation_id, status) {
  return knex("reservations")
    .where({ reservation_id })
    .update({ status }, ["reservation_id", "status"])
    .then((createdRecords) => createdRecords[0]);
}

module.exports = {
  create,
  read,
  updateStatus,
  listPerDate,
};
