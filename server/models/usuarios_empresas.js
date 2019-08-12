const sequelize = require('../db/index');
const Sequelize = require('sequelize'); 
const User_has_empresa = sequelize.define('usuarios_has_empresas', {

    id_usuarios_empresas: {
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
       id_usuario: {
        type: Sequelize.INTEGER,
        references: { 
          model: 'usuarios',
          key: 'id_usuario'
        },
    },
    ativo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        primaryKey: true
    },
    id_tipo: {
      type: Sequelize.INTEGER,
        references: { 
          model: 'usuarios_tipos',
          key: 'id_tipo'
        },
      },
},
    {
    timestamps: false,
    
  });

  User_has_empresa.sync()
  .then(() => console.log('A tabela usuarios_empresas foi criada com sucesso!'))
  .catch(err => console.log( err + '\nNão foi possível criar a tabela Usuarios_Empresas!'));

  exports.getAllUserBusines =  async function() {
    return await User_has_empresa.findAll();
  } 
  exports.getUserHasCompany = async function getUserHasCompany({id_usuario, obj}){
  
    return await User_has_empresa.findOne({
      where: {id_usuario: id_usuario},
      attributes:{id_usuario: obj}

    })
  }
  exports.createUserHasCompany = async function createUserHasCompany({id_empresa}, id_usuario, id_tipo){
    console.log(id_empresa,'e',id_usuario, 'e', id_tipo)
    return await User_has_empresa.create({ id_empresa, id_usuario, id_tipo })
  }