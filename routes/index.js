var express = require('express');
var router = express.Router();
var mysql = require("./model/mysql");

/* GET home page. */
/*
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
*/
/* GET home page. */
router.get('/', function(req, res, next) {
	var row;
	/*
	var d=new Date('8/23/2016 17:59:00');

    var now = new Date();
	 var _year=  now.getFullYear ();
     var _mon =   now.getMonth ();
	 if _mon.length() < 2 
	    _mon="0"+_mon;
     var _date=now.getDate ();
     var hor = now.getHours ();
     var qry="";
  if (now >= d)
  {
    //신규 다른 사이트 이동 chk=N 까지 다보임
	//document.write("날자 지남 적용");
	//location.href="index2";
	    qry="select con_no, con_photo, con_title from cider.cid_contents order by con_no desc limit 0,24";
   } else {
	   //변경 하기전 사이트
	    qry="select con_no, con_photo, con_title from cider.cid_contents where con_release='Y' order by con_no desc limit 0,24";
		
   }
	//mysql.select('select con_no, con_photo, con_title from cider.cid_contents order by con_no desc limit 0,24',
	*/
	var now = new Date();
	 var _year=  now.getFullYear();
     var _mon =   now.getMonth()+1;
	 _mon=""+_mon;
	 if (_mon.length < 2 )
	 {
	    _mon="0"+_mon;
	 }
     var _date=now.getDate ();
     _date =""+_date;
     if (_date.length < 2 )
	 {
	    _date="0"+_date;
	 }
     var _hor = now.getHours ()
	 _hor =""+_hor;
	 if (_hor.length < 2 )
	 {
	    _hor="0"+_hor;
	 }
	 var _min=now.getMinutes();
	  _min =""+_min;
	 if (_min.length < 2 )
	 {
	    _min="0"+_min;
	 }
	 
	 var _tot=_year+""+_mon+""+_date+""+_hor+""+ _min;
	 //alert(_mon.length);
	 //alert(_tot);
	
	 //qry="select con_no, con_photo, con_title,(select con_upData from cider.cid_contents a where a.con_upDate > DATE_ADD(a.con_upDate,INTERVAL 1 DAY) as new from cider.cid_contents where con_release <= '"+_tot+"' order by con_no desc limit 0,12";
	 //=====2016년 12월 7일 수정 본  sjshin ======
	 //=====오늘 날자 읽어와서 -1 즉 하루 뺀 날자와 비교 하여 큰것 즉 오늘 날자일 경우 new  하루 이상일 경우 old 로 표기됨 
	 //=====웹페이지 에서 if 문 사용하여 new 일경우 신규로 표시하면 됨    
	 qry="select con_no, con_photo, con_title, if (a.con_upDate > DATE_ADD(now(),INTERVAL -1 DAY) ,'/page_imgs/main_img/new_mark4.svg','/page_imgs/main_img/new_mark1px.png') as chkDat from cider.cid_contents a where a.con_release <= '"+_tot+"' order by a.con_no desc limit 0,12";
	 console.log(_tot);
	mysql.select(qry,
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

router.get('/complete', function(req, res, next) {

	res.render('front/complete', { });

});

router.get('/modal', function(req, res, next) {

	res.render('front/modal', { });

});

router.get('/appdown', function(req, res, next) {

	res.render('front/cid_appdown', { });

});





module.exports = router;
