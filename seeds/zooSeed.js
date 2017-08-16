
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('animals').del()
    .then(function () {
      // Inserts seed entries
      return knex('animals').insert([
        {name: 'Simba', password: 'simba', species_id: 2},
        {name: 'Nemo', password: 'nemo', species_id: 4},
        {name: 'Scar', password: 'scar', species_id: 4},
        {name: 'Smokey the Bear', password: 'smokey', species_id: 1},
        {name: 'Marty the Marlin', password: 'marty', species_id: 4}
      ]);
    });
};
