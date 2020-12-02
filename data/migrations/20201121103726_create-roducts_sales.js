exports.up = function (knex) {
  return knex.schema.createTable('products_sales', (tbl) => {
    tbl
      .integer('product_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('products')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    tbl.integer('starting_quantity').notNullable();
    tbl.integer('num_sales').notNullable();
  });
};
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('products_sales');
};
