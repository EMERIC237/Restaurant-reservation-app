const reservationsService = require("./reservations.service");
const hasProperties = require("../errors/hasProperties");
const asyncEr = require('asyncEr');
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
