var express = require('express');
var router = express.Router();
var mysql = require("./model/mysql");

var pool = require("./model/mysql");

router.get('/ftest', function(req, res, next) {
	var consult_name = req.body.consult_name;
	var row;
	var CP = 1;
	mysql.select('select * from cider.cid_finance', function (err, data){
		//res.render('front/cid_finance/cid_finance', {contents : data});	    	
	//});});

	res.render('front/cid_finance/cid_finance_test', {row : data});
	});
});

router.post('/ftest', function(req, res, next) {
	var consult_name = req.body.consult_name;
	var consult_test = req.body.consult_test;
	var coup_code = req.body.coup_code;
	var row;
	//var consult_no = req.body.consult_no;
	//var no = consult_no + 1;
	console.log(consult_name);
	
	var sets = {consult_name : consult_name, consult_test : consult_test};
	
	//mysql.select('select * from cider.cid_coupon where coup_code = '+coup_code+'', function (err, data){
	pool.insert('INSERT INTO cider.cid_finance (consult_name) VALUES (?)',sets, function (err, data){
		if(err){
			res.redirect('back');
		} 
		res.render('front/cid_finance/cid_finance_test', {row : data});
	 });
	});


router.get('/ftest/checkcode', function(req, res, next) {

	var coup_code = req.body.coup_code;
	
	console.log(coup_code);
});

router.get('/finance/profile', function(req, res, next) {

	res.render('front/cid_finance/cid_finance_profile', { });

});

router.get('/finance', function(req, res, next) {

	res.render('front/cid_finance/cid_finance', { });

});


router.get('/finance/apply', function(req, res, next) {

	res.render('front/cid_finance/cid_finance_apply', { });

});

router.get('/finance/contents', function(req, res, next) {

	res.render('front/cid_finance/cid_finance_contents', { });

});

router.get('/finance/review', function(req, res, next) {

	res.render('front/cid_finance/cid_finance_review', { });

});




module.exports = router;
