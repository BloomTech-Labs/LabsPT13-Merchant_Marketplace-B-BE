const express = require('express');
const router = express.Router();
const authRequired = require('../middleware/authRequired');
// const validateBody = require('../middleware/validateBody');
const { getAll, findAll } = require('./wishlistsModel');

// const { findBy, remove } = require('../globalDbModels');

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

module.exports = router;
