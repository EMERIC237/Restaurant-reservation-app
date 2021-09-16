
const tables = require("../data/01-SeedTables")
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex
    .raw("TRUNCATE TABLE reservations RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("reservations").insert(reservations);
    });
};
