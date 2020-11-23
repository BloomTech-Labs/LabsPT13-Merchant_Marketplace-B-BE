const db = require('../../data/db-config');

const getAll = () => {
  return db('wishlists');
};

const findAll = (profile_id) => {
  return db('wishlists as wl')
    .join('profiles as pf', 'wl.profile_id', 'pf.id')
    .join('products as pd', 'wl.product_id', 'pd.id')
    .select('pd.*')
    .where({ 'wl.profile_id': profile_id });
};

const findItem = (profile_id, product_id) => {
  return db('wishlists').where({ profile_id, product_id }).first();
};

const create = (item) => {
  return db('wishlists').insert(item).returning('*');
};

module.exports = { getAll, findAll, findItem, create };
