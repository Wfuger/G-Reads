'use strict'
const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile')['development']);

/* GET users listing. */
router.get('/', (req, res, next) => {
  let result = {};
  return knex('authors')
  .then((authors) => {
    result.authors = authors;
    return knex('book-author')
    .innerJoin('books', 'book-author.bookId', 'books.id')


  })
  .then((booksByAuthor) => {
    // result.books = books;
    console.log(result);
  })
});


module.exports = router;
