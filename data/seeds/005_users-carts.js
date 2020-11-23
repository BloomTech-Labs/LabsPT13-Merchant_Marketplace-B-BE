exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users-carts')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users-carts').insert([
        { profile_id: '00ulthapbErVUwVJy4x6', product_id: 1 },
        { profile_id: '2j0epjkdhqo6wvkh0v7f', product_id: 1 },
        { profile_id: '00ulthapbErVUwVJy4x6', product_id: 2 },
        { profile_id: '2j0epjkdhqo6wvkh0v7f', product_id: 3 },
        { profile_id: '00ulthapbErVUwVJy4x6', product_id: 3 },
      ]);
    });
};
