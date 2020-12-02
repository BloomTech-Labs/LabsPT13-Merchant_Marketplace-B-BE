exports.up = function (knex) {
  return knex.schema.createTable('reviews', function (table) {
    table
      .string('profile_id')
      .notNullable()
      .references('id')
      .inTable('profiles')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table
      .integer('product_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('products');

    table.integer('rate').notNullable();
    table.string('description').notNullable();
    table.primary(['profile_id', 'product_id']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('reviews');
};
