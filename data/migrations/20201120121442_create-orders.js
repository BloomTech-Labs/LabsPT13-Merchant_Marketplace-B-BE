exports.up = function (knex) {
  return knex.schema.createTable('orders', function (table) {
    table.increments();
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
      .inTable('products')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table.integer('quantity').notNullable();
    table.float('total_price').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('orders');
};
