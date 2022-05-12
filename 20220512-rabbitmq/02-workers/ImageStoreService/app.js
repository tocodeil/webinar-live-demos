var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { RABBITMQ_URL } = process.env;
const { RabbitMQ } = require('./reconnecting_rabbit');
const { start: startConsuming } = require('./incoming');

var indexRouter = require('./routes/index');
const rabbit = new RabbitMQ(RABBITMQ_URL);

var app = express();

async function setup(app) {
  await rabbit.init();

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(async function(req, _res, next) {
    try {
      // 2. Try to use the current connection
      const connection = rabbit.connection;

      // 3. Create a channel: If the connection is closed this will throw an exception
      const channel = await connection.createChannel();

      // 4. Put the channel on req.locals so route handlers can use it
      req.locals = req.locals || {};
      req.locals.channel = channel;
      return next();
    } catch (err) {
      console.log(err);
      return next(err);
    }
  });

  app.use('/', indexRouter);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
}

setup(app);
startConsuming();


module.exports = app;
