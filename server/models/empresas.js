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

  exports.createEmpresa = async function createEmpresa({ razao_social, cpf_cnpj }) {
    return await empresa.create({ razao_social, cpf_cnpj });
  } 
  exports.getCompany = async function getCompany({ cpf_cnpj, obj }){
    return await empresa.findOne({
      where: {cpf_cnpj: cpf_cnpj},
      attributes: {cpf_cnpj: obj}
    })
  }
  exports.getAllEmpresas = async function getAllEmpresas() {
    return await empresa.findAll()
  }
