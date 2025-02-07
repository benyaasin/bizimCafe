const knex = require('../db/knex');

class Category {
  static create(data) {
    return knex('categories').insert(data).returning('*');
  }

  static getAll(filters = {}) {
    return knex('categories').where(filters).whereNull('deleted_at');
  }

  static getById(id) {
    return knex('categories').where({ id }).whereNull('deleted_at').first();
  }

  static update(id, data) {
    return knex('categories').where({ id }).update(data).returning('*');
  }

  static delete(id) {
    return knex('categories').where({ id }).update({ deleted_at: knex.fn.now() }).returning('*');
  }
}

module.exports = Category;