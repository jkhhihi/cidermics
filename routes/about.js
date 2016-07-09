var express = require('express');
var router = express.Router();
//var mysql = require("./model/mysql");

router.get('/cid_contact', function(req, res, next) {

	res.render('front/cid_about/cid_contact', { });

});

router.get('/cid_our_company', function(req, res, next) {

	res.render('front/cid_about/cid_our_company', { });

});

router.get('/cid_our_team', function(req, res, next) {

	res.render('front/cid_about/cid_our_team', { });

});


module.exports = router;
