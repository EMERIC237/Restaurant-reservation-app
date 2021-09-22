/**
 * Defines the controllers for route /reservations
 */
const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const {
  hasValidDate,
  hasValidTime,
  hasValidNumber,
  hasValidPostStatus,
  hasValidStatus,
  hasRequiredProperties,
  hasOnlyValidProperties,
} = require("../validations/reservation_validator");

async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;
  const reservation = await reservationsService.read(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `reservation with id ${reservation_id} could not be found.`,
  });
}

function read(req, res) {
  const { reservation: data } = res.locals;
  res.json({ data });
}

async function list(req, res, next) {
  const { mobile_number } = req.query;
  if (mobile_number) {
    const data = await reservationsService.search(mobile_number);
    res.json({ data });
  } else {
    const todayDate = new Date();
    const todayDateStr = todayDate.toISOString().slice(0, 10);
    const date = req.query.date ? req.query.date : todayDateStr;
    res.json({
      data: await reservationsService.listPerDate(date),
    });
  }
}

async function create(req, res, next) {
  const data = await reservationsService.create(req.body.data);
  res.status(201).json({ data });
}

async function updateStatus(req, res, next) {
  const { reservation_id } = res.locals.reservation;
  const { status } = req.body.data;
  const data = await reservationsService.updateStatus(reservation_id, status);
  res.json({ data });
}

async function update(req, res, next) {
  const updatedReservation = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  };
  const data = await reservationsService.update(updatedReservation);
  res.json({ data });
}
module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(reservationExists), read],
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    hasValidDate,
    hasValidTime,
    hasValidNumber,
    hasValidPostStatus,
    asyncErrorBoundary(create),
  ],
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    hasValidStatus,
    asyncErrorBoundary(updateStatus),
  ],
  update: [
    asyncErrorBoundary(reservationExists),
    hasValidStatus,
    hasRequiredProperties,
    hasValidDate,
    hasValidTime,
    hasValidNumber,
    asyncErrorBoundary(update),
  ],
};
