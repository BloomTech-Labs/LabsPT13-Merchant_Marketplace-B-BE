const express = require('express');
const authRequired = require('../middleware/authRequired');
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
router.get('/:id', authRequired, async (req, res) => {
  const { id } = req.params;

  try {
    let product = await findBy(TABLE_NAME, { id });

    product
      ? res.status(200).json(product)
      : res.status(404).json({ message: `Could not find product '${id}'` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
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
  const product = req.body;

  if (Object.keys(product).length > 0) {
    const id = product.id || 0;
    findBy(TABLE_NAME, { id })
      .then(update(TABLE_NAME, product, { id }))
      .then((updated) => {
        res.status(200).json({ message: 'Product updated', product: updated });
      })
      .catch((err) => {
        res.status(500).json({
          message: `Could not update product '${id}'`,
          error: err.message,
        });
      });
  } else {
    res.status(404).json({ message: 'Product info missing' });
  }
});

router.delete('/:id', authRequired, async (req, res) => {
  const id = req.params.id;

  try {
    let product = await findBy(TABLE_NAME, { id });

    if (Object.keys(product).length > 0) {
      remove(TABLE_NAME, { id: product.id }).then(() => {
        res
          .status(200)
          .json({ message: `Product '${id}' was deleted.`, product });
      });
    } else {
      res.status(404).json({
        message: `Could not find product with ID: ${id}`,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `Could not delete product with ID: ${id}`,
      error: err.message,
    });
  }
});

module.exports = router;
