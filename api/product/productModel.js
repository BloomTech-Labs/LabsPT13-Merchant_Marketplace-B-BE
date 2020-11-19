const db = require('../../data/db-config');

const findAll = async () => {
  return await db('products');
};

const findBy = (filter) => {
  return db('products').where(filter);
};

const findById = async (id) => {
  return db('products').where({ id }).first().select('*');
};

const create = async (product) => {
  return db('products').insert(product).returning('*');
};

const update = async (id, product) => {
  return db('products')
    .where({ id: id })
    .first()
    .update(product)
    .returning('*');
};

module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
};
