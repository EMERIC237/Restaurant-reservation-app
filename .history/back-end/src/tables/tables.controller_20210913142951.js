const tablesServices = require("./tables.service");
const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const VALID_PROPERTIES = ["table_name", "capacity"];

const hasRequiredProperties = hasProperties(...VALID_PROPERTIES);

function hasValidProperties(req, res, next) {
  const { table_name, capacity } = req.body;
  if (table_name.length < 2) {
    return next({
      status: 400,
      message: "The table name must have at least 2 characters",
    });
  }else
}
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
