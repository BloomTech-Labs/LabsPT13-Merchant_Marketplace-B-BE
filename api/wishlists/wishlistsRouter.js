const express = require('express');
const router = express.Router();
const authRequired = require('../middleware/authRequired');
const validateBody = require('../middleware/validateBody');

const { findBy, findAll, remove } = require('../globalDbModels');

router.get('/', authRequired, async (req, res) => {
  const savedProducts = await findAll('wishlists');
  res.status(200).json(savedProducts);
});

module.exports = router;
