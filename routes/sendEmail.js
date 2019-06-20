var nodemailer = require('nodemailer');
var fs = require('fs');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aditya@gmail.com',
    pass: 'XXXXXXX'
  }
});

var mailOptions = {
  from: 'adityagoyal252999@gmail.com',
  to: 'aditya@shezartech.in,sharjeel@shezartech.in',
  subject: 'Bot Conversation History Details',
  // text: 'That was easy!'
  html: `
       <p>Hi,</p>
       <p style ="color: green;">Conversation history is attached as text file in attachment.</p>
       <br>
       <span>Regards,</span>
       <br>
       <span>Aditya</span> `,
   // attachments: [{'filename': 'chat_history.txt'}]
   
};

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

fs.readFile("./chat_history.txt", function (err, data) {

  mailOptions["attachments"] = [{ 'filename': 'attachment.txt', 'content': data }]

  transporter.sendMail(mailOptions, function (error, info) {

    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});

transporter.close();