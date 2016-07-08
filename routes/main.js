var express = require('express');
var router = express.Router();
//var mysql = require("./model/mysql");

router.get('/cid_main', function(req, res, next) {

	res.render('front/cid_main/cid_main', { });

});


module.exports = router;
