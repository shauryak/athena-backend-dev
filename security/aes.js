var crypto = require('crypto');
const { SECRET_KEY } = require('../config/config');

var iv = Buffer.from('0000000000000000');;
var encrypt = function(data, key = SECRET_KEY) {
	var decodeKey = crypto.createHash('sha256').update(key, 'utf-8').digest();
	var cipher = crypto.createCipheriv('aes-256-cbc', decodeKey, iv);
	return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
};

var decrypt = function(data, key = SECRET_KEY) {
	var encodeKey = crypto.createHash('sha256').update(key, 'utf-8').digest();
	var cipher = crypto.createDecipheriv('aes-256-cbc', encodeKey, iv);
	return cipher.update(data, 'hex', 'utf8') + cipher.final('utf8');
};

module.exports = {encrypt,decrypt};