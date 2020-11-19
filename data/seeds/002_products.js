exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('products')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {
          profile_id: '00ulthapbErVUwVJy4x6',
          title: 'Mrs',
          price: 12.99,
          description: 'Morbi non lectus',
          category: 'Marketing',
          brand: 'Artificial Tears',
          condition: 'User-friendly',
          delivery_method: 'Local Pickup',
        },
        {
          profile_id: '2j0epjkdhqo6wvkh0v7f',
          title: 'Rev',
          price: 12.99,
          description: 'Praesent id massa ',
          category: 'Business Development',
          brand: 'ZOLPIDEM TARTRATE',
          condition: 'Polarised',
          delivery_method: 'Delivery',
        },
        {
          profile_id: 'jhbgvwyejp81ds9jzuo9',
          title: 'Mrs',
          price: 12.99,
          description: 'Proin leo odio, ',
          category: 'Business Development',
          brand: 'Stings, Bites, Swellings',
          condition: 'model',
          delivery_method: 'Local Pickup or Delivery',
        },
        {
          profile_id: 'bv8tg9jvp9t1461zr7x1',
          title: 'Honorable',
          price: 12.99,
          description: 'Sed sagittis. Nam congue',
          category: 'Marketing',
          brand: 'ARTHRI-SUPPORT',
          condition: 'info-mediaries',
          delivery_method: 'Local Pickup',
        },
        {
          profile_id: 'pv2864sfheem5j4o2vhs',
          title: 'Rev',
          price: 12.99,
          description: 'In hac habitasse platea',
          category: 'Product Management',
          brand: 'LISINOPRIL AND HYDROCHLOROTHIAZIDE',
          condition: 'didactic',
          delivery_method: 'Local Pickup',
        },
      ]);
    });
};
