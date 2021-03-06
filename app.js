
var express = require('express')
  , http = require('http');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
//var multiparty = require('connect-multiparty');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug')('cidermics:server');
//var http = require('http');
var passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;
var mysql = require("./routes/model/mysql");
var flash = require('req-flash');
var session = require('express-session');


var app = express();


var routes = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');

//route add
var about = require('./routes/about');
var cmn = require('./routes/cmn');
var consulting = require('./routes/consulting');
var contents = require('./routes/contents');
var member = require('./routes/member');
var search = require('./routes/search');
var finance = require('./routes/finance');
var lecture = require('./routes/lecture');
var quiz = require('./routes/quiz');


//app.use(bodyParser.json({ limit: '20M' }));
//app.use(bodyParser.urlencoded({limit: '20M', extended: true}));


// view engine setup
app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));




//app.use(multiparty({uploadDir:__dirname+'/multipart'}));
app.use(bodyParser.json({limit: '1000mb'}));
app.use(bodyParser.urlencoded({limit: '1000mb', extended: true }));

app.use(cookieParser());
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true }));


app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'fortt', resave: true, saveUninitialized: true}));

app.use(passport.initialize());
app.use(passport.session());

//express.static ADD
app.use('/cid_about', express.static(__dirname + '/views/cid_about'));
app.use('/cid_cmn', express.static(__dirname + '/views/cid_cmn'));
app.use('/cid_consulting', express.static(__dirname + '/views/cid_consulting'));
app.use('/cid_contents', express.static(__dirname + '/views/cid_contents'));
app.use('/cid_member', express.static(__dirname + '/views/cid_member'));
app.use('/cid_search', express.static(__dirname + '/views/cid_search'));
app.use('/cid_finance', express.static(__dirname + '/views/cid_finance'));
app.use('/cid_lecture', express.static(__dirname + '/views/cid_lecture'));
app.use('/cid_quiz', express.static(__dirname + '/views/cid_quiz'));
app.use(flash());






app.use('/', routes);
app.use('/users', users);
app.use('/adm', admin);

//app.get
app.use('/',about);
app.use('/',cmn);
app.use('/',consulting);
app.use('/',contents);
app.use('/',member);
app.use('/',search);
app.use('/',finance);
app.use('/',lecture);
app.use('/',quiz);


passport.use('local', new LocalStrategy({
	
    usernameField : 'email',
    passwordField : 'pw',
    passReqToCallback : true
}

,function(req, email, pw, done) {
	
	mysql.select('select * from cider.cid_user where user_email ="'+email+'" and user_password = "'+pw+'"', function (err, data){
		console.log("data");
		console.log(data.length);
		if(data.length < 1){
			console.log('fail');
			return done(null, false);
		}else {
			console.log('success');
			return done(null, data);
		}
		if(err){
			res.redirect('back');
		}
		
    });
	
}
));

passport.use('applycancel', new LocalStrategy({
	
    usernameField : 'app_no',
    passwordField : 'app_name',
    passReqToCallback : true
}

,function(req, app_no, app_name, done) {
	
	mysql.select('select * from cider.cid_applyform where app_no ="'+app_no+'" and app_name = "'+app_name+'"', function (err, data){
		console.log("data");
		console.log(data.length);
		if(data.length < 1){
			console.log('fail');
			//res.send('<script>alert("쿠폰번호를 확인해주세요.");location.href="/lecture/apply";</script>');
			return done(null, false);
		}else {
			console.log('success');
			return done(null, data);
		}
		if(err){
			
			res.redirect('back');
		}
    });	
}
));

passport.serializeUser(function(user, done) {
    done(null, user);
    // if you use Model.id as your idAttribute maybe you'd want
    // done(null, user.id);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	//2016년 12월 8일 추가됨
	
  res.setTimeout(120000, function(){
        console.log('Request has timed out.');
            //res.send(408);
        });
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

var server = app.listen(app.get('port'), function() {
//http.createServer(app).listen(app.get('port'), function(){
//	console.log('Express server listening on port ' + app.get('port'));

  debug('Express server listening on port ' + server.address().port);
});

