const { disable, getAllUser, getUser, getUserId, atualiza, createUser } = require('../models/usuarios');
const { getAllUserType, getType } = require('../models/usuarios_tipos')
const { createUserHasCompany, getUserHasCompany, getAllUserBusines } = require('../models/usuarios_empresas')
const jwt = require('jsonwebtoken');
const jwtOptions = { secretOrKey: process.env.KEY }

module.exports = {

   async store(req, res) {
       const { id_tipo, cpf_cnpj, nome, usuario, senha, email, whatsapp } = req.body;
        
       await createUser({ id_tipo, cpf_cnpj, nome, usuario, senha, email, whatsapp }).then(user =>
        console.log(user),  
        res.send('foi')
          
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

                const user = await getUserId({id_usuario: data.id_usuario})
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

    disable(req, res){
        const { id } = req.body;
        console.log(id)
        disable(id).then(foi => res.json({foi}))
    },

    async company(req, res){

    const { id_empresa, id_usuario, id_tipo } =  req.body;
    
    await jwt.verify(id_tipo, process.env.KEY, async(err, data) => {
     
      if(err){
        console.log(err)
      }else{
        await jwt.verify(id_usuario, process.env.KEY, async (error, dataUser) => {
       if(error){
         console.log(error)
       }else{

            await addUserHasCompany({id_empresa}, dataUser.id_usuario,  data.id_tipo ).then(async user => {
    
                const info = await getUserHasCompany({id_usuario: dataUser.id_usuario})
                const id_usuario_empresa = info.id_usuario_empresa
                res.json({id_usuario_empresa})
              })
            }
        })
        }
    })
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
        const { novoConteudo, id, conteudo } = req.body;
        console.log(conteudo)
        atualiza({novoConteudo, id, conteudo}).then(user => res.json({user, msg: 'atualizado'}))
    }

}
