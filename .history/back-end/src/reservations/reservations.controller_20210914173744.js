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

function hasValidDate(req, res, next) {
  const { data = {} } = req.body;
  let today = new Date();
  //try to create a date object if the format is correct
  try {
    if (data.reservation_date) {
      let tryDate = new Date(req.body.reservation_date);
    }
  } catch (error) {
    return next({
      status: 400,
      message: "reservation_date is not a date",
    });
  }

  const reservation_date = data.reservation_date
    ? new Date(data.reservation_date)
    : today;

  const dateInPast = (dateToTest) => {
    return dateToTest.setHours(0, 0, 0, 0) <= today.setHours(0, 0, 0, 0);
  };

  clg
  if (reservation_date.getDay() == 2) {
    return next({
      status: 400,
      message: "The restaurant is closed on Tuesdays",
    });
  } else if (dateInPast(reservation_date)) {
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
  if (reservation_time < "10:30") {
    return next({
      status: 400,
      message: "The restaurant open at 10:30 AM",
    });
  } else if (reservation_time > "21:30") {
    return next({
      status: 400,
      message: "The restaurant will close soon !",
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
  console.log(date);
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
    asyncErrorBoundary(create),
  ],
};
