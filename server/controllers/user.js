const { getAllUser, getUser, getUserId, atualiza, createUser } = require('../models/usuarios');
const { getAllUserType, getType } = require('../models/usuarios_tipos')
const { createUserHasCompany, getUserHasCompany, getAllUserBusines, disable, isActive, getUsersType } = require('../models/usuarios_empresas')
const jwt = require('jsonwebtoken');
const jwtOptions = { secretOrKey: process.env.KEY }

module.exports = {

   async store(req, res) {
       const { cpf_cnpj, nome, usuario, senha, email, whatsapp } = req.body;
       await createUser({ cpf_cnpj, nome, usuario, senha, email, whatsapp }).then(user =>{
          
        res.json({ message: "usuário adicionado", id_usuario: user.id_usuario })
       }
        ).catch(err => {
          console.log(err),
          res.json({msg: err})
          
        })
      },

    async type(req, res){
       await user_type().then(user => res.json({user}))
    },

    async admin(req, res){
        const { cpf_cnpj, nome, email,senha, whatsapp, usuarios_tipos } = req.body;
  
        await createUser({ cpf_cnpj, nome,senha, email, whatsapp, usuarios_tipos })
        .then(user => res.send('Foi '))
        .catch(err => {return  console.log('erro!' + err)})
    },

    async get(req, res){
        const { token } = req.body;
         jwt.verify(token, process.env.KEY, async (err, data) => {
            if(err){
                res.json(null)
            }else{
                const user = await getUserHasCompany({id_usuario: data.id_usuario})

                const id_tipo = { id_tipo: user.id_tipo }
                const t_user = jwt.sign(id_tipo, jwtOptions.secretOrKey);
                res.json({t_user})
            }
        })
    },

    id(req, res){
        let { type } = req.body;
        jwt.verify(type, process.env.KEY, async (err, data) => {
            if(err){
                res.json(null)
            }else{
        
        const user = await getType({type: data.id_tipo})
        const tipo = { id_tipo: user.tipo }
        res.json({tipo})
        }
      })
    },

    async disable(req, res){
        const { id } = req.body;
        await disable(id).then(foi => res.json({foi}))
    },

    async company(req, res){

    const { id_empresa, id_usuario, id_tipo } =  req.body;
    
            await createUserHasCompany({id_empresa, id_usuario,  id_tipo })
            res.json({message: "usuario adicionado"})
 },
    
    check(req, res){
        const { token } = req.body;
        jwt.verify(token, process.env.KEY, (err, data) => {
            if(err){
                res.json(false)
            }else{
                res.send(true);
            }
        })
    },

    upload(req, res){
        const { cpf_cnpj, id, nome, email, senha, whatsapp, usuario } = req.body;
        atualiza({cpf_cnpj, id, nome, email, senha, whatsapp, usuario}).then(user => res.json({user, msg: 'atualizado'}))
    },

    async getAdm(req, res){
        const userList = await getAllUser()
        res.json(userList)
    },

    async active(req, res){
        const { id } = req.body
        
        if(await getUserHasCompany({id_usuario: id})){
            const user = await getUserHasCompany({id_usuario: id})
            res.json({ativo: user.ativo})
        }else{
            res.json({ativo: false})
        }
},

    async allType(req, res){
        const types = await getAllUserType()
        res.json(types)
    },

    async typeUser(req, res){
        const { id_usuario } = req.body
        const typeUser = await getUsersType ({ id_usuario: id_usuario })
        res.json({tipo: typeUser.id_tipo})
    }
   
}
 