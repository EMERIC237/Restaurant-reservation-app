
exports.up = function(knex) {
  return knex.schema.createTable("tables",(table) => {
      table.increments('table_id').primary();
      table.string('table_name').notNullable();
      table.integer('capacity').notNullable();
      table
      .foreign("reservation_id")
      .references("reservation_id")
      .inTable("reservations")
      .onD

      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  
};
