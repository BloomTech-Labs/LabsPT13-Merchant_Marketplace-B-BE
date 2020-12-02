exports.up = function (knex) {
  return knex.schema.createTable('products', function (table) {
    table.increments();
    table
      .string('profile_id')
      .notNullable()
      .references('id')
      .inTable('profiles')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table.string('title').notNullable();
    table.string('img').notNullable();
    table.float('price').notNullable();
    table.string('description').notNullable();
    table.string('category').notNullable();
    table.string('tags');
    table.string('brand');
    table.string('condition').notNullable();
    table.string('delivery_method').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('products');
};
