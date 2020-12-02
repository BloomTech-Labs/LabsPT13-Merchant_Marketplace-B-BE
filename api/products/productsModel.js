const db = require('../../data/db-config');

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

const remove = (id) => {
  return db('products').where({ id }).del();
};

module.exports = { getAllTags, create, remove };
