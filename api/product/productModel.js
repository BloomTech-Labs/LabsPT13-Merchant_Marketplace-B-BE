const db = require('../../data/db-config');

const create = (product) => {
  return db('products').insert(product).returning('*');
};

const remove = (id) => {
  return db('products').where({ id }).del();
};

module.exports = { create, remove };
