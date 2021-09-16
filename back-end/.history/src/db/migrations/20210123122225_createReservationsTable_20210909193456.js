exports.up = function (knex) {
  return knex.schema.createTable("reservations", (table) => {
    table.increments("reservation_id").primary();
    table.text("first_name");
    table.text("last_name");
    table.text("mobile_number");
    table.text("reservation_date");
    table.text("reservation_time");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("reservations");
};
