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
  } else if (capacity < 1) {
    return next({
      status: 400,
      message: "The capacity of a table should be more than 1",
    });
  }
  next();
}
async function list(req, res, next) {
  res.json({ data: await tablesServices.list() });
}

async function tableExists(req, res, next) {
  const table = await tablesServices.read(req.params.supplierId);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({ status: 404, message: `Table cannot be found.` });
}

async function create(req, res, next) {
  const data = await tablesServices.create(req.body.data);
  res.status(201).json({ data });
}

async function update(req,res,next) {
  const reservation_id = req.body
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasRequiredProperties,
    hasValidProperties,
    asyncErrorBoundary(create),
  ],
};
