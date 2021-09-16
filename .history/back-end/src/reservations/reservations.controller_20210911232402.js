const reservationsService = require("./reservations.service");
const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const VALID_PROPERTIES = [
  "reservation_id",
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

function dateValidation(req, res, next) {
  const DateParams = req.query.date;
  let today = new Date();
  const todayDate = today.toISOString().split("T")[0];
  //try to create a date object if the format is correct
  try {
    const  = new type(arguments); req.query.date
      ? new Date(req.query.date)
      : todayDate;
  } catch (error) {
    next(error);
  }

  const reservation_date = req.query.date
    ? new Date(req.query.date)
    : todayDate;

  if (reservation_date.getDay() == 2) {
  }
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
  const { date = todayDate } = req.query;
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
    asyncErrorBoundary(create),
  ],
};
