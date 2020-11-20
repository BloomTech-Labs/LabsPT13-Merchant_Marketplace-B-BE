const express = require('express');
const router = express.Router();
const authRequired = require('../middleware/authRequired');
const validateId = require('../middleware/validateId');

const TABLE_NAME = 'orders';

router.get('/:id', authRequired, validateId(TABLE_NAME), async (req, res) => {
  res.status(200).json(req.order);
});

module.exports = router;
