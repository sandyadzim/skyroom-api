const models = require('../models')
const Room = models.room

exports.index = (req, res) => {
    Room.findAll().then(item=>res.send(item));
}

exports.createRoom = (req, res) => {
    const {name} = req.body

    Room.create({
        name
    }).then(result => res.send(result))
    .catch((result)=>{
        res.send({
            error:true,
            message: 'FAILED'
        })
    })
}

exports.updateRoom = (req, res) => {
    const {name} = req.body
    Room.update({
        name
    },
    {
        where:{id: req.params.room_id}
    }
    ).then(result=>{
        if(result){
            res.send({
                id: req.params.room_id,
                name,
                message: 'Update Success'
            });
        } else{
            res.send('Update Failed')
        }
    });
}
exports.deleteRoom = (req, res) => {
    Room.destroy({where: {id: req.params.id}})
    .then(result => {
        res.send({
            status: 'success',
            id: req.params.id
        });
    })
    .catch(e => {
        res.send({
            status: 'error',
            message: "Failed Delete Room :(",
            error: e
        });
    })
}