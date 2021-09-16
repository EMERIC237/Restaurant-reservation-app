const tablesServices = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  res.json({ data: await tablesServices.list() });
}

async function create(req,res,next){
    const data = await tablesServices.create(req.body.data)
}