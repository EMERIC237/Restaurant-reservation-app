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

const isDate = (dateStr) => {
  return (
    dateStr.length > 10 &&
    new Date(dateStr) !== "Invalid Date" &&
    !isNaN(new Date(dateStr))
  );
};

const dateInPast = (dateToTest) => {
  return dateToTest.setHours(0, 0, 0, 0) <= today.setHours(0, 0, 0, 0);
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
  const today = new Date();
  console
  if (!isDate(data.reservation_date)) {
    return next({
      status: 400,
      message: "reservation_date must be a valid date",
    });
  }

  const reservation_date = data.reservation_date
    ? new Date(data.reservation_date)
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
      message: "Can't make a reservation in the past",
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
  if (isNaN(data.people)) {
    return next({
      status: 400,
      message: "The people number should be a number",
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
    (field) => !VALID_PROPERTIES.includes(field)
  );
  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

/**
 * List handler for reservation resources
 */
async function listPerDate(req, res, next) {
  let todayDate = new Date();
  const date = req.query.date ? req.query.date : todayDate;
  res.json({
    data: await reservationsService.listPerDate(date),
  });
}

async function create(req, res, next) {
  const data = await reservationsService.create(req.body.data);
  res.status(201).json({ data });
}

module.exports = {
  listPerDate: asyncErrorBoundary(listPerDate),
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    hasValidDate,
    hasValidTime,
    hasValidNumber,
    asyncErrorBoundary(create),
  ],
};
