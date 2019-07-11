const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');

//var sql = require('./data/msSqlUtil');
// global.con = require('./data/mysqlUtil')
const config = require('./config/config');

const apiRoute = require('./routes/apiRoute')

var multer = require('multer');
const path = require('path');

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

app.use(helmet.xssFilter());
app.use(helmet.xssFilter({ setOnOldIE: true }))
app.use(helmet.frameguard({ action: 'sameorigin' }));
app.use(helmet.noSniff());
app.use(cookieParser());
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


const server = app.listen(app.get('port'), () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, config.environment);
});

module.exports = app;