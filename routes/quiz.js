var express = require('express');
var router = express.Router();
var mysql = require("./model/mysql");


router.get('/quiz1', function(req, res, next) {

	res.render('front/cid_quiz/cid_quiz_test1', { });

});

router.get('/quiz2', function(req, res, next) {

	res.render('front/cid_quiz/cid_quiz_test2', { });

});

router.get('/quiz3', function(req, res, next) {

	res.render('front/cid_quiz/cid_quiz_test3', { });

});

module.exports = router;
