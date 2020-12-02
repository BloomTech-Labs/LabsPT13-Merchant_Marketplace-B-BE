const faker = require('faker');

const ids = [
  '00ulthapbErVUwVJy4x6',
  '2j0epjkdhqo6wvkh0v7f',
  'jhbgvwyejp81ds9jzuo9',
  'bv8tg9jvp9t1461zr7x1',
  'pv2864sfheem5j4o2vhs',
];

const profiles = [...new Array(5)].map((i, idx) => ({
  id: ids[idx],
  avatarUrl: faker.image.avatar(),
  email: idx === 0 ? 'llama001@maildrop.cc"' : faker.internet.email(),
  name:
    idx === 0
      ? 'Test001 User'
      : `${faker.name.firstName()} ${faker.name.lastName()}`,
}));

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('profiles')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('profiles').insert(profiles);
    });
};
