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
  return knex("tables").select("*").where({ table_id }).first();
}
function list() {
  return knex("tables").select("*").orderBy("table_name");
}
function update(table_id, reservation_id) {
  return knex("tables as t")
    .join("reservations as r, t.reservation_id,r.reservation_id")
    .where({ "t.table_id": table_id })
    .update({ "t.reservation_id": reservation_id, "r.status": "seated" }, [
      "table_id",
      "reservation_id",
    ]);
}

function unAssign(table_id) {
  return knex("tables")
    .where({ table_id })
    .update({ reservation_id: null }, ["table_id", "reservation_id"]);
}
module.exports = {
  create,
  read,
  list,
  update,
  unAssign,
};
