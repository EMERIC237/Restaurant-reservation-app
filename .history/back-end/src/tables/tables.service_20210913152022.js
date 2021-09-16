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
function list() {
  return knex("tables").select("*").groupBy("table_name").orderBy("table_name");
}
function update(table_id, reservation_id) {
  return knex("tables").select("*").where({ table_id });
}
module.exports = {
  create,
  list,
};
