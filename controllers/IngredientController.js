const Ingredient = require('../models/Ingredient');

class IngredientController {
  static async create(req, res) {
    try {
      const ingredient = await Ingredient.create(req.body);
      res.status(201).json(ingredient);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const ingredients = await Ingredient.getAll(req.query);
      res.status(200).json(ingredients);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const ingredient = await Ingredient.getById(req.params.id);
      if (!ingredient) {
        return res.status(404).json({ error: 'Ingredient not found' });
      }
      res.status(200).json(ingredient);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const ingredient = await Ingredient.update(req.params.id, req.body);
      if (!ingredient) {
        return res.status(404).json({ error: 'Ingredient not found' });
      }
      res.status(200).json(ingredient);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const ingredient = await Ingredient.delete(req.params.id);
      if (!ingredient) {
        return res.status(404).json({ error: 'Ingredient not found' });
      }
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = IngredientController; 