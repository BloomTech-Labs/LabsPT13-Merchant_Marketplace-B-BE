const express = require('express');
const router = express.Router();
const authRequired = require('../middleware/authRequired');
const validateId = require('../middleware/validateId');
const validateBody = require('../middleware/validateBody');
const { remove } = require('../globalDbModels');
const Products_sales = require('./products_salesModel');

const TABLE_NAME = 'products_sales';

// retrieve reviews by product_id
router.get('/:product_id', authRequired, validateId(TABLE_NAME), (req, res) => {
  res.status(200).json(req.order);
});

// create a new review
router.post('/', authRequired, validateBody, async (req, res) => {
  const products_sales = req.body;

  try {
    const created = await Products_sales.create(products_sales);
    res
      .status(201)
      .json({ message: 'Products_sales created', products_sales: created[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});
// delete a Products_sales
router.delete('/:product_id', authRequired, async (req, res) => {
  const { product_id = 0 } = req.params;

  try {
    const item = await Products_sales.findProductSales(product_id);

    if (item) {
      await remove('products_sales', { product_id });
      res.status(200).json({ message: 'Products_sales deleted' });
    } else {
      res.status(404).json({
        message: 'Could not find the specified Product sales data',
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: `Could not remove the product sales data at the moment`,
      error: err.message,
    });
  }
});
module.exports = router;
