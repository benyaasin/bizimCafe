const knex = require('../db/knex');

class Product {
  static create(data) {
    return knex('products').insert(data).returning('*');
  }

  static getAll(filters = {}) {
    return knex('products').where(filters).whereNull('deleted_at');
  }

  static getById(id) {
    return knex('products').where({ id }).whereNull('deleted_at').first();
  }

  static update(id, data) {
    return knex('products').where({ id }).update(data).returning('*');
  }

  static delete(id) {
    return knex('products').where({ id }).update({ deleted_at: knex.fn.now() }).returning('*');
  }
}

module.exports = Product;