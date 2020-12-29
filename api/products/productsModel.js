const db = require('../../data/db-config');

const getSellerProducts = (profile_id) => {
  return db('products').where({ profile_id });
};

const getAllTags = async () => {
  let result = new Set();
  let tags = await db('products as p').select('p.tags');

  tags.forEach(({ tags }) => {
    tags = tags.split(',');
    tags.forEach((tag) => result.add(tag));
  });

  return new Promise((res) => res([...result]));
};

const create = (product) => {
  return db('products').insert(product).returning('*');
};

module.exports = { getSellerProducts, getAllTags, create };
