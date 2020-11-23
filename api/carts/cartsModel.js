const db = require('../../data/db-config');

const findAll = (profile_id) => {
  return db('users_carts as u_c')
    .join('profiles as pf', 'u_c.profile_d', 'pf.id')
    .join('products as pr', 'u_c.product_id', 'pr.id')
    .where({ profile_id });
};

module.exports = { findAll };
