var express = require('express');
var router = express.Router();
var mysql = require("./model/mysql");

/* GET home page. */
router.post('/search/process', function(req, res, next) {
	
	
	var keyword = req.body.keyword;
	
	console.log(keyword);
	
	//res.send(keyword);
	//res.redirect('/search');
	
	mysql.select('SELECT * from cider.cid_contents where con_content like \'%'+ keyword +'%\' order by con_no desc;',
			 
			
			function (err, data){
				if (err) throw err;
				 
			res.render('front/cid_search/cid_search', { contents : data});
		  });
	
	
  });
/*
router.get('/search', function(req, res, next) {
	var keyword;
	keyword = req.params.keyword;
	console.log("+++++");
	console.log(keyword+"1234");
	mysql.select('SELECT * from cider.cid_contents where con_content like \'%'+ keyword +'%\' order by con_no desc;',
	 
		
	function (err, data){
		if (err) throw err;
		 
	res.render('front/cid_search/cid_search', { contents : data});
  });
});
*/

module.exports = router;
