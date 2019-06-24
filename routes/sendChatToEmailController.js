var nodemailer = require('nodemailer');
const Joi = require('joi');
var fs = require('fs');
var stream = fs.createWriteStream("./chat_history.txt");
var sql = require('../config/msSqlUtil');
const schema = require('../model/emailModel');

module.exports.sendConversationHistoryToEmail = function (req, res, next) {

  let emailBody = req.body;

  const result = Joi.validate(emailBody, schema);

  if (result.error) {
    //console.log(result.error);
    res.status(400).send(JSON.stringify({ "statusCode": 400, "error": result.error.details[0].message, "response": null }));
    return;
  }

  var stream = fs.createWriteStream("./chat_history.txt");

  let userId = emailBody.userId;
  //let startDate = emailBody.startDate;
  // let endDate = emailBody.endDate;
  let ids = emailBody.messageIds;
  let email = emailBody.email;

  var request = new sql.Request();
  // var stringRequest = `select * from chat_history where  employee_id = '${userId}' and created_date between '${startDate}' and '${endDate}' order by created_date desc`;

  var stringRequest = `select * from chat_history where  employee_id = '${userId}' and id in (${ids}) order by created_date desc`;
  request.query(stringRequest, function (err, recordset) {
   if (err) {
    //console.log(err);
   return next(err)
};
    var data = recordset.recordset;

    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {

        let created_date = (data[i].created_date) ? data[i].created_date.toString() : data[i].created_date;
        if (created_date) {
          created_date = created_date.replace('GMT+0530 (India Standard Time)', '  ');
          created_date = created_date.replace('.000Z', '');
        }

        let user_query = data[i].user_query;
        let bot_response = data[i].bot_response;
        stream.write(`Date : ${created_date} \r\n`);
        stream.write(`You : ${user_query} \r\n`);
        stream.write(`Bot : ${bot_response} \r\n`);

      }

      //  console.log("successfully write data to chat history file");
      stream.end();

      //   res.send("successfully write data to chat history file");


      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'iicathenabot@gmail.com',
          pass: 'mahindra@123'
        }
      });

      var mailOptions = {
        from: 'iicathenabot@gmail.com',
        to: email,
        subject: 'Bot Conversation History Details',
        // text: 'That was easy!'
        html: `
     <p>Hi,</p>
     <p style ="color: green;">Conversation history is attached as text file in attachment.</p>
     <br>
     <span>Regards,</span>
     <br>
     <span>Athena Bot Team</span> `,
        // attachments: [{'filename': 'chat_history.txt'}]

      };

      fs.readFile("./chat_history.txt", function (err, data) {

        mailOptions["attachments"] = [{ 'filename': 'attachment.txt', 'content': data }]

        transporter.sendMail(mailOptions, function (error, info) {

          if (error) {
         //  console.log(error);
            res.status(500).send(JSON.stringify({ "statusCode": 500, "error": error, "response": "Issues in smtp server" }));

          } else {
            // console.log('Email sent: ' + info.response);
            res.status(200).send(JSON.stringify({ "statusCode": 200, "error": null, "response": "File attachment is send to your mail : " + email }));
          }
        });
      });

      transporter.close();
    }

    else {
      return res.status(404).send(JSON.stringify({ "statusCode": 404, "error": null, "response": "Record not found" }));

    }

  });
}