const db = require('../../data/db-config');

const getProfileOrders = (profile_id) => {
  return db('orders as o')
    .join('profiles as pf', 'o.profile_id', 'pf.id')
    .join('products as pd', 'o.produce_id', 'pd.id')
    .select(
      'pd.*',
      'o.quantity',
      'o.total_price',
      'o.created_at',
      'o_updated_at'
    )
    .where({ 'o.profile_id': profile_id });
};

module.export = { getProfileOrders };
