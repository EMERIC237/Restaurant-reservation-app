/**
 * Defines the services for reservation controllers.
 *
 * @type {services}
 */
const knex = require("../db/connection");
const TableName = "reservations";
// function list() {
//   return knex("reservations").select("*");
// }
function read(reservation_id) {
  return knex(TableName).select("*").where({ reservation_id }).first();
}
function listPerDate(date) {
  return knex(TableName)
    .select("*")
    .where({ reservation_date: date })
    .andWhereNot("status", "finished")
    .orderBy("reservation_time");
}

function create(reservation) {
  return knex(TableName)
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function updateStatus(reservation_id, status) {
  return knex(TableName)
    .where({ reservation_id })
    .update({ status }, ["reservation_id", "status"])
    .then((createdRecords) => createdRecords[0]);
}

function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}
function update(updatedReservation) {
  return knex(TableName)
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, "*")
    .then((updateRecords) => updateRecords[0]);
}
module.exports = {
  create,
  read,
  update,
  updateStatus,
  listPerDate,
  search,
};
