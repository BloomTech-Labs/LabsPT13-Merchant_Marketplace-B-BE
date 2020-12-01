exports.up = function (knex) {
  return knex.schema.createTable('Products_sales', (tbl) => {
    tbl
      .integer('Product_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('products')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    tbl.integer('starting_quantity').onDelete('CASCADE').onUpdate('CASCADE');

    tbl.integer('num_sales').onUpdate('CASCADE');

    tbl.primary('product_id');
  });
};
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('Products_sales');
};
