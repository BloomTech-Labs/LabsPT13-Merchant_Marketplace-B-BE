const express = require('express');
const router = express.Router();
const Products = require('./productsModel');
const authRequired = require('../middleware/authRequired');
const validateId = require('../middleware/validateId');
const validateBody = require('../middleware/validateBody');
const { findAll, update, remove } = require('../globalDbModels');

const TABLE_NAME = 'products';

// retrieve all existing products
router.get('/', authRequired, async (req, res) => {
  try {
    const products = await findAll(TABLE_NAME);
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// retrieve all available tags
router.get('/tags', authRequired, async (req, res) => {
  try {
    const tags = await Products.getAllTags();
    res.status(200).json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// retrieve a product by the given :id
router.get('/:id', authRequired, validateId(TABLE_NAME), async (req, res) => {
  res.status(200).json(req.product);
});

// create a new product
router.post('/', authRequired, validateBody, async (req, res) => {
  const product = req.body;

  try {
    const created = await Products.create(product);
    res.status(201).json({ message: 'Product created', product: created[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// update the give product
router.put(
  '/:id',
  authRequired,
  validateId(TABLE_NAME),
  validateBody,
  async (req, res) => {
    const changes = { ...req.body, updated_at: new Date().toISOString() };

    try {
      const updated = await update(TABLE_NAME, changes, { id: req.product.id });
      res.status(200).json({ message: 'Product updated', product: updated });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: `Could not update product with ID: ${req.product.id}`,
        error: err.message,
      });
    }
  }
);

// delete the specified product
router.delete(
  '/:id',
  authRequired,
  validateId(TABLE_NAME),
  async (req, res) => {
    try {
      await remove(TABLE_NAME, { id: req.product.id });

      res.status(200).json({
        message: `Product '${req.product.id}' was deleted.`,
        product: req.product,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: `Could not delete product with ID: ${req.product.id}`,
        error: err.message,
      });
    }
  }
);

module.exports = router;
