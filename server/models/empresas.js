const sequelize = require('../db/index');
const Sequelize = require('sequelize');

const empresa = sequelize.define('empresas', {

  id_empresa: {
    type: Sequelize.INTEGER, 
    autoIncrement: true,
    primaryKey: true
   },
    razao_social: {
      type: Sequelize.CHAR,
      length: 100
    },
    cpf_cnpj: {
      type: Sequelize.CHAR,
      length: 14
    },
     
  },{
    timestamps: false,
  })
 
  empresa.sync()
.then(() => console.log('A tabela Empresas foi criada com sucesso!'))
.catch(err => console.log('Não foi possível criar a tabela Empresas!'));

 module.exports = (async function createEmpresa({ razao_social, cnpj }) {
    return await empresa.create({ razao_social, cnpj });
  },
  async function getAllEmpresas() {
    return await empresa.findAll()
  })
