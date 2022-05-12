var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { start } = require('./incoming');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
start();

module.exports = app;
