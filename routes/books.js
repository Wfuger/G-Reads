'use strict'
const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile')['development']);

function getBooks(req, res, next) {
  let result = {};
  return knex('books')
  .orderBy('id')
  .then((books) => {
    result.books = books
    return knex('book-author')
    .innerJoin('books', 'book-author.bookId', 'books.id')
    .innerJoin('genre', 'books.genreId', 'genre.id')
    .innerJoin('authors', 'book-author.authorId', 'authors.id')
    .select('bookId', 'firstName', 'lastName', 'name')
  })
  .then((authors) => {
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
    req.result = result
    next()
  })
}

router.get('/', getBooks, (req, res, next) => {
  res.render('books', {data: req.result, layout: 'viewLayout'})
})



router.get('/new', (req, res, next) => {
  res.render('bookNew', {layout: 'viewLayout'})
})

router.get('/:id', getBooks, (req, res, next) => {
  let singleBook = {}
  for (var i = 0; i < req.result.books.length; i++) {
    if(req.result.books[i].id === +req.params.id) {
      singleBook.book = req.result.books[i]
    }
  }
  console.log(singleBook.book);
  res.render('singleBook', {data: singleBook, layout: 'viewLayout'})
})

router.get('/:id/edit', getBooks, (req, res, next) => {
  let singleBook = {}
  for (var i = 0; i < req.result.books.length; i++) {
    if(req.result.books[i].id === +req.params.id) {
      singleBook.book = req.result.books[i]
    }
  }
  console.log(singleBook);
  res.render('bookEdit', {data: singleBook, layout: 'viewLayout'})
})

router.post('/:id/edit', (req, res, next) => {
  return knex('books')
  .where('id', req.params.id)
  .update({title: req.body.title,
    genreId: null,
    coverUrl: req.body.coverUrl,
    description: req.body.description})
    .then((blah) => {
      console.log(blah);
      res.redirect('/books')
    })
})

router.post('/new', (req, res, next) => {
  knex('books')
  .insert({title: req.body.title,
    genreId: null,
    coverUrl: req.body.coverUrl,
    description: req.body.description})
  .then(() => {
    res.redirect('/books')
  })
})

router.get('/:id/delete', getBooks, (req, res, next) => {
  let singleBook = {}
  for (var i = 0; i < req.result.books.length; i++) {
    // console.log(req.result.books[i].id, req.params.id);
    if(req.result.books[i].id === +req.params.id) {
      singleBook.book = req.result.books[i]
    }
  }
  console.log(singleBook);
  res.render('bookDelete', {layout: 'viewLayout', data: singleBook})
})

router.post('/:id/delete', (req, res, next) => {
  knex('books')
  .where({ id: req.params.id })
  .del()
  .then(() => {
    res.redirect('/books')
  })
})
module.exports = router;
