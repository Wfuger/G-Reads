'use strict'
const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile')['development']);


function getAuthors(req, res, next) {
  let result = {};
  return knex('authors')
  .then((authors) => {
    // console.log(authors);
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
    req.result = result
    next()
  })
}

/* GET users listing. */
router.get('/', getAuthors, (req, res, next) => {
    res.render('authors', {data: req.result, layout: 'viewLayout'})
});

router.get('/new', (req, res, next) => {
  res.render('authorNew', {layout: 'viewLayout'})
})

router.get('/:id', getAuthors, (req, res, next) => {
  let singleAuthor = {}
  for (var i = 0; i < req.result.authors.length; i++) {
    console.log(req.result.authors[i].id, req.params.id);
    if(req.result.authors[i].id === +req.params.id) {
      singleAuthor.author = req.result.authors[i]
    }
  }
  console.log(singleAuthor);
  res.render('singleAuthor', {data: singleAuthor, layout: 'viewLayout'})
})

router.get('/:id/edit', getAuthors, (req, res, next) => {
  let singleAuthor = {}
  for (var i = 0; i < req.result.authors.length; i++) {
    console.log(req.result.authors[i].id, req.params.id);
    if(req.result.authors[i].id === +req.params.id) {
      singleAuthor.author = req.result.authors[i]
    }
  }
  console.log(singleAuthor);
  res.render('authorEdit', {data: singleAuthor, layout: 'viewLayout'})
})

router.post('/new', (req, res, next) => {
  console.log(req.body);
  knex('authors')
  .insert(req.body)
  .then(() => {
    res.redirect('/authors')
  })
})

router.get('/:id/delete', getAuthors, (req, res, next) => {
  let singleAuthor = {}
  for (var i = 0; i < req.result.authors.length; i++) {
    console.log(req.result.authors[i].id, req.params.id);
    if(req.result.authors[i].id === +req.params.id) {
      singleAuthor.author = req.result.authors[i]
    }
  }
  res.render('authorDelete', {layout: 'viewLayout', data: singleAuthor})
})

router.post('/:id/delete', (req, res, next) => {
  knex('authors')
  .where({id:req.params.id})
  .del()
  .then(() => {
    res.redirect('/authors')
  })
})

module.exports = router;
