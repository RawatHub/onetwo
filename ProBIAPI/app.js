var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

var corsOptions = {
  origin: 'http://localhost:3000/organization/add',
  optionSuccessStatus: 200
}

var config = require('./config');


var passportConfig = require('./auth/passport-config');
passportConfig();
var restrict = require('./auth/restrict');
var index = require('./routes/index');
var users = require('./routes/v1/users');
var sales = require('./routes/v1/sales');
var dashboard = require('./routes/v1/dashboard');
var organizations = require('./routes/v1/organization');

mongoose.connect(config.mongoUri);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors(corsOptions));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession(
  {
      secret  : 'getting hungry',
      saveUninitialized : false,
      resave : false
  }
));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', index);
app.use('/users', users);
app.use('/sales', sales);
app.use('/dashboard', dashboard);
app.use('/organization', organizations)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
