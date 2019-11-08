const models = require('../models')
const User = models.user

exports.index = (req, res) => {
    User.findAll().then(item=>res.send(item));
}
exports.showUser = (req, res)=>{
    User.findAll({
        where: {id: req.params.user_id}
    }).then(result=>res.send(result))
}
exports.updateUser = (req, res) => {
    const {avatar} = req.body
    User.update({
        avatar
    },
    {
        where:{id: req.params.user_id}
    }
    ).then(result=>{
        if(result){
            res.send({
                id: req.params.user_id,
                avatar,
                message: 'Update Success'
            });
        } else{
            res.send('Update Failed')
        }
    });
}