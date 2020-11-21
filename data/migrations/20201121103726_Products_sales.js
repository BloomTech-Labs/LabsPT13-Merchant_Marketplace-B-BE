exports.up = function (knex) {
  return knex.scheme.createTable('Products_sales', (tbl) => {
    tbl
      .integer('Product_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('products')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    tbl
      .integer('order_id')
      .references('id')
      .inTable('orders')
      .onUpdate('CASCADE');

    tbl.primary(['product_id', 'order_id']);
  });
};
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('Products_sales');
};
