/**
 * Defines the controllers for route /tables
 */
const tablesServices = require("./tables.service");
const reservationsServices = require("../reservations/reservations.service");
const {
  hasRequiredProperties,
  isReservationSeated,
  hasValidProperties,
  hasValidUpdateProperties,
  isTableFree,
  isTableOccupied,
  isCapacityEnough,
} = require("../validations/tables_validator");

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reservationExists(req, res, next) {
  const { reservation_id } = req.body.data;
  const reservation = await reservationsServices.read(reservation_id);
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

  const tableData = await tablesServices.update(table_id, reservation_id);
  const reservationData = await reservationsServices.updateStatus(
    reservation_id,
    "seated"
  );
  tableData.status = reservationData.status;
  res.json({ tableData });
}

async function unAssign(req, res, next) {
  const { table_id, reservation_id } = res.locals.table;
  const reservationData = await reservationsServices.updateStatus(
    reservation_id,
    "finished"
  );
  const tableData = await tablesServices.unAssign(table_id);
  tableData.status = reservationData.status;
  res.json({ tableData });
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
    isReservationSeated,
    asyncErrorBoundary(update),
  ],
  unAssign: [
    asyncErrorBoundary(tableExists),
    isTableOccupied,
    asyncErrorBoundary(unAssign),
  ],
};
