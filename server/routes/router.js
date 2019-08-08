const express = require('express');
const router = express.Router();
const { type, store, company, admin, get, id, disable, check, upload } = require('../controllers/user');
const { login } = require('../controllers/auth');
const { add } = require('../controllers/company');
const { goal } = require('../controllers/goal');

//Users
router.get('/', (req, res) => {
    res.send('Servidor Ligado!');
});

router.post('/addAdmin', admin);

router.get('/usuarios_tipos', type);

router.post('/addUser', store);

router.post('/login', login);
 
router.post('/getUser', get);

router.post('/verifyId', id);

router.post('/disable', disable);

router.post('/atualiza', upload);

router.post('/addUserHasCompany', company);

router.post('/checkUser', check);

//Company
router.post('/newCompany', add);

//Goals
router.post('/addMeta', goal);
  
module.exports = router;
