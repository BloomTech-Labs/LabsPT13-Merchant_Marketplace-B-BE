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
      .integer('starting_quantity')
      .inTable('products')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    tbl.integer('number_of_sales').onDelete('CASCADE').onUpdate('CASCADE');

    tbl.primary(['product_id']);
  });
};
