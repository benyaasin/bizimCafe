const knex = require('../db/knex');

class Ingredient {
  static create(data) {
    return knex('ingredients').insert(data).returning('*');
  }

  static getAll(filters = {}) {
    const query = knex('ingredients');

    // Silinmiş malzemeler için filtreleme
    if (filters.showDeleted === 'true') {
      // Silinmiş olanlar dahil tüm malzemeleri getir
    } else if (filters.onlyDeleted === 'true') {
      // Sadece silinmiş malzemeleri getir
      query.whereNotNull('deleted_at');
    } else {
      // Silinmemiş malzemeleri getir
      query.whereNull('deleted_at');
    }

    return query;
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