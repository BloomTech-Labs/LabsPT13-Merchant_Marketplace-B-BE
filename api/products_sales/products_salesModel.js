const db = require('../../data/db-config');

const findProductSales = (product_id) => {
  return db('products_sales').where({ product_id }).first();
};

module.exports = { findProductSales };
