/**
 * services for the tables controllers.
 * @type {service}
 */
const knex = require("../db/connection");

function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}
function read(table_id) {
  return knex("table").select("*").where({ table_id }).first();
}
function list() {
  return knex("tables").select("*").groupBy("table_name").orderBy("table_name");
}
function update(table_id, reservation_id) {
  return knex("tables")
    .select("*")
    .where({ table_id })
    .update(reservation_id, "reservation_id")
    .then((updatedRecords) => updatedRecords[0]);
}

function unAssign(table_id) {
  return knex("tables")
    .select("*")
    .where({ table_id })
    .update(null, "reservation_id")
    .then((updatedRecords) => updatedRecords[0]);
}
module.exports = {
  create,
  read,
  list,
  update,
  unAssign
};
