const express = require('express');
const authRequired = require('../middleware/authRequired');
const Products = require('./productModel');
const router = express.Router();

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
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ error: 'ProductNotFound' });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
