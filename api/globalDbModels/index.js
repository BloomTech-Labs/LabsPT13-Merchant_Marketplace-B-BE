const db = require('../../data/db-config');

const findAll = (table_name) => {
  return db(table_name);
};

const findAllBy = (table_name, filter) => {
  return db(table_name).where(filter);
};

const findProfileItems = (table_name, profile_id) => {
  return db(`${table_name} as tbl`)
    .join('profiles as pf', 'tbl.profile_id', 'pf.id')
    .join('products as pd', 'tbl.product_id', 'pd.id')
    .select('pd.*')
    .where({ 'tbl.profile_id': profile_id });
};

const findBy = (table_name, filter) => {
  return db(table_name).where(filter).first();
};

const create = (table_name, item) => {
  return db(table_name).insert(item).returning('*');
};

const update = async (table_name, changes, filter) => {
  await db(table_name).update(changes).where(filter);
  return findBy(table_name, filter);
};

const remove = (table_name, filter) => {
  return db(table_name).where(filter).delete();
};

module.exports = {
  findAll,
  findAllBy,
  findProfileItems,
  findBy,
  create,
  update,
  remove,
};
