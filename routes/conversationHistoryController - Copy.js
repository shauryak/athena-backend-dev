var express  = require('express');
var app = express();
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
const Joi = require('joi');
const schema = require('../model/chatHistoryModel');
var sql = require('../config/msSqlUtil');

app.use(expressValidator());
app.use(bodyParser.json());

module.exports.getConversationHistory = function(req , res){
 
   const userId = req.query.userId;
   const startDate = req.query.startDate;
   const endDate = req.query.endDate;

//    const result = Joi.validate(req.body, schema);

// if(result.error)
// {
// //console.log(result.error);
// res.status(400).send(result.error.details[0].message);
// return ;
// }
 
   console.log('get conversation history controller');

   var request = new sql.Request();
        var stringRequest = `select * from chat_history where  employee_id = '${userId}' and created_date between '${startDate}' and '${endDate}' `;
       console.log(stringRequest);
        request.query(stringRequest, function(err, recordset) {
            if(err) console.log(err);
            res.end(JSON.stringify(recordset.recordset)); // Result in JSON format
        });

};

module.exports.postConversationHistory = function(req , res){

const result = Joi.validate(req.body, schema);

if(result.error)
{
//console.log(result.error);
res.status(400).send(result.error.details[0].message);
return ;
}

const chatHistory = req.body;
const userId = chatHistory.userId;
const startDate = chatHistory.startDate;
const endDate = chatHistory.endDate; 

var request = new sql.Request();
var stringRequest = `select * from chat_history where  employee_id = '${userId}' and created_date between '${startDate}' and '${endDate}' order by created_date desc`;
console.log(stringRequest);
request.query(stringRequest, function(err, recordset) {
    if(err) console.log(err);
    res.end(JSON.stringify(recordset.recordset)); // Result in JSON format
});

};