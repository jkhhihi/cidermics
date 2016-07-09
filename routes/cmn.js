var express = require('express');
var router = express.Router();
//var mysql = require("./model/mysql");

router.get('/cmn_list', function(req, res, next) {

	res.render('front/cid_cmn/cid_cmn_list', { });

});

router.get('/notice_list', function(req, res, next) {

	res.render('front/cid_cmn/cid_notice_list', { });

});

module.exports = router;
