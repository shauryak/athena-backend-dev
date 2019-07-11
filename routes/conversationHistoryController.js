var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
const Joi = require('joi');
const schema = require('../model/chatHistoryModel');
var sql = require('../data/msSqlUtil');

app.use(expressValidator());
app.use(bodyParser.json());

module.exports.getConversationHistory = function (req, res) {

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
    var stringRequest = `select * from chat_history where  employee_id = '${userId}' and created_date between '${startDate}' and '${endDate}' order by created_date desc`;
    console.log(stringRequest);
    request.query(stringRequest, function (err, recordset) {
        if (err) console.log(err);
        res.end(JSON.stringify(recordset.recordset)); // Result in JSON format
    });

};

module.exports.postConversationHistory = function (req, res, next) {

    const result = Joi.validate(req.body, schema);

    if (result.error) {
        //console.log(result.error);
        res.status(400).send(JSON.stringify({ "statusCode": 400, "error": result.error.details[0].message, "response": null }));
        return;
    }

    const chatHistory = req.body;
    const userId = chatHistory.userId;
    const startDate = chatHistory.startDate;
    const endDate = chatHistory.endDate;
    let pageIndex = 1;
    let itemsPerPage = 10;

    if (req.body.pageIndex) {
        pageIndex = chatHistory.pageIndex;
    }

    if (req.body.itemsPerPage) {
        itemsPerPage = chatHistory.itemsPerPage;
    }

    let offset = (pageIndex - 1) * itemsPerPage;
    let limit = itemsPerPage;
    let totalRecords = 0;
    // var request = new sql.Request();
    // var countResultQuery = `select count(*) from chat_history where  employee_id = '${userId}' and created_date between '${startDate}' and '${endDate}' `;
    // console.log(countResultQuery);
    // request.query(countResultQuery, function (err, recordset) {
    //     if (err) {
    //         // console.log(err);
    //         // return res.status(500).send(JSON.stringify({ "statusCode": 500, "error": err, "response": null }));
    //        return next(err);
    //     }

    //      totalRecords = recordset.recordset[0][""];
    //      console.log(totalRecords);
    //     var stringRequest = `select id,user_query,bot_response,created_date from chat_history where  employee_id = '${userId}' and created_date between '${startDate}' and '${endDate}' order by created_date desc
    //       OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY `;
    //     console.log(stringRequest);

    //     request.query(stringRequest, function (err, recordset) {
    //         if (err){
    //             // console.log(err);
    //             // return res.status(500).send(JSON.stringify({ "statusCode": 500, "error": err, "response": null }));
    //             next(err);
    //           }

    //       return res.send(JSON.stringify({ "statusCode": 200, "error": null, "response": {"totalRecords":totalRecords ,"responseBody":recordset.recordset } }));
    //     });


    var request = new sql.Request();
    request.input('userId', sql.VarChar, userId);
    request.input('startDate', sql.VarChar, startDate);
    request.input('endDate', sql.VarChar, endDate);
    request.input('offset', sql.Int, offset);
    request.input('limit', sql.Int, limit);
    var countResultQuery = `select count(*) from chat_history where  employee_id = @userId and created_date between @startDate and @endDate`;
    request.query(countResultQuery, function (err, recordset) {
        if (err) {
            // console.log(err);
            // return res.status(500).send(JSON.stringify({ "statusCode": 500, "error": err, "response": null }));
            return next(err);
        }

        totalRecords = recordset.recordset[0][""];
        if (totalRecords > 0) {
            var stringRequest = `select id,user_query,bot_response,created_date from chat_history where  employee_id = @userId and created_date between @startDate and @endDate order by created_date desc
            OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY `;

            request.query(stringRequest, function (err, recordset) {
                if (err) {
                    // console.log(err);
                    // return res.status(500).send(JSON.stringify({ "statusCode": 500, "error": err, "response": null }));
                    next(err);
                }

                return res.send(JSON.stringify({ "statusCode": 200, "error": null, "response": { "totalRecords": totalRecords, "responseBody": (recordset ? recordset.recordset : recordset) } }));
            });
        }
        else {
            return res.send(JSON.stringify({ "statusCode": 200, "error": null, "response": { "totalRecords": totalRecords, "responseBody": [] } }))
        }

    });



};