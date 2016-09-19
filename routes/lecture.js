var express = require('express');
var router = express.Router();
var mysql = require("./model/mysql");

var pool = require("./model/mysql");

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

function numberWithCommas(lec_price) {
    return lec_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    console.log(lec_price);
}

router.get('/lecture/apply', function(req, res, next) {
	var lec_price = 200000;

	console.log(lec_price);

	res.render('front/cid_lecture/cid_lecture_apply', {lec_price:lec_price });

});

router.get('/lecture/apply', function(req, res, next) {
	var lec_price = 200000;

	console.log(lec_price);

	res.render('front/cid_lecture/cid_lecture_apply', {lec_price:lec_price });
});
router.post('/lecture/done', function(req, res, next) {
	var app_no = req.body.app_no;
	var app_cate = req.body.app_cate;
	var app_name = req.body.app_name;
	var app_phone = req.body.app_phone;
	var app_email = req.body.app_email;
	var app_job = req.body.app_job;
	var app_path = req.body.app_path;
	var lec_price = req.body.lec_price;
	
	var row;
	var sets = {app_cate : 1, app_name : app_name, app_price : lec_price, app_phone : app_phone, app_email : app_email, app_job : app_job, app_path : app_path};
	
	pool.insert('insert into cider.cid_applyform set ?', sets, function (err, data){
		if(err){
			res.redirect('back');
		} 
		res.render('front/cid_lecture/cid_lecture_done', {row : data});
	 });
});

router.post('/lecture/apply/codeapply', function(req, res, next) {
	var coup_code = req.body.coup_code;
	var lec_price = req.body.lec_price;
	
	console.log(coup_code,lec_price);
	
	if(coup_code == "aaaa" || coup_code == "bbbb" || coup_code == "cccc" || coup_code == "ffff" ){
		console.log("ok");
		lec_price = lec_price - 50000;
		res.render('front/cid_lecture/cid_lecture_apply', {lec_price:lec_price });
	}else {
		console.log("No");
		res.redirect('/lecture/apply');
	}
});
/*테스트용 */
router.get('/lecture/apply2', function(req, res, next) {

	res.render('front/cid_lecture/cid_lecture_apply2', { });

});

router.get('/lecture/detail', function(req, res, next) {

	res.render('front/cid_lecture/cid_lecture_detail', { });

});


router.get('/lecture/sale', function(req, res, next) {

	res.render('front/cid_lecture/cid_lecture_sale', { });

});

module.exports = router;
