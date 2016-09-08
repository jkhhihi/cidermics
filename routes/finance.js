var express = require('express');
var router = express.Router();
var mysql = require("./model/mysql");

var pool = require("./model/mysql");

router.get('/finance', function(req, res, next) {
	var consult_name = req.body.consult_name;
	
	//var CP = 1;
	//mysql.select('select * from cider.cid_finance order by consult_no desc limit 0,1', function (err, data){
		//res.render('front/cid_finance/cid_finance', {contents : data});	    	
	//});});

	res.render('front/cid_finance/cid_finance', { });});

router.post('/finance', function(req, res, next) {
	var consult_name = req.body.consult_name;
	var consult_no = req.body.consult_no;
	var no = consult_no + 1;
	console.log(consult_name);
	
	
	//var sets = {consult_name : consult_name};
	
	//mysql.insert('insert into cider.cid_finance set = '+consult_name,consult_name, function (err, data){ res.redirect('/finance');
	
	//mysql.insert('insert into cider.cid_finance SET ?', posts,  function (err, data){
	//INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
	//VALUES ('Cardinal','Tom B. Erichsen','Skagen 21','Stavanger','4006','Norway');
	
	pool.insert('INSERT INTO cider.cid_finance (consult_name) VALUES (?)',consult_name, function (err, data){
		if(err) console.log(err);
	
	//mysql.insert('insert into cider.cid_finance set consult_name = '+consult_name+'', consult_name,  function (err, data){

	
	res.redirect('/finance');
	
	});
});


module.exports = router;
