'use strict';

//import { Socket } from "net";

const socket = io();

//const outputYou = document.querySelector('.output-you');
//const outputBot = document.querySelector('.output-bot');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

function inputText() {
  let search =  document.getElementById("inputText").value;
  document.getElementById("inputText").value = ""
  //outputYou.innerHTML = search;
  let panel_body = document.getElementById('panel-body')
  let incoming_msg = document.createElement('div')
  incoming_msg.classList.add('incoming_msg')
  let received_msg = document.createElement('div')
  received_msg.classList.add('received_msg')
  let received_withd_msg = document.createElement('div')
  received_withd_msg.classList.add('received_withd_msg')
  let paragraph = document.createElement('p')
  // paragraph.innerHTML = 'you : ' + search
  received_withd_msg.appendChild(paragraph)
  received_msg.appendChild(received_withd_msg)
  incoming_msg.appendChild(received_msg)
  panel_body.appendChild(incoming_msg)

  socket.emit('chat message', search);
  console.log(search);
 }

 function btnClicked(value) {

  let panel_body = document.getElementById('panel-body')
  let incoming_msg = document.createElement('div')
  incoming_msg.classList.add('incoming_msg')
  let received_msg = document.createElement('div')
  received_msg.classList.add('received_msg')
  let received_withd_msg = document.createElement('div')
  received_withd_msg.classList.add('received_withd_msg')
  let paragraph = document.createElement('p')
  paragraph.innerHTML = 'you : ' + value
  received_withd_msg.appendChild(paragraph)
  received_msg.appendChild(received_withd_msg)
  incoming_msg.appendChild(received_msg)
  panel_body.appendChild(incoming_msg)

  socket.emit('chat message', value);
  console.log(value);
 }

 function inputTextByEnterKey(e) {
   if (e.keyCode === 13)
   {
    let search =  document.getElementById("inputText").value;
    document.getElementById("inputText").value = ""
    let panel_body = document.getElementById('panel-body')
  let incoming_msg = document.createElement('div')
  incoming_msg.classList.add('incoming_msg')
  let received_msg = document.createElement('div')
  received_msg.classList.add('received_msg')
  let received_withd_msg = document.createElement('div')
  received_withd_msg.classList.add('received_withd_msg')
  let paragraph = document.createElement('p')
  // paragraph.innerHTML = 'you : ' + search
  received_withd_msg.appendChild(paragraph)
  received_msg.appendChild(received_withd_msg)
  incoming_msg.appendChild(received_msg)
  panel_body.appendChild(incoming_msg)
    socket.emit('chat message', search);
    console.log(search);
   }
   else
   {
     //console.log("not enter key pressed")
   }
 }


// document.querySelector('button').addEventListener('click', () => {
//   recognition.start();
// });

document.querySelector('#microphone').addEventListener('click', () => {
  recognition.start();
});

recognition.addEventListener('speechstart', () => {
  console.log('Speech has been detected.');
});

recognition.addEventListener('result', (e) => {
  console.log('Result has been detected.');

  let last = e.results.length - 1;
  let text = e.results[last][0].transcript;
  console.log(text);
  let panel_body = document.getElementById('panel-body')
  let incoming_msg = document.createElement('div')
  incoming_msg.classList.add('incoming_msg')
  let received_msg = document.createElement('div')
  received_msg.classList.add('received_msg')
  let received_withd_msg = document.createElement('div')
  received_withd_msg.classList.add('received_withd_msg')
  let paragraph = document.createElement('p')
  paragraph.innerHTML = 'you : ' + text
  received_withd_msg.appendChild(paragraph)
  received_msg.appendChild(received_withd_msg)
  incoming_msg.appendChild(received_msg)
  panel_body.appendChild(incoming_msg)

  console.log('Confidence: ' + e.results[0][0].confidence);

  socket.emit('chat message', text);
});

recognition.addEventListener('speechend', () => {
  recognition.stop();
});

recognition.addEventListener('error', (e) => {

 let panel_body = document.getElementById('panel-body')
 let outgoing_msg = document.createElement('div')
 outgoing_msg.classList.add('outgoing_msg')
 let sent_msg = document.createElement('div')
 sent_msg.classList.add('sent_msg')
 let paragraph = document.createElement('p')
 paragraph.innerHTML = 'bot : ' + 'Error: ' + e.error
 sent_msg.appendChild(paragraph)
 outgoing_msg.appendChild(sent_msg)
 panel_body.appendChild(outgoing_msg)


});

function synthVoice(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  synth.speak(utterance);
}

socket.on('bot reply', function(replyText) {

  synthVoice(replyText);

  var replyTextString = String(replyText);
  var array = replyTextString.split("^");

  if(array.length >= 1)
  {
    replyText = array[0];
  }
  if(replyText == '') replyText = 'No answer...';
  let panel_body = document.getElementById('panel-body')
  let outgoing_msg = document.createElement('div')
  outgoing_msg.classList.add('outgoing_msg')
  let sent_msg = document.createElement('div')
  sent_msg.classList.add('sent_msg')
  let paragraph = document.createElement('p')
  paragraph.innerHTML = 'bot : ' + replyText
  sent_msg.appendChild(paragraph)
  outgoing_msg.appendChild(sent_msg)
  panel_body.appendChild(outgoing_msg)

  if (array.length > 1)
  {
    let clickableDiv = document.createElement('div')
     //clickableDiv.setAttribute('display','grid')
    for (let index = 1; index < array.length; index = index + 2) {
      const element = array[index];
      let span = document.createElement('span');
      let btn = document.createElement('button');
      btn.setAttribute('name',element);
      btn.setAttribute('value',element);
      btn.setAttribute('id',element);
      btn.setAttribute('type',"button");
      btn.classList.add('btn', 'btn-outline-info', 'clickable_btn_margin');

      btn.innerHTML = element;
    //btn.addEventListener('click',btnClicked(element))
       span.appendChild(btn)
      clickableDiv.appendChild(span);
      btn.addEventListener('click',function(){
        optionsBtnClicked(element);
      })


       }
        clickableDiv.classList.add('pull-right');
        panel_body.appendChild(clickableDiv)
  }

  scrollToBottom(panel_body);
  function optionsBtnClicked(params) {
    console.log(params)
    btnClicked(params)
  }


});

socket.on('connect_failed', function() {
  console.log("Sorry, there seems to be an issue with the connection!");
});

socket.on('chart_response',function(data){
let panel_body = document.getElementById('panel-body')
let outgoing_msg = document.createElement('div')
let canvas = document.createElement('canvas')
canvas.setAttribute('id','myChart')
canvas.setAttribute('width','100%')
canvas.setAttribute('height','50%')
canvas.removeAttribute('style')
outgoing_msg.appendChild(canvas)
panel_body.appendChild(outgoing_msg)
var ctx = canvas.getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "Data",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',

            data: [0, 10, 5, 2, 20, 30, 45],
        }]
    },

    // Configuration options go here
    options: {}
});
scrollToBottom(panel_body);
});

function scrollToBottom(div){

 div.scrollIntoView(false);
}
