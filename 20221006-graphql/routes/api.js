var express = require('express');
var users = require('../data/users');
var books = require('../data/books');
var loans = require('../data/loans');

var router = express.Router();

/* GET home page. */
router.get('/users', function(req, res, next) {
  res.send(users);
});

router.get('/books', function(req, res, next) {
  res.send(books);
});

router.get('/loans', function(req, res, next) {
  res.send(loans);
});

module.exports = router;

