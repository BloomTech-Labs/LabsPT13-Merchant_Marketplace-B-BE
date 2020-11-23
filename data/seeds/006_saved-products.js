exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('saved-products')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('saved-products').insert([
        { profile_id: '2j0epjkdhqo6wvkh0v7f', product_id: 1 },
        { profile_id: '00ulthapbErVUwVJy4x6', product_id: 3 },
        { profile_id: '2j0epjkdhqo6wvkh0v7f', product_id: 2 },
        { profile_id: '00ulthapbErVUwVJy4x6', product_id: 4 },
        { profile_id: 'bv8tg9jvp9t1461zr7x1', product_id: 5 },
      ]);
    });
};
