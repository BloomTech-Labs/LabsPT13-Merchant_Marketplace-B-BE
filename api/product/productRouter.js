const express = require('express');
const authRequired = require('../middleware/authRequired');
const router = express.Router();
const Products = require('./productModel');

// retrieve all existing products
router.get('/', authRequired, (req, res) => {
  Products.findAll()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
});

// retrieve a product by the given :id
router.get('/:id', authRequired, (req, res) => {
  const { id } = req.params;

  Products.findById(id)
    .then((product) => {
      product
        ? res.status(200).json(product)
        : res.status(404).json({ error: 'ProductNotFound' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
});

// create a new product
router.post('/', authRequired, async (req, res) => {
  let product = req.body;

  if (Object.keys(product).length > 0) {
    const id = product.id || 0;

    try {
      await Products.findById(id).then(async (pr) => {
        if (pr == undefined) {
          // product not found, so lets insert it
          await Products.create(product).then((product) => {
            res
              .status(201)
              .json({ message: 'Product created', product: product[0] });
          });
        } else {
          res.status(400).json({ message: 'product already exists' });
        }
      });
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
    Products.findById(id)
      .then(Products.update(id, product))
      .then((updated) => {
        res.status(200).json({ message: 'Product updated', product: updated });
      })
      .catch((err) => {
        es.status(500).json({
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
    let product = await Products.findById(id);

    if (Object.keys(product).length > 0) {
      Products.remove(product.id).then(() => {
        res
          .status(200)
          .json({ message: `Product '${id}' was deleted.`, product });
      });
    } else {
      res.status(401).json({
        message: `Could not find product with ID: ${id}`,
        error: err.message,
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
