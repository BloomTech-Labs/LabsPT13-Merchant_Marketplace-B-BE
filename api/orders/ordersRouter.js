const express = require('express');
const router = express.Router();
const authRequired = require('../middleware/authRequired');
const validateId = require('../middleware/validateId');
const validateBody = require('../middleware/validateBody');
const {
  findAllBy,
  findBy,
  create,
  update,
  remove,
} = require('../globalDbModels');

const TABLE_NAME = 'orders';

// retrieve buyer's orders
router.get('/:id', authRequired, validateId('profiles'), async (req, res) => {
  try {
    const { id } = req.params;
    // get all the orders for the specified user
    let orders = await findAllBy(TABLE_NAME, { profile_id: id });

    // for each order, get its product data, including images and the seller data
    for (let i = 0; i < orders.length; i++) {
      let product = await findBy('products', { id: orders[i].product_id });
      let images = await findAllBy('products_images', {
        product_id: orders[i].product_id,
      });
      let seller = await findBy('profiles', { id: product.profile_id });

      // now format the order to have the product and seller data
      orders[i] = { ...orders[i], seller, product: { ...product, images } };
    }

    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// create a new order
router.post('/', authRequired, validateBody, async (req, res) => {
  try {
    const profile = await findBy('profiles', { id: req.body.profile_id });
    const product = await findBy('products', { id: req.body.product_id });

    if (profile && product) {
      const inserted = await create(TABLE_NAME, req.body);
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

// update the specified order
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
      console.log(err);
      res.status(500).json({
        message: `Could not update order with ID: ${req.order.id}`,
        error: err.message,
      });
    }
  }
);

// delete the specified order
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
      console.log(err);
      res.status(500).json({
        message: `Could not delete order with ID: ${req.order.id}`,
        error: err.message,
      });
    }
  }
);

module.exports = router;
