var crypto = require('crypto-js');
var secret = rootrq('model/secret');

module.exports.hashing = function(message) {
	return crypto.HmacSHA512(message, secret);
}

module.exports.compare = function(message, hashed) {
	return hashed == crypto.HmacSHA512(message, secret);
}

