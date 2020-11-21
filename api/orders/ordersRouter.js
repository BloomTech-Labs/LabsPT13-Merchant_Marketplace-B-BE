const express = require('express');
const router = express.Router();
const authRequired = require('../middleware/authRequired');
const validateId = require('../middleware/validateId');
const validateBody = require('../middleware/validateBody');
const { findAll, findBy, update, remove } = require('../globalDbModels');
const Orders = require('./ordersModel');

const TABLE_NAME = 'orders';

router.get('/', authRequired, async (req, res) => {
  const orders = await findAll(TABLE_NAME);
  res.status(200).json(orders);
});

router.get('/:id', authRequired, validateId(TABLE_NAME), (req, res) => {
  res.status(200).json(req.order);
});

router.post('/', authRequired, validateBody, async (req, res) => {
  try {
    const profile = await findBy('profiles', { id: req.body.profile_id });
    const product = await findBy('products', { id: req.body.product_id });

    if (profile && product) {
      const inserted = await Orders.create(req.body);
      res.status(201).json({ message: 'Order created', order: inserted[0] });
    } else {
      res
        .status(404)
        .json({ message: 'Could not find the specified product or profile' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.put(
  '/:id',
  authRequired,
  validateId(TABLE_NAME),
  validateBody,
  async (req, res) => {
    const changes = { ...req.body, updated_at: new Date().toISOString() };

    try {
      const updated = await update(TABLE_NAME, changes, { id: req.order.id });
      res.status(200).json({ message: 'Order updated', order: updated });
    } catch (err) {
      res.status(500).json({
        message: `Could not update order with ID: ${req.order.id}`,
        error: err.message,
      });
    }
  }
);

router.delete(
  '/:id',
  authRequired,
  validateId(TABLE_NAME),
  async (req, res) => {
    try {
      await remove(TABLE_NAME, { id: req.order.id });

      res.status(200).json({
        message: `Order '${req.order.id}' was deleted.`,
        order: req.order,
      });
    } catch (err) {
      res.status(500).json({
        message: `Could not delete order with ID: ${req.order.id}`,
        error: err.message,
      });
    }
  }
);

module.exports = router;
