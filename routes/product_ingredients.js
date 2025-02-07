const express = require('express');
const router = express.Router();
const ProductIngredientController = require('../controllers/ProductIngredientController');

// Bir ürüne malzeme ekleme
router.post('/products/:productId/ingredients/:ingredientId', ProductIngredientController.addIngredient);

// Bir üründen malzeme çıkarma
router.delete('/products/:productId/ingredients/:ingredientId', ProductIngredientController.removeIngredient);

// Bir ürünün malzemelerini listeleme
router.get('/products/:productId/ingredients', ProductIngredientController.getProductIngredients);

module.exports = router; 