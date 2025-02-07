const knex = require('../db/knex');

class Product {
  static create(data) {
    return knex('products').insert(data).returning('*');
  }

  static getAll(filters = {}) {
    const query = knex('products');

    // Kategori filtresi
    if (filters.category) {
      query.where('category_id', filters.category);
    }

    // Silinmiş ürünler için filtreleme
    if (filters.showDeleted === 'true') {
      // Silinmiş olanlar dahil tüm ürünleri getir
    } else if (filters.onlyDeleted === 'true') {
      // Sadece silinmiş ürünleri getir
      query.whereNotNull('deleted_at');
    } else {
      // Silinmemiş ürünleri getir
      query.whereNull('deleted_at');
    }

    return query;
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