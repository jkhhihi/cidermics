var express = require('express');
var router = express.Router();
//var mysql = require("./model/mysql");

router.get('/consulting', function(req, res, next) {

	res.render('front/cid_consulting/cid_consulting', { });

});

router.get('/consulting_detail', function(req, res, next) {

	res.render('front/cid_consulting/cid_consulting_detail', { });

});

module.exports = router;
