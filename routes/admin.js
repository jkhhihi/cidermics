/**
 * http://usejsdoc.org/
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');

var multer = require('multer');

var storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, './public/uploads');
	},
	filename: function (req, file, callback) {
		callback(null, file.originalname);
	}
});
var upload = multer({ storage : storage});

var formidable = require('formidable');
var dir = require('node-dir');

var multiparty = require('connect-multiparty');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


//var multer = require('multer');
//var upload = multer({ dest: '../public/uploads/' });
//var formidable = require('formidable');
//var dir = require('node-dir');
var mysql = require("./model/mysql");
var passport = require('passport');

//시간 설정
function getWorldTime(tzOffset) { // 24시간제
	  var now = new Date();
	  var tz = now.getTime() + (now.getTimezoneOffset() * 60000) + (tzOffset * 3600000);
	  now.setTime(tz);


	  var s =
	    leadingZeros(now.getFullYear(), 4) + '-' +
	    leadingZeros(now.getMonth() + 1, 2) + '-' +
	    leadingZeros(now.getDate(), 2) + ' ' +

	    leadingZeros(now.getHours(), 2) + ':' +
	    leadingZeros(now.getMinutes(), 2) + ':' +
	    leadingZeros(now.getSeconds(), 2);

	  return s;
}

function leadingZeros(n, digits) {
	  var zero = '';
	  n = n.toString();

	  if (n.length < digits) {
	    for (i = 0; i < digits - n.length; i++)
	      zero += '0';
	  }
	  return zero + n;
	}

/* GET home page. */
router.get('/', function(req, res, next) {
	
	var CP = 0;
	console.log(req.cookies);
	if(req.cookies.auth){
		res.redirect('/adm/contents');
	}else{
		res.render('admin/admin', {CP:CP});
	}
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/adm', failureFlash: true }), function(req, res, next) {
	var CP = 0;
	res.redirect('/adm/contents');
	/*var id = req.body.id;
	var pw = req.body.pw;
	
	console.log(id, pw);
	if(id == "superadmin" && pw == "boto7aws!"){
		res.cookie('auth', true);
		res.redirect('/adm/contents');
	}else {
		res.redirect('/adm');
	}*/
});


router.get('/contents', ensureAuthenticated, function(req, res, next) {
	var CP = 1;
		mysql.select('select * from cider.cid_contents order by con_no desc', function (err, data){
			 res.render('admin/contents/contents', { CP : CP, contents : data });	    	
		});
});


router.get('/contents/insert', ensureAuthenticated, function(req, res, next) {
	
	var CP = 1;
	var cate;
	var user;
	
	console.log(cate);
	console.log(user);
	mysql.select('select * from cider.cid_con_cate', function (err, data){
		if(err){
			res.redirect('back');
		}
		
		cate = data;
		
		mysql.select('select * from cider.cid_user where user_level="2"', function (err, data2){
			if(err){
				res.redirect('back');
			}
			user = data2;

			res.render('admin/contents/insert', {cate : cate, user : user, CP : CP});
			});
		});
    });





router.get('/contents/files/:page', ensureAuthenticated, function(req, res, next){
	var page;
	if (typeof req.params.page == 'undefined'){
		page = 1;
	}
	page = req.params.page;
	var obj = [];
	var start = (page - 1) * 9;
	var end = page * 9 -1;
	
	var dir = __dirname + "/../public/uploads/";
	var files = fs.readdirSync(dir)
	    .map(function(v) {
	        return { name:v,
	                 time:fs.statSync(dir + v).mtime.getTime()
	               }; 
	     })
	     .sort(function(a, b) { return a.time - b.time; })
	     .map(function(v) { return v.name; });
	
	files.reverse();
	for (var i = start; i < end+1; i++){
		obj.push(files[i]);
	}
	var pagination = [];
	var totalPage = Math.ceil(files.length / 9);
	var startPage;
	var lastPage;
	if(page % 5 != 0){ startPage = Math.floor(page/5) * 5 + 1; lastPage = Math.ceil(page/5) * 5; }
	else{ startPage = (page/5) * 5 - 4; lastPage = parseInt(page) };
	
	var next = true;
	
	if (lastPage >= totalPage){
		lastPage = totalPage;
		next = false;
	}
	pagination.push(totalPage, startPage, lastPage, next, parseInt(page));
	res.send({'pagination' : pagination, 'files': obj});
});

/*router.post('/contents/insert/search', ensureAuthenticated, function(req, res, next) {
	
	var CP = 1;
	var search;
	var key = req.body.key;
	var keyword = req.body.keyword;
	console.log(keyword+"=============123");
	mysql.select('SELECT * from cider.cid_contents where con_title like \'%' + keyword + '%\' order by con_no desc', function (err, data){
		if(err){
			res.redirect('back');
			search = data;
			console.log(search);
			console.log('=====================');
			console.log('=====================');
			console.log(keyword);
			console.log('=====================');
			console.log('=====================');
		}
		res.render('admin/contents/insert', {CP : CP, search:data});
	
	});
});*/

router.post('/contents/insert/upload', ensureAuthenticated, function(req, res, next) {
	
	var form = new formidable.IncomingForm();
	
	form.parse(req);
//	form.on("fileBegin", function (name, file){
//		console.log('upload come on3');
//		
//    });
    form.on("file", function (name, file){
        fs.readFile(file.path, function(error, data){
        	var filePath = __dirname + '/../public/uploads/' + file.name;
			
        	
        	fs.writeFile(filePath, data, function(error){
        		if(error){
        			//throw err;
        			//res.redirect('back');
        		}else {
        			//form.on("end", function() {
        				 // res.redirect('back');
        				//});
        		}
        	});
			
		
				
        });
    });
    
    form.on("end", function() {
		  res.redirect('back');
		});

});

router.post('/contents/insert', ensureAuthenticated, function(req, res, next) {
	
	var CP = 1;
	
	var title = req.body.title;
	var contents = req.body.contents;
	var category = req.body.category;
	var photo = req.body.photo;
	var userNo = req.body.userNo;
	var writer = req.body.writer;
	var userText = req.body.userText;
	var date = getWorldTime(+9);
	
	var sets = {con_category : category, con_title : title, con_content : contents, con_photo : photo, con_viewCount : 0, con_regDate : date, con_upDate : date, con_writer : writer, user_no : userNo, user_comment : userText};
	
	mysql.insert('insert into cider.cid_contents set ?', sets,  function (err, data){

		console.log(writer);
		console.log(err);
		console.log(data);
		
    	res.redirect('/adm/contents');
    	
    });
});

router.post('/contents/update', ensureAuthenticated, function(req, res, next) {
	
	var CP = 1;
	
	var no = req.body.no;
	var title = req.body.title;
	var contents = req.body.contents;
	var category = req.body.category;
	var photo = req.body.photo;
	var userNo = req.body.userNo;
	var writer = req.body.writer;
	var userText = req.body.userText;
	var date = getWorldTime(+9);
	
	var sets = {con_no : no, con_category : category, con_title : title, con_content : contents, con_photo : photo, con_upDate : date, user_no : userNo, user_comment : userText, con_writer : writer  };
	console.log(sets);
	mysql.update('update cider.cid_contents set con_category = :con_category,  con_title = :con_title, con_content = :con_content, con_photo = :con_photo,  con_upDate = :con_upDate, user_no = :user_no, user_comment = :user_comment, con_writer = :con_writer where con_no = :con_no', sets, function (err, data){
		
		console.log(err);
		console.log(data);
		
		
    	res.redirect('/adm/contents');
    	
    });
});


router.get('/contents/delete/:no', ensureAuthenticated, function(req, res, next) {
	
	var CP = 1;
	var no = req.params.no;
	
	mysql.del('delete from cider.cid_contents where con_no = '+ no +'', function (err, data){
		if(err){
			res.redirect('/adm/contents');
		}else{
			res.redirect('/adm/contents');
		}
    	
    });
});

router.get('/contents/detail/:no', ensureAuthenticated, function(req, res, next) {
	
	var CP = 1;
	var no = req.params.no;
	var cate;
	var user;
	
	mysql.select('select * from cider.cid_con_cate', function (err, data){
		if(err){
			res.redirect('back');
		}
			mysql.select('select c.con_no, c.con_category, c.con_writer, c.con_title, c.con_content, c.con_photo, c.con_viewCount, c.con_regDate, c.con_upDate, c.con_likeCnt, c.comment_no, c.user_no, c.user_comment, u.user_email, u.user_name, u.user_profile_img, u.user_sns_url, u.user_sns_icon from cider.cid_contents c left join cider.cid_user u on u.user_no = c.user_no and u.user_level = "2" where 1=1 and c.con_no = '+no+'', function (err, data2){
				if(err){
					res.redirect('back');
				}
				mysql.select('select * from cider.cid_user where user_level="2"', function (err, data3){
					if(err){
						res.redirect('back');
					}
					user = data3;
					console.log(user);
					res.render('admin/contents/update', {contents : data2, CP : CP, cate : data, user : user});
					
			    });
				
			});
		
    });
	
});


router.get('/consulting', ensureAuthenticated, function(req, res, next) {
	var CP = 2;
	mysql.select('select * from cider.cid_consulting order by cons_no desc', function (err, data){
		 res.render('admin/consulting/consulting', { CP : CP, consulting : data });
	});
	
});

router.post('/consulting/insert', ensureAuthenticated, function(req, res, next) {
	var CP = 2;
	
	var contents = req.body.contents;
	var url = req.body.url;
	var name = req.body.name;
	var photo = req.body.photo;
	var date = getWorldTime(+9);
	
	var sets = {cons_name : name, cons_img : photo, cons_site_url : url, cons_content : contents, cons_regDate : date, cons_upDate : date };
	console.log('insert into cider.cid_consulting set ? '+sets);
	mysql.insert('insert into cider.cid_consulting set ?', sets,  function (err, data){
		
		console.log(err);
		console.log(data);
		
    	res.redirect('/adm/consulting');
    	if (err){
    		res.redirect('/adm/consulting');
    	}
    });
});

router.get('/consulting/insert', ensureAuthenticated, function(req, res, next) {
	
	var CP = 2;
	res.render('admin/consulting/insert', { CP : CP });
	
});

router.get('/consulting/detail/:no', ensureAuthenticated, function(req, res, next) {
	
	var CP = 2;
	var no = req.params.no;
	var user;
	
	mysql.select('select * from cider.cid_user where user_level="2"', function (err, data2){
		if(err){
			res.redirect('back');
		}
		user = data2;
		mysql.select('select * from cider.cid_consulting where cons_no = '+ no +'', function (err, data){
			if(err){
				res.redirect('back');
			}
			res.render('admin/consulting/update', {consulting : data, CP : CP, user: user});
		});
    });
});

router.post('/consulting/update', ensureAuthenticated, function(req, res, next) {
	
	var CP = 2;
	
	var no = req.body.no;
	var name = req.body.name;
	var contents = req.body.contents;
	var img = req.body.photo;
	var url = req.body.url;
	var date = getWorldTime(+9);
	
	var sets = {cons_no : no, cons_name : name, cons_content : contents, cons_img : img, cons_site_url : url, cons_upDate : date };
	
	mysql.update('update cider.cid_consulting set cons_name = :cons_name,  cons_img = :cons_img, cons_site_url = :cons_site_url, cons_content = :cons_content,  cons_upDate = :cons_upDate where cons_no = :cons_no', sets, function (err, data){
		
		console.log(err);
		console.log(data);
		
    	res.redirect('/adm/consulting');
    	
    });
});


router.get('/consulting/delete/:no', ensureAuthenticated, function(req, res, next) {
	
	var CP = 2;
	var no = req.params.no;
	
	mysql.del('delete from cider.cid_consulting where cons_no = '+ no +'', function (err, data){
		if(err){
			res.redirect('/adm/consulting');
		}else{
			res.redirect('/adm/consulting');
		}
    	
    });
});
function ensureAuthenticated(req, res, next) {
    // 로그인이 되어 있으면, 다음 파이프라인으로 진행
    if (req.isAuthenticated()) { return next(); }
    // 로그인이 안되어 있으면, login 페이지로 진행
    res.redirect('/adm');
}

module.exports = router;
