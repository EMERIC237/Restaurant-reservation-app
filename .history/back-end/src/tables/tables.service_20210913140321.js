?
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

