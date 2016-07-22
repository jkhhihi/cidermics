var express = require('express');
var router = express.Router();
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
var mysql = require("./model/mysql");

/* GET users listing. */
passport.use('local', new LocalStrategy({
	
    usernameField : 'email',
    passwordField : 'pw',
    passReqToCallback : true
}
,function(req, email, pw, done) {
	
	mysql.select('select * from cider.cid_user where user.email ='+email+' and user_password = '+pw+'', function (err, data){
		console.log(data);
		if(data.length < 1){
			return done(null, false);
		}else {
			return done(null, data);
		}
		if(err){
			res.redirect('back');
		}
		
    });
	
}
));

passport.serializeUser(function(user, done) {
    console.log('serialize');
    done(null, user);
});


module.exports = router;
