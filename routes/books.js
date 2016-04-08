'use strict'
const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile')['development']);

let result = {};
router.get('/', (req, res, next) => {
  return knex('books')
  .innerJoin('genre', 'books.genreId', 'genre.id')
  .then((books) => {
    // console.log(books);
    result.books = books
    return knex('book-author')
    .innerJoin('books', 'book-author.bookId', 'books.id')
    .innerJoin('authors', 'book-author.authorId', 'authors.id')
    .select('bookId', 'firstName', 'lastName')
  })
  .then((authors) => {
    result.authors = authors
    // console.log(result.authors, "BONGGG");
    for (var i = 0; i < result.books.length; i++) {
      result.books[i].authors = []
      for (var j = 0; j < result.authors.length; j++) {
        if(result.books[i].id === result.authors[j].bookId) {
          result.books[i].authors.push({
            firstName: result.authors[j].firstName,
            lastName: result.authors[j].lastName})
        }
      }
    }
    console.log(result.books);
    res.render('books', {data: result})
  })
})

module.exports = router;
