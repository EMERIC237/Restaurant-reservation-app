const reservationsService = require("./reservations.service");
const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];
const VALID_STATUS = ["booked", "seated", "finished", "cancelled"];

const isDate = (dateStr) => {
  return (
    dateStr.length >= 10 &&
    new Date(dateStr) !== "Invalid Date" &&
    !isNaN(new Date(dateStr))
  );
};

const dateInPast = (dateToTest) => {
  return dateToTest.setHours(0, 0, 0, 0) <= new Date().setHours(0, 0, 0, 0);
};

const isTime = (timeStr) => {
  if (timeStr.search(/^\d{2}:\d{2}$/) != -1) {
    return (
      timeStr.substr(0, 2) >= 0 &&
      timeStr.substr(0, 2) <= 24 &&
      timeStr.substr(3, 2) >= 0 &&
      timeStr.substr(3, 2) <= 59
    );
  } else if (timeStr.search(/^\d{2}:\d{2}:\d{2}$/) != -1) {
    return (
      timeStr.substr(0, 2) >= 0 &&
      timeStr.substr(0, 2) <= 24 &&
      timeStr.substr(3, 2) >= 0 &&
      timeStr.substr(3, 2) <= 59 &&
      timeStr.substr(6, 2) >= 0 &&
      timeStr.substr(6, 2) <= 59
    );
  } else {
    return false;
  }
};

function hasValidDate(req, res, next) {
  const { data = {} } = req.body;
  let today = new Date();
  if (!isDate(data.reservation_date)) {
    return next({
      status: 400,
      message: "reservation_date must be a valid date",
    });
  }
  const formattedDate = data.reservation_date.split("-").reverse().join("-");

  const reservation_date = data.reservation_date
    ? new Date(formattedDate)
    : today;

  if (reservation_date.getDay() == 2) {
    return next({
      status: 400,
      message: "The restaurant is closed on Tuesdays",
    });
  }
  if (dateInPast(reservation_date)) {
    return next({
      status: 400,
      message: "reservations can only be in the future",
    });
  }
  next();
}

function hasValidTime(req, res, next) {
  const { data = {} } = req.body;
  let reservation_time = data.reservation_time;
  if (!isTime(reservation_time)) {
    return next({
      status: 400,
      message: "reservation_time must be a valid time format",
    });
  }
  if (reservation_time < "10:30") {
    return next({
      status: 400,
      message: "The restaurant open at 10:30 AM",
    });
  }
  if (reservation_time > "21:30") {
    return next({
      status: 400,
      message: "The restaurant will close soon !",
    });
  }
  next();
}

function hasValidNumber(req, res, next) {
  const { data } = req.body;
  if (typeof data.people !== "number") {
    return next({
      status: 400,
      message: "The people value should be a number",
    });
  }
  if (data.people === 0) {
    return next({
      status: 400,
      message: "The people number can't be zero",
    });
  }
  next();
}

const hasRequiredProperties = hasProperties(...VALID_PROPERTIES);

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;
  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field) && field !== "status"
  );
  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}
function hasValidPostStatus(req, res, next) {
  const { status } = req.body.data;
  if (status === "finished" || status === "seated") {
    return next({
      status: 400,
      message:
        "A reservation cannot be created with a seated or finished status",
    });
  }
  next();
}
function hasValidStatus(req, res, next) {
  const { status } = req.body.data;
  const currentStatus = res.locals.reservation.status;
  if (status && !VALID_STATUS.includes(status)) {
    return next({
      status: 400,
      message: "This is an unknown status",
    });
  }
  if (currentStatus === "finished") {
    return next({
      status: 400,
      message: "A finished reservation can't be updated",
    });
  }
  next();
}

/**
 * List handler for reservation resources
 */
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
    const date = req.query.date ? req.query.date : todayDate;
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
