
const Promise = require('bluebird')
var express = Promise.promisifyAll (require('express'));
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var auth = require('./middleware/auth')
var indexRouter = require('./routes/index');
require('dotenv').config();
var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  return res.status(404).send({
    status: false,
    message: 'Path Not Found'
  })
  next()
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

});

module.exports = app;