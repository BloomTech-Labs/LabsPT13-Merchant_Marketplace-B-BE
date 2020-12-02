const express = require('express');
const router = express.Router();
const authRequired = require('../middleware/authRequired');
const validateBody = require('../middleware/validateBody');

const {
  findAll,
  findProfileItems,
  findBy,
  create,
  remove,
} = require('../globalDbModels');

const TABLE_NAME = 'wishlists';

// for testing purposes
router.get('/', async (req, res) => {
  const wishLists = await findAll(TABLE_NAME);
  res.status(200).json(wishLists);
});

// retrieve user's saved items
router.get('/:profile_id', authRequired, async (req, res) => {
  const { profile_id = '' } = req.params;

  try {
    const wishList = await findProfileItems(TABLE_NAME, profile_id);

    if (wishList.length) {
      res.status(200).json(wishList);
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
    const item = await findBy(TABLE_NAME, { profile_id, product_id });

    if (item) {
      res
        .status(500)
        .json({ message: 'The specified item is already in wishlist' });
    } else {
      const profile = await findBy('profiles', { id: profile_id });
      const product = await findBy('products', { id: product_id });

      if (profile && product) {
        await create(TABLE_NAME, { profile_id, product_id });
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

// remove an item from the user's wishlist
router.delete('/:profile_id/:product_id', async (req, res) => {
  const { profile_id = '', product_id = 0 } = req.params;

  try {
    const item = await findBy(TABLE_NAME, { profile_id, product_id });

    if (item) {
      await remove('wishlists', { profile_id, product_id });
      res.status(200).json({ message: 'Wishlist item removed' });
    } else {
      res.status(404).json({
        message: 'Could not find the specified wishlist item',
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: `Could not remove the item from the user's wishlist at the moment`,
      error: err.message,
    });
  }
});

module.exports = router;
