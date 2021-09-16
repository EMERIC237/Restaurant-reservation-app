
const tables = require("../data/01-SeedTables")
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tables').del()
    .then(function () {
      // Inserts seed entries
      return knex('tables').insert([
        
      ]);
    });
};
