const tablesServices = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const VALID_PROPERTIES = 

async function list(req, res, next) {
  res.json({ data: await tablesServices.list() });
}

async function create(req, res, next) {
  const data = await tablesServices.create(req.body.data);
  res.status(201).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [asyncErrorBoundary(create)],
};
