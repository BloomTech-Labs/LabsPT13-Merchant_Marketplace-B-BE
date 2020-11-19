exports.up = function (knex) {
  return knex.schema.createTable('products', function (table) {
    table.string('id').notNullable().unique().primary();
    table
      .string('profile_id')
      .notNullable()
      .references('id')
      .inTable('profiles')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table.string('title').notNullable();
    table.float('price').notNullable();
    table.string('description').notNullable();
    table.string('category').notNullable();
    table.string('brand');
    table.string('condition').notNullable();
    table.string('delivery_method').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('products');
};
