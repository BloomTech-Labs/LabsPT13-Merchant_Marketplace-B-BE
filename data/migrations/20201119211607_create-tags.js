
exports.up = function(knex) {
  return knex.schema.createTable('tags', function(table) {
      table.string('id').notNullable().unique.primary();
      table.string('tag');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tags')
};
