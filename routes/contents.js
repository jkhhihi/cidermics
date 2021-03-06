var express = require('express');
var router = express.Router();
var mysql = require("./model/mysql");

router.get('/contents', function(req, res, next) {
	
	var row;
	mysql.select('select con_no, con_photo, con_title from cider.cid_contents order by con_viewCount desc limit 0,30', function (err, data){
		 if (err) throw err;
		 console.log("data");
		 console.log(data);
		 
		 row = data;
		 res.render('front/cid_contents/cid_contents_popular', { contents : row});
	});

});



router.get('/contents/:no', function(req, res, next) {
	
	var no = req.params.no;
	
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
   var _hor = now.getHours  ();
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
	
	var sets = {con_category : no, con_release : _tot};
	var row;
	
	qry="select con_no, con_photo, con_title from cider.cid_contents where con_category = '"+no+"' and con_release <= '"+_tot+"' order by con_no desc limit 0,12";

	
	//mysql.select('select con_no, con_photo, con_title from cider.cid_contents where con_category = '+no+' order by con_no desc limit 0,12', function (err, data){
	mysql.select(qry,
			 function (err, data){	 
				if (err) throw err;
		 
		 row = data;
		 res.render('front/cid_contents/cid_contents', { contents : row,no : no});
		
		 /*
		 if(no == 1){
			 res.render('front/cid_contents/cid_contents_ec', { contents : row});
		 }else if(no == 2){
			 res.render('front/cid_contents/cid_contents_fi', { contents : row});
		 }else if(no == 3){
			 res.render('front/cid_contents/cid_contents_co', { contents : row});
		 }else if(no == 4){
			 res.render('front/cid_contents/cid_contents_st', { contents : row});
		 }else{
		 res.render('front/cid_contents/cid_contents', { contents : row});
		 }
		 */
	});
});


router.get('/contents/detail/:no', function(req, res, next) {
	

	var no = req.params.no;
	
	//var x = Math.floor((Math.random() * 270) + 1);
	
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
	 var _hor = now.getHours  ();
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
	
	
	var row;
	var sets = {con_no : no, con_release : _tot};
	var next = {};
	var pre = {};
	mysql.update('update cider.cid_contents set con_viewCount = con_viewCount + 1 where con_no = :con_no', sets ,function (err, data){
		if(err){
			res.redirect('back');
		}
		mysql.select('select c.con_no, c.con_category, c.con_writer, c.con_title, c.con_content, c.con_photo, c.con_viewCount, c.con_regDate, c.con_upDate, c.con_likeCnt, c.comment_no, c.user_no, c.user_comment, c.con_release,  u.user_email, u.user_name, u.user_profile_img, u.user_sns_url, u.user_sns_icon, cate.cate_no, cate.cate_name from cider.cid_contents c left join cider.cid_user u on u.user_no = c.user_no left join cider.cid_con_cate cate on c.con_category = cate.cate_no and u.user_level = "2" where 1=1 and c.con_no = '+no+'', function (err, data){
			
			if(err){
				res.redirect('back');
			} 
			var lang = data[0].con_category;
			contents = data;
			
			//qry=("(SELECT con_no, con_title, con_photo FROM cider.cid_contents WHERE con_no > '+ no +' and con_category = '"+ lang +"' and con_release <= '"+_tot+"' LIMIT 1) UNION ( SELECT con_no, con_title ,con_photo FROM cider.cid_contents WHERE con_no < '+ no +' and con_category = '"+ lang +'" con_release <= '"+_tot+"' ORDER BY con_no DESC LIMIT 1 ) order by con_no desc" ;
			//mysql.select(qry, function (err, data){
			mysql.select('(SELECT con_no, con_title, con_photo FROM cider.cid_contents WHERE con_no > '+ no +' and con_category = "'+ lang +'" and con_release <= "'+_tot+'"  LIMIT 1) UNION ( SELECT con_no, con_title ,con_photo FROM cider.cid_contents WHERE con_no < '+ no +' and con_category = "'+ lang +'" and con_release <= "'+_tot+'" ORDER BY con_no DESC LIMIT 1 ) order by con_no desc' , function (err, data){				
				//mysql.select('(SELECT con_no, con_title, con_photo FROM cider.cid_contents WHERE con_no > '+ no +' and con_category = "'+ lang +'"  LIMIT 1) UNION ( SELECT con_no, con_title ,con_photo FROM cider.cid_contents WHERE con_no < '+ no +' and con_category = "'+ lang +'"  ORDER BY con_no DESC LIMIT 1 ) order by con_no desc' , function (err, data){				
						
				if(err){
					res.redirect('back');
				}
				
				qry="select con_no, con_photo, con_title from cider.cid_contents where con_release <= '"+_tot+"' ORDER BY RAND() LIMIT 0,36";
				 
				  
				   mysql.select(qry, function (err, data1){
				//mysql.select('select con_no, con_photo, con_title from cider.cid_contents where con_release <= "'+_tot+'" ORDER BY RAND() LIMIT 0,36', function (err, data1){
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



router.get('/addMore/:idx', function(req, res, next) {
   
   var idx = req.params.idx;
   var qry="";
   
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
     var _hor = now.getHours ();
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
   console.log(idx+"=================");
   var lang = req.params.lang;
   var start = (idx - 1) * 12;
   //var start= start +1;
   //var end = idx * 12;
   var end = 12;
   
   console.log(start, end);
   //mysql.select('select con_no, con_photo, con_title  from cider.cid_contents where con_category = "'+ idx +'" order by con_no desc limit '+ start +', '+ end +'', function (err, data){
   //mysql.select('select con_no, con_photo, con_title  from cider.cid_contents  order by con_no desc limit '+ start +', '+ end +'', function (err, data){
   qry="select con_no, con_photo, con_title  from cider.cid_contents where con_release <= '"+_tot+"' order by con_no desc limit "+ start +", "+ end +"";
   console.log(qry);
   mysql.select(qry, function (err, data){

       if (err) throw err;
       console.log("data");
       console.log(data);
       //console.log('select con_no, con_photo, con_title  from cider.cid_contents  order by con_no desc limit '+ start +', '+ end +'');
       res.send({ contents : data });
   });
   
});


router.get('/addMore2/:idx/:p', function(req, res, next) {
   
   var idx = req.params.idx;
   var p=req.params.p;
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
     var _hor = now.getHours ();
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
   console.log(idx+"=================");
   var lang = req.params.lang;
   var start = (idx - 1) * 12;
   var end = 12;
   var qry='';
   console.log(start, end);
         qry="select con_no, con_photo, con_title  from cider.cid_contents where con_release <= '"+_tot+"' and con_category = "+ p +" order by con_no desc limit "+ start +", "+ end +"";
       console.log(qry);
   
   mysql.select(qry, function (err, data){
       if (err) throw err;
       console.log("data");
       console.log(data);
       console.log('select con_no, con_photo, con_title  from cider.cid_contents  order by con_no desc limit '+ start +', '+ end +'');
       res.send({ contents : data });
   });
   
   
});

/*
router.get('/addMore/:idx', function(req, res, next) {
	
	var idx = req.params.idx;
	
	
	console.log(idx+"=================");
	var lang = req.params.lang;
	var start = (idx - 1) * 12;
	var end = 12;
	
	console.log(start, end);
	mysql.select('select con_no, con_photo, con_title  from cider.cid_contents  order by con_no desc limit '+ start +', '+ end +'', function (err, data){

		 if (err) throw err;
		 console.log("data");
		 console.log(data);
		 res.send({ contents : data });
	});
	
});


router.get('/addMore2/:idx/:p', function(req, res, next) {
	
	var idx = req.params.idx;
	var p=req.params.p;
	
	console.log(idx+"=================");
	var lang = req.params.lang;
	var start = (idx - 1) * 12;
	var end = 12;
	var qry='';
	console.log(start, end);
			qry='select con_no, con_photo, con_title  from cider.cid_contents where con_category = "'+ p +'" order by con_no desc limit '+ start +', '+ end +''
	console.log(qry);
	mysql.select(qry, function (err, data){
		 if (err) throw err;
		 console.log("data");
		 console.log(data);
		 console.log('select con_no, con_photo, con_title  from cider.cid_contents  order by con_no desc limit '+ start +', '+ end +'');
		 res.send({ contents : data });
	});
	
});
*/

module.exports = router;
