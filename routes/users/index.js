var express = require('express');
var router = express.Router();

var user = rootrq('controller/users'); 

/* GET users listing. */
router.get('/', function(req, res, next){
	user.queryAll(function(err, user){
		if(err) return next(err);
		res.send(user);
	});
});

router.get('/:key/:val', function(req, res, next) {
	var key = req.params.key;
	var val = req.params.val;
	user.query(key, val, function(err, user) {
		if(err) return next(err);
		res.send(user);
	});
});

router.post('/update/:key/:val', function(req, res, next){
	var key = req.params.key;
	var val = req.params.val;
	var userData = req.body || {};

	user.update(key, val, userData, function(err, result){
		if(err) return next(err);
		res.send({success: true});
	});
});

router.put('/add', function(req, res, next){
	var userData = req.body || {};

	user.add(userData, function(err, result){
		if(err) return next(err);
		res.send({success: true});
	});
});

module.exports = router;
