exports.up = function (knex) {
  return knex.schema.createTable('products-images', function (table) {
    table
      .integer('product_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('products')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table.string('name').notNullable();
    table.binary('image').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('products-images');
};
