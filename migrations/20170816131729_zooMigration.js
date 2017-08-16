
exports.up = function(knex, Promise) {
  return knex.schema.createTable('animals', function(table){
    table.increments();
    table.string('name');
    table.string('password');
    table.integer('species_id');
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('animals');
};
