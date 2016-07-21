var express = require('express');
var router = express.Router();
var mysql = require("./model/mysql");

router.get('/contents', function(req, res, next) {
	
	var row;
	mysql.select('select con_no, con_photo, con_title from cider.cid_contents where con_category = "1" order by con_no desc limit 0,12', function (err, data){
		 if (err) throw err;
		 console.log("data");
		 console.log(data);
		 
		 row = data;
		 res.render('front/cid_contents/cid_contents', { contents : row});
	});

});

router.get('/contents/detail/:no', function(req, res, next) {
	

	var no = req.params.no;
	var sets = {con_no : no};
	var next = {};
	var pre = {};
	var contents;
	mysql.update('update cider.cid_contents set con_viewCount = con_viewCount + 1 where con_no = :con_no', sets ,function (err, data){
		if(err){
			res.redirect('back');
		}
		mysql.select('select c.con_no, c.con_category, c.con_writer, c.con_title, c.con_content, c.con_photo, c.con_viewCount, c.con_regDate, c.con_upDate, c.con_likeCnt, c.comment_no, c.user_no, c.user_comment, u.user_email, u.user_name, u.user_profile_img, u.user_sns_url, u.user_sns_icon from cider.cid_contents c left join cider.cid_user u on u.user_no = c.user_no and u.user_level = "2" where 1=1 and c.con_no = '+no+'', function (err, data){
			
			if(err){
				res.redirect('back');
			} 
			var lang = data[0].con_category;
			contents = data;
			
//			mysql.select('SELECT con_no, con_title FROM raonomics.rw_content WHERE con_no > '+ no +' and con_category = "'+ lang +'" LIMIT 1 UNION ALL ( SELECT con_no, con_title FROM raonomics.rw_content WHERE con_no < '+ no +' and con_category = "'+ lang +'" ORDER BY con_no DESC LIMIT 1 ) order by con_no desc' , function (err, data){
//			mysql.select('(SELECT con_no, con_title FROM cider.cid_contents WHERE con_no > '+ no +' and con_category = "'+ lang +'" LIMIT 1) UNION ( SELECT con_no, con_title FROM cider.cid_contents WHERE con_no < '+ no +' and con_category = "'+ lang +'" ORDER BY con_no DESC LIMIT 1 ) order by con_no desc' , function (err, data){				
//				if(err){
//					res.redirect('back');
//				}
				
//				res.render('front/cid_contents/cid_contents_detail', {contents : contents, preNext : data});
				res.render('front/cid_contents/cid_contents_detail', {contents : contents});
//			});
		});
	});


});


module.exports = router;
