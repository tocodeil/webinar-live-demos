var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var timersRoute = require('./routes/timers');
var externalDataRoute = require('./routes/externaldata');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/timers', timersRoute);
app.use('/github', externalDataRoute);

module.exports = app;
