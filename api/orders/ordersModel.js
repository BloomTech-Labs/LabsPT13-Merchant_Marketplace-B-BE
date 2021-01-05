const db = require('../../data/db-config');

const getProfileOrders = (profile_id) => {
  return db('orders as o')
    .where({ 'o.profile_id': profile_id })
    .join('products as pd', 'o.product_id', 'pd.id')
    .select(
      'pd.*',
      'o.quantity',
      'o.total_price',
      'o.created_at',
      'o.updated_at'
    );
};

module.exports = { getProfileOrders };
