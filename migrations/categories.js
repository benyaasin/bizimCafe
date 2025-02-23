/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('categories', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.timestamps(true, true);
    table.timestamp('deleted_at').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('categories');
}; 
if (filters.isAllergen) {
  query.where('is_allergen', filters.isAllergen === 'true' ? 1 : 0);
} 