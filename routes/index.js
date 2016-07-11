var express = require('express');
var router = express.Router();
var mysql = require("./model/mysql");

/* GET home page. */
router.get('/', function(req, res, next) {
	
	var row;
	mysql.select('select con_no, con_photo, con_title from cider.cid_contents where con_category = "1" order by con_no desc limit 0,12',
	 function (err, data){
		if (err) throw err;
		console.log("data");
		console.log(data);
		 
		 row = data;
		 
		 
	res.render('front/cid_main', { contents : row});
  });
});


router.get('/top', function(req, res, next) {

	res.render('front/top', { });

});

router.get('/bottom', function(req, res, next) {

	res.render('front/bottom', { });

});



module.exports = router;
