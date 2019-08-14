const sequelize = require('../db/index');
const Sequelize = require('sequelize'); 

const User = sequelize.define('usuarios', {

    id_usuario: {
     type: Sequelize.INTEGER,
     autoIncrement: true,
     primaryKey: true
    },

    id_empresa: {
      type: Sequelize.INTEGER,
        references: { 
          model: 'empresas',
          key: 'id_empresa'
        }
     },
    cpf_cnpj: {
      type: Sequelize.CHAR,
      length: 14
    },
    nome: {
      type: Sequelize.CHAR,
    },
    usuario: {
      type: Sequelize.CHAR,
    },
    senha: {
      type: Sequelize.CHAR,
    },  
    email: {
      type: Sequelize.CHAR,
    },
    whatsapp: { 
      type: Sequelize.BIGINT
    },


  }, { 
    timestamps: false, 
  });

  User.sync()
  .then(() => console.log('A tabela Usuarios foi criada com sucesso!'))
  .catch(err => console.log( err + '\nNão foi possível criar a tabela Usuarios!'));



  exports.getAllUser =  async function() {
    return await User.findAll();
  }
  
   exports.createUser = async function createUser({ cpf_cnpj, nome, usuario, senha, email, whatsapp })  {
    return await User.create({ cpf_cnpj, nome, usuario, senha, email, whatsapp })
  },

  
  exports.getUser =  async function getUser({ cpf_cnpj })  {
    return await User.findOne({
      where: {cpf_cnpj: cpf_cnpj}
    })
    
  },

  exports.getUserId =  async function getUserId({ id_usuario })  {

    return await User.findOne({
      where: {id_usuario: id_usuario}
    })
   
  },

  exports.atualiza = async function atualiza({cpf_cnpj, id, nome, usuario, senha, email, whatsapp }){
    
    User.update({
      cpf_cnpj: cpf_cnpj,
      nome: nome,
      usuario: usuario,
      senha: senha,
      email: email,
      whatsapp: whatsapp},
      { where: {id_usuario: id }})

  }

  
