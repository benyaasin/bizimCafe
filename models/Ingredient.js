const knex = require('../db/knex');

class Ingredient {
  static create(data) {
    return knex('ingredients').insert(data).returning('*');
  }

  static getAll(filters = {}) {
    return knex('ingredients').where(filters).whereNull('deleted_at');
  }

  static getById(id) {
    return knex('ingredients').where({ id }).whereNull('deleted_at').first();
  }

  static update(id, data) {
    return knex('ingredients').where({ id }).update(data).returning('*');
  }

  static delete(id) {
    return knex('ingredients').where({ id }).update({ deleted_at: knex.fn.now() }).returning('*');
  }
}

module.exports = Ingredient;