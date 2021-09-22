/**
 * Validate functions for my reservations controllers
 */
const dayjs = require("dayjs");
const hasProperties = require("../errors/hasProperties");
const VALID_STATUS = ["booked", "seated", "finished", "cancelled"];
const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

const hasRequiredProperties = hasProperties(...VALID_PROPERTIES);

const isDate = (dateStr) => {
  let day1 = dayjs(dateStr);
  return day1.isValid();
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

function hasValidDate(req, res, next) {
  const { data = {} } = req.body;
  let today = new Date();
  let testDay = dayjs(data.reservation_date);
  if (!isDate(data.reservation_date)) {
    return next({
      status: 400,
      message: "reservation_date must be a valid date",
    });
  }

  const ToCheckPastDate = data.reservation_date
    ? new Date(data.reservation_date)
    : today;

  if (testDay.format("dddd") === "Tuesday") {
    return next({
      status: 400,
      message: "The restaurant is closed on Tuesdays",
    });
  }
  if (dateInPast(ToCheckPastDate)) {
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

module.exports = {
  hasValidDate,
  hasValidTime,
  hasValidNumber,
  hasValidPostStatus,
  hasValidStatus,
  hasRequiredProperties,
  hasOnlyValidProperties,
};
