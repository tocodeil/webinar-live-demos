var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var app = express();

MongoClient.connect(url, function(err, db) {
  if (err) throw err;

  app.use(function(_req, res, next) {
    if (!res.locals) {
      res.locals = {};
    }
    res.locals.db = db.db('mydb');
    return next();
  });

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/', indexRouter);

  console.log(`Listening on port 3000`);
});


module.exports = app;
