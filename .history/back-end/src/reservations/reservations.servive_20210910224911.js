/**
 * Defines the services for reservation controllers.
 *
 * @type {services}
 */
const knex = require("../db/connection");

function list() {
  return knex("reservations").select("*");
}

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

import { Model } from 'sequelize';

class Reservations.servive extends Model {
  static init(sequelize) {
    super.init(
      {}, // attributes
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Reservations.servive;


