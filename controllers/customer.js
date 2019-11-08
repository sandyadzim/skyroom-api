const models = require('../models')
const Customer = models.customer

exports.index = (req, res) => {
    Customer.findAll().then(item=>res.send(item));
}

exports.createCustomer = (req, res) => {
    const {name, identity_number, phone_number, image} = req.body

    Customer.create({
        name,
        identity_number,
        phone_number,
        image

    }).then(result => res.send(result))
    .catch((result)=>{
        res.send({
            error:true,
            message: 'FAILED'
        })
    })
}

exports.updateCustomer = (req, res) => {
    const {name, identity_number, phone_number, image} = req.body
    Customer.update({
        name,
        identity_number,
        phone_number,
        image
    },
    {
        where:{id: req.params.customer_id}
    }
    ).then(result=>{
        if(result){
            res.send({
                id: req.params.customer_id,
                name,
                message: 'Update Success'
            });
        } else{
            res.send('Update Failed')
        }
    });
}
exports.deleteCustomer = (req, res) => {
    Customer.destroy({where: {id: req.params.id}})
    .then(result => {
        res.send({
            status: 'success',
            id: req.params.id
        });
    })
    .catch(e => {
        res.send({
            status: 'error',
            message: "Failed Delete :(",
            error: e
        });
    })
}