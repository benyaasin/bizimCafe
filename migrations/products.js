/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('products', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.text('description').nullable();
    table.integer('category_id').unsigned().references('id').inTable('categories').onDelete('CASCADE');
    table.decimal('price', 10, 2).notNullable();
    table.timestamps(true, true);
    table.timestamp('deleted_at').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('products');
}; 