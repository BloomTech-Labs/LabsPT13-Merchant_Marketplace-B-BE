const express = require('express');
const authRequired = require('../middleware/authRequired');
const validateId = require('../middleware/validateId');
const router = express.Router();
const Products = require('./productModel');
const { findAll, findBy, update, remove } = require('../globalDbModels');

const TABLE_NAME = 'products';

// retrieve all existing products
router.get('/', authRequired, (req, res) => {
  findAll(TABLE_NAME)
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
});

// retrieve a product by the given :id
router.get('/:id', authRequired, validateId(TABLE_NAME), async (req, res) => {
  res.status(200).json(req.product);
});

// create a new product
router.post('/', authRequired, async (req, res) => {
  let product = req.body;

  if (Object.keys(product).length > 0) {
    try {
      let createdProduct = await Products.create(product);
      res
        .status(201)
        .json({ message: 'Product created', product: createdProduct[0] });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(404).json({
      message: 'Product info missing',
    });
  }
});

router.put('/', authRequired, async (req, res) => {
  const changes = req.body;

  if (Object.keys(changes).length > 0) {
    const id = changes.id || 0;
    try {
      const product = await findBy(TABLE_NAME, { id });

      if (product) {
        const updated = await update(TABLE_NAME, changes, { id });
        res.status(200).json({ message: 'Product updated', product: updated });
      } else {
        res
          .status(404)
          .json({ message: 'Could not find the specified product' });
      }
    } catch (err) {
      res.status(500).json({
        message: `Could not update product '${id}'`,
        error: err.message,
      });
    }
  } else {
    res.status(404).json({ message: 'Product info missing' });
  }
});

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
      res.status(500).json({
        message: `Could not delete product with ID: ${req.product.id}`,
        error: err.message,
      });
    }
  }
);

module.exports = router;
