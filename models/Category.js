const knex = require('../db/knex');

class Category {
  static create(data) {
    return knex('categories').insert(data).returning('*');
  }

  static getAll(filters = {}) {
    const query = knex('categories');

    if (filters.showDeleted === 'true') {
      // Silinmiş olanlar dahil tüm kategorileri getir
    } else if (filters.onlyDeleted === 'true') {
      // Sadece silinmiş kategorileri getir
      query.whereNotNull('deleted_at');
    } else {
      // Silinmemiş kategorileri getir
      query.whereNull('deleted_at');
    }

    return query;
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