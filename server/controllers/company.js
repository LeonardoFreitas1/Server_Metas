const { getAllEmpresas, createEmpresa, getCompany } = require('../models/empresas');
const jwt = require('jsonwebtoken');
const jwtOptions = { secretOrKey: process.env.KEY }


module.exports = {
    async add(req, res){
        const { razao_social, cpf_cnpj } = req.body;

        await createEmpresa({ razao_social, cpf_cnpj }).then(async user => {
          
          const company = await getCompany({ cpf_cnpj: cpf_cnpj });
          res.json({body: company.id_empresa})
     
       })

    },

    async list(req, res){
        const list = await getAllEmpresas()
        res.json(list)
    }
}
