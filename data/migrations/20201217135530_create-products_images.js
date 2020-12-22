exports.up = function (knex) {
  return knex.schema.createTable('products_images', function (table) {
    table
      .integer('product_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('products')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table.string('image_id').notNullable();
    table.string('name').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('products_images');
};
