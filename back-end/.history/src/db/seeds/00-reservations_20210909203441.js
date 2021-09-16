const reservations = require("../data/00-SeedReservations");

exports.seed = function (knex) {
  rn knex("reservations").insert(reservations);
    });return knex
    .raw("TRUNCATE TABLE reservations RESTART IDENTITY CASCADE")
    .then(function () {
      retu
};
