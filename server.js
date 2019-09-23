const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const { constants } = require('crypto')
var https = require('https');
var fs = require('fs');
// var globalTunnel = require('global-tunnel-ng');

//var sql = require('./data/msSqlUtil');
// global.con = require('./data/mysqlUtil')
const config = require('./config/config');

const apiRoute = require('./routes/apiRoute')

var multer = require('multer');
const path = require('path');

var options = {
  secureProtocol: 'TLSv1_2_server_method',
  key: fs.readFileSync('certificate/wildcard08.key'),
  cert: fs.readFileSync('certificate/wildcard08.crt'),
  ca:  fs.readFileSync('certificate/Intermediate.crt'),
  ciphers: [
	"!EDH",
	"ECDHE-ECDSA-AES256-GCM-SHA384",
	"ECDHE-ECDSA-AES128-GCM-SHA256",
	"ECDHE-RSA-AES256-GCM-SHA384",
	"ECDHE-RSA-AES128-GCM-SHA256",
	"DHE-RSA-AES256-GCM-SHA384",
	"DHE-RSA-AES128-GCM-SHA256",
	"AESGCM",
	"!aNULL",
	"!eNULL",
	"!EXPORT",
	"!RC4",
	"!MD5",
	"!PSK",
	"TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA",
	"TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA",
	"TLS_ECDHE_RSA_WITH_3DES_EDE_CBC_SHA"
  ].join(':'),
  honorCipherOrder: true
};

var upload = multer({
  fileFilter: function (req, file, callback) {
    if (path.extname(file.originalname) !== '.PNG') {
      return callback(new Error('Only csv files allowed!'));
    }
    callback(null, true)
  },
  dest: './public/uploads',
  filename: function (req, file, callback) {
    callback(null, file.originalname)
  }
}).single('avatar');




// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//       cb(null, './public/uploads')
//   },
//   filename: function (req, file, cb) {
//       cb(null, file.originalname)
//   }
// });

//  var upload = multer({ storage: storage });





app.set('port', process.env.port || 3000);

// globalTunnel.initialize({
//   host: '10.2.152.211',
//   port: 80,
//   proxyAuth: 'IIC_ATHENA:mahindra@123', // optional authentication
//   sockets: 50 // optional pool size for each http and https
// });
app.disable('x-powered-by');
app.use(helmet.xssFilter());
app.use(helmet.xssFilter({ setOnOldIE: true }))
app.use(helmet.frameguard({ action: 'sameorigin' }));
app.use(helmet.noSniff());
app.use(cookieParser());
var ONE_YEAR = 31536000000;
app.use(helmet.hsts({
    maxAge: ONE_YEAR,
    includeSubDomains: true,
    force: true
}));
//app.use(logger('dev'));
app.use('/api', apiRoute);

// app.get('/', (req, res) => res.send('welcome'));

// app.post('/profile', upload.single('avatar'), function (req, res, next) {

//   // if(req.file && req.file.size > 200000) return res.send("file size greater than 2 mb");
//   console.log(req.file);
//   return res.status(200).send("success");

// });

app.post('/profile', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.send('Wrong File Type')
    }
    console.log(req.file);
    return res.status(200).send("success");
    //csvParser(req, res);
  })
});


// const server = app.listen(app.get('port'), () => {
//   console.log('Express server listening on port %d in %s mode', server.address().port, config.environment);
// });

const server = https.createServer(options,app).listen(app.get('port'),function () {
  console.log('Express server listening on port %d in %s mode', server.address().port, config.environment);

 });

module.exports = app;
