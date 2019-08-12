const { getUser } = require('../models/usuarios');
const jwt = require('jsonwebtoken');
const jwtOptions = { secretOrKey: process.env.KEY }

module.exports = {

    async login(req, res){
        const { cpf_cnpj, senha} = req.body;
    
        if (cpf_cnpj && senha) {
            
            const user = await getUser({ cpf_cnpj: cpf_cnpj });
        if (!user) {
            res.status(401).json({ message: 'Não foi possível encontrar o usuário' });
        }
      
        if (user.senha.trim() == senha) {
            
            const payload = { id_usuario: user.id_usuario };
            const c_user = jwt.sign(payload, jwtOptions.secretOrKey);
            res.json({c_user: c_user}); 
        }else {
            res.status(401).json({ msg: 'A senha está incorreta!' });
        }
      }
    },
}
