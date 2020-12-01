exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('reviews')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('reviews').insert([
        {
          profile_id: 'pv2864sfheem5j4o2vhs',
          product_id: 2,
          rate: 2,
          description: 'The product was not good',
        },
        {
          profile_id: 'pv2864sfheem5j4o2vhs',
          product_id: 1,
          rate: 1,
          description: 'It sucks',
        },
        {
          profile_id: 'pv2864sfheem5j4o2vhs',
          product_id: 4,
          rate: 4,
          description: 'Very good product',
        },
      ]);
    });
};
