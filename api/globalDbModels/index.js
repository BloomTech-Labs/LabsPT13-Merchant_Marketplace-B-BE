const db = require('../../data/db-config');

const findAll = (tableName) => {
  return db(tableName);
};

const findBy = (tableName, filter) => {
  return db(tableName).where(filter).first();
};

const update = async (tableName, changes, filter) => {
  await db(tableName).update(changes).where(filter);
  return findBy(tableName, filter);
};

const remove = (tableName, filter) => {
  return db(tableName).where(filter).delete();
};

module.exports = { findAll, findBy, update, remove };
