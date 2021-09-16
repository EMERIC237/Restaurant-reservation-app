const reservationsService = require("./reservations.service");
const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const VALID_PROPERTIES = [
  "reservation_id"
  "first_name").notNullable();
  "last_name").notNullable();
  "mobile_number").notNullable();
  "reservation_date").notNullable();
  "reservation_time").notNullable();
  "people").notNullable();
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
