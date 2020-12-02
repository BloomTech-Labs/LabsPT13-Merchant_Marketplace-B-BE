const express = require('express');
const router = express.Router();
const Reviews = require('./reviewsModel');
const authRequired = require('../middleware/authRequired');
const validateId = require('../middleware/validateId');
const validateBody = require('../middleware/validateBody');
const { remove } = require('../globalDbModels');

const TABLE_NAME = 'reviews';

// retrieve reviews by product_id
router.get('/:product_id', authRequired, validateId(TABLE_NAME), (req, res) => {
  res.status(200).json(req.order);
});

// create a new review
router.post('/', authRequired, validateBody, async (req, res) => {
  const review = req.body;

  try {
    const created = await Reviews.create(review);
    res.status(201).json({ message: 'Review created', review: created[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// delete a review
router.delete('/:profile_id/:product_id', authRequired, async (req, res) => {
  const { profile_id = '', product_id = 0 } = req.params;

  try {
    const item = await Reviews.findReview(profile_id, product_id);

    if (item) {
      await remove('reviews', { profile_id, product_id });
      res.status(200).json({ message: 'Review deleted' });
    } else {
      res.status(404).json({
        message: 'Could not find the specified Review',
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: `Could not remove the review at the moment`,
      error: err.message,
    });
  }
});
module.exports = router;
