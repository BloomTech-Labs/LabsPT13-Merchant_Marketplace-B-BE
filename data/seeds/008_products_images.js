exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('products_images')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('products_images').insert([
        {
          product_id: 1,
          img_url:
            'https://cdn.pixabay.com/photo/2020/03/24/11/13/workout-items-4963663__480.png',
          name: 'image.jpeg',
        },
        {
          product_id: 2,
          img_url:
            'https://cdn.pixabay.com/photo/2020/04/15/14/45/microphone-5046876__480.jpg',
          name: 'image.jpeg',
        },
        {
          product_id: 3,
          img_url:
            'https://cdn.pixabay.com/photo/2016/11/22/23/44/buildings-1851246__480.jpg',
          name: 'image.jpeg',
        },
        {
          product_id: 4,
          img_url:
            'https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032__480.jpg',
          name: 'image.jpeg',
        },
        {
          product_id: 5,
          img_url:
            'https://cdn.pixabay.com/photo/2013/07/12/18/20/shoes-153310__480.png',
          name: 'image.jpeg',
        },
      ]);
    });
};
