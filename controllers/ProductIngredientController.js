const knex = require('../db/knex');

class ProductIngredientController {
  // Bir ürüne malzeme ekleme
  static async addIngredient(req, res) {
    try {
      const { productId, ingredientId } = req.params;

      // Ürün ve malzemenin var olup olmadığını kontrol et
      const product = await knex('products').where({ id: productId }).first();
      const ingredient = await knex('ingredients').where({ id: ingredientId }).first();

      if (!product || !ingredient) {
        return res.status(404).json({ error: 'Ürün veya malzeme bulunamadı' });
      }

      // İlişkiyi kontrol et (zaten eklenmiş mi?)
      const existing = await knex('product_ingredients')
        .where({ product_id: productId, ingredient_id: ingredientId })
        .first();

      if (existing) {
        return res.status(400).json({ error: 'Bu malzeme zaten ürüne eklenmiş' });
      }

      // Malzemeyi ürüne ekle
      await knex('product_ingredients').insert({
        product_id: productId,
        ingredient_id: ingredientId
      });

      res.status(201).json({ message: 'Malzeme başarıyla eklendi' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Bir üründen malzeme çıkarma
  static async removeIngredient(req, res) {
    try {
      const { productId, ingredientId } = req.params;

      const deleted = await knex('product_ingredients')
        .where({
          product_id: productId,
          ingredient_id: ingredientId
        })
        .del();

      if (!deleted) {
        return res.status(404).json({ error: 'İlişki bulunamadı' });
      }

      res.status(200).json({ message: 'Malzeme başarıyla çıkarıldı' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Bir ürünün malzemelerini listeleme
  static async getProductIngredients(req, res) {
    try {
      const { productId } = req.params;

      const ingredients = await knex('ingredients')
        .join('product_ingredients', 'ingredients.id', 'product_ingredients.ingredient_id')
        .where('product_ingredients.product_id', productId)
        .whereNull('ingredients.deleted_at')
        .select('ingredients.*');

      res.status(200).json(ingredients);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProductIngredientController; 