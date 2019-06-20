var fs = require('fs');
var stream = fs.createWriteStream("./chat_history.txt");
var sql = require('../config/msSqlUtil');

var data = [
  { "user_query": "hi", "bot_response": "Hi there, friend!", "created_date": "2019-02-21T09:32:46.000Z" },
  { "user_query": "hello", "bot_response": "Hi there, friend!", "created_date": "2019-02-21T09:33:02.000Z" },
  { "user_query": "hello athena", "bot_response": "Hello Sessionvariable.name, Tell me how can I help you? Please choose a sector of your choice: ^Farm^, ^Auto^, ^Other Biz^", "created_date": "2019-02-21T09:33:35.000Z" },
  { "user_query": "Auto", "bot_response": "In &$sector (Auto), what would you what to know? You can say ^Headcount^, ^Attrition^, etc", "created_date": "2019-02-21T09:48:03.000Z" },
  { "user_query": "Attrition", "bot_response": "attrition rate is 3 %", "created_date": "2019-02-21T09:48:12.000Z" },
  { "user_query": "hello", "bot_response": "Hi there, friend!", "created_date": "2019-02-21T11:34:56.000Z" },
  { "user_query": "hello athena", "bot_response": "Hello Sessionvariable.name, Tell me how can I help you? Please choose a sector of your choice: ^Farm^, ^Auto^, ^Other Biz^", "created_date": "2019-02-21T11:35:37.000Z" },
  { "user_query": "hello athena", "bot_response": "Hello Sessionvariable.name, Tell me how can I help you? Please choose a sector of your choice: ^Farm^, ^Auto^, ^Other Biz^", "created_date": "2019-02-22T10:31:01.000Z" },
  { "user_query": "1565", "bot_response": "I didn't get that. Can you say it again?", "created_date": "2019-02-25T10:00:13.000Z" },
  { "user_query": "hi", "bot_response": "Hi there, friend!", "created_date": "2019-02-25T10:01:27.000Z" },
  { "user_query": "hi", "bot_response": "Hi there, friend!", "created_date": "2019-02-26T09:40:34.000Z" },
  { "user_query": "hello", "bot_response": "Hi there, friend!", "created_date": "2019-02-26T11:26:01.000Z" },
  { "user_query": "hello", "bot_response": "Hi there, friend!", "created_date": "2019-02-26T11:28:13.000Z" },
  { "user_query": "hello", "bot_response": "Hi there, friend!", "created_date": "2019-02-26T11:28:21.000Z" },
  { "user_query": "good", "bot_response": "Great!", "created_date": "2019-02-26T11:28:31.000Z" },
  { "user_query": "hello athena", "bot_response": "Hello Sessionvariable.name, Tell me how can I help you? Please choose a sector of your choice: ^Farm^, ^Auto^, ^Other Biz^", "created_date": "2019-02-27T12:23:00.000Z" },
  { "user_query": "hello athena", "bot_response": "Hello Sessionvariable.name, Tell me how can I help you? Please choose a sector of your choice: ^Farm^, ^Auto^, ^Other Biz^", "created_date": "2019-02-27T12:23:10.000Z" },
  { "user_query": "Auto", "bot_response": "In &$sector (Auto), what would you what to know? You can say ^Headcount^, ^Attrition^, etc", "created_date": "2019-02-27T12:23:43.000Z" },
  { "user_query": "Attrition", "bot_response": "attrition rate is 3 %", "created_date": "2019-02-27T12:24:16.000Z" }];
 

function write()
{
      // stream.once('open', function (fd) {
    
      //   for (let i = 0; i < data.length; i++) {
      //     let created_date = data[i].created_date;
      //     created_date = created_date.replace('T', '  ');
      //     created_date = created_date.replace('.000Z', '');
      //     let user_query = data[i].user_query;
      //     let bot_response = data[i].bot_response;
      //     stream.write(`Date : ${created_date} \r\n`);
      //     stream.write(`You : ${user_query} \r\n`);
      //     stream.write(`Bot : ${bot_response} \r\n`);
      //   }
    
      //   console.log("successfully write data to chat history file");
      //   stream.end();
      // });

      for(let i=0; i< 3; i++) {
        console.log("inside data");
         let created_date = data[i].created_date;
          created_date = created_date.replace('T', '  ');
          created_date = created_date.replace('.000Z', '');
          let user_query = data[i].user_query;
          let bot_response = data[i].bot_response;
          stream.write(`Date : ${created_date} \r\n`);
          stream.write(`You : ${user_query} \r\n`);
          stream.write(`Bot : ${bot_response} \r\n`);
      }
      
      stream.end();
  
};

write();


 
module.exports.writeChatHistoryToFile = function(userId , startDate , endDate){
 
  var request = new sql.Request();
  var stringRequest = `select * from chat_history where  employee_id = '${userId}' and created_date between '${startDate}' and '${endDate}' order by created_date desc`;
  console.log(stringRequest);
  
  request.query(stringRequest, function (err, recordset) {
    if (err) console.log(err);
    //let data = recordset.recordset;
    var data = [
  { "user_query": "hi", "bot_response": "Hi there, friend!", "created_date": "2019-02-21T09:32:46.000Z" },
  { "user_query": "hello", "bot_response": "Hi there, friend!", "created_date": "2019-02-21T09:33:02.000Z" },
  { "user_query": "hello athena", "bot_response": "Hello Sessionvariable.name, Tell me how can I help you? Please choose a sector of your choice: ^Farm^, ^Auto^, ^Other Biz^", "created_date": "2019-02-21T09:33:35.000Z" },
  { "user_query": "Auto", "bot_response": "In &$sector (Auto), what would you what to know? You can say ^Headcount^, ^Attrition^, etc", "created_date": "2019-02-21T09:48:03.000Z" },
  { "user_query": "Attrition", "bot_response": "attrition rate is 3 %", "created_date": "2019-02-21T09:48:12.000Z" }];
    stream.once('open', function (fd) {
      for (let i = 0; i < data.length; i++) {
        let created_date = data[i].created_date;
        created_date = created_date.replace('T', '  ');
        created_date = created_date.replace('.000Z', '');
        let user_query = data[i].user_query;
        let bot_response = data[i].bot_response;
        stream.write(`Date : ${created_date} \r\n`);
        stream.write(`You : ${user_query} \r\n`);
        stream.write(`Bot : ${bot_response} \r\n`);
       
      }
  
      console.log("successfully write data to chat history file");
      stream.end();
    });
  });
}

