/**
 * Validate functions for my tables controllers
 */
const hasProperties = require("../errors/hasProperties");
const VALID_PROPERTIES = ["table_name", "capacity"];

const hasRequiredProperties = hasProperties(...VALID_PROPERTIES);

function isReservationSeated(req, res, next) {
  if (res.locals.reservation.status === "seated") {
    return next({
      status: 400,
      message: `The reservation is already seated`,
    });
  }
  next();
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
module.exports = {
  hasRequiredProperties,
  isReservationSeated,
  hasValidProperties,
  hasValidUpdateProperties,
  isTableFree,
  isTableOccupied,
  isCapacityEnough,
};
