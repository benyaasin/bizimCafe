const express = require('express');
const app = express();
const categoriesRouter = require('./routes/categories');
const productsRouter = require('./routes/products');
const ingredientsRouter = require('./routes/ingredients');
const productIngredientsRouter = require('./routes/product_ingredients');

app.use(express.json());

app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);
app.use('/ingredients', ingredientsRouter);
app.use('/', productIngredientsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;