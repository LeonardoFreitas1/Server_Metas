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

    id_tipo: {
        type: Sequelize.INTEGER,
          references: { 
            model: 'usuarios_tipos',
            key: 'id_tipo'
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
    usuarios_tipos: {
      type: Sequelize.STRING
    },
    
    /*
    Precisa dar um jeito de colocar mais uma coluna ae
    se vira ai Leo do futuro ;-;

    ativo: {
      type: Sequelize.BOOLEAN,
      references: {
        model: 'usuarios_has_empresas',
        key: 'ativo'
      }
    }

    */
  }, { 
    timestamps: false, 
  });

  User.sync()
  .then(() => console.log('A tabela Usuarios foi criada com sucesso!'))
  .catch(err => console.log( err + '\nNão foi possível criar a tabela Usuarios!'));



  exports.getAllUser =  async function() {
    return await User.findAll();
  }
  
   exports.createUser = async function createUser({ cpf_cnpj, nome, usuario, senha, email, whatsapp, usuarios_tipos  })  {
    return await User.create({ cpf_cnpj, nome,usuario, senha, email, whatsapp, usuarios_tipos })
  },

  
  exports.getUser =  async function getUser(obj)  {
    return await User.find({
      where: obj,
    })
    
  } 
  exports.disable =  async function disable(obj)  {
    return await User.update({ 
      ativo: true,
    },{
      where: {id_usuario: obj}
    })
}