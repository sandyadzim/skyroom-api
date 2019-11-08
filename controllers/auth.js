const jwt = require('jsonwebtoken')

const models = require('../models')
const User = models.user

exports.login = (req, res) =>{
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name

    User.findOne({where: {email, password}}).then(user=>{

        if(user){
            const token = 'Bearer ' + jwt.sign({ userId: user.id}, 'my-secret-key')
            res.send({
                id: user.id,
                email,
                token,
                name: user.name,
                avatar: user.avatar,
                message:  'Login Sukses!!'
            })
        }else{
            res.send({
                error:true,
                message: "Email yang anda masukkan salah!"
            })
        }
    })
}
exports.register = (req, res) =>{
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name
    // const avatar = req.body.avatar

    User.findOrCreate({
        where: {
            email,
            password,
            name
            // avatar
        },
    }).then( ([user, created]) => {
        if(created) {
            const token = jwt.sign({ createdId: created.id}, 'my-secret-key')
            res.send({
                email,
                token
            })
        }else{
            res.send({
                message: "Email yang anda masukkan sudah digunakan"
            })
        }
    })
}