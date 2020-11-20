exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('orders')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('orders').insert([
        {
          profile_id: '00ulthapbErVUwVJy4x6',
          product_id: 1,
          quantity: 2,
          total_price: 12.99,
        },
        {
          profile_id: 'jhbgvwyejp81ds9jzuo9',
          product_id: 3,
          quantity: 1,
          total_price: 99.0,
        },
        {
          profile_id: 'pv2864sfheem5j4o2vhs',
          product_id: 5,
          quantity: 1,
          total_price: 120.99,
        },
      ]);
    });
};
