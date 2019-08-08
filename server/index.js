const express = require('express');
const app = express();
const morgan  = require('morgan');
const cors = require('cors');
const { startSend } = require('../server/Message/Send');
const routes = require('./routes/router');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(cors());

app.use(routes);

startSend();

app.listen(process.env.PORT || 5001, () => {
  console.log('\nServidor rodando na porta 5000 \n');
});
