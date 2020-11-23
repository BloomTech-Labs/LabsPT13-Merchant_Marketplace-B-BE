const db = require('../../data/db-config');

const getAll = () => {
  return db('users-carts');
};

const findAll = (profile_id) => {
  return db('users-carts as uc')
    .join('products as pd', 'uc.product_id', 'pd.id')
    .join('profiles as pf', 'uc.profile_id', 'pf.id')
    .select('pd.*')
    .where({ 'uc.profile_id': profile_id });
};

const create = (item) => {
  return db('users-carts').insert(item).returning('*');
};

module.exports = { getAll, findAll, create };
