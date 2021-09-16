const reservationsService = require("./reservations.service");
const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const VALID_PROPERTIES = [
  "reservation_id").primary();
  table.string("first_name").notNullable();
  table.string("last_name").notNullable();
  table.string("mobile_number").notNullable();
  table.date("reservation_date").notNullable();
  table.time("reservation_time").notNullable();
  table.integer("people").notNullable();
]
/**
 * List handler for reservation resources
 */
async function list(req, res) {
  res.json({
    data: [],
  });
}

async function create(req, res) {}

module.exports = {
  list,
};
