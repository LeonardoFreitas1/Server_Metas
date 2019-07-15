const request = require('request');

const Users = require('../models/usuarios');
const getAllUsers = Users.getAllUser;

const url = process.env.URL;

exports.sendMessage = function sendMessage(){
  
getAllUsers() 
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