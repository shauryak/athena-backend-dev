const express = require('express')
const app = express()
const port = 8000

var sql = require("mssql");

// config for your database
var config = {
//    user: 'sa',
//    password: 'shezar@123',
//    server: 'DESKTOP-PTAUQID',
//    database: 'Athena'

     user: 'iic_aditya',
     password: 'aditya@123',
     server: "103.81.88.102", 
     database: 'BOT' 
};


//connect to your database

sql.connect(config, function (err) {

    if (err) console.log(err);
    else{
        console.log("connected to ms sql database");
    }
});

module.exports = sql;

// app.get('/', function (req, res) {

//     // create Request object
//      var request = new sql.Request();

//      // query to the database and get the records
//       request.query('select top(10) * from PartType', function (err, recordset) {


//          if (err) console.log(err)

//          // send records as a response
//          res.send(recordset);

//      });

// });

 //app.listen(port, () => console.log(`Example app listening on port ${port}!`));

