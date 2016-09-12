var express = require('express');
var router = express.Router();
var mysql = require("./model/mysql");

router.get('/lecture', function(req, res, next) {
	
	var row;
	mysql.select('select con_no, con_photo, con_title from cider.cid_contents order by con_viewCount desc limit 0,4', function (err, data){
		 if (err) throw err;
		 console.log("data");
		 console.log(data);
		 
		 row = data;
		 res.render('front/cid_lecture/cid_lecture', { contents : row});
	});

});

router.get('/lecture/detail', function(req, res, next) {

	res.render('front/cid_lecture/cid_lecture_detail', { });

});

router.get('/lecture/apply', function(req, res, next) {

	res.render('front/cid_lecture/cid_lecture_apply', { });

});

router.get('/lecture/sale', function(req, res, next) {

	res.render('front/cid_lecture/cid_lecture_sale', { });

});

module.exports = router;
