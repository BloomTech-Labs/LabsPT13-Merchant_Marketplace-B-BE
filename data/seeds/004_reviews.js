exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('reviews')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('reviews').insert([
        {
          seller_id: 'pv2864sfheem5j4o2vhs',
          buyer_id: '00ulthapbErVUwVJy4x6',
          rate: 3,
          description: 'The product was not good',
        },
        {
          seller_id: '00ulthapbErVUwVJy4x6',
          buyer_id: 'pv2864sfheem5j4o2vhs',
          rate: 2.5,
          description: 'It sucks',
        },
        {
          seller_id: '00ulthapbErVUwVJy4x6',
          buyer_id: 'jhbgvwyejp81ds9jzuo9',
          rate: 4.5,
          description: 'It sucks',
        },
        {
          seller_id: '2j0epjkdhqo6wvkh0v7f',
          buyer_id: 'jhbgvwyejp81ds9jzuo9',
          rate: 5,
          description: 'Very good product',
        },
      ]);
    });
};
