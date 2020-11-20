const db = require('../../data/db-config');

const create = (order) => {
  return db('orders').insert(order).returning('*');
};

module.exports = { create };
