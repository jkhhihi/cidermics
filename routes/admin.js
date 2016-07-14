/**
 * http://usejsdoc.org/
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
var upload = multer({ dest: '../public/uploads/' });
var formidable = require('formidable');
var dir = require('node-dir');
var mysql = require("./model/mysql");


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
router.post('/login', function(req, res, next) {
	var CP = 0;
	var id = req.body.id;
	var pw = req.body.pw;
	
	console.log(id, pw);
	if(id == "superadmin" && pw == "boto7aws!"){
		res.cookie('auth', true);
		res.redirect('/adm/contents');
	}else {
		res.redirect('/adm');
	}
});


router.get('/contents', function(req, res, next) {
	var CP = 1;
	if(req.cookies.auth){
		 mysql.select('select * from cider.cid_contents order by con_no desc', function (err, data){
			 res.render('admin/contents/contents', { CP : CP, contents : data });	    	
		});
	}else {
		res.redirect("/adm");
	}
	 
});

router.get('/contents/insert', function(req, res, next) {
	
	var CP = 1;	
	var cate;
	var user;
	
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
			console.log(user);
			res.render('admin/contents/insert', {cate : cate, user : user, CP : CP });
			
	    });
		
		
    });
	
});

router.get('/contents/files/:page', function(req, res, next){
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
router.post('/contents/insert/upload', function(req, res, next) {
	
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
        			res.redirect('back');
        		}else {
        			res.redirect('back');
        		}
        	});
        })
    });

});

router.post('/contents/insert', function(req, res, next) {
	
	var CP = 2;
	
	var title = req.body.title;
	var contents = req.body.contents;
	var category = req.body.category;
	var photo = req.body.photo;
	var userNo = req.body.userNo;
	var writer = req.body.writer;
	var userText = req.body.userText;
	var date = getWorldTime(+9);
	
	var sets = {con_category : category, con_title : title, con_content : contents, con_photo : photo, con_viewCount : 0, con_regDate : date, con_upDate : date, con_writer : writer, user_no : userNo, user_comment : userText };
	
	mysql.insert('insert into cider.cid_contents set ?', sets,  function (err, data){
		
		console.log(err);
		console.log(data);
		
    	res.redirect('/adm/contents');
    	
    });
});

router.post('/contents/update', function(req, res, next) {
	
	var CP = 2;
	
	var no = req.body.no;
	var title = req.body.title;
	var contents = req.body.contents;
	var category = req.body.category;
	var photo = req.body.photo;
	var date = getWorldTime(+9);
	
	var sets = {con_no : no, con_category : category, con_title : title, con_content : contents, con_photo : photo, con_viewCount : 0, con_regDate : date, con_upDate : date };
	
	mysql.update('update cider.cid_contents set con_category = :con_category,  con_title = :con_title, con_content = :con_content, con_photo = :con_photo,  con_upDate = :con_upDate where con_no = :con_no', sets, function (err, data){
		
		console.log(err);
		console.log(data);
		
    	res.redirect('/adm/contents');
    	
    });
});


router.get('/contents/delete/:no', function(req, res, next) {
	
	var CP = 2;
	var no = req.params.no;
	
	mysql.del('delete from cider.cid_contents where con_no = '+ no +'', function (err, data){
		if(err){
			res.redirect('/adm/contents');
		}else{
			res.redirect('/adm/contents');
		}
    	
    });
});

router.get('/contents/detail/:no', function(req, res, next) {
	
	var CP = 2;
	var no = req.params.no;
	var cate = 
	
	mysql.select('select * from cider.cid_con_cate', function (err, data){
		if(err){
			res.redirect('back');
		}
			mysql.select('select * from cider.cid_contents where con_no = '+ no +'', function (err, data2){
				if(err){
					res.redirect('back');
				}
				res.render('admin/contents/update', {contents : data2, CP : CP, cate : data,});
				
			});
		
    });
	
});


router.get('/consumption', function(req, res, next) {
	var CP = 2;
	if(req.cookies.auth){
		res.render('admin/consumption/consumption', { CP : CP });
	}else {
		res.redirect("/adm");
	}
});

router.get('/consumption/insert', function(req, res, next) {
	var CP = 2;

	res.render('admin/consumption/insert', { CP : CP });
});



module.exports = router;
