var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const Joi = require('joi');
const feedBackSchema = require('../model/feedbackModel');
var sql = require('../config/msSqlUtil');

app.use(bodyParser.json());

module.exports.updateFeedback = function (req, res,next) {
    var feedbackBody = req.body;
    const result = Joi.validate(feedbackBody, feedBackSchema);
    if (result.error) {
        return res.status(400).send(JSON.stringify({ "statusCode": 400, "error": result.error.details[0].message, "response": null }))
    }
    var request = new sql.Request();
    request.input('id', sql.Int, feedbackBody.id);
    request.input('feedback', sql.Bit, feedbackBody.feedback);
    var feedbackSqlQuery = "update chat_history set feedback = @feedback where id = @id";
    request.query(feedbackSqlQuery, function (err, result) {
        if (err) {
          //    throw err
         // console.log(err);
          return next(err);
        }
        else {
            if (result && result.rowsAffected  && result.rowsAffected[0] > 0)
            {
                return res.status(200).send(JSON.stringify({ "statusCode": 200, "error": null, "response": "successfully updated" }));
             
            }
            else {
                return res.status(404).send(JSON.stringify({ "statusCode": 404, "error": null, "response": "Not Found" }));
            }
        }
    });
}