const base64 = require('base-64');
const url = require('url');
const aes256 = require('aes256');

// const secretKey = "secretkeyofathena123";
const { SECRET_KEY } = require('../config/config');
var {decrypt} = require('./aes');

module.exports.verifyToken = function (req, res, next) {
    
    let userId = (req.method === 'POST') ? req.body.userId : req.query.userId;
    // let token = (req.method === 'POST') ? req.body.token : req.query.token;
    // var url_parts = url.parse(req.url, true);
    // if (url_parts.query && url_parts.query.token) token = url_parts.query.token;
    // let token = req.get('authorization');
    let token = req.headers.authorization;
    if (!token) return res.status(401).send("Unauthorized");
    if (!userId) return res.status(400).send("userId cannot be empty");
    
    // var encoded = userId + SECRET_KEY;
    // var encodeData = base64.encode(encoded);
    // if (encodeData !== token) return res.status(401).send("Unauthorized");

    // var decryptedUserId = aes256.decrypt(SECRET_KEY, token);
    // if (decryptedUserId != userId) return res.status(401).send("Unauthorized");
    
    let decryptedUserId
    try{
         decryptedUserId = decrypt(token);
    }
    catch(exc){
        return res.status(401).send("Unauthorized");
    }

    if (decryptedUserId != userId) return res.status(401).send("Unauthorized");
     
    next();
}