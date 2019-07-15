const sequelize = require('../db/index');
const Sequelize = require('sequelize');

const Metas = sequelize.define('metas', {
  
    Nome: {
      type: Sequelize.STRING
    },
    data: {
      type: Sequelize.STRING
    },
    tipo: { 
      type: Sequelize.STRING
    },
    setor: {
      type: Sequelize.STRING
    },
   

}, {
    timestamps: false,
});

  Metas.sync()
.then(() => console.log('A tabela Metas foi criada com sucesso!'))
.catch(err => console.log('Não foi possível criar a tabela Metas!'));

 module.exports = (async function addMeta({ Nome, data, tipo, setor }) {
    return await Metas.create({ Nome, data, tipo, setor });
  },
  
  async function getMetas()  {
    return await Metas.findAll();
  })
  
