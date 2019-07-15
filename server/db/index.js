const Sequelize = require('sequelize');

 const sequelize = new Sequelize({
  logging: false, 
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialect: 'postgresql',
});


sequelize
  .authenticate()
  .then(() => console.log('A conexão com o Banco foi sucedida \n'))
  .catch(err => console.error('Não foi possível conectar ao Bando de Dados!', err));

module.exports = sequelize;