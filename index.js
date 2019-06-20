'use strict';

require('dotenv').config()
const APIAI_TOKEN = process.env.APIAI_TOKEN;
const APIAI_SESSION_ID = process.env.APIAI_SESSION_ID;

const express = require('express');
const app = express();
var request = require('request');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan')
const apiRoute = require('./routes/apiRoute')
//const dbConnect = require('./config/dbConnect.js')
global.con = require('./config/mysqlUtil.js')
var Chart = require('chart.js');
const path = require('path');
var viewPath = path.join(__dirname + '/views/')

var getConversationHistoryRouter = require('./routes/chatHistoryController');

app.set('port', process.env.port || 8000)
app.set('views', viewPath);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/views')); // html

app.use(express.static(__dirname + '/public')); // js, css, images

app.use(cookieParser());

var expiryDate = new Date(Date.now() + 2 * 60 * 1000) // 1 hour
app.use(session({
  secret: 's3Cur3',
  name: 'sessionId',
  cookie: {
    expires: expiryDate
  }

}))

app.use(logger('dev'))

// dbConnect.initDb(function (err) {
//   if (err) {
//       throw err; 
//   }
// })

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

const server = app.listen(app.get('port'), () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

app.use('/api', apiRoute);

const io = require('socket.io')(server);
io.on('connection', function (socket) {
  console.log('A user connected');
  //  //Send a message after a timeout of 4seconds
  //  setTimeout(function() {
  //   socket.send('Sent a message 4seconds after connection!');
  // }, 4000);

  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });

});

const apiai = require('apiai')(APIAI_TOKEN);

// Web UI
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/chart', (req, res) => {
  res.render('chart');
});

app.get('/cookie', (req, res) => {
  console.log('Cookies: ', req.cookies);
  res.cookie('name', 'express', { 'maxAge': 360000 }).send('cookie set')
})

app.get('/session', (req, res) => {
  console.log(req.session)
  if (req.session.page_views) {
    req.session.page_views++;
    res.send("You visited this page " + req.session.page_views + " times");
  } else {
    req.session.page_views = 1;
    res.send("Welcome to this page for the first time!");
  }

})


io.on('connection', function (socket) {
  socket.on('chat message', (text) => {
    console.log('Message: ' + text);

    // Get a reply from API.ai

    let apiaiReq = apiai.textRequest(text, {
      sessionId: APIAI_SESSION_ID
    });

    apiaiReq.on('response', (response) => {
      let paramteresJson = response.result.parameters;
      console.log(paramteresJson);

      var Business_Unit = "", Sector = "", Division = "", Sub_division = "", Department = "", Sub_department = "";
      if (typeof paramteresJson.Sector !== 'undefined') {
        Sector = paramteresJson.Sector
        console.log('sector: ' + Sector)
      }

      if (typeof paramteresJson.Business_Unit !== 'undefined') {
        Business_Unit = paramteresJson.Division
        console.log('Division: ' + Division)
      }


      if (typeof paramteresJson.Division !== 'undefined') {
        Division = paramteresJson.Division
        console.log('Division: ' + Division)
      }

      if (typeof paramteresJson.Sub_division !== 'undefined') {
        Sub_division = paramteresJson.Sub_division
        console.log('Sub_division: ' + Sub_division)
      }

      if (typeof paramteresJson.Department !== 'undefined') {
        Department = paramteresJson.Department
        console.log('Department:' + Department)
      }

      if (typeof paramteresJson.Sub_department !== 'undefined') {
        Sub_department = paramteresJson.Sub_department
        console.log('Sub_department: ' + Sub_department)
      }


      let HD_MASK_ID = 'IRT1000609055TMU';

      var sql = 'SELECT * FROM employee WHERE HD_MASK_ID = ' + mysql.escape(HD_MASK_ID);

      if (Sector !== "") {
        sql = sql + ' AND SA_Sector = ' + mysql.escape(Sector);
      }

      // if (Business_Unit !== "")
      // {
      //   sql = sql + ' AND SA_BU = '+ mysql.escape(Sector);
      // }

      // if (Division !== "")
      // {
      //   sql = sql + ' AND Division = '+ mysql.escape(Division);
      // }

      console.log(sql);

      var aiText = ""
      con.query(sql, function (err, rows, fields) {
        if (err) throw err
        //  console.log('The solution is: ', rows[0])
        if (rows.length > 0) {
          aiText = response.result.fulfillment.speech;
        }
        else {
          aiText = "you are not allowed to access this sector"
        }

        var chatHistorySql = "INSERT INTO chat_history (employee_id, user_query,bot_response) VALUES (?,?,?)";
        con.query(chatHistorySql, [HD_MASK_ID, text, aiText], function (err, result) {
          if (err) throw err;
          console.log("chat history record inserted");
        });

        socket.emit('bot reply', aiText);
        // socket.emit('chart_response', aiText);

      })

      //  let aiText = response.result.fulfillment.speech;
      //     console.log('Bot reply: ' + aiText);
      //    socket.emit('bot reply', aiText);

    })

    //  let aiText = response.result.fulfillment.speech;
    //       console.log('Bot reply: ' + aiText);

    //       // var jsonObj = { "pageIndex": 1,
    //       // "itemsPerPage": 1}

    //       // request.post(
    //       //     'http://192.168.1.72/ecatalogueapi/api/ModelSearch/GetAllWithPagination',
    //       //     { json: jsonObj},
    //       //     function (error, response, body) {
    //       //         if (!error && response.statusCode == 200) {
    //       //             console.log(body)
    //       //             socket.emit('bot reply', aiText);
    //       //             console.log("response success from post request")
    //       //         }
    //       //     }
    //       // );

    //      socket.emit('bot reply', aiText);

    //  });

    apiaiReq.on('error', (error) => {
      console.log(error);
    });

    apiaiReq.end();

  });
});

module.exports = app;