var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var MongoClient = require('mongodb').MongoClient;
const url = process.env.DB_URL = "mongodb://localhost:27017/";
const dbname = process.env.DB_NAME = 'mydb';

var app = express();

app.ready = (async () => {
  const client = await MongoClient.connect(url);
  app.close = function() {
    client.close();
  };

  app.use(function(_req, res, next) {
    if (!res.locals) {
      res.locals = {};
    }
    res.locals.db = client.db(dbname);
    return next();
  });

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/', indexRouter);

  console.log(`Listening on port 3000`);
})();


module.exports = app;
