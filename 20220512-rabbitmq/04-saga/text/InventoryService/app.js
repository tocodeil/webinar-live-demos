var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { RABBITMQ_URL } = process.env;
const { RabbitMQ } = require('./reconnecting_rabbit');
const { start } = require('./incoming');

var indexRouter = require('./routes/index');

var app = express();

const rabbit = new RabbitMQ(RABBITMQ_URL);

async function setup(app) {
  await rabbit.init();
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  console.log('setup');

  app.use(async function(req, _res, next) {
    try {
      // Fetches the active connection or re-connect
      const connection = rabbit.connection;
      const channel = await connection.createChannel();
      req.locals = req.locals || {};
      req.locals.channel = channel;
      return next();
    } catch (err) {
      console.log(err);
      return next(err);
    }
  });

  app.use('/', indexRouter);
  start();
}

setup(app);


module.exports = app;
