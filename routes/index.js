var express = require('express');
var router = express.Router();
var mysql = require("./model/mysql");

/* GET home page. */

router.get('/', function(req, res, next) {
	var row;
	mysql.select('select con_no, con_photo, con_title from cider.cid_contents order by con_no desc limit 0,12',
	 function (err, data){
		if (err) throw err;
		console.log("data");
		console.log(data);
		 row = data;
	res.render('front/cid_main', { contents : row});
  });
});

/* GET home page. */
/*
router.get('/', function(req, res, next) {
   var row;
  // var d=new Date('8/23/2016 17:59:00');
   var d=new Date ();
   d.getFullYear ();
   d.getMonth ();
   d.getDate ();
   d.getHours ();
   d.getMinutes();
   
   var chk=d.getMonth ();
   if (chk.len ()<1){
	   cjk="0"+chk; 
   }
   

    var now = new Date();
    var qry="";
  if (now >= d)
  {
    //신규 다른 사이트 이동 chk=N 까지 다보임
   //document.write("날자 지남 적용");
   //location.href="index2";
       qry="select con_no, con_photo, con_title from cider.cid_contents order by con_no desc limit 0,24";
   } else {
      //변경 하기전 사이트
       qry="select con_no, con_photo, con_title from cider.cid_contents where con_release='now' order by con_no desc limit 0,24";
      
   }
   //mysql.select('select con_no, con_photo, con_title from cider.cid_contents order by con_no desc limit 0,24',
   mysql.select(qry,
    function (err, data){
      if (err) throw err;
      console.log("data");
      console.log(data);
       row = data;
   res.render('front/cid_main', { contents : row});
  });
});

*/


router.get('/top', function(req, res, next) {

	res.render('front/top', { });

});

router.get('/bottom', function(req, res, next) {

	res.render('front/bottom', { });

});

router.get('/modal', function(req, res, next) {

	res.render('front/modal', { });

});




module.exports = router;
