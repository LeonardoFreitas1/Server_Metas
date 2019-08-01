const express = require('express');
const app = express();
const morgan  = require('morgan');
const port = 5000;
const cors = require('cors');
const start = require('../server/Message/Send');
const startSend = start.startSend;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(cors());

//index
app.use('/', require('./routes/router'));

//Registro de Usuários
app.use('/login', require('./routes/router'));
app.use('/addUser',  require('./routes/router')); 
app.use('/users', require('./routes/router'));
app.use('/addAdmin', require('./routes/router'));
app.use('/disable', require('./routes/router'));
app.use('/atualiza', require('./routes/router'));
app.use('/getUser', require('./routes/router'));
app.use('/verifyId', require('./routes/router'));
app.use('/checkUser', require('./routes/router'));
//Metas
app.use('/addMeta', require('./routes/router'));

//Usuarios Empresas
app.use('/addUserHasCompany', require('./routes/router'));
//Empresas
app.use('/company', require('./routes/router'));
app.use('/addCompany', require('./routes/router'));

//Rotas Protegidas
app.use('/protected', require('./routes/router'));

//inicializa o robo de envio de mensagem
startSend();

app.listen(process.env.PORT || port, function(){
  console.log('\nServidor rodando na porta 5000 \n');
});
