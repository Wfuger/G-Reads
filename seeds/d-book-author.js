
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('book-author').del(),

    // Inserts seed entries
    knex('book-author').insert({id: 1, bookId: 1, authorId: 1}),
    knex('book-author').insert({id: 2, bookId: 2, authorId: 2}),
    knex('book-author').insert({id: 3, bookId: 3, authorId: 3}),
    knex('book-author').insert({id: 4, bookId: 4, authorId: 4}),
    knex('book-author').insert({id: 5, bookId: 5, authorId: 4}),
    knex('book-author').insert({id: 6, bookId: 6, authorId: 4})
  );
};
