const request = require('request');
const { getAllUser } = require('../models/usuarios');
const url = process.env.URL;

exports.sendMessage = function sendMessage(){
  
getAllUser() 
        .then(info =>{        
        
        for(let i = 0; i < info.length; i++){
          
  var data = {
    phone: '55' + info[i].whatsapp,
    body: 'texto'
  };

request({
  url: url,
  method: 'POST',
  json: data

});

console.log('\x1b[36m', 'Mensagem enviada!' ,'\x1b[0m');
}
}).catch(err => console.log(err));
}
