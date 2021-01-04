exports.up = function (knex) {
  return knex.schema.createTable('reviews', function (table) {
    table
      .string('seller_id')
      .notNullable()
      .references('id')
      .inTable('profiles')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table
      .string('buyer_id')
      .notNullable()
      .references('id')
      .inTable('profiles')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table.float('rate').notNullable();
    table.string('description').notNullable();
    table.primary(['seller_id', 'buyer_id']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('reviews');
};
