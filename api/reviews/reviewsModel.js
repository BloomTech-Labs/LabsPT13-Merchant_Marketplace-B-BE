const db = require('../../data/db-config');

const create = (review) => {
  return db('reviews').insert(review).returning('*');
};
const findReview = (profile_id, product_id) => {
  return db('users-carts').where({ profile_id, product_id }).first();
};

module.exports = { create, findReview };
