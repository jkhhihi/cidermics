var express = require('express');
var router = express.Router();
var mysql = require("./model/mysql");


router.get('/finance', function(req, res, next) {

	res.render('front/cid_finance/cid_finance', { });

});

router.post('/finance', function(req, res, next) {
	var consult_name = req.body.consult_name;
	console.log(consult_name);
	
	
	var sets = {consult_name : consult_name};
	
	//mysql.insert('insert into cider.cid_finance set = '+consult_name,consult_name, function (err, data){ res.redirect('/finance');
	
	//mysql.insert('insert into cider.cid_finance SET ?', posts,  function (err, data){
	
	mysql.insert('insert into cider.cid_finance set consult_name = ?', consult_name,  function (err, data){

	
	res.redirect('/finance');
	
	});
});


module.exports = router;
