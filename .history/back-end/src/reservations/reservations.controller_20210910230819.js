const reservationsService = require("./reservations.service");
const hasProperties = const hasProp = require('hasProp');

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  res.json({
    data: [],
  });
}

async function create(req,res){
  
}

module.exports = {
  list,
};
