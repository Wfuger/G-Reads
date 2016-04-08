'use strict'
const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile')['development']);

let result = {};
router.get('/', (req, res, next) => {
  return knex('books')
  .orderBy('id')
  .then((books) => {
    // console.log(books);
    result.books = books
    return knex('book-author')
    .innerJoin('books', 'book-author.bookId', 'books.id')
    .innerJoin('genre', 'books.genreId', 'genre.id')
    .innerJoin('authors', 'book-author.authorId', 'authors.id')
    .select('bookId', 'firstName', 'lastName', 'name')
  })
    result.authors = authors
    for (var i = 0; i < result.books.length; i++) {
      result.books[i].authors = []
      for (var j = 0; j < result.authors.length; j++) {
        if(result.books[i].id === result.authors[j].bookId) {
          result.books[i].authors.push({
            firstName: result.authors[j].firstName,
            lastName: result.authors[j].lastName,
            name: result.authors[j].name})
        }
      }
    }
    res.render('books', {data: result, layout: 'viewLayout'})
  })
})

module.exports = router;
