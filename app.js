var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

//route add
var about = require('./routes/about');
/*var cmn = require('./routes/cmn');
var consulting = require('./routes/consulting');
var main = require('./routes/main');
var member = require('./routes/member');*/

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//express.static ADD
app.use('/cid_about', express.static(__dirname + '/views/cid_about'));
/*app.use('/cid_cmn', express.static(__dirname + '/views/cid_cmn'));
app.use('/cid_consulting', express.static(__dirname + '/views/cid_consulting'));
app.use('/cid_contents', express.static(__dirname + '/views/cid_contents'));
app.use('/cid_main', express.static(__dirname + '/views/cid_main'));
app.use('/cid_member', express.static(__dirname + '/views/cid_member'));
*/

app.use('/', routes);
app.use('/users', users);

//app.get
app.use('/cid_about',about);
/*app.use('/cid_cmn',cmn);
app.use('/cid_consulting',consulting);
app.use('/cid_contents',contents);
app.use('/cid_main',main);
app.use('/cid_member',member);*/


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
