const hour = '13:00'
const { sendMessage } = require('./SendMessage');

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

exports.startSend = function startTime() {
  let today = new Date();
  let day = today.getDay();
  let h = today.getHours();
  let m = today.getMinutes();

  m = checkTime(m);
  
  if(hour == h + ":" + m || day == 5){
    sendMessage();
  }else{
  t = setTimeout(function() {
    startTime();
  }, 500);
}

}
