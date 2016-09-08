var express = require('express');
var router = express.Router();
var mysql = require("./model/mysql");

router.get('/lecture', function(req, res, next) {

	res.render('front/cid_lecture/cid_lecture', { });

});

router.get('/lecture/detail', function(req, res, next) {

	res.render('front/cid_lecture/cid_lecture_detail', { });

});

router.get('/lecture/apply', function(req, res, next) {

	res.render('front/cid_lecture/cid_lecture_apply', { });

});

router.get('/lecture/question', function(req, res, next) {

	res.render('front/cid_lecture/cid_lecture_question', { });

});

module.exports = router;
