const sequelize = require('../db/index');
const Sequelize = require('sequelize'); 
const User_type = sequelize.define('usuarios_tipos', {

    id_tipo: {
     type: Sequelize.INTEGER,
     autoIncrement: true,
     primaryKey: true
    },
   
    tipo: {
      type: Sequelize.CHAR,  
      length: 50
    },

},
    {
    timestamps: false,
    
  });

  User_type.sync()
  .then(() => console.log('A tabela usuarios_tipos foi criada com sucesso!'))
  .catch(err => console.log( err + '\nNão foi possível criar a tabela Usuarios!'));

  exports.getAllUserType =  async function() {
    return await User_type.findAll();
  } 