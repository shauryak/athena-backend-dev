var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
//var upload = multer({ dest: 'uploads/' });
var storage = multer.diskStorage({
    fileFilter: function (req, file, cb) {
        console.log(path.extname(file.originalname));
        if (path.extname(file.originalname) !== 'XLSX') {
                return cb(new Error('Only XLSX are allowed'))
         }

        cb(null, true)
      },
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage });

var chatHistoryController = require('./chatHistoryController');
var botResponseController = require('./botResponseController');
var conversationHistoryController = require('./conversationHistoryController');
var conversationController = require('./conversationController');
var sendChatToEmailController = require('./sendChatToEmailController')
var ConversationControllerCopy = require('./conversationController - Copy');
var uploadFileController = require('./uploadFileController');

// Add headers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ urlencoded: true })) //support x-www-form-urlencoded


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

router.use(bodyParser.json());

router.get('/', (req, res) => {

   // console.log('api route ');
    res.send('welcome to api route');

})


router.route('/getconversationhistory')
    .get(chatHistoryController.getConversationHistory)
    .post(chatHistoryController.postConversationHistory);

router.route('/getbotresponse')
    .get(botResponseController.getBotResponse);

router.route('/conversationhistory')
    .get(conversationHistoryController.getConversationHistory)
    .post(conversationHistoryController.postConversationHistory);

router.route('/conversation')
    .get(conversationController.getBotResponse);

router.route('/sendemail')
   .post(sendChatToEmailController.sendConversationHistoryToEmail);

router.route('/uploadFile')
    .post(upload.single('file'), uploadFileController.uploadFile);

// function fileFilter(req, file, cb) {

//     // The function should call `cb` with a boolean
//     // to indicate if the file should be accepted

//     // To reject this file pass `false`, like so:
//     // if (file && !file.originalname.includes('xlsx'))
//     //     cb(null, false)

//         console.log(path.extname(file.originalname))
//         if (path.extname(file.originalname) !== '.XLSX') {
//             return cb(new Error('Only pdfs are allowed'))
//      }

//     cb(null, true)

//     // // To accept the file pass `true`, like so:
//     // cb(null, true)

//     // // You can always pass an error if something goes wrong:
//     // cb(new Error('I don\'t have a clue!'))

// };

module.exports = router;
