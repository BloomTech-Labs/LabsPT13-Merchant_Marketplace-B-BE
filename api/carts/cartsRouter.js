const express = require('express');
const router = express.Router();
const authRequired = require('../middleware/authRequired');
const validateBody = require('../middleware/validateBody');
const { findBy, update, remove } = require('../globalDbModels');

const TABLE_NAME = 'users-carts';

router.get('/:profile_id', async (req, res) => {
  const { profile_id = 0 } = req.params;

  try {
    const profile = await findBy('profiles', { id: profile_id });
    if (profile) {
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
