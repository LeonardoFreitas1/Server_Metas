const sequelize = require('../db/index');
const Sequelize = require('sequelize'); 
const User_has_empresa = sequelize.define('usuarios_has_empresas', {

    id_usuario_empresa: {
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
          },
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
        defaultValue: false,
        primaryKey: true
    } 
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
  