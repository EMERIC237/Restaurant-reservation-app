
exports.up = function(knex) {
  return knex.schema.createTable("tables",(table) => {
      table.increments('table_id').primary();
      table.string('tablename').notNullable();
      table.string('email').notNullable().unique();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  
};
