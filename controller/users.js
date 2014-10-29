var dbUrl = 'localhost/dummy';

var mongoose = require('mongoose');
var modelUser = rootrq('model/User');
var pass = rootrq('controller/passAlgo');

var c = mongoose.createConnection(dbUrl);
var User = c.model('User', modelUser);

c.on('error', console.error.bind(console, 'connection error:'));

module.exports.query = function(key, val, callback) {
	callback = callback || new Function;
	 
	var valid = modelUser.queryAssert
	.map(function(curr){
		return key == curr;
	})
	.reduce(function(pre, curr, index, array){
		return pre || curr;
	});

	if(!valid) callback.call(this, new Error('invalid'), null);

	var condition = {};
	condition[key] = val;

	User.findOne(condition, {passwd: 0, __v: 0}, function(err, user) {
		if(err) return callback.call(this, new Error('invalid'), null);
		callback.call(this, null, user);
	});
}

module.exports.queryAll = function(callback) {
	User.find({}, {passwd: 0, __v: 0}, function(err, user){
		if(err) return callback.call(this, new Error('invalid'), null);
		callback.call(this, null, user);
	})
}

module.exports.add = function(userData, callback) {
	callback = callback || new Function;
	userData = userData || {};

	var valid = modelUser.addAssert
	.map(function(curr) {
		return userData.hasOwnProperty(curr);
	})
	.reduce(function(pre, curr, index, array){
		return pre && curr;
	});

	if(!valid) callback.call(this, new Error('invalid'), null);

	var wherePayLoad = [{email: userData.email}, {name: userData.name}];
	
	User.findOne({$or: wherePayLoad}, function(err, user){
		if(err) return callback.call(this, new Error('invalid'), null);

		if(user) return callback.call(this, new Error('user existed'), null);
		
		var newUser = new User;
		newUser.name = userData.name;
		newUser.email = userData.email;
		newUser.passwd = pass.hashing(userData.passwd);
		newUser.save(callback.bind(this));
	});
}

module.exports.update = function(key, val, userData, callback) {
	callback = callback || new Function;
	userData = userData || {};

	var condition = {};
	condition[key] = val;

	var valid = modelUser.updateForbindden
	.map(function(curr) {
		return !userData.hasOwnProperty(curr);
	})
	.reduce(function(pre, curr, index, array){
		return pre && curr;
	});

	if(!valid) callback.call(this, new Error('invalid'), null);

	User.findOneAndUpdate(condition, userData, {
		new: true,
		select: {passwd: 0, __v: 0},
	}, callback.bind(this));
}
