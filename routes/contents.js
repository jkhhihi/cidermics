var express = require('express');
var router = express.Router();
//var mysql = require("./model/mysql");

router.get('/cid_contents', function(req, res, next) {

	res.render('front/cid_contents/cid_contents', { });

});

router.get('/cid_contents_detail', function(req, res, next) {

	res.render('front/cid_contents/cid_contents_detail', { });

});


module.exports = router;
