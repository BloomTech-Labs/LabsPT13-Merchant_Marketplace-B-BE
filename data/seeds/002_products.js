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
          img:
            'https://cdn.pixabay.com/photo/2020/03/24/11/13/workout-items-4963663__480.png',
          price: 12.99,
          description: 'Morbi non lectus',
          category: 'Marketing',
          tags: 'cars,sports',
          brand: 'Artificial Tears',
          condition: 'User-friendly',
          delivery_method: 'Local Pickup',
        },
        {
          profile_id: '00ulthapbErVUwVJy4x6',
          title: 'Rev',
          img:
            'https://cdn.pixabay.com/photo/2020/04/15/14/45/microphone-5046876__480.jpg',
          price: 12.99,
          description: 'Praesent id massa ',
          category: 'Business Development',
          tags: 'sports,computers',
          brand: 'ZOLPIDEM TARTRATE',
          condition: 'Polarised',
          delivery_method: 'Delivery',
        },
        {
          profile_id: '00ulthapbErVUwVJy4x6',
          title: 'Mrs',
          img:
            'https://cdn.pixabay.com/photo/2016/11/22/23/44/buildings-1851246__480.jpg',
          price: 12.99,
          description: 'Proin leo odio, ',
          category: 'Business Development',
          tags: 'running',
          brand: 'Stings, Bites, Swellings',
          condition: 'model',
          delivery_method: 'Local Pickup or Delivery',
        },
        {
          profile_id: '2j0epjkdhqo6wvkh0v7f',
          title: 'Honorable',
          img:
            'https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032__480.jpg',
          price: 12.99,
          description: 'Sed sagittis. Nam congue',
          category: 'Marketing',
          tags: 'hiking,boats',
          brand: 'ARTHRI-SUPPORT',
          condition: 'info-mediaries',
          delivery_method: 'Local Pickup',
        },
        {
          profile_id: '2j0epjkdhqo6wvkh0v7f',
          title: 'Rev',
          img:
            'https://cdn.pixabay.com/photo/2013/07/12/18/20/shoes-153310__480.png',
          price: 12.99,
          description: 'In hac habitasse platea',
          category: 'Product Management',
          tags: 'tech,watches',
          brand: 'LISINOPRIL AND HYDROCHLOROTHIAZIDE',
          condition: 'didactic',
          delivery_method: 'Local Pickup',
        },
      ]);
    });
};
