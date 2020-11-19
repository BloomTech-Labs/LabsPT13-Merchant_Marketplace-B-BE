const express = require('express');
const authRequired = require('../middleware/authRequired');
const Products = require('./productModel');
const router = express.Router();

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

module.exports = router;
