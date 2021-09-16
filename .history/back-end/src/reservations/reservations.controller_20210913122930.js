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

function hasValidDate(req, res, next) {
  let today = new Date();
  const todayDate = today.toISOString().split("T")[0];
  //try to create a date object if the format is correct
  try {
    if(req.body.date)
    const tryDate = new Date(req.body.date);
  } catch (error) {
    return next({
      status: 400,
      message: error,
    });
  }

  const reservation_date = req.body.date
    ? new Date(req.body.date)
    : todayDate;

  const dateInPast = (dateToTest) => {
    return dateToTest.setHours(0,0,0,0) <= today.setHours(0,0,0,0) ;
  }
  
  if (reservation_date.getDay() == 2) {

    return next({
      status: 400,
      message: "The restaurant is closed on Tuesdays",
    })
  }else if(dateInPast(reservation_date)){
    return next({
      status: 400,
      message: "Can't make a reservation in the past",
    })
  }
}

function hasValidTime(req,res,next) {
  let reservation_time = req.body.time
  if (reservation_time < "10:30") {
    return next({
      status: 400,
      message: "The restaurant open at 10:30 AM",
    })
  } else if(reservation_time > "21:30") {
    return next({
      status: 400,
      message: "The restaurant open at 10:30 AM",
    })
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
    hasValidDate,
    asyncErrorBoundary(create),
  ],
};
