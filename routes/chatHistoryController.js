var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
const Joi = require('joi');
const schema = require('../model/chatHistoryModel');

app.use(expressValidator());
app.use(bodyParser.json());

module.exports.getConversationHistory = function (req, res) {

  const userId = req.query.userId;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  console.log(userId + startDate + endDate);

  console.log('get conversation history controller');


  con.query("SELECT * FROM `chat_history` WHERE 1 and created_date between '2019-02-25' and '2019-02-26'", function (err, rows, fields) {

    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "error": null, "data": rows }));

  });

};

module.exports.postConversationHistory = function (req, res) {
 
 const result = Joi.validate(req.body, schema);
 let pageIndex = 1;
 let itemsPerPage = 10;

if(req.body.pageIndex)
{
 pageIndex = req.body.pageIndex;
}

if(req.body.itemsPerPage)
{
 itemsPerPage = req.body.itemsPerPage;
}

let offset = (pageIndex - 1) * itemsPerPage;
let limit = itemsPerPage;

  if (result.error) {
    //console.log(result.error);
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const chatHistory = req.body;
  const userId = chatHistory.userId;
  const startDate = chatHistory.startDate;
  const endDate = chatHistory.endDate;
  con.query("SELECT user_query,bot_response,created_date FROM `chat_history` WHERE employee_id = ? and created_date between ? and ? limit ? , ? ", [userId, startDate, endDate ,limit,offset], function (err, rows, fields) {

    if (err) 
    { 
      return res.send(JSON.stringify({"statusCode":500,"error":err,"response":null}));
    }

    res.send(JSON.stringify({ "statusCode": 200, "error": null, "response": {"totalRecords":rows.length ,"responseBody":rows} }));

  });

};