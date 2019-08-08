const addMeta = require('../models/metas');

module.exports = {
    goal(req, res){
        const { Nome, data, tipo, setor } = req.body;
        addMeta({ Nome, data, tipo, setor }).then(user => res.json({user, msg: 'meta'}))
    }
}
