
exports.up = function(knex, Promise) {
  return knex.schema.createTable('genre', function(table) {
      table.increments('id');
      table.string('name');
    })
  .createTable('books', function(table){
    table.increments('id');
    table.string('title');
    table.integer('genreId').unsigned().references('id').inTable('genre');
    table.string('url');
    table.string('description', 1000);
  })
  .createTable('authors', function(table){
    table.increments('id');
    table.string('firstName');
    table.string('lastName');
    table.string('url');
    table.string('bio', 1000);
  })
  .createTable('book-author', function(table){
    table.increments('id');
    table.integer('bookId').unsigned().references('id').inTable('books');
    table.integer('authorId').unsigned().references('id').inTable('authors');
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books')
    .dropTable('authors')
    .dropTable('book-author')
    .dropTable('genre');
};
