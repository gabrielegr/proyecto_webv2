var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookie = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var debug = require('debug')('proyectowebv2:database');
var indexRouter = require('./routes/index')(app,passport);
var passport=require('passport')
var morgan=require('morgan')
var flash=require('connect-flash')
var bodyParser=require('body-parser')
var session=require('express-session')


mongoose.connect(process.env.MONGO_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true 
  })
  .then(() => {
    debug("success Connected to database")
  })
  .catch((err) => {
    debug(err);
    process.exit(1);
  });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookie());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'uwu',
resave:false,
saveUninitialized:false
}))
app.use(passport.session())
app.use(flash())
app.use('/', indexRouter);


//static files
app.use('/public', express.static(path.join(__dirname, 'public')));
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

module.exports = app;