
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('genre').del(),

    // Inserts seed entries
    knex('genre').insert({
      id: 1,
      name: "Python"
    }),
    knex('genre').insert({
      id: 2,
      name: "JavaScript"
    })
  );
};
