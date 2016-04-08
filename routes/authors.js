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
    return knex('authors').pluck('id')
  })
  .then((authorIds) => {
    return knex('book-author')
    .whereIn('authorId', authorIds)
    .innerJoin('books', 'book-author.bookId', 'books.id')
    .select('authorId', 'title')
  })
  .then((booksByAuthor) => {
    result.booksByAuthor = booksByAuthor;
    console.log(result);
    res.render('authors', {data: result})
  })
});


module.exports = router;
