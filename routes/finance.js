var express = require('express');
var router = express.Router();
//var mysql = require("./model/mysql");

router.get('/finance', function(req, res, next) {

	res.render('front/cid_finance/cid_finance', { });

});


module.exports = router;
