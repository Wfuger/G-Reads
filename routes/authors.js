'use strict'
const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile')['development']);

let result = {};
/* GET users listing. */
router.get('/', (req, res, next) => {
  return knex('authors')
  .then((authors) => {
    result.authors = authors
    return knex('book-author')
    .innerJoin('books', 'book-author.bookId', 'books.id')
    .innerJoin('authors', 'book-author.authorId', 'authors.id')
    .select('authorId', 'title')
  })
  .then((titles) => {
    result.titles = titles
    for (var i = 0; i < result.authors.length; i++) {
      result.authors[i].titles = []
      for (var j = 0; j < result.titles.length; j++) {
        if(result.authors[i].id === result.titles[j].authorId) {
          result.authors[i].titles.push({title: result.titles[j].title})
        }
      }
    }
    console.log(result.authors, "FUCK YEAH");
    res.render('authors', {data: result})
  })
});

router.get('/new', (req, res, next) => {
  res.render('authorNew')
})

router.get('/edit', (req, res, next) => {
  res.render('authorEdit', {data: result})
})

module.exports = router;
