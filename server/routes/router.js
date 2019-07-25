const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {};
const user_type = require('../models/usuarios_tipos').getAllUserType;
const user_empresa = require('../models/usuarios_empresas').getAllUserBusines;
const atualiza = require('../models/usuarios').atualiza;
const Users = require('../models/usuarios')
const getAllUsers = Users.getAllUser;
const createUser = Users.createUser;
const getUser = Users.getUser;
const disable = require('../models/usuarios').disable
const getAllEmpresas = require('../models/empresas');
const createEmpresa = require('../models/empresas');
const addMeta = require('../models/metas');

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow';

const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('Payload', jwt_payload);
  const user = getUser({ id: jwt_payload.id });

  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});



passport.use(strategy);

router.get('/', function(req, res){
  res.send('Servidor Ligado!')
})

router.post('/addAdmin', async function(req, res){
  const { cpf_cnpj, nome, email,senha, whatsapp, usuarios_tipos } = req.body;
  
  await createUser({ cpf_cnpj, nome,senha, email, whatsapp, usuarios_tipos })
   .then(user => res.send('Foi '))
   .catch(err => {return  console.log('erro!' + err)})
})

router.get('/usuarios_tipos', async function(req, res){
 await user_type().then(user => res.json({user}))
})
router.get('/usuarios_empresas', async function(req, res){
  await user_empresa().then(user => res.json({ user }))
 })

router.post('/addUser', async function(req, res, next) {
  const { id_tipo, cpf_cnpj,nome, usuario, senha,email,whatsapp } = req.body;
  
 await createUser({ id_tipo, cpf_cnpj, nome, usuario, senha, email, whatsapp }).then(user =>
  console.log(user),  
  res.send('foi')
    
  ).catch(err => {
    console.log(err),
    res.json({msg: err})
    
  })
});

  router.post('/login', async function(req, res, next) {
  
    const { cpf_cnpj, senha} = req.body;
    if (cpf_cnpj && senha) {
      const user = await getUser({ cpf_cnpj: cpf_cnpj });
      
      if (!user) {
        res.status(401).json({ message: 'Não foi possível encontrar o usuário' });
      }
      if (user.senha.trim() == senha) {
      
        const payload = { senha: senha };
        const token = jwt.sign(payload, jwtOptions.secretOrKey);
        console.log()
        res.json({token: token, id: user.id_usuario}); 
      } else {
        res.status(401).json({ msg: 'A senha está incorreta!' });
      }
    }
});

router.get('/users', function(req, res) {
  getAllUsers().then(user => res.json({user}));
});
 
router.post('/disable', function(req, res){
  const { id } = req.body;
  console.log(id)
  disable(id).then(foi => res.json({foi}))
})
  
router.get('/company', function(req, res) {
    getAllEmpresas().then(user => res.json(user))
  })
  
  router.post('/newCompany', function(req, res){
    const { razao_social, cpf_cnpj } = req.body;
   console.log(razao_social)
console.log(cpf_cnpj)
    createEmpresa({ razao_social, cpf_cnpj }).then(user => res.json({ user, msg: 'empresa'}))
  })

  router.post('/addMeta', function(req, res){
    const { Nome, data, tipo, setor } = req.body;
    addMeta({ Nome, data, tipo, setor }).then(user => res.json({user, msg: 'meta'}))
  })
  
  router.post('/atualiza', function(req, res){
    const { novoConteudo, id, conteudo } = req.body;
    console.log(conteudo)
    atualiza({novoConteudo, id, conteudo}).then(user => res.json({user, msg: 'atualizado'}))
  })
  
module.exports = router;
