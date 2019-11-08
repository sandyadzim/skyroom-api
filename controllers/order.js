const models = require('../models')
const Room = models.room
const Customer = models.customer
const Order = models.order


exports.showOrder = (req, res) => {
    Room.findAll({
        include: [
            {
                model: Order,
                as: 'orders',
                include:[
                    {
                        model: Customer,
                        as: 'customers',
                    }
                ],
                
            },
        ],
        order: [
                    
            [
                'name', 'ASC'
            ] 
    ]
    }).then(result=>{
        res.send(result)
    })
}

// exports.index = (req, res) => {
//     Room.findAll({
//         include: {
//             model: Customer,
//             through: {
//                 model: Order,
//                 where: {is_done: false}
//             },
//             required: false
//         },
//         order: [
//             ['id', 'ASC']
//         ],
//     }).then(result => {
//         res.send(result)
//     })
// }

exports.updateCheckin = (req, res) => {
    const { room_id, customer_id, duration, order_end_time} = req.body
    Order.update({
        room_id,
        customer_id,
        is_done:true,
        is_booked: false,
        duration,
        order_end_time
    },
    {
        where:{id: req.params.checkin_id}
    }
    ).then(result=>{
        if(result){
            res.send({
                id: req.params.checkin_id,
                message: 'Update Success'
            });
        } else{
            res.send('Update Failed')
        }
    });
}

exports.createCheckin = (req, res) => {
    const { room_id, customer_id, duration, order_end_time, is_done, is_booked} = req.body

    Order.create({
        room_id,
        customer_id,
        duration,
        order_end_time,
        is_done,
        is_booked       

    }).then(result => res.send(result))
    .catch((result)=>{
        res.send({
            error:true,
            message: 'FAILED'
        })
    })
}

exports.deleteOrder = (req, res) => {
    Order.destroy({ where: { id: req.params.order_id } })
        .then(() => {
            res.send({
                status: 'success',
                id: req.params.order_id
            })
        })
        .catch(e => {
            res.send({
                status: 'error',
                message: "Failed Check Out !",
                error: e
            });
        })
}