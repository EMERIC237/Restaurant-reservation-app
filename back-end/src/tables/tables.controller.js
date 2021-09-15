const tablesServices = require("./tables.service");
const readReservation = require("../reservations/reservations.service").read;
const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const VALID_PROPERTIES = ["table_name", "capacity"];

const hasRequiredProperties = hasProperties(...VALID_PROPERTIES);

async function reservationExists(req, res, next) {
  const { reservation_id } = req.body.data;
  const reservation = await readReservation(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `reservation with id ${reservation_id} doesn't exist.`,
  });
}

async function tableExists(req, res, next) {
  const { table_id } = req.params;
  const table = await tablesServices.read(table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({ status: 404, message: `Table with if ${table_id} doesn't exist.` });
}

function hasValidProperties(req, res, next) {
  const { table_name, capacity } = req.body.data;
  if (table_name.length < 2) {
    return next({
      status: 400,
      message: "The table_name must have at least 2 characters",
    });
  }
  if (typeof capacity !== "number") {
    return next({
      status: 400,
      message: "The capacity of a table should be a number",
    });
  } else if (capacity < 1) {
    return next({
      status: 400,
      message: "The capacity of a table should be more than one",
    });
  }
  next();
}

function hasValidUpdateProperties(req, res, next) {
  const { data = {} } = req.body;
  if (!data) {
    return next({
      status: 400,
      message: "The data is missing",
    });
  }
  if (!data.reservation_id) {
    return next({
      status: 400,
      message: "The reservation_id property is missing",
    });
  }
  next();
}
function isTableFree(req, res, next) {
  if (res.locals.table.reservation_id !== null) {
    return next({
      status: 400,
      message: "The table is occupied",
    });
  }
  next();
}

function isTableOccupied(req, res, next) {
  if (res.locals.table.reservation_id === null) {
    return next({
      status: 400,
      message: "The table is not occupied",
    });
  }
  next();
}

function isCapacityEnough(req, res, next) {
  if (res.locals.reservation.people > res.locals.table.capacity) {
    return next({
      status: 400,
      message: "The table capacity is not enough",
    });
  }
  next();
}

async function list(req, res, next) {
  res.json({ data: await tablesServices.list() });
}

async function create(req, res, next) {
  const data = await tablesServices.create(req.body.data);
  res.status(201).json({ data });
}

async function update(req, res, next) {
  const { reservation_id } = req.body.data;
  const table_id = res.locals.table.table_id;
  const data = await tablesServices.update(table_id, reservation_id);
  res.json({ data });
}

async function unAssign(req, res, next) {
  const table_id = res.locals.table.table_id;
  const data = await tablesServices.unAssign(table_id);
  res.json({ data });
}
module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasRequiredProperties,
    hasValidProperties,
    asyncErrorBoundary(create),
  ],
  update: [
    hasValidUpdateProperties,
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(tableExists),
    isTableFree,
    isCapacityEnough,
    asyncErrorBoundary(update),
  ],
  unAssign: [
    asyncErrorBoundary(tableExists),
    isTableOccupied,
    asyncErrorBoundary(unAssign),
  ],
};
