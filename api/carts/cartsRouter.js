const express = require('express');
const router = express.Router();
const authRequired = require('../middleware/authRequired');
const validateBody = require('../middleware/validateBody');
const { findAll } = require('./cartsModel');
const db = require('../../data/db-config');

router.get('/', authRequired, async (req, res) => {
  const carts = await db('users-carts');
  res.status(200).json(carts);
});

router.get('/:profile_id', authRequired, async (req, res) => {
  const { profile_id = '' } = req.params;

  try {
    const items = await findAll(profile_id);

    if (items.length) {
      res.status(200).json(items);
    } else {
      res.status(404).json({
        message: `Could not find the specified profile`,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: `Could not retrieve the user's cart at the moment`,
      error: err.message,
    });
  }
});

module.exports = router;
