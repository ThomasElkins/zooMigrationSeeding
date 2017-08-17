var bcrypt = require('bcrypt');
const saltRounds = 7;

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('animals').del()
    .then(function () {
      // Inserts seed entries
      return knex('animals').insert([
        {name: 'Simba', password: `${bcrypt.hashSync('simba', saltRounds)}`, species_id: 2},
        {name: 'Nemo', password: `${bcrypt.hashSync('nemo', saltRounds)}`, species_id: 4},
        {name: 'Scar', password: `${bcrypt.hashSync('scar', saltRounds)}`, species_id: 4},
        {name: 'Smokey the Bear', password: `${bcrypt.hashSync('smokey', saltRounds)}`, species_id: 1},
        {name: 'Marty the Marlin', password: `${bcrypt.hashSync('marty', saltRounds)}`, species_id: 3}
      ]);
    });
};
