const express = require('express');
const router = express.Router();
const authRequired = require('../middleware/authRequired');
const validateBody = require('../middleware/validateBody');
const { getAll, findAll, findItem, create } = require('./wishlistsModel');

const { findBy, remove } = require('../globalDbModels');

// for testing purposes
router.get('/', authRequired, async (req, res) => {
  const savedProducts = await getAll();
  res.status(200).json(savedProducts);
});

// retrieve user's saved items
router.get('/:profile_id', authRequired, async (req, res) => {
  const { profile_id = '' } = req.params;

  try {
    const savedItems = await findAll(profile_id);

    if (savedItems.length) {
      res.status(200).json(savedItems);
    } else {
      res.status(404).json({
        message: `Could not find the specified profile`,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: `Could not retrieve the user's wishlist at the moment`,
      error: err.message,
    });
  }
});

// add user's item to the wishlist
router.post('/', authRequired, validateBody, async (req, res) => {
  const { profile_id = '', product_id = 0 } = req.body;

  try {
    // check to see item already exists in wishlist
    const item = await findItem(profile_id, product_id);

    if (item) {
      res
        .status(500)
        .json({ message: 'The specified item is already in wishlist' });
    } else {
      const profile = await findBy('profiles', { id: profile_id });
      const product = await findBy('products', { id: product_id });

      if (profile && product) {
        await create({ profile_id, product_id });
        res.status(201).json({ message: 'Item saved to wishlist' });
      } else {
        res.status(404).json({
          message: 'Could not find the specified profile or product.',
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: `Could not save the item to user's wishlist at the moment`,
      error: err.message,
    });
  }
});

module.exports = router;
