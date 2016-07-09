var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('front/cid_main', { });
	});


router.get('/top', function(req, res, next) {

	res.render('front/top', { });

});

router.get('/bottom', function(req, res, next) {

	res.render('front/bottom', { });

});

module.exports = router;
