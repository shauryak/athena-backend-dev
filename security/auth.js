const base64 = require('base-64');
const url = require('url');
// const secretKey = "secretkeyofathena123";
const { SECRET_KEY } = require('../config/config');

module.exports.verifyToken = function (req, res, next) {
    let userId = (req.method === 'POST') ? req.body.userId : req.query.userId;
    let token = (req.method === 'POST') ? req.body.token : req.query.token;
    var url_parts = url.parse(req.url, true);
    if (url_parts.query && url_parts.query.token) token = url_parts.query.token;
    if (!token) return res.status(401).send("Unauthorized");
    if (!userId) return res.status(400).send("userId cannot be empty");
    //    var encoded = userId+secretKey;
    var encoded = userId + SECRET_KEY;
    var encodeData = base64.encode(encoded);
    if (encodeData !== token) return res.status(401).send("Unauthorized");
    next();
}