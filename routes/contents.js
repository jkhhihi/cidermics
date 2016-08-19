var express = require('express');
var router = express.Router();
var mysql = require("./model/mysql");

router.get('/contents', function(req, res, next) {
	
	var row;
	mysql.select('select con_no, con_photo, con_title from cider.cid_contents order by con_viewCount desc limit 0,24', function (err, data){
		 if (err) throw err;
		 console.log("data");
		 console.log(data);
		 
		 row = data;
		 res.render('front/cid_contents/cid_contents', { contents : row});
	});

});



router.get('/contents/:no', function(req, res, next) {
	
	var no = req.params.no;
	var sets = {con_category : no};
	var row;
	mysql.select('select con_no, con_photo, con_title from cider.cid_contents where con_category = '+no+' order by con_no desc limit 0,24', function (err, data){
		 if (err) throw err;
		 
		 row = data;
		 res.render('front/cid_contents/cid_contents', { contents : row});
	});

});


router.get('/contents/detail/:no', function(req, res, next) {
	

	var no = req.params.no;
	
	var x = Math.floor((Math.random() * 270) + 1);
	
	
	var row;
	var sets = {con_no : no};
	var next = {};
	var pre = {};
	mysql.update('update cider.cid_contents set con_viewCount = con_viewCount + 1 where con_no = :con_no', sets ,function (err, data){
		if(err){
			res.redirect('back');
		}
		mysql.select('select c.con_no, c.con_category, c.con_writer, c.con_title, c.con_content, c.con_photo, c.con_viewCount, c.con_regDate, c.con_upDate, c.con_likeCnt, c.comment_no, c.user_no, c.user_comment,  u.user_email, u.user_name, u.user_profile_img, u.user_sns_url, u.user_sns_icon, cate.cate_no, cate.cate_name from cider.cid_contents c left join cider.cid_user u on u.user_no = c.user_no left join cider.cid_con_cate cate on c.con_category = cate.cate_no and u.user_level = "2" where 1=1 and c.con_no = '+no+'', function (err, data){
			
			if(err){
				res.redirect('back');
			} 
			var lang = data[0].con_category;
			contents = data;
			
			mysql.select('(SELECT con_no, con_title, con_photo FROM cider.cid_contents WHERE con_no > '+ no +' and con_category = "'+ lang +'" LIMIT 1) UNION ( SELECT con_no, con_title ,con_photo FROM cider.cid_contents WHERE con_no < '+ no +' and con_category = "'+ lang +'" ORDER BY con_no DESC LIMIT 1 ) order by con_no desc' , function (err, data){				
				if(err){
					res.redirect('back');
				}
				
				
				mysql.select('select con_no, con_photo, con_title from cider.cid_contents ORDER BY RAND() LIMIT 0,24', function (err, data1){
					 if (err) throw err;
					 row = data1;

				/*mysql.select('select con_no, con_photo, con_title from cider.cid_contents where con_no = check_no1 order by con_viewCount desc limit 0,12', function (err, data){
				//mysql.select('(SELECT con_title, con_photo FROM cider.cid_contents WHERE con_no = check_no1' , function (err, data){				
					if(err){
						
						res.redirect('back');
					}
						checkno = data;*/

				res.render('front/cid_contents/cid_contents_detail', {contents : contents, preNext : data, cont : row});
				//res.render('front/cid_contents/cid_contents_detail', {contents : contents});
			});
		  });
		});
	});
});


/* 연관검색어 체크로 하는거 
 * 
 * mysql.select('SELECT *  FROM cider.cid_contents  where  con_no IN (	SELECT check_no1  FROM cider.cid_contents where con_no='+no+' ) or  con_no  IN (SELECT check_no2  FROM cider.cid_contents where con_no='+no+') or  con_no  IN (SELECT check_no3  FROM cider.cid_contents where con_no='+no+') or  con_no  IN (SELECT check_no4  FROM cider.cid_contents where con_no='+no+')', function (err, data){
					if(err){
						res.redirect('back');
					}
					console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmm");
					checkno = data;
					console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmm");
					
					res.render('front/cid_contents/cid_contents_detail', {contents : contents, preNext : data, checkno:checkno});
					
					});
 */




router.get('/addMore/:idx/:num', function(req, res, next) {
	
	var idx = req.params.idx;
	console.log(idx+"=================");
	var num = req.params.num;
	console.log(num+"=================");
	var start = (idx - 1) * 12;
	console.log(start);
	var end = idx * 12;
	console.log(start, end);
	mysql.select('select con_no, con_photo, con_title  from cider.cid_contents where con_category = "'+ num +'" order by con_no desc limit '+ start +', '+ end +'', function (err, data){
		 if (err) throw err;
		 console.log("data");
		 console.log(data);
		 
		 res.send({ contents : data });
	});
	
});

module.exports = router;
